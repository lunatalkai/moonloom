import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('agent mode runtime is documented as a second runtime and routed', async () => {
  const reference = await readFile('references/agent-mode-runtime.md', 'utf8');
  const readme = await readFile('README.md', 'utf8');
  const router = await readFile('skills/using-moonloom/SKILL.md', 'utf8');
  const oneShot = await readFile('references/one-shot-prompt-runtime.md', 'utf8');
  const simulation = await readFile('skills/lunatalk-chat-simulation/SKILL.md', 'utf8');

  assert.match(reference, /agent mode/i);
  assert.match(reference, /one-shot/i);
  // 兩件事決定作者要不要在意它：模式由玩家選，而且任何卡都可能被兩種模式玩。
  assert.match(reference, /player/i);
  assert.match(reference, /either way|both/i);
  // 寫卡的實質差異：agent 自己搜，所以命中靠名稱與內文用詞。
  assert.match(reference, /name/i);
  assert.match(reference, /search/i);
  assert.match(reference, /trigger/i);

  for (const source of [readme, router, oneShot, simulation]) {
    assert.match(source, /agent-mode-runtime\.md/i);
  }
});

test('one-shot reference no longer claims the runtime is always one-shot', async () => {
  const oneShot = await readFile('references/one-shot-prompt-runtime.md', 'utf8');

  // 這句在 agent 模式上線之後就不成立了；留著會教作者只準備一半。
  assert.doesNotMatch(oneShot, /Moonloom assumes the chat runtime is one-shot/i);
  assert.match(oneShot, /default runtime/i);
});

test('mcp reference documents the agent turn contract and its readback', async () => {
  const mcp = await readFile('references/card-writer-mcp.md', 'utf8');

  assert.match(mcp, /agentMode/);
  // 逐次生效是這個參數最容易被誤解的地方：它不改對話存下來的設定。
  assert.match(mcp, /that turn only|this one turn/i);
  // 拒絕而不是靜默降級，否則作者會拿到一份沒跑 agent 的假結果。
  assert.match(mcp, /agent_mode_free_model/);
  assert.match(mcp, /agent_mode_model_unsupported/);
  assert.match(mcp, /agent_mode_runtime_disabled/);
  // 讀得回它做了什麼，才談得上調卡。
  assert.match(mcp, /agentPrep/);
  assert.match(mcp, /preparing/);
  assert.match(mcp, /conversation_stop/);
  assert.match(mcp, /supportsAgentMode/);
  assert.match(mcp, /agentModeCostWarning/);
});

test('worldbook recall guidance covers both runtimes', async () => {
  const mcp = await readFile('references/card-writer-mcp.md', 'utf8');
  const recall = mcp.slice(mcp.indexOf('Worldbook entry fields are authoring handles'));

  assert.match(recall, /agent mode/i);
  assert.match(recall, /agent-mode-runtime\.md/);
  // keywords 仍然要寫——同一張卡兩種模式都會被玩。
  assert.match(recall, /keywords/);
});

test('playtest and cost guidance treat two-runtime coverage as billable work', async () => {
  const playtest = await readFile('references/playtest-loop.md', 'utf8');
  const cost = await readFile('references/safety-and-cost.md', 'utf8');

  assert.match(playtest, /agent-mode-runtime\.md/);
  assert.match(playtest, /preparation trace/i);
  assert.match(cost, /agentMode/);
  assert.match(cost, /agentModeCostWarning/);
  assert.match(cost, /conversation_stop/);
});

test('the quality and publish layer can tell one runtime from two', async () => {
  const scorecard = await readFile('references/quality-scorecard.md', 'utf8');
  const publish = await readFile('skills/lunatalk-publish-readiness/SKILL.md', 'utf8');
  const acceptance = await readFile('references/end-to-end-acceptance.md', 'utf8');

  // 沒有這個維度的話，一張只在一種模式下測過的卡照樣拿滿分、照樣送審。
  assert.match(scorecard, /Runtime coverage/);
  assert.match(scorecard, /- runtime coverage:/);
  // 分數要說清楚是在哪一種模式下拿到的，不能讓沒測過的那邊靜默算通過。
  assert.match(scorecard, /one runtime is a tier in one runtime/i);
  assert.match(scorecard, /agent-mode-runtime\.md/);

  // 送審前要指名涵蓋了哪些模式，作者不想付第二次錢也要講出來，不能報成全測過。
  assert.match(publish, /agent-mode-runtime\.md/);
  assert.match(publish, /agentMode/);
  assert.match(publish, /runtime coverage/i);

  assert.match(acceptance, /runtime coverage/i);
});
