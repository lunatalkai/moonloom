import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('premise workshop includes an audience-legibility anti-abstract gate', async () => {
  const reference = await readFile('references/premise-workshop.md', 'utf8');
  const skill = await readFile('skills/lunatalk-premise-workshop/SKILL.md', 'utf8');
  const evals = await readFile('skills/lunatalk-premise-workshop/evals/evals.json', 'utf8');

  for (const source of [reference, skill]) {
    assert.match(source, /five-second legibility|five-second test/i);
    assert.match(source, /recognizable (?:shelf|contract)/i);
    assert.match(source, /human-scale first scene/i);
    assert.match(source, /concrete player role|player position/i);
    assert.match(source, /novelty overlay|novelty layer/i);
    assert.match(source, /abstract/i);
  }

  assert.match(skill, /benchmark-pattern-calibration\.md/);
  assert.match(skill, /confusing|unreadable/i);
  assert.match(skill, /Self-review:[\s\S]*five-second legibility passed/i);
  assert.match(skill, /Self-review:[\s\S]*recognizable shelf before novelty/i);
  assert.match(evals, /too abstract/i);
  assert.match(evals, /audience-legible pitch/i);
});

test('benchmark calibration records public-safe premise shape without private source leakage', async () => {
  const reference = await readFile('references/benchmark-pattern-calibration.md', 'utf8');

  for (const phrase of [
    'Strong premises are usually legible before they are original',
    'academy / school entry',
    'survival problem',
    'workplace duty',
    'investigation',
    'simulator',
    'concrete player position',
    'human-scale first action',
    'poetic or abstract premise',
  ]) {
    assert.match(reference, new RegExp(phrase, 'i'), `missing phrase: ${phrase}`);
  }

  assert.doesNotMatch(reference, /\bSELECT\b[\s\S]{0,160}\bFROM\b/i);
  assert.doesNotMatch(reference, /\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/i);
  assert.doesNotMatch(reference, /production data|trained on|training data|view count|author id|schema/i);
});
