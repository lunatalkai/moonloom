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

test('sample calibration has a dedicated public skill, reference, and examples', async () => {
  assert.equal(
    await fileExists('skills/lunatalk-sample-calibrator/SKILL.md'),
    true,
    'missing sample calibrator skill',
  );
  assert.equal(
    await fileExists('skills/lunatalk-sample-calibrator/evals/evals.json'),
    true,
    'missing sample calibrator evals',
  );
  assert.equal(
    await fileExists('references/sample-driven-calibration.md'),
    true,
    'missing sample-driven calibration reference',
  );
  assert.equal(
    await fileExists('examples/sample-card-packets.md'),
    true,
    'missing synthetic sample card packets',
  );
});

test('router and README expose sample calibration workflow', async () => {
  const router = await readFile('skills/using-moonloom/SKILL.md', 'utf8');
  const readme = await readFile('README.md', 'utf8');

  assert.match(router, /lunatalk-sample-calibrator/);
  assert.match(router, /sample|golden|calibration|benchmark/i);
  assert.match(readme, /lunatalk-sample-calibrator/);
  assert.match(readme, /sample-card-packets\.md/);
});

test('synthetic samples cover multiple card shapes without copy or non-public origin claims', async () => {
  const samples = await readFile('examples/sample-card-packets.md', 'utf8');

  for (const phrase of [
    'relationship',
    'daily-life',
    'story / scenario',
    'RPG / play engine',
    'generator / helper',
  ]) {
    assert.match(samples, new RegExp(phrase, 'i'), `missing sample shape: ${phrase}`);
  }

  assert.match(samples, /Do not copy|do not copy|copy risk/i);
  assert.doesNotMatch(samples, /non-public origin|ranking|traffic|credential/i);
});

test('synthetic samples cover required Moonloom archetype matrix', async () => {
  const samples = await readFile('examples/sample-card-packets.md', 'utf8');

  for (const phrase of [
    'boundary-sensitive romance',
    'light fantasy',
    'heavy-setting',
    'compact adventure',
    'ensemble / multi-character',
    'companion',
    'daily-life',
    'story / scenario',
    'RPG / play engine',
  ]) {
    assert.match(samples, new RegExp(phrase, 'i'), `missing required archetype sample: ${phrase}`);
  }
});
