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

Return blockers, warnings, suggested fixes, quality dimensions, token budget,
score, and next tools. Treat `blocker` as a hard stop before publish.

Use `qualityDimensions` as the agent repair map:

- `promise`: the premise, player relationship, and tension are clear.
- `anchor`: the durable identity, behavior, and voice are strong enough.
- `consequence`: player choices can change state, relationship, route, risk, or
  other meaningful variables.
- `roleInitiative`: the role or system knows how to advance play when the player
  is passive, including what it asks, reveals, escalates, or offers.
- `agency`: the first user action path is obvious.
- `openingScene`: the welcome has a concrete first scene, not only choices or a
  menu. It should expose location/time/sensory context, a role beat, pressure, and
  player implication.
- `playerAgency`: the card does not decide the player's actions, feelings,
  consent, or commitments. It also catches generic openings such as "Hello, I am
  X, what do you want to do?"
- `languageStyle`: `zh-Hant` / `zh-TW` cards use Traditional Chinese consistently
  across profile, detail, welcome, and examples.
- `tokenEfficiency`: welcome/detail/render structure spends tokens where they
  improve play.
- `archetype`: the card satisfies its type-specific contract. Companion cards
  need relationship pressure and emotional boundaries; story cards need setting
  stakes and likely branches; game cards need rules, resources, failure pressure,
  and opening setup/state/choices; generator cards need intake, output schema,
  revision loop, and quality rubric.

Treat quality warnings as normal iteration work: thin premise, thin detail,
missing speaking style, missing progression/state, missing initiative, weak first
action path, player agency takeover, hollow opening, generic opening, language
mismatch, or token-heavy welcome should be patched before render review unless the
author explicitly accepts the tradeoff.

Use `tokenBudget` to inspect role structure before spending render or simulation
cost:

- `roleDescChars`, `roleDetailDescChars`, and `roleWelcomeChars` show where the
  card spends context.
- `estimatedTokens` is approximate and should be used for comparison, not billing.
- `welcomeToDetailRatio` above `2` with a long welcome usually means durable
  engine content is in the wrong field.
- `guidance` gives card-type length targets and repair hints.

When validation is not `pass`, `nextRecommendedTools` usually points to the
repair surface:

- `role_patch_profile` for premise/profile issues.
- `role_patch_detail` for anchor, voice, progression, and consequence issues.
- `role_patch_detail` for `roleInitiative` issues: add proactive turn rules for
  passive or stalled player input.
- `role_patch_welcome` for first-turn agency, HTML/XMLV3, and token-heavy welcome
  issues.
- `role_patch_welcome` for `openingScene` issues: add sensory/location context
  and a concrete first beat before the choices.
- `role_patch_profile`, `role_patch_detail`, and `role_patch_welcome` together
  for `languageStyle` issues, because mixed language can appear in any card field.
- `role_patch_detail` plus sometimes `role_patch_welcome` for `archetype` issues,
  depending on whether the missing part is durable logic or first-screen setup.
- `validate_role` after the patch.

Do not call `render_preview` or `simulate_private_chat` just because they are
available. Use them after validation passes, or after the author explicitly
accepts the remaining tradeoff.

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
