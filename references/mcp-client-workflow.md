# Moonloom MCP Client Workflow

Use this reference when an external AI client needs to check whether Moonloom can
reach the LunaTalk Card Writer MCP before creating, patching, rendering,
simulating, or submitting a role card.

This is an operational readiness workflow. It does not judge writing quality and
does not replace Moonloom authoring skills.

## Readiness order

```text
client config -> auth presence -> tool availability -> stage gate -> operation plan
```

1. Confirm the AI client has a configured Card Writer MCP server.
2. Confirm authentication is present through the client integration.
3. Inspect the MCP tool list if the client exposes one.
4. Compare available tools against the intended stage.
5. Prepare schema version, idempotency keys, and rollback/patch order.
6. Hand off to the narrow Moonloom authoring or review skill.

## Credential rules

Do not print tokens, cookies, authorization headers, secrets, or full credential
values. Say whether auth appears configured, missing, or unverified.

Moonloom's published plugin config is file-based, not returned by a Card Writer
business API. `.codex-plugin/plugin.json` points `mcpServers` to `./.mcp.json`,
and `.mcp.json` defines `lunatalk-card-writer`:

```json
{
  "mcpServers": {
    "lunatalk-card-writer": {
      "type": "http",
      "url": "https://api.lunatalk.ai/mcp/card-writer"
    }
  }
}
```

The AI client loads that config during plugin installation or refresh, then
connects to the public Card Writer endpoint through its normal MCP OAuth flow.
For local development only, use `examples/local-mcp.json` with private
environment variables for a local endpoint and token.

## Tool availability

Expected Card Writer tools:

- `role_create_private`
- `role_find`
- `role_get`
- `role_patch_profile`
- `role_patch_assets`
- `role_patch_detail`
- `role_patch_welcome`
- `role_patch_document`
- optional `role_patch_jailbreak`
- optional `theme_bind`
- optional `extension_enable`
- `worldbook_find`
- `worldbook_get`
- `worldbook_entry_list`
- `worldbook_create`
- `worldbook_update`
- `worldbook_entry_create`
- `worldbook_entry_update`
- `worldbook_entry_delete`
- `worldbook_bind`
- `worldbook_unbind`
- `worldbook_bindings`
- `validate_role`
- `render_preview`
- `conversation_model_catalog`
- `conversation_create`
- `conversation_list`
- optional `conversation_load`
- `conversation_send_message`
- `conversation_turn_status`
- `conversation_inspect`
- `publish_submit`

If a tool is missing, do not invent a substitute. Either choose a workflow that
does not need it yet or ask the author to fix the client configuration.

## Reading tool results

Read tool payloads from `result.structuredContent` before evaluating them:
`validate_role` returns `report`, `render_preview` returns `render`,
conversation tools return `conversation`, `role_find` returns `roles`,
worldbook read/write/entry tools return `worldbook`, worldbook bind tools return
`binding`, and `publish_submit` returns `publish`. Preview URLs, generation
status, messages, role/worldbook search matches, entry lists, bindings, and
evaluations are inside those nested payloads, not at the JSON-RPC top level.

## Stage gates

| Stage | Required tools | Do not do yet |
|---|---|---|
| Draft-only design | none | create private role, render, simulate, publish |
| Private creation | `role_create_private`, profile/assets/detail/welcome patch tools; prefer `role_patch_document` when detail or welcome is long enough to maintain as a local file | render or simulate before validation |
| Existing role lookup | `role_find` then `role_get` when the author provides a name but not a roleId | ask the author to manually copy roleId from the URL before trying role search |
| Worldbook authoring | `worldbook_find`, `worldbook_get`, `worldbook_entry_list`, create/update/delete entry tools, then `worldbook_bind` | hide world lore inside roleDetailDesc when a reusable worldbook is intended |
| Worldbook binding check | `worldbook_bindings` for the role, then `worldbook_bind` or `worldbook_unbind` as needed | simulate before confirming the intended worldbook is attached |
| Technical validation | `validate_role` | render/simulate if blockers remain |
| Visual review | `render_preview` | treat render as writing-quality proof |
| Conversation testing | `conversation_model_catalog`, `conversation_create`, `conversation_list`, `conversation_send_message`, `conversation_turn_status`, `conversation_inspect`; optional `conversation_load` for resume/rollback | spend cost before validation and author acceptance; parse the normal chat UI for transcript data; hold a request open beyond the 60 seconds `waitMs: 60000` window |
| Public submission | `publish_submit` | submit without explicit author confirmation |

For accepted conversation tests, call `conversation_model_catalog` first and read
`recommendedModel`, model status, `costScore`, and `effectiveCostScore`. Pass the
chosen value as `model` in `conversation_send_message` when the default model is
unknown, unavailable, or unsuitable for the current client environment. Also pass
`waitMs: 60000`. The server default and cap are 60 seconds; a pending
`generationStatus` after that window is an async handoff, not a failure. Use
`conversation_turn_status` and then `conversation_inspect` for completion and
per-message evidence. Do not send another probe while the latest message is a
USER message or the latest turn is `waiting_ai` / `generating`.

## Operation packet

```text
MCP operation packet:
- client:
- configured server:
- auth status:
- tool availability:
- intended stage:
- required tools:
- missing tools:
- schemaVersion:
- idempotency plan:
- cost / public-action warnings:
- safe next operation:
- Moonloom handoff:
```

Use `schemaVersion: 2026-05-26.m1` for Card Writer tool calls. Mutating tool
calls need an `idempotencyKey` with at least 8 characters. Reuse the same key
only when retrying the same intended operation.

## Failure triage

| Symptom | Likely cause | Next move |
|---|---|---|
| No Card Writer tools visible | MCP server not configured or client not reloaded | fix client config |
| Auth error | token/cookie/session missing or expired | re-auth through client, do not print token |
| Tool exists but role not found | wrong `roleId` or role not owned by account | use owned private role |
| Tool exists but worldbook not found | wrong `worldbookId`, not owned, or not public/followable | use `worldbook_find`, fork/create an owned worldbook, then retry |
| Entry optimization is blind | entries were not listed before patching | call `worldbook_entry_list` and patch by `entryId` |
| Worldbook category rejected | entry category is not one of `rule, character, location, item, event, custom` | map the entry to an allowed category, or use `custom` |
| Validation blocker | technical role field or render safety issue | patch field, rerun `validate_role` |
| Render unavailable | preview tool missing or validation still blocked | fix tool/config or validation first |
| Conversation tools unavailable | billing/auth/tool missing, or validation not ready | fix prerequisite before spending cost |
| Publish blocked | missing confirmation or readiness failure | use publish readiness / author confirmation |

## Handoff

- Use `lunatalk-card-author` for private role creation or field patching.
- Use `lunatalk-world-engineer` before worldbook creation or entry rewrite when
  the issue is playable world rules, factions, locations, or lore compression.
- Use `lunatalk-render-review` after `validate_role` passes and preview exists.
- Use `lunatalk-chat-simulation` after validation passes and the author accepts
  normal conversation-test cost.
- Use `lunatalk-publish-readiness` before public submission.
- Use `lunatalk-collaboration-director` when the next move is a choice rather
  than a tool call.

Keep the report concise. The goal is to unblock the authoring loop, not to expose
client internals.
