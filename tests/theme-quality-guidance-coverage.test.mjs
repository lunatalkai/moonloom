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
  assert.doesNotMatch(skill, /restraint over completeness/i,
    'skill must NOT keep the reversed anti-mechanics language');
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
