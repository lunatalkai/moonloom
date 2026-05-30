#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_SUMMARY_PATH = 'examples/iteration-summary.fixture.json';
const SCHEMA_VERSION = 'moonloom.iteration-summary.v1';

const REQUIRED_PROBE_KINDS = [
  'normal_interaction',
  'short_reply',
  'off_path',
  'background_question',
  'relationship_push',
  'secret_exploration',
  'boundary_test',
  'long_arc_macro_progression',
];

const REQUIRED_TEST_CARD_FIELDS = [
  'premiseSummary',
  'detailEngineSummary',
  'openingSummary',
  'tokenStance',
];

const REQUIRED_GAP_FIELDS = [
  'detailGap',
  'openingGap',
  'longplayGap',
  'xmlv3Gap',
];

const REQUIRED_SAFETY_FLAGS = [
  'noRawCardText',
  'noRawTranscript',
  'noRoleOrChatIds',
  'noSourceSelectionFlow',
  'noQueryText',
  'noInternalUrls',
  'noPrivateMetrics',
];

const VALID_STATUSES = new Set(['pass', 'warning', 'fail']);
const BENCHMARK_STATUSES = new Set(['validated']);

const RAW_CARD_KEYS = new Set([
  'rawcard',
  'rawcardtext',
  'rawrole',
  'rawroletext',
  'rolefieldraw',
  'fullcard',
]);

const RAW_TRANSCRIPT_KEYS = new Set([
  'rawtranscript',
  'fulltranscript',
  'transcript',
  'rawmessages',
  'conversationraw',
]);

const ID_KEYS = new Set([
  'roleid',
  'chatid',
  'conversationid',
  'cardid',
  'authorid',
  'accountid',
  'userid',
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

function validatePublicSafety(summary, issues, file) {
  let rawCardFound = false;
  let rawTranscriptFound = false;
  let identifierFound = false;
  let sourceSelectionFound = false;
  let protectedClaimFound = false;
  let queryFound = false;
  let exactMarkupFound = false;

  walk(summary, ({ value, key }) => {
    const normalizedKey = normalizeKey(key);
    const stringValue = typeof value === 'string' ? value : '';

    if (RAW_CARD_KEYS.has(normalizedKey)) {
      rawCardFound = true;
    }
    if (RAW_TRANSCRIPT_KEYS.has(normalizedKey)) {
      rawTranscriptFound = true;
    }
    if (ID_KEYS.has(normalizedKey) || (stringValue && UUID_PATTERN.test(stringValue))) {
      identifierFound = true;
    }
    if (SOURCE_SELECTION_KEYS.has(normalizedKey)) {
      sourceSelectionFound = true;
    }
    if (QUERY_KEYS.has(normalizedKey) || (stringValue && SQL_PATTERN.test(stringValue))) {
      queryFound = true;
    }
    if (stringValue && MARKUP_PATTERN.test(stringValue)) {
      exactMarkupFound = true;
    }
    if (stringValue && FORBIDDEN_PUBLIC_CLAIM_PATTERNS.some((pattern) => pattern.test(stringValue))) {
      protectedClaimFound = true;
    }
  });

  if (rawCardFound) {
    issues.push(issue('iteration.raw_card.present', file, 'Summary contains raw card-shaped fields.'));
  }
  if (rawTranscriptFound) {
    issues.push(issue('iteration.raw_transcript.present', file, 'Summary contains raw transcript-shaped fields.'));
  }
  if (identifierFound) {
    issues.push(issue('iteration.identifier.present', file, 'Summary contains concrete role/chat/account identifier-shaped text.'));
  }
  if (sourceSelectionFound) {
    issues.push(issue('iteration.source_selection.present', file, 'Summary contains source-selection workflow fields.'));
  }
  if (queryFound) {
    issues.push(issue('iteration.query.present', file, 'Summary contains query-shaped text.'));
  }
  if (exactMarkupFound) {
    issues.push(issue('iteration.exact_markup.present', file, 'Summary contains exact markup-shaped content.'));
  }
  if (protectedClaimFound) {
    issues.push(issue('iteration.public_claim.forbidden', file, 'Summary contains protected public-claim-shaped text.'));
  }
}

function validateSafetyFlags(summary, issues, file) {
  const safety = summary.safetyCheck;
  if (!isObject(safety)) {
    issues.push(issue('iteration.safety_check.missing', file, 'Summary is missing safetyCheck.'));
    return;
  }
  for (const flag of REQUIRED_SAFETY_FLAGS) {
    if (safety[flag] !== true) {
      issues.push(issue('iteration.safety_check.failed', file, `safetyCheck.${flag} must be true.`));
    }
  }
}

function validateTestCard(summary, issues, file) {
  if (!isObject(summary.testCard)) {
    issues.push(issue('iteration.test_card.missing', file, 'Summary is missing testCard.'));
    return;
  }
  for (const field of REQUIRED_TEST_CARD_FIELDS) {
    requireString(summary.testCard, field, issues, file, 'iteration.test_card.field_missing', 'testCard');
  }
}

function validateEvidence(summary, issues, file) {
  const evidence = summary.evidence;
  if (!isObject(evidence)) {
    issues.push(issue('iteration.evidence.missing', file, 'Summary is missing evidence.'));
    return;
  }

  const fieldReview = evidence.fieldReview;
  if (!isObject(fieldReview)) {
    issues.push(issue('iteration.field_review.missing', file, 'Evidence is missing fieldReview.'));
  } else {
    if (!VALID_STATUSES.has(fieldReview.status)) {
      issues.push(issue('iteration.field_review.status_invalid', file, 'fieldReview.status must be pass, warning, or fail.'));
    }
    requireString(fieldReview, 'summary', issues, file, 'iteration.field_review.summary_missing', 'fieldReview');
  }

  const visual = evidence.mcpVisualValidation;
  if (!isObject(visual)) {
    issues.push(issue('iteration.visual.missing', file, 'Evidence is missing mcpVisualValidation.'));
  } else {
    if (!VALID_STATUSES.has(visual.status)) {
      issues.push(issue('iteration.visual.status_invalid', file, 'mcpVisualValidation.status must be pass, warning, or fail.'));
    }
    for (const field of ['desktopPreview', 'mobilePreview']) {
      if (!VALID_STATUSES.has(visual[field])) {
        issues.push(issue('iteration.visual.preview_invalid', file, `${field} must be pass, warning, or fail.`));
      }
    }
    requireString(visual, 'rendererMode', issues, file, 'iteration.visual.renderer_missing', 'mcpVisualValidation');
    requireString(visual, 'summary', issues, file, 'iteration.visual.summary_missing', 'mcpVisualValidation');
  }

  const chat = evidence.chatPlaytest;
  if (!isObject(chat)) {
    issues.push(issue('iteration.chat.missing', file, 'Evidence is missing chatPlaytest.'));
  } else {
    if (!VALID_STATUSES.has(chat.status)) {
      issues.push(issue('iteration.chat.status_invalid', file, 'chatPlaytest.status must be pass, warning, or fail.'));
    }
    if (!VALID_STATUSES.has(chat.perMessagePreview)) {
      issues.push(issue('iteration.chat.preview_invalid', file, 'chatPlaytest.perMessagePreview must be pass, warning, or fail.'));
    }
    requireString(chat, 'summary', issues, file, 'iteration.chat.summary_missing', 'chatPlaytest');
    const probes = Array.isArray(chat.probes) ? chat.probes : [];
    if (!Array.isArray(chat.probes)) {
      issues.push(issue('iteration.chat.probes_invalid', file, 'chatPlaytest.probes must be an array.'));
    }
    const probeSet = new Set(probes);
    for (const kind of REQUIRED_PROBE_KINDS) {
      if (!probeSet.has(kind)) {
        issues.push(issue('iteration.chat.probe_missing', file, `Missing chat playtest probe: ${kind}`));
      }
    }
  }

  const benchmark = evidence.benchmarkPattern;
  if (!isObject(benchmark)) {
    issues.push(issue('iteration.benchmark.missing', file, 'Evidence is missing benchmarkPattern.'));
  } else {
    if (!BENCHMARK_STATUSES.has(benchmark.status)) {
      issues.push(issue('iteration.benchmark.status_invalid', file, 'benchmarkPattern.status must be validated.'));
    }
    requireString(benchmark, 'packetVersion', issues, file, 'iteration.benchmark.version_missing', 'benchmarkPattern');
    requireString(benchmark, 'summary', issues, file, 'iteration.benchmark.summary_missing', 'benchmarkPattern');
  }
}

function validateGapComparison(summary, issues, file) {
  if (!isObject(summary.gapComparison)) {
    issues.push(issue('iteration.gap.missing', file, 'Summary is missing gapComparison.'));
    return;
  }
  for (const field of REQUIRED_GAP_FIELDS) {
    requireString(summary.gapComparison, field, issues, file, 'iteration.gap.field_missing', 'gapComparison');
  }
}

function validateRepair(summary, issues, file) {
  const repair = summary.repair;
  if (!isObject(repair)) {
    issues.push(issue('iteration.repair.missing', file, 'Summary is missing repair.'));
    return;
  }
  requireString(repair, 'rootCause', issues, file, 'iteration.repair.field_missing', 'repair');
  requireString(repair, 'nextMoonloomSkill', issues, file, 'iteration.repair.field_missing', 'repair');
  requireString(repair, 'rerunResult', issues, file, 'iteration.repair.field_missing', 'repair');
  if (!Array.isArray(repair.changedArtifacts) || repair.changedArtifacts.length === 0) {
    issues.push(issue('iteration.repair.changed_artifacts_missing', file, 'repair.changedArtifacts must name changed public artifacts.'));
  }
}

export function validateIterationSummary(summary, options = {}) {
  const file = options.filePath || DEFAULT_SUMMARY_PATH;
  const issues = [];

  if (!isObject(summary)) {
    issues.push(issue('iteration.summary.invalid', file, 'Summary must be a JSON object.'));
    return { issues, summary: { chatProbes: 0, changedArtifacts: 0 } };
  }

  validatePublicSafety(summary, issues, file);

  if (summary.schemaVersion !== SCHEMA_VERSION) {
    issues.push(issue('iteration.schema.invalid', file, `Expected schemaVersion ${SCHEMA_VERSION}.`));
  }
  for (const field of ['iterationLabel', 'cardShape', 'language']) {
    requireString(summary, field, issues, file, 'iteration.field_missing', 'Summary');
  }

  validateTestCard(summary, issues, file);
  validateEvidence(summary, issues, file);
  validateGapComparison(summary, issues, file);
  validateRepair(summary, issues, file);
  validateSafetyFlags(summary, issues, file);

  if (!Array.isArray(summary.nextTodo) || summary.nextTodo.length === 0) {
    issues.push(issue('iteration.next_todo.missing', file, 'Summary must include nextTodo.'));
  }

  return {
    issues,
    summary: {
      chatProbes: Array.isArray(summary.evidence?.chatPlaytest?.probes)
        ? summary.evidence.chatPlaytest.probes.length
        : 0,
      changedArtifacts: Array.isArray(summary.repair?.changedArtifacts)
        ? summary.repair.changedArtifacts.length
        : 0,
    },
  };
}

async function main() {
  const file = process.argv[2] || DEFAULT_SUMMARY_PATH;
  const content = await readFile(file, 'utf8');
  const summary = JSON.parse(content);
  const result = validateIterationSummary(summary, { filePath: file });
  if (result.issues.length > 0) {
    for (const item of result.issues) {
      console.error(`${item.code} ${item.file}: ${item.message}`);
    }
    process.exit(1);
  }
  console.log(
    `Iteration summary validation passed: ${result.summary.chatProbes} chat probes, ${result.summary.changedArtifacts} changed artifacts.`,
  );
}

const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === currentFile) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
