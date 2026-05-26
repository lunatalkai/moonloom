import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('chat simulation defines a simulation repair packet for failed transcripts', async () => {
  const skill = await readFile('skills/lunatalk-chat-simulation/SKILL.md', 'utf8');
  const reference = await readFile('references/playtest-loop.md', 'utf8');

  for (const content of [skill, reference]) {
    assert.match(content, /Simulation repair packet:/);
    assert.match(content, /- probes run:/);
    assert.match(content, /- transcript-backed failures:/);
    assert.match(content, /- weakest Moonloom dimension:/);
    assert.match(content, /- patch target:/);
    assert.match(content, /- next Moonloom skill:/);
    assert.match(content, /- rerun stance:/);
    assert.match(content, /- cost stance:/);
  }
});

test('card author preserves simulation repair packets before patching fields', async () => {
  const skill = await readFile('skills/lunatalk-card-author/SKILL.md', 'utf8');
  const templates = await readFile('references/card-authoring-templates.md', 'utf8');

  assert.match(skill, /simulation repair/);
  assert.match(skill, /preserve.*simulation repair/i);
  assert.match(skill, /before patching fields|before field assembly|before another simulation/i);
  assert.match(templates, /Simulation repair packet:/);
});

test('chat simulation evals cover repair packet handoff before another paid run', async () => {
  const evals = await readFile('skills/lunatalk-chat-simulation/evals/evals.json', 'utf8');

  assert.match(evals, /Simulation repair packet/);
  assert.match(evals, /before another paid run|before spending another simulation/i);
  assert.match(evals, /next Moonloom skill/);
});
