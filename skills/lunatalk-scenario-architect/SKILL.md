---
name: lunatalk-scenario-architect
description: Use when LunaTalk story, scenario, mystery, investigation, event, case-file, social-drama, rescue, trial, betrayal, or plot-heavy role cards need stakes, branches, clue/reveal pacing, false leads, suspect pressure, consequence state, route-funnel repair, opening incidents, second-turn reveals, or scenario simulation probes before blueprinting, authoring, render review, or simulation.
---

# LunaTalk Scenario Architect

Use this skill when the card is story-first. The goal is to create a scenario
packet: a branchable incident with stakes, route pressure, clues or reveals,
consequence state, and player agency. Do not turn the scenario into a fixed plot
that the player must follow.

## Required references

Read `../../references/scenario-design.md` first. Read
`../../references/archetype-contracts.md` when the primary contract may be story
or a hybrid. Read `../../references/agency-design.md` when the player can only
watch, choices are fake, or route funneling is the failure. Read
`../../references/opening-design.md` when designing the opening incident and
second-turn reveal. Read `../../references/longplay-design.md` when the scenario
must sustain multiple scenes. Read `../../references/world-engine-design.md`
only when locations, factions, or setting rules are the primary blocker. Read
`../../references/play-engine-design.md` only when the scenario depends on
explicit resources, stats, turn protocol, combat, inventory, or game-like
mechanics. Read `../../references/voice-calibration.md` when narrator, suspect,
or witness voices need calibration. Read `../../references/token-economy.md`
when branch notes, clues, or welcome text are bloated.

## Boundary

Do not call MCP tools from this skill. This is pre-authoring scenario design.
Hand the packet to `lunatalk-card-blueprint`, `lunatalk-card-author`,
`lunatalk-opening-director`, `lunatalk-longplay-architect`, or
`lunatalk-chat-simulation` after the scenario engine is coherent.

Use `lunatalk-play-engineer` instead when the main blocker is mechanics:
resources, stats, combat, inventory, turn protocol, failure-forward rules, or a
state update format. Use `lunatalk-world-engineer` instead when the main blocker
is lore, factions, locations, or world rules rather than one focused incident.

## Workflow

1. Classify the scenario shape: story, mystery, investigation, social drama,
   event, rescue, trial, betrayal, haunting, or hybrid.
2. State the player role, ongoing incident, stakes, and core question.
3. Build the story spine:
   `incident -> player choice -> pressure response -> clue/cost/state change -> renewed hook`.
4. Design 2-4 route branches. Each branch needs trigger, player leverage,
   pressure response, clue/reveal, cost, state change, and renewal hook.
5. Build a clue / reveal ladder: visible clue, contradiction, false lead, partial
   reveal, reversal, and final pressure.
6. Define the suspect or pressure network when people or forces drive the
   incident. Keep only nodes that can pressure the player or change future play.
7. Define compact consequence state. Track only values that change future
   access, trust, risk, route, clue, or pressure.
8. Add route-funnel guardrails: what the card must not force, solve, reveal, or
   decide for the player.
9. Design the opening incident and expected second-turn reveal. Use
   `lunatalk-opening-director` only if the opening itself is the primary repair.
10. Add passive-player behavior so the role can reveal, pressure, accuse, offer,
    withdraw, or move a clue without waiting forever.
11. Add false-lead handling that is recoverable and consequential.
12. Set field allocation and token plan.
13. Add scenario simulation probes and patch triggers.
14. Run self-review from `scenario-design.md` and name the next skill.

## Scenario packet

Return:

```text
Scenario packet:
- current seed or failure:
- scenario promise:
- card shape:
- player role:
- ongoing incident:
- stakes:
- core question:
- story spine:
- route branches:
  - [branch]:
    - trigger:
    - player leverage:
    - pressure response:
    - clue / reveal:
    - cost:
    - state change:
    - renewal hook:
- clue / reveal ladder:
  - visible clue:
  - contradiction:
  - false lead:
  - partial reveal:
  - reversal:
  - final pressure:
- suspect / pressure network:
  - [person or force]: want, leverage, secret, pressure move, player effect
- compact consequence state:
- opening incident:
- expected first user message:
- second-turn reveal:
- passive-player behavior:
- false-lead handling:
- route-funnel guardrails:
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

- A branch is real only if it changes clue, trust, risk, access, route, or
  pressure.
- A clue is playable only if the player can inspect, hide, expose, test, bargain
  with, destroy, preserve, or misread it.
- A false lead should cost time, trust, access, or public risk, but it should
  leave a recoverable path.
- A suspect or pressure node needs a want, secret, pressure move, and player
  leverage. Names alone do not create story.
- The role can pressure, accuse, warn, withhold, reveal, or bargain. It must not
  decide the player's conclusion, guilt, trust, fear, consent, or next action.
- The welcome should start at the incident, not at a briefing desk.
