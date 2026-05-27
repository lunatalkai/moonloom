---
name: lunatalk-originality-adapter
description: Use when LunaTalk role-card work starts from canon, IP, fan premises, another role card, recognizable inspiration, copied drafts, derivative concepts, or requests to make something original without losing the fantasy before blueprinting, authoring, render review, simulation, or publishing.
---

# LunaTalk Originality Adapter

Use this skill when an author wants to preserve the fantasy of an inspiration
while creating an original LunaTalk role card. The output is an originality
adaptation packet, not final role fields and not a legal review.

## Required references

Read `../../references/originality-adaptation.md` first. Read
`../../references/material-distillation.md` when the inspiration arrives as a
large file, notes pack, or pasted draft. Read
`../../references/sample-driven-calibration.md` when copy risk comes from a
Moonloom sample or example shape. Read `../../references/card-authoring-templates.md`
when the packet must be preserved into final field assembly.

## Boundary

Do not call MCP tools. Do not create, patch, validate, render, simulate, publish,
or upload assets from this skill.

Do not copy exact names, quotes, scene text, outfits, proper nouns, factions,
artifact names, route labels, tag strings, distinctive image compositions, or
protected character designs from the inspiration.

If the author explicitly wants a canon/fan card, ask for allowed-use stance when
the card may become public. Then keep only the facts needed for the scene and do
not rely on broad trivia knowledge.

## Workflow

1. Identify the inspiration type: canon/IP, fan premise, another role card,
   pasted draft, genre trope, visual reference, or mixed source.
2. Clarify intended stance: original transformation, canon/fan with allowed use,
   or unclear. If unclear and public submission is likely, keep the safer
   original transformation stance.
3. Extract the transferable fantasy: player fantasy, relationship/role shape,
   central tension, interaction loop, and voice function.
4. List protected surface to avoid: names, quotes, scene setup, outfits, visual
   motifs, lore terms, factions, and unique mechanics.
5. Create original substitutions across role identity, player role, relationship
   history, pressure source, setting rule, symbolic object, voice strategy, visual
   motif, state labels, and opening proof.
6. Run the distance check. If it is still a renamed copy, change the substitution
   axes before blueprinting or authoring.
7. Hand off to the narrow Moonloom skill that must define the adapted engine, or
   to `lunatalk-card-author` only when the packet is coherent.

## Output format

Return:

```text
Route:
- entry skill:
- selected skill: lunatalk-originality-adapter
- mode: originality adaptation / copy-distance repair
- MCP calls now: no
- final fields now: no
- next skill:

Originality adaptation packet:
- current request:
- inspiration type:
- intended stance: original transformation | canon/fan with allowed use | unclear
- transferable fantasy:
  - player fantasy:
  - relationship / role shape:
  - central tension:
  - interaction loop:
  - voice function:
- protected surface to avoid:
  - names / titles:
  - quotes / catchphrases:
  - scene setup:
  - outfits / visual motifs:
  - lore terms / factions:
  - unique mechanics:
- original substitutions:
  - role identity:
  - player role:
  - relationship history:
  - pressure source:
  - setting rule:
  - symbolic object:
  - voice strategy:
  - visual motif:
  - state labels:
  - opening proof:
- distance check:
  - not a renamed copy:
  - no copied scene text:
  - no copied proper nouns:
  - new player leverage:
  - new second-turn move:
- packets to create next:
- handoff:

Self-review:
- transferable fantasy preserved:
- protected surface removed:
- substitution axes are meaningfully changed:
- player leverage changed:
- first scene changed:
- not a renamed copy:
- next skill:
```

## Quality rules

- Do not solve copy risk by swapping names only.
- Keep the emotional and interaction promise, not the fictional surface.
- Change enough axes that the adapted card can be pitched without naming the
  inspiration.
- If the source is a full material pack, distill it before adapting.
- If the adapted role is still generic after removing surface material, use
  `lunatalk-character-core` or the narrow shape skill before fields.
- If image direction remains too close, use `lunatalk-visual-identity-director`.

## Handoff

Hand the packet to:

- `lunatalk-premise-workshop` when the author wants several original directions.
- `lunatalk-character-core`, `lunatalk-relationship-architect`,
  `lunatalk-world-engineer`, `lunatalk-scenario-architect`,
  `lunatalk-daily-life-architect`, `lunatalk-play-engineer`,
  `lunatalk-generator-architect`, or `lunatalk-ensemble-director` when that layer
  still needs design.
- `lunatalk-card-author` when the adaptation packet passes distance check and
  the author wants draft-only fields or a real private role.
