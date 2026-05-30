import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  validateCompleteFixture,
} from '../scripts/validate-complete-fixture.mjs';

const fixturePath = 'examples/complete-synthetic-card-fixture.md';

async function readFixture() {
  return readFile(fixturePath, 'utf8');
}

function issueCodes(result) {
  return result.issues.map((item) => item.code);
}

test('complete fixture validator accepts the committed synthetic card fixture', async () => {
  const fixture = await readFixture();
  const result = validateCompleteFixture(fixture, { filePath: fixturePath });

  assert.deepEqual(result.issues, []);
  assert.equal(result.summary.requiredSections, 12);
  assert.equal(result.summary.xmlTags, 6);
  assert.equal(result.summary.playtestProbes, 8);
  assert.equal(result.summary.stateKeys, 3);
  assert.equal(result.summary.visualAssetBriefs, 2);
  assert.ok(result.summary.detailChars >= 7000);
});

test('complete fixture validator rejects missing playtest coverage', async () => {
  const fixture = (await readFixture())
    .replace(/8\. long-arc macro-progression:[\s\S]*?opening scene\.\n/, '')
    .replaceAll('long-arc macro-progression', 'macro arc removed');
  const result = validateCompleteFixture(fixture, { filePath: fixturePath });

  assert.ok(issueCodes(result).includes('fixture.probe.missing'));
});

test('complete fixture validator rejects broken XMLV3 state JSON', async () => {
  const fixture = (await readFixture()).replace(
    /<state>\{[^<]+<\/state>/,
    '<state>{"rain":"steady"</state>',
  );
  const result = validateCompleteFixture(fixture, { filePath: fixturePath });

  assert.ok(issueCodes(result).includes('fixture.xmlv3.state_invalid'));
});

test('complete fixture validator rejects placeholders and protected public claims', async () => {
  const protectedClaim = [['production', 'data'].join(' '), ' evidence'].join('');
  const fixture = `${await readFixture()}\nTODO: [fill later]\n${protectedClaim}\n`;
  const result = validateCompleteFixture(fixture, { filePath: fixturePath });
  const codes = issueCodes(result);

  assert.ok(codes.includes('fixture.placeholder.present'));
  assert.ok(codes.includes('fixture.public_claim.forbidden'));
});

test('complete fixture validator rejects missing visual asset briefs', async () => {
  const fixture = (await readFixture()).replace(
    /## Visual asset packet[\s\S]*?(?=\n## Field finalization packet)/,
    '',
  );
  const result = validateCompleteFixture(fixture, { filePath: fixturePath });

  assert.ok(issueCodes(result).includes('fixture.visual_asset.missing'));
});

test('complete fixture validator rejects missing audience legibility markers', async () => {
  const fixture = (await readFixture())
    .replace(/- five-second legibility:[^\n]+\n(?:  [^\n]+\n)*/i, '')
    .replace(/- recognizable shelf before novelty:[^\n]+\n(?:  [^\n]+\n)*/i, '');
  const result = validateCompleteFixture(fixture, { filePath: fixturePath });

  assert.ok(issueCodes(result).includes('fixture.legibility.missing'));
});

test('complete fixture validator rejects thin roleDetailDesc engines', async () => {
  const thinDetail = [
    'Core premise',
    '- thin.',
    '',
    'Player position',
    '- thin.',
    '',
    'Agency and interaction',
    '- thin.',
    '',
    'Relationship engine',
    '- thin.',
    '',
    'World engine',
    '- thin.',
    '',
    'Voice fingerprint',
    '- thin.',
    '',
    'Progression and consequence',
    '- thin.',
    '',
    'Longplay engine',
    '- thin.',
    '',
    'Scene reservoir / turn recipes',
    '- thin.',
    '',
    'Do / Avoid',
    '- thin.',
  ].join('\n');
  const fixture = (await readFixture()).replace(
    /### roleDetailDesc\s+```text[\s\S]*?```\s+### roleWelcome/,
    `### roleDetailDesc\n\n\`\`\`text\n${thinDetail}\n\`\`\`\n\n### roleWelcome`,
  );
  const result = validateCompleteFixture(fixture, { filePath: fixturePath });
  const codes = issueCodes(result);

  assert.ok(codes.includes('fixture.detail.too_short'));
  assert.ok(codes.includes('fixture.detail_section.thin'));
});

test('complete fixture validator rejects under-target high-ambition detail length', async () => {
  const fixture = await readFixture();
  const shortened = fixture.replace(
    /Core premise[\s\S]*?Do \/ Avoid\n/,
    [
      'Core premise',
      '- A complete synthetic card fixture needs a durable engine, not only a viable premise.',
      '',
      'Player position',
      '- The player has meaningful leverage, refusal space, and route control.',
      '',
      'Agency and interaction',
      '- The role reacts to help, refusal, questions, silence, and boundary-setting with concrete next steps.',
      '',
      'Relationship engine',
      '- The relationship changes through negotiated trust, repair, rupture, and slow pacing.',
      '',
      'World engine',
      '- The setting creates routes, costs, state changes, and visible consequences.',
      '',
      'Voice fingerprint',
      '- The role has rhythm, vocabulary, action beats, emotional tells, and avoided phrasing.',
      '',
      'Progression and consequence',
      '- Time, state, route, risk, and revealed truth change after player choices.',
      '',
      'Longplay engine',
      '- Later sessions preserve memory, unlock routes, and renew pressure.',
      '',
      'Scene reservoir / turn recipes',
      '- Scene seeds and turn recipes give later replies concrete material.',
      '',
      'Do / Avoid',
    ].join('\n'),
  );
  const result = validateCompleteFixture(shortened, { filePath: fixturePath });

  assert.ok(issueCodes(result).includes('fixture.detail.too_short'));
});

test('complete fixture validator rejects missing scene reservoir', async () => {
  const fixture = (await readFixture()).replace(
    /Scene reservoir \/ turn recipes[\s\S]*?(?=\nDo \/ Avoid)/,
    '',
  );
  const result = validateCompleteFixture(fixture, { filePath: fixturePath });

  assert.ok(issueCodes(result).includes('fixture.detail_section.missing'));
});
