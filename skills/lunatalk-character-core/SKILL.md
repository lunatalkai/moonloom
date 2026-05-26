---
name: lunatalk-character-core
description: Use when a LunaTalk role-card task involves character core, persona appeal, memorable role identity, thin or generic characters, trope repair, desire, contradiction, boundary, mask, wound, relationship leverage, asymmetry, emotional hook, interaction hooks, or making a role feel distinct before blueprinting, authoring, voice, opening, longplay, simulation, or publish readiness.
---

# LunaTalk Character Core

Use this skill when the role's core appeal is the weak layer. The output is a
character-core packet, not a full card and not a mutating MCP operation.

## Required references

Read `../../references/character-core-design.md` first. Read
`../../references/role-card-writing-framework.md` for PACT, tension triangle, and
archetype context. Read `../../references/card-authoring-templates.md` when the
packet needs field patch targets. Read `../../references/relationship-engine.md`
when the role has slow-burn, romance, friendship, rivalry, cohabitation,
daily-life, generic flirting, comfort-loop, repair/rupture, or relationship
pacing problems after the character core is clear. Read
`../../references/voice-calibration.md`
when the role's voice, ensemble contrast, or pressure behavior may drift. Use
`lunatalk-voice-director` when the remaining weak layer is speaking style,
catchphrase discipline, refusal voice, talkExample need, or ensemble voice
contrast. Read
`../../references/boundary-design.md` when the role involves mature, intense,
jealous, horror-leaning, power-imbalanced, consent-sensitive, refusal, or pacing
pressure. Read `../../references/opening-design.md` or
`../../references/longplay-design.md` only when the handoff needs first-scene or
long-session implications.

## Boundary

Do not call MCP tools from this skill. Do not write or patch real role fields
unless the author explicitly asks to continue through `lunatalk-card-author`.
Design the character core, then hand off to blueprint, authoring, opening,
longplay, simulation, or publish readiness.

## Workflow

1. Identify the current failure: trope-only, mood-only, biography-only, passive,
   interchangeable ensemble, no player leverage, no boundary, no contradiction,
   weak motive, or unplayable secret.
2. Restate the seed in one sentence without adding fields yet.
3. Choose one to three appeal axes and convert them into behavior, not labels.
4. Build the core chain: desire, contradiction, boundary, mask or wound, player
   leverage, and pressure behavior.
5. Define relationship asymmetry: who knows, needs, risks, controls, hides, or
   can lose what.
6. Write interaction hooks that give the player things to do besides admire,
   comfort, or wait.
7. Write pressure behavior for trusting, questioning, resisting, passive,
   boundary-setting, and trust-breaking player input.
8. State field implications: roleDesc, roleDetailDesc, roleWelcome, optional
   talkExample, XMLV3/Theme V3, and token tradeoff.
9. If the remaining weak layer is relationship state, pacing, generic flirting,
   comfort loops, repair/rupture, refusal routes, or relationship field
   allocation, name `lunatalk-relationship-architect` as the next skill.
10. If the remaining weak layer is speaking style, catchphrase discipline, refusal
   voice, or ensemble voice contrast, name `lunatalk-voice-director` as the next
   skill.
11. Run the self-review and name the next Moonloom skill.

## Output format

Return:

```text
Character-core packet:
- current failure:
- appeal promise:
- role identity:
- desire:
- contradiction:
- boundary:
- mask:
- wound / need:
- player leverage:
- relationship asymmetry:
- pressure behavior:
- soft spots:
- hard limits:
- behavioral tells:
- interaction hooks:
- voice implications:
- opening implications:
- longplay implications:
- field patch targets:
- token tradeoff:

Self-review:
- memorable beyond trope:
- desire creates action:
- contradiction creates behavior:
- boundary creates pacing:
- player has leverage:
- pressure behavior covers trust, resistance, passivity, and boundary:
- player agency preserved:
- next skill:
```

## Quality rules

- Do not stop at labels such as shy, cold, gentle, chaotic, powerful, mysterious,
  or secretly soft. Turn each label into behavior under pressure.
- Do not decide the player's feelings, consent, attraction, loyalty, or actions.
- Do not make the player only an audience. Give them knowledge, access, trust,
  resource, interpretation, boundary, or change leverage.
- Do not solve thin characters with more biography. Convert history into present
  pressure.
- Do not make refusal end the role. Add a playable alternate route.
- Do not add source claims or copied examples. Keep the
  output original and public-safe.
- Do not push subjective quality checks into MCP validation. Character appeal is
  Moonloom guidance.

## Repair heuristics

- If the role is trope-only, add contradiction and cost.
- If the role is passive, add pressure behavior for passive or resistant players.
- If the relationship is flat, add asymmetry the player can affect.
- If the relationship keeps becoming generic flirting or comfort, hand off to
  `lunatalk-relationship-architect` for closeness/friction state, pacing gates,
  repair/rupture routes, and reply-path matrix.
- If the secret is decorative, make it create a player decision.
- If the role is too powerful, define what power cannot solve and what the player
  controls.
- If the role is too soft, define a boundary and what kindness refuses.
- If ensemble members blur, build the contrast matrix before adding scenes.

## Handoff

Hand the packet to:

- `lunatalk-card-blueprint` when the concept still needs direction, world, voice,
  opening, or field planning.
- `lunatalk-voice-director` when the character core is clear but speaking style,
  catchphrase use, refusal voice, talkExample need, or ensemble contrast still
  needs calibration.
- `lunatalk-relationship-architect` when the character core is clear but
  relationship pacing, generic flirting, comfort loops, repair/rupture, or
  closeness/friction state still needs design.
- `lunatalk-card-author` when the author wants a real private card or patch.
- `lunatalk-opening-director` when the first scene must reveal the core.
- `lunatalk-longplay-architect` when the core needs progression, route state, or
  memory.
- `lunatalk-chat-simulation` when transcripts show generic behavior or weak
  pressure response.
