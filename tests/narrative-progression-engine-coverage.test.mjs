import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('detail engine defines hard narrative progression rules for story cards', async () => {
  const detail = await readFile('references/role-detail-engine.md', 'utf8');
  const opening = await readFile('references/opening-design.md', 'utf8');
  const longplay = await readFile('references/longplay-design.md', 'utf8');
  const quality = await readFile('references/quality-rubric.md', 'utf8');
  const skill = await readFile('skills/lunatalk-detail-engineer/SKILL.md', 'utf8');

  for (const source of [detail, skill]) {
    assert.match(source, /Narrative progression engine/i);
    assert.match(source, /every-turn iron laws/i);
    assert.match(source, /inciting incident/i);
    assert.match(source, /1-2 (?:assistant )?turns/i);
    assert.match(source, /next station/i);
    assert.match(source, /progression.*responding to the player|responding to the player.*progression/i);
    assert.match(source, /do not leave.*new scene.*player|do not make the player.*open.*new scene/i);
  }

  assert.match(opening, /inciting incident/i);
  assert.match(opening, /external goal/i);
  assert.match(longplay, /next-station hook|next station hook/i);
  assert.match(longplay, /role\/narrator.*story direction|story direction.*role\/narrator/i);
  assert.match(quality, /macro-progression/i);
});

test('progression guidance bans history-count rules and uses stateless hooks', async () => {
  const detail = await readFile('references/role-detail-engine.md', 'utf8');
  const longplay = await readFile('references/longplay-design.md', 'utf8');

  for (const source of [detail, longplay]) {
    assert.match(source, /anti-pattern/i);
    assert.match(source, /turn count|round count|第幾輪|same scene for 1-2 turns/i);
    assert.match(source, /stateless|no-state|無狀態/i);
    assert.match(source, /keep the forward door open|forward door/i);
  }
});
