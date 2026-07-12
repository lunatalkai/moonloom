import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

// `publish_submit` does not always publish. A card can land in a human review
// queue, and the server then reports `reviewStatus: "pending"`. An agent that
// treats every successful call as "published" will either lie to the author or
// retry the call in a loop, neither of which moves the card forward.
//
// These tests pin the client contract: read the status, distinguish pending from
// passed, and do not resubmit while a card is queued for human review.

test('card-writer-mcp reference documents the publish_submit response contract', async () => {
  const cardWriter = await readFile('references/card-writer-mcp.md', 'utf8');

  const publishSection = cardWriter.slice(cardWriter.indexOf('### `publish_submit`'));
  const section = publishSection.slice(0, publishSection.indexOf('### `public_search`'));

  assert.match(
    section,
    /structuredContent\.publish/,
    'publish_submit section must tell the client where to read the result',
  );
  assert.match(
    section,
    /reviewStatus/,
    'publish_submit section must name the reviewStatus field',
  );
  assert.match(
    section,
    /pending/,
    'publish_submit section must document the pending (human review) outcome',
  );
  assert.match(
    section,
    /passed/,
    'publish_submit section must document the passed outcome',
  );
  assert.match(
    section,
    /running/,
    'publish_submit section must document the async running outcome',
  );
});

test('Moonloom tells agents not to resubmit a card queued for human review', async () => {
  const cardWriter = await readFile('references/card-writer-mcp.md', 'utf8');
  const workflow = await readFile('references/mcp-client-workflow.md', 'utf8');

  const combined = `${cardWriter}\n${workflow}`;

  // The agent must learn that retrying does not change the outcome.
  assert.match(
    combined,
    /pending[\s\S]{0,400}(do not|does not|never)[\s\S]{0,120}(resubmit|call .?publish_submit.? again|retry)/i,
    'Moonloom must instruct agents not to resubmit while reviewStatus is pending',
  );

  // The agent must not report a queued card to the author as published.
  assert.match(
    combined,
    /(pending|human review)[\s\S]{0,400}(not published|is not live|do not tell the author it is published|awaiting)/i,
    'Moonloom must stop agents from reporting a queued card as published',
  );
});

test('publish_submit guidance stays public-safe (no provenance, no internals)', async () => {
  const cardWriter = await readFile('references/card-writer-mcp.md', 'utf8');
  const publishSection = cardWriter.slice(cardWriter.indexOf('### `publish_submit`'));
  const section = publishSection.slice(0, publishSection.indexOf('### `public_search`'));

  const forbidden = [
    /card_publish\.go/i,
    /character_router/i,
    /waitReview/,            // internal DB visibility value
    /forceHumanReview/i,     // internal column
    /roleVisibility\s*=/,    // internal column assignment
    /incident/i,
    /production data/i,
    /SELECT .*FROM/i,
  ];
  for (const pattern of forbidden) {
    assert.doesNotMatch(
      section,
      pattern,
      `publish_submit guidance must not leak internals: ${pattern}`,
    );
  }
});
