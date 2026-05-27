import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Moonloom names the XMLV3 layout pack as the safe div-like structure layer', async () => {
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');
  const presentation = await readFile('references/presentation-design.md', 'utf8');
  const cardWriterMcp = await readFile('references/card-writer-mcp.md', 'utf8');
  const presentationSkill = await readFile('skills/lunatalk-presentation-director/SKILL.md', 'utf8');
  const cardAuthor = await readFile('skills/lunatalk-card-author/SKILL.md', 'utf8');

  for (const source of [themeRendering, presentation, cardWriterMcp, presentationSkill, cardAuthor]) {
    assert.match(source, /layout pack|pack.*layout|layout.*extension/i);
    assert.match(source, /panel[\s\S]{0,220}stack[\s\S]{0,220}row[\s\S]{0,220}grid[\s\S]{0,220}choices[\s\S]{0,220}divider/i);
    assert.match(source, /div-like|HTML div|container|section block|封裝|分層/i);
    assert.match(source, /Theme V3[\s\S]{0,260}(tone|color|palette|色|顏色)/i);
    assert.match(source, /extension_enable[\s\S]{0,160}layout|layout[\s\S]{0,160}extension_enable/i);
  }
});

test('Moonloom teaches choices as the XMLV3 action button group instead of left-heavy button piles', async () => {
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');
  const presentation = await readFile('references/presentation-design.md', 'utf8');
  const cardWriterMcp = await readFile('references/card-writer-mcp.md', 'utf8');
  const presentationSkill = await readFile('skills/lunatalk-presentation-director/SKILL.md', 'utf8');
  const cardAuthor = await readFile('skills/lunatalk-card-author/SKILL.md', 'utf8');

  for (const source of [themeRendering, presentation, cardWriterMcp, presentationSkill, cardAuthor]) {
    assert.match(source, /<choices[\s\S]{0,120}cols=/i);
    assert.match(source, /2-4|several short|短 action|短行動|短按鈕|short action/i);
    assert.match(source, /left-heavy|left-aligned|左側|左對齊|vertical stack|單列|垂直/i);
    assert.match(source, /tone[\s\S]{0,180}(Theme V3|hook|semantic|語義)/i);
    assert.match(source, /fallback|readable|可讀/i);
  }
});

test('Moonloom rejects arbitrary XML style/class while allowing theme-bound layout tones', async () => {
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');
  const presentation = await readFile('references/presentation-design.md', 'utf8');
  const presentationSkill = await readFile('skills/lunatalk-presentation-director/SKILL.md', 'utf8');

  for (const source of [themeRendering, presentation, presentationSkill]) {
    assert.match(source, /do not|不要|avoid|禁止/i);
    assert.match(source, /raw style|style\/class|arbitrary CSS|任意 CSS|自定義 style/i);
    assert.match(source, /tone|variant|panel tone|Theme V3 token|theme-bound/i);
    assert.match(source, /fallback|readable XMLV3 prose|可讀/i);
  }
});
