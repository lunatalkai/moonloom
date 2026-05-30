import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('prompt architecture documents weak-model format dilution and absorbing collapse', async () => {
  const attention = await readFile('references/prompt-attention-architecture.md', 'utf8');
  const playtest = await readFile('references/playtest-loop.md', 'utf8');
  const theme = await readFile('references/theme-v3-rendering.md', 'utf8');

  for (const source of [attention, playtest, theme]) {
    assert.match(source, /format dilution|structure dilution|format stability/i);
    assert.match(source, /absorbing-state|absorbing state|self-contagion|self contagion/i);
    assert.match(source, /weak model|weaker model|least forgiving model/i);
    assert.match(source, /10\+ turns|10 or more turns|10-plus turns/i);
    assert.match(source, /choices.*fragile|fragile.*choices|choices.*first.*drop/i);
    assert.match(source, /U-shaped.*delay.*not.*cure|delay.*not.*cure.*U-shaped/i);
  }

  assert.match(attention, /behavioral rules.*structural rules|structural rules.*behavioral rules/i);
  assert.match(attention, /summary.*not.*reset|context summary.*not.*reset|summarization.*not.*reset/i);
  assert.match(attention, /minimal viable structure|minimal structure|format skeleton/i);
  assert.match(attention, /positive example|format exemplar|few-shot/i);
  assert.match(attention, /do not imitate.*previous.*format|previous.*bad format|bad-format absorption/i);
  assert.match(attention, /too heavy.*XMLV3|heavy XMLV3|reduce.*structural contract/i);
  assert.match(playtest, /structureShare/i);
  assert.match(theme, /visible panel.*source of truth|source of truth.*visible panel/i);
});

test('one-shot runtime prompt map is documented in sanitized public-safe form', async () => {
  const runtime = await readFile('references/one-shot-prompt-runtime.md', 'utf8');
  const attention = await readFile('references/prompt-attention-architecture.md', 'utf8');
  const token = await readFile('references/token-economy.md', 'utf8');
  const detailSkill = await readFile('skills/lunatalk-detail-engineer/SKILL.md', 'utf8');
  const tokenSkill = await readFile('skills/lunatalk-token-architect/SKILL.md', 'utf8');
  const router = await readFile('skills/using-moonloom/SKILL.md', 'utf8');

  assert.match(runtime, /one-shot/i);
  assert.match(runtime, /no harness agent|without a harness agent/i);
  assert.match(runtime, /Sanitized Prompt V2 Layout|sanitized.*prompt.*layout/i);
  assert.match(runtime, /pre-history/i);
  assert.match(runtime, /conversation history/i);
  assert.match(runtime, /post-history|near-generation/i);
  assert.match(runtime, /RoleDetail|roleDetailDesc/i);
  assert.match(runtime, /RoleUserName|role user name/i);
  assert.match(runtime, /raw detail.*not.*last instruction|roleDetailDesc.*not.*last instruction/i);
  assert.match(runtime, /output position|assistant generation/i);
  assert.match(runtime, /current user.*history|latest user.*history/i);
  assert.match(runtime, /summary.*memory.*not.*output example|story summary.*not.*format example/i);
  assert.match(runtime, /minimum viable reply/i);
  assert.match(runtime, /cut prose.*structure|structure.*before.*prose/i);
  assert.match(runtime, /format exemplar|few-shot/i);
  assert.match(runtime, /do not imitate.*bad format|malformed.*history/i);

  assert.doesNotMatch(runtime, /\/router\/|_router|database|accountId|api\.lunatalk|\bprod\b|production/i);

  for (const source of [attention, token, detailSkill, tokenSkill, router]) {
    assert.match(source, /one-shot-prompt-runtime\.md/i);
  }
});

test('simulation framework records long-arc format stability signals', async () => {
  const chatSkill = await readFile('skills/lunatalk-chat-simulation/SKILL.md', 'utf8');
  const playtest = await readFile('references/playtest-loop.md', 'utf8');
  const validator = await readFile('scripts/validate-simulation-evidence.mjs', 'utf8');
  const fixture = await readFile('examples/simulation-evidence.fixture.json', 'utf8');

  for (const source of [chatSkill, playtest, validator, fixture]) {
    assert.match(source, /longArcFormatStability/i);
    assert.match(source, /structureShare/i);
    assert.match(source, /panelRetention/i);
    assert.match(source, /choicesRetention/i);
    assert.match(source, /absorbing-state-like|self-reinforcing format drift/i);
    assert.match(source, /choices.*first|first.*choices/i);
  }
});

test('field finalization strips working-document metadata and validates heading hierarchy', async () => {
  const reference = await readFile('references/field-finalization.md', 'utf8');
  const skill = await readFile('skills/lunatalk-field-finalizer/SKILL.md', 'utf8');
  const evals = await readFile('skills/lunatalk-field-finalizer/evals/evals.json', 'utf8');

  for (const source of [reference, skill, evals]) {
    assert.match(source, /working-document metadata|authoring metadata|version banner|version marker/i);
    assert.match(source, /date stamp|revision note|changelog|版本標註/i);
    assert.match(source, /strip|remove|刪除|移除/i);
    assert.match(source, /heading hierarchy|heading levels|章節層級/i);
    assert.match(source, /one H1|single H1|exactly one H1/i);
    assert.match(source, /skip heading levels|skipped heading levels|jump from H1 to H3/i);
    assert.match(source, /MCP-ready|before.*MCP|upload/i);
  }
});
