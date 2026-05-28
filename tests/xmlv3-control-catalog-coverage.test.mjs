import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Moonloom documents the XMLV3 control catalog and good-use decision rules', async () => {
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');
  const presentation = await readFile('references/presentation-design.md', 'utf8');

  for (const source of [themeRendering, presentation]) {
    assert.match(source, /XMLV3 control catalog|XMLV3 控件目錄/i);
    assert.match(source, /<scene>[\s\S]{0,260}<n>[\s\S]{0,260}<d>[\s\S]{0,260}<quote>/i);
    assert.match(source, /<panel>[\s\S]{0,260}<stack>[\s\S]{0,260}<grid>[\s\S]{0,260}<field>/i);
    assert.match(source, /<choices>[\s\S]{0,260}<choice>/i);
    assert.match(source, /<form>[\s\S]{0,260}<input>[\s\S]{0,260}<radio>[\s\S]{0,260}<checkbox>/i);
    assert.match(source, /<bar>[\s\S]{0,220}continuous|continuous[\s\S]{0,220}<bar>|連續數值[\s\S]{0,220}<bar>/i);
    assert.match(source, /<collapse>[\s\S]{0,260}<tag>[\s\S]{0,260}<result-card>[\s\S]{0,260}<share-text>/i);
    assert.match(source, /mobile-first|手機優先/i);
    assert.match(source, /line-height|行高/i);
    assert.match(source, /4\.5:1|contrast/i);
    assert.match(source, /roleDetailDesc[\s\S]{0,260}(when this card should use controls|何時使用哪些控件|何時用哪些控件)/i);
  }
});

test('Moonloom documents XMLV3 control parameters and recommended situations', async () => {
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');
  const presentation = await readFile('references/presentation-design.md', 'utf8');

  for (const source of [themeRendering, presentation]) {
    assert.match(source, /Control parameter reference|控件參數|控件参数/i);
    assert.match(source, /scene:[\s\S]{0,120}mood\/location\/time/i);
    assert.match(source, /choice:[\s\S]{0,160}send\/tone\/variant\/width\/align\/span/i);
    assert.match(source, /state:[\s\S]{0,160}scene\/status\/relationships/i);
    assert.match(source, /form:[\s\S]{0,120}btn\/submit-label/i);
    assert.match(source, /input:[\s\S]{0,160}name\/label\/placeholder\/value\/type/i);
    assert.match(source, /radio\/checkbox:[\s\S]{0,160}name\/label\/options/i);
    assert.match(source, /panel:[\s\S]{0,160}title\/subtitle\/tone\/variant/i);
    assert.match(source, /field:[\s\S]{0,140}label\/value\/tone/i);
    assert.match(source, /choices:[\s\S]{0,140}cols\/gap\/align\/variant/i);
    assert.match(source, /bar:[\s\S]{0,140}label\/value\/max\/color/i);
    assert.match(source, /roll:[\s\S]{0,160}dice\/skill\/dc\/result\/total\/success/i);
    assert.match(source, /cg:[\s\S]{0,180}prompt\/style\/seq\/url\/status\/width\/height/i);
    assert.match(source, /When to use|推薦使用|推荐使用/i);
  }
});
