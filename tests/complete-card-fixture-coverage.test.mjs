import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

async function fileExists(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

test('complete synthetic card fixture exists and is public safe', async () => {
  assert.equal(
    await fileExists('examples/complete-synthetic-card-fixture.md'),
    true,
    'missing complete synthetic card fixture',
  );

  const fixture = await readFile('examples/complete-synthetic-card-fixture.md', 'utf8');

  assert.match(fixture, /public-safe synthetic/i);
  assert.match(fixture, /Do not copy/i);
  const forbiddenPublicClaims = new RegExp(
    [
      ['production', 'data'].join(' '),
      ['real', 'user'].join(' '),
      'ranking',
      'traffic',
      ['internal', 'database'].join(' '),
      'credential',
    ].join('|'),
    'i',
  );
  assert.doesNotMatch(fixture, forbiddenPublicClaims);
});

test('complete fixture demonstrates field-ready role content and fallback', async () => {
  const fixture = await readFile('examples/complete-synthetic-card-fixture.md', 'utf8');

  for (const phrase of [
    'roleName:',
    'roleDesc:',
    'tags:',
    'roleDetailDesc',
    'roleWelcome',
    'talkExample',
    'XMLV3',
    'Field finalization packet',
    'compact fallback',
    'language-aware hard cap stance',
    '10,000-character non-English `roleDetailDesc`',
    '3,000-character non-English `roleWelcome`',
  ]) {
    assert.match(fixture, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  assert.match(fixture, /Core premise[\s\S]*Player position[\s\S]*Agency and interaction/);
  assert.match(fixture, /Voice fingerprint[\s\S]*Longplay engine[\s\S]*Scene reservoir \/ turn recipes[\s\S]*Do \/ Avoid/);
  assert.match(fixture, /Scene seed:[\s\S]*trigger:[\s\S]*role move:[\s\S]*renewed hook:/i);
  assert.match(fixture, /Turn recipe:/i);
  assert.match(fixture, /<scene>[\s\S]*<state>\{[\s\S]*<\/state>[\s\S]*<\/scene>[\s\S]*<choices[\s\S]*<choice\b/);
});

test('complete fixture includes playtest and acceptance evidence plan', async () => {
  const fixture = await readFile('examples/complete-synthetic-card-fixture.md', 'utf8');

  for (const probe of [
    'normal interaction',
    'short reply',
    'off-path reply',
    'background question',
    'relationship push',
    'secret exploration',
    'boundary test',
    'long-arc macro-progression',
  ]) {
    assert.match(fixture, new RegExp(probe, 'i'), `missing probe: ${probe}`);
  }

  assert.match(fixture, /validate_role/i);
  assert.match(fixture, /render_preview/i);
  assert.match(fixture, /conversation_send_message/i);
  assert.match(fixture, /conversation_inspect/i);
  assert.match(fixture, /per-message preview/i);
  assert.match(fixture, /End-to-end acceptance packet/);
});

test('README and benchmark runner expose the complete fixture', async () => {
  const readme = await readFile('README.en.md', 'utf8');
  const benchmark = await readFile('skills/lunatalk-benchmark-runner/SKILL.md', 'utf8');

  assert.match(readme, /complete-synthetic-card-fixture\.md/);
  assert.match(benchmark, /complete-synthetic-card-fixture\.md/);
  assert.match(benchmark, /complete synthetic card fixture/i);
});
