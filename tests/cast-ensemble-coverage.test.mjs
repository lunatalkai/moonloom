import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

function section(markdown, heading) {
  const start = markdown.indexOf(heading);
  assert.notEqual(start, -1, `missing ${heading}`);
  const next = markdown.indexOf('\n### ', start + heading.length);
  return markdown.slice(start, next === -1 ? undefined : next);
}

test('Card Writer reference documents cast fields on role_get and role_create_private', async () => {
  const reference = await readFile('references/card-writer-mcp.md', 'utf8');
  const roleGet = section(reference, '### `role_get`');
  const create = section(reference, '### `role_create_private`');

  for (const field of ['castKey', 'formerNames', 'reviewState', 'persona', 'personaPublic', 'isPrimary', 'castVersion']) {
    assert.match(roleGet, new RegExp(field));
  }
  assert.match(roleGet, /castVersion: ""/);
  assert.match(create, /`cast`[\s\S]*2-8/);
  assert.match(create, /role_patch_cast/);
});

test('Card Writer reference documents role_patch_cast replace semantics and errors', async () => {
  const reference = await readFile('references/card-writer-mcp.md', 'utf8');
  const workflow = await readFile('references/mcp-client-workflow.md', 'utf8');
  const patch = section(reference, '### `role_patch_cast`');

  assert.match(workflow, /role_patch_cast/);
  assert.match(patch, /"baseVersion"/);
  assert.match(patch, /whole replacement/i);
  assert.match(patch, /`cast: \[\]` turns the card back into a single-role card/);
  assert.match(patch, /\{\{char\}\}/);
  assert.match(patch, /formerNames/);
  assert.match(patch, /to_human_review/);
  for (const code of [
    'cast_disabled',
    'cast_version_conflict',
    'cast_theme_conflict',
    'cast_invalid',
    'cast_count',
    'name_duplicate',
    'persona_total_too_long',
    'primary_multiple',
    'cast_key_unknown',
    'welcome_references_removed',
  ]) {
    assert.match(patch, new RegExp(code), `missing ${code}`);
  }
  assert.match(section(reference, '### `role_patch_welcome`'), /【旁白】/);
});

test('ensemble guidance moves the character matrix into cast members with header lines', async () => {
  const reference = await readFile('references/ensemble-card-design.md', 'utf8');
  const skill = await readFile('skills/lunatalk-ensemble-director/SKILL.md', 'utf8');
  const evals = await readFile('skills/lunatalk-ensemble-director/evals/evals.json', 'utf8');

  assert.match(reference, /## Cast members on a multi-character story card/);
  assert.match(reference, /recurring side characters/i);
  assert.match(reference, /## Speaker header lines/);
  assert.match(reference, /\*\*名字\*\*走進來/);
  assert.match(reference, /cannot bind an XMLV3 theme/);
  assert.match(skill, /cast members/);
  assert.match(skill, /【名字】/);
  assert.match(evals, /【名字】/);
});

test('field finalization checks the cast shape and header-line welcome', async () => {
  const reference = await readFile('references/field-finalization.md', 'utf8');
  const checks = reference.slice(reference.indexOf('## Cast checks'));

  assert.match(checks, /2-8 members/);
  assert.match(checks, /`name` and a `persona`/);
  assert.match(checks, /1,500 tokens per member and 8,000 tokens/);
  assert.match(checks, /【名字】/);
  assert.match(checks, /welcome_references_removed/);
  assert.match(reference, /- role_patch_cast:/);
});
