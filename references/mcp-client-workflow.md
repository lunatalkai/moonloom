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
The maintained token lifecycle and recovery contract is
`references/oauth-client-lifecycle.md`; clients should support refresh-token
rotation and replace the stored refresh token after every successful refresh.

## Tool availability

Expected Card Writer tools:

- `role_create_private`
- `role_find`
- `role_get`
- `role_patch_profile`
- `role_patch_assets`
- optional `role_generate_assets` — generates an avatar and background; charges the author's score
- `mod_market_find`
- `mod_market_get`
- `mod_lineage_get`
- `mod_public_worldbook_read`
- `mod_entitlement_list`
- `mod_role_list`
- `mod_role_set_enabled`
- `mod_update_apply`
- `mod_review_list`
- `mod_purchase_quote`
- `mod_purchase_status`
- `mod_author_offer_get`
- `creator_analytics_brief`
- `role_patch_detail`
- `role_patch_welcome`
- `role_patch_talk_example`
- `role_patch_output_contract`
- `role_patch_document`
- optional `role_patch_jailbreak`
- optional `theme_bind`
- optional `theme_validate_css`
- optional `render_xmlv3_theme_case`
- optional `theme_create`
- optional `theme_update`
- optional `theme_submit`
- optional `theme_get`
- optional `theme_list_available`
- optional `theme_unbind`
- optional `theme_fork`
- optional `theme_delete`
- optional `extension_enable`
- `worldbook_find`
- `worldbook_get`
- `worldbook_entry_list`
- `worldbook_create`
- `worldbook_update`
- `worldbook_patch_document`
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
- `conversation_stop`
- `conversation_inspect`
- `publish_submit`
- optional `public_search` — read-only; finds public roles and worlds by keyword
- optional `creator_analytics_brief` — read-only; the author's own creator brief
- optional `role_get_preview_page` — read-only; the author's editable preview page
- optional `role_patch_preview_page` — saves the whole preview page document
- optional `role_reset_preview_page` — restores the default preview page
- optional `creator_image_list` — read-only; the account's asset-library images

If a tool is missing, do not invent a substitute. Either choose a workflow that
does not need it yet or ask the author to fix the client configuration.

## MOD marketplace: safe reads and approved mutations

Use `schemaVersion: 2026-07-23.mod-marketplace.v1` for all MOD marketplace
calls. This is a separate contract from Card Writer authoring's
`2026-05-26.m1` schema.

`mod_market_find` has no rollout attempt metadata requirement. Call discovery
with its documented search filters; a normal retry uses the same request
parameters and the server remains authoritative about the returned result.
`mod_role_set_enabled` likewise has no rollout attempt metadata requirement.
Its authorization, role access, installed-MOD, and entitlement checks are the
only availability gates described by this contract.

Commerce remains distinct: call `mod_purchase_status` with the same
`idempotencyKey` for the same intended purchase and its status recovery. Do not
rotate that key merely because a response was lost or an error was observed.

The read surface includes:

- Discovery: `mod_market_find`, `mod_market_get`, `mod_lineage_get`, and
  `mod_public_worldbook_read`.
- `mod_market_find` accepts optional `officialOnly: true` for an official-only
  result set. Omit it or use `false` for the normal official-plus-community
  discovery result.
- To find the same author's other listed MODs, reuse the positive
  `authorAccountNumId` returned in public marketplace author metadata. This is
  a public numeric author identifier; never pass, infer, or reveal an account
  UUID or another private account identifier.
- A public market item may expose optional `backgroundUrl` (the 2:1
  marketplace/detail visual) and `avatarUrl` (the independent 1:1 role/picker
  visual) from its immutable last-published release. `iconUrl` remains a legacy
  display field. Do not substitute, crop, or infer between these slots, and do
  not expect internal image IDs in public structured output.
- Raw MOD media upload and author media mutation are not exposed through MCP.
  Do not invent URL/base64 mutation fields; use the first-party LunaTalk editor,
  which enforces ownership, dimensions, and moderation.
- The public-worldbook reader is addressed by `modId`, returns only a public
  read-only document, and is not an authoring handle.
- Personal state: `mod_entitlement_list` and `mod_role_list`; the latter may
  report `suspended_expired` for a MOD already attached to a role.
- Social proof: `mod_review_list`.
- `mod_purchase_quote` passes the shared acquisition gate before it can return
  a price. The gate requires the authorized rollout, enforced runtime, and
  reconciliation readback. All point-priced plans, including lifetime, require
  a fresh successful reconciliation readback within the 24-hour window before
  quote, purchase, or renewal. The quote fails closed if any prerequisite is
  unavailable. Do not retry around or bypass that denial.
- `mod_purchase_status` remains readable for the authenticated caller's own
  idempotency key when a quote is unavailable, so a prior first-party purchase
  can still be checked safely; it does not bypass the acquisition gate or
  authorize a new purchase, claim, or renewal.

`mod_public_worldbook_read` is the adjusted, equivalent accessible-worldbook
contract. It is addressed by `modId`, returns only public read-only
recommendations and entries, and never exposes a storage ID or an update/delete
authoring path. The last-published MOD release owns the immutable worldbook
snapshot returned here: unpublished live binding or entry edits remain invisible
until a newer MOD release is approved and promoted.

Three writes and one author-only read are approved:

- `mod_role_set_enabled` may change the caller's personal MOD
  state only for a role authored by caller or a role for which caller has a
  CURRENT conversation; unrelated roles are not exposed. The MOD must be
  installed, and enabling requires an active entitlement. The shared server
  policy is authoritative and retries are idempotent.
- `mod_update_preview` always precedes an update. Explain the
  target version, affected role count, parameter migration, and worldbook
  snapshot impact to the user.
- `mod_update_apply` requires the preview's `previewToken`,
  `expectedInstalledVersion`, and explicit `confirm: true`. On a stale preview
  or version conflict, discard it and preview again.
- `mod_author_offer_get` is read-only and can return only the authenticated
  author's own plans and discounts.

Authentication, role access, installed-MOD, entitlement, lifecycle, and update
precondition denials remain authoritative. Do not bypass a denial or invent
another mutation.

There is no MCP purchase, free-claim, review-write, helpful/reply, favorite,
offer-mutation, or expiry-acknowledgement tool. In particular,
`mod_purchase`, `mod_review_write`, `mod_review_helpful_set`,
`mod_review_reply`, `mod_favorite_set`, and `mod_author_offer_put` are not
exposed. A quote is information only: purchase or renewal must happen in the
LunaTalk first-party UI.

If a chat action receives `user_confirmation_required`, stop and tell the user
that the first-party UI must confirm renewal or removal before sending again.
Do not auto-ack, auto-renew, or auto-purchase; do not retry the message with a
made-up acknowledgement field.

The marketplace DTOs are public-safe: they must not expose an account UUID, a
private worldbook, a closed MOD implementation, source JSON, or another
person's order/expiry data. Do not infer hidden details from an unavailable or
not-found result.

Also inspect `initialize` capabilities when the client exposes them. Card Writer
adds `capabilities.lunatalkPreview` with the clean preview paths and inline
XMLV3 case interface:

- `desktopPath` and `mobilePath`: both point to `/pages/mcp/rolePreview` on the
  corresponding app origin.
- `inlinePayloadStoragePrefix`: `lunatalk:mcp-preview:payload:`.
- `inlineQueryParams`: `payloadKey`, `xml`, `themeCss`, `themeMode`,
  `stateJson`, `roleName`, and `viewport`.
- `supportedViewports`: `desktop` and `mobile`.

For inline XMLV3 preview probes, store `{ xml, themeCss, themeMode, state,
roleName }` in localStorage or sessionStorage under
`lunatalk:mcp-preview:payload:<payloadKey>`, then open
`/pages/mcp/rolePreview?payloadKey=<payloadKey>&viewport=desktop` and repeat
with `viewport=mobile`. After render, inspect screenshots and
`report.surfaceDiagnostics` when `window.__LUNATALK_MCP_PREVIEW__` is
available. Moonloom uses this for content review, not for renderer regression
testing.

For custom Theme V3 work, prefer the MCP-rendered case loop over local storage
probes when the tools are available:

1. Draft XMLV3 plus Theme V3 CSS for the role atmosphere, worldview, story mood,
   custom action hierarchy, or custom `tone` hooks.
2. Call `theme_validate_css` and read `structuredContent.theme`.
3. Call `render_xmlv3_theme_case` and read `structuredContent.render.previewUrl`.
4. Run Visual Check in desktop and mobile. Inspect screenshots plus
   `window.__LUNATALK_MCP_PREVIEW__` when the client exposes it.
5. Fix XMLV3 or Theme V3 CSS when contrast, layout, unresolved custom tone,
   overflow, or mobile touch target problems appear.
6. Stop after at most 3 loops / 3 iterations and report any remaining risk.
7. Call `theme_create` or `theme_update`, then `theme_bind`, then read
   `structuredContent.binding`. The binding must show the expected `roleId`,
   `mode`, and `themeId` or `snapshotBound`.
8. Call real `render_preview`. The preview payload must include the bound theme,
   and `structuredContent.render.structuredReport.surfaceDiagnostics` should
   show `themeStyleHookCount > 0` and `unresolvedToneCount == 0` for custom
   tones. If the preview payload lacks the bound theme, treat it as default
   fallback and fix binding before Visual Check.
9. Call `theme_submit` only when the author wants the Theme V3 itself submitted
   to public market review. Read `structuredContent.theme.reviewStatus` and
   expect `pending`.

Official themes are read-only: `theme_update` or `theme_delete` on an official
theme returns `official_theme_read_only`. Call `theme_fork` first to get an
owned, editable copy — this creates a new independent `themeId`, unlike
`theme_bind(mode: "forked")`, which only freezes a CSS snapshot onto one role
and does not create a new theme record. Use `theme_unbind` to remove a role's
Theme V3 binding without deleting the theme, and `theme_delete` to remove an
owned theme the author no longer needs; deleting a theme automatically unbinds
every role that still referenced it.

For long role or worldbook fields, prefer direct deep patch. Read the current
field with `role_get`, `worldbook_get`, or `worldbook_entry_list`, compute the
SHA-256 of the exact current field text, then send only a small `TextDeepPatch`
through MCP. Use `replaceText`, `insertText`, `deleteText`, `appendText`, or
`prependText`; include `baseSha256` for conflict protection. The server rejects
stale bases and non-unique anchors before mutating the card.

Use `role_patch_detail`, `role_patch_welcome`, `role_patch_output_contract`, and
`role_patch_jailbreak` with `patch.deepPatch` for one-field edits. Use
`role_patch_profile` with `patch.textPatches.roleDesc` for role description.
Use `role_patch_document` with `document.fieldPatches` when several role text
fields must change together. For worldbooks, use `worldbook_update`
`textPatches.description`, `worldbook_entry_update.contentDeepPatch`, or
`worldbook_patch_document` entry/metadata patches.

## Reading tool results

Read tool payloads from `result.structuredContent` before evaluating them:
`validate_role` returns `report`, `render_preview` returns `render`,
conversation tools return `conversation`, `role_find` returns `roles`,
worldbook read/write/entry tools return `worldbook`, document patch tools return
`document`, direct deep patch role tools may return `patch` or `textPatches`,
worldbook bind tools return `binding`, `theme_bind` returns `binding`,
`theme_submit`, `theme_get`, `theme_create`, `theme_update`, `theme_fork`,
`theme_unbind`, and `theme_delete` all return `theme`, and `publish_submit`
returns `publish`.
`public_search` returns `search`, `creator_analytics_brief` returns
Preview URLs, generation status, messages, role/worldbook search
matches, entry lists, bindings, and evaluations are inside those nested payloads,
not at the JSON-RPC top level.

## Stage gates

| Stage | Required tools | Do not do yet |
|---|---|---|
| Draft-only design | none | create private role, render, simulate, publish |
| Private creation | `role_create_private`, profile/assets/detail/welcome/talkExample/output-contract patch tools; use direct `deepPatch` / `textPatches` for small edits to long existing fields, or `role_patch_document.fieldPatches` for coordinated multi-field edits | render or simulate before validation |
| Existing role lookup | `role_find` then `role_get` when the author provides a name but not a roleId | ask the author to manually copy roleId from the URL before trying role search |
| Creator analytics brief | `creator_analytics_brief` when the author asks for trend-aware next steps, owned-card insight, writing suggestion, or creative opportunity | treat analytics as a writing-quality gate; force low-confidence observations into a final premise |
| MOD marketplace | `mod_market_find` / `mod_market_get` for public discovery; `mod_entitlement_list` and `mod_role_list` for use state; role-scoped `mod_role_set_enabled`; `mod_update_preview` then explicit confirmation and `mod_update_apply`; `mod_author_offer_get` for the author's own offers | bypass authentication, role access, entitlement, lifecycle, acquisition, or update preconditions; purchase, renewal, claiming, review/favorite/offer writes, or expiry acknowledgement through MCP |
| Worldbook authoring | `worldbook_find`, `worldbook_get`, `worldbook_entry_list`, create/update/delete entry tools, direct `contentDeepPatch` / `textPatches` for small edits, or `worldbook_patch_document` for coordinated metadata/entry/binding updates, then `worldbook_bind` | hide world lore inside roleDetailDesc when a reusable worldbook is intended |
| Worldbook binding check | `worldbook_bindings` for the role, then `worldbook_bind` or `worldbook_unbind` as needed | simulate before confirming the intended worldbook is attached |
| Technical validation | `validate_role` | render/simulate if blockers remain |
| Visual review | `render_preview` | treat render as writing-quality proof |
| Conversation testing | `conversation_model_catalog`, `conversation_create`, `conversation_list`, `conversation_send_message`, `conversation_turn_status`, `conversation_inspect`; optional `conversation_load` for resume/rollback | spend cost before validation and author acceptance; parse the normal chat UI for transcript data; hold a request open beyond the 60 seconds `waitMs: 60000` window |
| Preview page decoration | `role_get_preview_page`, `role_patch_preview_page`, `creator_image_list`; optional `role_reset_preview_page` and `role_generate_assets` for a private role | place an image whose `moderationState` is not `pass`; reuse an idempotency key across different documents; report a `pending` page as live |
| Public submission | `publish_submit` | submit without explicit author confirmation |

## Preview page decoration stage

The preview page is the author-controlled long-form section on a role's detail
screen — a whitelisted block document, not free HTML. Route this work to
`lunatalk-preview-page-designer` and read `preview-page-authoring.md` for the
schema, limits, and moderation states. The happy path is
`read -> save -> poll -> settle`, but plan for the non-happy paths from the
start:

```text
role_get_preview_page (version) -> build whitelisted doc -> creator_image_list (pass only)
  -> role_patch_preview_page (fresh idempotencyKey, version) -> poll role_get_preview_page
```

- **read**: `role_get_preview_page` returns `{ doc, status, version, rejectReason }`.
  `status: "none"` is a normal empty state, not an error. Keep the `version`.
- **save**: `role_patch_preview_page` takes the whole document plus the read
  `version` and a **new** `idempotencyKey` per document — the server caches by key,
  so replaying an old key ignores a changed document.
- **poll**: after a save, `status` is usually `pending`. That is non-terminal and
  can take longer than a few seconds; poll with backoff and do not resubmit.
- **reset**: `role_reset_preview_page` restores the default and is idempotent.

Non-happy paths:

- `version_conflict` (409-style): the page changed since the read `version` —
  re-read, reapply, save again.
- `rate_limited` (429-style): saving or generating too quickly — back off and
  retry, not in a tight loop.
- `rejected`: `rejectReason` is a category only, with no per-node path — re-read
  the document, self-check against the category, and save a corrected version with
  a fresh key.
- Image selection: only `creator_image_list` entries with `moderationState: "pass"`
  may go into the document. A generated image enters the library under review;
  poll the list until its URL reads `pass`. A generated URL that was seen and then
  disappeared is a terminal rejection (the row was removed); one that never
  appeared is insert lag.
- `public_role_requires_clone`: `role_generate_assets` only runs for a private
  role the account owns. For a public role it returns this code — do not retry
  generation; fall back to an existing `pass` image or drop the image block.

For accepted conversation tests, call `conversation_model_catalog` first and read
`recommendedModel`, model status, `costScore`, `effectiveCostScore`,
`thinkingDepthOptions`, and `defaultThinkingDepth`. Pass the chosen model value
as `model` in `conversation_send_message` when the default model is unknown,
unavailable, or unsuitable for the current client environment. If the selected
model exposes thinking metadata, choose from its `thinkingDepthOptions`. Pass the selected value as `thinkingDepth`; use `defaultThinkingDepth` only when the author accepts the quality/cost tradeoff. Also pass `waitMs: 60000`. The server
default and cap are 60 seconds; a pending
`generationStatus` after that window is an async handoff, not a failure. Use
`conversation_turn_status` and then `conversation_inspect` for completion and
per-message evidence. Do not send another probe while the latest message is a
USER message or the latest turn is `waiting_ai` / `generating`.
When token telemetry is present, include `inputTokens`, `outputTokens`,
`cacheReadTokens`, and `cacheReadRatio` in the cost/caching note for the run. A
high `inputTokens` value with low `cacheReadRatio` is a token-economy signal:
inspect author-visible field bloat, worldbook bindings, and repeated setup
before paying for repeated probes. Server prompt-cache internals belong outside
Moonloom.

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
| Preview save rejected on image | image `moderationState` is not `pass` | pick a `pass` image from `creator_image_list`, or wait for a generated one to read `pass` |
| Preview save conflict / rate limit | stale `version` or too many saves | re-read `version` and reapply, or back off and retry |
| Generation blocked on preview image | target role is public | do not retry; use an existing `pass` image or drop the image block |
| `user_confirmation_required` | a role's enabled MOD is expired | stop; ask the user to use the first-party UI to renew or remove it, then read `mod_role_list` again |

## Handoff

- Use `lunatalk-card-author` for private role creation or field patching.
- Use `lunatalk-world-engineer` before worldbook creation or entry rewrite when
  the issue is playable world rules, factions, locations, or lore compression.
- Use `lunatalk-render-review` after `validate_role` passes and preview exists.
- Use `lunatalk-chat-simulation` after validation passes and the author accepts
  normal conversation-test cost.
- Use `lunatalk-publish-readiness` before public submission.
- Use `lunatalk-preview-page-designer` for preview page decoration: building the
  whitelisted document, selecting or generating `pass` images, saving through
  `role_patch_preview_page`, and driving the moderation and image polling loops.
- Use `lunatalk-collaboration-director` when the next move is a choice rather
  than a tool call.

Keep the report concise. The goal is to unblock the authoring loop, not to expose
client internals.
