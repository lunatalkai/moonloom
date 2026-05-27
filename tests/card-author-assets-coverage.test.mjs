import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('card writer MCP exposes avatar and background asset patching', async () => {
  const reference = await readFile('references/card-writer-mcp.md', 'utf8');
  const cardAuthor = await readFile('skills/lunatalk-card-author/SKILL.md', 'utf8');
  const evals = await readFile('skills/lunatalk-card-author/evals/evals.json', 'utf8');

  assert.match(reference, /role_patch_assets/);
  assert.match(reference, /roleAvatar/);
  assert.match(reference, /roleBackground/);
  assert.match(reference, /not enough.*complete|complete.*without avatar and background/i);
  assert.match(cardAuthor, /role_patch_assets/);
  assert.match(cardAuthor, /roleAvatar.*roleBackground/s);
  assert.match(cardAuthor, /claim completion.*roleAvatar.*roleBackground/s);
  assert.match(evals, /no avatar or background/i);
  assert.match(evals, /role_patch_assets/);
});
