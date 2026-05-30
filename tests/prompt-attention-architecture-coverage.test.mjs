import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('prompt attention architecture standard is documented and routed', async () => {
  const reference = await readFile('references/prompt-attention-architecture.md', 'utf8');
  const readme = await readFile('README.md', 'utf8');
  const router = await readFile('skills/using-moonloom/SKILL.md', 'utf8');
  const token = await readFile('references/token-economy.md', 'utf8');
  const detail = await readFile('references/role-detail-engine.md', 'utf8');
  const finalization = await readFile('references/field-finalization.md', 'utf8');

  assert.match(reference, /Lost in the Middle|lost-in-the-middle/i);
  assert.match(reference, /U-shaped attention|U-shaped positional/i);
  assert.match(reference, /multi-head attention/i);
  assert.match(reference, /Markdown/i);
  assert.match(reference, /XML tags|semantic tags|tags/i);
  assert.match(reference, /primacy/i);
  assert.match(reference, /recency/i);
  assert.match(reference, /Every-Turn Iron Laws/i);
  assert.match(reference, /Final Recency Checklist/i);
  assert.match(reference, /raw description/i);
  assert.match(reference, /raw detail/i);
  assert.match(reference, /cross-model|model-to-model|non-Claude/i);
  assert.match(reference, /does not guarantee attention|cannot control attention heads/i);

  for (const source of [readme, router, token, detail, finalization]) {
    assert.match(source, /prompt-attention-architecture\.md/i);
  }
});

test('long raw detail template front-loads critical rules and keeps the middle as reference', async () => {
  const reference = await readFile('references/prompt-attention-architecture.md', 'utf8');

  assert.match(reference, /5-7 .*iron laws|5-7 .*must-do/i);
  assert.match(reference, /critical control plane/i);
  assert.match(reference, /Card Contract/i);
  assert.match(reference, /Narrative Progression Engine/i);
  assert.match(reference, /State and Output Contract/i);
  assert.match(reference, /middle.*reference|reference.*middle/i);
  assert.match(reference, /repeat.*early.*late|early.*late.*repeat/i);
  assert.match(reference, /CJK|zh-Hant/i);
  assert.match(reference, /buffer/i);
});
