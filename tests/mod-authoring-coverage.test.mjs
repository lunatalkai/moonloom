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

const AUTHORING_TOOLS = [
  'mod_find',
  'mod_get',
  'mod_create',
  'mod_author_save',
  'mod_validate',
  'mod_submit',
];

test('Moonloom carries the MOD authoring surface', async () => {
  assert.equal(await fileExists('references/mod-authoring.md'), true, 'missing MOD authoring reference');
  assert.equal(await fileExists('skills/lunatalk-mod-author/SKILL.md'), true, 'missing MOD authoring skill');
  assert.equal(await fileExists('skills/lunatalk-mod-author/evals/evals.json'), true, 'missing MOD authoring evals');

  const cardWriter = await readFile('references/card-writer-mcp.md', 'utf8');
  const workflow = await readFile('references/mcp-client-workflow.md', 'utf8');

  for (const tool of AUTHORING_TOOLS) {
    assert.ok(cardWriter.includes(tool), `card-writer-mcp.md does not mention ${tool}`);
    assert.ok(workflow.includes(tool), `mcp-client-workflow.md does not mention ${tool}`);
  }
});

// 沒有這條路由，新 skill 不會被觸發——文件寫得再好也等於不存在。
test('the router can reach the MOD authoring skill', async () => {
  const router = await readFile('skills/using-moonloom/SKILL.md', 'utf8');
  assert.ok(router.includes('lunatalk-mod-author'), 'using-moonloom does not route to lunatalk-mod-author');
  assert.ok(
    router.includes('mod-authoring.md'),
    'using-moonloom routes to the skill but never points at the reference',
  );
});

// 草稿不必上架就能試玩，是這條產品線最容易被跳過、也最容易出事的一步：
// 送審一個從沒跑過的 MOD，schema 綠不代表模型真的照著做。
test('the authoring guidance requires playing a draft before submitting', async () => {
  const skill = await readFile('skills/lunatalk-mod-author/SKILL.md', 'utf8');
  const reference = await readFile('references/mod-authoring.md', 'utf8');

  for (const [name, text] of [['skill', skill], ['reference', reference]]) {
    assert.ok(
      /without (ever )?being published|does not need to be published|before it is ever\s+published/i.test(text),
      `${name} never says a draft can be played without publishing`,
    );
  }
});

// 版本衝突要指向「讀回來再存」。少了這句，agent 會拿同一份內容重試到放棄。
test('the authoring guidance answers a version conflict with read-modify-write', async () => {
  const reference = await readFile('references/mod-authoring.md', 'utf8');
  assert.ok(/version conflict/i.test(reference), 'reference never mentions a version conflict');
  assert.ok(
    /read (it )?back|read again/i.test(reference),
    'reference does not tell the author to read back before saving again',
  );
});

// 欄位規格只在 MCP 資源說一次；reference 重抄一份就是同一段字送進模型兩遍。
test('the reference points at the schema resource instead of copying it', async () => {
  const reference = await readFile('references/mod-authoring.md', 'utf8');
  assert.ok(
    reference.includes('lunatalk://schemas/mod-source'),
    'reference does not point at the schema resource',
  );
  assert.ok(
    !/"?schemaVersion"?\s*[:=]\s*7/.test(reference),
    'reference copies the schema instead of pointing at it',
  );
});
