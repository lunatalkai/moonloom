import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

// A strong LunaTalk theme is RICH and genre-coherent: it dresses the story in a
// coherent set of in-world custom XMLV3 components (an identity header, a
// three-stat pulling status, a timeline, a collection grid, cost/risk choices)
// and carries at least two SIGNATURE narrative objects unique to that genre.
// The two failure modes are a BARE RESKIN (only recolored base tags, zero custom
// components) and a GENERIC kitchen-sink (ungenred dice/DC/combat widgets that
// could belong to any game). The fix for the latter is genre-coherence, NOT
// fewer components. Each component also declares emit-timing / cadence
// discipline. The engine loads these Moonloom files directly, so the paradigm
// must live in the files the theme workflow actually reads.

test('theme-v3-rendering teaches the rich mechanism+signature theme paradigm', async () => {
  const ref = await readFile('references/theme-v3-rendering.md', 'utf8');

  // A good theme is RICH, not a palette swap.
  assert.match(ref, /rich/i, 'must frame a strong theme as rich');
  assert.match(ref, /genre[- ]coheren/i, 'must require genre-coherence');

  // The full component set the paradigm targets.
  assert.match(ref, /identity (header|card)/i, 'must name the identity header component');
  assert.match(ref, /three[- ]stat|three stats/i, 'must name the three-stat status');
  assert.match(ref, /pull(ing|s)? against|pull against each other|mutually[- ]pull/i,
    'the three stats must PULL against each other (tension)');
  assert.match(ref, /timeline/i, 'must name the timeline component');
  assert.match(ref, /collection grid/i, 'must name the collection grid component');
  assert.match(ref, /cost/i, 'choices must carry a cost');
  assert.match(ref, /risk/i, 'choices must carry a risk');

  // The soul: at least two signature narrative objects.
  assert.match(ref, /signature/i, 'must require signature components');
  assert.match(ref, /at least two|two or more|≥\s*2|≥two/i,
    'must require at least two signature objects');
  assert.match(ref, /narrative object/i, 'signatures are narrative objects, not dashboards');

  // Emit-timing / cadence discipline.
  assert.match(ref, /emit[- ]tim|cadence|every action|on milestone|milestone/i,
    'must teach emit-timing / cadence discipline');

  // Study real exemplars at runtime instead of copying them into the doc.
  assert.match(ref, /theme_list_available/, 'must point to theme_list_available');
  assert.match(ref, /includeOfficial/i, 'must tell the agent to include official themes');

  // Both failure modes are named.
  assert.match(ref, /bare reskin|reskin/i, 'must name the bare-reskin failure mode');
  assert.match(ref, /kitchen-sink/i, 'must still name the generic kitchen-sink failure mode');
  assert.match(ref, /ungenred|generic|could belong to any/i,
    'kitchen-sink is redefined as GENERIC/ungenred, not "too many components"');

  // Visual standards survive.
  assert.match(ref, /whitespace|white space/i, 'visual standard: hierarchy via whitespace');
  assert.match(ref, /nameplate/i, 'visual standard: dialogue speaker nameplate');
  assert.match(ref, /one accent|single .*accent|mainstream plus one/i,
    'visual standard: one accent');

  // Anti-homogenization mechanism/signature layers + the two tests survive.
  assert.match(ref, /mechanism layer/i, 'anti-homogenization: mechanism layer');
  assert.match(ref, /signature layer/i, 'anti-homogenization: signature layer');
  assert.match(ref, /genre-noun test/i, 'anti-homogenization: genre-noun test');
  assert.match(ref, /grayscale|greyscale|silhouette/i,
    'anti-homogenization: grayscale silhouette test');

  // The reversed over-correction language must be GONE.
  assert.doesNotMatch(ref, /restraint over completeness/i,
    'must NOT keep the reversed "restraint over completeness" language');
  assert.doesNotMatch(ref, /at most one tasteful (character\/status )?info card/i,
    'must NOT cap the theme at one info card');
  assert.doesNotMatch(ref, /reading immersion is the product/i,
    'must NOT frame the theme as merely a reading flow with no widgets');
  assert.doesNotMatch(ref, /need zero combat|zero combat \/ dice/i,
    'must NOT tell authors most themes need zero mechanics');
});

test('presentation-design frames theme sessions as visual-design + rich paradigm', async () => {
  const ref = await readFile('references/presentation-design.md', 'utf8');
  assert.match(ref, /theme[- ]creation session|theme session/i,
    'must address theme-creation sessions');
  assert.match(ref, /palette|mood/i, 'theme session asks about palette/mood');
  assert.match(ref, /not.*card[- ]premise|do not ask.*premise|premise questions/i,
    'must say a theme session does not ask card-premise questions');
  assert.match(ref, /rich|signature|genre[- ]coheren/i,
    'must carry the rich genre-coherent + signature stance');
  assert.doesNotMatch(ref, /restraint over completeness/i,
    'must NOT carry the reversed anti-mechanics language');
});

test('presentation-director skill carries the rich theme paradigm', async () => {
  const skill = await readFile('skills/lunatalk-presentation-director/SKILL.md', 'utf8');
  assert.match(skill, /rich|signature|genre[- ]coheren/i,
    'skill must teach rich genre-coherent + signature themes');
  assert.match(skill, /visual[- ]design questions|palette\/mood|palette and mood/i,
    'skill must say theme sessions ask visual-design questions');
  assert.match(skill, /theme-v3-rendering\.md/,
    'skill must point to theme-v3-rendering.md theme-quality guidance');
  assert.match(skill, /template[\s\S]{0,200}example|template \+ example/i,
    'skill must say each component ships a template + example, not a shell');
  assert.doesNotMatch(skill, /restraint over completeness/i,
    'skill must NOT keep the reversed anti-mechanics language');
});

test('theme-v3-rendering requires template + example, not hollow shells', async () => {
  const ref = await readFile('references/theme-v3-rendering.md', 'utf8');

  // An extends-only declaration renders as a flat box.
  assert.match(ref, /flat (colou?red )?box/i,
    'must warn that an extends-only component renders as a flat box');

  // template is REQUIRED for structural components.
  assert.match(ref, /MUST declare a `?template`?|template[^.]{0,40}(required|must)/i,
    'must require a template for structural components');

  // example is part of the declaration contract and powers the preview.
  assert.match(ref, /editor preview|degraded render|preview[^.]{0,40}depend/i,
    'must explain example powers the editor preview / degraded render');

  // officialComponents must be declared or the theme is legacy.
  assert.match(ref, /officialComponents/, 'must require officialComponents');
  assert.match(ref, /legacy|generic (universal )?sample|universal.*sample/i,
    'must explain no officialComponents -> legacy generic fallback');

  // The complete illustrative component carries a real meter template.
  assert.match(ref, /"template":/, 'illustrative JSON must include a template field');
  assert.match(ref, /"example":/, 'illustrative JSON must include an example field');
  assert.match(ref, /track[\s\S]{0,200}fill/i,
    'meter template must show track + fill bar structure');
  assert.match(ref, /\{[a-z]+\}%/i,
    'meter fill must bind a width percentage from an attribute placeholder');

  // The old hollow hp-bar shell must be gone.
  assert.doesNotMatch(ref,
    /\{\s*"tag":\s*"hp-bar",\s*"extends":\s*"card",\s*"name":\s*"HP bar"\s*\}/,
    'the hollow hp-bar shell must be replaced with a complete component');

  // The paradigm section ties richness to template+example.
  assert.match(ref, /only real when it ships/i,
    'paradigm must state a component is real only with template + example');
});

test('theme-v3-rendering teaches the vertical-stack meter layout (no collapsed bars)', async () => {
  const ref = await readFile('references/theme-v3-rendering.md', 'utf8');

  // A meter track must sit on its own full-width row inside a vertical stack.
  assert.match(ref, /own full-width row/i,
    'meter track must sit on its own full-width row');
  assert.match(ref, /vertical stack|stack vertically/i,
    'meter rows stack vertically');

  // Forbid the label+track-in-one-horizontal-flex anti-pattern.
  assert.match(ref, /same horizontal\s+flex\s+row/i,
    'must name the horizontal-flex anti-pattern');
  assert.match(ref, /steals the width|collapses? to (nothing|zero)/i,
    'must explain the label steals width and the bar collapses');

  // The synthetic template must use a label+value row (justify between),
  // not a weight-bearing label glued to the track in one horizontal flex.
  assert.match(ref, /justify=\\?"?between/i,
    'meter label row uses justify=between');
  assert.doesNotMatch(ref, /weight=\\?"1\\?">[^<]{0,6}<\/text><view tone=\\?"track/i,
    'template must not glue a weight-bearing label directly before the track');
});

test('theme-v3-rendering teaches styling custom components via the component css field', async () => {
  const ref = await readFile('references/theme-v3-rendering.md', 'utf8');

  // Custom components render as .lt-cmp-<tag>, styled from the component's own css.
  assert.match(ref, /\.lt-cmp-/i, 'must name the .lt-cmp-<tag> class');
  assert.match(ref, /component'?s own `?css`? field|component `?css`? field|components\[\]\.css/i,
    'must say to style internals in the component css field, not the theme global css');
  assert.match(ref, /:host/, 'must document :host -> component root');
  assert.match(ref, /part\(/i, 'must document part() scoping');

  // The .lt-scene trap: custom components are siblings, not inside .lt-scene.
  assert.match(ref, /never style custom-component internals/i,
    'must forbid styling custom-component internals from the theme global css');
  assert.match(ref, /wraps only the/i,
    'must explain .lt-scene wraps only the scene tag');

  // Tokens on :root, not on .lt-scene.
  assert.match(ref, /tokens on[\s\S]{0,3}:root/i,
    'must put --lt-* design tokens on :root, not .lt-scene');

  // The bond-meter example must be complete: css field with part(track)/part(fill)
  // and the template must mark the bar elements with part.
  assert.match(ref, /"css":/, 'bond-meter example must include a css field');
  assert.match(ref, /part\(track\)[\s\S]{0,160}part\(fill\)/i,
    'example css must style part(track) and part(fill)');
  assert.match(ref, /part=\\?"track"/i, 'template must mark part="track" on the bar rail');
  assert.match(ref, /part=\\?"fill"/i, 'template must mark part="fill" on the bar fill');
});

test('theme-v3-rendering requires example + defaults to cover every template placeholder', async () => {
  const ref = await readFile('references/theme-v3-rendering.md', 'utf8');

  // The firm rule: example must supply a value for every {placeholder}, or the
  // literal {placeholder} shows on screen; defaults must cover them too.
  assert.match(ref, /every `?\{placeholder\}`?|every placeholder|each `?\{placeholder\}`?/i,
    'must require covering every placeholder');
  assert.match(ref, /literal `?\{[^}]*\}`? (text|on screen|on-screen)|shows (up )?(on screen )?as literal/i,
    'must warn an omitted placeholder renders as literal text');
  assert.match(ref, /defaults[\s\S]{0,80}(every|each) placeholder|defaults[\s\S]{0,80}cover/i,
    'must say defaults should cover every placeholder for live turns');

  // The synthetic bond-meter must itself be leak-free: defaults cover delta+hint.
  const block = ref.slice(ref.indexOf('"tag": "bond-meter"'));
  const defaults = block.match(/"defaults":\s*\{[^}]*\}/);
  assert.ok(defaults, 'bond-meter must declare defaults');
  for (const ph of ['warmth', 'trust', 'doubt', 'delta', 'hint']) {
    assert.match(defaults[0], new RegExp(`"${ph}"`),
      `bond-meter defaults must cover the {${ph}} placeholder`);
  }
});

test('router routes a theme-creation goal to visual/presentation, not premise workshop', async () => {
  const router = await readFile('skills/using-moonloom/SKILL.md', 'utf8');
  assert.match(router, /visual theme|Theme V3.*goal|creating.*theme|theme goal/i,
    'router must have a theme-creation routing line');
  assert.match(router, /lunatalk-presentation-director/,
    'theme-creation routes to presentation-director');
  assert.match(router, /do not.*premise|not.*premise-workshop|not ask.*premise/i,
    'router must steer a theme goal away from premise questions');
  assert.doesNotMatch(router, /kitchen-sink dump of every mechanic component/i,
    'router must NOT reduce a theme to an anti-mechanics slogan');
});
