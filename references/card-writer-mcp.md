# Card Writer MCP Reference

Use this reference when a Moonloom skill needs concrete Card Writer MCP details.

## Endpoint

Moonloom's published plugin exposes the production Card Writer MCP endpoint in
the root `.mcp.json`:

```text
https://api.lunatalk.ai/mcp/card-writer
```

The plugin manager discovers that file through `.codex-plugin/plugin.json`:
`mcpServers: "./.mcp.json"`. This config is static plugin metadata, not a
Card Writer tool response. Actual MCP JSON-RPC requests use HTTP
POST `/mcp/card-writer` on the LunaTalk API host.

The MCP `initialize` response exposes the preview interface under
`capabilities.lunatalkPreview`. Clients should read this capability instead of
hard-coding hidden paths when possible:

```json
{
  "desktopPath": "/pages/mcp/rolePreview",
  "mobilePath": "/pages/mcp/rolePreview",
  "inlinePayloadStoragePrefix": "lunatalk:mcp-preview:payload:",
  "inlineQueryParams": ["payloadKey", "xml", "themeCss", "themeMode", "stateJson", "roleName", "viewport"],
  "supportedViewports": ["desktop", "mobile"]
}
```

Long text edits should use direct deep patch instead of an upload flow. Read the
current role or worldbook content, compute the SHA-256 of the exact current text,
then call the normal patch tool with a small `TextDeepPatch` object:

- `role_patch_profile`: `patch.textPatches.roleDesc`
- `role_patch_detail`, `role_patch_welcome`, `role_patch_output_contract`,
  `role_patch_jailbreak`: `patch.deepPatch`
- `role_patch_document`: `document.fieldPatches` for multi-field role edits
- `worldbook_update`: `textPatches.description`
- `worldbook_entry_update`: `contentDeepPatch` or `textPatches.content`
- `worldbook_patch_document`: metadata `textPatches.description` and entry
  `contentDeepPatch` / `textPatches.content`

Full replacement is still supported by sending the original field name, for
example `roleDetailDesc`, `roleWelcome`, `roleOutputContract`, or worldbook
entry `content`. Deep patch is the preferred path for small edits to long
existing fields because only the old/new anchors and inserted text pass through
MCP arguments.

A dedicated `role_patch_*` tool will not replace a text field with nothing. If
the replacement value is empty — including when the payload was shaped wrongly
and the field never arrived — the call returns `empty_field_patch` and the stored
field is left alone. These tools take a bare string, so a malformed request and a
deliberate erasure look identical to them, and the malformed one used to win.
To edit part of a field use `patch.deepPatch`; to replace it put the whole new
text in the patch field; to genuinely empty a field use `role_patch_document`,
whose `document.fields` entries are explicit. A `deepPatch` that shortens a
field is untouched by this — that is an explicit operation.

Every text patch response carries `fieldChars` with the field's `before` and
`after` length, so a caller can confirm the write landed without paying for a
`validate_role` round trip.

When a patch does not apply, the error identifies which operation failed rather
than rejecting the batch as a whole. `invalid_field_patch` carries
`operationIndex`, the `anchorField` and `anchor` that missed, a `reason` of
`anchor_not_found`, `anchor_not_unique`, or `invalid_operation`, plus
`matchCount` for a repeated anchor and `nearestContext` — the surrounding text at
the closest place the anchor almost matched. Fix that one operation instead of
regenerating the whole patch: a near-miss usually means one wrong character, and
`nearestContext` shows what is actually stored there.

Configure authentication through the AI client's normal MCP OAuth flow. Do not
print credentials, tokens, cookies, or authorization headers in skills, prompts,
references, reports, or public examples. For local development only, use
`examples/local-mcp.json` with private environment variables.

Moonloom does not add separate MCP scopes. The server enforces account identity,
role ownership, normal publish gates, quota, moderation, and billing.

## Schema version

Card Writer authoring tool calls use:

```json
{
  "schemaVersion": "2026-05-26.m1"
}
```

Mutating tools also require `idempotencyKey` with at least 8 characters. Generate
a stable key per intended operation; retrying the same operation should reuse the
same key.
`mod_market_find` has no rollout attempt metadata requirement. Use only the
parameters. `mod_role_set_enabled` also has no rollout attempt metadata
Commerce remains distinct: call `mod_purchase_status` with the same
- `mod_market_find`: search public MODs. Set optional `officialOnly: true` only
- `mod_market_get`: read a public MOD summary, public-worldbook summary, and
- `mod_lineage_get`: read public parent/ancestor/descendant relationships.
- `mod_public_worldbook_read`: read the public, read-only worldbook bound to a
- `mod_entitlement_list`: list the authenticated user's usable MOD assets and
- `mod_role_list`: list the authenticated user's selected role MOD states. A
- `mod_review_list`: read public ratings, review summaries, and comments.
- `mod_purchase_quote`: read a current price for a plan only after the shared
- `mod_purchase_status`: remains readable for the authenticated user's own
The adjusted `mod_public_worldbook_read` tool is the equivalent public contract
- `mod_role_set_enabled`: enable or disable an installed MOD in the caller's
- `mod_update_apply`: call only after explicit user confirmation, passing the
- `mod_author_offer_get`: read only the authenticated author's own
`mod_purchase`, `mod_review_write`, `mod_review_helpful_set`,
`mod_review_reply`, `mod_favorite_set`, `mod_author_offer_put`, renewal,
`mod_role_list`. Do not auto-ack, auto-renew, or auto-purchase; never invent an

## Response envelope

MCP clients receive each tool result inside the normal JSON-RPC
`result.structuredContent` envelope. Unwrap the tool-specific payload before
reading fields:

- `validate_role`: read `structuredContent.report`.
- `render_preview`: read `structuredContent.render`; `previewUrl`,
  `evaluation`, and `structuredReport` live there.
- Conversation tools: read `structuredContent.conversation`; this includes
  `conversationId`, `turn`, `latestMessage`, `messages`, `evaluation`, and
  per-message `previewUrl`.
- `public_search`: read `structuredContent.search`; this includes public role
  and world summaries only.
- `creator_analytics_brief`: read `structuredContent.creatorAnalytics`; this
  includes Creator Brief, period range, metric contract, confidence guidance,
  and next recommended tools.
- Worldbook tools: read `structuredContent.worldbook`; this includes worldbook
  summaries, detail payloads, and entry lists.
- `worldbook_patch_document`: read `structuredContent.document`; this includes
  metadata update status, created entry ids, update/delete counts, and binding
  status, and text patch summaries when applicable.
- Direct role patch tools return role metadata, and when a deep patch was used
  also return `structuredContent.patch` or `structuredContent.textPatches`.
- `role_generate_assets`: no wrapper key. Read `roleAvatar`, `roleBackground`,
  `generated`, and `chargedScore` directly off `structuredContent`.
- Worldbook bind tools: read `structuredContent.binding`; this includes target
  type, target id, active bindings, and next recommended tools.
- `publish_submit`: read `structuredContent.publish`.

Do not assume `previewUrl`, `messages`, `entries`, `bindings`, or `evaluation`
are top-level fields of the JSON-RPC response.

## Core tool order

0. Optional trend-aware planning: `creator_analytics_brief` when the author asks
1. `role_create_private`, or `role_find` then `role_get` when the author gives a name instead of a roleId
2. `role_patch_profile`
3. `role_patch_assets`
4. `role_patch_detail`
5. `role_patch_welcome`
6. `role_patch_talk_example` when compact Example Chat samples are needed for
   voice, refusal, interaction rhythm, or output-shape calibration
7. `role_patch_output_contract` when the card needs an author-locked reply
   format example for stable visible structure
8. `role_patch_document` for coordinated multi-field updates; use
   `document.fieldPatches` for small changes to long existing fields
9. `theme_bind` when XMLV3 real chat controls are expected (`theme_fork` first
   when the starting point is an official or public theme, since official
   themes are read-only); optional `extension_enable` for specific packs;
   `theme_unbind` to remove a binding, `theme_delete` to remove an owned theme
   record
10. Optional worldbook loop: `worldbook_find` / `worldbook_create`,
   `worldbook_get`, `worldbook_entry_list`, entry create/update/delete,
   `worldbook_patch_document` for coordinated metadata/entry/binding updates,
   then `worldbook_bind`
11. `validate_role`
12. `render_preview`
13. `conversation_model_catalog` before paid conversation testing
14. `conversation_create` or `conversation_list`
15. `conversation_send_message`
16. `conversation_turn_status` when the send result is still pending
17. `conversation_inspect`
18. Optional `conversation_load` when the author wants to resume or roll back
19. `publish_submit` only after explicit author confirmation

For public marketplace discovery, use `public_search` instead of `role_find`.
`role_find` is for owned cards; `public_search` searches public roles and worlds
and returns public summaries plus public role ids that can be tested with
`conversation_model_catalog` and `conversation_create`.

For creator trend decisions, use `creator_analytics_brief` before ideation or
repair. It is read-only, returns `structuredContent.creatorAnalytics`, and is a
decision aid rather than a writing-quality gate.

## Theme V3 custom authoring loop

Use this loop when XMLV3 needs a custom Theme V3 for role atmosphere, worldview,
story mood, custom action hierarchy, or custom `tone` values. Do not accept a
custom visual package from text review alone.

1. Draft XMLV3 and Theme V3 CSS as a synthetic case.
2. Call `theme_validate_css`; read `structuredContent.theme`.
3. Call `render_xmlv3_theme_case`; read `structuredContent.render.previewUrl`,
   `evaluation`, and `structuredReport.surfaceDiagnostics`.
4. Run Visual Check on desktop and mobile. Inspect screenshot output and
   `window.__LUNATALK_MCP_PREVIEW__` when available.
5. Patch XMLV3 or Theme V3 CSS when contrast, layout, unresolved custom tone,
   overflow, touch target, or hierarchy problems appear.
6. Repeat the loop for at most 3 loops / 3 iterations, then report remaining
   visual risks.
7. When the case passes, call `theme_create` or `theme_update`, then `theme_bind`
   for the private role. Finish with `validate_role` and `render_preview`.
   Use `theme_submit` only when the author wants the Theme V3 itself to enter
   public market review.

Theme tool payloads live under `structuredContent.theme`; case and role preview
payloads live under `structuredContent.render`. The expected Theme V3 tool set
for custom authoring is `theme_validate_css`, `render_xmlv3_theme_case`,
`theme_create`, `theme_update`, `theme_submit`, `theme_get`,
`theme_list_available`, `theme_bind`, `theme_unbind`, `theme_fork`, and
`theme_delete`.

### Custom component diagnostics

`theme_validate_css`, `theme_create`, `theme_update`, and
`render_xmlv3_theme_case` return a `componentDiagnostics` array describing how
the Theme V3 `tagConfig.xmlv3.components` declarations were normalized. Theme
tool payloads carry it under `structuredContent.theme`; the test-case payload
carries it under `structuredContent.render`. `theme_validate_css` accepts an
optional `tagConfig` argument so a draft tagConfig can be checked before any
theme mutation.

Each entry has the shape:

```json
{
  "severity": "error",
  "code": "reserved_tag",
  "tag": "panel",
  "detail": "tag \"panel\" dropped: it collides with a reserved LunaTalk tag"
}
```

The codes share one vocabulary across LunaTalk renderers and tools:

| Code | Severity | Meaning |
|---|---|---|
| `invalid_tag_name` | `error` | tag is missing or not lowercase kebab-case; the component is dropped |
| `reserved_tag` | `error` | tag collides with a reserved LunaTalk tag; the component is dropped |
| `duplicate_tag` | `error` | tag is already declared earlier in the list; the later declaration is dropped |
| `component_limit_exceeded` | `error` | more than 24 components are declared; the extra ones are dropped |
| `invalid_extends_fallback_view` | `warning` | `extends` is not an allowed base; the component still registers with base `view` |
| `default_attr_dropped` | `warning` | one `defaults` attr was sanitized away (see `theme-v3-rendering.md` for the rules) |
| `template_parse_failed` | `error` | the `template` string is not strict, portable XMLV3 (unbalanced tags, fullwidth/unquoted attributes, comments, CDATA); the template is rejected and the component falls back to skin-only rendering |
| `template_invalid_root` | `error` | the template does not have exactly one root element; template rejected, skin-only fallback |
| `template_forbidden_tag` | `error` | the template uses a tag outside the 18 FL3 primitives + `<slot/>`; template rejected, skin-only fallback |
| `template_too_large` | `error` | the template exceeds 4096 characters, 64 nodes, or depth 8; template rejected, skin-only fallback |
| `template_multiple_slots` | `error` | more than one `<slot/>`; template rejected, skin-only fallback |
| `template_invalid_slot_position` | `error` | `<slot/>` is not directly under a container primitive; template rejected, skin-only fallback |
| `template_attr_dropped` | `warning` | a template node attr was sanitized away (`style` / `class` / `on*` or over-long value); template stays active |
| `template_unknown_placeholder` | `warning` | an attribute-value placeholder is not declared in `attributes`/`defaults`; it renders literally; template stays active |
| `template_attr_missing_default` | `warning` | a declared attribute is referenced by the template but has no default, so a missing instance attr substitutes as empty string; template stays active |
| `template_fl3_content_hidden` | `warning` | the template references content-carrying placeholders but `example` shows no children alt text, so older clients would see an empty skin; template stays active |

`error` entries mean renderers silently skip that component, so the visible
card can lose controls without any other signal. When any `error` is present,
`nextRecommendedTools` leads with `theme_update`: fix `tagConfig` first, then
rerun `render_xmlv3_theme_case` before binding or submitting. `warning` entries
do not block registration; they explain why a default attr or `extends` choice
did not survive normalization. Template `error` codes never drop the component
itself: the component still registers and renders skin-only (`extends` base +
children), only the template expansion is rejected.

### Template components and the fl3-degraded preview

`theme_create`, `theme_update`, and `theme_validate_css` accept
`tagConfig.xmlv3.components[].template` — the Feature Level 4 template
component field described in `theme-v3-rendering.md`. The same
`componentDiagnostics` array carries the `template_*` codes above, so validate
a draft tagConfig with `theme_validate_css` before mutating a theme.

`render_xmlv3_theme_case` additionally accepts an optional `viewMode`:

- `"fl4"` (default): the preview expands template components normally.
- `"fl3-degraded"`: the preview is served without the `template` fields, so
  template components render the way older clients show them — skin base plus
  children alt text. `componentDiagnostics` still reports against the original
  tagConfig, so template errors stay visible in this mode.

The output echoes the effective view in its `viewMode` field. Run one
`fl3-degraded` case for every template-using theme before binding or
publishing, and check the degraded view stays readable: each no-slot template
instance should show its one-line children alt text. If the degraded view is
not acceptable for the card, declare the card's minimum XMLV3 feature level as
`4` instead of shipping an unreadable fallback.

## Tools

### `role_create_private`

Create a private role owned by the authenticated account.

Required:

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "create-...",
  "roleName": "Role name"
}
```

Optional: `language`, `cardType`, `contentRatingIntent`, `successCriteria`.

Defaults: `language` follows the authenticated user's LunaTalk language when the
server can resolve it, `cardType` is `story`, and visibility is private.

### `role_find`

Find roles owned by the authenticated account by partial name or exact roleId.
Use this before `role_get` or `conversation_list` when the author names a card
but does not provide its roleId.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "query": "Role name",
  "pageSize": 20
}
```

Returns `structuredContent.roles.roles[]` with `roleId`, `roleName`,
`roleVisibility`, `reviewStatus`, `language`, `isR18`, `accountPermission`, and
`lastUpdateTime`.

### `public_search`

Find public roles and public worlds by keyword. Read-only: it mutates nothing and
takes no `idempotencyKey`. Use it to resolve a name the author mentioned into a
public `roleId` you can pass to `conversation_create`, or to survey what already
exists before authoring something similar.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "query": "detective",
  "pageNum": 1,
  "pageSize": 20,
  "language": "all",
  "includeNsfw": false
}
```

Only `query` is required. `language` accepts `zh-Hans`, `zh-Hant`, `en`, `ja`,
`ko`, or `all`. `pageSize` caps at 100. `includeNsfw` only takes effect when both
the account's own NSFW setting and the global switch allow it — passing `true`
does not override either.

Read `structuredContent.search`: `query`, `total`, `pageNum`, `pageSize`,
`hasNextPage`, and `results`. Page forward while `hasNextPage` is true rather
than requesting a huge `pageSize`.

Each result carries public surface only — `type`, `roleId` or `worldId`, `name`,
`description`, `avatar`, visibility, `language`, `roleType`, `isR18`, and public
counters. **Search results never include `roleDetailDesc`, `jailbreak`,
`talkExample`, or `roleOutputContract`**, even for a role the caller happens to
own; those are author-only fields reachable through owner-scoped tools such as
`role_get`. Do not build a workflow that expects a public role's prompt body to
come back from search.

### `creator_analytics_brief`

Read the authenticated author's Creator Brief before trend-aware ideation,
existing-card repair, or opportunity selection.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "period": "last30d",
  "rating": "all",
  "language": "zh-Hant"
}
```

Allowed periods are `last1d`, `last7d`, `last30d`, `last90d`, `lastMonth`,
`lastQuarter`, and `custom`. For `custom`, include `startMonth` and `endMonth`
as `YYYY-MM`. Allowed ratings are `all`, `safe`, and `r18`; allowed languages
are `zh-Hant`, `zh-Hans`, `en`, `ja`, `ko`, and `all`.

Returns `structuredContent.creatorAnalytics` with `brief`, `periodRange`,
`metricContract`, and `nextRecommendedTools`. The tool is read-only and does
not need `idempotencyKey`.

Use `confidenceLevel` to control language strength. Treat `high` as a strong
signal, `medium` as a reference, and low or insufficient signals as observation.
Do not treat creator analytics as a writing-quality gate; Moonloom writing
skills still decide premise, character, agency, detail, presentation, and
simulation repairs.

### `role_get`

Read a role owned by the authenticated account.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "roleId": "..."
}
```

### `worldbook_find`

Find worldbooks owned by the authenticated account by partial name, description,
tag, or exact `worldbookId`.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "query": "Moon city",
  "pageSize": 20
}
```

Returns `structuredContent.worldbook.worldbooks[]` with `worldbookId`, name,
description, visibility, language, tags, entry count, ownership, and update time.

### `worldbook_get`

Read a worldbook detail payload and its entries. Use this for a quick snapshot;
use `worldbook_entry_list` when doing systematic entry review or category
filtering.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "worldbookId": "..."
}
```

### `worldbook_entry_list`

List entries in a worldbook, optionally filtered by `category`. This is the
required first step before systematic entry optimization, because updates and
deletes need `entryId`.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "worldbookId": "...",
  "category": "rule"
}
```

Entries come back with `keywords` as an array of strings, the same shape
`worldbook_entry_create` and `worldbook_entry_update` accept, so an entry can be
read, edited, and written back without converting between types.

Worldbook entry fields are authoring handles, not a complete runtime contract.
`keywords` are trigger terms, `isConstant` marks an always-available entry, and
`category` supports systematic review. Allowed categories are exactly `rule`,
`character`, `location`, `item`, `event`, and `custom`. Do not invent categories
such as `faction`, `timeline`, `relationship`, or `scene`; map them to the
closest allowed category, or use `custom` when none fits. Recall is not only the
current player message as a literal keyword check: constant entries are available every turn, and non-constant entries are selected from the current
player message plus recent conversation context. A hit in the current player
message should be treated as the strongest design signal.

Worldbook recall is a bounded ranked selection, not a full import of every
related entry. The global runtime cap currently does not exceed 20 entries per
turn, with per-category competition and additional runtime ranking. This is current runtime behavior, not a permanent product contract; verify
important behavior with real conversation tests. Do not claim that worldbooks remove token limits; use them to move reusable lore and optional rules out of the
always-on role detail while keeping core identity and behavior stable in the
card.

Recall as described above is the default runtime. A conversation running in agent
mode reaches the same entries a different way: the model browses and searches
them itself, so it sees entry names first and matches against the words in the
bodies rather than against `keywords`. Both runtimes are available on any card,
so an entry needs a name that says what is inside it and a body written in the
words someone would search for, in addition to its trigger terms. See
`agent-mode-runtime.md`.

Authoring implications for AI clients:

- Make each entry a small, independently useful lore / rule / memory slice.
- Put only short every-turn invariants in `isConstant`; avoid turning constant
  entries into another long role detail.
- Give `keywords` aliases the player is likely to type: names, nicknames,
  places, objects, quest terms, and natural question phrases.
- Name entries descriptively. A name like `Location 3` is unfindable to a model
  browsing the list, and browsing is how the agent runtime starts.
- Do not require many entries from the same category to appear in one turn.
- Keep identity, voice, and behavior that must be stable every turn in the role
  fields, not only in keyed worldbook entries.

### `worldbook_entry_get`

Read one entry by `entryId`.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "entryId": "..."
}
```

Use this to check an entry you just changed. A worldbook with many entries can
exceed the response limit when listed in full, and verifying one edit does not
need the rest of the book.

### `worldbook_create`

Create a worldbook owned by the authenticated account.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "worldbook-create-...",
  "name": "Worldbook name",
  "description": "Reusable world rules.",
  "language": "zh-Hant",
  "visibility": "private",
  "tags": ["rpg", "city"]
}
```

### `worldbook_update`

Update owned worldbook metadata.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "worldbook-update-...",
  "worldbookId": "...",
  "name": "Worldbook name",
  "description": "Updated world rules.",
  "visibility": "private",
  "tags": ["rpg"]
}
```

Patch only the description when the current text is long:

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "worldbook-description-patch-...",
  "worldbookId": "...",
  "textPatches": {
    "description": {
      "baseSha256": "sha256-of-current-description",
      "operations": [
        {"op": "replaceText", "oldText": "old unique phrase", "newText": "new phrase"}
      ]
    }
  }
}
```

### `worldbook_patch_document`

Patch an owned worldbook from a locally prepared document. Use this when many
entries need to be created, updated, deleted, and bound in one authoring pass.
Use full `content` for replacement and `contentDeepPatch` / `textPatches` for
small edits to existing long entries. Short one-entry edits can still use
`worldbook_entry_create`, `worldbook_entry_update`, or `worldbook_entry_delete`.

MCP cannot read a client-local file path by itself. The AI client must read and
validate the file, then send its parsed JSON object as `document`.

Document format:

```json
{
  "documentVersion": "lunatalk.worldbookPatch.v1",
  "worldbookId": "...",
  "metadata": {
    "name": "Worldbook name",
    "description": "Reusable world rules.",
    "visibility": "private",
    "tags": ["rpg", "city"],
    "textPatches": {
      "description": {
        "baseSha256": "sha256-of-current-description",
        "operations": [
          {"op": "appendText", "text": "New metadata note."}
        ]
      }
    }
  },
  "entries": [
    {
      "op": "create",
      "name": "Moon Gate",
      "content": "The Moon Gate opens only after the bell rings.",
      "keywords": ["Moon Gate"],
      "category": "rule",
      "isConstant": false
    },
    {
      "op": "update",
      "entryId": "...",
      "name": "Moon Gate",
      "content": "Updated rule.",
      "keywords": ["Moon Gate"],
      "category": "rule",
      "isEnabled": true,
      "contentDeepPatch": {
        "baseSha256": "sha256-of-current-entry-content",
        "operations": [
          {"op": "replaceText", "oldText": "old unique rule", "newText": "new rule"}
        ]
      }
    },
    {
      "op": "delete",
      "entryId": "..."
    }
  ],
  "binding": {
    "roleId": "..."
  }
}
```

Tool call:

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "worldbook-document-...",
  "worldbookId": "...",
  "document": {
    "documentVersion": "lunatalk.worldbookPatch.v1",
    "worldbookId": "...",
    "entries": []
  }
}
```

If `document.worldbookId` is present, it must match the tool `worldbookId`.
Allowed entry operations are `create`, `update`, and `delete`. Allowed entry
categories are still exactly `rule`, `character`, `location`, `item`, `event`,
and `custom`. The response includes `structuredContent.document` and, for deep
patches, `structuredContent.document.textPatches`.

### `worldbook_entry_create`

Create an entry in an owned worldbook.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "worldbook-entry-create-...",
  "worldbookId": "...",
  "name": "Moon Gate",
  "content": "The Moon Gate opens only after the bell rings.",
  "keywords": ["Moon Gate"],
  "category": "rule",
  "isConstant": false
}
```

### `worldbook_entry_update`

Update an owned worldbook entry by `entryId`.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "worldbook-entry-update-...",
  "entryId": "...",
  "name": "Moon Gate",
  "content": "The Moon Gate opens only after the bell rings.",
  "keywords": ["Moon Gate"],
  "category": "rule",
  "isEnabled": true
}
```

For content patching, include `worldbookId` so the server can read the current
entry before applying the small patch:

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "worldbook-entry-content-patch-...",
  "worldbookId": "...",
  "entryId": "...",
  "contentDeepPatch": {
    "baseSha256": "sha256-of-current-entry-content",
    "operations": [
      {"op": "replaceText", "oldText": "old unique sentence", "newText": "new sentence"},
      {"op": "appendText", "text": "Additional rule.\n"}
    ]
  }
}
```

### `worldbook_entry_delete`

Delete an owned worldbook entry by `entryId`.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "worldbook-entry-delete-...",
  "entryId": "..."
}
```

### `worldbook_bind`

Bind a worldbook to a role card. For `targetType: "character"`, the server keeps
one active worldbook binding for the target role.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "worldbook-bind-...",
  "worldbookId": "...",
  "roleId": "..."
}
```

### `worldbook_unbind`

Remove a worldbook binding from a role card.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "worldbook-unbind-...",
  "worldbookId": "...",
  "roleId": "..."
}
```

### `worldbook_bindings`

List worldbooks currently bound to a role card.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "roleId": "..."
}
```

### `role_patch_profile`

Update profile fields.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "profile-...",
  "roleId": "...",
  "patch": {
    "roleName": "...",
    "roleDesc": "...",
    "roleTag": ["..."],
    "userName": "你",
    "roleType": "story"
  }
}
```

### `role_patch_assets`

Update the role avatar and background image URLs. Use this after a visual
identity packet exists and after the AI client, author, or app asset pipeline has
prepared public-safe image URLs. A prompt or art brief alone is not enough to
claim MCP-backed creation is complete.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "assets-...",
  "roleId": "...",
  "patch": {
    "roleAvatar": "https://...",
    "roleBackground": "https://..."
  }
}
```

If asset URLs are not available, stop before final validation/render handoff and
return the visual identity packet, image prompts, and the missing asset action.
Do not silently finish a "complete private card" without avatar and background.

### `role_generate_assets`

Generate an anime-style background image and avatar for a private role the
account owns, then write the resulting URLs onto `roleBackground` and
`roleAvatar`. Use this when no author-provided or pre-uploaded asset URL is
available and the client should produce the images directly, instead of stopping
at a prompt-only handoff. It runs the same image pipeline and billing as the
in-app generation path.

Behavior:

- Charges the account the normal image-generation points on success (an
  insufficient balance returns `insufficient_score`; a banned account returns
  `account_forbidden`; nothing is charged when generation fails).
- Auto-builds the prompt from the role fields. Pass `prompt` to override the art
  direction with a visual-identity art brief.
- `target`: `both` (background + cropped avatar, default) or `background`.
- `overwrite`: when the role already has both assets, the call is a no-op that
  returns the existing URLs and charges nothing unless `overwrite` is `true`.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "genassets-...",
  "roleId": "...",
  "target": "both",
  "prompt": "optional art-brief override; empty = auto from role fields",
  "overwrite": false
}
```

Unlike the role, theme, and worldbook tools, this one has no wrapper key: read
`roleId`, `roleAvatar`, `roleBackground`, `generated`, `chargedScore`, and
`prompt` (the final prompt used) directly off `structuredContent`. Check
`generated` to tell a real generation from an `overwrite: false` no-op, and
`chargedScore` for what the call actually cost. Retry with the same
`idempotencyKey` after a `generation_timeout` instead of issuing a fresh call, so
the account is not charged twice.

### `role_patch_detail`

Update the role detail body.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "detail-...",
  "roleId": "...",
  "patch": {
    "roleDetailDesc": "..."
  }
}
```

For small edits to existing long detail, prefer `deepPatch`:

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "detail-patch-...",
  "roleId": "...",
  "patch": {
    "deepPatch": {
      "baseSha256": "sha256-of-current-roleDetailDesc",
      "operations": [
        {
          "op": "replaceText",
          "oldText": "old unique sentence",
          "newText": "new sentence"
        },
        {
          "op": "insertText",
          "beforeText": "unique following anchor",
          "text": "inserted paragraph\n"
        }
      ]
    }
  }
}
```

For XMLV3 cards, `roleDetailDesc` should not duplicate the platform XMLV3
server guide. Put only the role-specific format contract in detail: state update
rules, choice behavior, enabled pack purpose, visible status meaning, and
player-agency boundaries.

### `role_patch_document`

Patch multiple role fields from a locally prepared document. Use `fields` for
full replacement and `fieldPatches` for direct deep patch of existing long text
fields. Short one-field edits can still use `role_patch_detail`,
`role_patch_welcome`, `role_patch_profile`, `role_patch_output_contract`, or
`role_patch_jailbreak`.

`roleTag` fields in `role_patch_profile` and `role_patch_document` accept a
plain array of tag text strings. Do not send one comma-separated string. The
server persists each item as the LunaTalk platform tag object shape
`{"icon":"","text":"...","type":2}` while preserving array order.

MCP cannot read a client-local file path by itself. The AI client must read and
validate the file, then send its parsed JSON object as `document`.

Document format:

```json
{
  "documentVersion": "lunatalk.rolePatch.v1",
  "roleId": "...",
  "fields": {
    "roleName": "Role name",
    "roleDesc": "Short public/search description.",
    "roleTag": ["story", "mystery"],
    "userName": "你",
    "roleType": "story",
    "roleAvatar": "https://...",
    "roleBackground": "https://...",
    "roleDetailDesc": "Long stable role engine...",
    "roleWelcome": "<scene><n>Opening...</n></scene>",
    "talkExample": [
      {"roleType": "user", "content": "Short player line."},
      {"roleType": "ai", "content": "Short assistant sample that demonstrates voice or output shape."}
    ],
    "roleOutputContract": "Optional short author-locked reply format example.",
    "jailbreak": "Optional private behavior boundary."
  },
  "fieldPatches": {
    "roleDetailDesc": {
      "baseSha256": "sha256-of-current-roleDetailDesc",
      "operations": [
        {"op": "replaceText", "oldText": "old unique text", "newText": "new text"}
      ]
    },
    "roleWelcome": {
      "baseSha256": "sha256-of-current-roleWelcome",
      "operations": [
        {"op": "appendText", "text": "<n>New beat.</n>"}
      ]
    },
    "roleOutputContract": {
      "baseSha256": "sha256-of-current-roleOutputContract",
      "operations": [
        {"op": "insertText", "beforeText": "</scene>", "text": "<choices>...</choices>"}
      ]
    }
  }
}
```

Tool call:

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "document-...",
  "roleId": "...",
  "document": {
    "documentVersion": "lunatalk.rolePatch.v1",
    "roleId": "...",
    "fields": {
      "roleDetailDesc": "...",
      "roleWelcome": "..."
    }
  }
}
```

Only fields present in `fields` are replaced, and only fields present in
`fieldPatches` are deep-patched. If `document.roleId` is present, it must match
the tool `roleId`. The response includes
`structuredContent.document.patchedFields` and, for deep patches,
`structuredContent.document.textPatches`.

### `role_patch_talk_example`

Update the role-level `talkExample` field. In the normal one-shot chat prompt,
this field is labeled as Example Chat and used as dialogue-style calibration,
not as current conversation history.

Use it only when compact samples teach something rules do not: voice under
pressure, refusal style, ensemble turn ownership, interaction rhythm, or one
complete assistant output shape for generator / XMLV3 cards. Keep samples short;
long samples compete with `roleDetailDesc`, `roleWelcome`, worldbook, memory, and
real history for attention.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "talk-example-...",
  "roleId": "...",
  "patch": {
    "talkExample": [
      {"roleType": "user", "content": "雨還沒停？"},
      {"roleType": "ai", "content": "「還沒。先別走。」"}
    ]
  }
}
```

`roleType` should be `user` or `ai`. Do not put version banners, working notes,
long plot dumps, or current-session summaries in `talkExample`.

### `role_patch_output_contract`

Update the author-level `roleOutputContract` field. The frontend label is
"回覆格式範例" / "Reply Format Example". In the one-shot chat prompt this field
is placed near generation as a labeled template, after normal card/history
context and before platform runtime format guides.

Use it when a card needs a stable visible reply shape that should not be
overridden by a player's personal conversation style: XMLV3 skeleton, status
panel order, choice count, generator output sections, or a compact state/action
layout. Keep it short, ideally one complete assistant reply template plus 3-5
necessary reminders. The hard cap is 2,000 characters.

Do not put version banners, working notes, long plot dumps, private data, or the
entire `roleDetailDesc` here. If the template conflicts with platform runtime
format rules, the platform guide wins.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "reply-format-...",
  "roleId": "...",
  "patch": {
    "roleOutputContract": "<scene><panel>狀態</panel><choices>...</choices></scene>"
  }
}
```

For targeted fixes to an existing format template, use `patch.deepPatch` with
the same `TextDeepPatch` shape as `role_patch_detail`.

### `role_patch_welcome`

Update the opening welcome. Clients render the welcome from its content, so
there is no format field to set: write XMLV3 and it renders as XMLV3. Prefer
XMLV3 for new cards unless the author explicitly needs custom HTML.
For XMLV3, use registered tags such as `<scene>`, `<n>`, `<speaker>`, `<d>`,
`<quote>`, `<choice>`, `<form>`, and `<state>`. `<state>` must be JSON and is
hidden from inline rendering. Use the preview-compatible Theme V3 state shape:
top-level `scene`, `status`, and `relationships`. Flat objects such as
`{"trust":1,"risk":"low"}` can be valid JSON but still render as `state:none`
in preview summaries, so do not use flat state for MCP-backed cards.

Preview-compatible state example:

```xml
<state>{"scene":{"location":"雨夜郵件廳","mood":"tense"},"status":[{"key":"risk","label":"風險","value":"低"}],"relationships":[{"target":"沈燈","label":"信任","affinity":1,"max":5}]}</state>
```

If the welcome needs structured controls beyond core tags, prefer an XMLV3
extension pack before falling back to HTML. Use `extension_enable` only when the
presentation packet names a concrete pack need; the card must still degrade to
readable XMLV3 prose if a client cannot render that pack.

For HTML div-like hierarchy or per-section color needs, prefer the `layout`
extension pack before custom HTML. `panel`, `stack`, `row`, `grid`, `field`,
`choices`, and `divider` supply container, section block, label-description fact
rows, and action-button group structure; Theme V3 supplies tone, palette, and
panel color. Use `<field label="...">...</field>` for information rows; do not
use row+tag+n or `<row><tag>...</tag><n>...</n></row>` for label-description
facts. When these tags appear in `roleWelcome`, call
`extension_enable` with `packId: "layout"` after patching the welcome and before
render or simulation.

For several short action buttons, use `<choices cols="2" align="stretch">` with
child `<choice>` tags instead of a left-heavy vertical stack. When the card needs
HTML-style action hierarchy, use `<choices cols="4">` with
`<choice span="full">` for a primary row or `span="2"` / `span="3"` / `span="4"`
for 2:1:1, 3:1, or full-width weighting. Omit `span` for normal one-column
actions; do not write `span="1"`. Mobile preview should collapse the weighted
choices into a vertical or near-single-column readable path. Use semantic `tone`
hooks on the child choices and rely on Theme V3 for color. If a client lacks the
layout pack, the child choices must still be readable as fallback.

When binding a forked Theme V3 snapshot for layout-heavy XMLV3 cards, prefer
semantic CSS variable hooks over inline XML styling. Common hooks:
`--lt-panel-bg`, `--lt-panel-border`, `--lt-choice-bg`,
`--lt-choice-border-color`, `--lt-choice-color`, `--lt-field-label-color`,
`--lt-field-body-color`, `--lt-form-bg`,
`--lt-form-field-bg`, `--lt-form-option-active-bg`,
`--lt-form-submit-bg`, `--lt-collapse-bg`, and `--lt-bar-track-bg`.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "welcome-...",
  "roleId": "...",
  "patch": {
    "roleWelcome": "<scene>...</scene>"
  }
}
```

### `role_patch_jailbreak`

Update jailbreak text when the author explicitly asks for system behavior changes.

### `theme_get`

Read a Theme V3 detail payload: official, public, or the authenticated author's
own theme. Use this before deciding whether to extend an existing theme with
`theme_fork`, or before comparing an owned draft against `theme_update` output.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "themeId": "..."
}
```

Non-mutating; no `idempotencyKey` required. Read `structuredContent.theme` for
the theme's CSS, `tagConfig`, ownership, and review status.

### `theme_list_available`

List official Theme V3 themes plus the authenticated author's own themes.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "includeOfficial": true,
  "includeMine": true,
  "pageSize": 20,
  "language": "en"
}
```

Optional `language` (`en` / `zh-Hans` / `zh-Hant` / `ja` / `ko`) controls two
behaviors. Official theme names and descriptions are localized into the
requested language in the response. Themes tagged with the same language (or
with no language tag) are sorted first; other languages still appear after
them, so the list is never filtered down to empty. When `language` is omitted,
the server falls back to the authenticated account's language. User-authored
theme names are author content and are never translated.

Each returned theme carries a `language` field: the creator's language tag, or
empty for official themes (visible to every language).

### `theme_create` language stamping

`theme_create` stamps the new theme with the authenticated account language
automatically — clients do not pass a language on create. The stamp powers the
same-language sorting above and future market filtering.

### `theme_update`

Update fields on an owned Theme V3 draft: CSS, `tagConfig` (including
`tagConfig.xmlv3.components` custom-component declarations), name, or
description. Official themes cannot be updated in place; call `theme_fork`
first to get an owned, editable copy.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "theme-update-...",
  "themeId": "...",
  "css": "...",
  "tagConfig": { "xmlv3": { "components": [] } }
}
```

Themes are deliberately not covered by the publish lock. A card's role fields
freeze once it is public, but its bound theme stays editable — including the
custom component `description` and `example` text, which reaches the model. This
is a product decision, not an oversight: one theme can back several cards at
once, and freezing it whenever any of them goes public would make ordinary
styling work impossible. Treat a component description as content the author can
still change after review, and keep behavioral rules that must not drift in the
role fields.

`theme_update` writes only the fields present in the call. Sending `tagConfig`
alone leaves `css` byte-for-byte unchanged, and sending `css` alone leaves
`tagConfig` unchanged. `tagConfig` itself is replaced whole, so a `theme_update`
that carries it must carry every component; to change one component, use
`theme_patch_component` instead of retyping the rest.

Read `structuredContent.theme.componentDiagnostics` and `styleHookCount` the
same way as `theme_validate_css` and `theme_create`: fix any `error`-severity
entry and rerun `render_xmlv3_theme_case` before rebinding or resubmitting.
`styleHookCount` describes the theme's current CSS, so a call that does not send
`css` still reports the stored hooks rather than zero. Calling `theme_update` on
an official theme returns `official_theme_read_only`; fork it first.

### `theme_patch_component`

Change one custom component in a theme. Fields you omit keep their current
values, other components are untouched, and `css` is not involved.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "theme-component-...",
  "themeId": "...",
  "tag": "show-title",
  "component": {
    "example": "<show-title level=\"1\">標題</show-title>"
  }
}
```

`component` accepts the same fields as a component declaration in `tagConfig`:
`name`, `description`, `attributes`, `defaults`, `example`, `template`, and
`extends`. Each one you send replaces that field wholesale.

An unknown `tag` returns `theme_component_not_found`; use `theme_get` to see
which components exist, and `theme_update` to add a new one. The same component
diagnostics that guard `theme_update` apply here, so a broken template is
rejected on this path too.

Component `example` is the sample a model copies every turn. For a component
that defines a `template`, an attribute appearing in `example` but not declared
in `attributes` or `defaults` now returns an `example_unknown_attr` warning: the
template substitutes only declared attributes, so the model reproduces a name
that never reaches the rendered output. Components that only `extends` a
primitive are not checked — there, undeclared attributes pass through to the
base primitive and still take effect.

### `theme_fork`

Copy an official, public, or the authenticated author's own Theme V3 into a new
private theme owned by the caller. `theme_fork` produces an independent
`themeId` — a new theme record, not a snapshot — that the caller can keep
editing with `theme_update`; the source theme's fork count increases.

This is a different operation from `theme_bind` with `mode: "forked"`: the
`theme_bind` forked mode does not create a new theme record, it only freezes a
CSS snapshot and binds it to one role. Use `theme_fork` when the goal is an
editable, reusable theme of your own; use `theme_bind(mode: "forked")` when the
goal is only to lock a one-off CSS snapshot onto a single role.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "theme-fork-...",
  "sourceThemeId": "...",
  "name": "optional; defaults to \"<source theme name> · Fork\"",
  "roleId": "optional private role to bind the fork to"
}
```

`sourceThemeId` must reference an official theme, a public theme, or a theme the
caller already owns. Pass `roleId` only to also bind the new fork to one of the
caller's own private roles in forked mode in the same call; omit it to fork
without touching any role binding.

Read `structuredContent.theme`:

```json
{
  "themeId": "<new owned theme id>",
  "sourceThemeId": "...",
  "roleId": "...",
  "bound": true,
  "nextRecommendedTools": ["..."]
}
```

When `roleId` is omitted, the response has no `roleId` field and `bound` is
`false`; no role binding is touched.

### `theme_bind`

Bind Theme V3 to a private role.

XMLV3 real chat / conversation controls require `theme_bind` before simulation
acceptance. A valid XMLV3 `roleWelcome` can preview correctly while real chat
still returns `isV3:false` and `rendererMode:"plain"` if no Theme V3 binding or
extension exists.

Use `mode: "reference"` with `themeId`, or `mode: "forked"` with a `snapshot`.
After calling the tool, read `result.structuredContent.binding`, not just the
human message. It should echo `roleId`, `mode`, `themeId` for reference mode, or
`snapshotBound: true` for forked mode. Then call `render_preview` and confirm the
preview payload carries the bound theme. For custom tones, use
`structuredReport.surfaceDiagnostics.themeStyleHookCount > 0` and
`unresolvedToneCount == 0` as the minimum technical signal that the preview is
not falling back to the default fallback styling.

### `theme_unbind`

Remove a Theme V3 binding from a role card. The role must be one of the
caller's own private roles.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "theme-unbind-...",
  "roleId": "..."
}
```

Read `structuredContent.theme`: `{"roleId": "...", "unbound": true,
"nextRecommendedTools": ["..."]}`. After unbinding, the role falls back to the
client's default styling. Calling `theme_unbind` again on a role with no active
binding is an idempotent success, not an error.

### `theme_submit`

Submit an owned Theme V3 to the public market review queue. This is for the
theme artifact, not for publishing a role card. Required payload:

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "theme-submit-...",
  "themeId": "..."
}
```

Read `structuredContent.theme.reviewStatus`; successful submission returns
`pending`. Do not call this just to bind a private role. Use `theme_bind` and
`render_preview` first when the goal is proving a custom themed card.

### `theme_delete`

Delete an owned Theme V3 the caller no longer needs.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "theme-delete-...",
  "themeId": "..."
}
```

Before removing the theme record, the server unbinds it from every role that
still referenced it — a visible side effect the author should expect, not a
silent cleanup. Read `structuredContent.theme`:

```json
{
  "themeId": "...",
  "unboundRoles": 3,
  "nextRecommendedTools": ["..."]
}
```

`unboundRoles` is the number of roles that were automatically unbound as part
of the delete. Official themes cannot be deleted; calling `theme_delete` on one
returns `official_theme_read_only` and `nextRecommendedTools` points to
`theme_fork` or `theme_create` instead.

### Theme lifecycle error codes

`theme_delete`, `theme_fork`, and `theme_unbind` share one error vocabulary:

| Code | Meaning |
|---|---|
| `invalid_arguments` | the request did not match the tool's input shape |
| `theme_lifecycle_unavailable` | the theme lifecycle operation is not available right now |
| `theme_id_required` | `themeId` was missing or empty |
| `role_id_required` | `roleId` was missing or empty |
| `source_theme_id_required` | `sourceThemeId` was missing or empty |
| `theme_not_found` | the referenced theme does not exist or is not visible to the caller |
| `permission_denied` | the caller does not own the referenced theme or role |
| `official_theme_read_only` | the target is an official theme; fork it first with `theme_fork` |
| `public_role_requires_clone` | the target role is a public role; theme operations only apply to the caller's own private roles |

### `extension_enable`

Toggle a Theme V3 extension pack.

Use `packId: "layout"` for the XMLV3 layout pack when a welcome uses `panel`,
`stack`, `row`, `grid`, `choices`, or `divider` to replace HTML div-like
container structure or to group several short `<choice>` buttons into an action
grid. Do not enable packs as decoration-only defaults; the presentation packet
should explain the readable fallback and why the structure helps the player
understand action, state, route, or relationship pressure.

### `validate_role`

Return technical blockers, warnings, suggested fixes, token budget diagnostics,
and next tools. Treat `blocker` as a hard stop before publish.

`validate_role` is not the good-card judge. It does not decide whether the
premise is emotionally strong, whether the role has enough tension, or whether a
card satisfies the Moonloom writing framework. Those decisions belong to the
agent's Moonloom skills and author conversation.

Use `tokenBudget` to inspect role structure before spending render or simulation
cost:

- `roleDescChars`, `roleDetailDescChars`, `roleWelcomeChars`, `jailbreakChars`,
  and `roleOutputContractChars` show where the card spends context.
- `limits` carries the hard character cap for each of those fields. Read it
  before writing a long field instead of discovering the cap by being rejected.
  The jailbreak cap depends on the card's language, so read it per card rather
  than assuming one number.
- `estimatedTokens` is approximate and should be used for comparison, not billing.
- `welcomeToDetailRatio` above `2` with a long welcome usually means durable
  engine content is in the wrong field.
- `guidance` gives card-type length targets and repair hints.

When token allocation is the main issue, use `token-economy.md` or
`../skills/lunatalk-token-architect/SKILL.md` to create a field triage and
compression plan before render or simulation.

When validation is not `pass`, `nextRecommendedTools` usually points to the
technical repair surface:

- `role_patch_profile` when required profile fields are missing.
- `role_patch_assets` when avatar or background image URLs are missing.
- `role_patch_detail` when required detail fields are missing.
- `role_patch_welcome` for required welcome content, unsafe HTML, invalid XMLV3,
  or unsupported render tags.
- `role_patch_talk_example` when the final field packet includes compact Example
  Chat samples that need to be stored separately from `roleDetailDesc`.
- `validate_role` after the patch.

Do not call `render_preview`, `conversation_create`, `conversation_send_message`,
or `conversation_inspect` just because they are available. Use them after
`validate_role` has no blockers and after the Moonloom self-review says the draft
is worth testing visually or behaviorally.

### `render_preview`

Create a short-lived preview URL and structured render report.

Optional `mode`: `full-card`, `xmlv3`, or `html`.
Optional `viewports`: usually `desktop` and `mobile`.

The response includes `evaluation`:

- `captureReadiness`: preview URL and viewport contract are usable.
- `semanticStructure`: HTML/XMLV3 safety and parse health.
- `readability`: overflow, contrast, console warnings, and runtime health.
- `actionVisibility`: the first screen exposes a player action path.

The response also includes `structuredReport.surfaceDiagnostics`. Treat it as a
renderer-structure map, not a replacement for screenshot review:

- `renderMode`: `html`, `xmlv3`, or `plain`.
- `sectionBlocks` / `panelBlocks`: whether the output has div-like or
  layout-pack sectioning instead of one undifferentiated scene.
- `actionCount`, `groupedActionCount`, and `fallbackActionGroupCount`: whether
  choices are balanced action groups or fallback / ungrouped buttons.
- `actionLayoutMaxColumns`: the widest rendered or inferred row of action
  buttons. `1` with three or more actions usually means the UI is a left-heavy
  vertical button stack instead of a useful action grid.
- `choiceSpans` / `choiceSpanCount`: whether weighted choices such as
  `span="full"` or `span="2"` rendered and expressed primary/secondary action
  hierarchy.
- `formControlCount`: whether setup inputs/radios/checkboxes actually rendered
  as controls. Intake-first system cards should normally keep at least six
  rendered controls when matching a dense HTML setup surface.
- `stateSurface`: `expected` from server-side static analysis, `visible` from
  the browser preview payload when a status/state surface is actually rendered.
- `toneCount`, `localStyleHookCount`, `themeStyleHookCount`, and
  `presentationAttrCount`: whether visual distinction comes from Theme V3 tones,
  HTML style hooks, bound Theme V3 CSS hooks, or constrained XMLV3 presentation
  attributes. `presentationAttrCount` is not a raw style warning by itself; use
  the screenshot to judge readability and hierarchy.
- `customToneCount` and `unresolvedToneCount`: whether XMLV3 uses custom tone
  names that are not covered by the current Theme V3 CSS. A nonzero
  `unresolvedToneCount` means the card may fall back to the default XMLV3 look
  even though the markup appears to have semantic colors.
- `nestedControlCount`: XMLV3 controls placed inside `<scene>` instead of as
  sibling blocks. A nonzero value usually means the output will look compressed
  into one scene card; move `choices`, `form`, `bar`, `collapse`, `panel`,
  `grid`, and similar controls outside the scene.
- `warnings`: parity risks such as dense XMLV3 without section panels or several
  actions without an explicit `<choices>` group. Treat
  `xmlv3_actions_render_single_column`,
  `xmlv3_custom_tones_without_theme_hooks` and
  `xmlv3_controls_nested_inside_scene` as visual-structure repairs before
  touching writing logic.

Use these fields to compare rich HTML behavior with XMLV3 behavior before
changing writing logic. If XMLV3 cannot show sectioning, action density, form
controls, or a visible state surface, patch XMLV3 layout / Theme V3 first.

The first version uses client-side capture. If the AI client has browser or
multimodal access, open the clean `previewUrl` exactly as returned and inspect
it visually. Do not append `debug=1` during ordinary UI review; debug mode is
only for renderer diagnosis because it adds headers, IDs, and report panels that
are not part of the user-facing chat output. If
`evaluation.status` is `warning`, follow `nextRecommendedTools`, patch
`roleWelcome`, rerun `validate_role`, then rerun `render_preview`.

When the preview page exposes `window.__LUNATALK_MCP_PREVIEW__`, read its
`capturePlan` and `report.surfaceDiagnostics` before judging the screenshot:

- Treat `contentWidth`, `contentHeight`, `clientWidth`, and `clientHeight` as the
  clean preview surface dimensions, not the normal app chrome.
- For desktop, do not split the card into left/right screenshots. If
  `requiresViewportResize` is true, resize the browser/capture viewport to
  `requiredCaptureWidth` and keep `horizontalScrolls: [0]`.
- For long HTML/XMLV3 output, capture every listed vertical segment before
  judging layout. Use `__LUNATALK_MCP_APPLY_CAPTURE_SEGMENT__(index)` when the
  client can run page JavaScript, or manually scroll to each `segments[].y`.
- Do not shorten a welcome or AI reply only to fit one screenshot. Long replies
  are normal; incomplete screenshots are a review failure.

The same clean preview page also supports inline XMLV3 preview probes while
reviewing generated content before a role exists. Store the payload on the
target origin as `lunatalk:mcp-preview:payload:<payloadKey>` and open both
desktop and mobile:

```js
localStorage.setItem('lunatalk:mcp-preview:payload:choices-gap', JSON.stringify({
  roleName: 'Choices gap regression',
  xml: '<scene><n>自製 XMLV3 case。</n></scene><choices cols="2" gap="sm"><choice tone="primary">A</choice><choice tone="risk">B</choice></choices>',
  themeCss: '.lt-choice[data-tone="primary"] { --lt-choice-bg: rgba(245,197,66,.18); }',
  state: { scene: { location: '測試場' } }
}))
location.href = '/pages/mcp/rolePreview?payloadKey=choices-gap&viewport=mobile'
```

For tiny cases, encoded query params `xml`, `themeCss`, `themeMode`,
`stateJson`, and `roleName` are accepted, but `payloadKey` is preferred for real
probes. Use screenshots and
`report.surfaceDiagnostics` as review signals when judging generated content.
Do not treat Moonloom as the owner of XMLV3 renderer behavior; renderer
implementation issues belong to the LunaTalk renderer project.

### `conversation_create`

Create a new MCP-operated private conversation for an owned role. Use this when
the test needs a fresh thread instead of continuing the latest returned
`conversationId`. It returns the new `conversationId`, the raw welcome message,
conversation context, and a preview URL for the welcome message when available.

Required:

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "conversation-create-...",
  "roleId": "..."
}
```

Optional: `pageSize` and `viewport`. Use `viewport: "desktop"` to preview the
PC chat column proportions and `viewport: "mobile"` to preview the mobile chat
bubble proportions.

### `conversation_model_catalog`

Query available LunaTalk chat models, model values, status, and normal billing
shape before a paid behavior test. Use this before `conversation_send_message`
when the client needs to know which model value to pass or what the expected
cost tier is.

Required:

```json
{
  "schemaVersion": "2026-05-26.m1"
}
```

Optional: `query`, `recommendedOnly`, and `includeUnavailable`.

Read `recommendedModel` first. Each model entry may include `costScore`,
`effectiveCostScore`, `maxScore`, `effectiveMaxScore`, `status`, discount fields,
`thinkingDepthOptions`, `defaultThinkingDepth`, `supportsAgentMode`,
`agentModeCostWarning`, and notes. When present, inspect `status.confidence`,
`status.gatewayHealth`, and `status.errorBuckets` before choosing a paid probe
model. Treat `status.status: "unknown"` as a sample confidence warning rather
than proof that the model is broken. Treat `status.gatewayHealth.state:
"unknown"` as gateway sample insufficiency, not healthy capacity; prefer a
non-red model with usable confidence and no severe gateway or error-bucket
warning.
`effectiveCostScore` includes active model discounts; actual billing still
follows LunaTalk membership, context, MAX, stop, and server-side billing rules.
When a family has multiple provider variants, read `channel` and pass the
returned `value` unchanged. `value_based` is the lower-cost multi-provider pool;
`stable_1` is the dedicated official-provider pool. Open-source `official-*`
variants use paid dynamic token billing and are never covered by an unlimited
card, even when `noLimitCovered` is absent from the response. Do not construct
an `official-*` value that the catalog did not return. In particular,
`deepseek-v4-pro` has no separate `official-deepseek-v4-pro` variant. The
current GLM-5 official value is `official-glm-5`; Qwen3.7 Plus currently has no
official-channel variant, so do not construct `official-qwen3.7-plus`.
If the selected model is not the server default, pass that value as `model` in
`conversation_send_message`. If the selected model exposes
`thinkingDepthOptions`, choose one of those values and pass it as
`thinkingDepth`; omit it only when the catalog entry has no thinking metadata or
the author has not accepted the additional token/cost tradeoff. Record the
chosen `model` and `thinkingDepth` in local playtest evidence.

`supportsAgentMode` says whether that model can run `conversation_send_message`
with `agentMode: true`; free models cannot. `agentModeCostWarning` marks models
whose agent turns are expensive enough to be worth confirming with the author
first, since agent turns bill by actual usage rather than a flat per-turn
estimate.

Conversation model catalog entries may also expose thinking mode metadata:
`thinkingDepthOptions` and `defaultThinkingDepth`. Thinking mode is a
quality/cost choice for supported models. Product labels follow Instant, High,
Max, and Ultra; tool values may include `off`, `on`, `high`, `max`, and `ultra`
depending on the selected model. Only pass values listed by that model's catalog
entry.

### `conversation_list`

List owned conversations for a private role. Use this when an AI client needs to
find the conversation to inspect, resume, or compare. The response includes
conversation tags, last raw message data, renderer mode, and preview URL for the
last AI message when available.

Required:

```json
{
  "schemaVersion": "2026-05-26.m1",
  "roleId": "..."
}
```

Optional: `pageNum`, `pageSize`, and `viewport`.

### `conversation_load`

Load an owned conversation as the current role conversation, then return the same
raw history/context shape as `conversation_inspect`. Use this when the author
wants to resume a specific conversation or roll back to a specific message.

This is a mutating tool. If `rollbackToChatId` is provided, LunaTalk trims
messages after that chat and rolls conversation memory back when memory exists.
Do not use it for passive inspection.

Required:

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "conversation-load-...",
  "roleId": "...",
  "conversationId": "..."
}
```

Optional: `rollbackToChatId`, `pageNum`, `pageSize`, and `viewport`.

### `conversation_send_message`

Send one real user message through LunaTalk's private chat pipeline. It uses
normal billing and deducts credits or points according to the authenticated
account's model and membership. Use this as the primary MCP-backed behavior test
tool because it returns the AI reply, billing summary, message identifiers, and
per-message preview URL for the new turn.

Required:

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "conversation-send-...",
  "roleId": "...",
  "message": "...",
  "waitMs": 60000
}
```

Optional: `conversationId` to continue a prior MCP-operated conversation. If it
is absent, the server creates a new MCP test conversation. Optional: `model`,
`agentMode`, and `pageSize`.

Set `agentMode: true` to run this one turn in agent mode, where the model works
through the card's material itself before writing instead of answering in one
pass from what was pre-selected for it. See `agent-mode-runtime.md` for what that
changes about the card. Three properties matter for the tool contract:

- It applies to that turn only and never changes the conversation's saved
  setting, so the same conversation can alternate modes for an A/B comparison.
- It is refused rather than silently downgraded. A model that cannot run agent
  mode returns an error whose code names the reason
  (`agent_mode_free_model`, `agent_mode_model_unsupported`,
  `agent_mode_runtime_disabled`) and the turn is not sent. Check
  `supportsAgentMode` in `conversation_model_catalog` before choosing a model, or
  retry without `agentMode`.
- Agent turns take longer and bill by actual usage, so expect the async path
  below rather than a reply inside the wait window.

The response echoes `agentMode` so a client can confirm which runtime produced
the turn it is evaluating.

Optional `waitMs` controls how long the MCP call waits for the generated reply
before returning. Use `waitMs: 60000` for accepted playtests. The default wait is
60 seconds and the server caps it at 60 seconds. The tool may still return
`generationStatus: "waiting_ai"` or
`"generating"` when the turn is not finished within that window or the client
needs to recover from a broken request. Treat those statuses as a normal async
path, not a failure: call `conversation_turn_status` and then
`conversation_inspect` until the latest AI message is complete.

Set `viewport` when the returned `turn.previewUrl` should be opened at a
specific chat proportion:

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "conversation-send-mobile-...",
  "roleId": "...",
  "conversationId": "...",
  "message": "...",
  "waitMs": 60000,
  "viewport": "mobile"
}
```

### `conversation_turn_status`

Check whether the latest turn, or a specific `chatId`, is still generating. Use
this after `conversation_send_message` returns `generationStatus: "waiting_ai"`
or `"generating"`, or when a client wants a lightweight poll before pulling a
larger transcript.

Required:

```json
{
  "schemaVersion": "2026-05-26.m1",
  "roleId": "...",
  "conversationId": "..."
}
```

Optional: `chatId`, `pageSize`, `viewport`, and `includeRole`. A complete result
includes the latest message metadata and can be followed by
`conversation_inspect` for the raw context and evaluation.

An agent turn runs for minutes while `waitMs` caps out at 60 seconds, so a turn
almost always has to be polled. Poll with `conversation_list` when the question
is only "is it done": it carries `generationStatus` and the last message and
costs a fraction of the other tools. Use `conversation_turn_status` when you
need the `agentPrep` trace, and `conversation_inspect` when you need the
history.

`conversation_create`, `conversation_load`, `conversation_turn_status`, and
`conversation_inspect` do not return the card definition unless you ask for it
with `includeRole: true`. A full card can be most of a polling response, and
waiting for a turn does not need it.

An agent turn also returns `agentPrep`:

```json
{
  "agentPrep": {
    "running": true,
    "steps": [
      {"stage": "looking_up", "resource": "setting", "keywords": "..."},
      {"stage": "found", "resource": "setting", "count": 7},
      {"stage": "reading", "resource": "setting", "count": 3},
      {"stage": "done"}
    ]
  }
}
```

`running: true` means the model is still working through the card's material and
has not started the reply, and `generationStatus` reads `preparing`. This is the
difference between waiting and failing: preparation can run for minutes while the
conversation shows no new message, so do not read a quiet conversation as a dead
turn, and do not send the next message on top of it.

`resource` names which of the card's materials the step touched. The full set is
`setting` (the worldbook), `requirement` (the format template or module sections
the reply has to satisfy), `status` (values, inventory, and open threads the
character tracks), `settled` (facts already fixed by a roll and no longer
changeable), `draft` (the character's own working notes), `note` (what it wrote
down in earlier turns), `shared` (the notepad it shares with the player), `past`
(earlier conversation), and `mod` (installed play modules).

Which resources a turn reaches for tells you where the card actually keeps its
engine. A card whose every-turn logic lives in role fields and hidden state
routes to `status` or `settled` and never opens the worldbook — that is a fact
about the card's shape, not a failure to find anything.

`steps` is the record of what the model went looking for and with what words. For
iterating on a card this is the useful half of the result — the reply tells you
what it wrote, the trace tells you what it could find. An agent turn whose trace
searches and finds nothing is usually an entry-naming or body-wording problem, not
a reply problem.

### `conversation_stop`

Stop the turn currently running in a conversation. Use it when an agent turn is
taking longer than the author wants to spend, or when the test should move on to
a different probe.

Required:

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "conversation-stop-...",
  "conversationId": "..."
}
```

Optional: `roleId`, which is checked against the conversation when supplied.

`stopped: false` means there was nothing left to stop, usually because the turn
had already finished. That is a normal result, not an error.

### `conversation_inspect`

Read an owned conversation's raw history and context for evaluation. This is the
tool AI clients should use to get conversation data instead of parsing the
normal chat page UI. It returns USER and AI messages before UI rendering, AI
`chatId` values, `previewUrl`, renderer mode, text length, warnings,
conversation metadata, role snapshot, Theme V3 state snapshot, and a conversation
evaluation.

Required:

```json
{
  "schemaVersion": "2026-05-26.m1",
  "roleId": "...",
  "conversationId": "..."
}
```

Optional: `pageNum`, `pageSize`, `viewport`, and `chatIds`. Use `chatIds` when
the conversation is long and the agent only needs a few specific raw messages or
preview URLs instead of a full page of history.

For UI validation, inspect both `viewport: "desktop"` and `viewport: "mobile"`
when layout, overflow, choice buttons, dense XMLV3 blocks, or HTML cards are
part of the acceptance criteria. The dedicated preview page supports the same
query parameter:

```text
/pages/mcp/rolePreview?conversationId=<conversationId>&chatId=<chatId>&roleId=<roleId>&pageSize=<n>&viewport=mobile
```

Treat this page as the clean chat preview for AI output. It is not the normal
chat page UI, and review should ignore avatar, byline, sidebar, composer, and
other app chrome. Judge the assistant output inside the bubble, then judge XMLV3
state/status outside the bubble when state exists. Hidden `<state>` data should
not appear as inline message prose, but the preview must still expose its effect
as an out-of-bubble status/state surface so desktop and mobile screenshots can
confirm the conversation state is readable.

For long conversation replies, use the same `capturePlan` contract as
`render_preview`: desktop capture is full-width with no horizontal split, while
vertical overflow must be reviewed through every listed scroll segment.

After every accepted behavior-test message, call `conversation_inspect` before
claiming the role behavior is stable. Use the returned `messages[].chatMessage`
and `context.state` for role-behavior evaluation, and the returned AI
`messages[].previewUrl` for visual/render evidence.

The send and inspect responses include `evaluation`:

- `responsePresence`: catches empty or too-thin replies.
- `agency`: checks whether the reply gives the player a next action path.
- `progression`: checks whether the reply advances scene, relationship, route,
  risk, state, or a renewed hook.
- `safetyFormat`: catches obvious system/model artifacts.

Each simulated AI turn may include a `previewUrl`. Open that URL when available.
If `previewUrl` is absent but the response includes `conversationId` and
per-turn `chatId` values, use the dedicated app preview harness to inspect
selected AI messages:

```text
/pages/mcp/rolePreview?conversationId=<conversationId>&chatId=<chatId>&roleId=<roleId>&pageSize=<n>
```

This preview is for message rendering evidence: XMLV3/HTML/Markdown mode, DOM
summary, paragraph spacing, overflow, relevant console errors, and screenshots.
Do not parse the normal chat page UI for transcript formatting.

If `evaluation.status` is `warning`, follow `nextRecommendedTools`: patch
`roleDetailDesc` and/or `roleWelcome`, run `validate_role`, then rerun
`conversation_send_message` and `conversation_inspect`. There is no separate
`simulation_evaluate` tool.

### `publish_submit`

Submit a private role for public review. Only call this after the author explicitly
confirms in the agent conversation.

Required:

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "publish-...",
  "roleId": "...",
  "userConfirmed": true,
  "confirmationSummary": "Author confirmed after validation, render review, and conversation test."
}
```

**Submitting is not publishing.** Read `structuredContent.publish` and branch on
`reviewStatus`:

| `reviewStatus` | What it means | What you do |
| --- | --- | --- |
| `running` | Automated review is in flight. A `taskId` is returned. | Tell the author review has started. Poll `role_get` for the settled state instead of calling `publish_submit` again. |
| `pending` | The card is queued for **human review**. | Tell the author it is awaiting a human reviewer. **Do not call `publish_submit` again** — the card is already in the queue and resubmitting does not move it. Only a LunaTalk reviewer can release it. |
| `passed` | The card is live. | Tell the author it is published. |

A card can enter human review because automated review flagged it, or because the
account or card carries a standing manual-review requirement.

Two failure modes to avoid:

- **Do not report a `pending` card to the author as published.** It is not live,
  and telling them otherwise sends them looking for a card that nobody can find.
- **Do not retry `publish_submit` on a `pending` card.** Retrying never changes
  the outcome; it only produces repeated no-op submissions. If the author asks why
  it is taking time, explain that a human reviewer has to look at it, and offer to
  keep improving the card in the meantime — a queued card can still be patched.

### `role_set_visibility`

Take one of the author's own cards back to private.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "visibility-...",
  "roleId": "...",
  "visibility": "private"
}
```

Once a card is public or waiting for review, every patch tool refuses it with
`public_role_requires_clone`. This tool is how a public card gets back into an
editable state: take it private, patch it, then submit it again with
`publish_submit`. Going public is not available here — `visibility` only accepts
`private`, and raising visibility always goes through review.

A card that is still in review returns `role_in_review` instead. Review settles
the card's visibility when it finishes, so pulling it back early would be undone
at that moment without anything saying so. Wait for review to settle, check the
state with `role_get`, then take it private.

Because that round trip costs a review cycle, it is worth spending the extra
test rounds before the first submission rather than after. Agent-mode behavior
in particular tends to surface only when a real turn runs.

A `pending` result is not an error and not a rejection. It carries no verdict about
the card's content; it only means a person, not a model, makes the final call.

### `public_search`

Find public roles and public worlds by keyword. Read-only: it mutates nothing and
takes no `idempotencyKey`. Use it to resolve a name the author mentioned into a
public `roleId` you can pass to `conversation_create`, or to survey what already
exists before authoring something similar.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "query": "detective",
  "pageNum": 1,
  "pageSize": 20,
  "language": "all",
  "includeNsfw": false
}
```

Only `query` is required. `language` accepts `zh-Hans`, `zh-Hant`, `en`, `ja`,
`ko`, or `all`. `pageSize` caps at 100. `includeNsfw` only takes effect when both
the account's own NSFW setting and the global switch allow it — passing `true`
does not override either.

Read `structuredContent.search`: `query`, `total`, `pageNum`, `pageSize`,
`hasNextPage`, and `results`. Page forward while `hasNextPage` is true rather
than requesting a huge `pageSize`.

Each result carries public surface only — `type`, `roleId` or `worldId`, `name`,
`description`, `avatar`, visibility, `language`, `roleType`, `isR18`, and public
counters. **Search results never include `roleDetailDesc`, `jailbreak`,
`talkExample`, or `roleOutputContract`**, even for a role the caller happens to
own; those are author-only fields reachable through owner-scoped tools such as
`role_get`. Do not build a workflow that expects a public role's prompt body to
come back from search.

### `creator_analytics_brief`

Read the authenticated author's own Creator Brief: market trends, insights on
their own cards, and writing suggestions to inform the next creation decision.
Read-only, owner-scoped, and takes no `idempotencyKey`. It is not a public
analytics surface — it never reports on another author's cards.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "period": "last30d",
  "rating": "all",
  "language": "all"
}
```

Every field is optional. `period` accepts `last1d`, `last7d`, `last30d`
(default), `last90d`, `lastMonth`, `lastQuarter`, or `custom`. With
`period: "custom"` you must also send `startMonth` and `endMonth` as `YYYY-MM`.
`rating` accepts `all`, `safe`, or `r18`; `language` accepts the five content
languages or `all`.

Read `structuredContent.creatorAnalytics`: `schemaVersion`, the resolved
`period`, `rating`, `language`, a `periodRange`, a `metricContract`, and `brief`.
The `metricContract` states how to read the numbers — its `source`, `comparison`,
`confidence`, and `personalization` fields tell you what the brief is derived
from and how far to trust it. Quote the brief's own confidence rather than
presenting every figure as settled fact.

## Preview page tools

The preview page is the author-controlled long-form section on a role's detail
screen. It is a whitelisted block document, not free HTML. Four tools cover it.
For the document schema, hard limits, image rules, and moderation state machine,
read `preview-page-authoring.md`; use `../skills/lunatalk-preview-page-designer/`
for the decoration workflow. These tools reuse the same ownership, quota,
moderation, and rate limits as the equivalent in-app editor; MCP is not a bypass.

Mutating preview tools (`role_patch_preview_page`, `role_reset_preview_page`)
require `idempotencyKey` with at least 8 characters, the same as the rest of the
family, and the server caches the result by key — use a new key for each new
document. Read tools (`role_get_preview_page`, `creator_image_list`) carry
`schemaVersion` but take no `idempotencyKey`.

### `role_get_preview_page`

Read the authenticated author's own editable preview page for a role.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "roleId": "..."
}
```

The response is a closed shape:

```json
{
  "doc": { "schemaVersion": "1", "blocks": [] },
  "status": "none",
  "version": 0,
  "rejectReason": null,
  "rejectReasonCodes": [],
  "rejectReasonNote": ""
}
```

- `status` is one of `none`, `pending`, `passed`, or `rejected`.
- When the role has no decoration yet, the call still succeeds with
  `status: "none"`, `doc: null`, and `version: 0` — this is a normal empty state,
  not an error.
- `version` is the concurrency guard: pass it back on the next save.
- `rejectReason` is the raw stored reason when `status` is `rejected`, otherwise
  null. It carries no per-node path.
- `rejectReasonCodes` and `rejectReasonNote` are that same reason already parsed
  for you: a list of policy categories, plus the reviewer's free-text note when
  there is one. **Read these two instead of parsing `rejectReason` yourself** —
  the raw string has a versioned internal format and is kept only so older
  clients keep working.

A rejection is always a person's decision. Automated rating never takes a page
down on its own: it either clears the page or routes it to a human queue, and only
a reviewer's verdict produces a rejected status and the author-facing notice.
So treat a rejected status as considered feedback worth reading closely, not as a
threshold you can nudge past by resaving.

The response never exposes reviewer-only or internal fields. Read only the keys
above; do not expect a moderation review document, a content hash, or an account
identifier.

### `role_patch_preview_page`

Save the whole preview page document for an owned role. There is no partial
patch; send the complete document each time.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "preview-save-...",
  "roleId": "...",
  "doc": { "schemaVersion": "1", "blocks": [] },
  "version": 3
}
```

Read the response `{ status, version, moderating }`. `status` is typically
`pending` right after a save; `moderating` indicates the document is queued for a
moderation decision. Poll `role_get_preview_page` with backoff for the settled
state instead of resubmitting.

Error codes: `version_conflict` (the page changed since the read `version` —
re-read and reapply), `rate_limited` (saving too quickly — back off and retry),
`rejected_content_reused` (re-saving content already rejected), `empty_doc`
(nothing to save), and `invalid_param` (the doc failed validation — the response includes a `reason`
and usually a `path`). Notable `reason` values: schema violations such as
`unknown_node` / `bad_attr` point `path` at the first offending node;
`thin_doc` means the page has no substantive content — add real text (about
20+ visible characters), an image, or a block such as a stat card before
saving. Invisible padding (spaces, zero-width characters) does not count.
Switch on `reason`, not on new top-level codes, and `permission_denied` (the role is not owned by the
authenticated account).

### `role_reset_preview_page`

Restore the default preview page (remove custom decoration). Idempotent —
resetting an already-default page is a success.

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "preview-reset-...",
  "roleId": "..."
}
```

### `creator_image_list`

List the authenticated account's own asset-library images. Read-only, so it
carries `schemaVersion` but no `idempotencyKey`.

```json
{
  "schemaVersion": "2026-05-26.m1"
}
```

Each entry carries the image `url`, `moderationState`, the owning role, and a
create time. Only images whose `moderationState` is `pass` may be placed in a
preview page document; images still under review, or chat-generated images with
no review state, appear in the list but are not eligible. The list is scoped to
the authenticated account by the server — passing another account's role does not
widen it — and it does not return account identifiers.

When a generated image is rejected in the background, its library row is removed,
so a rejected generated URL simply disappears from this list rather than showing a
`rejected` state. A URL that was seen (usually as `pending`) and then vanished is
a terminal rejection; a URL that has never appeared yet is insert lag. Poll the
exact URL the document needs, with bounded polling and backoff.

## MOD marketplace and approved mutations

The MOD marketplace contract uses a separate schema:

```json
{
  "schemaVersion": "2026-07-23.mod-marketplace.v1"
}
```

### Discovery and role-state availability

`mod_market_find` has no rollout attempt metadata requirement. Use only the
documented search inputs, and retry a transport failure with the same request
parameters. `mod_role_set_enabled` also has no rollout attempt metadata
requirement. Its availability is determined by the server's authorization,
role-access, installed-MOD, and entitlement checks.

Commerce remains distinct: call `mod_purchase_status` with the same
`idempotencyKey` for the same intended purchase and its status recovery. Do not
rotate that key merely because a response was lost or an error was observed.

Use these read-only tools for discovery and account state:

- `mod_market_find`: search public MODs. Set optional `officialOnly: true` only
  for an official-only search; omission or `false` keeps official and community
  MODs together. To find the same author's other listed MODs, pass the positive
  `authorAccountNumId` returned in public marketplace metadata. It is a public numeric author identifier, not an account UUID or private account identifier.
- `mod_market_get`: read a public MOD summary, public-worldbook summary, and
  public lineage summary.
- Public marketplace summaries may include optional `backgroundUrl` for the
  immutable 2:1 marketplace/detail visual and `avatarUrl` for the independent
  1:1 role/picker visual. `iconUrl` remains legacy-only. Do not substitute one
  slot for another or expect internal image IDs in structured output.
- `mod_lineage_get`: read public parent/ancestor/descendant relationships.
- `mod_public_worldbook_read`: read the public, read-only worldbook bound to a
  listed MOD by `modId`; it does not take or return a worldbook storage ID.
- `mod_entitlement_list`: list the authenticated user's usable MOD assets and
  expiry state.
- `mod_role_list`: list the authenticated user's selected role MOD states. A
  blocked expired item is `suspended_expired`.
- `mod_review_list`: read public ratings, review summaries, and comments.
- `mod_purchase_quote`: read a current price for a plan only after the shared
  acquisition gate passes: authorized rollout, enforced runtime, and
  reconciliation readback. All point-priced plans, including lifetime, require
  a fresh successful reconciliation readback within the 24-hour window before
  quote, purchase, or renewal. If it cannot pass, the quote fails closed; do
  not retry around or bypass the denial. The quote states the split as well as
  the price: `commissionPoints` is what the platform takes and `authorNetPoints`
  is what the author receives. Both are always present, including zero, so a
  zero share reads differently from a server that said nothing. Quote these
  numbers rather than deriving them — the platform share is charged in slices,
  so a percentage applied to the whole price gives the wrong answer.
- `mod_purchase_status`: remains readable for the authenticated user's own
  idempotency key even while a quote is unavailable, so an existing first-party
  purchase outcome can still be checked safely. It does not bypass the
  acquisition gate or authorize a new purchase, claim, or renewal.

The adjusted `mod_public_worldbook_read` tool is the equivalent public contract
for accessible worldbook discovery and reading. It is addressed by `modId`,
returns public read-only recommendations and entries, and never becomes an
authoring handle: do not expect a storage ID or recommend update/delete. The
last-published MOD release owns the immutable worldbook snapshot returned by
this tool; unpublished live binding or entry edits do not appear until a newer
MOD release is approved and promoted.

Raw MOD media upload and author media mutation are not exposed by this MCP
contract. Do not invent URL/base64 mutation fields or internal image IDs; use
the first-party LunaTalk editor, which enforces ownership, dimensions, and
moderation.

The following operations use the same server-authoritative access and lifecycle
checks as the first-party MOD workflow:

- `mod_role_set_enabled`: enable or disable an installed MOD in the caller's
  personal state for a role authored by caller or a role for which caller has a
  CURRENT conversation; unrelated roles are not exposed. The MOD must be
  installed, enabling requires an active entitlement, retries are idempotent,
  and the server remains authoritative about selector displacement.
- `mod_update_preview`: preview a role-scoped or all-role update. Explain the
  target version, affected role count, parameter migration, and worldbook
  snapshot impact before asking the user to confirm.
- `mod_update_apply`: call only after explicit user confirmation, passing the
  preview's `previewToken`, `expectedInstalledVersion`, and `confirm: true`.
  A stale/conflicting preview must be discarded and previewed again.
- `mod_author_offer_get`: read only the authenticated author's own
  collaboration mode, plans, prices, and discounts. It is read-only and is not
  a way to inspect another author's private configuration.

An authentication, role-access, installed-MOD, entitlement, lifecycle,
acquisition, or update-precondition denial is authoritative. Do not bypass it
through another tool or by inventing storage identifiers.

There is no MCP purchase or free-claim tool. The contract does not expose
`mod_purchase`, `mod_review_write`, `mod_review_helpful_set`,
`mod_review_reply`, `mod_favorite_set`, `mod_author_offer_put`, renewal,
refund, offer mutation, or expiry acknowledgement. Quotes are informational;
purchase and renewal happen only in the LunaTalk first-party UI.

When `conversation_send_message` returns
`user_confirmation_required`, stop the retry loop. Explain that the user must
use the first-party UI to renew or remove the expired MOD, then inspect
`mod_role_list`. Do not auto-ack, auto-renew, or auto-purchase; never invent an
acknowledgement argument or silently bypass the enabled MOD.

All marketplace responses are allowlisted. They never expose an account UUID, a
private worldbook, a closed MOD implementation, raw source, or another user's
purchase/order/expiry data. An unavailable result is not evidence about hidden
content.
