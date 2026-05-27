import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Moonloom guides require preview-compatible XMLV3 state shape', async () => {
  const cardWriter = await readFile('references/card-writer-mcp.md', 'utf8');
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');
  const templates = await readFile('references/card-authoring-templates.md', 'utf8');
  const presentation = await readFile('skills/lunatalk-presentation-director/SKILL.md', 'utf8');

  for (const source of [cardWriter, themeRendering, templates, presentation]) {
    assert.match(source, /scene/);
    assert.match(source, /status/);
    assert.match(source, /relationships/);
  }

  assert.match(cardWriter, /flat/i);
  assert.match(cardWriter, /state:none|preview.*state/i);
  assert.match(templates, /scene\/status\/relationships|scene.*status.*relationships/s);
  assert.match(presentation, /preview-compatible|preview.*state/i);
});
