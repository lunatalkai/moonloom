---
name: lunatalk-daily-life-architect
description: Use when LunaTalk daily-life, slice-of-life, quiet companion, neighbor, roommate, cohabitation, cafe, workplace, school, ordinary-routine, low-stakes, subtle emotional, comfort-loop, flat small-talk, habit-state, shared-object, tiny-disruption, passive-player, or second-turn-change role cards need a playable routine engine before blueprinting, authoring, render review, or simulation.
---

# LunaTalk Daily-Life Architect

Use this skill when the card is quiet or ordinary but still needs a playable
engine. The output is a daily-life packet: a repeatable routine with small desire,
tiny disruption, shared object, habit state, player leverage, and renewed hooks.

## Required references

Read `../../references/daily-life-design.md` first. Read
`../../references/archetype-contracts.md` when the primary contract might be
daily-life, companion, relationship, light-setting, or hybrid. Read
`../../references/relationship-engine.md` only when intimacy, romance,
friendship, rivalry, repair/rupture, or relationship pacing is the primary
blocker. Read `../../references/character-core-design.md` when the role lacks a
small desire, contradiction, boundary, or pressure behavior. Read
`../../references/opening-design.md` when designing the first routine moment and
second-turn change. Read `../../references/longplay-design.md` when repeated
sessions, return-later behavior, or routine memory are weak. Read
`../../references/agency-design.md` when the player can only watch, must comfort,
or has no refusal/distance route. Read `../../references/voice-calibration.md`
when subtle voice or quiet restraint may drift. Read
`../../references/token-economy.md` when mood prose, visual panels, examples, or
routine notes are bloated.

## Boundary

Do not call MCP tools from this skill. This is pre-authoring daily-life design.
Hand the packet to `lunatalk-card-blueprint`, `lunatalk-card-author`,
`lunatalk-opening-director`, `lunatalk-longplay-architect`, or
`lunatalk-chat-simulation` after the routine engine is coherent.

Use `lunatalk-relationship-architect` instead when romance, intimacy pacing,
repair/rupture routes, or relationship state is the main blocker. Use
`lunatalk-scenario-architect` instead when the card is driven by an incident,
clue/reveal structure, suspects, or route branches. Use `lunatalk-world-engineer`
instead when locations, factions, lore, or setting rules are the main blocker.

## Workflow

1. Classify the daily-life shape: neighbor, roommate, cohabitation, classmate,
   workplace, cafe/shop, commute, found-family habit, light-setting routine, or
   hybrid.
2. State the player role, ordinary routine, small playable desire, and tiny
   disruption.
3. Choose one shared object or place that can return changed later.
4. Build the routine loop:
   `ordinary routine -> tiny disruption -> player choice -> small state change -> next routine returns altered`.
5. Define micro-tension: privacy, time, competence, boundary, memory, social
   friction, or care cost.
6. Define compact habit state. Track only values that change future behavior.
7. Design at least 3 reply paths. Each path changes habit, object, trust,
   distance, boundary terms, mood, promise, or next routine.
8. Name the romance/relationship posture so quiet play does not force intimacy.
9. Add passive-player behavior tied to the routine.
10. Design the opening moment and expected second-turn change.
11. Add long-session renewal and return-next-time hooks.
12. Set field allocation, token plan, simulation probes, and handoff.
13. Run self-review from `daily-life-design.md`.

## Daily-life packet

Return:

```text
Daily-life packet:
- current seed or failure:
- daily-life promise:
- card shape:
- player role:
- ordinary routine:
- small playable desire:
- tiny disruption:
- shared object / place:
- sensory anchors:
- player leverage:
- routine loop:
- micro-tension:
- habit state:
- reply paths:
  - [path]:
    - player move:
    - role response:
    - small change:
    - renewed hook:
- closeness / distance lanes:
- passive-player behavior:
- boundary and romance posture:
- opening moment:
- expected first user message:
- second-turn change:
- long-session renewal:
- field allocation:
  - roleDesc:
  - roleDetailDesc:
  - roleWelcome:
  - talkExample:
  - XMLV3 / Theme V3:
- token plan:
- simulation probes:
- self-review:
- handoff:
```

## Quality rules

- Quiet is not empty. The role needs one small specific desire and a reason the
  moment starts now.
- A routine is playable only if the player can help, refuse, ask, notice, fix,
  tease, leave, set terms, or change the order.
- A path is real only if it changes habit, object, trust, distance, boundary,
  mood, promise, or next routine.
- Passive-player behavior should continue through action: tend the plant, fold
  the towel, restart the kettle, leave a note, move a chair, open a window.
- Do not repair quietness with sudden melodrama unless the author asked for
  drama. Prefer micro-tension and practical consequence.
- Do not force romance. State whether the card is friendship-first, optional
  slow-burn, non-romantic, cohabitation friction, or another posture.
- Keep output original and public-safe.

## Handoff

Hand the packet to:

- `lunatalk-card-blueprint` when the author still needs concept synthesis,
  character core, voice, opening, or field planning.
- `lunatalk-card-author` when the author wants a real private card or field-ready
  draft and the daily-life packet is coherent.
- `lunatalk-opening-director` when the first routine scene still feels like mood
  prose or a hollow greeting.
- `lunatalk-longplay-architect` when return-next-time behavior or repeated
  routine memory remains weak after the packet.
- `lunatalk-relationship-architect` when romance, intimacy pacing, repair, or
  rupture is the remaining blocker.
- `lunatalk-chat-simulation` after authoring and validation when quiet play,
  passive-player behavior, boundaries, or return-next-time continuity need real
  chat testing and the author accepts normal billing.
