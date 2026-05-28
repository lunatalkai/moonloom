import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  validateXmlv3Presentation,
} from '../scripts/validate-xmlv3-presentation.mjs';

function validXml(overrides = '') {
  return `
<scene>
  <state>{"scene":{"mood":"rain","location":"counter"},"status":[{"key":"risk","label":"Risk","value":"low"}],"relationships":[{"target":"role","label":"Trust","affinity":1,"max":5}]}</state>
  <n>The role moves first and frames the choice.</n>
  <speaker>Role</speaker>
  <d>Choose one concrete next step.</d>
</scene>
<choices cols="2" align="stretch" gap="sm">
  <choice tone="primary" send="check the map">Check the map</choice>
  <choice tone="clue" send="ask what changed">Ask what changed</choice>
</choices>
${overrides}`.trim();
}

function issueCodes(result) {
  return result.issues.map((item) => item.code);
}

test('XMLV3 presentation validator accepts grouped choices and preview-compatible state', () => {
  const result = validateXmlv3Presentation(validXml(), { filePath: 'roleWelcome.xml' });

  assert.deepEqual(result.issues, []);
  assert.equal(result.summary.choiceCount, 2);
  assert.equal(result.summary.groupedChoiceCount, 2);
  assert.equal(result.summary.choiceSpanCount, 0);
  assert.equal(result.summary.hasPreviewState, true);
});

test('XMLV3 presentation validator accepts weighted choice layouts', () => {
  const result = validateXmlv3Presentation(
    validXml(`
<choices cols="4" align="stretch" gap="sm">
  <choice span="full" tone="primary" send="start the main route">Start the main route</choice>
  <choice span="2" tone="clue" send="inspect the clue">Inspect the clue</choice>
  <choice tone="neutral" send="wait">Wait</choice>
  <choice tone="risk" send="take the risky route">Risk route</choice>
</choices>`),
    { filePath: 'roleWelcome.xml' },
  );

  assert.deepEqual(result.issues, []);
  assert.equal(result.summary.choiceCount, 6);
  assert.equal(result.summary.groupedChoiceCount, 6);
  assert.equal(result.summary.choicesGroupCount, 2);
  assert.equal(result.summary.choiceSpanCount, 2);
});

test('XMLV3 presentation validator rejects short naked choice piles', () => {
  const result = validateXmlv3Presentation(
    `
<scene>
  <state>{"scene":{"mood":"rain"},"status":[],"relationships":[]}</state>
  <n>Scene text.</n>
</scene>
<choice>Open the door</choice>
<choice>Ask the role</choice>
<choice>Walk away</choice>`,
    { filePath: 'roleWelcome.xml' },
  );

  assert.ok(issueCodes(result).includes('xmlv3.choice.naked_pile'));
});

test('XMLV3 presentation validator rejects controls nested inside the scene body', () => {
  const result = validateXmlv3Presentation(
    `
<scene>
  <state>{"scene":{"mood":"rain"},"status":[],"relationships":[]}</state>
  <n>Scene text.</n>
  <choices cols="2">
    <choice>Open the door</choice>
    <choice>Ask the role</choice>
  </choices>
</scene>`,
    { filePath: 'roleWelcome.xml' },
  );

  assert.ok(issueCodes(result).includes('xmlv3.controls.inside_scene'));
});

test('XMLV3 presentation validator rejects row tag narration used as information fields', () => {
  const result = validateXmlv3Presentation(
    validXml(`
<panel title="Setup">
  <row><tag>Player entry</tag><n>Who the player is and what they can do first.</n></row>
</panel>`),
    { filePath: 'roleWelcome.xml' },
  );

  assert.ok(issueCodes(result).includes('xmlv3.field.row_tag_n'));
});

test('XMLV3 presentation validator rejects flat state and raw styling hooks', () => {
  const result = validateXmlv3Presentation(
    `
<scene style="color:red">
  <state>{"location":"counter","trust":1}</state>
  <n>Scene text.</n>
</scene>
<choices cols="2" class="buttons">
  <choice>Open the door</choice>
  <choice>Ask the role</choice>
</choices>`,
    { filePath: 'roleWelcome.xml' },
  );
  const codes = issueCodes(result);

  assert.ok(codes.includes('xmlv3.state.preview_shape'));
  assert.ok(codes.includes('xmlv3.raw_style.present'));
});

test('complete synthetic fixture and README expose XMLV3 presentation validation', async () => {
  const fixture = await readFile('examples/complete-synthetic-card-fixture.md', 'utf8');
  const readme = await readFile('README.md', 'utf8');
  const presentation = await readFile('references/presentation-design.md', 'utf8');
  const presentationSkill = await readFile('skills/lunatalk-presentation-director/SKILL.md', 'utf8');
  const packageJson = JSON.parse(await readFile('package.json', 'utf8'));

  assert.match(fixture, /<choices[\s\S]{0,120}cols="2"/);
  assert.match(fixture, /scene[\s\S]{0,180}status[\s\S]{0,180}relationships/);
  assert.match(readme, /validate:xmlv3-presentation/);
  assert.match(presentation, /validate:xmlv3-presentation/);
  assert.match(presentationSkill, /validate:xmlv3-presentation/);
  assert.equal(packageJson.scripts['validate:xmlv3-presentation'], 'node scripts/validate-xmlv3-presentation.mjs');
  assert.match(packageJson.scripts.validate, /validate-xmlv3-presentation\.mjs/);
});
