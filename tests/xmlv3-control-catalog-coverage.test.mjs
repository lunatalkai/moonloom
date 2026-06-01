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

test('Moonloom documents XMLV3 Feature Level 3 primitives and custom component theming', async () => {
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');
  const presentation = await readFile('references/presentation-design.md', 'utf8');

  for (const source of [themeRendering, presentation]) {
    assert.match(source, /Feature Level 3|FL3/i);
    assert.match(source, /<linear-layout>[\s\S]{0,220}<flex-layout>[\s\S]{0,220}<grid-layout>/i);
    assert.match(source, /<view>[\s\S]{0,260}<container>[\s\S]{0,260}<card>/i);
    assert.match(source, /<heading>[\s\S]{0,260}<paragraph>[\s\S]{0,260}<badge>[\s\S]{0,260}<notice>/i);
    assert.match(source, /<list>[\s\S]{0,260}<list-item>[\s\S]{0,260}<avatar>[\s\S]{0,260}<info-row>[\s\S]{0,260}<fact>/i);
    assert.match(source, /layout unit[\s\S]{0,180}1px[\s\S]{0,180}2rpx/i);
    assert.match(source, /tagConfig[\s\S]{0,220}xmlv3[\s\S]{0,220}components/i);
    assert.match(source, /:host[\s\S]{0,220}part\(name\)[\s\S]{0,220}part="name"/i);
    assert.match(source, /lowercase\/kebab-case|lowercase.*kebab/i);
  }
});

test('Moonloom documents every XMLV3 FL3 atom primitive as an API reference', async () => {
  const source = await readFile('references/theme-v3-rendering.md', 'utf8');

  assert.match(source, /XMLV3 FL3 Component API Reference/i);
  assert.match(source, /one-shot AI generation/i);
  assert.match(source, /Primitive Defaults/i);
  assert.match(source, /XMLV3\/FL3-only[\s\S]{0,180}do not change legacy HTML cards or `hc-\*`/i);
  assert.match(source, /primitive defaults < component defaults < XML instance attrs/i);
  assert.match(source, /`<button>` \| `padding="sm" borderRadius="pill" alignment="center" variant="soft"`/i);
  assert.match(source, /Buttons are action controls[\s\S]{0,180}centers text horizontally[\s\S]{0,120}vertically/i);
  assert.match(source, /`border-radius`\/`radius` overrides a default[\s\S]{0,80}`borderRadius`/i);
  assert.match(source, /Attribute Group[\s\S]{0,240}Attributes[\s\S]{0,240}Allowed values/i);
  assert.match(source, /Tag[\s\S]{0,80}Purpose[\s\S]{0,80}Children[\s\S]{0,80}Attributes[\s\S]{0,80}Example/i);
  assert.match(source, /height="120"[\s\S]{0,220}Desktop\/H5[\s\S]{0,220}Mobile\/uni-app/i);
  assert.match(source, /\| CommonBoxAttrs \| `width`, `height`, `padding`, `margin`, `gap`, `background`\/`bg`, `border`, `borderRadius`\/`border-radius`\/`radius`, `alignment`\/`align`, `justify`, `weight`, `row`, `column`, `span`, `part` \|/);
  assert.match(source, /Text alignment supports `start`, `left`, `center`, `end`, and `right`/i);
  assert.match(source, /`fit` accepts `cover` or `contain`/i);
  assert.match(source, /surface variants are `glass`, `solid`, `outline`, `plain`/i);
  assert.match(source, /action variants are `soft`, `solid`, `outline`, `ghost`, `glass`/i);

  const requiredContracts = [
    '| `<linear-layout>` | Row/column layout | Any XMLV3 children | `orientation`, `gap`, `alignment`, `wrap`, `weight`, `CommonBoxAttrs` |',
    '| `<flex-layout>` | Responsive flex layout | Any XMLV3 children | `orientation`, `gap`, `alignment`, `wrap`, `weight`, `CommonBoxAttrs` |',
    '| `<grid-layout>` | CSS-grid style layout | Any XMLV3 children | `columns`, `rows`, `gap`, child `row`, child `column`, child `span`, `CommonBoxAttrs` |',
    '| `<view>` | Neutral atom wrapper | Any XMLV3 children | `CommonBoxAttrs` |',
    '| `<container>` | Grouped atom wrapper | Any XMLV3 children | `CommonBoxAttrs` |',
    '| `<card>` | Card surface | Any XMLV3 children | `CommonBoxAttrs`, `tone`, `variant` |',
    '| `<text>` | Short inline label/text | Text only | `CommonTextAttrs`, `part` |',
    '| `<heading>` | Section title | Text only | `level`, `CommonTextAttrs`, `part` |',
    '| `<paragraph>` | Short paragraph | Text only | `CommonTextAttrs`, `part` |',
    '| `<image>` | Public media | No children | `src`, `alt`, `width`, `height`, `borderRadius`, `fit`, `part` |',
    '| `<button>` | Atom action button | Text/inline children | `send`, `CommonBoxAttrs`, `CommonTextAttrs`, `tone`, `variant` |',
    '| `<badge>` | Small status label | Text only | `label`, `CommonBoxAttrs`, `CommonTextAttrs`, `tone`, `variant` |',
    '| `<notice>` | Compact callout | Text/inline children | `title`, `CommonBoxAttrs`, `CommonTextAttrs`, `tone`, `variant` |',
    '| `<list>` | Short list wrapper | `<list-item>` children | `gap`, `tone`, `variant`, `part` |',
    '| `<list-item>` | One list row | Text/inline children | `label`, `value`, `tone`, `variant`, `part` |',
    '| `<avatar>` | Public thumbnail | No children | `src`, `alt`, `width`, `height`, `borderRadius`, `fit`, `part` |',
    '| `<info-row>` | Key-value row | Text/inline children | `label`, `value`, `tone`, `variant`, `part` |',
    '| `<fact>` | Compact fact | Text/inline children | `label`, `value`, `tone`, `variant`, `part` |',
  ];

  for (const contract of requiredContracts) {
    assert.match(source, new RegExp(contract.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  assert.match(source, /HC parity map|HC 對應|hc-\*/i);
  assert.match(source, /custom component[\s\S]{0,260}extends[\s\S]{0,260}atom primitive/i);
  assert.doesNotMatch(source, /plus box attrs/i);
  assert.doesNotMatch(source, /https:\/\/\.\.\./i);
  assert.doesNotMatch(source, /<list gap="xs">\.\.\.<\/list>/i);
});

test('Moonloom documents XMLV3 FL3 safe tap action contract', async () => {
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');
  const presentation = await readFile('references/presentation-design.md', 'utf8');

  for (const source of [themeRendering, presentation]) {
    assert.match(source, /tap-action="send\|fill\|copy"|tap-action.*send.*fill.*copy/i);
    assert.match(source, /tap-value[\s\S]{0,180}non-empty|non-empty[\s\S]{0,180}tap-value|tap-value[\s\S]{0,180}必填|非空[\s\S]{0,180}tap-value/i);
    assert.match(source, /aria-label[\s\S]{0,180}(visible name|可見名稱|accessible name)|visible name[\s\S]{0,180}aria-label/i);
    assert.match(source, /tap-feedback[\s\S]{0,220}copy|copy[\s\S]{0,220}tap-feedback/i);
    assert.match(source, /send[\s\S]{0,160}(directly submits|直接送出|玩家這回合)/i);
    assert.match(source, /fill[\s\S]{0,160}(pre-fills|填進 composer|填入 composer|待.*確認)/i);
    assert.match(source, /copy[\s\S]{0,180}(clipboard|剪貼板)/i);
    assert.match(source, /copy[\s\S]{0,180}(does not increment actionCount|不計入 action|不算 action)/i);
    assert.match(source, /role=button[\s\S]{0,180}tabindex=0[\s\S]{0,180}Enter\/Space/i);
    assert.match(source, /\[data-interactive\]/i);
    assert.match(source, /must not nest[\s\S]{0,220}(choice|button|tap-action)|禁止[\s\S]{0,220}(巢狀|嵌套)[\s\S]{0,220}(choice|button|tap-action)/i);
    assert.match(source, /tap-value[\s\S]{0,220}(static text|靜態文字)[\s\S]{0,220}(state|hidden|隱藏)/i);
    assert.match(source, /choices fallback|fallback choices|降級[\s\S]{0,120}choice/i);
  }
});
