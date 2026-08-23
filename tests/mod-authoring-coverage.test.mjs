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
  'mod_delete',
  'mod_unpublish',
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

// 刪除與下架的差別要講出來：對已經裝了它的人，兩者的後果完全不同。
test('the guidance distinguishes deleting a draft from unpublishing a listed MOD', async () => {
  const skill = await readFile('skills/lunatalk-mod-author/SKILL.md', 'utf8');
  const reference = await readFile('references/mod-authoring.md', 'utf8');

  for (const [name, text] of [['skill', skill], ['reference', reference]]) {
    assert.ok(/draft/i.test(text) && /publish/i.test(text), `${name} does not cover both removal paths`);
    assert.ok(
      /keep the version|keep the version they|existing holders/i.test(text),
      `${name} never says existing holders keep what they have`,
    );
  }
});

// 省略設定會保留，不是回預設。搞錯這件事的 agent 會每次都重送一整份設定，
// 而它猜的那份會把它沒看到的標籤刪掉。
test('the guidance says omitted settings are preserved', async () => {
  const reference = await readFile('references/mod-authoring.md', 'utf8');
  assert.ok(
    /omitting|only what is sent|only the fields/i.test(reference),
    'reference does not explain that a save changes only what it names',
  );
  assert.ok(/pricing/i.test(reference), 'reference does not state the commerce boundary');
});

// 開放協作的讀取邊界。寫錯的方向有兩個而且都很貴：以為別人的都讀不到，
// 協作就沒人做得起來；以為讀得到就改得動，agent 會拿別人的 MOD 去存檔。
test('the guidance separates reading an open MOD from writing it', async () => {
  const reference = await readFile('references/mod-authoring.md', 'utf8');
  const skill = await readFile('skills/lunatalk-mod-author/SKILL.md', 'utf8');
  const cardWriter = await readFile('references/card-writer-mcp.md', 'utf8');

  for (const [name, text] of [['reference', reference], ['skill', skill], ['card-writer', cardWriter]]) {
    assert.ok(/open/i.test(text) && /closed|black box|not found/i.test(text),
      `${name} does not contrast an open MOD with a closed one`);
    assert.ok(/own MOD|their own|caller's own/i.test(text),
      `${name} never says a save is limited to the caller's own MOD`);
  }
});
