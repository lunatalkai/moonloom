---
name: using-moonloom
description: Use Moonloom for LunaTalk creation workflows. Use this skill whenever the user mentions LunaTalk MCP, Moonloom, external AI clients creating LunaTalk content, role cards, Theme V3/XMLV3 card creation, render review, private chat simulation, or publishing a LunaTalk card, even if they do not explicitly say "use Moonloom."
---

# Using Moonloom

Moonloom is the skill framework for LunaTalk creation work. Use it to choose the
right specialized skill, guide the author through ideation and revision, and call
the MCP tools only when the card is ready for concrete creation, render review,
simulation, or publishing.

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
- Running regression checks or comparing Moonloom quality across archetypes: use
  `lunatalk-benchmark-runner`.

If the author asks for an end-to-end creation flow, start with `lunatalk-card-author`
and let it call validation, render review, simulation, and publish readiness as needed.

## References

- Read `../../references/card-writer-mcp.md` when tool names, arguments, endpoint,
  or auth details matter.
- Read `../../references/role-card-writing-framework.md` before writing or deeply
  revising any role card.
- Read `../../references/quality-rubric.md` when judging content quality.
- Read `../../references/theme-v3-rendering.md` when working with HTML, XMLV3, or
  Theme V3.
- Read `../../references/safety-and-cost.md` before simulation or publish actions.
- Read `../../examples/synthetic-card-briefs.md` when running benchmark or
  regression checks.

## Operating principles

- Use the authenticated LunaTalk account; do not invent separate MCP scopes.
- Use idempotency keys for every mutating tool call.
- Prefer XMLV3 plus Theme V3 for new cards.
- Use Moonloom self-review, render preview, and simulation as the quality loop,
  not as optional decoration.
- Treat MCP validation as mechanical validation. It can block unsafe HTML,
  invalid XMLV3, missing fields, or publish prerequisites, but it is not
  responsible for deciding whether a card is emotionally strong, playable, or
  original enough.
- Keep writing quality inside the Moonloom skills. When a card is boring,
  generic, passive, or weak after a technical pass, revise the role-card prompt
  and authoring framework rather than expecting MCP to reject it.
- Optimize for playable loops: hook, agency, consequence, memory, progression, and
  a new hook.
- Do not call `publish_submit` until the author explicitly confirms submission.
