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

test('end-to-end acceptance reference exists and defines visual completion gates', async () => {
  assert.equal(
    await fileExists('references/end-to-end-acceptance.md'),
    true,
    'missing end-to-end acceptance reference',
  );

  const reference = await readFile('references/end-to-end-acceptance.md', 'utf8');
  assert.match(reference, /End-to-end acceptance packet:/);
  assert.match(reference, /role_patch_assets/);
  assert.match(reference, /avatar.*background/s);
  assert.match(reference, /role detail.*avatar/s);
  assert.match(reference, /chat.*background/s);
  assert.match(reference, /simulate_private_chat[\s\S]*billing|billing[\s\S]*simulate_private_chat/i);
  assert.match(reference, /cost-gated/);
  assert.match(reference, /root-cause repair/);
});

test('benchmark runner routes full trial-card acceptance through the new reference', async () => {
  const skill = await readFile('skills/lunatalk-benchmark-runner/SKILL.md', 'utf8');
  const evals = await readFile('skills/lunatalk-benchmark-runner/evals/evals.json', 'utf8');

  assert.match(skill, /end-to-end-acceptance\.md/);
  assert.match(skill, /role_patch_assets/);
  assert.match(skill, /app visual status:/);
  assert.match(skill, /asset status:/);
  assert.match(skill, /End-to-end acceptance packet/);
  assert.match(evals, /no avatar or background/i);
  assert.match(evals, /role-detail avatar and chat background/i);
  assert.match(evals, /cost-gated/i);
});

test('router and README expose end-to-end acceptance as a first-class workflow', async () => {
  const router = await readFile('skills/using-moonloom/SKILL.md', 'utf8');
  const readme = await readFile('README.md', 'utf8');

  assert.match(router, /end-to-end-acceptance\.md/);
  assert.match(router, /avatar\/background/);
  assert.match(router, /app visual evidence/);
  assert.match(readme, /references\/end-to-end-acceptance\.md/);
  assert.match(readme, /avatar\/background patching/);
  assert.match(readme, /simulation cost gate/);
});

test('end-to-end acceptance requires dedicated per-message preview evidence after simulation', async () => {
  const reference = await readFile('references/end-to-end-acceptance.md', 'utf8');
  const playtest = await readFile('references/playtest-loop.md', 'utf8');
  const chatSimulation = await readFile('skills/lunatalk-chat-simulation/SKILL.md', 'utf8');
  const benchmark = await readFile('skills/lunatalk-benchmark-runner/SKILL.md', 'utf8');
  const evals = await readFile('skills/lunatalk-benchmark-runner/evals/evals.json', 'utf8');

  assert.match(reference, /\/pages\/mcp\/rolePreview\?conversationId=<conversationId>&chatId=<chatId>&roleId=<roleId>&pageSize=<n>/);
  assert.match(reference, /per-message preview/i);
  assert.match(reference, /Do not parse the normal chat page UI/i);
  assert.match(reference, /message preview evidence:/);
  assert.match(reference, /message previews:/);

  assert.match(playtest, /per-message preview/i);
  assert.match(playtest, /conversationId[\s\S]*chatId[\s\S]*roleId/);

  assert.match(chatSimulation, /message preview evidence/);
  assert.match(chatSimulation, /\/pages\/mcp\/rolePreview/);
  assert.match(chatSimulation, /Do not parse the normal chat page UI/i);

  assert.match(benchmark, /per-message preview/i);
  assert.match(benchmark, /message preview status:/);
  assert.match(evals, /preview each returned chatId/i);
  assert.match(evals, /normal chat UI/i);
});
