import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('render review defines a render repair packet for preview failures', async () => {
  const skill = await readFile('skills/lunatalk-render-review/SKILL.md', 'utf8');
  const reference = await readFile('references/theme-v3-rendering.md', 'utf8');

  for (const content of [skill, reference]) {
    assert.match(content, /Render repair packet:/);
    assert.match(content, /- render mode:/);
    assert.match(content, /- preview evidence:/);
    assert.match(content, /- visual failures:/);
    assert.match(content, /- playability failures:/);
    assert.match(content, /- patch target:/);
    assert.match(content, /- next Moonloom skill:/);
    assert.match(content, /- rerender stance:/);
  }
});

test('card author preserves render repair packets before visual patching', async () => {
  const skill = await readFile('skills/lunatalk-card-author/SKILL.md', 'utf8');
  const templates = await readFile('references/card-authoring-templates.md', 'utf8');

  assert.match(skill, /render repair/);
  assert.match(skill, /preserve.*render repair/i);
  assert.match(skill, /before patching.*visual|before another render|before field patch/i);
  assert.match(templates, /Render repair packet:/);
});

test('render review evals cover repair packet handoff before another render pass', async () => {
  const evals = await readFile('skills/lunatalk-render-review/evals/evals.json', 'utf8');

  assert.match(evals, /Render repair packet/);
  assert.match(evals, /before another render pass|before rerendering/i);
  assert.match(evals, /next Moonloom skill/);
});
