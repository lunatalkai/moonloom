import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const DIAGNOSTIC_CODES = [
  'invalid_tag_name',
  'reserved_tag',
  'duplicate_tag',
  'component_limit_exceeded',
  'invalid_extends_fallback_view',
  'default_attr_dropped',
];

test('Moonloom documents componentDiagnostics on the Theme V3 MCP tools', async () => {
  const cardWriterMcp = await readFile('references/card-writer-mcp.md', 'utf8');

  assert.match(cardWriterMcp, /componentDiagnostics/);
  for (const code of DIAGNOSTIC_CODES) {
    assert.match(cardWriterMcp, new RegExp(code), `card-writer-mcp.md must document ${code}`);
  }
  // The four tools that return the diagnostics.
  assert.match(
    cardWriterMcp,
    /componentDiagnostics[\s\S]{0,800}theme_validate_css|theme_validate_css[\s\S]{0,800}componentDiagnostics/,
  );
  assert.match(
    cardWriterMcp,
    /componentDiagnostics[\s\S]{0,800}theme_create[\s\S]{0,200}theme_update|theme_create[\s\S]{0,800}componentDiagnostics/,
  );
  assert.match(
    cardWriterMcp,
    /componentDiagnostics[\s\S]{0,800}render_xmlv3_theme_case|render_xmlv3_theme_case[\s\S]{0,800}componentDiagnostics/,
  );
  // Entry shape and severity vocabulary.
  assert.match(cardWriterMcp, /severity/);
  assert.match(cardWriterMcp, /"error"|`error`/);
  assert.match(cardWriterMcp, /"warning"|`warning`/);
  // Error-severity diagnostics route the author back to theme_update.
  assert.match(
    cardWriterMcp,
    /error[\s\S]{0,400}theme_update|theme_update[\s\S]{0,400}error/,
  );
  // theme_validate_css accepts an optional tagConfig for component checks.
  assert.match(
    cardWriterMcp,
    /theme_validate_css[\s\S]{0,600}tagConfig|tagConfig[\s\S]{0,600}theme_validate_css/,
  );
});

test('Moonloom documents the custom component normalization rules', async () => {
  const themeRendering = await readFile('references/theme-v3-rendering.md', 'utf8');

  assert.match(themeRendering, /componentDiagnostics/);
  for (const code of DIAGNOSTIC_CODES) {
    assert.match(themeRendering, new RegExp(code), `theme-v3-rendering.md must document ${code}`);
  }
  // Normalization rules custom components must satisfy.
  assert.match(themeRendering, /lowercase[\s/-]*kebab-case|kebab-case/i);
  assert.match(themeRendering, /reserved/i);
  assert.match(themeRendering, /24/);
  assert.match(themeRendering, /fall(s)? back to `?view`?|fallback[\s\S]{0,80}view/i);
  // Defaults sanitization: style / class / on* dropped, scalar values, limits.
  assert.match(themeRendering, /`style`[\s\S]{0,120}`class`|style[\s\S]{0,80}class[\s\S]{0,80}on\*/i);
  assert.match(themeRendering, /512/);
  assert.match(themeRendering, /32/);
});
