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

test('MCP client workflow reference avoids credentials and environment URLs', async () => {
  const reference = await readFile('references/mcp-client-workflow.md', 'utf8');

  assert.match(reference, /Do not print tokens|credentials/i);
  assert.match(reference, /idempotency/i);
  assert.match(reference, /schemaVersion/);
  assert.match(reference, /tool availability|tool list/i);
});

test('MCP workflow documents worldbook authoring and binding tools', async () => {
  const workflow = await readFile('references/mcp-client-workflow.md', 'utf8');
  const mcpReference = await readFile('references/card-writer-mcp.md', 'utf8');

  for (const tool of [
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
  assert.match(mcpReference, /about 20 entries/i);
  assert.match(mcpReference, /per-category/i);
  assert.match(mcpReference, /Exact runtime limits are not specified/i);
  assert.match(mcpReference, /do not claim that worldbooks remove token limits/i);
});
