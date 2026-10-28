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

const SYNTHETIC_CAST = [
  { name: '林汐', sex: 'women', aliases: ['汐'], intro: '天文台夜班觀測員。', persona: '說話短，先講證據再講感受。', isPrimary: true },
  { name: '韓燼', sex: 'man', persona: '語氣輕，用玩笑轉移問題，等交換條件才說實話。' },
  { name: '阿遙', sex: 'other', persona: '送信的學徒，總在不對的時間出現，記得每個人的來去。' },
];

const SYNTHETIC_CAST_WELCOME = [
  '雨停後的天文台只剩一盞燈。',
  '【林汐】',
  '她把觀測簿推到你面前。「第三頁被撕掉了。」',
  '【韓燼】',
  '「別看我。」他靠著門框。',
  '【旁白】',
  '樓梯轉角傳來第三個人的腳步聲。',
].join('\n');

async function castFixture(cast = SYNTHETIC_CAST, welcome = SYNTHETIC_CAST_WELCOME) {
  return (await readFixture())
    .replace(
      /\n### roleDetailDesc\n/,
      `\n### cast\n\n\`\`\`json\n${JSON.stringify(cast, null, 2)}\n\`\`\`\n\n### roleDetailDesc\n`,
    )
    .replace(
      /### roleWelcome[\s\S]*?(?=### talkExample)/,
      `### roleWelcome\n\nMode: cast speaker header lines.\n\n\`\`\`text\n${welcome}\n\`\`\`\n\n`,
    );
}

test('complete fixture validator accepts a multi-character cast card with header-line welcome', async () => {
  const result = validateCompleteFixture(await castFixture(), { filePath: fixturePath });

  assert.deepEqual(result.issues, []);
  assert.equal(result.summary.castMembers, 3);
});

test('complete fixture validator reports zero cast members for a single-role card', async () => {
  const result = validateCompleteFixture(await readFixture(), { filePath: fixturePath });

  assert.equal(result.summary.castMembers, 0);
});

test('complete fixture validator rejects cast size outside 2-8', async () => {
  const one = validateCompleteFixture(await castFixture(SYNTHETIC_CAST.slice(0, 1)), { filePath: fixturePath });
  const nine = Array.from({ length: 9 }, (_, i) => ({ name: `角色${i}`, persona: '有行為的人設。' }));
  const many = validateCompleteFixture(await castFixture(nine), { filePath: fixturePath });

  assert.ok(issueCodes(one).includes('fixture.cast.count'));
  assert.ok(issueCodes(many).includes('fixture.cast.count'));
});

test('complete fixture validator rejects cast members without name or persona', async () => {
  const cast = [{ name: '林汐', persona: '' }, { name: ' ', persona: '有行為的人設。' }];
  const codes = issueCodes(validateCompleteFixture(await castFixture(cast), { filePath: fixturePath }));

  assert.ok(codes.includes('fixture.cast.persona_required'));
  assert.ok(codes.includes('fixture.cast.name_required'));
});

test('complete fixture validator rejects invalid cast names and multiple primaries', async () => {
  const cast = [
    { name: '林汐', persona: 'p', isPrimary: true },
    { name: 'ＬＩＮ', aliases: ['林汐'], persona: 'p', isPrimary: true },
    { name: '旁白', persona: 'p' },
    { name: '【韓燼】', persona: 'p' },
    { name: 'x'.repeat(31), persona: 'p', sex: 'female' },
  ];
  const codes = issueCodes(validateCompleteFixture(await castFixture(cast), { filePath: fixturePath }));

  for (const code of [
    'fixture.cast.name_duplicate',
    'fixture.cast.name_reserved',
    'fixture.cast.name_invalid_char',
    'fixture.cast.name_too_long',
    'fixture.cast.sex_invalid',
    'fixture.cast.primary_multiple',
  ]) {
    assert.ok(codes.includes(code), `missing ${code}`);
  }
});

test('complete fixture validator rejects cast welcome without known header lines or with XMLV3', async () => {
  const noHeader = validateCompleteFixture(
    await castFixture(SYNTHETIC_CAST, '林汐：「第三頁被撕掉了。」'),
    { filePath: fixturePath },
  );
  const unknownOnly = validateCompleteFixture(
    await castFixture(SYNTHETIC_CAST, '雨停了。\n【狀態】\n觀測簿缺頁。'),
    { filePath: fixturePath },
  );
  const xml = validateCompleteFixture(
    await castFixture(SYNTHETIC_CAST, '<scene><d>【林汐】第三頁不見了。</d></scene>'),
    { filePath: fixturePath },
  );

  assert.ok(issueCodes(noHeader).includes('fixture.cast.welcome_header_missing'));
  assert.ok(issueCodes(unknownOnly).includes('fixture.cast.welcome_header_missing'));
  assert.ok(issueCodes(xml).includes('fixture.cast.welcome_xmlv3'));
});

test('complete fixture validator rejects unparseable cast JSON', async () => {
  const fixture = (await castFixture()).replace(/### cast\s+```json\s*\[/, '### cast\n\n```json\n[,');
  const result = validateCompleteFixture(fixture, { filePath: fixturePath });

  assert.ok(issueCodes(result).includes('fixture.cast.invalid_json'));
});
