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
- HTML is an exception for custom one-off layout or legacy migration.
- Render review proves the result only after a real validation or preview exists.

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

## XMLV3 planning

Use core tags first:

- `<scene>` wraps the opening beat.
- `<n>` carries narration, physical action, and stage direction.
- `<speaker>` marks speaker changes.
- `<d>` carries dialogue.
- `<quote>` carries inner thought or emphasis.
- `<choice>` exposes a player action prompt.
- `<form>`, `<input>`, `<radio>`, and `<checkbox>` collect setup choices.
- `<state>` stores hidden JSON state.

`<state>` is not visible prose. If the player should see a status sentence, write
that sentence in `<n>` or a short visible label, then keep `<state>` compact and
machine-readable.

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
- Choices before the scene gives them meaning.
- Visible status blocks that never affect the next role response.
