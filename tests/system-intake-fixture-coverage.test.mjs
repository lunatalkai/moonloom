import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  validateSystemIntakeFixture,
} from '../scripts/validate-system-intake-fixture.mjs';

const fixturePath = 'examples/system-intake-synthetic-card-fixture.md';

async function read(path) {
  return readFile(path, 'utf8');
}

test('Moonloom includes a public-safe system intake fixture for HTML-to-XMLV3 parity work', async () => {
  const fixture = await read(fixturePath);

  assert.match(fixture, /System intake synthetic fixture/i);
  assert.match(fixture, /public-safe synthetic/i);
  assert.match(fixture, /not sourced from|does not contain/i);
  assert.match(fixture, /system\/simulator|simulator/i);
  assert.match(fixture, /setup wizard|intake/i);
  assert.match(fixture, /mechanics|state model/i);
  assert.match(fixture, /event pool|scene generator|scenario reservoir/i);
  assert.match(fixture, /progression loop|longplay/i);
  assert.match(fixture, /failure-forward/i);
  assert.match(fixture, /format protocol|render contract/i);
  assert.doesNotMatch(fixture, /\bproduction\s+data\b|\braw\s+card\b|https?:\/\/(?:api|admin)\.lunatalk\.(?:ai|pro)/i);
});

test('system intake fixture uses XMLV3 layout controls instead of a flat scene or raw HTML styling', async () => {
  const fixture = await read(fixturePath);
  const xml = fixture.match(/```xml\s*([\s\S]*?)```/i)?.[1] || '';

  assert.match(xml, /<scene\b/i);
  assert.match(xml, /<stack\b/i);
  assert.match(xml, /<panel\b/i);
  assert.match(xml, /<grid\b/i);
  assert.match(xml, /<form\b/i);
  assert.match(xml, /<input\b/i);
  assert.match(xml, /<radio\b/i);
  assert.match(xml, /<checkbox\b/i);
  assert.match(xml, /<bar\b/i);
  assert.match(xml, /<choices\b[^>]*\bcols=["']2["']/i);
  assert.match(xml, /<state>\s*\{/i);
  assert.doesNotMatch(xml, /\s(?:style|class)=/i);
  assert.doesNotMatch(xml, /<div\b|<section\b|<button\b/i);
});

test('system intake guidance is wired into the skills that route simulator and generator cards', async () => {
  const [
    cardAuthor,
    generator,
    playEngineer,
    presentation,
    themeRendering,
  ] = await Promise.all([
    read('skills/lunatalk-card-author/SKILL.md'),
    read('skills/lunatalk-generator-architect/SKILL.md'),
    read('skills/lunatalk-play-engineer/SKILL.md'),
    read('skills/lunatalk-presentation-director/SKILL.md'),
    read('references/theme-v3-rendering.md'),
  ]);

  for (const source of [cardAuthor, generator, playEngineer, presentation, themeRendering]) {
    assert.match(source, /system-intake-card-design\.md/);
    assert.match(source, /setup wizard|intake console|intake-first/i);
    assert.match(source, /HTML.*XMLV3|XMLV3.*HTML/i);
    assert.match(source, /panel.*form.*choices|choices.*form.*panel/is);
  }
});

test('system intake validator accepts the committed fixture and rejects raw HTML fallback', async () => {
  const fixture = await read(fixturePath);
  const accepted = validateSystemIntakeFixture(fixture, { filePath: fixturePath });
  assert.deepEqual(accepted.issues, []);
  assert.equal(accepted.summary.choicesGrouped, true);
  assert.equal(accepted.summary.hasPreviewState, true);

  const broken = fixture.replace('<stack gap="md">', '<div class="console">');
  const result = validateSystemIntakeFixture(broken, { filePath: fixturePath });
  assert.ok(result.issues.some((item) => item.code === 'system_intake.xml_raw_html'));
});
