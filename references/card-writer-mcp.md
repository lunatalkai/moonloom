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

## Core tool order

1. `role_create_private` or `role_get`
2. `role_patch_profile`
3. `role_patch_assets`
4. `role_patch_detail`
5. `role_patch_welcome`
6. Optional `theme_bind` and `extension_enable`
7. `validate_role`
8. `render_preview`
9. `simulate_private_chat`
10. `publish_submit` only after explicit author confirmation

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

Defaults: `language` is `zh-Hant`, `cardType` is `story`, and visibility is private.

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

### `role_patch_welcome`

Update the opening welcome. Supported modes are `plain`, `html`, and `xmlv3`.
Prefer `xmlv3` for new cards unless the author explicitly needs custom HTML.
For XMLV3, use registered tags such as `<scene>`, `<n>`, `<speaker>`, `<d>`,
`<quote>`, `<choice>`, `<form>`, and `<state>`. `<state>` must be JSON and is
hidden from inline rendering.

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

Use `mode: "reference"` with `themeId`, or `mode: "forked"` with a `snapshot`.

### `extension_enable`

Toggle a Theme V3 extension pack.

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

Do not call `render_preview` or `simulate_private_chat` just because they are
available. Use them after `validate_role` has no blockers and after the Moonloom
self-review says the draft is worth testing visually or behaviorally.

### `render_preview`

Create a short-lived preview URL and structured render report.

Optional `mode`: `full-card`, `xmlv3`, or `html`.
Optional `viewports`: usually `desktop` and `mobile`.

The response includes `evaluation`:

- `captureReadiness`: preview URL and viewport contract are usable.
- `semanticStructure`: HTML/XMLV3 safety and parse health.
- `readability`: overflow, contrast, console warnings, and runtime health.
- `actionVisibility`: the first screen exposes a player action path.

The first version uses client-side capture. If the AI client has browser or
multimodal access, open `previewUrl` and inspect it visually. If
`evaluation.status` is `warning`, follow `nextRecommendedTools`, patch
`roleWelcome`, rerun `validate_role`, then rerun `render_preview`.

### `simulate_private_chat`

Run the real LunaTalk private chat pipeline. It uses normal billing and deducts
credits or points according to the authenticated account's model and membership.

Required:

```json
{
  "schemaVersion": "2026-05-26.m1",
  "idempotencyKey": "simulate-...",
  "roleId": "...",
  "messages": ["..."]
}
```

`messages` must contain 1 to 5 user turns.

The response includes `evaluation`:

- `responsePresence`: catches empty or too-thin replies.
- `agency`: checks whether the reply gives the player a next action path.
- `progression`: checks whether the reply advances scene, relationship, route,
  risk, state, or a renewed hook.
- `safetyFormat`: catches obvious system/model artifacts.

When the response includes `conversationId` and per-turn `chatId` values, use the
dedicated app preview harness to inspect selected AI messages:

```text
/pages/mcp/rolePreview?conversationId=<conversationId>&chatId=<chatId>&roleId=<roleId>&pageSize=<n>
```

This preview is for message rendering evidence: XMLV3/HTML/Markdown mode, DOM
summary, paragraph spacing, overflow, relevant console errors, and screenshots.
Do not parse the normal chat page UI for transcript formatting.

If `evaluation.status` is `warning`, follow `nextRecommendedTools`: patch
`roleDetailDesc` and/or `roleWelcome`, run `validate_role`, then rerun
`simulate_private_chat`. There is no separate `simulation_evaluate` tool.

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
  "confirmationSummary": "Author confirmed after validation, render review, and simulation."
}
```
