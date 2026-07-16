---
name: lunatalk-mcp-operator
description: Use when an external AI client needs Moonloom MCP setup, Card Writer MCP readiness, tool availability, auth status, idempotency planning, client configuration triage, or safe stage-gating before role creation, render, simulation, or publish actions.
---

# LunaTalk MCP Operator

Use this skill when the authoring problem is operational: the AI client must
confirm that the Card Writer MCP is reachable and that the needed tools are
available before Moonloom creates, patches, renders, simulates, or publishes.

The output is an MCP operation packet and handoff, not a role card, not a
credential dump, and not a writing-quality review.

## Required references

Read `../../references/mcp-client-workflow.md` first. Read
`../../references/card-writer-mcp.md` when exact Card Writer tool names,
arguments, schema version, idempotency, normal billing, or publish confirmation
matter. Read `../../references/safety-and-cost.md` before simulation or public
submission. Read only the narrow Moonloom writing reference after the operation
packet names the next authoring stage.

## Boundary

Do not print tokens, cookies, auth headers, or secret values. Report auth as
configured, missing, expired, or unverified.

Do not call mutating Card Writer tools from this skill. Creation, patching,
rendering, billed conversation testing, and publishing belong to the downstream
Moonloom skill after readiness is clear.

Do not invent tools or scopes. Moonloom uses the client-configured MCP server and
the authenticated LunaTalk account.

## Workflow

1. Identify the client and intended stage: setup, draft-only, create private
   role, patch, validate, render, conversation test, or publish.
2. Check whether the client has a Card Writer MCP server configured.
3. If the client can list MCP tools, compare the tool availability with the
   intended stage.
4. Verify auth posture without revealing credentials.
5. Prepare `schemaVersion`, idempotency plan, cost warnings, and public-action
   warnings for the next stage.
6. If prerequisites are missing, give the smallest config/auth/tool fix.
7. If prerequisites are ready, hand off to the narrow Moonloom skill.

## Output format

Return:

```text
MCP operation packet:
- client:
- configured server:
- auth status:
- intended stage:
- tool availability:
- required tools:
- missing tools:
- schemaVersion:
- idempotency plan:
- cost / public-action warnings:
- safe next operation:
- Moonloom handoff:

Self-review:
- no credentials printed:
- no environment-specific URL hard-coded:
- no tool invented:
- mutating action deferred to downstream skill:
- stage gate is correct:
```

## Stage routing

- Setup/auth/tool list problems: stay in `lunatalk-mcp-operator`.
- Draft-only ideation, blueprinting, packets, collaboration, quality, or profile
  work: do not require MCP yet; route to the narrow Moonloom writing skill.
- Private creation or field patching: hand off to `lunatalk-card-author`.
- Validation and render evidence: hand off to `lunatalk-render-review` only after
  `validate_role` has no blockers and `render_preview` is available.
  When inspecting raw JSON-RPC output, unwrap `result.structuredContent.report`
  for validation and `result.structuredContent.render` for preview URLs and
  render evaluation.
- Custom Theme V3 authoring: require `theme_validate_css`,
  `render_xmlv3_theme_case`, `theme_create`, `theme_update`, `theme_submit`,
  and `theme_bind` before promising a custom themed XMLV3 card. The safe loop is
  `theme_validate_css` -> `render_xmlv3_theme_case` -> Visual Check desktop and
  mobile -> patch XMLV3 or Theme V3 CSS -> repeat for at most 3 loops /
  3 iterations -> `theme_create` or `theme_update` -> `theme_bind` -> real
  `render_preview`. Use `theme_submit` only when the author wants public market
  review for the theme artifact. If these tools are missing, do not invent a
  replacement.
- Official themes are read-only: `theme_update` or `theme_delete` on an
  official theme returns `official_theme_read_only`. Call `theme_fork` first to
  get an owned, editable copy — this makes a new independent `themeId`, unlike
  `theme_bind(mode: "forked")`, which only freezes a CSS snapshot onto one role.
  Use `theme_unbind` to remove a role's Theme V3 binding, and `theme_delete` to
  remove an owned theme the author no longer needs (this automatically unbinds
  any roles still using it).
- Behavior testing: hand off to `lunatalk-chat-simulation` only after validation
  is ready and the author accepts normal conversation-test cost. The required
  tools are `conversation_create` or `conversation_list`, plus
  `conversation_send_message` and `conversation_inspect`. `conversation_load` is
  optional and mutating; use it only for explicit resume or rollback. Unwrap
  `result.structuredContent.conversation` before reading conversation payloads.
- Public submission: hand off to `lunatalk-publish-readiness`; require explicit
  author confirmation before `publish_submit`.
- Preview page decoration: require `role_get_preview_page`,
  `role_patch_preview_page`, and `creator_image_list`, plus optional
  `role_reset_preview_page` and (for a private role) `role_generate_assets`, then
  hand off to `lunatalk-preview-page-designer`. The mutating tools
  (`role_patch_preview_page`, `role_reset_preview_page`) need `schemaVersion` and
  an `idempotencyKey` of at least 8 characters, with a new key per document; the
  read tools (`role_get_preview_page`, `creator_image_list`) take `schemaVersion`
  but no `idempotencyKey`. Do not save a preview page or place an image whose
  `moderationState` is not `pass` from this operator skill; that belongs to the
  downstream designer skill.

## Quality rules

- Do not let operational readiness skip Moonloom writing quality. A technically
  reachable MCP server does not mean the card is ready.
- Do not let missing MCP block draft-only work. The agent can still create
  premise, blueprint, collaboration, token, presentation, or quality packets.
- Do not retry mutating calls with new idempotency keys unless the intended
  operation changed.
- Do not mark custom Theme V3 ready from text alone; require Visual Check
  evidence before handing off to final render review.
- Keep output public-safe. Do not mention deployment details,
  environment-specific URLs, account implementation details, or unsupported
  platform claims.
