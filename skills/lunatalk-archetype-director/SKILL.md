---
name: lunatalk-archetype-director
description: Use when a LunaTalk role-card task involves choosing or mixing card types, classifying companion/story/RPG/system/generator/daily-life/light-setting/heavy-setting/ensemble shapes, resolving hybrid card risks, defining an archetype contract, allocating role fields by card type, or deciding which Moonloom skills to run before blueprinting or authoring.
---

# LunaTalk Archetype Director

Use this skill when the weak layer is card shape. The output is an archetype
packet, not a full role card and not a mutating MCP operation.

This skill is the Moonloom equivalent of asking "which creation workflow should
drive this?" It prevents mixed cards from becoming lore dumps, vague assistants,
or pretty openings with no durable play contract.

## Required references

Read `../../references/archetype-contracts.md` first. Read
`../../references/role-card-writing-framework.md` for PACT, field allocation, and
archetype recipes. Read `../../references/card-authoring-templates.md` when the
packet must be handed to blueprinting or authoring. Read
`../../references/quality-rubric.md` for self-review probes.

If the archetype decision exposes a narrow weak layer, use or preserve the
matching packet:

- `lunatalk-character-core` for trope-only persona, weak desire, weak
  contradiction, or missing player leverage.
- `lunatalk-relationship-architect` for relationship-heavy cards with generic
  flirting, comfort loops, instant intimacy, weak pacing, flat trust/friction,
  or missing repair/rupture routes.
- `lunatalk-world-engineer` for lore-heavy, faction, location, relationship
  network, light-setting, heavy-setting, RPG, or lore-dump problems.
- `lunatalk-agency-designer` for spectator play, route funneling, decorative
  choices, or player-agency takeover.
- `lunatalk-voice-director` for generic dialogue, ensemble voice blur, or
  output-format voice.
- `lunatalk-opening-director` for unclear first screen or second-turn move.
- `lunatalk-longplay-architect` for dead third turns, route memory, progression,
  or replayability.
- `lunatalk-boundary-designer` for mature, intense, horror, jealous, power-
  imbalanced, consent-sensitive, refusal, or pacing-sensitive cards.
- `lunatalk-token-architect` for overlong welcome, field allocation, duplicated
  lore, visual bloat, or tokenBudget warnings.

## Boundary

Do not call MCP tools from this skill. Do not create or patch a real card unless
the author explicitly asks to continue through `lunatalk-card-author`.

Do not turn subjective writing quality into MCP validation rules. Card type,
hybrid design, emotional quality, and playability belong in Moonloom skill
guidance.

## Workflow

1. Restate the seed in one sentence.
2. Name the primary archetype by player promise, not by aesthetic genre.
3. Name secondary overlays and what each overlay is allowed to do.
4. Reject any tempting archetype that would require a different primary loop.
5. Write the archetype contract: player promise, core loop, first-screen proof,
   and durable field engine.
6. Allocate `roleDesc`, `roleDetailDesc`, `roleWelcome`, `talkExample`, and
   XMLV3/Theme V3 responsibilities according to the primary contract.
7. Identify required packets and the order to run them before blueprinting or
   authoring.
8. List hybrid failure modes and repair rules.
9. Run self-review probes and name the handoff target.

## Output format

Return:

```text
Archetype packet:
- current seed:
- primary archetype:
- secondary overlays:
- rejected archetypes:
- archetype contract:
- player promise:
- player role:
- core loop:
- first-screen proof:
- field allocation:
  - roleDesc:
  - roleDetailDesc:
  - roleWelcome:
  - talkExample:
  - XMLV3 / Theme V3:
- required packets:
  - character core:
  - relationship engine:
  - world engine:
  - agency:
  - voice:
  - opening:
  - longplay:
  - boundary:
  - token:
- recommended Moonloom skill order:
- hybrid failure modes:
- repair rules:
- self-review probes:
- handoff:
```

## Quality rules

- Pick one primary playable contract. Do not let the card be companion, RPG,
  generator, heavy-setting, and story all at equal priority.
- Classify by what the player does, not by atmosphere or trope.
- For companion hybrids, keep relationship pressure primary unless the author
  explicitly asks for system/gameplay as the main fantasy.
- For heavy-setting hybrids, convert lore into choices, costs, state, routes, or
  pressure before preserving names or history.
- For generator hybrids, keep the generator artifact concrete. It should produce
  a usable artifact, preferably with schema and revision operations.
- For ensemble cards, define turn ownership and voice contrast before adding
  more cast.
- For quiet daily-life cards, add a small specific desire and progression path;
  do not repair quietness with sudden melodrama.
- For RPG/system cards, include state and defaults. The card should proceed when
  the player gives minimal input.
- Preserve player agency. The card can offer, tempt, pressure, warn, or refuse;
  it must not assign the player's feelings, memories, consent, actions, or
  commitments.
- Keep output original and public-safe. Do not make unsupported source or
  performance claims.

## Handoff

Hand the packet to:

- `lunatalk-card-blueprint` when the author still needs concept synthesis,
  directions, character core, world engine, voice, opening, or field planning.
- `lunatalk-card-author` when the author wants a real private card or patch and
  the archetype contract is clear.
- A narrow Moonloom skill first when the packet identifies one weak layer as the
  blocker.
- `lunatalk-benchmark-runner` when changing archetype guidance and testing
  synthetic regression prompts.
