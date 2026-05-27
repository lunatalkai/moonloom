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
    assert.match(source, /formControlCount/);
    assert.match(source, /stateSurface/);
    assert.match(source, /toneCount/);
    assert.match(source, /localStyleHookCount/);
    assert.match(source, /HTML.*XMLV3|XMLV3.*HTML/i);
  }
});
