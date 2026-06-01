# Theme V3 and Rendering Notes

Use this reference when authoring or reviewing visual card content. For
pre-authoring or pre-render decisions about what belongs in XMLV3, Theme V3,
HTML, visible state, hidden state, or first-screen hierarchy, read
`presentation-design.md` first. When a card intentionally uses HTML mode or
`hc-*` HTML card components, use `lunatalk-html-card-components` and also read
`html-card-components.md`.

## Default choice

For new LunaTalk cards, prefer:

```text
XMLV3 welcome + Theme V3 styling
```

This keeps semantic story content separate from reusable visual style and makes
render review easier for AI clients.

## Custom Theme V3 closed loop

Use custom Theme V3 when default styling cannot carry the role atmosphere,
worldview, story mood, custom action hierarchy, or custom `tone` values. Theme
V3 is for reusable visual language, not story facts.

Required loop before acceptance:

1. Draft the XMLV3 bubble and Theme V3 CSS together.
2. Call `theme_validate_css` and fix sanitizer warnings that affect the intended
   style.
3. Call `render_xmlv3_theme_case` to get a MCP preview URL and structured
   diagnostics before mutating a real role.
4. Run Visual Check in desktop and mobile using screenshots plus
   `window.__LUNATALK_MCP_PREVIEW__` when available.
5. Patch XMLV3 or Theme V3 CSS when contrast, spacing, overflow, unresolved
   custom tone hooks, action hierarchy, or mobile touch target issues appear.
6. Repeat for at most 3 loops / 3 iterations. If it still fails, report the
   remaining visual risk instead of claiming pass.
7. Only after the case passes, call `theme_create` or `theme_update`, then
   `theme_bind`, then real `render_preview`.

Use `theme_get` or `theme_list_available` when deciding whether to extend an
existing theme. Use `theme_create` for a new private custom theme and
`theme_update` for an owned draft. Never rely on default fallback when custom
`data-tone` or `tone` hooks are part of the XMLV3 card.

## AI Chat Bubble UI Guide

Design inside the AI reply bubble as message output, not as app chrome. Separate
the hierarchy:

- Dialogue / 台詞: use `<d>` for spoken lines.
- Narration / 旁白: use `<n>` for action, scene movement, and sensory prose.
- Status / 狀態: use `<field>` for text or enum facts and `<bar>` only for
  numeric continuous values.
- Choices / 選項: use `<choices>` with child `<choice>` so the action layout is
  explicit and durable.
- Hidden state: use `<state>` outside visible prose; keep it synchronized with
  visible fields or bars.

Theme V3 owns palette, borders, panel surfaces, button states, and custom tone
hooks such as `.lt-choice[data-tone="postal"]` or
`.lt-layout-panel[data-tone="signal"]`. XMLV3 owns the semantic content. Do not
put one-off inline `style` or `class` into XMLV3 just to force a look.

Visual Check must verify readable contrast, no clipping or overlap, clear action
hierarchy, resolved custom tone hooks, and mobile touch target size. Use at
least 44pt / 48dp as the practical minimum target for tappable choices and CTAs.

## HTML Card Components

HTML mode is a legacy/custom-layout exception, not the default for new cards. If
HTML is justified, use the stable component catalog in
`html-card-components.md`: `hc-btn`, `hc-bar`, `hc-stat`, `hc-tag`,
`hc-collapse`, `hc-radio`, `hc-checkbox`, `hc-input`, and `hc-form`. Do not
invent new `hc-*` components or rely on scripts, inline event handlers, external
URLs, or client-specific custom elements. If XMLV3 plus layout/control packs can
express the same play value, stay in XMLV3. Renderer modes are mutually
exclusive: never put `hc-*` or HTML containers inside XMLV3 content.

## Server guide vs role contract

XMLV3's generic tag grammar is a platform concern. The server injects the
XMLV3 format guide near generation so AI clients do not need to paste the full
platform tag manual into `roleDetailDesc`.

Use `roleDetailDesc` for the card-specific format contract instead:

- which state fields this card updates
- which status bar fields this card shows and how each one updates
- when choices should appear and what they should change
- which optional extension pack is part of the card shape
- which visible status labels matter to play
- what the assistant must never decide for the player
- roleDetailDesc: when this card should use controls, which state fields update,
  and what visible choices/status blocks mean

Do not copy a generic XMLV3 instruction manual into detail. That wastes the
durable engine budget and makes future platform guide updates harder to follow.

## Compatible XMLV3 Extension Target

Keep XMLV3 evolution on one compatible XMLV3 extension target. No XMLV4:
do not create XMLV4, XMLV5, or a new format name when extending the framework. Add optional
tags, optional attributes, or extension packs with fallback behavior while
keeping older XMLV3 tags backward compatible.

## XMLV3 feature levels

Use XMLV3 feature levels to separate the stable baseline from newer renderer
capabilities.

- **Feature Level 1** is the 2026-05-27 XMLV3 baseline. Treat it as supported by
  all XMLV3-capable LunaTalk clients. It covers the core XMLV3 tags and older
  extension behavior.
- **Feature Level 2** is the HTML-parity extension layer. It covers layout
  containers, explicit grouped/weighted choices, fact-card style visible status,
  semantic speaker usage, and token-economy guidance for dynamic XML output.

Cards should declare the minimum XMLV3 feature level they require. A card that
uses Level 2 tags or behavior should set its minimum feature level to `2` and
list the relevant capabilities, such as `layout.containers`,
`choices.weighted`, `status.fact-cards`, `speaker.semantic`, or
`token.output-economy`. A baseline XMLV3 card should remain at Level 1.

When generating dynamic assistant turns, do not assume the latest XMLV3 feature
level. Generate at or below the client-declared renderer level. If the client is
Level 1, use Level 1-safe output even when the platform has newer guidance. If a
card itself requires Level 2 and the current client only supports Level 1, treat
that as a compatibility issue before judging the prose or interaction quality.

Level 2 is still XMLV3, not a new format. Do not create XMLV4/XMLV5, do not
paste raw HTML into XMLV3, and do not copy a full platform XMLV3 manual into
`roleDetailDesc`. The role should contain the card-specific contract: which
feature level it needs, which packs are enabled, which state fields update, and
how visible status/actions should behave.

## When to use XMLV3

Use XMLV3 when the welcome needs structured narrative blocks, dialogue, stage
directions, status panels, relationship cues, or other semantic sections that can
render consistently across clients.

Keep tags meaningful and parseable. If validation warns about raw fallback text,
rewrite the welcome into explicit XMLV3 tags.

Use the core tags first:

- `<scene>` wraps an opening beat's prose and dialogue.
- `<n>` is narration, physical action, and stage direction.
- `<speaker>` marks speaker changes, not every line of dialogue. For a
  single-speaker card or turn, omit `<speaker>` and write `<d>` directly; the
  chat bubble and role context already identify who is speaking.
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

Hidden <state> JSON high-drift is expected in long real chats. Hidden `<state>`
JSON is a high-drift output trap in real chat. In plain terms, hidden <state>
JSON is high-drift. Even when
`roleDetailDesc` asks for state every turn, the model may omit it after several
rounds. When state matters, provide a visible panel/state-surface fallback with
the same player-facing facts; the visible panel is the source of truth for the
player. Then use hidden `<state>` JSON as the machine-readable source when it
appears. Treat missing `<state>` after a real state change as a simulation
warning and patch the role-specific output contract.

Weak models can suffer format dilution even when the card's behavior remains
good. A long emotional turn may drop XMLV3 and create an absorbing-state-like /
self-reinforcing format drift where later turns imitate the plain-text output.
U-shaped attention can delay not cure this. Test format stability for 10+ turns
when using panels, bars, choices, or hidden state, and record
`structureShare`, `panelRetention`, and `choicesRetention` when available.
Choices are fragile and often first drop, so protect choices as the required
closure surface at decision points
rather than adding more decorative controls.
U-shaped can delay not cure weak-model format collapse.

Visible status widgets must stay in sync with hidden state. If a visible `bar`
or meter and hidden `state.status` / `state.relationships` describe the same
metric, they should share the same key or label, and their value/max must match.
A clean preview warning such as `stateVisualMismatchCount > 0` or
`xmlv3_state_visual_value_mismatch` means the bubble and external status surface
are presenting two different truths; fix the XMLV3 output before judging prose
quality.

The status bar / 狀態欄 is an update contract, not progress bars or a meter dump.
Keep it to 2-6 fields that change play: scene/time/phase, relationship
pressure, risk, resources, clues, route gates, or available support. `bar` is
only for continuous numeric values. Text, enum, flag, resource, phase, location,
or available/unavailable fields should use `state.status[].value`,
`state.relationships[].value`, visible field/panel/prose, or the external fact
card surface instead of being forced into `max:100`. `roleDetailDesc` should
define the update contract for every kept field: stable key, label, allowed
values, update trigger, play effect, and output cadence.

For `<bar>`, the `value` attribute must be one single numeric value; bar value
must be a single number. Do not write 8 -> 14 in bar value; it will break
progress rendering. Do not put change strings such as `8 -> 14`, `8-14`, or
`+6` in `value`; that breaks progress rendering. Put the delta / change amount
in visible prose, a field, or the state panel, while the bar keeps `value="14"`
and a numeric `max`.

```xml
<state>{"scene":{"mood":"rain","location":"公寓門口"},"status":[{"key":"risk","label":"風險","value":"低"}],"relationships":[{"target":"小碟","label":"信任","affinity":1,"max":5}]}</state>
```

When using the MCP clean chat preview, inspect the assistant output bubble and
the state surface separately. The bubble should show only message output; XMLV3
state belongs outside the bubble as a status/state panel when available. Do not
judge avatar, byline, sidebar, composer, or other normal chat page chrome as
part of the card render. Open both desktop and mobile preview URLs when the
state surface, choice buttons, or layout density may change with viewport.

For inline XMLV3 preview probes before a production role exists, use the same
clean preview page. Store `{ xml, themeCss, themeMode, state, roleName }` in the
target app origin under `lunatalk:mcp-preview:payload:<payloadKey>`, then open
`/pages/mcp/rolePreview?payloadKey=<payloadKey>&viewport=desktop` and repeat
with `viewport=mobile`. For tiny probes, encoded query params `xml`,
`themeCss`, `themeMode`, `stateJson`, and `roleName` are supported. After
render, compare screenshots with `report.surfaceDiagnostics` when the client can
read `window.__LUNATALK_MCP_PREVIEW__`. Moonloom uses this only to review
generated card content; XMLV3 renderer implementation issues belong to the
LunaTalk renderer project.

Use the preview page capture plan before deciding a visual pass/fail. Desktop
output must be captured at full content width in one horizontal view; do not
review left and right halves separately. Vertical overflow is expected for dense
HTML/XMLV3 cards and long AI turns: capture or scroll through every listed
vertical segment, then judge the full sequence. If only the top of the card is
visible, the review is incomplete, not proof that the card should be shortened.

`<action>` belongs to the battle extension pack. For prose actions, use `<n>`.
Only use `<action>` for battle markers with attributes such as `type`, `by`,
`target`, or `skill`.

## XMLV3 Control Catalog

This catalog mirrors registered LunaTalk XMLV3 controls. It is a platform
reference for authors and server prompts; do not paste it wholesale into
`roleDetailDesc`. A role detail should only say when this card should use
controls, which state fields update, and what each visible choice/status means.

- Core story: `<scene>`, `<n>`, `<d>`, and `<quote>` cover scene grouping,
  narration, dialogue, and inner emphasis. `<speaker>` is only for real speaker
  changes.
- Player actions: `<choices>` groups 2-4 `<choice>` buttons with balanced or
  weighted layout. A single `<choice>` remains valid fallback.
- Setup form: `<form>`, `<input>`, `<radio>`, `<checkbox>`, and `<option>`
  collect first-turn setup or generator intake.
- Layout: `<panel>`, `<stack>`, `<row>`, `<grid>`, `<field>`, and `<divider>`
  create safe HTML-like sections, vertical rhythm, short rows, compact columns,
  label-description facts, and separators.
- Status / mini-game: `<bar>` is for continuous numeric values only;
  `<collapse>`, `<tag>`, `<result-card>`, and `<share-text>` cover optional
  rules, badges, final outcomes, and share text.
- Battle: `<action>`, `<damage>`, and `<turn>` are battle-resolution tags.
- Inventory: `<loot>`, `<item>`, `<stat>`, and `<desc>` are for real item
  acquisition and item cards.
- TRPG: `<roll>`, `<check>`, and `<announcement>` are for dice, checks, and
  system notices.
- VN: `<cg>` and `<flag>` are for rare visual-novel CG moments and route flags.

Control parameter reference:

- scene: mood/location/time. Use for the current narrative beat's atmosphere,
  place, and time; `mood` is a Theme V3 hook, while `location` and `time` may
  render as metadata.
- n/d/quote/speaker: no required params. Use `n` for narration/action prose,
  `d` for spoken dialogue, `quote` for inner emphasis, and `speaker` only when
  the active speaker changes.
- choice: send/tone/variant/width/align/span/type/category. `send` is the full
  user intent; `tone`, `type`, and `category` are semantic hooks; `variant` is
  `soft|solid|outline|ghost|glass`; `width` is `auto|full|half|third|fill`;
  `align` is `left|center|right`; `span` is `full|2|3|4` for weighted action
  grids. Recommended when one button equals one clear player intent.
- state: scene/status/relationships. Hidden JSON only. Use `scene` for
  mood/location/time, `status` for key/label/value/max facts, and
  `relationships` for target/label/value or affinity/max. Recommended when
  later rendering or behavior needs machine-readable state.
- form: btn/submit-label plus safe presentation attrs. Recommended for first
  setup or intake; stop repeating it after setup is complete.
- input: name/label/placeholder/value/type. Recommended for free-text setup;
  `value` pre-fills editable text, not a locked answer.
- radio/checkbox: name/label/options. Use comma/pipe-separated `options` or
  child `<option>` tags; radio is one-of-many, checkbox is many-of-many.
- option: value/label. Use stable `value` for submission and visible label/body
  for the user-facing text.
- panel: title/subtitle/tone/variant. Recommended for one compact information
  section, clue card, status block, or setup group.
- stack: gap. Use `xs|sm|md|lg` when several blocks need vertical rhythm.
- row: gap/wrap/align/justify. Recommended for short chips or tiny facts only;
  do not use row+tag+n for label-description prose.
- grid: cols/gap. Use `cols=1|2|3` for short comparable facts; do not place long
  paragraphs in multi-column grids.
- field: label/value/tone. Recommended for label + description facts, status
  facts, task summaries, or checklist items.
- choices: cols/gap/align/variant. Use `cols=1|2|3|4|auto`, gap
  `xs|sm|md|lg`, align `start|center|end|stretch`, and variant
  `soft|solid|outline|ghost|glass`. Recommended for 2-4 short actions.
- divider: label. Use only when a visual break improves scanning.
- bar: label/value/max/color. Use only for continuous numeric values and keep
  visible value/max synced with hidden `<state>`.
- tag: color/bg/background/text-color/txt-color/border/radius. Use tiny badges,
  flags, resource markers, or labels; `color` is legacy background.
- collapse: title/open. Use optional rules, help, lore, or logs that should not
  dominate the first screen.
- result-card: title/theme. Themes are `dark|light|purple|red|blue|green|gold`;
  use for final outcomes, scores, endings, or shareable mini-game results.
- share-text: no required params. Use directly after a result-card for a short
  share/copy summary.
- action: by/type/target/skill/dmg/crit. Use only for battle resolution.
- damage: target/amount/type. Use after battle action; type is
  `physical|magic|heal`.
- turn: next. Use for battle turn ownership.
- item: id/name/rarity/type. Rarity is `common|rare|epic|legendary`; type is
  `weapon|armor|consumable|key|misc`. Use only for real item cards inside
  `<loot>`. `<stat>` and `<desc>` carry item stat lines and description text.
- roll: dice/skill/dc/result/total/success. Use for resolved TRPG dice rolls.
- check: type/skill/dc/roll/success. Use active/passive checks; active checks
  may omit roll/success until the player acts.
- announcement: type. Use `death|levelup|warn|info` for system notices that
  affect play.
- cg: prompt/style/seq/url/status/width/height. Use rare VN visual moments;
  `style` is `anime|realistic|pixel|oil_painting|sketch`, `seq` deduplicates,
  and `status` is `loading|ready|failed`.
- flag: key/value. The tag is invisible; write durable route flags into
  `<state>` too.

When to use these controls:

- Use story tags for the current beat, not for dashboard layout.
- Use panel/field/grid when information hierarchy matters; long prose stays in
  one column.
- Use choices when action hierarchy matters; each choice should carry one
  clear intent.
- Use state for machine-readable changes, then show the player-facing meaning
  through visible prose, field, bar, tag, or panel.
- Keep the UI mobile-first: readable body text, line-height around 1.5-1.75,
  at least 4.5:1 contrast for normal text, touch-friendly short choices, and no
  color-only meaning.

## Optional extension packs

Use core tags first. Before falling back to HTML, check whether an XMLV3
extension pack can express the need. For example, a mini-game or structured
result flow can use optional tags such as `collapse`, `bar`, `tag`,
`result-card`, or `share-text` when that pack is enabled.

Use the layout pack when the author needs HTML div-like container structure:
`panel`, `stack`, `row`, `grid`, `field`, `choices`, and `divider` create
section blocks, grouped controls, compact columns, label-description facts,
action groups, and visual separators without exposing raw `style`/`class` or
arbitrary CSS inside XML.

Use `<field label="...">...</field>` for a single information row, status fact,
task summary, or setup checklist item. Do not use row+tag+n or
`<row><tag>...</tag><n>...</n></row>` for label-description facts: that pattern
turns labels into decorative pills and ordinary descriptions into narration.

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
ordinary panels, fields, choices, forms, collapses, tags, and bars.

Use `<choices cols="2" align="stretch" gap="sm">` for ordinary 2-4 short action
buttons that should share horizontal space. Use weighted action hierarchy when
one action should visually lead the set: `<choices cols="4">` with
`<choice span="full">` for a primary row, or `span="2"` / `span="3"` / `span="4"`
for 2:1:1, 3:1, or full-width weighting. Omit `span` for a normal one-column
item; do not write `span="1"`. Mobile preview collapses weighted choices into a
vertical or near-single-column reading path, so the fallback remains readable
instead of forcing cramped mini-buttons.

Consecutive naked `<choice>` tags may still render as a usable fallback grid,
including a full-width odd final item, but this is a fallback path: the report
should show `fallbackActionGroups`, and the author has not declared grouping,
density, tone strategy, or action hierarchy. Use explicit `choices` for short
actions unless every option is intentionally long prose. `choices` may carry
`cols="1|2|3|4|auto"`, `align="start|center|end|stretch"`, `gap`, and `variant`;
each child `<choice>` may carry semantic `tone`, `variant`, `width`, `align`, or
`span` hooks. Use these as Theme V3 hooks, not arbitrary inline styling. If a
client lacks the layout pack, the child `<choice>` tags still remain readable and
clickable as fallback.

When XMLV3 is replacing a rich HTML card, run an HTML parity checklist before
writing more prose. The goal is not pixel parity with arbitrary HTML, but the
same play value:

- **sectioning parity**: HTML `div`/card stacks usually separate setup,
  clue, risk, status, input, and actions. XMLV3 should mirror that with
  `panel`, `stack`, `grid`, `field`, `divider`, and visible headings, not one
  long scene.
- **local color parity**: HTML often gives each section a different background,
  border, or accent. XMLV3 should map durable identity to semantic `tone` values
  and Theme V3 variables. Use constrained `panel` / `choice` presentation
  attributes only for local section contrast. Do not fake this with XML
  `style` or `class`.
- **action density parity**: 2-4 short actions should occupy a balanced row or
  grid through `choices`, not several unequal left-aligned buttons. When HTML
  gives the primary action more visual weight, XMLV3 should use weighted
  `cols="4"` plus `span="full"` / `span="2"` rather than flattening every button.
- **state parity**: durable meters and facts belong in `<state>` plus the
  external state/status surface; player-facing explanations belong in visible
  `panel`, `bar`, `tag`, or prose. When a visible `bar` and hidden state refer to
  the same key or label, their value/max must match so the bubble and the
  external status surface read as one state system. Do not convert every status
  into a meter: use `bar` for continuous numeric pressure, and use fact cards,
  tags, relationship/resource cards, or short panels for text, enum, flag, phase,
  clue, and resource fields.
- **form parity**: if the HTML card uses inputs/radio/checkboxes, XMLV3 should
  use `form`, `input`, `radio`, and `checkbox` with concise labels. Do not
  bury setup questions in narration. Intake-first system cards should preserve
  dense setup surfaces; a clean preview with fewer than six rendered form
  controls is usually still below rich HTML intake parity.
- **density parity**: desktop can carry more columns and compact panels; mobile
  must remain one vertical reading path. Judge density with actual desktop and
  mobile previews, not by shrinking the card text.
- **token parity**: V2 HTML can spend many generated tokens on repeated tags,
  attributes, inline CSS, class names, and wrapper scaffolding. XMLV3 should
  keep the visual hierarchy but move reusable style to Theme V3, use short
  semantic tone/variant hooks, omit single-speaker `<speaker>`, and emit only
  changed setup/state values after the opening.

If XMLV3 fails this checklist, patch the presentation packet or Theme V3 before
improving the writing logic. A weak renderer makes even a strong role engine
look worse than it is.

For system/simulator and generator cards with a setup wizard or intake console,
also read `system-intake-card-design.md`. These cards should not collapse rich
HTML control surfaces into one XMLV3 scene. Preserve play value by mapping the
intake into sibling `panel`, `grid`, `form`, `bar`, `choices`, and
preview-compatible `state` blocks, with Theme V3 tones or constrained
presentation attributes carrying local color. The goal is migration parity:
rewrite HTML surfaces into XMLV3 equivalents for sectioning, dense form
controls, state, and balanced actions before changing the writing logic.

Read the render report as a parity map before making prose changes:

- `actionColumns` should be at least 2 when there are 3-4 short actions.
- `choiceSpans` / `choiceSpanCount` should be nonzero when a primary action,
  2:1:1 grouping, or 3:1 weighted hierarchy is part of the intended layout.
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
- `stateVisualMismatchCount` / `xmlv3_state_visual_value_mismatch` means a
  visible bar or meter disagrees with hidden state using the same key or label.
  Treat this as a structure bug, not a writing-style issue.

Theme V3 can make XMLV3 feel closer to high-quality HTML cards without putting
raw style inside XML. Useful CSS variable hooks include:

- panels: `--lt-panel-bg`, `--lt-panel-border`, `--lt-panel-title-color`
- fields: `--lt-field-accent`, `--lt-field-label-color`,
  `--lt-field-body-color`, `--lt-field-value-color`
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

## Token-Aware Rendering

Use `o200k_base` as the single offline tokenizer baseline for card token reviews.
Apply it consistently across V2 HTML, XMLV3, Theme V3, OpenAI, Claude, and
unknown-provider budget checks so render-format diffs are comparable. Treat the
result as a local structure and attention-cost estimate, not an exact provider
billing statement.

Review visible value and structure cost separately. Input-side context is
`roleDetailDesc + roleWelcome`; `roleDesc` is display/search context and is not
model input. Do not hollow out detail to reduce tokens. The optimization target
is per-turn AI output: if markup, wrapper tags, inline CSS, class names, or
unchanged setup controls dominate the generated output, do not ask the model to
"write better prose" first. Patch the XMLV3 structure or Theme V3 style layer so
the next turn spends tokens on story, state, consequences, and actionable
choices.

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
4. Open the clean `previewUrl` when the client has browser or multimodal access.
   Do not add `debug=1` during ordinary UI review; debug chrome is only for
   renderer diagnosis and can add headers, IDs, and report panels that should
   not be judged as part of the card output.
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
