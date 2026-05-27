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

test('Moonloom exposes a public-safe top-card method calibration reference', async () => {
  assert.equal(
    await fileExists('references/top-card-method-calibration.md'),
    true,
    'missing top-card method calibration reference',
  );

  const reference = await readFile('references/top-card-method-calibration.md', 'utf8');

  for (const phrase of [
    'aggregate calibration',
    'deep sample reading',
    'top vs ordinary contrast',
    'bilingual budget translation',
    'detail operating engine',
    'opening first-turn contract',
    'longplay hook',
    'XMLV3 presentation gap',
    'SOP',
    'prompt framework',
    'XMLV3 method',
    'testing method',
    'source safety',
  ]) {
    assert.match(reference, new RegExp(phrase, 'i'), `missing phrase: ${phrase}`);
  }

  assert.doesNotMatch(reference, /\bSELECT\b[\s\S]{0,160}\bFROM\b/i);
  assert.doesNotMatch(reference, /\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/i);
  assert.doesNotMatch(reference, /production data|trained on|training data|traffic|view count|author id|schema/i);
  assert.doesNotMatch(reference, /leaderboard|ranking rail|internal ranking|endpoint|api route|V2 ranking|榜單/i);
});

test('card authoring routes benchmark-calibrated writing through the public method', async () => {
  const cardAuthor = await readFile('skills/lunatalk-card-author/SKILL.md', 'utf8');
  const detailEngine = await readFile('references/role-detail-engine.md', 'utf8');
  const templates = await readFile('references/card-authoring-templates.md', 'utf8');

  assert.match(cardAuthor, /top-card-method-calibration\.md/);
  assert.match(cardAuthor, /top-card calibration/i);
  assert.match(cardAuthor, /aggregate plus deep-reading/i);

  assert.match(detailEngine, /top-card method calibration/i);
  assert.match(detailEngine, /ordinary-card contrast/i);
  assert.match(detailEngine, /bilingual budget translation/i);

  assert.match(templates, /Top-card method calibration packet/i);
  assert.match(templates, /source safety/i);
  assert.match(templates, /no raw source/i);
});
