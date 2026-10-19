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
    assert.match(source, /official-glm-5\.3/);
    assert.match(source, /bare\s+`glm-5\.3`/);
    assert.match(source, /gemini-3\.8-flash/);
    // The older Gemini and Qwen values were delisted on 2026-10-13.
    // Preserve that current public contract instead of requiring stale price parity.
    assert.match(source, /Gemini 3\.7 Flash/);
    assert.match(source, /Qwen3\.7 Plus/);
    assert.match(source, /removed from selectable (?:HTTP and MCP )?catalogs/);
    assert.match(source, /2026-10-13/);
    assert.match(source, /Qwen3\.8 Flash/);
    assert.match(source, /gemini-4-argon-high/);
  }
});
