import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

// Visual Toolkit P1: page skins (skinId), the panel block, heading.attrs.art,
// and image.attrs.frame. These are wire facts (byte-exact enum strings) added
// alongside the existing 16-block schema v1 whitelist and the two role-home
// switches. Pinned the same way preview-page-switches.test.mjs pins landOnHome
// and showComments: on the literal wire strings, not on loose prose, so an
// enum value that never reaches this repo cannot pass silently.

const REFERENCE = 'references/preview-page-authoring.md';
const SKILL = 'skills/lunatalk-preview-page-designer/SKILL.md';

const SKIN_IDS = [
  'indigo-night',
  'sakura-mist',
  'azure-dawn',
  'jade-bamboo',
  'crimson-flame',
  'silver-ash',
  'dark-violet',
];

const PANEL_TONES = ['gold', 'rose', 'violet', 'sky', 'mint', 'amber', 'silver', 'ink'];
const HEADING_ARTS = ['bubble', 'neon', 'outline', 'glitch', 'ink', 'serif'];
const IMAGE_FRAMES = ['default', 'none', 'polaroid', 'tape'];

test('authoring reference documents all 7 named skinIds plus the empty-string default', async () => {
  const ref = await readFile(REFERENCE, 'utf8');
  assert.match(ref, /skinId/, 'reference never mentions skinId');
  for (const skin of SKIN_IDS) {
    assert.match(ref, new RegExp('`' + skin + '`'), `reference missing skinId \`${skin}\``);
  }
  // '' is the eighth (default gold) skin and must be documented as legal.
  assert.match(ref, /`""`|empty string/i, 'reference does not document the empty-string default skin');
});

test('authoring reference states skinId save semantics: omit keeps, empty resets, invalid rejected', async () => {
  const ref = await readFile(REFERENCE, 'utf8');
  assert.match(
    ref,
    /skinId[\s\S]{0,400}(?:omit\w*|absent)[\s\S]{0,160}(?:unchanged|leaves it|does not change|keep)/i,
    'reference does not say omitting skinId leaves the skin unchanged',
  );
  assert.match(
    ref,
    /skinId[\s\S]{0,600}`""`[\s\S]{0,200}(?:reset|default)/i,
    'reference does not say an empty-string skinId resets to default',
  );
  assert.match(
    ref,
    /skinId[\s\S]{0,600}(?:reject|invalid|not\s+saved|refused)/i,
    'reference does not say an invalid skinId is rejected',
  );
});

test('authoring reference states role_reset_preview_page also clears the skin', async () => {
  const ref = await readFile(REFERENCE, 'utf8');
  assert.match(
    ref,
    /[Rr]eset[\s\S]{0,400}skinId|skinId[\s\S]{0,400}[Rr]eset/,
    'reference does not say reset clears skinId back to default',
  );
});

test('authoring reference documents the panel block as the 17th block type', async () => {
  const ref = await readFile(REFERENCE, 'utf8');
  assert.match(ref, /17\s+block\s+types/i, 'reference still says 16 block types');
  assert.match(ref, /`panel`/, 'reference does not mention the panel node');
});

test('authoring reference documents panel.attrs.tone as a required 8-value enum', async () => {
  const ref = await readFile(REFERENCE, 'utf8');
  for (const tone of PANEL_TONES) {
    assert.match(
      ref,
      new RegExp('`panel\\.attrs\\.tone`[\\s\\S]{0,400}`' + tone + '`'),
      `reference missing panel tone \`${tone}\``,
    );
  }
  assert.match(
    ref,
    /`panel\.attrs\.tone`[\s\S]{0,200}required|required[\s\S]{0,200}`panel\.attrs\.tone`/i,
    'reference does not say panel.attrs.tone is required',
  );
});

test('authoring reference states panel is top-level only and nesting is rejected', async () => {
  const ref = await readFile(REFERENCE, 'utf8');
  assert.match(ref, /`panel`[\s\S]{0,400}top level/i, 'reference does not say panel is top-level only');
  assert.match(
    ref,
    /`panel`[\s\S]{0,500}(?:nest\w*|inside)[\s\S]{0,200}(?:reject|not\s+allowed)/i,
    'reference does not say nesting a panel is rejected',
  );
});

test('authoring reference states panel content excludes columns and panel but allows other blocks', async () => {
  const ref = await readFile(REFERENCE, 'utf8');
  assert.match(
    ref,
    /`panel`[\s\S]{0,900}except[\s\S]{0,120}`columns`[\s\S]{0,120}`panel`|`panel`[\s\S]{0,900}`columns`[\s\S]{0,300}another\s+`panel`/i,
    'reference does not state panel content excludes columns/panel',
  );
});

test('authoring reference states panel counts toward the 200-block cap', async () => {
  const ref = await readFile(REFERENCE, 'utf8');
  assert.match(
    ref,
    /`panel`[\s\S]{0,400}200-block|`panel`[\s\S]{0,400}200\s+block/i,
    'reference does not say panel counts toward the block cap',
  );
});

test('authoring reference documents heading.attrs.art with all 6 values and default none', async () => {
  const ref = await readFile(REFERENCE, 'utf8');
  for (const art of HEADING_ARTS) {
    assert.match(
      ref,
      new RegExp('`heading\\.attrs\\.art`[\\s\\S]{0,400}`' + art + '`'),
      `reference missing heading art \`${art}\``,
    );
  }
  assert.match(
    ref,
    /`heading\.attrs\.art`[\s\S]{0,600}`none`[\s\S]{0,300}(?:zero migration|no migration|omit\w*|default)/i,
    'reference does not say omitted/none art needs no migration',
  );
});

test('authoring reference documents image.attrs.frame with all 4 values and default default', async () => {
  const ref = await readFile(REFERENCE, 'utf8');
  for (const frame of IMAGE_FRAMES) {
    assert.match(
      ref,
      new RegExp('`image\\.attrs\\.frame`[\\s\\S]{0,400}`' + frame + '`'),
      `reference missing image frame \`${frame}\``,
    );
  }
  assert.match(
    ref,
    /`image\.attrs\.frame`[\s\S]{0,600}defaults?\s+to\s+`default`|omit\w*[\s\S]{0,200}`image\.attrs\.frame`[\s\S]{0,200}`default`/i,
    'reference does not state frame defaults to default',
  );
});

test('authoring reference locks the gallery item shape to src and width, rejecting frame', async () => {
  const ref = await readFile(REFERENCE, 'utf8');
  assert.match(
    ref,
    /`gallery\.attrs\.items`[\s\S]{0,700}`src`[\s\S]{0,300}`width`|gallery item[\s\S]{0,300}`src`[\s\S]{0,200}`width`/i,
    'reference does not state the gallery item shape is {src, width}',
  );
  assert.match(
    ref,
    /gallery[\s\S]{0,900}(?:frame)[\s\S]{0,300}(?:reject|no way to set|not\s+allowed)/i,
    'reference does not say gallery items reject a frame key',
  );
});

test('preview page designer skill names all four visual toolkit wire facts', async () => {
  const skill = await readFile(SKILL, 'utf8');
  assert.match(skill, /skinId/, 'skill never mentions skinId');
  assert.match(skill, /`panel`/, 'skill never mentions panel');
  assert.match(skill, /`?art`?/, 'skill never mentions heading art');
  assert.match(skill, /`?frame`?/, 'skill never mentions image frame');
});

test('preview page designer skill lists at least the named skins and treats skin choice deliberately', async () => {
  const skill = await readFile(SKILL, 'utf8');
  // At least a sample of literal skin names should appear so a client can act
  // without re-deriving the enum from the reference alone.
  assert.match(skill, /indigo-night|sakura-mist|dark-violet/);
  assert.match(
    skill,
    /(?:ask|ask the author|leaving\s+`?skinId`?\s+unset|not\s+something\s+to\s+set\s+from\s+a\s+guess)/i,
    'skill does not tell the client not to guess a skin',
  );
});

test('preview page designer skill teaches panel is for one distinct section, not every section', async () => {
  const skill = await readFile(SKILL, 'utf8');
  assert.match(skill, /`panel`[\s\S]{0,500}top level/i);
  for (const tone of PANEL_TONES) {
    assert.match(skill, new RegExp('`' + tone + '`'), `skill missing panel tone \`${tone}\` in guidance`);
  }
  assert.match(
    skill,
    /(?:sparing|one or two|not\s+every\s+section|noise)/i,
    'skill does not caution against overusing panel',
  );
});

test('preview page designer skill teaches art is for one or two headings, not every heading', async () => {
  const skill = await readFile(SKILL, 'utf8');
  for (const art of HEADING_ARTS) {
    assert.match(skill, new RegExp('`' + art + '`'), `skill missing art \`${art}\` in guidance`);
  }
  assert.match(
    skill,
    /(?:one or two|sparing|not\s+every\s+heading)/i,
    'skill does not caution against overusing heading art',
  );
});

test('preview page designer skill teaches frame does not apply inside gallery', async () => {
  const skill = await readFile(SKILL, 'utf8');
  for (const frame of IMAGE_FRAMES) {
    assert.match(skill, new RegExp('`' + frame + '`'), `skill missing frame \`${frame}\` in guidance`);
  }
  assert.match(
    skill,
    /`gallery`[\s\S]{0,300}(?:no effect|default|rejected)/i,
    'skill does not say frame has no per-item effect inside a gallery',
  );
});
