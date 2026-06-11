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

test('Moonloom documents creator analytics MCP workflow', async () => {
  assert.equal(
    await fileExists('references/creator-analytics.md'),
    true,
    'missing creator analytics reference',
  );

  const creatorAnalytics = await readFile('references/creator-analytics.md', 'utf8');
  const cardWriter = await readFile('references/card-writer-mcp.md', 'utf8');
  const workflow = await readFile('references/mcp-client-workflow.md', 'utf8');
  const mcpOperator = await readFile('skills/lunatalk-mcp-operator/SKILL.md', 'utf8');
  const router = await readFile('skills/using-moonloom/SKILL.md', 'utf8');
  const readme = await readFile('README.md', 'utf8');

  for (const source of [creatorAnalytics, cardWriter, workflow, mcpOperator, router, readme]) {
    assert.match(source, /creator_analytics_brief/);
  }

  assert.match(creatorAnalytics, /Creator Brief/);
  assert.match(creatorAnalytics, /trend|market signal/i);
  assert.match(creatorAnalytics, /my card insight|owned card/i);
  assert.match(creatorAnalytics, /writing suggestion|writing tip/i);
  assert.match(creatorAnalytics, /creative opportunity|opportunity/i);
  assert.match(creatorAnalytics, /last1d[\s\S]*last7d[\s\S]*last30d[\s\S]*last90d[\s\S]*lastMonth[\s\S]*lastQuarter[\s\S]*custom/);
  assert.match(creatorAnalytics, /custom[\s\S]*startMonth[\s\S]*endMonth/i);
  assert.match(creatorAnalytics, /does not accept `accountId`|no `accountId`/i);
  assert.match(creatorAnalytics, /read-only/);
  assert.match(creatorAnalytics, /not a writing-quality gate|not.*quality gate/i);
  assert.match(creatorAnalytics, /confidenceLevel/);
  assert.match(creatorAnalytics, /low[\s\S]*observation|observation[\s\S]*low/i);
  assert.match(creatorAnalytics, /structuredContent\.creatorAnalytics/);
  assert.match(creatorAnalytics, /role_find[\s\S]*public_search/);

  assert.match(cardWriter, /structuredContent\.creatorAnalytics/);
  assert.match(workflow, /Tool availability[\s\S]*creator_analytics_brief/);
  assert.match(mcpOperator, /creator analytics|creator_analytics_brief/i);
  assert.match(router, /creator analytics|創作風向標|creator_analytics_brief/i);
  assert.match(readme, /Creator Analytics|creator_analytics_brief/);

  const protectedOriginPattern = new RegExp(
    [
      ['training', 'data'].join('\\s+'),
      ['raw', 'chat', 'transcript'].join('\\s+'),
      ['raw', 'user', 'prompt'].join('\\s+'),
    ].join('|'),
    'i',
  );

  for (const source of [creatorAnalytics, cardWriter, workflow, mcpOperator, router, readme]) {
    assert.doesNotMatch(source, /\baccountId\b[\s\S]{0,80}input/i);
    assert.doesNotMatch(source, protectedOriginPattern);
  }
});
