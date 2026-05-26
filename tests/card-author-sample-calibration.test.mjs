import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('card author routes example and golden-sample requests through sample calibration', async () => {
  const skill = await readFile('skills/lunatalk-card-author/SKILL.md', 'utf8');

  assert.match(skill, /sample-driven-calibration\.md/);
  assert.match(skill, /sample-card-packets\.md/);
  assert.match(skill, /lunatalk-sample-calibrator/);
  assert.match(skill, /examples|golden samples|sample output packets|draft-to-sample/i);
  assert.match(skill, /before draft-only field assembly|before MCP-backed creation|before MCP calls/i);
});

test('universal authoring template preserves sample calibration packet', async () => {
  const template = await readFile('references/card-authoring-templates.md', 'utf8');

  assert.match(template, /Sample calibration packet:/);
  assert.match(template, /selected sample:/);
  assert.match(template, /structure borrowed, not text:/);
  assert.match(template, /copy-risk check:/);
  assert.match(template, /field allocation changes:/);
  assert.match(template, /simulation probes to keep:/);
});

test('card author eval covers sample calibration before final fields', async () => {
  const evals = await readFile('skills/lunatalk-card-author/evals/evals.json', 'utf8');

  assert.match(evals, /lunatalk-sample-calibrator/);
  assert.match(evals, /golden sample packet shapes|sample output packets|draft-to-sample/i);
  assert.match(evals, /does not call role_create_private|does not call MCP tools/i);
});
