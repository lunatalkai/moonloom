import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Moonloom documents the Theme V3 MCP render and Visual Check closed loop', async () => {
  const cardWriterMcp = await readFile('references/card-writer-mcp.md', 'utf8');
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');
  const mcpWorkflow = await readFile('references/mcp-client-workflow.md', 'utf8');
  const presentationDirector = await readFile('skills/lunatalk-presentation-director/SKILL.md', 'utf8');
  const renderReview = await readFile('skills/lunatalk-render-review/SKILL.md', 'utf8');
  const mcpOperator = await readFile('skills/lunatalk-mcp-operator/SKILL.md', 'utf8');

  for (const source of [cardWriterMcp, themeRendering, mcpWorkflow, mcpOperator]) {
    assert.match(source, /theme_validate_css/);
    assert.match(source, /render_xmlv3_theme_case/);
    assert.match(source, /theme_create/);
    assert.match(source, /theme_update/);
    assert.match(source, /theme_submit/);
    assert.match(source, /theme_bind/);
    assert.match(source, /Visual Check|visual check|視覺校驗/i);
    assert.match(source, /3\s*(loops|iterations|rounds)|3\s*輪|三輪/i);
  }

  for (const source of [themeRendering, presentationDirector, renderReview]) {
    assert.match(source, /custom Theme V3|自定義 Theme V3|custom theme/i);
    assert.match(source, /role atmosphere|角色氛圍|worldview|世界觀|mood|劇情氛圍/i);
    assert.match(source, /dialogue|台詞|<d>/i);
    assert.match(source, /narration|旁白|<n>/i);
    assert.match(source, /status|狀態|<field>|<bar>/i);
    assert.match(source, /choices|選項|<choices>|<choice>/i);
    assert.match(source, /custom tone|tone hook|data-tone|自定義 tone/i);
    assert.match(source, /contrast|對比/i);
    assert.match(source, /44pt|48dp|touch target|點擊區域/i);
  }

  assert.match(themeRendering, /\.lt-status-bar/);
  assert.match(themeRendering, /\.lt-status-stat-fill/);
  assert.match(themeRendering, /\.lt-status-rel-fill/);
  assert.match(themeRendering, /status bar[\s\S]{0,240}Theme V3|Theme V3[\s\S]{0,240}status bar/i);
  assert.match(presentationDirector, /status bar[\s\S]{0,240}Theme V3|Theme V3[\s\S]{0,240}status bar/i);
  assert.match(mcpWorkflow, /structuredContent\.binding|binding[\s\S]{0,160}themeId/i);
  assert.match(mcpWorkflow, /render_preview[\s\S]{0,260}preview payload[\s\S]{0,260}bound theme|bound theme[\s\S]{0,260}preview payload[\s\S]{0,260}render_preview/i);
  assert.match(cardWriterMcp, /theme_bind[\s\S]{0,420}structuredContent\.binding|structuredContent\.binding[\s\S]{0,420}theme_bind/i);
  assert.match(cardWriterMcp, /default fallback[\s\S]{0,260}themeStyleHookCount|themeStyleHookCount[\s\S]{0,260}default fallback/i);
});
