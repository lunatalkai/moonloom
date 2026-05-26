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
