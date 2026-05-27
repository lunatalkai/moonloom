import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  validateBenchmarkPattern,
} from '../scripts/validate-benchmark-pattern.mjs';

function completePacket(overrides = {}) {
  return {
    schemaVersion: 'moonloom.benchmark-pattern.v1',
    calibrationScope: 'relationship story cards with XMLV3 presentation pressure',
    aggregateSignals: [
      'High-ambition drafts need detail modules that change future turns.',
      'Welcome should prove the first action without becoming the rulebook.',
    ],
    deepSampleReading: [
      {
        observation: 'Strong cards keep role initiative active after short or passive player replies.',
        craftPattern: 'Define proactive turn recipes for passive, curious, resistant, and route-changing player moves.',
      },
      {
        observation: 'Scannable presentation separates state, scene prose, and choices.',
        craftPattern: 'Use Theme V3/XMLV3 semantic grouping and compact choice grids when the first screen has several actions.',
      },
    ],
    ordinaryCardContrast: [
      'Weak drafts list biography and mood but do not define second-turn behavior.',
      'Decorative choices often do not change state, access, clue, tone, or consequence.',
    ],
    cardShapesRepresented: ['relationship', 'story', 'daily-life'],
    detailDensityPattern: 'Prioritize operating-engine modules over decorative lore.',
    durableOperatingEnginePattern: 'Include motive, pressure, player leverage, role initiative, state changes, secrets, and consequence timing.',
    openingFirstTurnProofPattern: 'Open with place, role action, immediate pressure, and two to four meaningful player moves.',
    longplaySpinePattern: 'Carry a time, secret, relationship, resource, route, or promise hook beyond the first exchange.',
    roleInitiativePattern: 'The role asks, delays, bargains, reveals, tests, or complicates without taking over player action.',
    playerAgencyPattern: 'The player may refuse, redirect, question, slow down, or choose a route without being overwritten.',
    xmlv3PresentationGap: 'Use layout packs and Theme V3 first; record missing capability only as a compatible extension idea.',
    sourceSafetyCheck: {
      noRawSourceText: true,
      noExactMarkup: true,
      noIdentifiers: true,
      noSourceUrls: true,
      noQueryText: true,
      noSourceSelectionFlow: true,
      noProvenanceOrPrivateMetricClaim: true,
    },
    moonloomGap: 'Generated test cards still under-specify reusable scene reservoirs.',
    repairTarget: 'Preserve scene reservoir and turn recipes in detail templates.',
    nextSkill: 'lunatalk-detail-engineer',
    handoff: 'Patch detail templates, then rerun fixture and simulation evidence checks.',
    ...overrides,
  };
}

function issueCodes(result) {
  return result.issues.map((item) => item.code);
}

test('benchmark pattern validator accepts a public-safe anonymized packet', () => {
  const result = validateBenchmarkPattern(completePacket(), { filePath: 'benchmark-pattern.json' });

  assert.deepEqual(result.issues, []);
  assert.equal(result.summary.deepSampleReadings, 2);
  assert.equal(result.summary.cardShapes, 3);
});

test('benchmark pattern validator rejects source selection workflow and protected source data', () => {
  const result = validateBenchmarkPattern(
    completePacket({
      sourceSelectionFlow: 'Pick cards by a private scoring route before writing the packet.',
      notes: 'Use https://api.lunatalk.pro/admin/private as the source endpoint.',
      rawSourceText: 'A copied card excerpt would be unsafe here.',
      sourceSafetyCheck: {
        noRawSourceText: false,
        noExactMarkup: true,
        noIdentifiers: true,
        noSourceUrls: false,
        noQueryText: true,
        noSourceSelectionFlow: false,
        noProvenanceOrPrivateMetricClaim: true,
      },
    }),
    { filePath: 'benchmark-pattern.json' },
  );
  const codes = issueCodes(result);

  assert.ok(codes.includes('benchmark.source_selection.present'));
  assert.ok(codes.includes('benchmark.raw_source.present'));
  assert.ok(codes.includes('benchmark.public_claim.forbidden'));
  assert.ok(codes.includes('benchmark.safety_check.failed'));
});

test('benchmark pattern validator rejects SQL, UUIDs, exact markup, and underspecified packets', () => {
  const sql = ['SELECT', 'role_name', 'FROM', 'character_role'].join(' ');
  const uuid = '123e4567-e89b-12d3-a456-426614174000';
  const result = validateBenchmarkPattern(
    completePacket({
      aggregateSignals: [],
      deepSampleReading: [{ observation: '', craftPattern: '' }],
      exactMarkup: '<panel><choice>copied layout</choice></panel>',
      queryText: sql,
      sourceId: uuid,
      sourceSafetyCheck: {
        noRawSourceText: true,
        noExactMarkup: false,
        noIdentifiers: false,
        noSourceUrls: true,
        noQueryText: false,
        noSourceSelectionFlow: true,
        noProvenanceOrPrivateMetricClaim: true,
      },
    }),
    { filePath: 'benchmark-pattern.json' },
  );
  const codes = issueCodes(result);

  assert.ok(codes.includes('benchmark.aggregate_signals.missing'));
  assert.ok(codes.includes('benchmark.deep_sample.field_missing'));
  assert.ok(codes.includes('benchmark.exact_markup.present'));
  assert.ok(codes.includes('benchmark.sql.present'));
  assert.ok(codes.includes('benchmark.identifier.present'));
});

test('README and benchmark reference expose the benchmark pattern validator', async () => {
  const readme = await readFile('README.md', 'utf8');
  const reference = await readFile('references/benchmark-pattern-calibration.md', 'utf8');
  const packageJson = JSON.parse(await readFile('package.json', 'utf8'));

  assert.match(readme, /validate:benchmark-pattern/);
  assert.match(reference, /validate:benchmark-pattern/);
  assert.equal(packageJson.scripts['validate:benchmark-pattern'], 'node scripts/validate-benchmark-pattern.mjs');
  assert.match(packageJson.scripts.validate, /validate-benchmark-pattern\.mjs/);
});
