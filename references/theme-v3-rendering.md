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

## Server guide vs role contract

XMLV3's generic tag grammar is a platform concern. The server injects the
XMLV3 format guide near generation so AI clients do not need to paste the full
platform tag manual into `roleDetailDesc`.

Use `roleDetailDesc` for the card-specific format contract instead:

- which state fields this card updates
- when choices should appear and what they should change
- which optional extension pack is part of the card shape
- which visible status labels matter to play
- what the assistant must never decide for the player

Do not copy a generic XMLV3 instruction manual into detail. That wastes the
durable engine budget and makes future platform guide updates harder to follow.

## Compatible XMLV3 Extension Target

Keep XMLV3 evolution on one compatible XMLV3 extension target. No XMLV4:
do not create XMLV4, XMLV5, or a new format name when extending the framework. Add optional
tags, optional attributes, or extension packs with fallback behavior while
keeping older XMLV3 tags backward compatible.

## When to use XMLV3

Use XMLV3 when the welcome needs structured narrative blocks, dialogue, stage
directions, status panels, relationship cues, or other semantic sections that can
render consistently across clients.

Keep tags meaningful and parseable. If validation warns about raw fallback text,
rewrite the welcome into explicit XMLV3 tags.

Use the core tags first:

- `<scene>` wraps an opening beat's prose and dialogue.
- `<n>` is narration, physical action, and stage direction.
- `<speaker>` marks speaker changes.
- `<d>` is dialogue.
- `<quote>` is inner thought or emotional emphasis.
- `<choice>` gives a player action prompt.
- `<form>`, `<input>`, `<radio>`, and `<checkbox>` are for setup fields.
- `<state>` is hidden state data, not visible prose.

Keep scene prose separate from interactive controls. Close `</scene>` after the
current narrative beat, then place `bar`, `collapse`, `form`, `result-card`,
`share-text`, `choice`, and other controls as sibling tags. Do not wrap or nest a
whole welcome's controls inside one large `<scene>`; it makes mobile previews
cramped and causes every panel to look like it was stuffed into the same glass
card.

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

When using the MCP clean chat preview, inspect the assistant output bubble and
the state surface separately. The bubble should show only message output; XMLV3
state belongs outside the bubble as a status/state panel when available. Do not
judge avatar, byline, sidebar, composer, or other normal chat page chrome as
part of the card render. Open both desktop and mobile preview URLs when the
state surface, choice buttons, or layout density may change with viewport.

Use the preview page capture plan before deciding a visual pass/fail. Desktop
output must be captured at full content width in one horizontal view; do not
review left and right halves separately. Vertical overflow is expected for dense
HTML/XMLV3 cards and long AI turns: capture or scroll through every listed
vertical segment, then judge the full sequence. If only the top of the card is
visible, the review is incomplete, not proof that the card should be shortened.

`<action>` belongs to the battle extension pack. For prose actions, use `<n>`.
Only use `<action>` for battle markers with attributes such as `type`, `by`,
`target`, or `skill`.

## Optional extension packs

Use core tags first. Before falling back to HTML, check whether an XMLV3
extension pack can express the need. For example, a mini-game or structured
result flow can use optional tags such as `collapse`, `bar`, `tag`,
`result-card`, or `share-text` when that pack is enabled.

Use the layout pack when the author needs HTML div-like container structure:
`panel`, `stack`, `row`, `grid`, `choices`, and `divider` create section blocks,
grouped controls, compact columns, action groups, and visual separators without
exposing raw `style`/`class` or arbitrary CSS inside XML.

Treat layout as the safe structure layer. Theme V3 owns reusable identity through
theme-bound tone, palette, and panel tokens. For local HTML-like section
distinctions, XMLV3 also supports a constrained presentation-attribute escape
hatch:

- `panel`: `bg`, `background`, `border`, `color`, `text-color`, `txt-color`,
  `title-color`, `subtitle-color`, `radius`, and `padding`
- `choice`: `bg`, `background`, `border`, `color`, `text-color`, `txt-color`,
  and `radius`
- `form`: `bg`, `background`, `border`, `label-color`, `field-bg`,
  `field-border`, `option-bg`, `option-active-bg`, `accent`, `submit-bg`,
  `submit-color`, `submit-txt-color`, `radius`, and `padding`
- `collapse`: `bg`, `background`, `border`, `title-color`, `color`,
  `text-color`, `txt-color`, and `radius`
- `tag`: `bg`, `background`, `color`, `text-color`, `txt-color`, `border`,
  and `radius`; for legacy tag compatibility, `color` is the tag background
- `bar`: `track-bg`, `label-color`, `value-color`, `bg`, `background`,
  `color`, `text-color`, and `txt-color`

These attributes are not arbitrary CSS. Use only safe color values, Theme V3
variables, and tokenized radius/padding values. They are for card-specific local
contrast and sectioning when a full forked theme would be heavier than the
problem. Prefer Theme V3 variables for reusable style, and use presentation
attributes sparingly where the screenshot needs one section, one action, one
form, one collapse, one tag, or one meter to stand apart immediately. A client
that does not support them should still show readable XMLV3 content with
ordinary panels, choices, forms, collapses, tags, and bars.

Use `<choices cols="2" align="stretch" gap="sm">` for 2-4 short action buttons
that should share horizontal space. Consecutive naked `<choice>` tags may still
render as a usable fallback grid, including a full-width odd final item, but this
is a fallback path: the report should show `fallbackActionGroups`, and the author
has not declared grouping, density, or tone strategy. Use explicit `choices` for
short actions unless every option is intentionally long prose. `choices` may
carry `cols="1|2|3|auto"`, `align="start|center|end|stretch"`, `gap`, and
`variant`; each child `<choice>` may carry semantic `tone`, `variant`, `width`,
or `align` hooks. Use these as Theme V3 hooks, not arbitrary inline styling. If a
client lacks the layout pack, the child `<choice>` tags still remain readable and
clickable as fallback.

When XMLV3 is replacing a rich HTML card, run an HTML parity checklist before
writing more prose. The goal is not pixel parity with arbitrary HTML, but the
same play value:

- **sectioning parity**: HTML `div`/card stacks usually separate setup,
  clue, risk, status, input, and actions. XMLV3 should mirror that with
  `panel`, `stack`, `grid`, `divider`, and visible headings, not one long scene.
- **local color parity**: HTML often gives each section a different background,
  border, or accent. XMLV3 should map durable identity to semantic `tone` values
  and Theme V3 variables. Use constrained `panel` / `choice` presentation
  attributes only for local section contrast. Do not fake this with XML
  `style` or `class`.
- **action density parity**: 2-4 short actions should occupy a balanced row or
  grid through `choices`, not several unequal left-aligned buttons.
- **state parity**: durable meters and facts belong in `<state>` plus the
  external state/status surface; player-facing explanations belong in visible
  `panel`, `bar`, `tag`, or prose.
- **form parity**: if the HTML card uses inputs/radio/checkboxes, XMLV3 should
  use `form`, `input`, `radio`, and `checkbox` with concise labels. Do not
  bury setup questions in narration.
- **density parity**: desktop can carry more columns and compact panels; mobile
  must remain one vertical reading path. Judge density with actual desktop and
  mobile previews, not by shrinking the card text.

If XMLV3 fails this checklist, patch the presentation packet or Theme V3 before
improving the writing logic. A weak renderer makes even a strong role engine
look worse than it is.

For system/simulator and generator cards with a setup wizard or intake console,
also read `system-intake-card-design.md`. These cards should not collapse rich
HTML control surfaces into one XMLV3 scene. Preserve play value by mapping the
intake into sibling `panel`, `grid`, `form`, `bar`, `choices`, and
preview-compatible `state` blocks, with Theme V3 tones or constrained
presentation attributes carrying local color. The goal is HTML-to-XMLV3 parity
for sectioning, form controls, state, and balanced actions before changing the
writing logic.

Read the render report as a parity map before making prose changes:

- `actionColumns` should be at least 2 when there are 3-4 short actions.
- `groupedActions` means the author used an explicit layout group; this is
  preferred for dense action rows.
- `fallbackActionGroups` means the renderer rescued naked `<choice>` siblings.
  Accept the visual fallback only as temporary evidence; patch to explicit
  `<choices>` for durable card design.
- `nestedControls` means controls were placed inside `<scene>` and should be
  moved to sibling layout blocks.
- `themeHooks`, `customTones`, and `unresolvedTones` explain whether XMLV3 has
  enough Theme V3 backing to replace HTML local color/style blocks.
- `presentationAttrs` explains whether the author used the safe XMLV3
  presentation-attribute escape hatch. This is not the same as raw
  `style`/`class`; inspect the screenshot for readability, contrast, and visual
  hierarchy instead of treating it as a blocker by itself.
- `stateSurface` should become visible in browser preview when state exists.
  Server-only reports may say `expected`; verify the clean preview status area
  before accepting the card.

Theme V3 can make XMLV3 feel closer to high-quality HTML cards without putting
raw style inside XML. Useful CSS variable hooks include:

- panels: `--lt-panel-bg`, `--lt-panel-border`, `--lt-panel-title-color`
- choices: `--lt-choice-bg`, `--lt-choice-border-color`, `--lt-choice-color`
- forms: `--lt-form-bg`, `--lt-form-border`, `--lt-form-field-bg`,
  `--lt-form-field-border`, `--lt-form-option-bg`,
  `--lt-form-option-active-bg`, `--lt-form-control-accent`,
  `--lt-form-submit-bg`
- collapses and bars: `--lt-collapse-bg`, `--lt-collapse-border`,
  `--lt-collapse-title-color`, `--lt-bar-track-bg`, `--lt-bar-label-color`,
  `--lt-bar-value-color`

Call `extension_enable` with `packId: "layout"` when the presentation packet
uses layout pack tags. If layout is unavailable, the same content must still be
readable XMLV3 prose with scene text, choices, and status labels in order.

Use `extension_enable` only when the card's presentation packet names a specific
pack and explains why it improves play. If the pack is unavailable or unsupported
in a client, the card should still degrade to readable XMLV3 prose instead of
depending on custom HTML for core interaction.

## When to use Theme V3

Use Theme V3 for reusable visual identity: typography, colors, panels, speech
treatments, scene atmosphere, and extension packs. Binding a theme should not
hide critical story content.

## Real chat binding

XMLV3 welcome is not enough to prove XMLV3 real chat. For MCP-backed cards that
expect conversation replies to keep LunaTalk controls, call `theme_bind` before
simulation or acceptance. Without a role Theme V3 binding or enabled extension,
real chat may return `isV3:false` / `rendererMode:"plain"` and the assistant
reply will render like ordinary text even if the welcome preview looked
structured.

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
5. Read `capturePlan` and capture every required vertical segment before visual
   judgment.
6. Read `evaluation` for capture readiness, semantic structure, readability, and
   first-screen action visibility.
7. Check both desktop and mobile if available.
8. Produce a render repair packet before patching.
9. Patch the card or theme.
10. Re-run validation and render preview until blockers are gone.

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
