import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  validateSimulationEvidence,
} from '../scripts/validate-simulation-evidence.mjs';

const requiredProbeKinds = [
  'normal_interaction',
  'short_reply',
  'off_path',
  'background_question',
  'relationship_push',
  'secret_exploration',
  'boundary_test',
  'long_arc_macro_progression',
];

function completeEvidence(overrides = {}) {
  return {
    schemaVersion: 'moonloom.simulation-evidence.v1',
    roleId: 'redacted-role-id',
    cardStatus: 'private_card_created',
    cost: {
      stance: 'accepted',
      summary: 'normal billing accepted for this synthetic evidence shape',
    },
    probes: requiredProbeKinds.map((kind, index) => ({
      kind,
      prompt: `Synthetic player probe ${index + 1}`,
      expectedHealthyBehavior: 'The role reacts in character, changes state, and preserves player agency.',
      result: 'pass',
      evidenceSummary: 'Public-safe paraphrase of the simulated AI response.',
      checks: {
        characterConsistency: 'pass',
        voiceConsistency: 'pass',
        interactionTension: 'pass',
        userAgency: 'pass',
        formatStability: 'pass',
        reasonableLength: 'pass',
        safetyBoundary: 'pass',
        macroProgression: 'pass',
      },
    })),
    messagePreviews: requiredProbeKinds.map((kind, index) => ({
      probeKind: kind,
      conversationId: `redacted-conversation-${index + 1}`,
      chatId: `redacted-chat-${index + 1}`,
      previewUrl: `/pages/mcp/rolePreview?conversationId=redacted-conversation-${index + 1}&chatId=redacted-chat-${index + 1}&roleId=redacted-role-id&pageSize=30`,
      status: 'ready',
      rendererMode: 'xmlv3',
      domSummary: ['mode:xmlv3', 'state:present', `chat:redacted-chat-${index + 1}`],
      textOverflow: [],
      consoleErrors: [],
      visualNotes: 'Ready state observed with readable paragraphs.',
    })),
    longArcFormatStability: {
      turns: 10,
      structureShare: 0.91,
      panelRetention: 0.9,
      choicesRetention: 1,
      hiddenStateObserved: false,
      absorbingStateRisk: 'none',
      evidenceSummary: 'Synthetic long-arc probe preserved XMLV3 structure, visible panel state, and choices.',
    },
    rootCauseRepair: {
      needed: false,
      summary: 'No repeated Moonloom process failure in this synthetic evidence shape.',
    },
    ...overrides,
  };
}

function issueCodes(result) {
  return result.issues.map((item) => item.code);
}

test('simulation evidence validator accepts a complete closed-loop evidence packet', () => {
  const result = validateSimulationEvidence(completeEvidence(), { filePath: 'synthetic.json' });

  assert.deepEqual(result.issues, []);
  assert.equal(result.summary.probes, 8);
  assert.equal(result.summary.messagePreviews, 8);
  assert.equal(result.summary.failedChecks, 0);
});

test('simulation evidence validator rejects missing required probe and preview coverage', () => {
  const evidence = completeEvidence({
    probes: completeEvidence().probes.filter((probe) => probe.kind !== 'boundary_test'),
    messagePreviews: completeEvidence().messagePreviews.filter((preview) => preview.probeKind !== 'boundary_test'),
  });
  const result = validateSimulationEvidence(evidence, { filePath: 'synthetic.json' });
  const codes = issueCodes(result);

  assert.ok(codes.includes('simulation.probe.missing'));
  assert.ok(codes.includes('simulation.preview.missing'));
});

test('simulation evidence validator requires a repair packet for warning or failed checks', () => {
  const evidence = completeEvidence({
    probes: completeEvidence().probes.map((probe) => (
      probe.kind === 'short_reply'
        ? {
            ...probe,
            result: 'warning',
            checks: { ...probe.checks, interactionTension: 'warning' },
          }
        : probe
    )),
    rootCauseRepair: {
      needed: true,
      summary: 'Short replies can flatten the scene.',
    },
  });
  const result = validateSimulationEvidence(evidence, { filePath: 'synthetic.json' });

  assert.ok(issueCodes(result).includes('simulation.repair_packet.missing'));
});

test('simulation evidence validator requires long-arc format stability metrics', () => {
  const missing = completeEvidence({ longArcFormatStability: undefined });
  const missingResult = validateSimulationEvidence(missing, { filePath: 'synthetic.json' });
  assert.ok(issueCodes(missingResult).includes('simulation.long_arc_format_stability.missing'));

  const invalid = completeEvidence({
    longArcFormatStability: {
      turns: 9,
      structureShare: 1.4,
      panelRetention: -0.1,
      choicesRetention: 0.6,
      hiddenStateObserved: 'no',
      absorbingStateRisk: 'unknown',
      evidenceSummary: '',
    },
  });
  const invalidResult = validateSimulationEvidence(invalid, { filePath: 'synthetic.json' });
  const codes = issueCodes(invalidResult);

  assert.ok(codes.includes('simulation.long_arc_format_stability.turns_invalid'));
  assert.ok(codes.includes('simulation.long_arc_format_stability.ratio_invalid'));
  assert.ok(codes.includes('simulation.long_arc_format_stability.boolean_invalid'));
  assert.ok(codes.includes('simulation.long_arc_format_stability.risk_invalid'));
  assert.ok(codes.includes('simulation.long_arc_format_stability.summary_missing'));
});

test('simulation evidence validator rejects raw transcript storage and protected public claims', () => {
  const protectedClaim = [['production', 'data'].join(' '), ' evidence'].join('');
  const evidence = completeEvidence({
    rawTranscript: 'Player and role full transcript should not live in a public fixture.',
    notes: protectedClaim,
  });
  const result = validateSimulationEvidence(evidence, { filePath: 'synthetic.json' });
  const codes = issueCodes(result);

  assert.ok(codes.includes('simulation.raw_transcript.present'));
  assert.ok(codes.includes('simulation.public_claim.forbidden'));
});

test('README and chat simulation guidance expose the simulation evidence validator', async () => {
  const readme = await readFile('README.md', 'utf8');
  const chatSimulation = await readFile('skills/lunatalk-chat-simulation/SKILL.md', 'utf8');
  const playtestLoop = await readFile('references/playtest-loop.md', 'utf8');

  assert.match(readme, /validate:simulation/);
  assert.match(chatSimulation, /validate:simulation/);
  assert.match(playtestLoop, /simulation evidence/i);
});
