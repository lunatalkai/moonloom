# Card Writer MCP Reference

Use this reference when a Moonloom skill needs concrete Card Writer MCP details.

## Endpoint

Hosted endpoint:

```text
https://api.lunatalk.ai/mcp/card-writer
```

Local development:

```text
http://localhost:8888/mcp/card-writer
```

Authentication uses the logged-in LunaTalk account token:

```http
Authorization: Bearer <LUNATALK_ACCOUNT_TOKEN>
```

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
3. `role_patch_detail`
4. `role_patch_welcome`
5. Optional `theme_bind` and `extension_enable`
6. `validate_role`
7. `render_preview`
8. `simulate_private_chat`
9. `publish_submit` only after explicit author confirmation

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

Return blockers, warnings, suggested fixes, score, and next tools. Treat `blocker`
as a hard stop before publish. Treat quality warnings as normal iteration work:
thin premise, thin detail, missing speaking style, missing progression/state, or
weak first action path should be patched before render review unless the author
explicitly accepts the tradeoff.

### `render_preview`

Create a short-lived preview URL and structured render report.

Optional `mode`: `full-card`, `xmlv3`, or `html`.
Optional `viewports`: usually `desktop` and `mobile`.

The first version uses client-side capture. If the AI client has browser or
multimodal access, open `previewUrl` and inspect it visually.

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
