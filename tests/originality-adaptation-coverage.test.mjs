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

test('originality adaptation has a dedicated public skill, reference, and evals', async () => {
  assert.equal(
    await fileExists('skills/lunatalk-originality-adapter/SKILL.md'),
    true,
    'missing dedicated originality adaptation skill',
  );
  assert.equal(
    await fileExists('skills/lunatalk-originality-adapter/evals/evals.json'),
    true,
    'missing originality adaptation evals',
  );
  assert.equal(
    await fileExists('references/originality-adaptation.md'),
    true,
    'missing originality adaptation reference',
  );
});

test('originality adaptation defines a transformation packet and copy-distance rules', async () => {
  const skill = await readFile('skills/lunatalk-originality-adapter/SKILL.md', 'utf8');
  const reference = await readFile('references/originality-adaptation.md', 'utf8');
  const evals = await readFile('skills/lunatalk-originality-adapter/evals/evals.json', 'utf8');

  assert.match(skill, /description: Use when.*canon.*IP.*inspiration.*original/i);
  assert.match(skill, /Originality adaptation packet:/);
  assert.match(reference, /Originality adaptation packet:/);
  assert.match(reference, /transferable fantasy/i);
  assert.match(reference, /Do not copy exact names/i);
  assert.match(reference, /renamed copy/i);
  assert.match(reference, /distance check/i);
  assert.match(evals, /Originality adaptation packet/);
  assert.match(evals, /renamed copy/i);
});

test('router, card author, and templates expose originality adaptation before fields', async () => {
  const router = await readFile('skills/using-moonloom/SKILL.md', 'utf8');
  const cardAuthor = await readFile('skills/lunatalk-card-author/SKILL.md', 'utf8');
  const templates = await readFile('references/card-authoring-templates.md', 'utf8');
  const framework = await readFile('references/role-card-writing-framework.md', 'utf8');
  const readme = await readFile('README.en.md', 'utf8');

  assert.match(router, /lunatalk-originality-adapter/);
  assert.match(router, /canon|IP|inspiration|original/i);
  assert.match(cardAuthor, /lunatalk-originality-adapter/);
  assert.match(cardAuthor, /before.*field|field.*before/i);
  assert.match(templates, /Originality adaptation packet:/);
  assert.match(framework, /originality-adaptation\.md/);
  assert.match(readme, /lunatalk-originality-adapter/);
});
