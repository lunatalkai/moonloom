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

test('MCP OAuth lifecycle documents rotating refresh and loopback recovery', async () => {
  const lifecycle = await readFile('references/oauth-client-lifecycle.md', 'utf8');
  const readme = await readFile('README.md', 'utf8');

  assert.match(lifecycle, /8 hours/);
  assert.match(lifecycle, /30 days/);
  assert.match(lifecycle, /rotate|rotating/i);
  assert.match(lifecycle, /replayed refresh token revokes/i);
  assert.match(lifecycle, /127\.0\.0\.1|localhost/);
  assert.match(lifecycle, /compatibility fallback/i);
  assert.match(lifecycle, /invalid_grant/);
  assert.match(readme, /oauth-client-lifecycle\.md/);
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
    'worldbook_unbind',
    'worldbook_bindings',
  ]) {
    assert.match(workflow, new RegExp(tool));
    assert.match(mcpReference, new RegExp(tool));
  }
  assert.match(mcpReference, /structuredContent\.worldbook/);
  assert.match(mcpReference, /structuredContent\.binding/);
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

test('MCP workflow documents the safe MOD marketplace read contract', async () => {
  const workflow = await readFile('references/mcp-client-workflow.md', 'utf8');
  const cardWriter = await readFile('references/card-writer-mcp.md', 'utf8');
  const operator = await readFile('skills/lunatalk-mcp-operator/SKILL.md', 'utf8');
  const packageJSON = JSON.parse(await readFile('package.json', 'utf8'));
  const pluginJSON = JSON.parse(await readFile('.codex-plugin/plugin.json', 'utf8'));

  for (const tool of [
    'mod_market_find',
    'mod_market_get',
    'mod_lineage_get',
    'mod_public_worldbook_read',
    'mod_entitlement_list',
    'mod_role_list',
    'mod_review_list',
    'mod_purchase_quote',
    'mod_purchase_status',
  ]) {
    assert.match(workflow, new RegExp(tool));
    assert.match(cardWriter, new RegExp(tool));
  }

  for (const source of [workflow, cardWriter, operator]) {
    assert.match(source, /2026-07-23\.mod-marketplace\.v1/);
    assert.match(source, /officialOnly/);
    assert.match(
      source,
      /last[- ]published\s+MOD\s+release[\s\S]{0,180}(?:immutable\s+)?(?:worldbook\s+)?snapshot/i,
    );
    assert.match(source, /first-party UI/i);
    assert.match(source, /user_confirmation_required/);
    assert.match(source, /do not.*(?:auto-ack|auto.*renew|auto.*purchase)/i);
    assert.match(source, /account UUID|private worldbook|closed MOD implementation/i);
    assert.match(source, /backgroundUrl[\s\S]{0,220}2:1/i);
    assert.match(source, /avatarUrl[\s\S]{0,220}1:1/i);
    assert.match(source, /iconUrl[\s\S]{0,160}legacy/i);
    assert.match(source, /(?:internal image IDs|MOD media image identifiers)/i);
    assert.match(source, /media (?:upload|mutation)[\s\S]{0,240}(?:not exposed|not MCP|not.*MCP)/i);
  }
  assert.match(cardWriter, /suspended_expired/);
  assert.match(cardWriter, /No MCP purchase|does not expose.*mod_purchase/i);
  assert.equal(packageJSON.version, '0.1.51');
  assert.equal(pluginJSON.version, '0.1.51');
});

test('MCP workflow keeps MOD discovery and role enablement free of rollout attempt metadata', async () => {
  const workflow = await readFile('references/mcp-client-workflow.md', 'utf8');
  const cardWriter = await readFile('references/card-writer-mcp.md', 'utf8');
  const operator = await readFile('skills/lunatalk-mcp-operator/SKILL.md', 'utf8');
  const evals = JSON.parse(
    await readFile('skills/lunatalk-mcp-operator/evals/evals.json', 'utf8'),
  );
  const packageJSON = JSON.parse(await readFile('package.json', 'utf8'));
  const manifests = await Promise.all([
    '.claude-plugin/marketplace.json',
    '.claude-plugin/plugin.json',
    '.codex-plugin/plugin.json',
    '.cursor-plugin/plugin.json',
  ].map(async (path) => JSON.parse(await readFile(path, 'utf8'))));

  for (const source of [workflow, cardWriter, operator]) {
    assert.match(source, /mod_market_find[\s\S]{0,180}(?:no|without) rollout attempt metadata/i);
    assert.match(source, /mod_role_set_enabled[\s\S]{0,240}(?:no|without) rollout attempt metadata/i);
    assert.doesNotMatch(source, /attemptKey|X-Mod-Attempt-Key|mod_rollout_attempt_key/i);
    assert.match(source, /mod_purchase_status[\s\S]{0,80}idempotencyKey/i);
    assert.match(source, /same\s+`idempotencyKey` for the same\s+intended purchase/i);
    assert.match(source, /acquisition gate[\s\S]{0,180}(?:reconciliation|readback)/i);
  }
  assert.match(cardWriter, /Card Writer authoring tool calls use[\s\S]{0,120}2026-05-26\.m1/i);
  assert.doesNotMatch(cardWriter, /Every tool call uses:/i);
  assert.ok(
    evals.evals.some((entry) => /without rollout attempt metadata/.test(JSON.stringify(entry))
      && /mod_market_find/.test(JSON.stringify(entry))
      && /mod_role_set_enabled/.test(JSON.stringify(entry))
      && /mod_purchase_status/.test(JSON.stringify(entry))
      && /idempotencyKey/.test(JSON.stringify(entry))
      && !/attemptKey|X-Mod-Attempt-Key|mod_rollout_attempt_key/i.test(JSON.stringify(entry))),
    'missing no-attempt-metadata MOD workflow eval',
  );
  assert.equal(packageJSON.version, '0.1.51');
  for (const manifest of manifests) {
    assert.equal(manifest.version ?? manifest.plugins?.[0]?.version, '0.1.51');
  }
});

test('MCP workflow supports public-author discovery without private identity leakage', async () => {
  const workflow = await readFile('references/mcp-client-workflow.md', 'utf8');
  const cardWriter = await readFile('references/card-writer-mcp.md', 'utf8');
  const operator = await readFile('skills/lunatalk-mcp-operator/SKILL.md', 'utf8');
  const evals = JSON.parse(
    await readFile('skills/lunatalk-mcp-operator/evals/evals.json', 'utf8'),
  );

  for (const source of [workflow, cardWriter, operator]) {
    assert.match(source, /authorAccountNumId/);
    assert.match(source, /public (?:numeric )?(?:author|account) (?:identifier|number)/i);
    assert.match(source, /account UUID|private account identifier/i);
  }
  assert.ok(
    evals.evals.some((entry) => (
      /authorAccountNumId/.test(JSON.stringify(entry))
      && /other (?:listed|public) MODs|same author/i.test(JSON.stringify(entry))
    )),
    'missing safe public-author discovery eval',
  );
});

test('MCP workflow preserves the fail-closed quote and readable status contract', async () => {
  const workflow = await readFile('references/mcp-client-workflow.md', 'utf8');
  const cardWriter = await readFile('references/card-writer-mcp.md', 'utf8');
  const operator = await readFile('skills/lunatalk-mcp-operator/SKILL.md', 'utf8');
  const evals = JSON.parse(
    await readFile('skills/lunatalk-mcp-operator/evals/evals.json', 'utf8'),
  );

  for (const source of [workflow, cardWriter, operator]) {
    assert.match(source, /mod_purchase_quote[\s\S]{0,360}(?:shared )?acquisition[\s\S]{0,180}(?:rollout|runtime|reconciliation|readback)/i);
    assert.match(
      source,
      /(?:all|every)\s+point(?:s-commerce|-priced)\s+(?:plan|quote)[\s\S]{0,120}including\s+lifetime[\s\S]{0,180}fresh\s+successful\s+reconciliation\s+readback/i,
    );
    assert.doesNotMatch(source, /timed plans? (?:also|additionally) require/i);
    assert.match(source, /quote fails closed/i);
    assert.match(source, /mod_purchase_status[\s\S]{0,360}(?:remains?|still) readable/i);
    assert.match(source, /first-party UI/i);
    assert.match(source, /no MCP purchase|does not expose.*mod_purchase/i);
  }

  assert.ok(
    evals.evals.some((entry) => /quote[\s\S]{0,320}status[\s\S]{0,320}(?:readable|read)/i.test(JSON.stringify(entry))),
    'missing quote-gate/status-readback eval',
  );
  assert.ok(
    evals.evals.some((entry) => {
      const serialized = JSON.stringify(entry);
      return /lifetime/i.test(serialized)
        && /fresh successful reconciliation readback/i.test(serialized);
    }),
    'missing lifetime freshness eval',
  );
});

test('MCP workflow documents the approved MOD role/update contract without a retired beta presentation gate', async () => {
  const workflow = await readFile('references/mcp-client-workflow.md', 'utf8');
  const cardWriter = await readFile('references/card-writer-mcp.md', 'utf8');
  const operator = await readFile('skills/lunatalk-mcp-operator/SKILL.md', 'utf8');
  const evals = JSON.parse(
    await readFile('skills/lunatalk-mcp-operator/evals/evals.json', 'utf8'),
  );
  const packageJSON = JSON.parse(await readFile('package.json', 'utf8'));
  const manifests = await Promise.all([
    '.claude-plugin/marketplace.json',
    '.claude-plugin/plugin.json',
    '.codex-plugin/plugin.json',
    '.cursor-plugin/plugin.json',
  ].map(async (path) => JSON.parse(await readFile(path, 'utf8'))));

  for (const tool of [
    'mod_role_set_enabled',
    'mod_update_preview',
    'mod_update_apply',
    'mod_author_offer_get',
  ]) {
    assert.match(workflow, new RegExp(tool));
    assert.match(cardWriter, new RegExp(tool));
    assert.match(operator, new RegExp(tool));
  }
  for (const source of [workflow, cardWriter, operator]) {
    assert.doesNotMatch(source, /beta[- ]only|beta cohort|outside (?:the )?beta/i);
    assert.match(source, /role authored by (?:the )?caller|caller.*CURRENT conversation/i);
    assert.match(source, /unrelated roles?.*(?:not exposed|not disclose)|(?:not exposed|not disclose).*unrelated roles?/i);
    assert.match(source, /active entitlement|valid entitlement/i);
    assert.match(source, /preview token|previewToken/i);
    assert.match(source, /expectedInstalledVersion/);
    assert.match(source, /confirm(?:ation)?[=: ]+true|`confirm`.*true/i);
    assert.match(source, /closed MOD implementation|private worldbook/i);
  }
  for (const source of [workflow, cardWriter]) {
    assert.match(source, /mod_public_worldbook_read[\s\S]{0,260}(?:adjusted|equivalent|accessible)/i);
  }
  for (const forbidden of [
    'mod_purchase',
    'mod_review_write',
    'mod_review_helpful_set',
    'mod_review_reply',
    'mod_favorite_set',
    'mod_author_offer_put',
  ]) {
    assert.match(cardWriter, new RegExp(`(?:not exposed|does not expose|no MCP)[\\s\\S]{0,240}${forbidden}|${forbidden}[\\s\\S]{0,240}(?:not exposed|does not expose)`, 'i'));
  }
  assert.ok(
    evals.evals.some((entry) => /mod_update_preview/.test(JSON.stringify(entry))),
    'missing update preview/apply eval',
  );
  assert.ok(
    evals.evals.some((entry) => /CURRENT conversation/.test(JSON.stringify(entry))
      && /unrelated[- ]role|not exposed|not disclose/i.test(JSON.stringify(entry))
      && /active entitlement/.test(JSON.stringify(entry))
      && !/beta cohort|outside beta|beta-only/i.test(JSON.stringify(entry))),
    'missing role-access and entitlement denial eval without retired beta gate',
  );
  assert.equal(packageJSON.version, '0.1.51');
  for (const manifest of manifests) {
    const version = manifest.version ?? manifest.plugins?.[0]?.version;
    assert.equal(version, '0.1.51');
  }
});
