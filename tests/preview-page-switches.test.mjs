import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

// The two author switches that decide how a decorated role home is used.
//
// These are deliberately pinned on the exact wire attribute names rather than on
// prose. The wire-contract checker only verifies enum values, so a new attribute
// that never reaches this repo passes it silently — which is how image.attrs.width
// went undocumented for three weeks. Matching the literal names is the cheapest
// guard that cannot be satisfied by unrelated surrounding prose.

const REFERENCE = 'references/preview-page-authoring.md';
const SKILL = 'skills/lunatalk-preview-page-designer/SKILL.md';

test('authoring reference documents both role home switches by their wire names', async () => {
  const ref = await readFile(REFERENCE, 'utf8');
  assert.match(ref, /landOnHome/, 'reference never mentions landOnHome');
  assert.match(ref, /showComments/, 'reference never mentions showComments');
});

test('authoring reference states both switches default to on', async () => {
  const ref = await readFile(REFERENCE, 'utf8');
  // Each switch needs its own default statement; a single shared sentence elsewhere
  // in the file must not be able to satisfy both assertions.
  assert.match(
    ref,
    /landOnHome[^\n]*\n?[^\n]*default[s]?\s+to\s+(?:true|on)/i,
    'landOnHome default (on) is not stated next to the attribute',
  );
  assert.match(
    ref,
    /showComments[^\n]*\n?[^\n]*default[s]?\s+to\s+(?:true|on)/i,
    'showComments default (on) is not stated next to the attribute',
  );
});

test('authoring reference states that omitting a switch leaves it unchanged', async () => {
  const ref = await readFile(REFERENCE, 'utf8');
  // The single most costly mistake an AI client can make here: assuming a patch
  // that carries only doc resets the switches.
  assert.match(
    ref,
    /omit\w*[\s\S]{0,120}(?:unchanged|leaves it|does not change|no change)/i,
    'reference does not say that omitting a switch leaves it unchanged',
  );
});

test('authoring reference states a rejected role home ignores landOnHome', async () => {
  const ref = await readFile(REFERENCE, 'utf8');
  // Authors will ask "I turned it on, why does it still open chat?" — the answer
  // must be documented, not discovered.
  assert.match(
    ref,
    /reject\w*[\s\S]{0,200}(?:chat|ignored|not\s+applied|has no effect)/i,
    'reference does not explain that a rejected role home falls back to chat',
  );
});

test('designer skill tells the client it can set both switches via role_patch_preview_page', async () => {
  const skill = await readFile(SKILL, 'utf8');
  assert.match(skill, /landOnHome/, 'skill never mentions landOnHome');
  assert.match(skill, /showComments/, 'skill never mentions showComments');
  assert.match(
    skill,
    /role_patch_preview_page/,
    'skill does not name the tool that carries the switches',
  );
});

test('designer skill tells the client to confirm a switch change with the author first', async () => {
  const skill = await readFile(SKILL, 'utf8');
  // Flipping where every visitor lands is not a cosmetic edit; an AI client must
  // not do it as a silent side effect of a doc save.
  assert.match(
    skill,
    /(?:confirm|ask)[\s\S]{0,200}(?:landOnHome|showComments|switch)/i,
    'skill does not require confirming switch changes with the author',
  );
});
