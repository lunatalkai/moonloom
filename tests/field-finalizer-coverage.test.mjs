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

test('field finalizer has a dedicated public skill, reference, and evals', async () => {
  assert.equal(
    await fileExists('skills/lunatalk-field-finalizer/SKILL.md'),
    true,
    'missing dedicated field finalizer skill',
  );
  assert.equal(
    await fileExists('skills/lunatalk-field-finalizer/evals/evals.json'),
    true,
    'missing field finalizer evals',
  );
  assert.equal(
    await fileExists('references/field-finalization.md'),
    true,
    'missing field finalization reference',
  );
});

test('field finalization defines MCP-ready last-mile gates', async () => {
  const skill = await readFile('skills/lunatalk-field-finalizer/SKILL.md', 'utf8');
  const reference = await readFile('references/field-finalization.md', 'utf8');
  const evals = await readFile('skills/lunatalk-field-finalizer/evals/evals.json', 'utf8');

  assert.match(skill, /description: Use when.*field-ready.*MCP-ready.*final/i);
  assert.match(skill, /field-finalization\.md/);
  assert.match(skill, /Field finalization packet/);
  assert.match(skill, /Do not brainstorm|do not brainstorm/i);

  assert.match(reference, /Field finalization packet:/);
  assert.match(reference, /placeholder/i);
  assert.match(reference, /language-aware hard caps/i);
  assert.match(reference, /compact fallback/i);
  assert.match(reference, /role_patch_profile[\s\S]*role_patch_detail[\s\S]*role_patch_welcome/i);
  assert.match(reference, /role_patch_talk_example/);
  assert.match(reference, /role_patch_output_contract/);
  assert.match(reference, /roleOutputContract/);
  assert.match(reference, /2,000-character `roleOutputContract`/);
  assert.match(reference, /XMLV3[\s\S]*JSON[\s\S]*Markdown|Markdown[\s\S]*JSON[\s\S]*XMLV3/i);
  assert.match(reference, /ready \| needs narrow repair \| missing external asset \| cost-gated/i);

  assert.match(evals, /placeholder/i);
  assert.match(evals, /compact fallback/i);
  assert.match(evals, /MCP-ready/i);
});

test('field finalization uses language-aware hard caps for detail and welcome', async () => {
  const skill = await readFile('skills/lunatalk-field-finalizer/SKILL.md', 'utf8');
  const reference = await readFile('references/field-finalization.md', 'utf8');
  const evals = await readFile('skills/lunatalk-field-finalizer/evals/evals.json', 'utf8');

  for (const source of [skill, reference, evals]) {
    assert.match(source, /language-aware|language \/ locale|locale-aware/i);
    assert.match(source, /50,000-character English `roleDetailDesc`|English[\s\S]{0,120}50,000[\s\S]{0,120}roleDetailDesc/i);
    assert.match(source, /10,000-character non-English `roleDetailDesc`|non-English[\s\S]{0,120}10,000[\s\S]{0,120}roleDetailDesc/i);
    assert.match(source, /10,000-character English `roleWelcome`|English[\s\S]{0,120}10,000[\s\S]{0,120}roleWelcome/i);
    assert.match(source, /3,000-character non-English `roleWelcome`|non-English[\s\S]{0,120}3,000[\s\S]{0,120}roleWelcome/i);
  }
});

test('router, card author, templates, and README expose field finalization', async () => {
  const router = await readFile('skills/using-moonloom/SKILL.md', 'utf8');
  const cardAuthor = await readFile('skills/lunatalk-card-author/SKILL.md', 'utf8');
  const templates = await readFile('references/card-authoring-templates.md', 'utf8');
  const readme = await readFile('README.en.md', 'utf8');

  assert.match(router, /lunatalk-field-finalizer/);
  assert.match(router, /field-ready|MCP-ready|final fields/i);
  assert.match(cardAuthor, /lunatalk-field-finalizer/);
  assert.match(cardAuthor, /before.*role_create_private|before.*patch/i);
  assert.match(templates, /Field finalization packet/);
  assert.match(readme, /lunatalk-field-finalizer/);
});
