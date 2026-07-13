import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

// A theme is a coherent, tasteful STYLING of the story-reading experience
// (scene / narration / dialogue / inner-monologue / speaker + at most a tasteful
// info card and restrained meters) — NOT a kitchen-sink demo of every game
// mechanic (dice / DC / combat / turns / rewards / items / fortune /
// score-sharing) crammed into one palette. The engine loads these Moonloom
// files directly, so the theme-quality paradigm, the anti-kitchen-sink rule, the
// visual standards, and the anti-homogenization tests must live here in the
// files the theme workflow actually reads.

test('theme-v3-rendering documents the good-theme paradigm and anti-kitchen-sink rule', async () => {
  const ref = await readFile('references/theme-v3-rendering.md', 'utf8');

  // A good theme is a coherent styling of the reading experience.
  assert.match(ref, /coherent[\s\S]{0,80}styling[\s\S]{0,120}reading/i,
    'must describe a good theme as coherent styling of the reading experience');

  // The explicit anti-pattern: a kitchen-sink dump of every mechanic.
  assert.match(ref, /kitchen-sink/i, 'must name the kitchen-sink anti-pattern');
  assert.match(ref, /dice/i, 'must call out mechanic components like dice');
  assert.match(ref, /combat/i, 'must call out mechanic components like combat');
  assert.match(ref, /restraint over completeness/i,
    'must state restraint over completeness');

  // Visual standards: hierarchy via whitespace/weight not boxes; narration muted
  // vs dialogue brighter with a speaker nameplate; one accent.
  assert.match(ref, /whitespace|white space/i, 'visual standard: hierarchy via whitespace');
  assert.match(ref, /boxes|bordered box/i, 'visual standard: not boxes-on-boxes');
  assert.match(ref, /nameplate/i, 'visual standard: dialogue speaker nameplate');
  assert.match(ref, /mainstream plus one accent|one accent|single .*accent/i,
    'visual standard: mainstream plus one accent');

  // Anti-homogenization: mechanism vs signature layer + the two tests.
  assert.match(ref, /mechanism layer/i, 'anti-homogenization: mechanism layer');
  assert.match(ref, /signature layer/i, 'anti-homogenization: signature layer');
  assert.match(ref, /genre-noun test/i, 'anti-homogenization: genre-noun test');
  assert.match(ref, /grayscale|greyscale|silhouette/i,
    'anti-homogenization: grayscale silhouette test');
});

test('presentation-design frames theme sessions around visual-design questions', async () => {
  const ref = await readFile('references/presentation-design.md', 'utf8');
  assert.match(ref, /theme[- ]creation session|theme session/i,
    'must address theme-creation sessions');
  assert.match(ref, /palette|mood/i, 'theme session asks about palette/mood');
  assert.match(ref, /not.*card[- ]premise|do not ask.*premise|premise questions/i,
    'must say a theme session does not ask card-premise questions');
  assert.match(ref, /kitchen-sink|restraint over completeness/i,
    'must carry the anti-kitchen-sink stance');
});

test('presentation-director skill carries the theme-quality rules', async () => {
  const skill = await readFile('skills/lunatalk-presentation-director/SKILL.md', 'utf8');
  assert.match(skill, /kitchen-sink/i, 'skill must forbid kitchen-sink themes');
  assert.match(skill, /restraint over completeness/i, 'skill must state restraint over completeness');
  assert.match(skill, /visual[- ]design questions|palette\/mood|palette and mood/i,
    'skill must say theme sessions ask visual-design questions');
  assert.match(skill, /theme-v3-rendering\.md/,
    'skill must point to theme-v3-rendering.md theme-quality guidance');
});

test('router routes a theme-creation goal to visual/presentation, not premise workshop', async () => {
  const router = await readFile('skills/using-moonloom/SKILL.md', 'utf8');
  // A dedicated theme-creation routing line.
  assert.match(router, /visual theme|Theme V3.*goal|creating.*theme|theme goal/i,
    'router must have a theme-creation routing line');
  assert.match(router, /lunatalk-presentation-director/,
    'theme-creation routes to presentation-director');
  assert.match(router, /do not.*premise|not.*premise-workshop|not ask.*premise/i,
    'router must steer a theme goal away from premise questions');
});
