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

test('Moonloom requires capturePlan-driven vertical review without desktop horizontal splits', async () => {
  const cardWriter = await readFile('references/card-writer-mcp.md', 'utf8');
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');
  const renderReview = await readFile('skills/lunatalk-render-review/SKILL.md', 'utf8');

  for (const source of [cardWriter, themeRendering, renderReview]) {
    assert.match(source, /capturePlan/);
    assert.match(source, /vertical segment|vertical `segments`|listed vertical|vertical overflow/i);
    assert.match(source, /requiredCaptureWidth|full content width|full-width/i);
    assert.match(source, /horizontal split|left\/right|left and right/i);
    assert.match(source, /Do not shorten|not proof.*shortened|not a reason to shorten/i);
  }
});

test('Moonloom uses surfaceDiagnostics for HTML and XMLV3 render parity checks', async () => {
  const cardWriter = await readFile('references/card-writer-mcp.md', 'utf8');
  const renderReview = await readFile('skills/lunatalk-render-review/SKILL.md', 'utf8');

  for (const source of [cardWriter, renderReview]) {
    assert.match(source, /surfaceDiagnostics/);
    assert.match(source, /sectionBlocks/);
    assert.match(source, /panelBlocks/);
    assert.match(source, /actionCount/);
    assert.match(source, /groupedActionCount/);
    assert.match(source, /fallbackActionGroupCount/);
    assert.match(source, /actionLayoutMaxColumns/);
    assert.match(source, /xmlv3_actions_render_single_column/);
    assert.match(source, /formControlCount/);
    assert.match(source, /stateSurface/);
    assert.match(source, /toneCount/);
    assert.match(source, /localStyleHookCount/);
    assert.match(source, /themeStyleHookCount/);
    assert.match(source, /customToneCount/);
    assert.match(source, /unresolvedToneCount/);
    assert.match(source, /xmlv3_custom_tones_without_theme_hooks/);
    assert.match(source, /nestedControlCount/);
    assert.match(source, /xmlv3_controls_nested_inside_scene/);
    assert.match(source, /HTML.*XMLV3|XMLV3.*HTML/i);
  }
});

test('Moonloom documents inline XMLV3 MCP preview probes', async () => {
  const cardWriter = await readFile('references/card-writer-mcp.md', 'utf8');
  const workflow = await readFile('references/mcp-client-workflow.md', 'utf8');
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');

  for (const source of [cardWriter, workflow, themeRendering]) {
    assert.match(source, /inline XMLV3 preview probe/i);
    assert.match(source, /payloadKey/);
    assert.match(source, /lunatalk:mcp-preview:payload:/);
    assert.match(source, /themeCss/);
    assert.match(source, /stateJson|state/);
    assert.match(source, /desktop.*mobile|mobile.*desktop/i);
    assert.match(source, /__LUNATALK_MCP_PREVIEW__/);
  }
});
