import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('benchmark runner defines a structured benchmark report packet', async () => {
  const skill = await readFile('skills/lunatalk-benchmark-runner/SKILL.md', 'utf8');

  assert.match(skill, /description: Use when.*benchmark handoff reports/i);
  assert.match(skill, /description: Use when.*Benchmark report packet/i);
  assert.match(skill, /Benchmark report packet:/);
  for (const field of [
    '- benchmark scope:',
    '- synthetic briefs tested:',
    '- positive cases:',
    '- negative cases:',
    '- Moonloom self-review result:',
    '- MCP technical status:',
    '- render status:',
    '- simulation status:',
    '- acceptance evidence status:',
    '- tokenBudget findings:',
    '- weakest Moonloom dimensions:',
    '- patch loop count:',
    '- cost stance:',
    '- regression classification:',
    '- next Moonloom skill repairs:',
    '- prompt or skill changes needed:',
    '- do not turn into MCP gates:',
    '- handoff:',
  ]) {
    assert.match(skill, new RegExp(field.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('benchmark runner evals cover report packet handoff after regression runs', async () => {
  const evals = await readFile('skills/lunatalk-benchmark-runner/evals/evals.json', 'utf8');

  assert.match(evals, /Benchmark report packet/);
  assert.match(evals, /positive cases/i);
  assert.match(evals, /negative cases/i);
  assert.match(evals, /next Moonloom skill repairs/i);
  assert.match(evals, /do not turn into MCP gates/i);
  assert.match(evals, /validate:acceptance/i);
});
