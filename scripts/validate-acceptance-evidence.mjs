#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_ACCEPTANCE_PATH = 'examples/end-to-end-acceptance.fixture.json';
const SCHEMA_VERSION = 'moonloom.end-to-end-acceptance.v1';

const COMPLETE_VISUAL_STATUSES = new Set(['visual_complete', 'behavior_checked', 'per_turn_visual_checked']);
const BEHAVIOR_STATUSES = new Set(['behavior_checked', 'per_turn_visual_checked']);
const VALID_CARD_STATUSES = new Set([
  'draft_complete',
  'private_card_created',
  'visual_complete',
  'behavior_checked',
  'per_turn_visual_checked',
  'cost_gated',
]);

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
  /\bhttps?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?(?:\/[^\s"'<>)]*)?/i,
  /Bearer\s+[A-Za-z0-9._-]{20,}/,
  /\bsk-[A-Za-z0-9][A-Za-z0-9._-]{15,}\b/,
  /\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/,
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

function requireString(container, field, issues, file, code, context) {
  if (typeof container?.[field] !== 'string' || container[field].trim() === '') {
    issues.push(issue(code, file, `${context} is missing ${field}.`));
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
    issues.push(issue('acceptance.raw_transcript.present', file, 'Evidence contains raw transcript-shaped fields.'));
  }
  if (protectedClaimFound) {
    issues.push(issue('acceptance.public_claim.forbidden', file, 'Evidence contains protected public-claim-shaped text.'));
  }
}

function validateAssetEvidence(evidence, issues, file, requireVisualComplete) {
  const assets = evidence.assets;
  if (!isObject(assets)) {
    issues.push(issue('acceptance.assets.missing', file, 'Evidence is missing assets.'));
    return 0;
  }

  const checks = [
    ['avatar', 'acceptance.asset.avatar_missing'],
    ['background', 'acceptance.asset.background_missing'],
  ];
  let passed = 0;
  for (const [field, code] of checks) {
    const item = assets[field];
    if (item?.status === 'patched' && typeof item.evidence === 'string' && item.evidence.trim()) {
      passed += 1;
      continue;
    }
    if (requireVisualComplete) {
      issues.push(issue(code, file, `Visual completion requires patched ${field} asset evidence.`));
    }
  }

  if (assets.rolePatchAssets?.status === 'pass' && typeof assets.rolePatchAssets.evidence === 'string' && assets.rolePatchAssets.evidence.trim()) {
    passed += 1;
  } else if (requireVisualComplete) {
    issues.push(issue('acceptance.asset.patch_missing', file, 'Visual completion requires role_patch_assets pass evidence.'));
  }
  return passed;
}

function validateValidationEvidence(evidence, issues, file, requireVisualComplete) {
  const validation = evidence.validation;
  if (!isObject(validation)) {
    issues.push(issue('acceptance.validation.missing', file, 'Evidence is missing validation.'));
    return;
  }

  if (requireVisualComplete && validation.status !== 'pass') {
    issues.push(issue('acceptance.validation.not_pass', file, 'Visual completion requires validation.status pass.'));
  }
  if (requireVisualComplete && validation.validateRoleStatus !== 'pass') {
    issues.push(issue('acceptance.validation.role_not_pass', file, 'Visual completion requires validate_role pass evidence.'));
  }
  if (requireVisualComplete) {
    requireString(validation, 'tokenBudgetSummary', issues, file, 'acceptance.validation.token_budget_missing', 'Validation');
  }
}

function validateRenderEvidence(evidence, issues, file, requireVisualComplete) {
  const render = evidence.render;
  if (!isObject(render)) {
    issues.push(issue('acceptance.render.missing', file, 'Evidence is missing render.'));
    return;
  }

  if (requireVisualComplete && render.status !== 'pass') {
    issues.push(issue('acceptance.render.not_pass', file, 'Visual completion requires render.status pass.'));
  }
  if (requireVisualComplete && render.previewStatus !== 'ready') {
    issues.push(issue('acceptance.render.preview_not_ready', file, 'Visual completion requires ready preview evidence.'));
  }
  if (requireVisualComplete) {
    requireString(render, 'rendererMode', issues, file, 'acceptance.render.renderer_missing', 'Render');
    if (!Array.isArray(render.domSummary) || render.domSummary.length === 0) {
      issues.push(issue('acceptance.render.dom_missing', file, 'Render evidence is missing DOM summary.'));
    }
    if (!Array.isArray(render.textOverflow)) {
      issues.push(issue('acceptance.render.overflow_missing', file, 'Render evidence is missing text overflow report.'));
    }
    if (!Array.isArray(render.consoleErrors)) {
      issues.push(issue('acceptance.render.console_missing', file, 'Render evidence is missing console error report.'));
    }
  }
}

function validateAppVisualEvidence(evidence, issues, file, requireVisualComplete) {
  const appVisual = evidence.appVisualCheck;
  if (!isObject(appVisual)) {
    issues.push(issue('acceptance.app_visual.missing', file, 'Evidence is missing appVisualCheck.'));
    return;
  }
  if (!requireVisualComplete) return;

  if (appVisual.roleDetailAvatar !== 'pass') {
    issues.push(issue('acceptance.app_visual.role_avatar_missing', file, 'Visual completion requires role detail avatar evidence.'));
  }
  if (appVisual.chatBackground !== 'pass') {
    issues.push(issue('acceptance.app_visual.chat_background_missing', file, 'Visual completion requires chat background evidence.'));
  }
  if (appVisual.imageRequests?.avatar !== 'success') {
    issues.push(issue('acceptance.image_request.avatar_missing', file, 'Visual completion requires successful avatar image request evidence.'));
  }
  if (appVisual.imageRequests?.background !== 'success') {
    issues.push(issue('acceptance.image_request.background_missing', file, 'Visual completion requires successful background image request evidence.'));
  }
}

function validateSimulationEvidence(evidence, issues, file, requireBehaviorChecked) {
  const simulation = evidence.simulation;
  if (!isObject(simulation)) {
    issues.push(issue('acceptance.simulation.missing', file, 'Evidence is missing simulation.'));
    return 0;
  }

  const probes = Array.isArray(simulation.probes) ? simulation.probes : [];
  if (!requireBehaviorChecked) return probes.length;

  if (simulation.costStance !== 'accepted') {
    issues.push(issue('acceptance.simulation.cost_not_accepted', file, 'Behavior completion requires accepted simulation cost.'));
  }
  if (simulation.evidenceValidated !== true) {
    issues.push(issue('acceptance.simulation.evidence_not_validated', file, 'Behavior completion requires validated simulation evidence.'));
  }
  if (simulation.result !== 'pass') {
    issues.push(issue('acceptance.simulation.not_pass', file, 'Behavior completion requires passing simulation result.'));
  }
  const probeSet = new Set(probes);
  for (const kind of REQUIRED_PROBE_KINDS) {
    if (!probeSet.has(kind)) {
      issues.push(issue('acceptance.simulation.probe_missing', file, `Missing simulation probe: ${kind}`));
    }
  }
  return probes.length;
}

function validateMessagePreviewEvidence(evidence, issues, file, requireBehaviorChecked) {
  const previews = evidence.messagePreviews;
  if (!isObject(previews)) {
    issues.push(issue('acceptance.message_preview.missing', file, 'Evidence is missing messagePreviews.'));
    return;
  }
  if (!requireBehaviorChecked) return;

  if (previews.status !== 'per_turn_visual_checked') {
    issues.push(issue('acceptance.message_preview.not_checked', file, 'Behavior completion requires per-turn message preview evidence.'));
  }
  if (!Array.isArray(previews.checkedChatIds) || previews.checkedChatIds.length === 0) {
    issues.push(issue('acceptance.message_preview.chat_ids_missing', file, 'Message preview evidence is missing checked chat IDs.'));
  }
  requireString(previews, 'evidence', issues, file, 'acceptance.message_preview.evidence_missing', 'Message previews');
}

export function validateAcceptanceEvidence(evidence, options = {}) {
  const file = options.filePath || DEFAULT_ACCEPTANCE_PATH;
  const issues = [];

  if (!isObject(evidence)) {
    issues.push(issue('acceptance.evidence.invalid', file, 'Evidence must be a JSON object.'));
    return { issues, summary: { selectedSkills: 0, assetChecks: 0, simulationProbes: 0 } };
  }

  validatePublicSafety(evidence, issues, file);

  if (evidence.schemaVersion !== SCHEMA_VERSION) {
    issues.push(issue('acceptance.schema.invalid', file, `Expected schemaVersion ${SCHEMA_VERSION}.`));
  }
  requireString(evidence, 'trigger', issues, file, 'acceptance.field_missing', 'Evidence');

  const selectedSkills = Array.isArray(evidence.selectedSkills) ? evidence.selectedSkills : [];
  if (!Array.isArray(evidence.selectedSkills) || selectedSkills.length === 0) {
    issues.push(issue('acceptance.skills.missing', file, 'Evidence must include selectedSkills.'));
  }
  if (!selectedSkills.includes('using-moonloom')) {
    issues.push(issue('acceptance.skills.router_missing', file, 'Evidence should start from using-moonloom routing.'));
  }

  const cardStatus = evidence.card?.status;
  if (!isObject(evidence.card)) {
    issues.push(issue('acceptance.card.missing', file, 'Evidence is missing card.'));
  } else {
    requireString(evidence.card, 'roleId', issues, file, 'acceptance.card.role_missing', 'Card');
    if (!VALID_CARD_STATUSES.has(cardStatus)) {
      issues.push(issue('acceptance.card.status_invalid', file, `Invalid card status: ${cardStatus || ''}.`));
    }
  }

  const requireVisualComplete = COMPLETE_VISUAL_STATUSES.has(cardStatus);
  const requireBehaviorChecked = BEHAVIOR_STATUSES.has(cardStatus);
  const assetChecks = validateAssetEvidence(evidence, issues, file, requireVisualComplete);
  validateValidationEvidence(evidence, issues, file, requireVisualComplete);
  validateRenderEvidence(evidence, issues, file, requireVisualComplete);
  validateAppVisualEvidence(evidence, issues, file, requireVisualComplete);
  const simulationProbes = validateSimulationEvidence(evidence, issues, file, requireBehaviorChecked);
  validateMessagePreviewEvidence(evidence, issues, file, requireBehaviorChecked);

  if (requireVisualComplete && Array.isArray(evidence.remainingNonCompleteGates) && evidence.remainingNonCompleteGates.length > 0) {
    issues.push(issue('acceptance.remaining_gates.present', file, 'Complete statuses cannot have remaining non-complete gates.'));
  }

  return {
    issues,
    summary: {
      selectedSkills: selectedSkills.length,
      assetChecks,
      simulationProbes,
    },
  };
}

export async function validateAcceptanceEvidenceFile(filePath = DEFAULT_ACCEPTANCE_PATH) {
  const raw = await readFile(filePath, 'utf8');
  return validateAcceptanceEvidence(JSON.parse(raw), { filePath });
}

async function main() {
  const target = process.argv[2] || DEFAULT_ACCEPTANCE_PATH;
  const result = await validateAcceptanceEvidenceFile(target);

  if (result.issues.length > 0) {
    for (const item of result.issues) {
      console.error(`${item.code} ${item.file}: ${item.message}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(
    `Acceptance evidence validation passed: ${result.summary.selectedSkills} skills, ${result.summary.assetChecks} asset checks, ${result.summary.simulationProbes} simulation probes.`,
  );
}

const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === currentFile) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
