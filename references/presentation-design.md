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
  carry only the card-specific format contract: state fields, choice rules,
  pack choice, visible status meaning, and player-agency boundaries.
- XMLV3 compatible extension work stays on one target. Do not create XMLV4;
  add optional tags, optional attributes, or packs with fallback behavior.

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
visible status, relationship cues, choices, forms, or hidden state.

Choose `html` only when a specific custom layout is necessary or existing HTML
must be migrated. HTML must not rely on scripts, inline handlers, external URLs,
or critical behavior hidden in unsupported code.

Before choosing HTML, check whether core XMLV3 plus an enabled extension pack can
express the need. For example, setup and result surfaces may use pack tags such
as `collapse`, `bar`, `tag`, `result-card`, or `share-text`. If a pack is needed,
record why and hand off to `extension_enable`; if a client lacks the pack, the
fallback must remain readable XMLV3 prose.

If the need is "I want HTML div blocks with different local colors", try the
layout extension first: `panel`, `stack`, `row`, `grid`, `choices`, and
`divider` provide the container structure and action-button grouping. Use Theme
V3 for reusable tone, palette, and panel color. When only one section or action
needs local emphasis, use the constrained presentation attributes instead of
falling back to HTML:

```xml
<panel title="Current lead" bg="rgba(16, 22, 30, 0.82)" border="rgba(121, 168, 255, 0.42)" radius="lg" padding="md">
  <n>The clue is readable because the block has its own local contrast.</n>
</panel>
<choices cols="2" align="stretch" gap="sm">
  <choice bg="var(--lt-choice-bg)" border="rgba(255,255,255,0.24)">Check the lock</choice>
  <choice bg="rgba(84, 46, 130, 0.55)" color="#ffffff">Question the witness</choice>
</choices>
<bar label="Pressure" value="71" max="100" color="#fb7185" track-bg="rgba(255,255,255,0.08)" />
```

Do not put raw `style`/`class` or arbitrary CSS in XML. Call
`extension_enable` for `layout` only when the structure changes play readability,
state visibility, or action hierarchy; if unsupported, the fallback should still
read as ordered XMLV3 prose.

## XMLV3 planning

Use core tags first:

- `<scene>` wraps the opening beat's prose and dialogue.
- `<n>` carries narration, physical action, and stage direction.
- `<speaker>` marks speaker changes.
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

Do not paste the server XMLV3 manual into `roleDetailDesc`. Detail should name
the role-specific contract: when this card updates state, when it presents
choices, what each visible meter means, and what the assistant must not decide
for the player.

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
