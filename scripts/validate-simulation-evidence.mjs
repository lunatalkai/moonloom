#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_EVIDENCE_PATH = 'examples/simulation-evidence.fixture.json';
const SCHEMA_VERSION = 'moonloom.simulation-evidence.v1';

const REQUIRED_PROBE_KINDS = [
  'normal_interaction',
  'short_reply',
  'off_path',
  'background_question',
  'relationship_push',
  'secret_exploration',
  'boundary_test',
];

const REQUIRED_CHECKS = [
  'characterConsistency',
  'voiceConsistency',
  'interactionTension',
  'userAgency',
  'formatStability',
  'reasonableLength',
  'safetyBoundary',
];

const REQUIRED_REPAIR_FIELDS = [
  'weakestMoonloomDimension',
  'patchTarget',
  'nextMoonloomSkill',
  'fieldsToPatch',
  'validationNeeded',
  'rerunStance',
  'costStance',
];

const VALID_RESULTS = new Set(['pass', 'warning', 'fail']);
const RAW_TRANSCRIPT_KEYS = new Set([
  'rawtranscript',
  'fulltranscript',
  'transcript',
  'rawmessages',
  'conversationraw',
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
  /Bearer\s+[A-Za-z0-9._-]{20,}/,
  /\bsk-[A-Za-z0-9][A-Za-z0-9._-]{15,}\b/,
];

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

function validatePublicSafety(evidence, issues, file) {
  let rawTranscriptFound = false;
  let protectedClaimFound = false;

  walk(evidence, ({ value, key }) => {
    if (RAW_TRANSCRIPT_KEYS.has(normalizeKey(key))) {
      rawTranscriptFound = true;
    }
    if (typeof value === 'string' && FORBIDDEN_PUBLIC_CLAIM_PATTERNS.some((pattern) => pattern.test(value))) {
      protectedClaimFound = true;
    }
  });

  if (rawTranscriptFound) {
    issues.push(issue('simulation.raw_transcript.present', file, 'Evidence contains raw transcript-shaped fields.'));
  }
  if (protectedClaimFound) {
    issues.push(issue('simulation.public_claim.forbidden', file, 'Evidence contains protected public-claim-shaped text.'));
  }
}

function requireString(container, field, issues, file, code, context) {
  if (typeof container?.[field] !== 'string' || container[field].trim() === '') {
    issues.push(issue(code, file, `${context} is missing ${field}.`));
  }
}

function validateProbe(probe, issues, file) {
  requireString(probe, 'kind', issues, file, 'simulation.probe.field_missing', 'Probe');
  requireString(probe, 'prompt', issues, file, 'simulation.probe.field_missing', `Probe ${probe?.kind || ''}`);
  requireString(
    probe,
    'expectedHealthyBehavior',
    issues,
    file,
    'simulation.probe.field_missing',
    `Probe ${probe?.kind || ''}`,
  );
  requireString(
    probe,
    'evidenceSummary',
    issues,
    file,
    'simulation.probe.field_missing',
    `Probe ${probe?.kind || ''}`,
  );

  if (!VALID_RESULTS.has(probe?.result)) {
    issues.push(issue('simulation.probe.result_invalid', file, `Probe ${probe?.kind || ''} has invalid result.`));
  }

  if (!isObject(probe?.checks)) {
    issues.push(issue('simulation.checks.missing', file, `Probe ${probe?.kind || ''} is missing checks.`));
    return 1;
  }

  let failedChecks = 0;
  for (const checkName of REQUIRED_CHECKS) {
    const value = probe.checks[checkName];
    if (!VALID_RESULTS.has(value)) {
      issues.push(
        issue('simulation.check.missing', file, `Probe ${probe.kind || ''} is missing check: ${checkName}`),
      );
      failedChecks += 1;
    } else if (value !== 'pass') {
      failedChecks += 1;
    }
  }

  if (probe.result && probe.result !== 'pass') {
    failedChecks += 1;
  }

  return failedChecks;
}

function validatePreview(preview, issues, file, probeKind) {
  if (!preview) {
    issues.push(issue('simulation.preview.missing', file, `Missing message preview for probe: ${probeKind}`));
    return;
  }

  for (const field of ['probeKind', 'conversationId', 'chatId', 'previewUrl', 'status', 'rendererMode']) {
    requireString(preview, field, issues, file, 'simulation.preview.field_missing', `Preview ${probeKind}`);
  }

  if (preview.status !== 'ready') {
    issues.push(issue('simulation.preview.not_ready', file, `Preview ${probeKind} is not ready.`));
  }
  if (typeof preview.previewUrl === 'string' && !preview.previewUrl.includes('/pages/mcp/rolePreview?')) {
    issues.push(issue('simulation.preview.url_invalid', file, `Preview ${probeKind} does not use the dedicated harness.`));
  }
  if (!Array.isArray(preview.domSummary) || preview.domSummary.length === 0) {
    issues.push(issue('simulation.preview.dom_missing', file, `Preview ${probeKind} is missing DOM summary.`));
  }
  if (!Array.isArray(preview.textOverflow)) {
    issues.push(issue('simulation.preview.overflow_missing', file, `Preview ${probeKind} is missing overflow report.`));
  }
  if (!Array.isArray(preview.consoleErrors)) {
    issues.push(issue('simulation.preview.console_missing', file, `Preview ${probeKind} is missing console error report.`));
  }
}

function validateRepairPacket(evidence, issues, file, failedChecks) {
  const repairNeeded = failedChecks > 0 || evidence?.rootCauseRepair?.needed === true;
  if (!repairNeeded) {
    return;
  }

  const packet = evidence?.repairPacket;
  if (!isObject(packet)) {
    issues.push(issue('simulation.repair_packet.missing', file, 'Warning or failed checks require a repair packet.'));
    return;
  }

  for (const field of REQUIRED_REPAIR_FIELDS) {
    if (Array.isArray(packet[field])) {
      if (packet[field].length === 0) {
        issues.push(issue('simulation.repair_packet.field_missing', file, `Repair packet is missing ${field}.`));
      }
    } else {
      requireString(packet, field, issues, file, 'simulation.repair_packet.field_missing', 'Repair packet');
    }
  }
}

export function validateSimulationEvidence(evidence, options = {}) {
  const file = options.filePath || DEFAULT_EVIDENCE_PATH;
  const issues = [];

  if (!isObject(evidence)) {
    issues.push(issue('simulation.evidence.invalid', file, 'Evidence must be a JSON object.'));
    return { issues, summary: { probes: 0, messagePreviews: 0, failedChecks: 0 } };
  }

  validatePublicSafety(evidence, issues, file);

  if (evidence.schemaVersion !== SCHEMA_VERSION) {
    issues.push(issue('simulation.schema.invalid', file, `Expected schemaVersion ${SCHEMA_VERSION}.`));
  }
  requireString(evidence, 'roleId', issues, file, 'simulation.field_missing', 'Evidence');
  requireString(evidence, 'cardStatus', issues, file, 'simulation.field_missing', 'Evidence');

  if (!isObject(evidence.cost) || !['accepted', 'skipped'].includes(evidence.cost.stance)) {
    issues.push(issue('simulation.cost.invalid', file, 'Evidence cost stance must be accepted or skipped.'));
  }

  const probes = Array.isArray(evidence.probes) ? evidence.probes : [];
  const previews = Array.isArray(evidence.messagePreviews) ? evidence.messagePreviews : [];
  if (!Array.isArray(evidence.probes)) {
    issues.push(issue('simulation.probes.invalid', file, 'Evidence probes must be an array.'));
  }
  if (!Array.isArray(evidence.messagePreviews)) {
    issues.push(issue('simulation.previews.invalid', file, 'Evidence messagePreviews must be an array.'));
  }

  const probeKinds = new Set(probes.map((probe) => probe?.kind));
  const previewByKind = new Map(previews.map((preview) => [preview?.probeKind, preview]));
  for (const kind of REQUIRED_PROBE_KINDS) {
    if (!probeKinds.has(kind)) {
      issues.push(issue('simulation.probe.missing', file, `Missing required probe: ${kind}`));
    }
    validatePreview(previewByKind.get(kind), issues, file, kind);
  }

  let failedChecks = 0;
  for (const probe of probes) {
    failedChecks += validateProbe(probe, issues, file);
  }
  for (const preview of previews) {
    if (preview?.probeKind && !REQUIRED_PROBE_KINDS.includes(preview.probeKind)) {
      issues.push(issue('simulation.preview.unmapped', file, `Preview uses unknown probeKind: ${preview.probeKind}`));
    }
  }

  validateRepairPacket(evidence, issues, file, failedChecks);

  return {
    issues,
    summary: {
      probes: probes.length,
      messagePreviews: previews.length,
      failedChecks,
    },
  };
}

export async function validateSimulationEvidenceFile(filePath = DEFAULT_EVIDENCE_PATH) {
  const raw = await readFile(filePath, 'utf8');
  return validateSimulationEvidence(JSON.parse(raw), { filePath });
}

async function main() {
  const target = process.argv[2] || DEFAULT_EVIDENCE_PATH;
  const result = await validateSimulationEvidenceFile(target);

  if (result.issues.length > 0) {
    for (const item of result.issues) {
      console.error(`${item.code} ${item.file}: ${item.message}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(
    `Simulation evidence validation passed: ${result.summary.probes} probes, ${result.summary.messagePreviews} message previews, ${result.summary.failedChecks} failed checks.`,
  );
}

const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === currentFile) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
