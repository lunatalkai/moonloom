import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Moonloom public docs define author-facing audience and exclude server-internal work', async () => {
  const readme = await readFile('README.md', 'utf8');
  const router = await readFile('skills/using-moonloom/SKILL.md', 'utf8');
  const forbiddenPublicTerms = [
    /server-internal/i,
    /prompt cache optimization/i,
    /prompt component diagnostics/i,
    /billing analytics/i,
    /private server data/i,
    /account identifiers/i,
    /credentials/i,
    /internal URLs/i,
    /private benchmark/i,
  ];

  for (const source of [readme, router]) {
    assert.match(source, /LunaTalk authors/i);
    assert.match(source, /external AI clients/i);
    assert.match(source, /public repository/i);
    assert.match(source, /author-facing/i);

    for (const term of forbiddenPublicTerms) {
      assert.doesNotMatch(source, term);
    }
  }
});
