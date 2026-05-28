import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Moonloom requires HTML parity checks before XMLV3 writing-logic repairs', async () => {
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');
  const presentationDirector = await readFile('skills/lunatalk-presentation-director/SKILL.md', 'utf8');
  const renderReview = await readFile('skills/lunatalk-render-review/SKILL.md', 'utf8');

  for (const source of [themeRendering, presentationDirector, renderReview]) {
    assert.match(source, /HTML parity checklist|HTML-style|rich HTML/i);
    assert.match(source, /sectioning/i);
    assert.match(source, /local color|tone/i);
    assert.match(source, /action density|action grids/i);
    assert.match(source, /state surface|external state|status surface/i);
    assert.match(source, /form controls|form parity|input/i);
    assert.match(source, /six[\s\S]*form[\s\S]*controls|formControlCount\s*>=\s*6/i);
    assert.match(source, /desktop\/mobile|desktop and mobile/i);
    assert.match(source, /before[\s\S]*writing logic|before changing[\s\S]*writing logic|before improving[\s\S]*writing logic/i);
  }
});

test('Moonloom render review reads action layout diagnostics before prose repairs', async () => {
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');
  const renderReview = await readFile('skills/lunatalk-render-review/SKILL.md', 'utf8');

  for (const source of [themeRendering, renderReview]) {
    assert.match(source, /actionColumns|actionLayoutMaxColumns/);
    assert.match(source, /choiceSpans|choiceSpanCount/);
    assert.match(source, /fallbackActionGroups|fallbackActionGroupCount/);
    assert.match(source, /naked[\s\S]*<choice>|consecutive[\s\S]*<choice>/);
    assert.match(source, /explicit[\s\S]*<choices>/);
    assert.match(source, /horizontal splitting|left\/right halves|full-width/i);
  }
});

test('Moonloom keeps normal visual review on clean preview URLs', async () => {
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');
  const renderReview = await readFile('skills/lunatalk-render-review/SKILL.md', 'utf8');
  const cardWriterMcp = await readFile('references/card-writer-mcp.md', 'utf8');

  for (const source of [themeRendering, renderReview, cardWriterMcp]) {
    assert.match(source, /clean[\s\S]*previewUrl/i);
    assert.match(source, /Do[\s\S]*not[\s\S]*(add|append) `debug=1`/i);
    assert.match(source, /debug[\s\S]*renderer\s+diagnosis/i);
    assert.match(source, /headers[\s\S]*IDs[\s\S]*report\s+panels/i);
  }
});

test('Moonloom documents speaker as a switch marker, not a repeated single-speaker prefix', async () => {
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');
  const presentationDesign = await readFile('references/presentation-design.md', 'utf8');

  for (const source of [themeRendering, presentationDesign]) {
    assert.match(source, /speaker changes|speaker switch/i);
    assert.match(source, /single-speaker|single speaker/i);
    assert.match(source, /omit `<speaker>`|omit <speaker>|do not add `<speaker>`/i);
  }
});

test('Moonloom requires token-aware HTML parity instead of copying V2 HTML bloat', async () => {
  const tokenEconomy = await readFile('references/token-economy.md', 'utf8');
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');
  const presentationDesign = await readFile('references/presentation-design.md', 'utf8');

  for (const source of [tokenEconomy, themeRendering, presentationDesign]) {
    assert.match(source, /o200k_base/);
    assert.match(source, /single\s+offline\s+tokenizer\s+baseline|single\s+tokenizer\s+baseline|one\s+tokenizer\s+baseline/i);
    assert.doesNotMatch(source, /cl100k_base/);
    assert.doesNotMatch(source, /count_tokens/);
    assert.match(source, /roleDesc[\s\S]*(not sent|not model input|display\/search)/i);
    assert.match(source, /roleDetailDesc[\s\S]*roleWelcome|detail[\s\S]*welcome/i);
    assert.match(source, /AI output|per-turn output|model output/i);
    assert.match(source, /structure tokens|structure-token|structure cost/i);
    assert.match(source, /Theme V3/);
    assert.match(source, /inline CSS|class-heavy|class names|class\/style/i);
    assert.match(source, /changed setup|changed values|unchanged setup/i);
  }
});

test('Moonloom requires visible status widgets to match hidden XMLV3 state', async () => {
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');
  const presentationDesign = await readFile('references/presentation-design.md', 'utf8');

  for (const source of [themeRendering, presentationDesign]) {
    assert.match(source, /visible[\s\S]*(bar|meter|status)/i);
    assert.match(source, /hidden[\s\S]*state/i);
    assert.match(source, /(same|matching|matched)[\s\S]*(key|label)/i);
    assert.match(source, /(must|should)[\s\S]*(match|agree|stay in sync)/i);
    assert.match(source, /stateVisualMismatchCount|xmlv3_state_visual_value_mismatch/);
  }
});

test('Moonloom treats status bars as an update contract instead of all progress bars', async () => {
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');
  const presentationDesign = await readFile('references/presentation-design.md', 'utf8');
  const stateEconomy = await readFile('references/state-economy-design.md', 'utf8');

  for (const source of [themeRendering, presentationDesign, stateEconomy]) {
    assert.match(source, /status bar|狀態欄/i);
    assert.match(source, /not[\s\S]*progress bars|不是進度條集合/i);
    assert.match(source, /bar[\s\S]*continuous numeric|bar 只用於連續數值/i);
    assert.match(source, /text|enum|flag|resource|文字|枚舉|資源/i);
    assert.match(source, /roleDetailDesc[\s\S]*(update contract|更新契約)|detail[\s\S]*(update contract|更新契約)/i);
    assert.match(source, /2-6|3-6|two to six|three to six/i);
  }
});

test('Moonloom authoring workflow asks for status bar generation and update rules', async () => {
  const templates = await readFile('references/card-authoring-templates.md', 'utf8');
  const stateEconomist = await readFile('skills/lunatalk-state-economist/SKILL.md', 'utf8');
  const presentationDirector = await readFile('skills/lunatalk-presentation-director/SKILL.md', 'utf8');

  for (const source of [templates, stateEconomist, presentationDirector]) {
    assert.match(source, /status bar|狀態欄/i);
    assert.match(source, /generation|generate|生成/i);
    assert.match(source, /update rule|update trigger|update cadence|更新規則|更新觸發|更新節奏/i);
    assert.match(source, /roleDetailDesc[\s\S]*(status bar|狀態欄)/i);
    assert.match(source, /not[\s\S]*progress bars|不是進度條集合/i);
  }
});
