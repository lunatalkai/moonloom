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

test('Moonloom includes a public-safe hc-* HTML component reference', async () => {
  assert.equal(
    await fileExists('references/html-card-components.md'),
    true,
    'missing HTML card component reference',
  );

  const reference = await readFile('references/html-card-components.md', 'utf8');

  for (const tag of [
    'hc-btn',
    'hc-bar',
    'hc-stat',
    'hc-tag',
    'hc-collapse',
    'hc-radio',
    'hc-checkbox',
    'hc-input',
    'hc-form',
  ]) {
    const pattern = new RegExp(`<${tag}\\b|\`${tag}\``);
    assert.match(reference, pattern);
  }

  const hcBtnSection = reference.match(/### `hc-btn`[\s\S]*?### `hc-bar`/i)?.[0] ?? '';
  for (const attr of ['send', 'copy', 'bg', 'w', 'txt-color']) {
    assert.match(hcBtnSection, new RegExp(`\`${attr}\``));
  }
  const hcBarSection = reference.match(/### `hc-bar`[\s\S]*?### `hc-stat`/i)?.[0] ?? '';
  for (const attr of ['value', 'max', 'color']) {
    assert.match(hcBarSection, new RegExp(`\`${attr}\``));
  }
  const formSections = reference.match(/### `hc-radio`[\s\S]*?### `hc-form`[\s\S]*?## Safe Layout/i)?.[0] ?? '';
  for (const attr of ['label', 'name', 'options', 'title', 'btn', 'placeholder']) {
    assert.match(formSections, new RegExp(`\`${attr}\``));
  }
  assert.match(reference, /title[\s\S]{0,120}open/i);
  assert.match(reference, /public-safe synthetic/i);
  assert.doesNotMatch(reference, /\bproduction\s+data\b|\braw\s+card\b|https?:\/\/(?:api|admin)\.lunatalk\.(?:ai|pro)/i);
});

test('Moonloom exposes hc-* component guidance as a dedicated skill', async () => {
  assert.equal(
    await fileExists('skills/lunatalk-html-card-components/SKILL.md'),
    true,
    'missing HTML card component skill',
  );
  assert.equal(
    await fileExists('skills/lunatalk-html-card-components/evals/evals.json'),
    true,
    'missing HTML card component evals',
  );

  const skill = await readFile('skills/lunatalk-html-card-components/SKILL.md', 'utf8');
  const evals = JSON.parse(
    await readFile('skills/lunatalk-html-card-components/evals/evals.json', 'utf8'),
  );

  assert.match(skill, /html-card-components\.md/);
  assert.match(skill, /support tier|cross-client stable/i);
  assert.match(skill, /hc-btn[\s\S]{0,120}send[\s\S]{0,120}copy/i);
  assert.match(skill, /hc-form[\s\S]{0,220}hc-input[\s\S]{0,220}hc-radio[\s\S]{0,220}hc-checkbox/i);
  assert.match(skill, /do not.*invent|unsupported/i);
  assert.equal(evals.skill_name, 'lunatalk-html-card-components');
  assert.ok(evals.evals.length >= 3);
});

test('Moonloom routes HTML mode and hc-* work to the component reference', async () => {
  const sources = await Promise.all([
    readFile('README.md', 'utf8'),
    readFile('references/theme-v3-rendering.md', 'utf8'),
    readFile('references/presentation-design.md', 'utf8'),
    readFile('skills/using-moonloom/SKILL.md', 'utf8'),
    readFile('skills/lunatalk-card-author/SKILL.md', 'utf8'),
    readFile('skills/lunatalk-presentation-director/SKILL.md', 'utf8'),
    readFile('skills/lunatalk-render-review/SKILL.md', 'utf8'),
  ]);

  for (const source of sources) {
    assert.match(source, /html-card-components\.md/);
    assert.match(source, /hc-\*|HTML card component/i);
    assert.match(source, /lunatalk-html-card-components|html-card-components\.md/);
  }
});

test('Moonloom prevents invented or unsafe hc-* HTML components', async () => {
  const reference = await readFile('references/html-card-components.md', 'utf8');
  const cardAuthor = await readFile('skills/lunatalk-card-author/SKILL.md', 'utf8');
  const renderReview = await readFile('skills/lunatalk-render-review/SKILL.md', 'utf8');

  for (const source of [reference, cardAuthor, renderReview]) {
    assert.match(source, /do not invent|不要發明|unsupported/i);
    assert.match(source, /script[\s\S]{0,120}inline event|inline event[\s\S]{0,120}script|external URLs/i);
    assert.match(source, /prefer XMLV3|XMLV3.*first|XMLV3.*優先/i);
  }

  assert.match(reference, /hc-action[\s\S]{0,160}hc-display[\s\S]{0,160}hc-toggle/i);
  assert.match(reference, /hc-display[\s\S]{0,180}type[\s\S]{0,180}bar[\s\S]{0,180}stat[\s\S]{0,180}tag/i);
  assert.match(reference, /legacy|compatibility|相容/i);
  assert.match(reference, /Support Tiers/i);
  assert.match(reference, /hc-meter[\s\S]{0,220}not.*cross-client|mobile-only|avoid/i);
  assert.match(reference, /hc-tabs[\s\S]{0,220}not.*cross-client|mobile-only|avoid/i);
  assert.match(reference, /hc-list[\s\S]{0,220}not.*cross-client|mobile-only|avoid/i);
  assert.match(reference, /hc-alert[\s\S]{0,220}not.*cross-client|mobile-only|avoid/i);
});

test('Moonloom forbids mixing HTML hc-* components with XMLV3 renderer output', async () => {
  const reference = await readFile('references/html-card-components.md', 'utf8');
  const skill = await readFile('skills/lunatalk-html-card-components/SKILL.md', 'utf8');
  const presentation = await readFile('references/presentation-design.md', 'utf8');
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');
  const cardAuthor = await readFile('skills/lunatalk-card-author/SKILL.md', 'utf8');
  const renderReview = await readFile('skills/lunatalk-render-review/SKILL.md', 'utf8');
  const evals = await readFile('skills/lunatalk-html-card-components/evals/evals.json', 'utf8');

  for (const source of [reference, skill, presentation, themeRendering, cardAuthor, renderReview]) {
    assert.match(source, /renderer modes? (are )?mutually\s+exclusive|Renderer modes? are exclusive/i);
    assert.match(source, /do not mix|never put|do not place|not a fallback inside XMLV3|must output XMLV3 tags only|XMLV3.*uses XMLV3 tags only|Flag any[\s\S]{0,80}HTML inside XMLV3/i);
  }

  assert.match(skill, /mode: "html"[\s\S]{0,180}mode: "xmlv3"/);
  assert.match(skill, /non-mixed XMLV3 rewrite option/);
  assert.match(evals, /hc-form and hc-btn inside the XML/);
  assert.match(evals, /mutually exclusive/);
});
