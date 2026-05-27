---
name: lunatalk-detail-engineer
description: Use when roleDetailDesc is thin, biography-heavy, under-budget for its language/card ambition, missing a durable role engine, or when the author asks for full-detail, top-card-level, longplay-capable, less-empty LunaTalk role settings before field assembly, MCP patching, render, or simulation.
---

# LunaTalk Detail Engineer

Use this skill to turn `roleDetailDesc` into the durable operating engine for a
role card. The output is a Detail engine packet and, when requested, a
field-ready detail outline. It is not a render, simulation, or mutating MCP
operation.

## Required References

Read `../../references/role-detail-engine.md` first. Read
`../../references/token-economy.md` when length, language budget, or field
allocation is part of the problem. Read
`../../references/role-card-writing-framework.md` for the four-layer model and
PACT review. Read `../../references/card-authoring-templates.md` when the packet
will be assembled into final fields.

Preserve narrow packets when they already exist:

- `character-core-design.md` for identity, desire, contradiction, and pressure
  behavior
- `relationship-engine.md` for companion, romance, rivalry, repair, rupture, or
  slow-burn engines
- `world-engine-design.md` for setting, factions, locations, rules, and lore
  compression
- `scenario-design.md`, `daily-life-design.md`, `play-engine-design.md`, or
  `generator-design.md` for their primary card shapes
- `voice-calibration.md`, `agency-design.md`, `longplay-design.md`,
  `boundary-design.md`, and `state-economy-design.md` when those layers are
  already defined or clearly missing

## Boundary

Do not call MCP tools from this skill. Do not treat detail length as a server
gate. Do not pad prose to hit a number. The job is to buy future behavior:
identity, motive, current pressure, relationship rules, world/play functions,
proactive moves, voice, emotional reactions, longplay hooks, scene reservoir /
turn recipes, time/consequence, secret pacing, player insertion space, agency
boundaries, and format stability.

If the only issue is reducing bloat after the engine is complete, use
`lunatalk-token-architect`. If the card's premise is not chosen, route to
`lunatalk-premise-workshop` or `lunatalk-tension-weaver` first.

## Workflow

1. Name the current detail failure: thin biography, under-budget engine, welcome
   carrying rules, lore digest, generic trope, no role initiative, no
   consequence, no player insertion space, or no format stability.
2. Identify language and budget target. Use English/non-English budget guidance
   from `role-detail-engine.md`; treat coverage as more important than raw
   length, but mark a complete card below target when a high-ambition
   non-English draft stays under the 5,000-character target floor without a
   proven light-setting reason.
3. Classify the card shape and preserve existing packet signals.
4. Fill the engine modules with concrete playable behavior:
   identity and core charm, background and motive, current pressure, player
   relationship, world/scenario/play functions, proactive turn behavior, voice
   and action logic, emotional reactions, longplay hooks, scene reservoir /
   turn recipes, time and consequence, secret and reveal plan, player insertion
   space, agency boundaries, and format stability.
5. Decide field placement: what belongs in `roleDetailDesc`, `roleWelcome`,
   `talkExample`, XMLV3/Theme V3, or hidden state.
6. Create a compression stance: what to expand, move, cut, or keep because it
   changes future turns.
7. Name validation, render, and simulation probes that would prove the detail
   engine works.
8. Hand off to `lunatalk-card-author` or the narrow missing skill.

## Output Format

Return:

```text
Detail engine packet:
- current failure:
- language / budget target:
- card shape:
- existing packets preserved:
- engine modules:
  - identity and core charm:
  - background and motive:
  - current pressure:
  - player relationship:
  - world / scenario / play functions:
  - proactive turn behavior:
  - voice and action logic:
  - emotional reactions:
  - longplay hooks:
  - scene reservoir / turn recipes:
  - time and consequence:
  - secret and reveal plan:
  - player insertion space:
  - agency boundaries:
  - format stability:
- field placement:
  - roleDetailDesc:
  - roleWelcome:
  - talkExample:
  - XMLV3 / Theme V3:
- compression stance:
- validation / render / simulation probes:
- handoff:

Self-review:
- each module changes future behavior:
- no thin biography remains:
- scene reservoir prevents abstract repeated setup:
- no durable rules are stranded in welcome:
- player insertion space is protected:
- language-aware budget is appropriate:
- next skill:
```

## Quality Rules

- Expand missing engine modules before polishing prose.
- Convert backstory into current pressure, motive, taboo, debt, skill, route, or
  relationship cost.
- Convert lore into functions: access, risk, route, cost, state, clue,
  relationship pressure, or player leverage.
- Write proactive behavior for passive, brief, resistant, curious,
  boundary-setting, and route-changing player input.
- Write voice as rhythm, vocabulary, address terms, emotional tells, action
  beats, refusal style, and avoided phrasing.
- Keep secrets paced. Detail can state reveal rules without dumping every secret
  into the opening.
- Add a compact scene reservoir or turn recipe when the card risks becoming
  abstract after the first screen. Scene seeds should specify trigger, concrete
  place or object, role move, player leverage, state or relationship change, and
  renewed hook.
- Protect player agency. Never decide the player's feelings, consent,
  commitments, actions, or final route.
- Keep format rules compact and durable when XMLV3, state, generator schemas,
  RPG turn protocol, or other output constraints matter.
- Stop expanding when a new section would only repeat mood, biography, or
  decorative lore.

## Handoff

Hand the packet to:

- `lunatalk-card-author` when the author wants field-ready content or MCP patching.
- `lunatalk-token-architect` when allocation/compression is still the blocker.
- `lunatalk-opening-director` when the welcome must be rebuilt after moving
  durable rules into detail.
- `lunatalk-chat-simulation` when the detail engine needs behavior proof.
- A narrow engine skill when this pass exposes a missing character, relationship,
  world, scenario, daily-life, play, generator, voice, agency, boundary, state,
  or longplay layer.
