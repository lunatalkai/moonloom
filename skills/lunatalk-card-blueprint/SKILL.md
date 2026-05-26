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
`../../references/world-engine-design.md` when the idea has worldbuilding,
relationship-network, faction, location, lore-heavy, or lore-dump problems. Read
`../../references/role-card-writing-framework.md` for the top-card pattern stack
and archetype recipes. Read `../../references/card-authoring-templates.md` for
draft packets and field templates. Read `../../references/material-distillation.md`
when the idea comes from files, notes, imported drafts, source fragments, or a
large world bible. Read `../../references/voice-calibration.md` when the idea
depends on distinctive dialogue, role consistency, or ensemble cast contrast.
Use `lunatalk-voice-director` first when voice repair is the primary task.
Read `../../references/opening-design.md` when planning `roleWelcome`, first
screen playability, first reply paths, or second-turn moves. Read
`../../references/longplay-design.md` when planning replayability, route seeds,
memory/state, progression, long-session behavior, or dead third-turn repair. Read
`../../references/quality-rubric.md` for the self-review checklist. Read
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
7. Define the player insertion space: what the player controls, what they can
   refuse, what they can change, and what the card must not decide for them.
8. If the weak layer is worldbuilding, relationship networks, factions,
   locations, or lore-dump repair, use `lunatalk-world-engineer` first or
   preserve its packet. Define the world or relationship engine only as far as it
   creates play.
9. If the weak layer is generic dialogue, speaking style, voice drift,
   catchphrase overuse, refusal voice, talkExample placement, or ensemble voice
   blur, use `lunatalk-voice-director` first or preserve its packet. Define
   voice fingerprint: sentence rhythm, vocabulary, address terms, emotional
   tells, action beats, concealment, refusal style, and avoided phrasing. For
   ensemble cards, define a contrast matrix and at least one calibration need per
   weak core speaker.
10. Design the first scene and the second-turn engine together. If the opening is
    the core problem, or a welcome already exists and needs repair, use
    `lunatalk-opening-director` before continuing the blueprint.
11. If long-term playability, memory/state, route seeds, progression, or a dead
    third turn is the core problem, use `lunatalk-longplay-architect` before
    drafting final fields.
12. Draft a compact roleDesc, roleDetailDesc outline, and roleWelcome concept.
13. Run Moonloom self-review and repair any weak layer before handing off.

## Blueprint packet

Return this structure:

```text
Seed:

Directions:
1. ...
2. ...
3. ...

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

Player insertion:
- player role:
- player controls:
- player can refuse:
- the card must not decide:

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

World / relationship engine:
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

Self-review:
- promise:
- anchor:
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
- Make ensemble cards start with one focal crisis and clear turn ownership.
- Preserve any opening packet from `lunatalk-opening-director`; do not summarize
  away the expected first user message or second-turn move.
- Preserve any character-core packet from `lunatalk-character-core`; do not
  summarize away desire, contradiction, boundary, player leverage, pressure
  behavior, or interaction hooks.
- Preserve any world-engine packet from `lunatalk-world-engineer`; do not
  summarize away player position, core world rule, faction/location play
  functions, state model, route costs, exposition policy, or token tradeoff.
- Preserve any voice-director packet from `lunatalk-voice-director`; do not
  summarize away rhythm, vocabulary, emotional tells, refusal style,
  response-mode grid, talkExample decision, blind-line test, pressure probes, or
  token tradeoff.
- Preserve any longplay packet from `lunatalk-longplay-architect`; do not
  summarize away state, memory, route costs, role initiative, or continuation
  probes.
- Make mature or intense cards explicit about rating, pacing, refusal, and player
  agency boundaries. For boundary-sensitive cards, produce or preserve a
  boundary packet with rating intent, explicitness ceiling, escalation ladder,
  refusal behavior, stop conditions, and safer fallback.
- Keep the output original and public-safe. Do not copy unprovided source text or
  make unsupported provenance claims.
- Prefer compact, executable rules over ornamental prose.
- When voice calibration is relevant, include an explicit `voice calibration`
  self-review line covering voice cards, micro-sample need, and blind-line risk.

## Repair heuristics

- If the idea is generic, use `lunatalk-character-core` or add a player-specific
  leverage point, contradiction, and pressure behavior before field drafting.
- If the first scene is passive, add role action and external pressure.
- If the role voice is generic, replace mood labels with sentence rhythm,
  vocabulary, tells, and avoided phrasing. Use `lunatalk-voice-director` when
  voice is the main requested repair.
- If ensemble voices blur together, give each core role a different want, fear,
  rhythm, pressure move, and player leverage before adding more lore.
- If the world is too large, use `lunatalk-world-engineer` or choose one place,
  one rule, one player position, and one immediate cost.
- If the relationship is flat, add asymmetry: one side knows, needs, owes, risks,
  hides, or controls something.
- If the card has no long loop, add route seeds with costs and state changes.
- If the welcome wants to become a manual, move durable rules to detail and keep
  the opening as a playable scene.

## Handoff to authoring

When the blueprint is ready, tell the agent to pass the packet to
`lunatalk-card-author`. Do not summarize away the concrete details; the handoff
should preserve the roleDesc, engine, welcome concept, voice fingerprint,
second-turn engine, token plan, and unresolved questions.
