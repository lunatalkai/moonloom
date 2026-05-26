---
name: lunatalk-card-author
description: Create or edit LunaTalk private role cards through the Card Writer MCP. Use this skill whenever the user wants an AI client to write, improve, import, restructure, or iterate on a LunaTalk role card, especially when the workflow should produce a real private card rather than only text.
---

# LunaTalk Card Author

Use this skill to turn an author's idea, draft, world notes, or imported material
into a private LunaTalk role card using the Card Writer MCP.

## Required references

Read `../../references/card-writer-mcp.md` before making MCP calls. Read
`../../references/quality-rubric.md` when judging whether the card is usable.
Read `../../references/theme-v3-rendering.md` if the welcome uses HTML, XMLV3, or
Theme V3.

## Workflow

1. Capture the card goal: role premise, relationship dynamic, tone, language,
   content rating intent, and success criteria.
2. If there is no `roleId`, call `role_create_private`.
3. Patch profile fields with `role_patch_profile`.
4. Patch stable character and world context with `role_patch_detail`.
5. Patch the opening scene with `role_patch_welcome`.
6. Prefer `mode: "xmlv3"` for new visual welcomes. Use `plain` for simple text.
   Use `html` only when the author explicitly needs custom HTML or legacy HTML.
7. Optionally use `theme_bind` and `extension_enable` for Theme V3.
8. Call `validate_role`.
9. Fix blockers before moving on. Treat warnings as work items unless the author
   explicitly accepts the tradeoff.
10. Call `render_preview` and review the result with `lunatalk-render-review`.
11. Call `simulate_private_chat` with `lunatalk-chat-simulation` when behavior
    needs to be tested and the author accepts normal chat billing.
12. Summarize the card, validation result, render result, simulation result, and
    remaining risks.

## Authoring guidance

- Keep the author in the loop through conversation. The author feedback surface is
  the agent chat, not an in-app comment system.
- Do not create extra databases, review sessions, or side ledgers in the skill.
  The role card is the source of truth.
- Use Traditional Chinese for user-facing LunaTalk card content when the author
  writes in Traditional Chinese or asks for it.
- The first scene should invite the player to act immediately.
- `roleDetailDesc` should carry durable identity, backstory, constraints, speech
  style, boundaries, and world facts.
- Avoid stuffing long visual scaffolding into welcome. Move reusable visual style
  into Theme V3 where possible.

## Tool call discipline

- Generate a unique `idempotencyKey` per mutating action and reuse it for retries.
- Never directly edit a public role. Create or use an owned private role.
- If a tool returns `nextRecommendedTools`, treat it as the next normal step unless
  the author's latest instruction conflicts.
- If validation returns blockers, patch the card before publishing.

## Final response shape

Report:

- `roleId`
- what changed
- validation status
- render review status
- simulation status or why it was skipped
- recommended next action
