---
name: lunatalk-card-blueprint
description: Turn vague LunaTalk role-card ideas into high-quality card blueprints before MCP creation. Use this skill whenever the author asks to brainstorm, open up an idea, define a character core, build a world, design relationships, shape voice, improve a premise, plan a first scene, or prepare a card concept before creating or editing a real LunaTalk role.
---

# LunaTalk Card Blueprint

Use this skill before mutating MCP tools when the author has a thin idea, a genre
label, a trope, a world seed, or a card that feels generic. The output is a
public-safe blueprint packet that `lunatalk-card-author` can turn into a real
private role card.

## Required references

Read `../../references/role-card-writing-framework.md` for the top-card pattern
stack and archetype recipes. Read `../../references/card-authoring-templates.md`
for draft packets and field templates. Read `../../references/quality-rubric.md`
for the self-review checklist. Read `../../references/safety-and-cost.md` when
the premise is mature, intense, horror-leaning, or boundary-sensitive.

## Boundary

Do not call MCP tools from this skill. This is the ideation and blueprint stage.
When the blueprint is ready, hand it to `lunatalk-card-author` for private role
creation, validation, render review, simulation, and publishing workflow.

## Workflow

1. Restate the author's seed in one sentence.
2. Identify missing inputs: player role, relationship pressure, card shape,
   content rating intent, language, and success criteria.
3. If the seed is vague or trope-heavy, propose 2-3 sharply different directions.
   Make them differ by player role, conflict, first scene, route loop, and
   long-term consequence.
4. Pick or recommend one direction. Explain why it is more playable than the
   generic version.
5. Build the tension triangle: role desire, player leverage, external pressure.
6. Define the character core: identity, desire, contradiction, boundary, wound,
   mask, and what changes when the player gets closer or pushes back.
7. Define the player insertion space: what the player controls, what they can
   refuse, what they can change, and what the card must not decide for them.
8. Define the world or relationship engine only as far as it creates play.
9. Define voice fingerprint: sentence rhythm, vocabulary, address terms,
   emotional tells, action beats, refusal style, and avoided phrasing.
10. Design the first scene and the second-turn engine together.
11. Draft a compact roleDesc, roleDetailDesc outline, and roleWelcome concept.
12. Run Moonloom self-review and repair any weak layer before handing off.

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
- identity:
- desire:
- contradiction:
- boundary:
- wound / mask:
- what changes through play:

Player insertion:
- player role:
- player controls:
- player can refuse:
- the card must not decide:

World / relationship engine:
- core rule:
- route seeds:
- state that changes:
- consequence loop:

Voice fingerprint:
- rhythm:
- vocabulary:
- address terms:
- emotional tells:
- action beats:
- refusal style:
- avoided phrasing:

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
- Make mature or intense cards explicit about rating, pacing, refusal, and player
  agency boundaries.
- Keep the output original and public-safe. Do not copy unprovided source text or
  make unsupported provenance claims.
- Prefer compact, executable rules over ornamental prose.

## Repair heuristics

- If the idea is generic, add a player-specific leverage point.
- If the first scene is passive, add role action and external pressure.
- If the role voice is generic, replace mood labels with sentence rhythm,
  vocabulary, tells, and avoided phrasing.
- If the world is too large, choose one place, one rule, and one immediate cost.
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
