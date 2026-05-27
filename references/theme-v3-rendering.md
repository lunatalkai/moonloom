# Theme V3 and Rendering Notes

Use this reference when authoring or reviewing visual card content. For
pre-authoring or pre-render decisions about what belongs in XMLV3, Theme V3,
HTML, visible state, hidden state, or first-screen hierarchy, read
`presentation-design.md` first.

## Default choice

For new LunaTalk cards, prefer:

```text
XMLV3 welcome + Theme V3 styling
```

This keeps semantic story content separate from reusable visual style and makes
render review easier for AI clients.

## When to use XMLV3

Use XMLV3 when the welcome needs structured narrative blocks, dialogue, stage
directions, status panels, relationship cues, or other semantic sections that can
render consistently across clients.

Keep tags meaningful and parseable. If validation warns about raw fallback text,
rewrite the welcome into explicit XMLV3 tags.

Use the core tags first:

- `<scene>` wraps an opening beat.
- `<n>` is narration, physical action, and stage direction.
- `<speaker>` marks speaker changes.
- `<d>` is dialogue.
- `<quote>` is inner thought or emotional emphasis.
- `<choice>` gives a player action prompt.
- `<form>`, `<input>`, `<radio>`, and `<checkbox>` are for setup fields.
- `<state>` is hidden state data, not visible prose.

Do not invent aliases such as `<narration>` or `<dialogue>`. They may fall back
to visible text, but Theme V3 styling and validation are less reliable. Use
`<n>` and `<d>` instead.

`<state>` must contain valid JSON and is not rendered inline. If the player
should see a status sentence, write it in `<n>` and reserve `<state>` for
machine-readable updates. For MCP preview evidence, use a top-level
`scene` / `status` / `relationships` object so the preview summary can detect
state as present. Do not use flat state objects such as
`{"location":"...","trust":1}`; those may parse as JSON but still appear as
`state:none` in preview reports.

```xml
<state>{"scene":{"mood":"rain","location":"公寓門口"},"status":[{"key":"risk","label":"風險","value":"低"}],"relationships":[{"target":"小碟","label":"信任","affinity":1,"max":5}]}</state>
```

`<action>` belongs to the battle extension pack. For prose actions, use `<n>`.
Only use `<action>` for battle markers with attributes such as `type`, `by`,
`target`, or `skill`.

## When to use Theme V3

Use Theme V3 for reusable visual identity: typography, colors, panels, speech
treatments, scene atmosphere, and extension packs. Binding a theme should not
hide critical story content.

`theme_bind` supports:

- `mode: "reference"` with a `themeId`
- `mode: "forked"` with an inline `snapshot`

`extension_enable` toggles extension packs on the private role.

## When HTML is acceptable

Use HTML only when the author explicitly needs a custom one-off layout or when
migrating legacy HTML card content. HTML must not use scripts, inline event
handlers, or external URLs. Treat any validation blocker as mandatory to fix.

## Render review loop

1. Call `validate_role`.
2. Fix validation blockers before relying on visual review.
3. Call `render_preview` with `mode: "full-card"` unless inspecting a specific
   `html` or `xmlv3` issue.
4. Open the `previewUrl` when the client has browser or multimodal access.
5. Read `evaluation` for capture readiness, semantic structure, readability, and
   first-screen action visibility.
6. Check both desktop and mobile if available.
7. Produce a render repair packet before patching.
8. Patch the card or theme.
9. Re-run validation and render preview until blockers are gone.

## Render repair packet

```text
Render repair packet:
- roleId:
- render mode:
- preview evidence:
- visual failures:
- playability failures:
- technical blockers:
- patch target:
- next Moonloom skill:
- fields to preserve:
- fields to patch:
- validation needed:
- rerender stance:
- handoff:
```

Patch XMLV3 or Theme V3 only when the evidence points to visual structure,
readability, hidden/visible state, or first-screen hierarchy. If the preview is
pretty but inert, route to opening or agency repair before styling.
