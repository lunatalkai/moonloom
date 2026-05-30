import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const CARD_WRITER_URL = 'https://api.lunatalk.ai/mcp/card-writer';

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'));
}

test('plugin MCP config uses the public API Card Writer endpoint', async () => {
	const plugin = await readJson('.codex-plugin/plugin.json');
	const rawConfig = await readFile('.mcp.json', 'utf8');
	const config = JSON.parse(rawConfig);

	assert.equal(plugin.mcpServers, './.mcp.json');
	assert.equal(config.mcpServers['lunatalk-card-writer'].type, 'http');
	assert.equal(config.mcpServers['lunatalk-card-writer'].url, CARD_WRITER_URL);
	assert.doesNotMatch(rawConfig, /\$\{[^}]+\}/);
	assert.doesNotMatch(rawConfig, /LUNATALK_CARD_WRITER_MCP_URL/);
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

test('all public plugin manifests use the package version', async () => {
	const packageJson = await readJson('package.json');
	const codexPlugin = await readJson('.codex-plugin/plugin.json');
	const claudePlugin = await readJson('.claude-plugin/plugin.json');
	const claudeMarketplace = await readJson('.claude-plugin/marketplace.json');
	const cursorPlugin = await readJson('.cursor-plugin/plugin.json');

	for (const version of [
		codexPlugin.version,
		claudePlugin.version,
		claudeMarketplace.plugins[0].version,
		cursorPlugin.version,
	]) {
		assert.equal(version, packageJson.version);
	}
});
