import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('official open-source model guidance preserves paid channel boundaries', async () => {
  const sources = await Promise.all([
    'references/card-writer-mcp.md',
    'references/mcp-client-workflow.md',
    'skills/lunatalk-chat-simulation/SKILL.md',
  ].map((path) => readFile(path, 'utf8')));

  for (const source of sources) {
    assert.match(source, /value_based/);
    assert.match(source, /stable_1/);
    assert.match(source, /official-\*/);
    assert.match(source, /never (?:covered by an )?unlimited/i);
    assert.match(source, /official-deepseek-v4-pro/);
    assert.match(source, /official-glm-5/);
    assert.match(source, /official-qwen3\.7-plus/);
  }
});
