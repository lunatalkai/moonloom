#!/usr/bin/env node
// README 是使用者從公告連結點進來看到的第一頁。它先前只描述倉庫內容，沒有一句
// 「怎麼裝」——連結送到使用者手上，他也開始不了。
//
// 這些測試釘住的是：四種語言都在，彼此連得到，而且每一份都真的講得出三條安裝路徑
// 與第一次登入要做什麼。

import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const READMES = [
  ['README.md', '繁體中文'],
  ['README.en.md', 'English'],
  ['README.ja.md', '日本語'],
  ['README.ko.md', '한국어'],
];

test('every localized README exists and links to the other three', async () => {
  for (const [file] of READMES) {
    const body = await readFile(file, 'utf8');
    for (const [other] of READMES) {
      if (other === file) continue;
      assert.match(body, new RegExp(other.replace('.', '\\.')),
        `${file} should link to ${other} so a reader can switch language`);
    }
  }
});

test('every localized README can actually get a user installed', async () => {
  for (const [file] of READMES) {
    const body = await readFile(file, 'utf8');

    // 三條安裝路徑：Claude 的圖形介面、Claude Code 命令列、ChatGPT Work / Codex。
    assert.match(body, /Add from a repository/,
      `${file} is missing the Claude app install path`);
    assert.match(body, /claude plugin marketplace add lunatalkai\/moonloom/,
      `${file} is missing the Claude Code install command`);
    assert.match(body, /claude plugin install moonloom/, `${file} is missing the install step`);
    assert.match(body, /codex plugin marketplace add lunatalkai\/moonloom/,
      `${file} is missing the ChatGPT Work / Codex install command`);

    // 裝完之後的兩件事：登入，以及確認裝好了。少了任一件，使用者會卡在沒有回饋的地方。
    assert.match(body, /oauth-client-lifecycle\.md/, `${file} does not say how signing in works`);
    assert.match(body, /https:\/\/github\.com\/lunatalkai\/moonloom/,
      `${file} should carry the repository URL the app install path asks for`);
  }
});

test('the default README is the Traditional Chinese one', async () => {
  const body = await readFile('README.md', 'utf8');
  assert.match(body, /安裝/);
  assert.match(body, /繁體中文/);
});
