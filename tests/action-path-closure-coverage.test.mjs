import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Moonloom simulation guidance treats action-path closure as a per-turn acceptance gate', async () => {
  const chatSkill = await readFile('skills/lunatalk-chat-simulation/SKILL.md', 'utf8');
  const playtestLoop = await readFile('references/playtest-loop.md', 'utf8');
  const qualityRubric = await readFile('references/quality-rubric.md', 'utf8');

  for (const source of [chatSkill, playtestLoop, qualityRubric]) {
    assert.match(source, /per-turn action-path closure/i);
    assert.match(source, /any\s+selected\s+AI\s+turn/i);
    assert.match(source, /later\s+turns\s+pass/i);
    assert.match(source, /roleDetailDesc[\s\S]*roleWelcome|roleWelcome[\s\S]*roleDetailDesc/);
  }
});
