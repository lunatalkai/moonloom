import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Moonloom separates platform XMLV3 guide from role-specific format contract', async () => {
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');
  const presentation = await readFile('references/presentation-design.md', 'utf8');
  const tokenEconomy = await readFile('references/token-economy.md', 'utf8');
  const fieldFinalization = await readFile('references/field-finalization.md', 'utf8');
  const cardWriterMcp = await readFile('references/card-writer-mcp.md', 'utf8');
  const presentationSkill = await readFile('skills/lunatalk-presentation-director/SKILL.md', 'utf8');
  const cardAuthor = await readFile('skills/lunatalk-card-author/SKILL.md', 'utf8');

  for (const source of [themeRendering, presentation, tokenEconomy, fieldFinalization, cardWriterMcp, presentationSkill, cardAuthor]) {
    assert.match(source, /server.*XMLV3|XMLV3.*server|platform.*XMLV3/i);
    assert.match(source, /roleDetailDesc[\s\S]{0,260}(card-specific|本卡|role-specific|角色級)/i);
    assert.match(source, /do not|不要|not.*paste|不.*複製/i);
  }
});

test('Moonloom keeps XMLV3 evolution on one compatible extension target', async () => {
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');
  const presentation = await readFile('references/presentation-design.md', 'utf8');

  for (const source of [themeRendering, presentation]) {
    assert.match(source, /compatible XMLV3 extension|XMLV3 compatible extension|兼容.*XMLV3/i);
    assert.match(source, /no XMLV4|不要.*XMLV4|not.*XMLV4/i);
    assert.match(source, /fallback|向後相容|backward compatible/i);
  }
});

test('Moonloom documents optional XMLV3 pack selection before HTML fallback', async () => {
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');
  const presentation = await readFile('references/presentation-design.md', 'utf8');
  const cardWriterMcp = await readFile('references/card-writer-mcp.md', 'utf8');
  const presentationSkill = await readFile('skills/lunatalk-presentation-director/SKILL.md', 'utf8');

  for (const source of [themeRendering, presentation, cardWriterMcp, presentationSkill]) {
    assert.match(source, /extension pack|pack/i);
    assert.match(source, /collapse|bar|tag|result-card|share-text/i);
    assert.match(source, /extension_enable|enable.*pack|pack.*enable/i);
    assert.match(source, /HTML[\s\S]{0,180}only|only[\s\S]{0,180}HTML|HTML[\s\S]{0,180}exception/i);
  }
});

test('Moonloom keeps XMLV3 scene prose separate from interactive controls', async () => {
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');
  const presentation = await readFile('references/presentation-design.md', 'utf8');
  const cardAuthor = await readFile('skills/lunatalk-card-author/SKILL.md', 'utf8');

  for (const source of [themeRendering, presentation, cardAuthor]) {
    assert.match(source, /<\/scene>[\s\S]{0,220}(choice|form|result-card|bar|collapse|controls|控件|互動)/i);
    assert.match(source, /do not|不要|avoid|避免/i);
    assert.match(source, /wrap|nest|包|嵌套|塞進/i);
  }
});
