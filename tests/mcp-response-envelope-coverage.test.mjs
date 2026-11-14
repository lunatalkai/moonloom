import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Moonloom documents Card Writer MCP response envelopes', async () => {
  const cardWriter = await readFile('references/card-writer-mcp.md', 'utf8');
  const workflow = await readFile('references/mcp-client-workflow.md', 'utf8');
  const mcpOperator = await readFile('skills/lunatalk-mcp-operator/SKILL.md', 'utf8');
  const chatSimulation = await readFile('skills/lunatalk-chat-simulation/SKILL.md', 'utf8');

  for (const source of [cardWriter, workflow]) {
    assert.match(source, /structuredContent/);
    assert.match(source, /summary in `result\.content\[0\]\.text`/);
    assert.match(source, /compact JSON copy of the complete `result\.structuredContent`/);
    assert.match(source, /`result\.content\[1\]\.text`/);
    assert.match(source, /client exposes only `content`, parse that JSON/);
    assert.match(source, /JSON is not truncated/);
    assert.match(source, /same fields and values as `structuredContent`/);
    assert.match(source, /`isError: true`/);
    assert.match(source, /`code: message`/);
    assert.match(source, /validate_role.*report/s);
    assert.match(source, /render_preview.*render/s);
    assert.match(source, /conversation.*conversation/s);
  }

  assert.match(cardWriter, /previewUrl.*not.*top-level|top-level.*previewUrl/s);
  assert.match(mcpOperator, /structuredContent\.render/);
  assert.match(mcpOperator, /structuredContent\.conversation/);
  assert.match(chatSimulation, /structuredContent\.conversation/);
});
