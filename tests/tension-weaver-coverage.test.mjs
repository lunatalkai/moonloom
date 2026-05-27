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

test('tension weaving has a dedicated public skill, reference, and evals', async () => {
  assert.equal(
    await fileExists('skills/lunatalk-tension-weaver/SKILL.md'),
    true,
    'missing dedicated tension weaver skill',
  );
  assert.equal(
    await fileExists('skills/lunatalk-tension-weaver/evals/evals.json'),
    true,
    'missing tension weaver evals',
  );
  assert.equal(
    await fileExists('references/tension-triangle.md'),
    true,
    'missing tension triangle reference',
  );
});

test('tension reference defines a packet and why-now checks', async () => {
  const skill = await readFile('skills/lunatalk-tension-weaver/SKILL.md', 'utf8');
  const reference = await readFile('references/tension-triangle.md', 'utf8');
  const evals = await readFile('skills/lunatalk-tension-weaver/evals/evals.json', 'utf8');

  assert.match(skill, /description: Use when.*tension triangle/i);
  assert.match(skill, /Tension packet:/);
  assert.match(reference, /role desire.*player leverage.*external pressure/i);
  assert.match(reference, /why now/i);
  assert.match(reference, /consequence if the player does nothing/i);
  assert.match(reference, /Do not solve inert premises with prettier prose/i);
  assert.match(evals, /Tension packet/);
  assert.match(evals, /why now/i);
});

test('router, blueprint, authoring templates, and quality docs expose tension weaving', async () => {
  const router = await readFile('skills/using-moonloom/SKILL.md', 'utf8');
  const blueprint = await readFile('skills/lunatalk-card-blueprint/SKILL.md', 'utf8');
  const cardAuthor = await readFile('skills/lunatalk-card-author/SKILL.md', 'utf8');
  const templates = await readFile('references/card-authoring-templates.md', 'utf8');
  const framework = await readFile('references/role-card-writing-framework.md', 'utf8');
  const quality = await readFile('references/quality-scorecard.md', 'utf8');
  const readme = await readFile('README.md', 'utf8');

  assert.match(router, /lunatalk-tension-weaver/);
  assert.match(router, /why now|external pressure|tension triangle/i);
  assert.match(blueprint, /lunatalk-tension-weaver/);
  assert.match(cardAuthor, /lunatalk-tension-weaver/);
  assert.match(templates, /Tension packet:/);
  assert.match(framework, /tension-triangle\.md/);
  assert.match(quality, /tension triangle/i);
  assert.match(readme, /lunatalk-tension-weaver/);
});
