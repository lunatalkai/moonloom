---
name: lunatalk-card-blueprint
description: Turn vague LunaTalk role-card ideas into high-quality card blueprints before MCP creation. Use this skill whenever the author asks to brainstorm, open up an idea, define a character core, synthesize a prepared world engine, design relationships, shape voice, improve a premise, plan a first scene, or prepare a card concept before creating or editing a real LunaTalk role.
---

# LunaTalk Card Blueprint

Use this skill before mutating MCP tools when the author has a thin idea, a genre
label, a trope, a world seed, or a card that feels generic. The output is a
public-safe blueprint packet that `lunatalk-card-author` can turn into a real
private role card.

## Required references

Read `../../references/character-core-design.md` when the idea has thin,
trope-only, generic, or memorable-character problems. Read
`../../references/relationship-engine.md` when the idea is relationship-heavy,
slow-burn, companion, romance, friendship, rivalry, cohabitation, or when drafts
collapse into generic flirting, comfort, instant intimacy, flat warmth, weak
repair, or weak rupture routes. Read
`../../references/world-engine-design.md` when the idea has worldbuilding,
relationship-network, faction, location, lore-heavy, or lore-dump problems. Read
`../../references/play-engine-design.md` when the idea is RPG, adventure,
open-world, sandbox, survival, investigation, simulator, or depends on stats,
resources, inventory, quests, combat, turn protocol, compact state,
failure-forward behavior, or rule-manual opening repair. Read
`../../references/role-card-writing-framework.md` for the top-card pattern stack
and archetype recipes. Read `../../references/archetype-contracts.md` when the
author is unsure whether the card is companion, story, system, RPG, generator,
daily-life, light-setting, heavy-setting, ensemble, or a hybrid. Use
`lunatalk-archetype-director` first when card type or hybrid contract is the
primary problem. Read `../../references/card-series-design.md` when the author
wants a related card set, alternate version, seasonal/event variant, daily-life
variant, RPG/system variant, generator/helper variant, or keep/merge/reject
decision before individual blueprints. Use `lunatalk-series-architect` first
when series or variant planning is the primary task. Read
`../../references/ensemble-card-design.md` when the author wants an ensemble or
multi-character card, several active speakers, cast keep/merge/cut decisions,
turn ownership, spotlight rules, group tension, roll-call opening repair, or
cast-over-player repair. Use `lunatalk-ensemble-director` first when ensemble
structure is the primary task. Read
`../../references/card-authoring-templates.md` for
draft packets and field templates. Read `../../references/material-distillation.md`
when the idea comes from files, notes, imported drafts, source fragments, or a
large world bible. Read `../../references/voice-calibration.md` when the idea
depends on distinctive dialogue, role consistency, or ensemble cast contrast.
Use `lunatalk-voice-director` first when voice repair is the primary task.
Read `../../references/opening-design.md` when planning `roleWelcome`, first
screen playability, first reply paths, or second-turn moves. Read
`../../references/longplay-design.md` when planning replayability, route seeds,
memory/state, progression, long-session behavior, or dead third-turn repair. Read
`../../references/agency-design.md` when the player can only watch, choices are
decorative, the card decides the player's feelings/actions, or reply paths do not
change consequences. Use `lunatalk-agency-designer` first when agency repair is
the primary task. Read `../../references/token-economy.md` when the idea needs
token planning, field allocation, welcome compression, visual budget, example
budget, or a keep/move/cut/rewrite plan. Use `lunatalk-token-architect` first
when token architecture is the primary task. Read
`../../references/quality-rubric.md` for the self-review checklist. Read
`../../references/quality-scorecard.md` when the author asks whether a blueprint
is good enough, top-tier, ready to become a private role, or needs a scorecard
and first-three repairs. Use `lunatalk-quality-auditor` when the primary task is
audit rather than ideation.
Read
`../../references/safety-and-cost.md` when the premise is mature, intense,
horror-leaning, or boundary-sensitive. Read
`../../references/boundary-design.md` when the premise involves mature, adult,
NSFW, consent-sensitive, refusal, pacing, jealousy, horror, power imbalance, or a
safer-version request.

## Boundary

Do not call MCP tools from this skill. This is the ideation and blueprint stage.
When the blueprint is ready, hand it to `lunatalk-card-author` for private role
creation, validation, render review, simulation, and publishing workflow.

## Workflow

1. Restate the author's seed in one sentence.
2. Identify missing inputs: player role, relationship pressure, card shape,
   content rating intent, language, and success criteria.
   If the author provided source material or a large world document, use
   `lunatalk-material-distiller` first unless a source-to-play map already
   exists.
   If the premise is mature, intense, horror-leaning, consent-sensitive, or
   boundary-sensitive, use `lunatalk-boundary-designer` first unless a boundary
   packet already exists.
   If the card shape is unclear or mixes several archetypes, use
   `lunatalk-archetype-director` first unless an archetype packet already exists.
   If the author wants several related cards, alternate versions, variants, a
   card set, or a keep/merge/reject decision, use `lunatalk-series-architect`
   first unless a card-series packet already exists.
   If the author wants an ensemble card, multiple active speakers, cast
   keep/merge/cut decisions, turn ownership, spotlight rules, group tension, or
   a fix for cast-over-player behavior, use `lunatalk-ensemble-director` first
   unless an ensemble packet already exists.
   If the author wants an RPG, adventure, open-world, sandbox, survival,
   investigation, simulator, or game-like card with stats, resources, inventory,
   quests, combat, compact state, turn protocol, or failure-forward behavior,
   use `lunatalk-play-engineer` first unless a play-engine packet already
   exists.
3. If the seed is vague or trope-heavy, propose 2-3 sharply different directions.
   Make them differ by player role, conflict, first scene, route loop, and
   long-term consequence.
4. Pick or recommend one direction. Explain why it is more playable than the
   generic version.
5. Build the tension triangle: role desire, player leverage, external pressure.
6. If the weak layer is character appeal, use `lunatalk-character-core` first or
   preserve its packet. Define the character core: identity, desire,
   contradiction, boundary, mask/wound, player leverage, pressure behavior, and
   what changes when the player gets closer or pushes back.
7. If the weak layer is relationship play, generic flirting, comfort loops,
   instant intimacy, slow-burn pacing, trust/friction state, or repair/rupture
   routes, use `lunatalk-relationship-architect` first or preserve its packet.
8. Define the player insertion space: what the player controls, what they can
   refuse, what they can change, and what the card must not decide for them.
   If the weak layer is player agency, spectator play, decorative choices, route
   funneling, player-feeling narration, or missing refusal routes, use
   `lunatalk-agency-designer` first or preserve its packet.
9. If the weak layer is worldbuilding, relationship networks, factions,
   locations, or lore-dump repair, use `lunatalk-world-engineer` first or
   preserve its packet. Define the world engine only as far as it creates play.
10. If the weak layer is RPG/adventure mechanics, compact state, resources,
    inventory, quests, combat, turn protocol, failure-forward behavior, or a
    rule-manual opening, use `lunatalk-play-engineer` first or preserve its
    packet.
11. If the weak layer is generic dialogue, speaking style, voice drift,
   catchphrase overuse, refusal voice, talkExample placement, or ensemble voice
   blur, use `lunatalk-voice-director` first or preserve its packet. Define
   voice fingerprint: sentence rhythm, vocabulary, address terms, emotional
   tells, action beats, concealment, refusal style, and avoided phrasing. For
   ensemble cards, define a contrast matrix and at least one calibration need per
   weak core speaker.
12. If field allocation, token budget, welcome bloat, duplicated lore, misplaced
    durable rules, or visual bloat is the core problem, use
    `lunatalk-token-architect` first or preserve its packet before opening repair
    or field drafting.
13. Design the first scene and the second-turn engine together. If the opening is
    the core problem, or a welcome already exists and needs repair, use
    `lunatalk-opening-director` before continuing the blueprint.
14. If long-term playability, memory/state, route seeds, progression, or a dead
    third turn is the core problem, use `lunatalk-longplay-architect` before
    drafting final fields.
15. Draft a compact roleDesc, roleDetailDesc outline, and roleWelcome concept.
16. Run Moonloom self-review and repair any weak layer before handing off.
    If the author asked for a quality audit, preserve or create a
    `lunatalk-quality-auditor` scorecard before authoring.

## Blueprint packet

Return this structure:

```text
Seed:

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
  - ensemble:
  - play engine:
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

Directions:
1. ...
2. ...
3. ...

Quality audit:
- overall tier:
- scorecard:
- strongest dimensions:
- weakest dimensions:
- first three repairs:
- repair skill order:

Card-series packet:
- current seed:
- series goal:
- shared core:
- variant map:
  - keep:
  - merge:
  - reject:
- variant contracts:
- overlap risks:
- authoring order:
- validation / render / simulation plan:
- handoff:

Ensemble packet:
- current seed or failure:
- card shape:
- ensemble promise:
- cast scope:
- player role:
- player leverage:
- cast decision matrix:
- conflict network:
- turn ownership:
- spotlight rules:
- group tension state:
- opening focus:
- voice contrast plan:
- talkExample decision:
- token plan:
- agency and simulation probes:
- field allocation:
- handoff:

Recommended direction:
- why this is stronger:
- card shape:
- language:
- content rating intent:

Tension triangle:
- role desire:
- player leverage:
- external pressure:

Character core:
- appeal promise:
- identity:
- desire:
- contradiction:
- boundary:
- wound / mask:
- player leverage:
- relationship asymmetry:
- pressure behavior:
- interaction hooks:
- what changes through play:

Relationship engine:
- current failure:
- relationship promise:
- relationship shape:
- relationship asymmetry:
- emotional contract:
- intimacy / closeness states:
- friction states:
- pacing gates:
- repair routes:
- rupture / distance routes:
- player agency boundaries:
- reply-path matrix:
- compact relationship state:
- passive-player behavior:
- second-turn relationship move:
- long-session renewal:
- field allocation:
- token tradeoff:

Player insertion:
- player role:
- player controls:
- player can refuse:
- player can change:
- the card must not decide:
- interaction hooks:
- agency guardrails:
- reply-path matrix:
- consequence checks:

Agency packet:
- current failure:
- agency promise:
- prerequisite repair:
- player role:
- player insertion space:
- player controls:
- player can refuse:
- player can change:
- card must not decide:
- interaction hooks:
- agency guardrails:
- reply-path matrix:
- compact state:
- passive-player behavior:
- boundary handling:
- consequence checks:
- field patch targets:
- token tradeoff:

Boundary packet:
- rating intent:
- explicitness ceiling:
- premise risk:
- allowed pressure tools:
- disallowed moves:
- escalation ladder:
- refusal / slowdown behavior:
- stop conditions:
- safer fallback:

World engine:
- core rule:
- world promise:
- player position:
- scope:
- playable slice:
- active pressure:
- relationship / faction network:
- locations:
- resources / clocks / costs:
- state model:
- route seeds:
- exposition policy:
- consequence loop:

Play-engine packet:
- current failure:
- card shape:
- play promise:
- player position:
- player controls:
- card must not decide:
- core loop:
- compact state model:
- resource rules:
- quest / risk model:
- turn protocol:
- failure-forward behavior:
- progression phases:
- opening contract:
- state visibility:
- field allocation:
- token plan:
- simulation probes:
- handoff:

Voice fingerprint:
- rhythm:
- vocabulary:
- address terms:
- emotional tells:
- action beats:
- concealment:
- refusal style:
- avoided phrasing:

Voice calibration:
- voice cards needed:
- ensemble contrast:
- micro-samples needed:
- blind-line risk:

Voice-director packet:
- current failure:
- voice promise:
- prerequisite core repair:
- catchphrase policy:
- response-mode grid:
- talkExample decision:
- blind-line test:
- pressure probes:
- field patch targets:
- token tradeoff:

First scene:
- place/time:
- role action:
- pressure:
- player implication:
- reply paths:

Second-turn engine:
- expected first user message:
- role response move:
- what changes:
- renewed hook:

Opening packet:
- current failure:
- opening promise:
- reply paths:
- expected first user message:
- second-turn move:
- what changes:
- token tradeoff:

Longplay packet:
- continuity spine:
- progression phases:
- state model:
- route seeds:
- memory threads:
- role initiative:
- passive / stalled player behavior:
- scene renewal rules:
- continuation probes:
- detail patch targets:
- token tradeoff:

Field draft:
- roleName:
- roleDesc:
- roleDetailDesc outline:
- roleWelcome concept:

Token plan:
- what belongs in roleDetailDesc:
- what belongs in roleWelcome:
- what can move to Theme V3/XMLV3:
- what to cut first:

Token architecture packet:
- current failure:
- token budget signal:
- target allocation:
- field triage:
- keep / move / cut / rewrite:
- compression ladder:
- visual budget:
- state budget:
- example budget:
- patch order:
- rerun checks:

Self-review:
- promise:
- anchor:
- relationship engine:
- voice texture:
- voice calibration:
- consequence:
- role initiative:
- agency:
- opening scene:
- player agency:
- boundary design:
- archetype fit:
- token efficiency:

Handoff:
- ready for lunatalk-card-author: yes | no
- what to clarify first:
```

## Quality rules

- Do not settle for a genre label. "Vampire", "academy", "roommate", "idol", or
  "RPG" is only a seed, not a card.
- Give the player leverage. A card where the player only watches the role perform
  is not ready.
- Make ordinary premises playable through small desire, habit, pressure, and
  slow change.
- Make heavy worlds playable through one immediate problem, not a lore tour.
- Preserve any ensemble packet from `lunatalk-ensemble-director`; do not
  summarize away cast decisions, turn ownership, spotlight rules, group tension
  state, player leverage, voice contrast, token plan, or agency probes.
- Make ensemble cards start with one focal crisis and clear turn ownership.
- Preserve any opening packet from `lunatalk-opening-director`; do not summarize
  away the expected first user message or second-turn move.
- Preserve any character-core packet from `lunatalk-character-core`; do not
  summarize away desire, contradiction, boundary, player leverage, pressure
  behavior, or interaction hooks.
- Preserve any world-engine packet from `lunatalk-world-engineer`; do not
  summarize away player position, core world rule, faction/location play
  functions, state model, route costs, exposition policy, or token tradeoff.
- Preserve any play-engine packet from `lunatalk-play-engineer`; do not summarize
  away compact state, resource rules, quest/risk model, turn protocol,
  failure-forward behavior, opening contract, state visibility, token plan, or
  simulation probes.
- Preserve any voice-director packet from `lunatalk-voice-director`; do not
  summarize away rhythm, vocabulary, emotional tells, refusal style,
  response-mode grid, talkExample decision, blind-line test, pressure probes, or
  token tradeoff.
- Preserve any agency packet from `lunatalk-agency-designer`; do not summarize
  away player insertion space, player controls/refusals/changes, agency
  guardrails, reply-path matrix, consequence checks, compact state,
  passive-player behavior, boundary handling, or token tradeoff.
- Preserve any token architecture packet from `lunatalk-token-architect`; do not
  summarize away token budget signal, target allocation, field triage,
  keep/move/cut/rewrite, compression ladder, visual budget, state budget,
  example budget, patch order, or rerun checks.
- Preserve any longplay packet from `lunatalk-longplay-architect`; do not
  summarize away state, memory, route costs, role initiative, or continuation
  probes.
- Preserve any card-series packet from `lunatalk-series-architect`; do not
  summarize away shared core, keep/merge/reject decisions, variant contracts,
  overlap risks, authoring order, or validation/render/simulation plan.
- Make mature or intense cards explicit about rating, pacing, refusal, and player
  agency boundaries. For boundary-sensitive cards, produce or preserve a
  boundary packet with rating intent, explicitness ceiling, escalation ladder,
  refusal behavior, stop conditions, and safer fallback.
- Keep the output original and public-safe. Do not copy unprovided material or
  make unsupported origin claims.
- Prefer compact, executable rules over ornamental prose.
- When voice calibration is relevant, include an explicit `voice calibration`
  self-review line covering voice cards, micro-sample need, and blind-line risk.

## Repair heuristics

- If the idea is generic, use `lunatalk-character-core` or add a player-specific
  leverage point, contradiction, and pressure behavior before field drafting.
- If the first scene is passive, add role action and external pressure.
- If the player can only watch, choices do not matter, or the card decides the
  player's feelings/actions, use `lunatalk-agency-designer` before opening or
  longplay repair.
- If the welcome is carrying rules, lore, repeated monologue, or visual structure
  that belongs elsewhere, use `lunatalk-token-architect` before field drafting.
- If the role voice is generic, replace mood labels with sentence rhythm,
  vocabulary, tells, and avoided phrasing. Use `lunatalk-voice-director` when
  voice is the main requested repair.
- If ensemble voices blur together, give each core role a different want, fear,
  rhythm, pressure move, and player leverage before adding more lore.
- If the world is too large, use `lunatalk-world-engineer` or choose one place,
  one rule, one player position, and one immediate cost.
- If an RPG, adventure, survival, investigation, or simulator card is becoming a
  rulebook or decorative stat sheet, use `lunatalk-play-engineer` before opening,
  longplay, or authoring.
- If the relationship is flat, add asymmetry: one side knows, needs, owes, risks,
  hides, or controls something.
- If the card has no long loop, add route seeds with costs and state changes.
- If the welcome wants to become a manual, move durable rules to detail and keep
  the opening as a playable scene.
- If one character concept is being split into several cards, use
  `lunatalk-series-architect` first so variants prove distinct contracts instead
  of becoming duplicate moods, costumes, or intensity levels.

## Handoff to authoring

When the blueprint is ready, tell the agent to pass the packet to
`lunatalk-card-author`. Do not summarize away the concrete details; the handoff
should preserve the roleDesc, engine, welcome concept, voice fingerprint,
second-turn engine, token plan, and unresolved questions.
