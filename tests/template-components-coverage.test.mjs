import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const TEMPLATE_ERROR_CODES = [
  'template_parse_failed',
  'template_invalid_root',
  'template_forbidden_tag',
  'template_too_large',
  'template_multiple_slots',
  'template_invalid_slot_position',
];

const TEMPLATE_WARNING_CODES = [
  'template_attr_dropped',
  'template_unknown_placeholder',
  'template_attr_missing_default',
  'template_fl3_content_hidden',
];

test('Moonloom documents the template field protocol on Theme V3 custom components', async () => {
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');

  // template field exists on tagConfig.xmlv3.components declarations.
  assert.match(themeRendering, /`template`/);
  // Single root, primitive + slot whitelist, hard limits.
  assert.match(themeRendering, /single root|exactly one root/i);
  assert.match(themeRendering, /<slot\s*\/>/);
  assert.match(themeRendering, /4096/);
  assert.match(themeRendering, /64/);
  assert.match(themeRendering, /depth[\s\S]{0,40}8|8[\s\S]{0,40}depth/i);
  // Placeholder semantics: {name}, single pass, never re-parsed as XML.
  assert.match(themeRendering, /\{name\}|\{attr\}|\{label\}/);
  assert.match(themeRendering, /single[- ]pass/i);
  assert.match(themeRendering, /never re-?parsed|not re-?parsed|opaque text/i);
  // Slot rules: at most one, container primitives only.
  assert.match(themeRendering, /at most one[\s\S]{0,60}slot|one `?<slot\/>`? at most/i);
  assert.match(themeRendering, /container/i);
});

test('Moonloom documents the optional human-readable name field on custom components', async () => {
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');

  // The custom component declaration documents an optional `name` display title,
  // mirroring official components, so editor cards show a readable heading
  // instead of the raw tag.
  assert.match(themeRendering, /`name`/);
  assert.match(themeRendering, /display (title|name|heading)|human-?readable/i);
  // The fallback contract: missing name → the client humanizes the tag.
  assert.match(themeRendering, /fall(s)? back[\s\S]{0,120}tag|humaniz[\s\S]{0,60}tag/i);
  // The example declaration carries a name field.
  assert.match(themeRendering, /"name"\s*:/);
});

test('Moonloom documents the enabledComponents opt-in gate for custom components', async () => {
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');

  // The enabledComponents field gates which custom components are active.
  assert.match(themeRendering, /`enabledComponents`/);
  // Legacy / backward-compat: absent (not an array) → all enabled.
  assert.match(themeRendering, /absent[\s\S]{0,120}all (are )?enabled|all enabled[\s\S]{0,120}absent|not an array[\s\S]{0,120}all/i);
  // Array present → only listed tags are active; [] → none.
  assert.match(themeRendering, /only[\s\S]{0,80}listed|empty array[\s\S]{0,40}none|\[\][\s\S]{0,40}none/i);
  // Definitions stay in components[]; the gate does not delete defs.
  assert.match(themeRendering, /components\[\][\s\S]{0,160}(library|stay|remain|keep|not (deleted|removed))/i);
});

test('Moonloom documents alt-text degradation and the three authoring rules', async () => {
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');

  // Rule 1: compact tags only, never hand-build template internals.
  assert.match(themeRendering, /compact tag/i);
  assert.match(themeRendering, /do not hand-?build|do not rebuild|never hand-?build/i);
  // Rule 2: no-slot children = degradation alt text (one short summary, no body).
  assert.match(themeRendering, /alt[- ]text|fallback text|degrad/i);
  assert.match(themeRendering, /one short summary|single short summary|short summary line/i);
  // Rule 3: slot components put the body into children.
  assert.match(themeRendering, /slot[\s\S]{0,200}children|children[\s\S]{0,200}slot/i);
  // Old clients render skin base + children inline.
  assert.match(themeRendering, /older clients?[\s\S]{0,300}children|children[\s\S]{0,300}older clients?/i);
  // example must show children alt text.
  assert.match(themeRendering, /`example`[\s\S]{0,400}children|children[\s\S]{0,400}`example`/i);
});

test('Moonloom documents Feature Level 4 / custom.templates and template-vs-primitive guidance', async () => {
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');

  assert.match(themeRendering, /Feature Level 4/);
  assert.match(themeRendering, /custom\.templates/);
  // When to use a template component vs hand-built primitives.
  assert.match(themeRendering, /when to use a template|template component when|repeat(s|ed)? (the )?same structure|every (message|turn)/i);
  // Token motivation: structure tokens move into the template.
  assert.match(themeRendering, /structure tokens?/i);
});

test('Moonloom documents all 10 template diagnostic codes with severities', async () => {
  const cardWriterMcp = await readFile('references/card-writer-mcp.md', 'utf8');
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');

  for (const code of [...TEMPLATE_ERROR_CODES, ...TEMPLATE_WARNING_CODES]) {
    assert.match(cardWriterMcp, new RegExp(code), `card-writer-mcp.md must document ${code}`);
    assert.match(themeRendering, new RegExp(code), `theme-v3-rendering.md must document ${code}`);
  }
  // Error codes reject the template (component falls back to skin-only).
  assert.match(
    cardWriterMcp,
    /template[\s\S]{0,600}(rejected|falls back|skin)/i,
  );
});

test('Moonloom documents the fl3-degraded preview viewMode', async () => {
  const cardWriterMcp = await readFile('references/card-writer-mcp.md', 'utf8');

  assert.match(cardWriterMcp, /viewMode/);
  assert.match(cardWriterMcp, /fl3-degraded/);
  assert.match(cardWriterMcp, /fl4/);
  // The degraded view strips template fields server-side before preview.
  assert.match(
    cardWriterMcp,
    /fl3-degraded[\s\S]{0,600}(strip|without `?template`?|degraded)/i,
  );
  // Recommended before publishing a template-using theme.
  assert.match(
    cardWriterMcp,
    /fl3-degraded[\s\S]{0,800}(before|publish|readab)/i,
  );
});
