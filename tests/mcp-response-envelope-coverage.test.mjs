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
    assert.match(source, /validate_role.*report/s);
    assert.match(source, /render_preview.*render/s);
    assert.match(source, /conversation.*conversation/s);
  }

  assert.match(cardWriter, /previewUrl.*not.*top-level|top-level.*previewUrl/s);
  assert.match(cardWriter, /conversation_create[\s\S]*(?:accessible public role|public role)/i);
  assert.match(cardWriter, /role_patch[\s\S]*private role/i);
  assert.match(workflow, /Conversation testing[\s\S]*(?:accessible public role|public role)/i);
  for (const source of [cardWriter, workflow, mcpOperator, chatSimulation]) {
    assert.match(source, /tokenUsage/);
    assert.match(source, /cacheReadTokens/);
    assert.match(source, /cacheReadRatio/);
  }
  assert.match(mcpOperator, /structuredContent\.render/);
  assert.match(mcpOperator, /structuredContent\.conversation/);
  assert.match(chatSimulation, /structuredContent\.conversation/);
});
