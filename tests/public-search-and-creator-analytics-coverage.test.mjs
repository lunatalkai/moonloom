import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const WORKFLOW = 'references/mcp-client-workflow.md';
const REFERENCE = 'references/card-writer-mcp.md';

async function toolAvailabilitySection() {
  const workflow = await readFile(WORKFLOW, 'utf8');
  return workflow.split(/^## /m).find((s) => s.startsWith('Tool availability')) ?? '';
}

/** Slice one `### \`tool\`` section out of the reference, up to the next `###`. */
async function referenceSection(tool) {
  const reference = await readFile(REFERENCE, 'utf8');
  const start = reference.indexOf(`### \`${tool}\``);
  if (start === -1) return '';
  const rest = reference.slice(start + 1);
  const end = rest.indexOf('\n### ');
  return end === -1 ? rest : rest.slice(0, end);
}

// Both tools were registered in the MCP catalog but had zero mentions anywhere
// in Moonloom — external clients could see them in tools/list with no guidance
// at all. Caught by the monorepo's MCP↔Moonloom parity gate.

test('public_search appears in the authoritative Tool availability list', async () => {
  assert.match(await toolAvailabilitySection(), /`public_search`/);
});

test('creator_analytics_brief appears in the authoritative Tool availability list', async () => {
  assert.match(await toolAvailabilitySection(), /`creator_analytics_brief`/);
});

test('public_search has a reference section covering its response wrapper', async () => {
  const section = await referenceSection('public_search');
  assert.notEqual(section, '', 'missing ### `public_search` section');
  assert.match(section, /structuredContent\.search/);
  assert.match(section, /`query`/);
});

test('public_search section states that private role internals are never returned', async () => {
  // Role Core Data Boundary: roleDetailDesc and friends are author-only, even
  // for a public role. A client that assumes search results carry the prompt
  // body would build the wrong workflow around this tool.
  const section = await referenceSection('public_search');
  assert.match(section, /roleDetailDesc/);
});

test('public_search section documents pagination', async () => {
  const section = await referenceSection('public_search');
  assert.match(section, /pageNum/);
  assert.match(section, /hasNextPage/);
});

test('creator_analytics_brief has a reference section covering its response wrapper', async () => {
  const section = await referenceSection('creator_analytics_brief');
  assert.notEqual(section, '', 'missing ### `creator_analytics_brief` section');
  assert.match(section, /structuredContent\.creatorAnalytics/);
});

test('creator_analytics_brief section documents the period window options', async () => {
  const section = await referenceSection('creator_analytics_brief');
  assert.match(section, /last30d/);
  assert.match(section, /custom/);
});

test('creator_analytics_brief section marks the tool read-only and owner-scoped', async () => {
  // It reads the authenticated author's own creator brief; it is not a public
  // analytics surface and it mutates nothing.
  const section = await referenceSection('creator_analytics_brief');
  assert.match(section, /read-only/i);
});

test('neither read-only tool puts idempotencyKey in its request example', async () => {
  // Both omit idempotencyKey from `required` server-side. A request example
  // carrying one would send clients generating keys for calls that never mutate
  // anything. Prose *saying* the key is unnecessary is fine — only the example
  // payload is checked.
  for (const tool of ['public_search', 'creator_analytics_brief']) {
    const section = await referenceSection(tool);
    // Guard: a missing section yields '', and doesNotMatch('') passes vacuously.
    assert.notEqual(section, '', `missing ### \`${tool}\` section`);
    const jsonBlocks = [...section.matchAll(/```json\n([\s\S]*?)```/g)].map((m) => m[1]);
    assert.ok(jsonBlocks.length > 0, `${tool} section needs a request example`);
    for (const block of jsonBlocks) {
      assert.doesNotMatch(block, /idempotencyKey/, `${tool} example must not carry an idempotencyKey`);
    }
  }
});
