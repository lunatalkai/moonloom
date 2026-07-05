import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

// theme_list_available language behavior (B2): the server accepts an optional
// `language` parameter (en / zh-Hans / zh-Hant / ja / ko), localizes official
// theme names/descriptions in the response, and sorts same-language themes
// first without filtering out other languages. theme_create stamps the
// creator's account language onto new themes. External AI clients must know
// this contract from the public reference.
test('card writer MCP documents theme language behavior', async () => {
  const reference = await readFile('references/card-writer-mcp.md', 'utf8');

  assert.match(reference, /theme_list_available[\s\S]{0,1500}"language"/, 'theme_list_available section documents the language parameter');
  assert.match(reference, /zh-Hans.*zh-Hant.*ja.*ko|en.*zh-Hans.*zh-Hant/, 'language enum values listed');
  assert.match(reference, /official theme names[\s\S]{0,200}localized|localized[\s\S]{0,200}official theme/i, 'official theme copy localization documented');
  assert.match(reference, /sort(ed|s)? first|priorit/i, 'same-language sorting documented');
  assert.match(reference, /theme_create[\s\S]{0,2500}account language|account language[\s\S]{0,600}theme_create/i, 'theme_create language stamping documented');
});
