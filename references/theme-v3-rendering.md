# Theme V3 and Rendering Notes

Use this reference when authoring or reviewing visual card content.

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
2. Call `render_preview` with `mode: "full-card"` unless inspecting a specific
   `html` or `xmlv3` issue.
3. Open the `previewUrl` when the client has browser or multimodal access.
4. Check both desktop and mobile if available.
5. Patch the card or theme.
6. Re-run validation and render preview until blockers are gone.
