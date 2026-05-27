import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('opening guidance front-loads concrete legibility before mood', async () => {
  const opening = await readFile('references/opening-design.md', 'utf8');
  const cardAuthor = await readFile('skills/lunatalk-card-author/SKILL.md', 'utf8');
  const playtestLoop = await readFile('references/playtest-loop.md', 'utf8');

  for (const source of [opening, cardAuthor]) {
    assert.match(source, /4-W|Who\s*\/\s*Where\s*\/\s*When\s*\/\s*What/i);
    assert.match(source, /first two lines|first 2 lines|首兩行|前兩行/i);
    assert.match(source, /concrete noun|具體名詞|具體物件/i);
    assert.match(source, /雲裡霧裡|mood-first|pretty mood/i);
  }

  assert.match(opening, /Opening legibility gate/i);
  assert.match(playtestLoop, /opening legibility|開場可讀性/i);
  assert.match(playtestLoop, /confusing|雲裡霧裡|decoder/i);
});
