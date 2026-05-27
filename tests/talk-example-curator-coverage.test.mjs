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

test('talkExample curation has a dedicated public skill, reference, and evals', async () => {
  assert.equal(
    await fileExists('skills/lunatalk-talk-example-curator/SKILL.md'),
    true,
    'missing dedicated talkExample curator skill',
  );
  assert.equal(
    await fileExists('skills/lunatalk-talk-example-curator/evals/evals.json'),
    true,
    'missing talkExample curator evals',
  );
  assert.equal(
    await fileExists('references/talk-example-design.md'),
    true,
    'missing talkExample design reference',
  );
});

test('talkExample design defines a packet and token-safe sample rules', async () => {
  const skill = await readFile('skills/lunatalk-talk-example-curator/SKILL.md', 'utf8');
  const reference = await readFile('references/talk-example-design.md', 'utf8');
  const evals = await readFile('skills/lunatalk-talk-example-curator/evals/evals.json', 'utf8');

  assert.match(skill, /description: Use when.*talkExample.*micro-sample/i);
  assert.match(skill, /TalkExample packet:/);
  assert.match(reference, /TalkExample packet:/);
  assert.match(reference, /omit \| micro-samples \| full examples/i);
  assert.match(reference, /Do not repeat the welcome/i);
  assert.match(reference, /Do not decide the player's feelings/i);
  assert.match(reference, /token payment/i);
  assert.match(evals, /TalkExample packet/);
  assert.match(evals, /token payment/i);
});

test('router, card author, and voice reference expose talkExample curation', async () => {
  const router = await readFile('skills/using-moonloom/SKILL.md', 'utf8');
  const cardAuthor = await readFile('skills/lunatalk-card-author/SKILL.md', 'utf8');
  const templates = await readFile('references/card-authoring-templates.md', 'utf8');
  const voiceReference = await readFile('references/voice-calibration.md', 'utf8');
  const readme = await readFile('README.md', 'utf8');

  assert.match(router, /lunatalk-talk-example-curator/);
  assert.match(router, /talkExample|micro-sample|dialogue sample/i);
  assert.match(cardAuthor, /lunatalk-talk-example-curator/);
  assert.match(cardAuthor, /before.*field|field.*before/i);
  assert.match(templates, /TalkExample packet:/);
  assert.match(voiceReference, /talk-example-design\.md/);
  assert.match(readme, /lunatalk-talk-example-curator/);
});

test('Moonloom router states the uncertainty-first entry discipline', async () => {
  const router = await readFile('skills/using-moonloom/SKILL.md', 'utf8');
  const evals = await readFile('skills/using-moonloom/evals/evals.json', 'utf8');

  assert.match(router, /entry router/i);
  assert.match(router, /reasonable chance.*LunaTalk creation/i);
  assert.match(router, /before any Moonloom-specific answer, clarifying question/i);
  assert.match(router, /no Moonloom skill applies/i);
  assert.match(evals, /not sure which Moonloom skill to use/i);
});
