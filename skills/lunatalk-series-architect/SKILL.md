---
name: lunatalk-series-architect
description: Use when a LunaTalk role-card task involves planning a set, series, spin-off, alternate version, seasonal/event variant, daily-life variant, RPG/system variant, generator/helper variant, or multiple related cards from one shared character, setting, or creator concept before blueprinting, authoring, render review, simulation, or publishing.
---

# LunaTalk Series Architect

Use this skill when the author wants several related cards, alternate versions,
or a small card set from one promising character, relationship, world, or creator
concept. The output is a card-series packet, not full role fields and not a
mutating MCP operation.

This skill prevents a good character from being split into redundant cards. It
keeps the shared core recognizable while forcing every variant to prove a
different playable contract.

## Required references

Read `../../references/card-series-design.md` first. Read
`../../references/archetype-contracts.md` when choosing each variant's primary
contract. Read `../../references/character-core-design.md` when the shared core
is thin, trope-only, or unstable. Read `../../references/relationship-engine.md`
when the main or daily-life variants are relationship-heavy. Read
`../../references/opening-design.md` when variant openings need first-screen
proof. Read `../../references/longplay-design.md` when variants need distinct
route memory, progression, or return-later loops. Read
`../../references/play-engine-design.md` when a kept variant is RPG/adventure,
sandbox, survival, investigation, simulator, or depends on compact state,
resources, quests, turn protocol, or failure-forward behavior. Read
`../../references/token-economy.md` when shared lore or repeated setup would
bloat several cards. Read `../../references/boundary-design.md` when variants
have different intensity, rating, refusal, or pacing posture. Read
`../../references/card-authoring-templates.md` for handoff packet shape.

## Boundary

Do not call MCP tools from this skill. Do not write or patch real role fields
unless the author explicitly continues through `lunatalk-card-author`.

Do not create a card series because more cards sounds better. A variant must have
a distinct player promise, first-screen affordance, longplay loop, and test plan.
Series quality is Moonloom guidance, not an MCP/server validation gate.

## Workflow

1. Restate the seed and the intended series goal.
2. Build or preserve the shared core: identity, desire, contradiction, boundary,
   player leverage, relationship asymmetry, voice baseline, and reusable motifs.
   If the shared core is weak, use `lunatalk-character-core` first.
3. List proposed variants and classify each as keep, merge, or reject.
4. For every kept variant, choose one primary archetype by player promise. Use
   `lunatalk-archetype-director` when a variant mixes several contracts.
5. Define each variant's unique pressure, opening proof, longplay loop, boundary
   posture, token target, field allocation, and required Moonloom packets.
6. Identify overlap risks: duplicate opening, same second-turn move, copied lore,
   same player role, same route loop, same generator output, or intensity drift.
7. Set authoring order. Author the anchor card first, then only the most distinct
   secondary variant. Use the card-series packet to decide whether additional
   variants deserve separate cards; validation, render, and simulation checks
   verify technical, visual, and behavior risks after a draft exists.
8. Produce a cost-aware validation / render / simulation plan.
9. Hand off to `lunatalk-card-blueprint`, narrow Moonloom skills, or
   `lunatalk-card-author` only after the series packet is coherent.

## Output format

Return:

```text
Card-series packet:
- current seed:
- series goal:
- shared core:
  - identity:
  - desire:
  - contradiction:
  - boundary:
  - player leverage:
  - relationship asymmetry:
  - voice baseline:
  - reusable motifs:
- variant map:
  - keep:
  - merge:
  - reject:
- variant contracts:
  - [variant]:
    - primary archetype:
    - player promise:
    - player role:
    - unique pressure:
    - opening proof:
    - longplay loop:
    - boundary posture:
    - token target:
    - field allocation:
    - required Moonloom packets:
- overlap risks:
- authoring order:
- validation / render / simulation plan:
- handoff:

Self-review:
- each kept variant has a reason to exist:
- shared core is compact:
- variants do not steal each other's primary contract:
- openings prove different promises:
- second-turn moves differ:
- low-intensity variant is not just thinner:
- generator/helper variant produces a concrete artifact:
- boundary posture differs safely:
- token plan avoids copied lore:
- next skill:
```

## Quality rules

- Keep fewer, stronger variants. One anchor card plus one distinct alternate is
  better than four cards with the same loop.
- Do not make mood, costume, seasonal skin, or intensity the only difference.
  Change player task, pressure, state, consequence, or artifact output.
- Do not copy a long series bible into every card. Preserve shared behavior
  compactly and let each variant carry its own engine.
- Do not let a generator/helper variant become vague advice. It must produce a
  concrete artifact with defaults and revision operations.
- Do not let daily-life become "same card but softer." It needs a routine,
  small desire, shared object, and progression signal.
- Do not let event variants become lore tours or dramatic costumes. They need
  stakes, branches, and aftermath hooks.
- Keep output original and public-safe. Do not claim origin, traffic, ranking,
  analytics, or provenance that the author did not provide for publication.

## Handoff

Hand the packet to:

- `lunatalk-card-blueprint` when the author wants to blueprint one kept variant.
- `lunatalk-archetype-director` when a kept variant still has unresolved primary
  contract conflict.
- `lunatalk-character-core` when the shared core is weak or copied across cards
  as biography instead of behavior.
- `lunatalk-relationship-architect`, `lunatalk-opening-director`,
  `lunatalk-play-engineer`, `lunatalk-longplay-architect`,
  `lunatalk-boundary-designer`, or `lunatalk-token-architect` for the specific
  weak layer in a kept variant.
- `lunatalk-card-author` when the series packet is ready and the author wants to
  create or patch real private cards one at a time.
