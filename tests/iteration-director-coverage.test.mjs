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

test('iteration director has dedicated skill, reference, and eval coverage', async () => {
  assert.equal(
    await fileExists('skills/lunatalk-iteration-director/SKILL.md'),
    true,
    'missing iteration director skill',
  );
  assert.equal(
    await fileExists('skills/lunatalk-iteration-director/evals/evals.json'),
    true,
    'missing iteration director evals',
  );
  assert.equal(
    await fileExists('references/iteration-loop.md'),
    true,
    'missing iteration loop reference',
  );
});

test('iteration director defines evidence stack and one-repair iteration packet', async () => {
  const skill = await readFile('skills/lunatalk-iteration-director/SKILL.md', 'utf8');
  const reference = await readFile('references/iteration-loop.md', 'utf8');

  assert.match(skill, /Iteration packet:/);
  assert.match(skill, /evidence stack/i);
  assert.match(skill, /next single repair/i);
  assert.match(skill, /stop \/ continue criteria/i);
  assert.match(skill, /Do not call MCP tools/i);
  assert.match(reference, /Decision ladder/);
  assert.match(reference, /10,000-character\s+`roleDetailDesc` limit is a hard cap/i);
});

test('router and README expose closed-loop iteration as first-class workflow', async () => {
  const router = await readFile('skills/using-moonloom/SKILL.md', 'utf8');
  const readme = await readFile('README.md', 'utf8');

  assert.match(router, /lunatalk-iteration-director/);
  assert.match(router, /closed-loop|next-iteration|iteration/i);
  assert.match(readme, /lunatalk-iteration-director/);
  assert.match(readme, /closed-loop|next iteration|stop \/ continue/i);
});

test('iteration director evals cover token padding, render action visibility, and failed repair loops', async () => {
  const evals = await readFile('skills/lunatalk-iteration-director/evals/evals.json', 'utf8');

  assert.match(evals, /10,000 chars|10,000-character/i);
  assert.match(evals, /action visibility/i);
  assert.match(evals, /two simulation repair passes|two failed loops/i);
  assert.match(evals, /paid simulation/i);
});
