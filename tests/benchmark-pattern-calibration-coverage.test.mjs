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

test('Moonloom has a public-safe benchmark pattern calibration reference', async () => {
  assert.equal(
    await fileExists('references/benchmark-pattern-calibration.md'),
    true,
    'missing benchmark pattern calibration reference',
  );

  const reference = await readFile('references/benchmark-pattern-calibration.md', 'utf8');

  for (const phrase of [
    'Anonymized benchmark pattern packet',
    'aggregate signals',
    'deep sample reading',
    'ordinary-card contrast',
    'do not store raw source text',
    'detail density',
    'durable operating engine',
    'first-turn proof',
    'longplay spine',
    'presentation gap',
  ]) {
    assert.match(reference, new RegExp(phrase, 'i'), `missing phrase: ${phrase}`);
  }

  assert.doesNotMatch(reference, /\bSELECT\b[\s\S]{0,160}\bFROM\b/i);
  assert.doesNotMatch(reference, /\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/i);
  assert.doesNotMatch(reference, /source selection recipe|non-public operational output|platform score endpoint|source scoring route|how to select cards/i);
});

test('benchmark runner and iteration loop consume benchmark pattern evidence', async () => {
  const runner = await readFile('skills/lunatalk-benchmark-runner/SKILL.md', 'utf8');
  const iteration = await readFile('references/iteration-loop.md', 'utf8');

  assert.match(runner, /benchmark-pattern-calibration\.md/);
  assert.match(runner, /anonymized benchmark pattern/i);
  assert.match(runner, /deep sample reading/i);
  assert.match(runner, /ordinary-card contrast/i);
  assert.match(runner, /pattern gap/i);

  assert.match(iteration, /benchmark_pattern/i);
  assert.match(iteration, /deep sample reading/i);
  assert.match(iteration, /pattern gap/i);
});

test('sample calibrator separates synthetic samples from anonymized benchmark patterns', async () => {
  const skill = await readFile('skills/lunatalk-sample-calibrator/SKILL.md', 'utf8');
  const reference = await readFile('references/sample-driven-calibration.md', 'utf8');

  assert.match(skill, /synthetic sample/i);
  assert.match(skill, /anonymized benchmark pattern/i);
  assert.match(skill, /do not copy benchmark wording/i);
  assert.match(reference, /benchmark-pattern-calibration\.md/);
  assert.match(reference, /source-restricted/i);
});
