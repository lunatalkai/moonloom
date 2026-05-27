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

test('Moonloom action-path closure checks the last visible AI block', async () => {
  const chatSkill = await readFile('skills/lunatalk-chat-simulation/SKILL.md', 'utf8');
  const playtestLoop = await readFile('references/playtest-loop.md', 'utf8');
  const roleDetailEngine = await readFile('references/role-detail-engine.md', 'utf8');

  for (const source of [chatSkill, playtestLoop, roleDetailEngine]) {
    assert.match(source, /last\s+visible\s+block/i);
    assert.match(source, /grouped\s+(?:XMLV3\s+)?choices/i);
    assert.match(source, /direct\s+(?:in-character\s+)?decision\s+question/i);
    assert.match(source, /concrete\s+(?:object\/action\s+)?affordance/i);
    assert.match(source, /not\s+enough/i);
  }
});
