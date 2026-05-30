import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { validateRepository } from '../scripts/validate-moonloom.mjs';

async function writeJson(filePath, value) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

async function createFixture() {
  const root = await mkdtemp(path.join(tmpdir(), 'moonloom-validate-'));

  await writeJson(path.join(root, 'package.json'), { name: 'fixture', version: '0.1.0' });
  await writeJson(path.join(root, '.codex-plugin/plugin.json'), { name: 'fixture', version: '0.1.0' });
  await writeJson(path.join(root, '.claude-plugin/plugin.json'), { name: 'fixture', version: '0.1.0' });
  await writeJson(path.join(root, '.claude-plugin/marketplace.json'), {
    name: 'fixture-marketplace',
    plugins: [{ name: 'fixture', version: '0.1.0' }],
  });
  await writeJson(path.join(root, '.cursor-plugin/plugin.json'), { name: 'fixture', version: '0.1.0' });
  await writeJson(path.join(root, '.mcp.json'), { name: 'fixture' });

  await writeFile(path.join(root, 'README.md'), '# Fixture\n', 'utf8');
  await mkdir(path.join(root, 'references'), { recursive: true });
  await writeFile(path.join(root, 'references', 'demo.md'), '# Demo\n', 'utf8');

  return root;
}

async function addSkill(root, name, skillBody, evals) {
  const skillRoot = path.join(root, 'skills', name);
  await mkdir(path.join(skillRoot, 'evals'), { recursive: true });
  await writeFile(path.join(skillRoot, 'SKILL.md'), skillBody, 'utf8');
  await writeJson(path.join(skillRoot, 'evals', 'evals.json'), { evals });
}

test('validates a complete public Moonloom skill fixture', async () => {
  const root = await createFixture();

  await addSkill(
    root,
    'demo-skill',
    `---\nname: demo-skill\ndescription: Use when checking a minimal fixture.\n---\n\n# Demo\n\nRead ../../references/demo.md when needed.\n`,
    [
      {
        prompt: 'Route this fixture.',
        expected_output: 'Uses the demo skill.',
        expectations: ['Mentions the demo skill.'],
      },
    ],
  );

  const result = await validateRepository(root);

  assert.deepEqual(result.issues, []);
  assert.equal(result.summary.skills, 1);
  assert.equal(result.summary.evalFiles, 1);
  assert.equal(result.summary.evalCases, 1);
});

test('reports missing metadata, evals, broken references, and leaked tokens', async () => {
  const root = await createFixture();
  const fakeToken = '123456789012345678901234';

  await mkdir(path.join(root, 'skills', 'broken-skill'), { recursive: true });
  await writeFile(
    path.join(root, 'skills', 'broken-skill', 'SKILL.md'),
    `---\nname: broken-skill\n---\n\n# Broken\n\nRead ../../references/missing.md.\n\nAuthorization: Bearer ${fakeToken}\n`,
    'utf8',
  );

  const result = await validateRepository(root);
  const codes = result.issues.map((issue) => issue.code);

  assert.ok(codes.includes('skill.frontmatter.description'));
  assert.ok(codes.includes('skill.evals.missing'));
  assert.ok(codes.includes('skill.reference.missing'));
  assert.ok(codes.includes('release.secret_pattern'));
});

test('requires each eval case to declare expectations', async () => {
  const root = await createFixture();

  await addSkill(
    root,
    'thin-eval-skill',
    `---\nname: thin-eval-skill\ndescription: Use when checking eval shape.\n---\n\n# Thin Eval\n`,
    [
      {
        prompt: 'Route this fixture.',
        expected_output: 'Uses the thin eval skill.',
      },
    ],
  );

  const result = await validateRepository(root);
  const codes = result.issues.map((issue) => issue.code);

  assert.ok(codes.includes('skill.evals.expectations'));
});

test('requires skill descriptions to be trigger-only and concise', async () => {
  const root = await createFixture();

  await addSkill(
    root,
    'bad-description-skill',
    `---\nname: bad-description-skill\ndescription: This skill summarizes a workflow instead of naming when it should trigger.\n---\n\n# Bad Description\n`,
    [
      {
        prompt: 'Route this fixture.',
        expected_output: 'Uses the bad description skill.',
        expectations: ['Mentions the bad description skill.'],
      },
    ],
  );

  await addSkill(
    root,
    'long-description-skill',
    `---\nname: long-description-skill\ndescription: Use when ${'a'.repeat(501)}\n---\n\n# Long Description\n`,
    [
      {
        prompt: 'Route this fixture.',
        expected_output: 'Uses the long description skill.',
        expectations: ['Mentions the long description skill.'],
      },
    ],
  );

  const result = await validateRepository(root);
  const codes = result.issues.map((issue) => issue.code);

  assert.ok(codes.includes('skill.frontmatter.description_trigger'));
  assert.ok(codes.includes('skill.frontmatter.description_too_long'));
});

test('blocks public-source claims about protected data origins', async () => {
  const root = await createFixture();
  const trainingClaim = [
    'Moonloom was trained on',
    ['production', 'data'].join(' '),
    'and derived from',
    ['real', 'user', 'behavior'].join(' '),
    '.',
  ].join(' ');
  const internalClaim = [
    'The framework cites an',
    ['internal', 'database'].join(' '),
    'as a source.',
  ].join(' ');

  await writeFile(path.join(root, 'README.md'), `# Fixture\n\n${trainingClaim}\n${internalClaim}\n`, 'utf8');
  await addSkill(
    root,
    'safe-skill',
    `---\nname: safe-skill\ndescription: Use when checking protected public-source claims.\n---\n\n# Safe Skill\n`,
    [
      {
        prompt: 'Route this fixture.',
        expected_output: 'Uses the safe skill.',
        expectations: ['Mentions the safe skill.'],
      },
    ],
  );

  const result = await validateRepository(root);
  const codes = result.issues.map((issue) => issue.code);

  assert.ok(codes.includes('release.forbidden_public_claim'));
});

test('blocks concrete identifiers, SQL snippets, and internal URLs in public files', async () => {
  const root = await createFixture();
  const concreteRoleId = '123e4567-e89b-12d3-a456-426614174000';
  const sqlSnippet = 'SELECT role_name FROM character_role WHERE id = 1;';
  const localUrl = 'http://localhost:8888/mcp/card-writer';

  await writeFile(
    path.join(root, 'README.md'),
    ['# Fixture', concreteRoleId, sqlSnippet, localUrl].join('\n'),
    'utf8',
  );
  await addSkill(
    root,
    'safe-skill',
    `---\nname: safe-skill\ndescription: Use when checking release safety scanning.\n---\n\n# Safe Skill\n`,
    [
      {
        prompt: 'Route this fixture.',
        expected_output: 'Uses the safe skill.',
        expectations: ['Mentions the safe skill.'],
      },
    ],
  );

  const result = await validateRepository(root);
  const codes = result.issues.map((item) => item.code);

  assert.ok(codes.includes('release.concrete_identifier'));
  assert.ok(codes.includes('release.sql_snippet'));
  assert.ok(codes.includes('release.internal_url'));
});

test('fails release validation when public plugin manifest versions drift', async () => {
  const root = await createFixture();

  await writeJson(path.join(root, '.claude-plugin/marketplace.json'), {
    name: 'fixture-marketplace',
    plugins: [{ name: 'fixture', version: '0.0.9' }],
  });
  await addSkill(
    root,
    'safe-skill',
    `---\nname: safe-skill\ndescription: Use when checking release version consistency.\n---\n\n# Safe Skill\n`,
    [
      {
        prompt: 'Route this fixture.',
        expected_output: 'Uses the safe skill.',
        expectations: ['Mentions the safe skill.'],
      },
    ],
  );

  const result = await validateRepository(root);
  const codes = result.issues.map((item) => item.code);

  assert.ok(codes.includes('release.version_mismatch'));
});
