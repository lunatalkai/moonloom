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

test('state economy has a dedicated public skill, reference, and evals', async () => {
  assert.equal(
    await fileExists('skills/lunatalk-state-economist/SKILL.md'),
    true,
    'missing dedicated state economist skill',
  );
  assert.equal(
    await fileExists('skills/lunatalk-state-economist/evals/evals.json'),
    true,
    'missing state economist evals',
  );
  assert.equal(
    await fileExists('references/state-economy-design.md'),
    true,
    'missing state economy reference',
  );
});

test('state economy design defines a packet and anti-decorative-state rules', async () => {
  const skill = await readFile('skills/lunatalk-state-economist/SKILL.md', 'utf8');
  const reference = await readFile('references/state-economy-design.md', 'utf8');
  const evals = await readFile('skills/lunatalk-state-economist/evals/evals.json', 'utf8');

  assert.match(skill, /description: Use when.*state economy/i);
  assert.match(skill, /State economy packet:/);
  assert.match(reference, /State economy packet:/);
  assert.match(reference, /visible \| hidden \| detail-only/i);
  assert.match(reference, /Do not track decorative meters/i);
  assert.match(reference, /must not store player feelings/i);
  assert.match(evals, /State economy packet/);
  assert.match(evals, /decorative meters/i);
});

test('router, card author, longplay, presentation, and templates expose state economy', async () => {
  const router = await readFile('skills/using-moonloom/SKILL.md', 'utf8');
  const cardAuthor = await readFile('skills/lunatalk-card-author/SKILL.md', 'utf8');
  const longplay = await readFile('skills/lunatalk-longplay-architect/SKILL.md', 'utf8');
  const presentation = await readFile('skills/lunatalk-presentation-director/SKILL.md', 'utf8');
  const templates = await readFile('references/card-authoring-templates.md', 'utf8');
  const framework = await readFile('references/role-card-writing-framework.md', 'utf8');
  const quality = await readFile('references/quality-rubric.md', 'utf8');
  const readme = await readFile('README.en.md', 'utf8');

  assert.match(router, /lunatalk-state-economist/);
  assert.match(router, /state economy|decorative meters|visible.*hidden/i);
  assert.match(cardAuthor, /lunatalk-state-economist/);
  assert.match(longplay, /lunatalk-state-economist/);
  assert.match(presentation, /lunatalk-state-economist/);
  assert.match(templates, /State economy packet:/);
  assert.match(framework, /state-economy-design\.md/);
  assert.match(quality, /state economy/i);
  assert.match(readme, /lunatalk-state-economist/);
});
