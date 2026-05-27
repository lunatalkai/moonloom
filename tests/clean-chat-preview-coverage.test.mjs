import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Moonloom treats MCP chat preview as a clean AI-output surface', async () => {
  const cardWriter = await readFile('references/card-writer-mcp.md', 'utf8');
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');
  const renderReview = await readFile('skills/lunatalk-render-review/SKILL.md', 'utf8');

  for (const source of [cardWriter, themeRendering, renderReview]) {
    assert.match(source, /clean preview|clean chat preview/i);
    assert.match(source, /AI output|assistant output|message output/i);
    assert.match(source, /avatar|byline|sidebar|normal chat page/i);
    assert.match(source, /bubble/i);
    assert.match(source, /state.*outside.*bubble|outside.*bubble.*state/i);
    assert.match(source, /desktop.*mobile|mobile.*desktop/i);
  }
});
