import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const CARD_WRITER_URL = 'https://api.lunatalk.ai/mcp/card-writer';

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'));
}

test('plugin MCP config uses the public API Card Writer endpoint', async () => {
  const rawConfig = await readFile('.mcp.json', 'utf8');
  const config = JSON.parse(rawConfig);

  assert.equal(config.mcpServers['lunatalk-card-writer'].type, 'http');
  assert.equal(config.mcpServers['lunatalk-card-writer'].url, CARD_WRITER_URL);
  assert.doesNotMatch(rawConfig, /\$\{[^}]+\}/);
});

test('Codex plugin website points to LunaTalk public site', async () => {
  const plugin = await readJson('.codex-plugin/plugin.json');

  assert.equal(plugin.interface.websiteURL, 'https://lunatalk.ai');
});
