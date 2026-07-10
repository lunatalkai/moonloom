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

Configure authentication through the AI client's normal MCP OAuth flow. Do not
print credentials, tokens, cookies, or authorization headers in skills, prompts,
references, reports, or public examples. For local development only, use
`examples/local-mcp.json` with private environment variables.

Moonloom does not add separate MCP scopes. The server enforces account identity,
role ownership, normal publish gates, quota, moderation, and billing.

## Schema version

Every tool call uses:

```json
{
  "schemaVersion": "2026-05-26.m1"
}
```

Mutating tools also require `idempotencyKey` with at least 8 characters. Generate
a stable key per intended operation; retrying the same operation should reuse the
same key.

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

Authoring implications for AI clients:

- Make each entry a small, independently useful lore / rule / memory slice.
- Put only short every-turn invariants in `isConstant`; avoid turning constant
  entries into another long role detail.
- Give `keywords` aliases the player is likely to type: names, nicknames,
  places, objects, quest terms, and natural question phrases.
- Do not require many entries from the same category to appear in one turn.
- Keep identity, voice, and behavior that must be stable every turn in the role
  fields, not only in keyed worldbook entries.

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
    "roleWelcomeMode": "xmlv3",
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
      "roleWelcomeMode": "xmlv3",
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

Update the opening welcome. Supported modes are `plain`, `html`, and `xmlv3`.
Prefer `xmlv3` for new cards unless the author explicitly needs custom HTML.
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
    "mode": "xmlv3",
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

Read `structuredContent.theme.componentDiagnostics` and `styleHookCount` the
same way as `theme_validate_css` and `theme_create`: fix any `error`-severity
entry and rerun `render_xmlv3_theme_case` before rebinding or resubmitting.
Calling `theme_update` on an official theme returns `official_theme_read_only`;
fork it first.

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

- `roleDescChars`, `roleDetailDescChars`, and `roleWelcomeChars` show where the
  card spends context.
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
and notes. `effectiveCostScore` includes active model discounts; actual billing
still follows LunaTalk membership, context, MAX, stop, and server-side billing
rules. If the selected model is not the server default, pass that value as
`model` in `conversation_send_message`.

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
is absent, the server creates a new MCP test conversation. Optional: `model` and
`pageSize`.

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

Optional: `chatId`, `pageSize`, and `viewport`. A complete result includes the
latest message metadata and can be followed by `conversation_inspect` for the
raw context and evaluation.

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
