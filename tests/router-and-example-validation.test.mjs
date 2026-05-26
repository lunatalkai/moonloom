import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { validateRepository } from '../scripts/validate-moonloom.mjs';

async function writeJson(filePath, value) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

async function createFixture() {
  const root = await mkdtemp(path.join(tmpdir(), 'moonloom-router-'));

  for (const filePath of [
    '.codex-plugin/plugin.json',
    '.claude-plugin/plugin.json',
    '.cursor-plugin/plugin.json',
    '.mcp.json',
  ]) {
    await writeJson(path.join(root, filePath), { name: 'fixture' });
  }

  await writeFile(path.join(root, 'README.md'), '# Fixture\n', 'utf8');
  await mkdir(path.join(root, 'references'), { recursive: true });
  await writeFile(path.join(root, 'references', 'demo.md'), '# Demo\n', 'utf8');

  return root;
}

async function addSkill(root, name, skillBody) {
  const skillRoot = path.join(root, 'skills', name);
  await mkdir(path.join(skillRoot, 'evals'), { recursive: true });
  await writeFile(path.join(skillRoot, 'SKILL.md'), skillBody, 'utf8');
  await writeJson(path.join(skillRoot, 'evals', 'evals.json'), {
    evals: [
      {
        prompt: 'Route this fixture.',
        expected_output: `Uses ${name}.`,
        expectations: [`Mentions ${name}.`],
      },
    ],
  });
}

test('using-moonloom defines a router packet before narrower work', async () => {
  const skill = await readFile('skills/using-moonloom/SKILL.md', 'utf8');

  assert.match(skill, /Router packet:/);
  assert.match(skill, /- intent:/);
  assert.match(skill, /- route:/);
  assert.match(skill, /- mode:/);
  assert.match(skill, /- next skill:/);
  assert.match(skill, /- references to load:/);
  assert.match(skill, /- do not do yet:/);
  assert.match(skill, /- handoff:/);
});

test('using-moonloom evals cover explicit router packet output', async () => {
  const evals = await readFile('skills/using-moonloom/evals/evals.json', 'utf8');

  assert.match(evals, /Router packet/);
  assert.match(evals, /route, mode, next skill, references to load, do not do yet, and handoff/i);
});

test('using-moonloom preserves benchmark report packet handoff', async () => {
  const skill = await readFile('skills/using-moonloom/SKILL.md', 'utf8');
  const evals = await readFile('skills/using-moonloom/evals/evals.json', 'utf8');

  assert.match(skill, /description: Use when.*benchmark handoff reports/i);
  assert.match(skill, /description: Use when.*Benchmark report packet/i);
  assert.match(skill, /lunatalk-benchmark-runner/);
  assert.match(skill, /Benchmark report packet/);
  assert.match(evals, /Benchmark report packet/);
  assert.match(evals, /benchmark handoff report/i);
});

test('validator reports missing root examples referenced by skills', async () => {
  const root = await createFixture();

  await addSkill(
    root,
    'example-link-skill',
    `---\nname: example-link-skill\ndescription: Use when checking root example links.\n---\n\n# Example Link\n\nRead ../../references/demo.md and ../../examples/missing.md when needed.\n`,
  );

  const result = await validateRepository(root);
  const issues = result.issues.filter((issue) => issue.code === 'skill.reference.missing');

  assert.equal(issues.length, 1);
  assert.equal(issues[0].file, 'skills/example-link-skill/SKILL.md');
  assert.match(issues[0].message, /examples\/missing\.md/);
});
