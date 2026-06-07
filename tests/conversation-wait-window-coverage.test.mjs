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

test('Moonloom conversation guidance queries model cost before paid playtests', async () => {
  const playtestLoop = await readFile('references/playtest-loop.md', 'utf8');
  const mcpWorkflow = await readFile('references/mcp-client-workflow.md', 'utf8');

  assert.match(mcpWorkflow, /conversation_model_catalog/);
  assert.match(mcpWorkflow, /recommendedModel/);
  assert.match(mcpWorkflow, /conversation_send_message[\s\S]*model/i);
  assert.match(mcpWorkflow, /costScore[\s\S]*effectiveCostScore/);

  assert.match(playtestLoop, /conversation_model_catalog/);
  assert.match(playtestLoop, /recommendedModel/);
  assert.match(playtestLoop, /Do not send the next probe/i);
  assert.match(playtestLoop, /waiting_ai[\s\S]*generating/);
  assert.match(playtestLoop, /latest message[\s\S]*USER/i);
});

test('Moonloom model catalog guidance reads status confidence and gateway health', async () => {
  const chatSkill = await readFile('skills/lunatalk-chat-simulation/SKILL.md', 'utf8');
  const playtestLoop = await readFile('references/playtest-loop.md', 'utf8');
  const mcpReference = await readFile('references/card-writer-mcp.md', 'utf8');

  for (const source of [chatSkill, playtestLoop, mcpReference]) {
    assert.match(source, /status\.confidence/);
    assert.match(source, /status\.gatewayHealth/);
    assert.match(source, /status\.errorBuckets/);
    assert.match(source, /unknown[\s\S]{0,120}sample/i);
    assert.match(source, /gatewayHealth\.state[\s\S]{0,100}unknown/i);
  }
});
