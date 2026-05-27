import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('XMLV3 MCP cards require Theme V3 binding before real chat acceptance', async () => {
  const cardAuthor = await readFile('skills/lunatalk-card-author/SKILL.md', 'utf8');
  const fieldFinalizer = await readFile('skills/lunatalk-field-finalizer/SKILL.md', 'utf8');
  const cardWriterMcp = await readFile('references/card-writer-mcp.md', 'utf8');
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');
  const chatSimulation = await readFile('skills/lunatalk-chat-simulation/SKILL.md', 'utf8');
  const playtestLoop = await readFile('references/playtest-loop.md', 'utf8');

  for (const source of [cardAuthor, fieldFinalizer, cardWriterMcp, themeRendering]) {
    assert.match(source, /XMLV3[\s\S]{0,220}theme_bind/i);
    assert.match(source, /real chat|conversation|真實聊天|對話回覆/i);
  }

  for (const source of [chatSimulation, playtestLoop]) {
    assert.match(source, /isV3\s*:\s*false|isV3=false|isV3 false/i);
    assert.match(source, /rendererMode\s*:\s*["']?plain|rendererMode plain/i);
    assert.match(source, /first character.*<|第一個字元.*</i);
    assert.match(source, /<choice/i);
    assert.match(source, /<state/i);
    assert.match(source, /theme_bind/i);
  }
});
