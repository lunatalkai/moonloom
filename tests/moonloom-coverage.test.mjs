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

test('author collaboration has a dedicated public skill and reference', async () => {
  assert.equal(
    await fileExists('skills/lunatalk-collaboration-director/SKILL.md'),
    true,
    'missing dedicated author collaboration skill',
  );
  assert.equal(
    await fileExists('skills/lunatalk-collaboration-director/evals/evals.json'),
    true,
    'missing author collaboration evals',
  );
  assert.equal(
    await fileExists('references/author-collaboration.md'),
    true,
    'missing author collaboration reference',
  );
});

test('router and README expose author collaboration as a first-class workflow', async () => {
  const router = await readFile('skills/using-moonloom/SKILL.md', 'utf8');
  const readme = await readFile('README.md', 'utf8');

  assert.match(router, /lunatalk-collaboration-director/);
  assert.match(router, /author feedback|co-review|taste|preference/i);
  assert.match(readme, /lunatalk-collaboration-director/);
});

test('author collaboration reference preserves conversation-only feedback', async () => {
  const reference = await readFile('references/author-collaboration.md', 'utf8');

  assert.match(reference, /agent conversation/i);
  assert.match(reference, /Do not invent comment tables|no comment/i);
  assert.match(reference, /taste|preference/i);
  assert.match(reference, /decision/i);
});
