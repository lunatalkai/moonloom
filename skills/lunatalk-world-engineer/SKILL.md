---
name: lunatalk-world-engineer
description: Use when a LunaTalk role-card task involves worldbuilding, relationship networks, factions, locations, lore-heavy settings, light or heavy setting design, playable world rules, state/consequence from world facts, avoiding lore dumps, or turning a world seed into a role-card-ready world engine.
---

# LunaTalk World Engineer

Use this skill when the world or relationship network is the weak layer. The
output is a world-engine packet, not a full role card and not a mutating MCP
operation.

## Required references

Read `../../references/world-engine-design.md` first. Read
`../../references/role-card-writing-framework.md` for PACT, archetype recipes,
and field allocation. Read `../../references/card-authoring-templates.md` when
the packet needs field patch targets. Read `../../references/material-distillation.md`
when the author provides source files, pasted notes, imported drafts, or a world
bible. Read `../../references/longplay-design.md` when the task needs route
costs, state, memory, progression, or long-session behavior. Read
`../../references/opening-design.md` when the task needs first-screen pressure.
Read `../../references/voice-calibration.md` when the world uses ensemble voices
or a narrator/system voice. Use `lunatalk-voice-director` when the remaining
problem is voice contrast rather than world mechanics.

## Boundary

Do not call MCP tools from this skill. Do not create or patch real role fields
unless the author explicitly asks to continue through `lunatalk-card-author`.
If the author provided a large material pack, use `lunatalk-material-distiller`
first unless a source-to-play map already exists.

## Workflow

1. Identify the current failure: lore dump, unclear player position, too many
   proper nouns, decorative factions, locations without actions, no compact
   state, route seeds without cost, or opening that reads like a manual.
2. Choose the smallest scope: light-setting, scenario, heavy-setting,
   RPG/open-world, or ensemble.
3. Define the core world rule as a choice-making rule, not an encyclopedia
   premise.
4. Define the player's position: what they can enter, refuse, change, risk,
   carry, reveal, hide, spend, or unlock.
5. Build the relationship/faction network using wants, leverage, costs, pressure
   moves, and route use.
6. Choose active locations only when each has an access rule, pressure, resource
   or risk, faction tie, and return hook.
7. Design a compact state model and 2-4 route seeds with costs and memory.
8. Write an exposition policy: how the world explains itself through objects,
   demands, consequences, witnesses, or contradictions.
9. State opening, longplay, render/state, field, and token implications.
10. Run the self-review and name the next Moonloom skill.

## Output format

Return:

```text
World-engine packet:
- current failure:
- world promise:
- card shape:
- player position:
- scope:
- core world rule:
- playable slice:
- active pressure:
- relationship / faction network:
- locations:
- resources / clocks / costs:
- state model:
- route seeds:
- exposition policy:
- opening implications:
- longplay implications:
- render / state visibility:
- field patch targets:
- token tradeoff:

Self-review:
- world rule creates choices:
- player position is clear:
- each faction/location has a play function:
- state is compact and updateable:
- opening avoids lore dump:
- routes have costs and memory:
- token spend is justified:
- next skill:
```

## Quality rules

- Do not write an encyclopedia. Make the world produce choices.
- Do not preserve names, factions, districts, species, powers, dates, or artifacts
  only because they sound interesting.
- Do not let lore decide the player's feelings, loyalties, consent, memories, or
  actions.
- Do not introduce the full faction list in the opening.
- Do not use decorative state. State must change access, behavior, risk, route,
  or cost.
- Do not hide the first playable action behind a manual.
- Keep output original and public-safe. Do not make unsupported source or
  performance claims.

## Repair heuristics

- If the world is too broad, choose one playable slice and delay the rest.
- If the player has no position, make them witness, courier, recruit, heir,
  investigator, caretaker, rival, exile, broker, guide, or anomaly.
- If factions feel decorative, give each a want, player leverage, cost to help,
  pressure move, and route use.
- If locations are backdrops, add access rules, resources, risks, and return
  hooks.
- If lore overwhelms the welcome, move rules to detail and open on one object,
  demand, threat, or contradiction.
- If routes feel like scenery, add cost, faction shift, memory, and renewed hook.

## Handoff

Hand the packet to:

- `lunatalk-card-blueprint` when the concept still needs character core, voice,
  first-scene planning, or field-level synthesis.
- `lunatalk-voice-director` when narrator, faction, guide, or ensemble voices
  need contrast after the world engine is clear.
- `lunatalk-card-author` when the author wants a real private card or patch.
- `lunatalk-opening-director` when the first screen must reveal the world rule
  without becoming a lore tour.
- `lunatalk-longplay-architect` when the world needs deeper route state, memory,
  progression, or continuation probes.
- `lunatalk-chat-simulation` when transcripts show lore dumping, passive world
  response, decorative state, or weak route consequences.
