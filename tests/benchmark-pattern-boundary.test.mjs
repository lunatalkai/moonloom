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

test('Moonloom exposes benchmark pattern calibration without source selection workflow', async () => {
  assert.equal(
    await fileExists('references/benchmark-pattern-calibration.md'),
    true,
    'missing benchmark pattern calibration reference',
  );

  const reference = await readFile('references/benchmark-pattern-calibration.md', 'utf8');

  for (const phrase of [
    'already-anonymized\\s+benchmark pattern packet',
    'aggregate signals',
    'deep sample reading',
    'ordinary-card contrast',
    'does not define how to select',
    'does not fetch platform\\s+score data',
    'no source selection flow',
  ]) {
    assert.match(reference, new RegExp(phrase, 'i'), `missing phrase: ${phrase}`);
  }

  assert.doesNotMatch(reference, /\bSELECT\b[\s\S]{0,160}\bFROM\b/i);
  assert.doesNotMatch(reference, /\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/i);
  assert.doesNotMatch(reference, /production data|trained on|training data|traffic|view count|author id/i);
  assert.doesNotMatch(reference, /source selection recipe|non-public operational output|platform score endpoint|source scoring route|how to select cards/i);
});

test('card authoring routes provided benchmark packets without source-selection details', async () => {
  const cardAuthor = await readFile('skills/lunatalk-card-author/SKILL.md', 'utf8');
  const detailEngine = await readFile('references/role-detail-engine.md', 'utf8');
  const templates = await readFile('references/card-authoring-templates.md', 'utf8');

  assert.match(cardAuthor, /benchmark-pattern-calibration\.md/);
  assert.match(cardAuthor, /provided benchmark pattern/i);
  assert.match(cardAuthor, /no source selection/i);

  assert.match(detailEngine, /benchmark pattern calibration/i);
  assert.match(detailEngine, /ordinary-card contrast/i);
  assert.match(detailEngine, /bilingual budget translation/i);

  assert.match(templates, /Benchmark pattern calibration packet/i);
  assert.match(templates, /source safety/i);
  assert.match(templates, /no raw source/i);
  assert.match(templates, /no source selection flow/i);
});
