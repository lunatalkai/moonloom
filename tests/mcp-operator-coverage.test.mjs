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

test('MCP client operation has a dedicated public skill and reference', async () => {
  assert.equal(
    await fileExists('skills/lunatalk-mcp-operator/SKILL.md'),
    true,
    'missing MCP operator skill',
  );
  assert.equal(
    await fileExists('skills/lunatalk-mcp-operator/evals/evals.json'),
    true,
    'missing MCP operator evals',
  );
  assert.equal(
    await fileExists('references/mcp-client-workflow.md'),
    true,
    'missing MCP client workflow reference',
  );
});

test('Moonloom router exposes MCP setup and tool-readiness workflow', async () => {
  const router = await readFile('skills/using-moonloom/SKILL.md', 'utf8');
  const readme = await readFile('README.md', 'utf8');

  assert.match(router, /lunatalk-mcp-operator/);
  assert.match(router, /tool availability|MCP readiness|auth|idempotency/i);
  assert.match(readme, /lunatalk-mcp-operator/);
});

test('MCP client workflow reference documents the public plugin endpoint', async () => {
  const reference = await readFile('references/mcp-client-workflow.md', 'utf8');
  const cardWriter = await readFile('references/card-writer-mcp.md', 'utf8');

  assert.match(reference, /Do not print tokens|credentials/i);
  assert.match(reference, /idempotency/i);
  assert.match(reference, /schemaVersion/);
  assert.match(reference, /tool availability|tool list/i);
  assert.match(reference, /https:\/\/api\.lunatalk\.ai\/mcp\/card-writer/);
  assert.match(reference, /\.codex-plugin\/plugin\.json[\s\S]{0,160}mcpServers[\s\S]{0,160}\.mcp\.json/);
  assert.match(reference, /\.mcp\.json[\s\S]{0,160}lunatalk-card-writer/);
  assert.doesNotMatch(reference, /public `\.mcp\.json`[\s\S]{0,120}placeholders/i);
  assert.match(cardWriter, /https:\/\/api\.lunatalk\.ai\/mcp\/card-writer/);
  assert.match(cardWriter, /POST `\/mcp\/card-writer`/);
  assert.match(cardWriter, /OAuth/i);
  assert.doesNotMatch(cardWriter, /Public Moonloom files use endpoint placeholders/i);
});

test('MCP workflow documents worldbook authoring and binding tools', async () => {
  const workflow = await readFile('references/mcp-client-workflow.md', 'utf8');
  const mcpReference = await readFile('references/card-writer-mcp.md', 'utf8');

  for (const tool of [
    'role_patch_document',
    'worldbook_find',
    'worldbook_get',
    'worldbook_entry_list',
    'worldbook_entry_create',
    'worldbook_entry_update',
    'worldbook_entry_delete',
    'worldbook_bind',
    'worldbook_bindings',
  ]) {
    assert.match(workflow, new RegExp(tool));
    assert.match(mcpReference, new RegExp(tool));
  }
  assert.match(mcpReference, /structuredContent\.worldbook/);
  assert.match(mcpReference, /structuredContent\.binding/);
});

test('MCP workflow documents worldbook injection limits conservatively', async () => {
  const mcpReference = await readFile('references/card-writer-mcp.md', 'utf8');

  assert.match(mcpReference, /keywords/);
  assert.match(mcpReference, /isConstant/);
  assert.match(mcpReference, /current player message/i);
  assert.match(mcpReference, /recent conversation context/i);
  assert.match(mcpReference, /constant entries are available every turn/i);
  assert.match(mcpReference, /bounded ranked selection/i);
  assert.match(mcpReference, /global runtime cap currently does not exceed 20 entries/i);
  assert.match(mcpReference, /per-category/i);
  assert.match(mcpReference, /not a permanent product contract/i);
  assert.match(mcpReference, /do not claim that worldbooks remove token limits/i);
});
