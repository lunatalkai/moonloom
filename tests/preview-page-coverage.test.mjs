import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const TOOLS = [
  'role_get_preview_page',
  'role_patch_preview_page',
  'role_reset_preview_page',
  'creator_image_list',
];

async function fileExists(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

test('preview page decoration has a dedicated public skill, evals, and reference', async () => {
  assert.equal(
    await fileExists('skills/lunatalk-preview-page-designer/SKILL.md'),
    true,
    'missing preview page designer skill',
  );
  assert.equal(
    await fileExists('skills/lunatalk-preview-page-designer/evals/evals.json'),
    true,
    'missing preview page designer evals',
  );
  assert.equal(
    await fileExists('references/preview-page-authoring.md'),
    true,
    'missing preview page authoring reference',
  );
});

test('preview page designer skill names all four MCP tools', async () => {
  const skill = await readFile('skills/lunatalk-preview-page-designer/SKILL.md', 'utf8');
  for (const tool of TOOLS) {
    assert.match(skill, new RegExp(tool), `skill missing ${tool}`);
  }
});

test('preview page designer skill requires a new idempotency key per saved doc', async () => {
  const skill = await readFile('skills/lunatalk-preview-page-designer/SKILL.md', 'utf8');
  assert.match(skill, /idempotencyKey/);
  // A new key must accompany each new doc; replaying an old key returns the old result.
  assert.match(skill, /new\s+idempotencyKey[\s\S]{0,200}(?:each|every|per|new doc)/i);
  assert.match(skill, /(?:replay|reus\w+)[\s\S]{0,160}(?:old|cached|previous)\s+result/i);
});

test('preview page designer skill drives the poll-until-pass image workflow', async () => {
  const skill = await readFile('skills/lunatalk-preview-page-designer/SKILL.md', 'utf8');
  assert.match(skill, /creator_image_list/);
  // Only moderationState=pass images may go into the doc.
  assert.match(skill, /moderationState/);
  assert.match(skill, /\bpass\b/);
  // After generating, poll the list until the target URL shows as pass before using it.
  assert.match(skill, /poll[\s\S]{0,200}\bpass\b/i);
});

test('preview page designer skill treats a vanished image URL as a terminal rejection', async () => {
  const skill = await readFile('skills/lunatalk-preview-page-designer/SKILL.md', 'utf8');
  // Rejected generated images are removed from the list, not written back as a status.
  assert.match(skill, /(?:disappear|vanish|remov\w+|gone|drops? out|no longer)/i);
  assert.match(skill, /terminal/i);
  // Distinguish "seen then disappeared" (terminal reject) from "never appeared" (insert lag).
  assert.match(skill, /seen[\s\S]{0,80}disappear|disappear[\s\S]{0,80}(?:after|once)\s+seen/i);
  assert.match(skill, /never\s+(?:appear|show)/i);
});

test('preview page designer skill bounds polling with backoff', async () => {
  const skill = await readFile('skills/lunatalk-preview-page-designer/SKILL.md', 'utf8');
  assert.match(skill, /backoff/i);
  assert.match(skill, /(?:bounded|upper bound|limit|do not[\s\S]{0,40}forever|stop after|window)/i);
});

test('preview page designer skill recovers from public_role_requires_clone', async () => {
  const skill = await readFile('skills/lunatalk-preview-page-designer/SKILL.md', 'utf8');
  assert.match(skill, /public_role_requires_clone/);
  // Recovery is to fall back to an existing pass image, not to retry generation.
  assert.match(skill, /(?:fall\s*back|use[\s\S]{0,40}existing)[\s\S]{0,160}pass/i);
  assert.match(skill, /(?:do not|don't)\s+re(?:-|\s)?(?:try|generat)/i);
});

test('preview page designer skill tolerates pending and handles conflict/rate-limit errors', async () => {
  const skill = await readFile('skills/lunatalk-preview-page-designer/SKILL.md', 'utf8');
  // pending is a normal, non-terminal state; do not resubmit in a tight loop.
  assert.match(skill, /pending/);
  assert.match(skill, /(?:not\s+terminal|non-terminal|normal|can\s+take\s+longer|may\s+persist)/i);
  // Concurrency and rate-limit handling.
  assert.match(skill, /version_conflict|409/);
  assert.match(skill, /rate_limited|429/);
});

test('preview page designer skill states rejection has category only, no per-node path', async () => {
  const skill = await readFile('skills/lunatalk-preview-page-designer/SKILL.md', 'utf8');
  assert.match(skill, /rejectReason/);
  assert.match(skill, /(?:category|class)/i);
  assert.match(skill, /(?:no\s+per-node|without[\s\S]{0,40}location|re-?read[\s\S]{0,60}doc)/i);
});

test('lunatalk-mcp-operator skill exposes the four preview page tools', async () => {
  const operator = await readFile('skills/lunatalk-mcp-operator/SKILL.md', 'utf8');
  for (const tool of TOOLS) {
    assert.match(operator, new RegExp(tool), `operator skill missing ${tool}`);
  }
});

test('README registers the preview page designer skill', async () => {
  const readme = await readFile('README.md', 'utf8');
  assert.match(readme, /lunatalk-preview-page-designer/);
  assert.match(readme, /preview-page-authoring\.md/);
});

test('using-moonloom routes and references the preview page designer', async () => {
  const router = await readFile('skills/using-moonloom/SKILL.md', 'utf8');
  assert.match(router, /lunatalk-preview-page-designer/);
  assert.match(router, /preview page|preview-page-authoring/i);
  assert.match(router, /preview-page-authoring\.md/);
});

test('card-writer-mcp reference documents the four preview tools with idempotency requirement', async () => {
  const reference = await readFile('references/card-writer-mcp.md', 'utf8');
  for (const tool of TOOLS) {
    assert.match(reference, new RegExp(tool), `card-writer reference missing ${tool}`);
  }
  // mutating preview tools require idempotencyKey of at least 8 characters
  assert.match(reference, /role_patch_preview_page[\s\S]{0,600}idempotencyKey/);
  assert.match(reference, /role_reset_preview_page[\s\S]{0,600}idempotencyKey/);
  assert.match(reference, /at least 8 characters/);
  // read tools carry schemaVersion but no idempotencyKey
  assert.match(reference, /role_get_preview_page[\s\S]{0,600}schemaVersion/);
  // closed response whitelist / non-leak contract
  assert.match(reference, /doc/);
  assert.match(reference, /status/);
  assert.match(reference, /rejectReason/);
});

test('mcp-client-workflow reference documents the preview decoration stage with non-happy paths', async () => {
  const workflow = await readFile('references/mcp-client-workflow.md', 'utf8');
  for (const tool of TOOLS) {
    assert.match(workflow, new RegExp(tool), `client workflow missing ${tool}`);
  }
  assert.match(workflow, /version_conflict|409/);
  assert.match(workflow, /rate_limited|429/);
  assert.match(workflow, /reject/i);
  assert.match(workflow, /public_role_requires_clone/);
});

test('preview-page-authoring reference documents schema whitelist, limits, and state machine', async () => {
  const authoring = await readFile('references/preview-page-authoring.md', 'utf8');
  // schema v1 whitelist and hard limits (author-facing contract)
  assert.match(authoring, /200\s?KB/i);
  assert.match(authoring, /200\s+blocks/i);
  assert.match(authoring, /20000|20,000/);
  assert.match(authoring, /11\s+block|block types/i);
  // image sourcing rule in author-facing language, pass-only
  assert.match(authoring, /pass/);
  assert.match(authoring, /moderationState/);
  // state machine
  assert.match(authoring, /pending/);
  assert.match(authoring, /passed/);
  assert.match(authoring, /rejected/);
  // pending tolerance + paused-visibility author-facing wording
  assert.match(authoring, /(?:not\s+terminal|non-terminal|can\s+take\s+longer|may\s+persist)/i);
  assert.match(authoring, /(?:temporarily|paused|not\s+be\s+visible|unavailable)/i);
});
