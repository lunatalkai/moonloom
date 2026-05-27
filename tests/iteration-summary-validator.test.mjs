import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  validateIterationSummary,
} from '../scripts/validate-iteration-summary.mjs';

function completeSummary(overrides = {}) {
  return {
    schemaVersion: 'moonloom.iteration-summary.v1',
    iterationLabel: 'synthetic-relationship-story-loop',
    cardShape: 'relationship-story',
    language: 'zh-Hant',
    testCard: {
      premiseSummary: 'A private test card about a role under immediate social pressure.',
      detailEngineSummary: 'Detail covers motive, player leverage, proactive turns, state, secrets, and consequences.',
      openingSummary: 'Opening proves place, role action, pressure, and multiple player moves.',
      tokenStance: 'Detail was expanded for reusable behavior; welcome stayed compact.',
    },
    evidence: {
      fieldReview: {
        status: 'pass',
        summary: 'Detail modules, welcome ratio, language consistency, and asset readiness were reviewed.',
      },
      mcpVisualValidation: {
        status: 'pass',
        desktopPreview: 'pass',
        mobilePreview: 'pass',
        rendererMode: 'xmlv3',
        summary: 'Full-card and message previews kept state, scene prose, and choices readable.',
      },
      chatPlaytest: {
        status: 'pass',
        probes: [
          'normal_interaction',
          'short_reply',
          'off_path',
          'background_question',
          'relationship_push',
          'secret_exploration',
          'boundary_test',
        ],
        perMessagePreview: 'pass',
        summary: 'Replies preserved role initiative, user agency, format stability, and safety boundaries.',
      },
      benchmarkPattern: {
        status: 'validated',
        packetVersion: 'moonloom.benchmark-pattern.v1',
        summary: 'The anonymized pattern gap focused on scene reservoirs and second-turn initiative.',
      },
    },
    gapComparison: {
      detailGap: 'Scene reservoir was present but not reusable enough.',
      openingGap: 'First-turn choices were meaningful but could expose route consequence more clearly.',
      longplayGap: 'Second-turn hook needed a clearer state or promise update.',
      xmlv3Gap: 'Choice grouping was readable; no new XMLV3 capability needed this round.',
    },
    repair: {
      rootCause: 'Templates did not force reusable scene seeds and turn recipes.',
      changedArtifacts: [
        'references/card-authoring-templates.md',
        'tests/detail-engineer-coverage.test.mjs',
      ],
      nextMoonloomSkill: 'lunatalk-detail-engineer',
      rerunResult: 'pass',
    },
    safetyCheck: {
      noRawCardText: true,
      noRawTranscript: true,
      noRoleOrChatIds: true,
      noSourceSelectionFlow: true,
      noQueryText: true,
      noInternalUrls: true,
      noPrivateMetrics: true,
    },
    nextTodo: [
      'Run another private-card loop where XMLV3 action layout is the suspected weakest layer.',
    ],
    ...overrides,
  };
}

function issueCodes(result) {
  return result.issues.map((item) => item.code);
}

test('iteration summary validator accepts a closed-loop public-safe summary', () => {
  const result = validateIterationSummary(completeSummary(), { filePath: 'iteration-summary.json' });

  assert.deepEqual(result.issues, []);
  assert.equal(result.summary.chatProbes, 7);
  assert.equal(result.summary.changedArtifacts, 2);
});

test('iteration summary validator rejects raw card, raw transcript, IDs, source selection, and private URLs', () => {
  const result = validateIterationSummary(
    completeSummary({
      roleId: '123e4567-e89b-12d3-a456-426614174000',
      rawCardText: 'A copied role card field should never be stored.',
      rawTranscript: 'User and assistant raw messages should never be stored.',
      sourceSelectionFlow: 'Pick cards by a private route before writing.',
      internalUrl: 'https://api.lunatalk.pro/private/check',
      safetyCheck: {
        noRawCardText: false,
        noRawTranscript: false,
        noRoleOrChatIds: false,
        noSourceSelectionFlow: false,
        noQueryText: true,
        noInternalUrls: false,
        noPrivateMetrics: true,
      },
    }),
    { filePath: 'iteration-summary.json' },
  );
  const codes = issueCodes(result);

  assert.ok(codes.includes('iteration.raw_card.present'));
  assert.ok(codes.includes('iteration.raw_transcript.present'));
  assert.ok(codes.includes('iteration.identifier.present'));
  assert.ok(codes.includes('iteration.source_selection.present'));
  assert.ok(codes.includes('iteration.public_claim.forbidden'));
  assert.ok(codes.includes('iteration.safety_check.failed'));
});

test('iteration summary validator rejects incomplete evidence and untraceable repairs', () => {
  const result = validateIterationSummary(
    completeSummary({
      evidence: {
        fieldReview: { status: 'pass', summary: 'fields checked' },
        mcpVisualValidation: { status: 'missing', summary: '' },
        chatPlaytest: { status: 'missing', probes: ['normal_interaction'], perMessagePreview: 'missing', summary: '' },
        benchmarkPattern: { status: 'missing', summary: '' },
      },
      gapComparison: {
        detailGap: '',
        openingGap: '',
        longplayGap: '',
        xmlv3Gap: '',
      },
      repair: {
        rootCause: '',
        changedArtifacts: [],
        nextMoonloomSkill: '',
        rerunResult: '',
      },
      nextTodo: [],
    }),
    { filePath: 'iteration-summary.json' },
  );
  const codes = issueCodes(result);

  assert.ok(codes.includes('iteration.visual.status_invalid'));
  assert.ok(codes.includes('iteration.chat.probe_missing'));
  assert.ok(codes.includes('iteration.benchmark.status_invalid'));
  assert.ok(codes.includes('iteration.gap.field_missing'));
  assert.ok(codes.includes('iteration.repair.changed_artifacts_missing'));
  assert.ok(codes.includes('iteration.next_todo.missing'));
});

test('README, iteration reference, and iteration director expose iteration summary validation', async () => {
  const readme = await readFile('README.md', 'utf8');
  const reference = await readFile('references/iteration-loop.md', 'utf8');
  const skill = await readFile('skills/lunatalk-iteration-director/SKILL.md', 'utf8');
  const packageJson = JSON.parse(await readFile('package.json', 'utf8'));

  assert.match(readme, /validate:iteration-summary/);
  assert.match(reference, /Iteration summary evidence/i);
  assert.match(reference, /validate:iteration-summary/);
  assert.match(skill, /validate:iteration-summary/);
  assert.equal(packageJson.scripts['validate:iteration-summary'], 'node scripts/validate-iteration-summary.mjs');
  assert.match(packageJson.scripts.validate, /validate-iteration-summary\.mjs/);
});
