# Moonloom Presentation Design

Use this reference before authoring or rendering when the card needs a decision
about XMLV3, Theme V3, HTML, visible state, hidden state, or first-screen visual
hierarchy.

## Core rule

Presentation is not decoration. It should make the card easier to play.

- XMLV3 carries semantic first-screen content: scene beats, dialogue, choices,
  setup fields, and compact hidden state.
- Theme V3 carries reusable visual identity: typography, color, panels, speech
  treatments, atmosphere, and extension packs.
- Renderer modes are mutually exclusive. Choose one welcome renderer:
  Markdown/plain, HTML, or XMLV3. Do not mix XMLV3 tags with HTML or `hc-*`.
- The layout pack is XMLV3's safe div-like layer. Use `panel`, `stack`, `row`,
  `grid`, `choices`, and `divider` for container, section block, grouping,
  action-button layout, and separation.
- Theme V3 tone and color tokens carry reusable visual identity. Constrained
  XMLV3 presentation attributes may carry card-specific local contrast for
  `panel`, `choice`, `form`, `collapse`, `tag`, and `bar`, but raw XML
  `style`/`class` still does not belong in role content.
- HTML is an exception for custom one-off layout or legacy migration.
- Render review proves the result only after a real validation or preview exists.
- Platform XMLV3 syntax belongs to the server guide. `roleDetailDesc` should
  carry only the card-specific format contract: when this card should use
  controls, state fields, choice rules, pack choice, visible status meaning,
  and player-agency boundaries.
- Weak-model structural budget matters. If a one-shot card must preserve XMLV3
  over long play, plan the minimum skeleton first: scene wrapper, visible
  state/panel when needed, and choices at decision points. Add decorative panels,
  bars, and nested layout only after that skeleton is stable.
- XMLV3 compatible extension work stays on one target. Do not create XMLV4;
  add optional tags, optional attributes, or packs with fallback behavior.
- XMLV3 Feature Level 3 adds atomized layout primitives, not a new renderer
  family. Use lowercase/kebab-case `<linear-layout>`, `<flex-layout>`,
  `<grid-layout>`, `<view>`, `<container>`, `<card>`, `<text>`, `<heading>`,
  `<paragraph>`, `<image>`, `<button>`, `<badge>`, `<notice>`, `<list>`,
  `<list-item>`, `<avatar>`, `<info-row>`, and `<fact>` when nested layout or
  user-defined atom-based controls are needed.
- FL3 bare numeric sizes use XMLV3 layout unit mapping: 1 layout unit = 1px on
  Desktop/H5 and 1 layout unit = 2rpx on Mobile/uni-app. Write `height="120"`,
  not `height="120px"` or `height="240rpx"`.
- Theme V3 custom controls are declared in `tagConfig.xmlv3.components`. Their
  component CSS may use `:host` for the custom root and `part(name)` for an
  atomic child with `part="name"`; XML still must not use `class` or `style`.
- If HTML mode or `hc-*` HTML card components are intentionally needed, use
  `lunatalk-html-card-components`, load `html-card-components.md`, and use only
  the supported component catalog.

## Lane decision

Use `lunatalk-presentation-director` when the author is still deciding:

- welcome mode: plain, XMLV3, or HTML
- what belongs on screen versus in hidden state
- what belongs in Theme V3 versus `roleWelcome`
- whether visual panels, forms, choices, or status blocks earn their space
- first-screen hierarchy before final field assembly
- presentation handoff before `validate_role` or `render_preview`

Do not use presentation design as a catch-all:

- Use `lunatalk-render-review` when a preview URL, screenshot, render report,
  validation report, DOM summary, contrast report, or blocked request list exists.
- Use `lunatalk-token-architect` when there is a concrete tokenBudget,
  `welcomeToDetailRatio`, overlong welcome, field-allocation failure, duplicated
  lore, or HTML/XMLV3 bloat that already has size evidence.
- Use `lunatalk-opening-director` when the first screen lacks place/time, role
  action, pressure, player implication, reply paths, or second-turn change.
- Use `lunatalk-agency-designer` when visual choices are decorative, funnel the
  player, or decide the player's actions, feelings, identity, or consent.

## Presentation packet

```text
Presentation packet:
- current request:
- presentation promise:
- prerequisite packets:
- welcome mode: plain | xmlv3 | html
- mode decision:
- XMLV3 semantic plan:
- XMLV3 capability / pack plan:
- visible content map:
- hidden state JSON plan:
- status bar update contract:
- Theme V3 responsibilities:
- roleDetailDesc responsibilities:
- HTML decision:
- visual affordance table:
  - element:
  - purpose:
  - proves action / state / mood / route / risk / clue / resource / boundary:
  - keep | move | cut:
- first-screen hierarchy:
- mobile / readability risks:
- token stance:
  - tokenizer baseline:
  - structure-token risk:
  - weak-model minimum skeleton:
  - choices retention:
  - repeated style/setup moved to Theme V3:
- render review plan:
- handoff:

Self-review:
- content is playable, not poster-only:
- hidden state is JSON, not prose:
- Theme V3 carries style, not story logic:
- HTML is justified or rejected:
- player's next action is visible:
- next skill:
```

## Welcome mode decision

Choose `plain` when the first screen is mostly prose and does not need structured
state, choices, or setup fields.

Choose `xmlv3` when structure improves play: scene beats, speaker changes,
visible status, relationship cues, choices, forms, or hidden state. XMLV3 cards
must output XMLV3 tags only.

Choose `html` only when a specific custom layout is necessary or existing HTML
must be migrated. HTML must not rely on scripts, inline handlers, external URLs,
or critical behavior hidden in unsupported code. When HTML is justified, read
`html-card-components.md`; do not invent unsupported `hc-*` tags or attributes,
and do not expect XMLV3 tags to be handled by the XMLV3 renderer.

Before choosing HTML, check whether core XMLV3 plus an enabled extension pack can
express the need. For example, setup and result surfaces may use pack tags such
as `collapse`, `bar`, `tag`, `result-card`, or `share-text`. If a pack is needed,
record why and hand off to `extension_enable`; if a client lacks the pack, the
fallback must remain readable XMLV3 prose.

If the need is "I want HTML div blocks with different local colors", try the
layout extension first: `panel`, `stack`, `row`, `grid`, `field`, `choices`,
and `divider` provide the container structure, label-description fact rows, and
action-button grouping. Use Theme V3 for reusable tone, palette, and panel
color. Use `<field label="...">...</field>` for information rows; do not use
row+tag+n or `<row><tag>...</tag><n>...</n></row>` for label-description facts.
When only one section or action needs local emphasis, use the constrained
presentation attributes instead of
falling back to HTML:

```xml
<panel title="Current lead" bg="rgba(16, 22, 30, 0.82)" border="rgba(121, 168, 255, 0.42)" radius="lg" padding="md">
  <field label="Clue">The clue is readable because the block has its own local contrast.</field>
</panel>
<choices cols="2" align="stretch" gap="sm">
  <choice bg="var(--lt-choice-bg)" border="rgba(255,255,255,0.24)">Check the lock</choice>
  <choice bg="rgba(84, 46, 130, 0.55)" color="#ffffff">Question the witness</choice>
</choices>
<choices cols="4" align="stretch" gap="sm">
  <choice span="full" tone="primary">Begin the main route</choice>
  <choice span="2" tone="clue">Inspect the clue</choice>
  <choice tone="neutral">Wait</choice>
  <choice tone="risk">Take the risk</choice>
</choices>
<bar label="Pressure" value="71" max="100" color="#fb7185" track-bg="rgba(255,255,255,0.08)" />
```

Do not put raw `style`/`class` or arbitrary CSS in XML. Call
`extension_enable` for `layout` only when the structure changes play readability,
state visibility, or action hierarchy; if unsupported, the fallback should still
read as ordered XMLV3 prose.

Use weighted `<choices cols="4">` only when action hierarchy matters. A primary
button may use `span="full"`; a secondary action may use `span="2"` for a 2:1:1
layout, or `span="3"` / `span="4"` for 3:1 and full-width weighting. Omit
`span` for a normal one-column action. On mobile, the same layout should collapse
to a vertical or near-single-column path so text remains readable instead of
becoming cramped.

## XMLV3 Control Catalog

Use this catalog when planning a card surface. It is not something to paste into
`roleDetailDesc`; roleDetailDesc should state when this card should use controls,
what state fields change, and what each visible action/status means.

- Core story: `<scene>`, `<n>`, `<d>`, and `<quote>` cover scene grouping,
  narration, dialogue, and inner emphasis. `<speaker>` is only for speaker
  changes.
- Actions: `<choices>` groups 2-4 `<choice>` buttons; naked `<choice>` is a
  fallback for one action.
- Forms: `<form>`, `<input>`, `<radio>`, `<checkbox>`, and `<option>` collect
  setup or intake.
- Layout: `<panel>`, `<stack>`, `<row>`, `<grid>`, `<field>`, and `<divider>`
  provide section blocks, vertical rhythm, short rows, compact columns,
  label-description facts, and separators.
- Feature Level 3 atoms: `<linear-layout>`, `<flex-layout>`, `<grid-layout>`,
  `<view>`, `<container>`, `<card>`, `<text>`, `<heading>`, `<paragraph>`,
  `<image>`, `<button>`, `<badge>`, `<notice>`, `<list>`, `<list-item>`,
  `<avatar>`, `<info-row>`, and `<fact>` provide atomized layout and UI
  primitives for advanced XMLV3 surfaces and Theme V3 custom components.
- Status / mini-game: `<bar>` is only for continuous numeric values;
  `<collapse>`, `<tag>`, `<result-card>`, and `<share-text>` cover optional
  rules, badges, results, and share text.
- Battle: `<action>`, `<damage>`, and `<turn>` are battle resolution.
- Inventory: `<loot>`, `<item>`, `<stat>`, and `<desc>` are item acquisition and
  item cards.
- TRPG: `<roll>`, `<check>`, and `<announcement>` are dice, checks, and system
  notices.
- VN: `<cg>` and `<flag>` are rare visual-novel visual/route markers.

Control parameter reference:

- scene: mood/location/time. Use for atmosphere, place, and time on one story
  beat; `mood` is a theme hook.
- n/d/quote/speaker: no required params. Use `speaker` only when the active
  speaker changes.
- choice: send/tone/variant/width/align/span/type/category. `send` is the full
  user intent; `tone`, `type`, and `category` are semantic hooks; `variant` is
  `soft|solid|outline|ghost|glass`; `width` is `auto|full|half|third|fill`;
  `align` is `left|center|right`; `span` is `full|2|3|4`.
- state: scene/status/relationships. Hidden JSON only; use it for machine
  updates that later rendering or behavior depends on.
- form: btn/submit-label. Use for first-turn setup or creator intake.
- input: name/label/placeholder/value/type. Use for editable text setup.
- radio/checkbox: name/label/options. Use radio for one-of-many and checkbox
  for many-of-many; child `<option>` may provide explicit values.
- option: value/label. Use stable values for submitted form data.
- panel: title/subtitle/tone/variant. Use one compact section, clue card, status
  block, or setup group.
- stack: gap. Use `xs|sm|md|lg` for vertical rhythm.
- row: gap/wrap/align/justify. Use short chips or tiny facts; avoid
  row+tag+n for information fields.
- grid: cols/gap. Use `cols=1|2|3` for short comparable facts.
- linear-layout/flex-layout/grid-layout: orientation/weight/wrap/columns/gap.
  Use these for atomized nested layout and child weighting.
- view/container/card/text/heading/paragraph/image/button/badge/notice/list/list-item/avatar/info-row/fact:
  use safe width/height/padding/margin/gap/border/borderRadius/background and
  alignment attrs; bare numeric width/height values are layout unit numbers.
  Non-button FL3 atoms and custom components may use `tap-action="send|fill|copy"`
  with non-empty `tap-value` when the whole surface must be interactive; prefer
  `choice` or `button` for ordinary visible actions. `send` directly submits the
  payload as the player's turn; `fill` pre-fills the composer for player
  confirmation; copy writes to clipboard, copy does not increment actionCount,
  and it may show `tap-feedback`. `send`/`fill` count toward actionCount.
  Interactive surfaces need `aria-label` or visible text as the
  visible name / accessible name; the renderer adds `role=button`, `tabindex=0`,
  Enter/Space activation, `[data-interactive]`, focus ring, and pointer/hover
  affordance. Tap surfaces must not nest `<choice>`, `<button>`, or another `tap-action`
  surface inside a tap surface. `tap-value` for send/fill must be static text,
  not hidden state or template bindings. Keep choices fallback when direct send
  support may be unavailable.
- field: label/value/tone. Use label + description facts, status facts, task
  summaries, and checklist items.
- choices: cols/gap/align/variant. Use `cols=1|2|3|4|auto`, gap
  `xs|sm|md|lg`, align `start|center|end|stretch`, and variant
  `soft|solid|outline|ghost|glass`.
- divider: label. Use sparingly for scan breaks.
- bar: label/value/max/color. Use continuous values only and keep it synced with
  hidden `<state>`.
- tag: color/bg/background/text-color/txt-color/border/radius. Use small badges
  or resource markers.
- collapse: title/open. Use optional rules, help, lore, or logs.
- result-card: title/theme. Use final outcomes or shareable mini-game results.
- share-text: no required params. Use after result-card for a short share block.
- action: by/type/target/skill/dmg/crit. Use only for battle actions.
- damage: target/amount/type. Use battle damage/heal numbers.
- turn: next. Use battle turn ownership.
- item: id/name/rarity/type. Use real item cards inside `<loot>`; `<stat>` and
  `<desc>` carry stat and description lines.
- roll: dice/skill/dc/result/total/success. Use resolved TRPG dice rolls.
- check: type/skill/dc/roll/success. Use active/passive checks.
- announcement: type. Use `death|levelup|warn|info` for system notices.
- cg: prompt/style/seq/url/status/width/height. Use rare VN CG moments;
  `seq` deduplicates and `status` is `loading|ready|failed`.
- flag: key/value. Invisible route marker; durable state should also live in
  `<state>`.

When to use:

- Story tags carry immediate scene and dialogue.
- Layout tags carry information hierarchy, not decoration.
- Form tags carry first setup and intake.
- Choices carry concrete next actions; each choice should have one intent.
- State carries hidden truth; visible fields, bars, tags, and panels explain it
  to the player.
- Keep the result mobile-first: readable body text, line-height around 1.5-1.75,
  at least 4.5:1 contrast for normal text, short touch-friendly choices, and no
  color-only meaning.

## XMLV3 planning

Use core tags first:

- `<scene>` wraps the opening beat's prose and dialogue.
- `<n>` carries narration, physical action, and stage direction.
- `<speaker>` marks speaker changes, not every line of dialogue. For a
  single-speaker card or turn, omit `<speaker>` and write `<d>` directly; role
  context and the chat bubble already identify who is speaking.
- `<d>` carries dialogue.
- `<quote>` carries inner thought or emphasis.
- `<choice>` exposes a player action prompt.
- `<choices>` from the layout pack groups 2-4 `<choice>` buttons into columns
  or an auto-wrapping action row. Prefer it when short buttons would otherwise
  form a left-heavy single-column stack.
- `<form>`, `<input>`, `<radio>`, and `<checkbox>` collect setup choices.
- `<state>` stores hidden JSON state.

Avoid nesting the whole interface inside one scene. Close `</scene>` after the
prose beat, then put controls such as `bar`, `collapse`, `form`, `result-card`,
`share-text`, `choices`, and `choice` as sibling XMLV3 tags. This keeps mobile
width, spacing, and panel hierarchy closer to the real chat UI instead of making
every control look crammed into the same scene card.

When a screen has several short action choices, wrap them:

```xml
<choices cols="2" gap="sm" align="stretch">
  <choice tone="primary" send="檢查門口攝影機">檢查攝影機</choice>
  <choice tone="clue" send="詢問她剛才聽見什麼">追問線索</choice>
</choices>
```

Use semantic `tone` names as Theme V3 hooks when the style is reusable. Use
constrained local attributes only when the action, form, collapse, tag, or meter
hierarchy needs to survive without a full theme fork. Do not copy arbitrary HTML
`style` or `class` into XMLV3. If a client does not support the layout pack, the
inner `<choice>` tags remain readable fallback actions.

Theme V3 should carry the visual variables that HTML cards used to place in
`div` style attributes. For layout-heavy XMLV3, plan tone CSS around:
`--lt-panel-bg`, `--lt-panel-border`, `--lt-panel-title-color`,
`--lt-field-label-color`, `--lt-field-body-color`,
`--lt-choice-bg`, `--lt-choice-border-color`, `--lt-choice-color`,
`--lt-form-bg`, `--lt-form-field-bg`, `--lt-form-option-bg`,
`--lt-form-option-active-bg`, `--lt-form-control-accent`,
`--lt-form-submit-bg`, `--lt-collapse-bg`, and `--lt-bar-track-bg`.

When changing an XMLV3 welcome or scaffold, run
`npm run validate:xmlv3-presentation` before treating the structure as ready for
field finalization. This catches short naked choice piles, controls still nested
inside `<scene>`, flat state JSON that previews as missing state, and raw
`style`/`class` hooks that should be Theme V3 tone or variant.

`<state>` is not visible prose. If the player should see a status sentence, write
that sentence in `<n>` or a short visible label, then keep `<state>` compact and
machine-readable.

Visible status and hidden state must agree. When a visible `bar`, meter, or
status panel and hidden `<state>` describe the same key or label, value/max
should match exactly. If MCP reports `stateVisualMismatchCount` or
`xmlv3_state_visual_value_mismatch`, treat it as an XMLV3 structure regression:
fix the state contract before polishing prose or adding more panels.

The status bar / 狀態欄 is a compact update contract, not a collection of
progress bars. Plan 2-6 fields that change the next action, risk, route, clue,
relationship pressure, resource, or scene. `bar` is only for continuous numeric
values. Text, enum, flag, resource, phase, location, and available/unavailable
state should render as tags, fact cards, relationship/resource cards, or concise
panels instead of fake `max:100` meters.

Do not paste the server XMLV3 manual into `roleDetailDesc`. Detail should name
the role-specific contract: when this card updates state, when it presents
choices, what each visible meter or fact means, the status bar update contract,
and what the assistant must not decide for the player.

## Token-Aware Presentation

For offline review, use `o200k_base` as the single tokenizer baseline for V2
HTML, XMLV3, Theme V3, OpenAI, Claude, and unknown-provider budget checks. This
keeps structure-token comparisons stable. Do not present local estimates as
exact provider billing.

Input context comes from `roleDetailDesc + roleWelcome`; `roleDesc` is
display/search context and is not sent as model input. Preserve enough detail so
the role is not hollow. Token optimization is mostly about per-turn AI output:
how much XMLV3 structure the model must generate to match the HTML card's
visible hierarchy.

V2 HTML is a golden reference for visual hierarchy, not for token shape. Preserve
sectioning, state, forms, choices, and mobile/desktop polish, but do not preserve
class-heavy wrappers, inline CSS, repeated unchanged setup panels, or speaker labels
that the chat bubble already provides. XMLV3 should describe the current playable
screen; Theme V3 should carry the reusable style.

## Theme V3 responsibilities

Theme V3 may own:

- typography, spacing, color, contrast, and panel style
- speech bubble treatment and speaker mood
- atmosphere such as rain, neon, parchment, terminal, or case-file texture
- extension packs needed by the card shape

Theme V3 should not own:

- story instructions
- relationship gates
- route consequences
- hidden state
- critical choices or required player setup

## Visual affordance test

Every visible element should answer at least one question:

- What can the player do now?
- What state changed or is at risk?
- What mood or relationship pressure matters?
- What route, clue, resource, or boundary is now visible?

If an element only says "this looks pretty", move it to Theme V3 or cut it.

## Antipatterns

- A beautiful poster with no first action.
- Multiple decorative panels repeating lore from `roleDetailDesc`.
- Hidden-state prose inside `<state>`.
- Theme V3 carrying story logic or relationship rules.
- Custom HTML for an ordinary scene that XMLV3 can express.
- Custom HTML for a collapse, bar, tag, result card, or share affordance before
  checking whether an XMLV3 extension pack can cover it.
- Several short `<choice>` buttons left as a single uneven left-aligned column
  when `<choices>` can express the intended action grid.
- A new XMLV4/XMLV5 label for a backward-compatible XMLV3 extension.
- Choices before the scene gives them meaning.
- Visible status blocks that never affect the next role response.
