import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const CARD_WRITER_URL_PLACEHOLDER = '${LUNATALK_CARD_WRITER_MCP_URL}';

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'));
}

test('plugin MCP config uses a placeholder Card Writer endpoint', async () => {
	const rawConfig = await readFile('.mcp.json', 'utf8');
	const config = JSON.parse(rawConfig);

	assert.equal(config.mcpServers['lunatalk-card-writer'].type, 'http');
	assert.equal(config.mcpServers['lunatalk-card-writer'].url, CARD_WRITER_URL_PLACEHOLDER);
	assert.match(rawConfig, /\$\{LUNATALK_CARD_WRITER_MCP_URL\}/);
	assert.doesNotMatch(rawConfig, /https?:\/\/(?:api|admin)\.lunatalk\.(?:ai|pro)/);
});

test('Codex plugin website points to LunaTalk public site', async () => {
  const plugin = await readJson('.codex-plugin/plugin.json');

  assert.equal(plugin.interface.websiteURL, 'https://lunatalk.ai');
});

test('Claude marketplace uses a LunaTalk plugin-source name and public plugin name', async () => {
	const marketplace = await readJson('.claude-plugin/marketplace.json');

	assert.equal(marketplace.name, 'lunatalk-plugins-moonloom');
	assert.doesNotMatch(marketplace.name, /dev/i);
	assert.equal(marketplace.plugins[0].name, 'moonloom');
});
