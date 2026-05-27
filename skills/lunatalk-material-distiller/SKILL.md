---
name: lunatalk-material-distiller
description: Use when a LunaTalk role-card task starts from author-provided files, folders, material packs, drafts, world bibles, pasted lore, imported source material, existing card drafts, or too much setting/character material before blueprinting or authoring.
---

# LunaTalk Material Distiller

Use this skill before `lunatalk-card-blueprint` or `lunatalk-card-author` when the
author provides a large source, local material pack, world bible, notes, drafts,
or imported content. The output is a source-to-play map, not a role card.

## Required references

Read `../../references/material-distillation.md` for source-to-play mapping,
large-world compression, source hygiene, conflict handling, and token budget.
Read `../../references/role-card-writing-framework.md` for top-card structure and
archetype recipes. Read `../../references/card-authoring-templates.md` for
handoff packet shape. Read `../../references/voice-calibration.md` when the
material includes character dialogue or ensemble cast notes. Read
`../../references/safety-and-cost.md` when the material touches mature,
sensitive, personal, or risky content. Read
`../../references/originality-adaptation.md` when the material is canon-like,
derivative, or too close to another role card.

## Boundary

Do not call MCP tools from this skill. Do not create or patch a LunaTalk role
directly. Distill the material, state assumptions, and hand off to
`lunatalk-card-blueprint` or `lunatalk-card-author` only when the material has a
playable shape.

## Workflow

1. Identify what material is available: files, pasted notes, outline, world bible,
   character sheet, dialogue sample, existing card draft, or mixed pack.
2. Confirm the author wants this material used. If a file or folder is available
   to the AI client, inspect only the parts needed for the requested card.
3. Build a material inventory. Summarize each source by function, not by copying
   long text.
4. Extract the playable promise: fantasy, player role, central tension, and first
   scene pressure.
5. Run the playability filter. Keep facts that create player agency,
   consequence, role behavior, state, route seeds, voice, or a first-scene action
   surface.
6. Compress large worlds into modules: core rule, player position, locations,
   factions, state, route seeds, and one concrete opening problem.
7. Compress characters into desire, contradiction, boundary, player leverage,
   voice, turn behavior, and progression.
8. Mark material as keep, delay, cut, merge, rename, or assumption.
9. Produce a source-to-play map and token plan.
10. Hand off to `lunatalk-world-engineer` when the distilled material is still a
    world or relationship network that needs playable rules, state, routes, or
    lore-dump repair. Hand off to `lunatalk-originality-adapter` when the
    material is canon-like, derivative, or a renamed-copy risk. Hand off to
    `lunatalk-card-blueprint` when the concept still needs broader ideation, or
    to `lunatalk-card-author` when the role fields can be drafted directly.

## Output format

Return:

```text
Material inventory:
- ...

Playable promise:
- fantasy:
- player role:
- central tension:

Source-to-play map:
- keep for roleDetailDesc:
- use in roleWelcome:
- voice calibration:
- state / consequence:
- route seeds:
- Theme V3 / XMLV3 opportunity:

Delay / cut / merge:
- delay:
- cut:
- merge or rename:

Assumptions:
- ...

Token plan:
- roleDesc:
- roleDetailDesc:
- roleWelcome:
- talkExample:
- cut first:

Handoff:
- next skill:
- ready: yes | no
- handoff packet:
- missing author input:
```

## Quality rules

- Do not summarize every fact. A shorter source-to-play map is better than a
  dense lore digest if it preserves agency, consequence, voice, and first-scene
  action.
- Do not copy long source passages into the card. Rewrite as original,
  card-native rules, scene beats, and voice guidance.
- Do not preserve names, factions, locations, or mechanics just because they were
  in the source. Keep them only when they affect play.
- Do not ask the author for every missing detail. Ask only when the missing detail
  changes player role, rating, central relationship, first scene, or ownership of
  the material.
- If the source is too broad, choose one playable slice and delay the rest.
- If the source is too personal, confidential, or irrelevant for a role card, omit
  those details or fictionalize them only with author permission.
- If the material is canon-like or derivative, keep the requested fantasy and
  interaction pattern unless the author explicitly wants a canon/fan card and has
  the right to use it.

## Repair heuristics

- If the output feels like a lore summary, hand off to `lunatalk-world-engineer`
  or add player role, first-scene pressure, and route costs.
- If the output keeps too many proper nouns, merge locations or factions by play
  function.
- If the first scene is missing, choose the source moment with the clearest timer,
  threat, invitation, secret, debt, or forced choice.
- If characters are flat, distill desire, contradiction, boundary, voice, and
  player leverage before adding biography.
- If token budget is high, cut history before cutting state, consequence, or role
  initiative.

## Handoff rule

The handoff should let the next skill draft without rereading the entire material
pack. Preserve concrete decisions: player role, central tension, kept modules,
first scene, voice needs, state, route seeds, token plan, and unresolved
assumptions.
