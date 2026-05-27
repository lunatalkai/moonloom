#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_PACKET_PATH = 'examples/benchmark-pattern.fixture.json';
const SCHEMA_VERSION = 'moonloom.benchmark-pattern.v1';

const REQUIRED_TOP_LEVEL_STRINGS = [
  'calibrationScope',
  'detailDensityPattern',
  'durableOperatingEnginePattern',
  'openingFirstTurnProofPattern',
  'longplaySpinePattern',
  'roleInitiativePattern',
  'playerAgencyPattern',
  'xmlv3PresentationGap',
  'moonloomGap',
  'repairTarget',
  'nextSkill',
  'handoff',
];

const REQUIRED_SAFETY_FLAGS = [
  'noRawSourceText',
  'noExactMarkup',
  'noIdentifiers',
  'noSourceUrls',
  'noQueryText',
  'noSourceSelectionFlow',
  'noProvenanceOrPrivateMetricClaim',
];

const RAW_SOURCE_KEYS = new Set([
  'rawsource',
  'rawsourcetext',
  'sourceexcerpt',
  'sourcecontent',
  'originalcard',
  'originalmarkup',
  'rawmarkup',
]);

const EXACT_MARKUP_KEYS = new Set([
  'exactmarkup',
  'htmlsource',
  'xmlsource',
  'copiedmarkup',
]);

const SOURCE_SELECTION_KEYS = new Set([
  'sourceselection',
  'sourceselectionflow',
  'selectionquery',
  'selectionrule',
  'rankingquery',
  'leaderboardquery',
]);

const QUERY_KEYS = new Set([
  'query',
  'querytext',
  'sql',
  'sqlquery',
]);

const FORBIDDEN_PUBLIC_CLAIM_PATTERNS = [
  /\b(?:production|prod)\s+data\b/i,
  /\bproduction\s+analysis\b/i,
  /\btraining\s+data\b/i,
  /(?:\u751f\u7522|\u751f\u4ea7)(?:\u8cc7\u6599|\u8d44\u6599|\u6578\u64da|\u6570\u636e)/,
  /\b(?:internal|private)\s+(?:database|data|source|metric|example)s?\b/i,
  /\breal[-\s]?user\s+(?:behavior|data|logs?|analytics)\b/i,
  /\braw\s+card\s+(?:content|text|data)\b/i,
  /\bhttps?:\/\/(?:api|admin)\.lunatalk\.(?:ai|pro)\b/i,
  /\bhttps?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?(?:\/[^\s"'<>)]*)?/i,
  /Bearer\s+[A-Za-z0-9._-]{20,}/,
  /\bsk-[A-Za-z0-9][A-Za-z0-9._-]{15,}\b/,
];

const UUID_PATTERN = /\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/;
const SQL_PATTERN = /\bSELECT\b[\s\S]{0,160}\bFROM\b|\b(?:CREATE\s+TABLE|ALTER\s+TABLE|INSERT\s+INTO|UPDATE\s+[A-Za-z0-9_]+\s+SET|DELETE\s+FROM)\b/i;
const MARKUP_PATTERN = /<\/?(?:html|body|script|style|div|span|panel|choice|state|section|card)\b[^>]*>/i;

function issue(code, file, message) {
  return { code, file, message };
}

function isObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function normalizeKey(key) {
  return String(key).replace(/[-_\s]/g, '').toLowerCase();
}

function walk(value, visitor, pathParts = []) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, visitor, [...pathParts, String(index)]));
    return;
  }
  if (!isObject(value)) {
    visitor({ value, key: pathParts.at(-1) || '', path: pathParts.join('.') });
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    visitor({ value: child, key, path: [...pathParts, key].join('.') });
    walk(child, visitor, [...pathParts, key]);
  }
}

function requireString(container, field, issues, file, code, context) {
  if (typeof container?.[field] !== 'string' || container[field].trim() === '') {
    issues.push(issue(code, file, `${context} is missing ${field}.`));
  }
}

function validatePublicSafety(packet, issues, file) {
  let rawSourceFound = false;
  let exactMarkupFound = false;
  let sourceSelectionFound = false;
  let protectedClaimFound = false;
  let identifierFound = false;
  let sqlFound = false;

  walk(packet, ({ value, key }) => {
    const normalizedKey = normalizeKey(key);
    const stringValue = typeof value === 'string' ? value : '';

    if (RAW_SOURCE_KEYS.has(normalizedKey)) {
      rawSourceFound = true;
    }
    if (EXACT_MARKUP_KEYS.has(normalizedKey) || (stringValue && MARKUP_PATTERN.test(stringValue))) {
      exactMarkupFound = true;
    }
    if (SOURCE_SELECTION_KEYS.has(normalizedKey)) {
      sourceSelectionFound = true;
    }
    if (QUERY_KEYS.has(normalizedKey) || (stringValue && SQL_PATTERN.test(stringValue))) {
      sqlFound = true;
    }
    if (stringValue && UUID_PATTERN.test(stringValue)) {
      identifierFound = true;
    }
    if (stringValue && FORBIDDEN_PUBLIC_CLAIM_PATTERNS.some((pattern) => pattern.test(stringValue))) {
      protectedClaimFound = true;
    }
  });

  if (rawSourceFound) {
    issues.push(issue('benchmark.raw_source.present', file, 'Packet contains raw source-shaped fields.'));
  }
  if (exactMarkupFound) {
    issues.push(issue('benchmark.exact_markup.present', file, 'Packet contains exact markup-shaped content.'));
  }
  if (sourceSelectionFound) {
    issues.push(issue('benchmark.source_selection.present', file, 'Packet contains source-selection workflow fields.'));
  }
  if (protectedClaimFound) {
    issues.push(issue('benchmark.public_claim.forbidden', file, 'Packet contains protected public-claim-shaped text.'));
  }
  if (identifierFound) {
    issues.push(issue('benchmark.identifier.present', file, 'Packet contains concrete identifier-shaped text.'));
  }
  if (sqlFound) {
    issues.push(issue('benchmark.sql.present', file, 'Packet contains query-shaped text.'));
  }
}

function validateSafetyFlags(packet, issues, file) {
  const safety = packet.sourceSafetyCheck;
  if (!isObject(safety)) {
    issues.push(issue('benchmark.safety_check.missing', file, 'Packet is missing sourceSafetyCheck.'));
    return;
  }
  for (const flag of REQUIRED_SAFETY_FLAGS) {
    if (safety[flag] !== true) {
      issues.push(issue('benchmark.safety_check.failed', file, `sourceSafetyCheck.${flag} must be true.`));
    }
  }
}

function validateDeepSampleReading(packet, issues, file) {
  if (!Array.isArray(packet.deepSampleReading) || packet.deepSampleReading.length === 0) {
    issues.push(issue('benchmark.deep_sample.missing', file, 'Packet is missing deepSampleReading.'));
    return;
  }

  for (const [index, item] of packet.deepSampleReading.entries()) {
    if (!isObject(item)) {
      issues.push(issue('benchmark.deep_sample.invalid', file, `deepSampleReading[${index}] must be an object.`));
      continue;
    }
    requireString(item, 'observation', issues, file, 'benchmark.deep_sample.field_missing', `deepSampleReading[${index}]`);
    requireString(item, 'craftPattern', issues, file, 'benchmark.deep_sample.field_missing', `deepSampleReading[${index}]`);
  }
}

export function validateBenchmarkPattern(packet, options = {}) {
  const file = options.filePath || DEFAULT_PACKET_PATH;
  const issues = [];

  if (!isObject(packet)) {
    issues.push(issue('benchmark.packet.invalid', file, 'Packet must be a JSON object.'));
    return { issues, summary: { deepSampleReadings: 0, cardShapes: 0 } };
  }

  validatePublicSafety(packet, issues, file);

  if (packet.schemaVersion !== SCHEMA_VERSION) {
    issues.push(issue('benchmark.schema.invalid', file, `Expected schemaVersion ${SCHEMA_VERSION}.`));
  }

  for (const field of REQUIRED_TOP_LEVEL_STRINGS) {
    requireString(packet, field, issues, file, 'benchmark.field_missing', 'Packet');
  }

  if (!Array.isArray(packet.aggregateSignals) || packet.aggregateSignals.length === 0) {
    issues.push(issue('benchmark.aggregate_signals.missing', file, 'Packet is missing aggregateSignals.'));
  }
  if (!Array.isArray(packet.ordinaryCardContrast) || packet.ordinaryCardContrast.length === 0) {
    issues.push(issue('benchmark.ordinary_contrast.missing', file, 'Packet is missing ordinaryCardContrast.'));
  }
  if (!Array.isArray(packet.cardShapesRepresented) || packet.cardShapesRepresented.length === 0) {
    issues.push(issue('benchmark.card_shapes.missing', file, 'Packet is missing cardShapesRepresented.'));
  }

  validateDeepSampleReading(packet, issues, file);
  validateSafetyFlags(packet, issues, file);

  return {
    issues,
    summary: {
      deepSampleReadings: Array.isArray(packet.deepSampleReading) ? packet.deepSampleReading.length : 0,
      cardShapes: Array.isArray(packet.cardShapesRepresented) ? packet.cardShapesRepresented.length : 0,
    },
  };
}

async function main() {
  const file = process.argv[2] || DEFAULT_PACKET_PATH;
  const content = await readFile(file, 'utf8');
  const packet = JSON.parse(content);
  const result = validateBenchmarkPattern(packet, { filePath: file });
  if (result.issues.length > 0) {
    for (const item of result.issues) {
      console.error(`${item.code} ${item.file}: ${item.message}`);
    }
    process.exit(1);
  }
  console.log(
    `Benchmark pattern validation passed: ${result.summary.deepSampleReadings} deep sample readings, ${result.summary.cardShapes} card shapes.`,
  );
}

const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === currentFile) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
