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

test('instruction guardrail has a dedicated public skill, reference, and evals', async () => {
  assert.equal(
    await fileExists('skills/lunatalk-instruction-guardrail/SKILL.md'),
    true,
    'missing dedicated instruction guardrail skill',
  );
  assert.equal(
    await fileExists('skills/lunatalk-instruction-guardrail/evals/evals.json'),
    true,
    'missing instruction guardrail evals',
  );
  assert.equal(
    await fileExists('references/instruction-guardrails.md'),
    true,
    'missing instruction guardrail reference',
  );
});

test('instruction guardrail defines a bounded packet before jailbreak patches', async () => {
  const skill = await readFile('skills/lunatalk-instruction-guardrail/SKILL.md', 'utf8');
  const reference = await readFile('references/instruction-guardrails.md', 'utf8');
  const evals = await readFile('skills/lunatalk-instruction-guardrail/evals/evals.json', 'utf8');

  assert.match(skill, /description: Use when.*role_patch_jailbreak/i);
  assert.match(skill, /Instruction guardrail packet:/);
  assert.match(reference, /Instruction guardrail packet:/);
  assert.match(reference, /Prefer .*roleDetailDesc.*roleWelcome.*talkExample/i);
  assert.match(reference, /not.*safety bypass/i);
  assert.match(reference, /not.*writing-quality gate/i);
  assert.match(evals, /role_patch_jailbreak/);
  assert.match(evals, /do not use jailbreak/i);
});

test('router and card author expose instruction guardrails as a narrow workflow', async () => {
  const router = await readFile('skills/using-moonloom/SKILL.md', 'utf8');
  const cardAuthor = await readFile('skills/lunatalk-card-author/SKILL.md', 'utf8');
  const templates = await readFile('references/card-authoring-templates.md', 'utf8');
  const readme = await readFile('README.en.md', 'utf8');

  assert.match(router, /lunatalk-instruction-guardrail/);
  assert.match(router, /jailbreak|system behavior|instruction/i);
  assert.match(cardAuthor, /lunatalk-instruction-guardrail/);
  assert.match(cardAuthor, /before.*role_patch_jailbreak/i);
  assert.match(templates, /Instruction guardrail packet:/);
  assert.match(templates, /instruction guardrail preserved:/);
  assert.match(readme, /lunatalk-instruction-guardrail/);
});
