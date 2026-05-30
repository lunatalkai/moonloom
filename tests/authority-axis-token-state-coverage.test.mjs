import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('agency guidance separates authority opposition from playful tone', async () => {
  const agency = await readFile('references/agency-design.md', 'utf8');
  const opening = await readFile('references/opening-design.md', 'utf8');
  const longplay = await readFile('references/longplay-design.md', 'utf8');

  for (const source of [agency, opening, longplay]) {
    assert.match(source, /authority opposition axis/i);
    assert.match(source, /obey|comply|順從/i);
    assert.match(source, /resist|oppose|對抗/i);
    assert.match(source, /at least one.*obey|at least one.*comply|至少.*順/i);
    assert.match(source, /at least one.*resist|at least one.*oppose|至少.*逆/i);
    assert.match(source, /tone axis|tone is separate|調性.*獨立/i);
  }
});

test('token guidance warns about attention dilution and front-loads critical rules', async () => {
  const token = await readFile('references/token-economy.md', 'utf8');
  const detail = await readFile('references/role-detail-engine.md', 'utf8');
  const fieldFinalization = await readFile('references/field-finalization.md', 'utf8');

  for (const source of [token, detail, fieldFinalization]) {
    assert.match(source, /attention dilution|instruction-following dilution/i);
    assert.match(source, /primacy|front-load/i);
    assert.match(source, /5-7 .*iron laws|5-7 .*must-do/i);
    assert.match(source, /CJK|zh-Hant/i);
    assert.match(source, /character cap|character-count/i);
    assert.match(source, /buffer/i);
  }
});

test('XMLV3 state and bar guidance documents high-drift output traps', async () => {
  const theme = await readFile('references/theme-v3-rendering.md', 'utf8');
  const state = await readFile('references/state-economy-design.md', 'utf8');
  const playtest = await readFile('references/playtest-loop.md', 'utf8');

  for (const source of [theme, state]) {
    assert.match(source, /hidden <state> JSON.*high-drift|high-drift.*hidden <state> JSON/i);
    assert.match(source, /visible panel.*fallback|fallback.*visible panel/i);
    assert.match(source, /bar value.*single number|single numeric value/i);
    assert.match(source, /do not.*8\s*[-–—>]+\s*14|8\s*[-–—>]+\s*14.*break/i);
    assert.match(source, /delta|change amount/i);
  }

  assert.match(playtest, /<state>.*missing/i);
  assert.match(playtest, /bar.*single number|single numeric value/i);
});
