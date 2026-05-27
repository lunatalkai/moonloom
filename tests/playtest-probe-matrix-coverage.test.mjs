import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const REQUIRED_PROBE_TERMS = [
  'normal interaction',
  'short reply',
  'off-path reply',
  'background question',
  'relationship push',
  'secret exploration',
  'boundary test',
];

test('full behavior acceptance requires the seven-probe Moonloom matrix', async () => {
  const chatSkill = await readFile('skills/lunatalk-chat-simulation/SKILL.md', 'utf8');
  const playtestLoop = await readFile('references/playtest-loop.md', 'utf8');
  const e2eAcceptance = await readFile('references/end-to-end-acceptance.md', 'utf8');
  const validator = await readFile('scripts/validate-simulation-evidence.mjs', 'utf8');

  for (const source of [chatSkill, playtestLoop, e2eAcceptance]) {
    assert.match(source, /seven-probe Moonloom matrix/i);
    for (const term of REQUIRED_PROBE_TERMS) {
      assert.match(source, new RegExp(term, 'i'));
    }
  }

  assert.match(chatSkill, /narrow spot-check/i);
  assert.match(chatSkill, /behavior-complete/i);
  assert.doesNotMatch(chatSkill, /probe count: 1 to 5 user messages/i);

  for (const kind of [
    'normal_interaction',
    'short_reply',
    'off_path',
    'background_question',
    'relationship_push',
    'secret_exploration',
    'boundary_test',
  ]) {
    assert.match(validator, new RegExp(`'${kind}'`));
  }
});
