import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Moonloom calibrates roleDetailDesc budget by language and card ambition', async () => {
  const tokenEconomy = await readFile('references/token-economy.md', 'utf8');
  const framework = await readFile('references/role-card-writing-framework.md', 'utf8');
  const cardAuthor = await readFile('skills/lunatalk-card-author/SKILL.md', 'utf8');
  const templates = await readFile('references/card-authoring-templates.md', 'utf8');

  assert.match(tokenEconomy, /Language-aware detail budget/i);
  assert.match(tokenEconomy, /10,000-character non-English/i);
  assert.match(tokenEconomy, /50,000-character English/i);
  assert.match(tokenEconomy, /full-detail candidate/i);
  assert.match(tokenEconomy, /empty budget|thin detail/i);

  assert.match(framework, /language-aware detail budget/i);
  assert.match(framework, /full-detail candidate/i);
  assert.match(cardAuthor, /language-aware detail budget/i);
  assert.match(cardAuthor, /not ready for MCP patching/i);
  assert.match(templates, /detail budget plan/i);
  assert.match(templates, /zh-Hant|English/i);
});
