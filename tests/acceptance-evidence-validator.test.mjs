import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  validateAcceptanceEvidence,
} from '../scripts/validate-acceptance-evidence.mjs';

function completeAcceptance(overrides = {}) {
  return {
    schemaVersion: 'moonloom.end-to-end-acceptance.v1',
    trigger: 'synthetic complete-card acceptance run',
    selectedSkills: [
      'using-moonloom',
      'lunatalk-creation-conductor',
      'lunatalk-card-author',
      'lunatalk-render-review',
      'lunatalk-chat-simulation',
    ],
    card: {
      status: 'behavior_checked',
      roleId: 'redacted-role-id',
      fixture: 'public-safe synthetic role card',
    },
    assets: {
      avatar: { status: 'patched', evidence: 'avatar asset request succeeded' },
      background: { status: 'patched', evidence: 'background asset request succeeded' },
      rolePatchAssets: { status: 'pass', evidence: 'asset patch accepted by MCP' },
    },
    validation: {
      status: 'pass',
      validateRoleStatus: 'pass',
      tokenBudgetSummary: 'detail within target band; welcome compact',
    },
    render: {
      status: 'pass',
      rendererMode: 'xmlv3',
      previewStatus: 'ready',
      domSummary: ['mode:xmlv3', 'state:present'],
      textOverflow: [],
      consoleErrors: [],
      visualNotes: 'Full-card preview is readable.',
    },
    appVisualCheck: {
      roleDetailAvatar: 'pass',
      chatBackground: 'pass',
      imageRequests: {
        avatar: 'success',
        background: 'success',
      },
    },
    simulation: {
      costStance: 'accepted',
      evidenceValidated: true,
      probes: [
        'normal_interaction',
        'short_reply',
        'off_path',
        'background_question',
        'relationship_push',
        'secret_exploration',
        'boundary_test',
        'long_arc_macro_progression',
      ],
      result: 'pass',
    },
    messagePreviews: {
      status: 'per_turn_visual_checked',
      checkedChatIds: ['redacted-chat-1', 'redacted-chat-2'],
      evidence: 'Selected AI turns opened in the dedicated per-message preview harness.',
    },
    failures: [],
    rootCauseRepair: {
      needed: false,
      summary: 'No root-cause repair required in this synthetic evidence shape.',
    },
    remainingNonCompleteGates: [],
    ...overrides,
  };
}

function issueCodes(result) {
  return result.issues.map((item) => item.code);
}

test('acceptance evidence validator accepts a complete visual and behavior checked packet', () => {
  const result = validateAcceptanceEvidence(completeAcceptance(), { filePath: 'acceptance.json' });

  assert.deepEqual(result.issues, []);
  assert.equal(result.summary.selectedSkills, 5);
  assert.equal(result.summary.assetChecks, 3);
  assert.equal(result.summary.simulationProbes, 8);
});

test('acceptance evidence validator rejects visual complete status without patched assets and app visual proof', () => {
  const evidence = completeAcceptance({
    card: { status: 'visual_complete', roleId: 'redacted-role-id' },
    assets: {
      avatar: { status: 'patched', evidence: 'avatar succeeded' },
      background: { status: 'missing', evidence: '' },
      rolePatchAssets: { status: 'pass', evidence: 'partial patch' },
    },
    appVisualCheck: {
      roleDetailAvatar: 'pass',
      chatBackground: 'missing',
      imageRequests: {
        avatar: 'success',
        background: 'missing',
      },
    },
  });
  const result = validateAcceptanceEvidence(evidence, { filePath: 'acceptance.json' });
  const codes = issueCodes(result);

  assert.ok(codes.includes('acceptance.asset.background_missing'));
  assert.ok(codes.includes('acceptance.app_visual.chat_background_missing'));
  assert.ok(codes.includes('acceptance.image_request.background_missing'));
});

test('acceptance evidence validator rejects behavior checked status without accepted simulation and per-message preview evidence', () => {
  const evidence = completeAcceptance({
    simulation: {
      costStance: 'skipped',
      evidenceValidated: false,
      probes: ['normal_interaction'],
      result: 'skipped',
    },
    messagePreviews: {
      status: 'unavailable',
      checkedChatIds: [],
      evidence: '',
    },
  });
  const result = validateAcceptanceEvidence(evidence, { filePath: 'acceptance.json' });
  const codes = issueCodes(result);

  assert.ok(codes.includes('acceptance.simulation.cost_not_accepted'));
  assert.ok(codes.includes('acceptance.simulation.evidence_not_validated'));
  assert.ok(codes.includes('acceptance.simulation.probe_missing'));
  assert.ok(codes.includes('acceptance.message_preview.not_checked'));
});

test('acceptance evidence validator rejects raw transcript storage and protected public claims', () => {
  const protectedClaim = [['production', 'data'].join(' '), ' evidence'].join('');
  const evidence = completeAcceptance({
    rawTranscript: 'Full transcript should not enter public Moonloom.',
    notes: protectedClaim,
  });
  const result = validateAcceptanceEvidence(evidence, { filePath: 'acceptance.json' });
  const codes = issueCodes(result);

  assert.ok(codes.includes('acceptance.raw_transcript.present'));
  assert.ok(codes.includes('acceptance.public_claim.forbidden'));
});

test('README and end-to-end reference expose the acceptance evidence validator', async () => {
  const readme = await readFile('README.en.md', 'utf8');
  const reference = await readFile('references/end-to-end-acceptance.md', 'utf8');

  assert.match(readme, /validate:acceptance/);
  assert.match(reference, /validate:acceptance/);
  assert.match(reference, /end-to-end acceptance evidence/i);
});
