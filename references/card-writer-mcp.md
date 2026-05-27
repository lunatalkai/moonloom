# Card Writer MCP Reference

Use this reference when a Moonloom skill needs concrete Card Writer MCP details.

## Endpoint

Configure the Card Writer MCP endpoint and authentication through the AI client's
normal MCP settings. Do not hard-code environment URLs or credentials in skills,
prompts, or public examples.

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
- `publish_submit`: read `structuredContent.publish`.

Do not assume `previewUrl`, `messages`, or `evaluation` are top-level fields of
the JSON-RPC response.

## Core tool order

1. `role_create_private` or `role_get`
2. `role_patch_profile`
3. `role_patch_assets`
4. `role_patch_detail`
5. `role_patch_welcome`
6. `theme_bind` when XMLV3 real chat controls are expected; optional
   `extension_enable` for specific packs
7. `validate_role`
8. `render_preview`
9. `conversation_model_catalog` before paid conversation testing
10. `conversation_create` or `conversation_list`
11. `conversation_send_message`
12. `conversation_turn_status` when the send result is still pending
13. `conversation_inspect`
14. Optional `conversation_load` when the author wants to resume or roll back
15. `publish_submit` only after explicit author confirmation

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

### `role_get`

Read a role owned by the authenticated account.

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

For XMLV3 cards, `roleDetailDesc` should not duplicate the platform XMLV3
server guide. Put only the role-specific format contract in detail: state update
rules, choice behavior, enabled pack purpose, visible status meaning, and
player-agency boundaries.

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
extension pack before custom HTML. `panel`, `stack`, `row`, `grid`, `choices`,
and `divider` supply container, section block, and action-button group
structure; Theme V3 supplies tone, palette, and panel color. When these tags
appear in `roleWelcome`, call
`extension_enable` with `packId: "layout"` after patching the welcome and before
render or simulation.

For several short action buttons, use `<choices cols="2" align="stretch">` with
child `<choice>` tags instead of a left-heavy vertical stack. Use semantic
`tone` hooks on the child choices and rely on Theme V3 for color.

When binding a forked Theme V3 snapshot for layout-heavy XMLV3 cards, prefer
semantic CSS variable hooks over inline XML styling. Common hooks:
`--lt-panel-bg`, `--lt-panel-border`, `--lt-choice-bg`,
`--lt-choice-border-color`, `--lt-choice-color`, `--lt-form-bg`,
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

### `theme_bind`

Bind Theme V3 to a private role.

XMLV3 real chat / conversation controls require `theme_bind` before simulation
acceptance. A valid XMLV3 `roleWelcome` can preview correctly while real chat
still returns `isV3:false` and `rendererMode:"plain"` if no Theme V3 binding or
extension exists.

Use `mode: "reference"` with `themeId`, or `mode: "forked"` with a `snapshot`.

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
- `formControlCount`: whether setup inputs/radios/checkboxes actually rendered
  as controls.
- `stateSurface`: `expected` from server-side static analysis, `visible` from
  the browser preview payload when a status/state surface is actually rendered.
- `toneCount`, `localStyleHookCount`, and `themeStyleHookCount`: whether visual
  distinction comes from Theme V3 tones, HTML style hooks, or bound Theme V3 CSS
  hooks.
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
multimodal access, open `previewUrl` and inspect it visually. If
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
