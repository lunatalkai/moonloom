import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Moonloom conversation guidance uses a 60 second MCP wait window', async () => {
  const chatSkill = await readFile('skills/lunatalk-chat-simulation/SKILL.md', 'utf8');
  const mcpReference = await readFile('references/card-writer-mcp.md', 'utf8');
  const mcpWorkflow = await readFile('references/mcp-client-workflow.md', 'utf8');

  for (const source of [chatSkill, mcpReference, mcpWorkflow]) {
    assert.match(source, /waitMs/i);
    assert.match(source, /60000/);
    assert.match(source, /60 seconds/i);
  }

  assert.doesNotMatch(chatSkill, /10\s*seconds/i);
  assert.doesNotMatch(mcpWorkflow, /10\s*seconds/i);
});
