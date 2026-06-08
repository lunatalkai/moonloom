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
    'role_patch_talk_example',
    'role_patch_output_contract',
    'worldbook_find',
    'worldbook_get',
    'worldbook_patch_document',
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

test('MCP workflow documents public search tool for accessible roles and worlds', async () => {
  const workflow = await readFile('references/mcp-client-workflow.md', 'utf8');
  const mcpReference = await readFile('references/card-writer-mcp.md', 'utf8');

  assert.match(workflow, /public_search/);
  assert.match(mcpReference, /public_search/);
  assert.match(mcpReference, /structuredContent\.search/);
  assert.match(mcpReference, /role_find[\s\S]{0,220}owned/i);
  assert.match(mcpReference, /public_search[\s\S]{0,260}public roles and worlds/i);
  assert.match(mcpReference, /systemTag[\s\S]{0,180}public/i);
  assert.match(mcpReference, /includeNsfw[\s\S]{0,180}account setting/i);
  assert.match(mcpReference, /roleDetailDesc[\s\S]{0,180}(confidential|private)/i);
  assert.match(mcpReference, /conversation_model_catalog[\s\S]{0,220}conversation_create/);
  assert.match(workflow, /Public discovery/);
});

test('MCP workflow documents worldbook patch document workflow', async () => {
  const workflow = await readFile('references/mcp-client-workflow.md', 'utf8');
  const mcpReference = await readFile('references/card-writer-mcp.md', 'utf8');

  assert.match(mcpReference, /lunatalk\.worldbookPatch\.v1/);
  assert.match(mcpReference, /worldbook_patch_document/);
  assert.match(mcpReference, /locally prepared document/i);
  assert.match(mcpReference, /MCP cannot read a client-local file path by itself/i);
  assert.match(mcpReference, /"entries"/);
  assert.match(mcpReference, /"op": "create"/);
  assert.match(mcpReference, /"op": "update"/);
  assert.match(mcpReference, /"op": "delete"/);
  assert.match(mcpReference, /structuredContent\.document/);
  assert.match(workflow, /worldbook_patch_document/);
});

test('MCP workflow documents direct deep patch workflow', async () => {
  const workflow = await readFile('references/mcp-client-workflow.md', 'utf8');
  const mcpReference = await readFile('references/card-writer-mcp.md', 'utf8');

  assert.match(mcpReference, /direct deep patch/i);
  assert.match(mcpReference, /patch\.deepPatch/);
  assert.match(mcpReference, /patch\.textPatches\.roleDesc/);
  assert.match(mcpReference, /document\.fieldPatches/);
  assert.match(mcpReference, /contentDeepPatch/);
  assert.match(mcpReference, /textPatches\.description/);
  assert.match(mcpReference, /replaceText/);
  assert.match(mcpReference, /insertText/);
  assert.match(mcpReference, /appendText/);
  assert.match(mcpReference, /baseSha256/);
  assert.match(workflow, /direct deep patch/i);
  assert.match(workflow, /role_get/);
  assert.match(workflow, /worldbook_entry_list/);
  assert.match(workflow, /SHA-256/);
  assert.match(workflow, /stale bases/i);
  assert.match(workflow, /non-unique anchors/i);
  assert.doesNotMatch(mcpReference, /document_upload/);
  assert.doesNotMatch(workflow, /document_upload/);
});

test('MCP workflow documents roleTag text-array canonicalization', async () => {
  const mcpReference = await readFile('references/card-writer-mcp.md', 'utf8');

  assert.match(mcpReference, /roleTag[\s\S]{0,160}plain array of tag text strings/);
  assert.match(mcpReference, /Do not send one comma-separated string/);
  assert.match(mcpReference, /\{"icon":"",\s*"text":"\.\.\.",\s*"type":2\}/);
});

test('MCP workflow documents author reply format contract', async () => {
  const workflow = await readFile('references/mcp-client-workflow.md', 'utf8');
  const mcpReference = await readFile('references/card-writer-mcp.md', 'utf8');

  assert.match(workflow, /role_patch_output_contract/);
  assert.match(workflow, /output-contract/i);
  assert.match(mcpReference, /role_patch_output_contract/);
  assert.match(mcpReference, /roleOutputContract/);
  assert.match(mcpReference, /Reply Format Example|回覆格式範例/);
  assert.match(mcpReference, /2,000 characters/i);
  assert.match(mcpReference, /platform runtime\s+format rules/i);
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

test('MCP workflow documents fixed worldbook entry categories', async () => {
  const workflow = await readFile('references/mcp-client-workflow.md', 'utf8');
  const mcpReference = await readFile('references/card-writer-mcp.md', 'utf8');
  const allowed = ['rule', 'character', 'location', 'item', 'event', 'custom'];

  for (const category of allowed) {
    assert.match(mcpReference, new RegExp(`\\b${category}\\b`));
  }
  assert.match(mcpReference, /allowed categor(?:y|ies)/i);
  assert.match(mcpReference, /Do not invent categories/i);
  assert.match(mcpReference, /faction|timeline|relationship|scene/i);
  assert.match(workflow, /rule, character, location, item, event, custom/);
});

test('MCP conversation testing documents thinking mode selection', async () => {
  const workflow = await readFile('references/mcp-client-workflow.md', 'utf8');
  const mcpReference = await readFile('references/card-writer-mcp.md', 'utf8');
  const playtestLoop = await readFile('references/playtest-loop.md', 'utf8');
  const chatSimulation = await readFile('skills/lunatalk-chat-simulation/SKILL.md', 'utf8');

  for (const source of [workflow, mcpReference, playtestLoop, chatSimulation]) {
    assert.match(source, /conversation_model_catalog/);
    assert.match(source, /thinkingDepthOptions/);
    assert.match(source, /defaultThinkingDepth/);
    assert.match(source, /thinkingDepth/);
  }
  assert.match(mcpReference, /Instant[\s\S]{0,120}High[\s\S]{0,120}Max[\s\S]{0,120}Ultra/);
  assert.match(mcpReference, /off[\s\S]{0,80}on[\s\S]{0,80}high[\s\S]{0,80}max[\s\S]{0,80}ultra/);
  assert.match(workflow, /pass the selected value as `thinkingDepth`/i);
  assert.match(chatSimulation, /record the selected thinkingDepth/i);
});
