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
    assert.match(source, /desktop\/mobile|desktop and mobile/i);
    assert.match(source, /before[\s\S]*writing logic|before changing[\s\S]*writing logic|before improving[\s\S]*writing logic/i);
  }
});
