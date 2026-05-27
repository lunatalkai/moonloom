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

test('creation conductor has a dedicated public skill, reference, and evals', async () => {
  assert.equal(
    await fileExists('skills/lunatalk-creation-conductor/SKILL.md'),
    true,
    'missing creation conductor skill',
  );
  assert.equal(
    await fileExists('skills/lunatalk-creation-conductor/evals/evals.json'),
    true,
    'missing creation conductor evals',
  );
  assert.equal(
    await fileExists('references/creation-workflow.md'),
    true,
    'missing creation workflow reference',
  );
});

test('creation workflow defines runway packet and stage gates', async () => {
  const skill = await readFile('skills/lunatalk-creation-conductor/SKILL.md', 'utf8');
  const reference = await readFile('references/creation-workflow.md', 'utf8');
  const evals = await readFile('skills/lunatalk-creation-conductor/evals/evals.json', 'utf8');

  assert.match(skill, /description: Use when.*end-to-end.*MCP readiness.*validation.*simulation/i);
  assert.match(skill, /Creation runway packet:/);
  assert.match(reference, /Stage Ladder/);
  assert.match(reference, /role_patch_assets/);
  assert.match(reference, /conversation_send_message[\s\S]*cost/i);
  assert.match(reference, /conversation_inspect[\s\S]*history|history[\s\S]*conversation_inspect/i);
  assert.match(reference, /publish_submit.*explicit/i);
  assert.match(reference, /language-aware hard caps/i);
  assert.match(reference, /50,000-character\s+English `roleDetailDesc`/i);
  assert.match(reference, /10,000-character\s+non-English `roleDetailDesc`/i);
  assert.match(evals, /Creation runway packet/);
  assert.match(evals, /lunatalk-iteration-director/);
});

test('router and README expose creation conductor as end-to-end workflow', async () => {
  const router = await readFile('skills/using-moonloom/SKILL.md', 'utf8');
  const readme = await readFile('README.md', 'utf8');
  const mcpWorkflow = await readFile('references/mcp-client-workflow.md', 'utf8');
  const templates = await readFile('references/card-authoring-templates.md', 'utf8');

  assert.match(router, /lunatalk-creation-conductor/);
  assert.match(router, /end-to-end|creation runway|skill queue/i);
  assert.match(readme, /lunatalk-creation-conductor/);
  assert.match(readme, /Creation runway packet|creation runway/i);
  assert.match(mcpWorkflow, /role_patch_assets/);
  assert.match(templates, /MCP asset readiness:/);
});
