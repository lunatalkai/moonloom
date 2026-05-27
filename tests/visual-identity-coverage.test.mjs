import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

async function fileExists(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

test('visual identity has a dedicated public skill, reference, and evals', async () => {
  assert.equal(
    await fileExists('skills/lunatalk-visual-identity-director/SKILL.md'),
    true,
    'missing dedicated visual identity skill',
  );
  assert.equal(
    await fileExists('skills/lunatalk-visual-identity-director/evals/evals.json'),
    true,
    'missing visual identity evals',
  );
  assert.equal(
    await fileExists('references/visual-identity.md'),
    true,
    'missing visual identity reference',
  );
});

test('visual identity defines a packet for avatar, cover, and image prompt work', async () => {
  const skill = await readFile('skills/lunatalk-visual-identity-director/SKILL.md', 'utf8');
  const reference = await readFile('references/visual-identity.md', 'utf8');
  const evals = await readFile('skills/lunatalk-visual-identity-director/evals/evals.json', 'utf8');

  assert.match(skill, /description: Use when.*avatar.*cover.*image prompt/i);
  assert.match(skill, /Visual identity packet:/);
  assert.match(reference, /Visual identity packet:/);
  assert.match(reference, /avatar.*cover.*thumbnail/i);
  assert.match(reference, /must prove.*promise.*player role.*tension/i);
  assert.match(reference, /role_patch_assets/);
  assert.match(reference, /roleAvatar.*roleBackground/s);
  assert.match(reference, /Do not copy unprovided art/i);
  assert.match(reference, /does not replace.*profile.*presentation.*render review/i);
  assert.match(evals, /Visual identity packet/);
  assert.match(evals, /MCP asset readiness/);
  assert.match(evals, /Do not copy unprovided art/i);
});

test('router, card author, and templates expose visual identity as a narrow workflow', async () => {
  const router = await readFile('skills/using-moonloom/SKILL.md', 'utf8');
  const cardAuthor = await readFile('skills/lunatalk-card-author/SKILL.md', 'utf8');
  const templates = await readFile('references/card-authoring-templates.md', 'utf8');
  const framework = await readFile('references/role-card-writing-framework.md', 'utf8');
  const readme = await readFile('README.md', 'utf8');

  assert.match(router, /lunatalk-visual-identity-director/);
  assert.match(router, /avatar|cover|thumbnail|image prompt|roleAvatar|roleBackground/i);
  assert.match(cardAuthor, /lunatalk-visual-identity-director/);
  assert.match(cardAuthor, /before.*profile|profile.*before/i);
  assert.match(cardAuthor, /role_patch_assets/);
  assert.match(templates, /Visual identity packet:/);
  assert.match(templates, /visual assets:/);
  assert.match(framework, /visual identity/i);
  assert.match(readme, /lunatalk-visual-identity-director/);
});
