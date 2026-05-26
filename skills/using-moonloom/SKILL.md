---
name: using-moonloom
description: Use Moonloom for LunaTalk creation workflows. Use this skill whenever the user mentions LunaTalk MCP, Moonloom, external AI clients creating LunaTalk content, role cards, Theme V3/XMLV3 card creation, render review, private chat simulation, or publishing a LunaTalk card, even if they do not explicitly say "use Moonloom."
---

# Using Moonloom

Moonloom is a workflow router for LunaTalk creation work. Use it to choose the
right specialized skill and MCP tool sequence.

## Start here

1. Identify the author's current intent.
2. Pick the narrowest Moonloom skill that fits.
3. Load only the references needed for that workflow.
4. Keep all role edits on private cards unless the author is explicitly submitting
   a private card for public review.

## Skill routing

- Creating or editing a role card: use `lunatalk-card-author`.
- Checking HTML/XMLV3/Theme V3 rendering: use `lunatalk-render-review`.
- Testing role behavior in LunaTalk chat: use `lunatalk-chat-simulation`.
- Preparing public submission: use `lunatalk-publish-readiness`.

If the author asks for an end-to-end creation flow, start with `lunatalk-card-author`
and let it call validation, render review, simulation, and publish readiness as needed.

## References

- Read `../../references/card-writer-mcp.md` when tool names, arguments, endpoint,
  or auth details matter.
- Read `../../references/quality-rubric.md` when judging content quality.
- Read `../../references/theme-v3-rendering.md` when working with HTML, XMLV3, or
  Theme V3.
- Read `../../references/safety-and-cost.md` before simulation or publish actions.

## Operating principles

- Use the authenticated LunaTalk account; do not invent separate MCP scopes.
- Use idempotency keys for every mutating tool call.
- Prefer XMLV3 plus Theme V3 for new cards.
- Use render preview and simulation as the quality loop, not as optional decoration.
- Do not call `publish_submit` until the author explicitly confirms submission.
