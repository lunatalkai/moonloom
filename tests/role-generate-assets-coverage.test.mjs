import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('card writer MCP reference documents role_generate_assets', async () => {
  const reference = await readFile('references/card-writer-mcp.md', 'utf8');
  assert.match(reference, /### `role_generate_assets`/);
  // Contract essentials external clients must know.
  assert.match(reference, /role_generate_assets[\s\S]*roleBackground/);
  assert.match(reference, /role_generate_assets[\s\S]*roleAvatar/);
  assert.match(reference, /role_generate_assets[\s\S]*"prompt"/);
  assert.match(reference, /role_generate_assets[\s\S]*(charges|charged|points|积分|扣点|score)/i);
  // Must point authors at generating when no asset URL is available.
  assert.match(reference, /role_generate_assets/);
});

test('role_generate_assets appears in the authoritative Tool availability list', async () => {
  // The tool had a full `### role_generate_assets` section in card-writer-mcp.md
  // yet was missing from mcp-client-workflow.md's "Tool availability" list — the
  // one list a client reads to learn which tools exist. A tool documented in
  // depth but absent from the roster is a tool clients never discover.
  const workflow = await readFile('references/mcp-client-workflow.md', 'utf8');
  const section = workflow.split(/^## /m).find((s) => s.startsWith('Tool availability')) ?? '';
  assert.match(section, /`role_generate_assets`/);
});

test('the Tool availability entry warns that generation costs points', async () => {
  // This tool spends the author's score. A client that discovers it from the
  // roster alone must see the cost before it decides to call it.
  const workflow = await readFile('references/mcp-client-workflow.md', 'utf8');
  const section = workflow.split(/^## /m).find((s) => s.startsWith('Tool availability')) ?? '';
  const line = section.split('\n').find((l) => l.includes('`role_generate_assets`')) ?? '';
  assert.match(line, /(charges|costs|points|score)/i, 'roster entry must flag the point cost');
});

test('visual identity director offers role_generate_assets as a generate path', async () => {
  const skill = await readFile('skills/lunatalk-visual-identity-director/SKILL.md', 'utf8');
  assert.match(skill, /role_generate_assets/);
  // The art brief / prompt can be passed as the generation prompt override.
  assert.match(skill, /role_generate_assets[\s\S]*prompt|prompt[\s\S]*role_generate_assets/i);
  // Still a design-only skill: it hands off, it does not call MCP itself.
  assert.match(skill, /Do not call MCP tools/);
});
