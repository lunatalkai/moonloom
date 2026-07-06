import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

// Theme V3 CSS must target the official .lt-* class hooks and --lt-* variables.
// The renderer emits .lt-scene / .lt-n / .lt-d / .lt-speaker / .lt-quote /
// .lt-choice and the client DROPS every rule that does not start with .lt-.
// Authors (and the AI) previously invented selectors like .scene-card /
// .narration / .dialogue, producing a theme with zero style hooks that the
// server nonetheless accepted — a dead theme. The public reference must state
// the hook contract, forbid invented selectors, explain the dead-CSS warning,
// and require narration/dialogue differentiation.
test('theme-v3 reference documents the .lt-* hook contract and dead-CSS warning', async () => {
  const ref = await readFile('references/theme-v3-rendering.md', 'utf8');

  for (const hook of ['.lt-scene', '.lt-n', '.lt-d', '.lt-speaker', '.lt-quote', '.lt-choice']) {
    assert.ok(ref.includes(hook), `reference must name the ${hook} hook`);
  }
  // Non-.lt- rules are dropped / have no effect.
  assert.match(ref, /drop|no effect|zero|dead/i, 'reference must warn non-.lt- rules are dropped');
  // Invented selectors are called out as the failure mode.
  assert.match(ref, /\.scene-card|\.narration|invent/i, 'reference must forbid invented selectors');
  // styleHookCount == 0 is the dead-CSS signal from theme_validate_css.
  assert.match(ref, /styleHookCount/, 'reference must explain the styleHookCount signal');
  // Narration vs dialogue differentiation is required.
  assert.match(ref, /narration[\s\S]{0,80}dialogue|\.lt-n[\s\S]{0,120}\.lt-d/i, 'reference must require narration/dialogue differentiation');
});
