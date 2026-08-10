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

test('detail engineering has a dedicated public skill, reference, and evals', async () => {
  assert.equal(
    await fileExists('skills/lunatalk-detail-engineer/SKILL.md'),
    true,
    'missing dedicated detail engineer skill',
  );
  assert.equal(
    await fileExists('skills/lunatalk-detail-engineer/evals/evals.json'),
    true,
    'missing detail engineer evals',
  );
  assert.equal(
    await fileExists('references/role-detail-engine.md'),
    true,
    'missing role detail engine reference',
  );
});

test('detail engine reference turns roleDetailDesc into a runnable engine', async () => {
  const skill = await readFile('skills/lunatalk-detail-engineer/SKILL.md', 'utf8');
  const reference = await readFile('references/role-detail-engine.md', 'utf8');
  const evals = await readFile('skills/lunatalk-detail-engineer/evals/evals.json', 'utf8');

  assert.match(skill, /description: Use when.*roleDetailDesc/i);
  assert.match(skill, /Detail engine packet:/);
  assert.match(reference, /Detail engine packet:/);
  assert.match(reference, /language-aware detail budget/i);
  assert.match(reference, /target floor/i);
  assert.match(reference, /5,000/i);
  assert.match(reference, /budget band/i);
  assert.match(reference, /current pressure/i);
  assert.match(reference, /proactive turn behavior/i);
  assert.match(reference, /time and consequence/i);
  assert.match(reference, /secret and reveal/i);
  assert.match(reference, /scene reservoir|scene seed|turn recipe/i);
  assert.match(reference, /player insertion space/i);
  assert.match(reference, /format stability/i);
  assert.match(reference, /thin biography/i);
  assert.match(reference, /Do not pad/i);
  assert.match(skill, /below target/i);
  assert.match(skill, /complete card/i);
  assert.match(skill, /scene reservoir|scene seed|turn recipe/i);
  assert.match(evals, /Detail engine packet/);
  assert.match(evals, /thin biography/i);
  assert.match(evals, /scene reservoir|scene seed|turn recipe/i);
});

test('router, authoring templates, framework, and quality docs expose detail engineering', async () => {
  const router = await readFile('skills/using-moonloom/SKILL.md', 'utf8');
  const cardAuthor = await readFile('skills/lunatalk-card-author/SKILL.md', 'utf8');
  const templates = await readFile('references/card-authoring-templates.md', 'utf8');
  const framework = await readFile('references/role-card-writing-framework.md', 'utf8');
  const quality = await readFile('references/quality-rubric.md', 'utf8');
  const readme = await readFile('README.en.md', 'utf8');

  assert.match(router, /lunatalk-detail-engineer/);
  assert.match(router, /detail engine|thin biography|roleDetailDesc/i);
  assert.match(cardAuthor, /lunatalk-detail-engineer/);
  assert.match(templates, /Detail engine packet:/);
  assert.match(templates, /scene reservoir \/ turn recipes/i);
  assert.match(framework, /role-detail-engine\.md/);
  assert.match(quality, /detail engine/i);
  assert.match(readme, /lunatalk-detail-engineer/);
});
