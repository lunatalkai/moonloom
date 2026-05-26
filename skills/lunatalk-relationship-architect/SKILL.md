---
name: lunatalk-relationship-architect
description: Use when a LunaTalk companion, romance, friendship, rivalry, ex-partner, cohabitation, mentor, found-family, slow-burn, daily-life, or relationship-heavy card needs relationship dynamics, intimacy pacing, trust/friction state, repair and rupture routes, generic flirting or comfort-loop repair, or relationship field allocation before blueprinting or authoring.
---

# LunaTalk Relationship Architect

Use this skill when the weak layer is relationship play. The output is a
relationship-engine packet, not a full role card and not a mutating MCP
operation.

This skill sits between character core and longplay. Character core makes the
role memorable; relationship architecture makes repeated interaction with the
player keep changing without forcing intimacy or turning into generic comfort.

## Required references

Read `../../references/relationship-engine.md` first. Read
`../../references/character-core-design.md` when the role still lacks desire,
contradiction, boundary, player leverage, or relationship asymmetry. Read
`../../references/agency-design.md` when the card decides the player's feelings,
attraction, forgiveness, consent, or actions. Read
`../../references/longplay-design.md` when the relationship needs memory, routes,
return-later behavior, or dead-third-turn repair. Read
`../../references/opening-design.md` when the first relationship moment or
second-turn move is unclear. Read `../../references/voice-calibration.md` when
the relationship collapses into generic flirting, comfort, banter, or apology
tone. Read `../../references/boundary-design.md` when romance, jealousy,
power imbalance, coercion-adjacent pressure, or intimacy pacing could blur player
agency. Read `../../references/token-economy.md` when relationship rules,
examples, or emotional prose are in the wrong field.

## Boundary

Do not call MCP tools from this skill. Do not create or patch real role fields
unless the author explicitly asks to continue through `lunatalk-card-author`.

Do not turn relationship quality into MCP validation. Relationship design is
Moonloom writing guidance.

## Workflow

1. Diagnose the current failure: generic flirting, comfort loop, rivalry as
   harmless banter, instant intimacy, flat daily-life, cruel friction, passive
   role, refusal ending play, or the card deciding the player's feelings.
2. Confirm the relationship shape: slow-burn, rivals, cohabitation, reunion,
   mentor/apprentice, protector/dependent, forbidden/public-pressure,
   found-family, friendship, or another shape.
3. Define the relationship promise and asymmetry the player can affect.
4. Build intimacy/closeness states and friction states that change behavior.
5. Define pacing gates, slowdown triggers, repair routes, and rupture/distance
   routes.
6. Preserve player agency boundaries: what the player controls, can refuse, can
   renegotiate, and what the card must not decide.
7. Build interaction hooks and a reply-path matrix with distinct consequences.
8. Add passive-player behavior, second-turn relationship move, and long-session
   renewal.
9. Decide whether `talkExample` is needed for reusable pressure behavior.
10. State field allocation, token tradeoff, simulation probes, and handoff.

## Output format

Return:

```text
Relationship-engine packet:
- current failure:
- relationship promise:
- relationship shape:
- card archetype:
- player role:
- relationship asymmetry:
- emotional contract:
- intimacy / closeness states:
- friction states:
- pacing gates:
- repair routes:
- rupture / distance routes:
- player agency boundaries:
- interaction hooks:
- reply-path matrix:
- compact relationship state:
- passive-player behavior:
- second-turn relationship move:
- long-session renewal:
- voice implications:
- talkExample decision:
- field allocation:
  - roleDesc:
  - roleDetailDesc:
  - roleWelcome:
  - talkExample:
  - XMLV3 / Theme V3:
- token tradeoff:
- simulation probes:
- handoff:

Self-review:
- relationship has asymmetry the player can affect:
- closeness has pacing gates:
- friction has repair and distance routes:
- reply paths change relationship state:
- passive input gets a new hook:
- player agency preserved:
- examples teach reusable behavior:
- next skill:
```

## Quality rules

- Do not solve relationship weakness with prettier flirting. Add asymmetry,
  state, cost, repair, rupture, and renewed hooks.
- Do not let the card decide the player's attraction, forgiveness, consent,
  loyalty, feelings, memories, or actions.
- Do not make slow-burn mean nothing happens. Slow-burn needs small visible state
  changes.
- Do not make rivalry only cute banter. Rivalry needs cost, old wound, competence
  stakes, or public pressure.
- Do not make comfort the only route. Add practical stakes, boundary terms,
  repair behavior, or a renewed task.
- Do not make refusal end play. Refusal should shift to distance, friendship,
  practical cooperation, delayed repair, or lower-intensity routes.
- Do not add long sample scenes unless they teach reusable relationship behavior.
- Keep output original and public-safe. Do not make unsupported source or
  performance claims.

## Handoff

Hand the packet to:

- `lunatalk-card-blueprint` when the card still needs concept synthesis, opening,
  voice, token plan, or field-level drafting.
- `lunatalk-card-author` when the author wants a real private card or patch and
  the relationship engine is ready.
- `lunatalk-boundary-designer` when the relationship includes mature, jealous,
  power-imbalanced, coercion-adjacent, or intimacy-sensitive pressure.
- `lunatalk-voice-director` when the remaining blocker is generic flirting,
  comfort, apology, or banter voice.
- `lunatalk-longplay-architect` when route memory, state economy, or session
  continuation remains weak after the relationship packet.
- `lunatalk-chat-simulation` when transcripts show generic comfort loops,
  ignored boundaries, flat trust/friction, or forced intimacy and the author
  accepts normal simulation cost.
