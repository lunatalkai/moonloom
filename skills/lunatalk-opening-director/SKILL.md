---
name: lunatalk-opening-director
description: Use when a LunaTalk role-card task focuses on roleWelcome, welcome text, opening scene, first screen, first user reply, second-turn move, greeting-only openings, hollow openings, onboarding clarity, first-action path, or making an existing card immediately playable before authoring, render review, simulation, or publish readiness.
---

# LunaTalk Opening Director

Use this skill when the author has a card idea or existing role but the first
screen is weak. The output is an opening packet, not a full role card.

## Required references

Read `../../references/opening-design.md` for opening packets, five-beat design,
first reply paths, second-turn engines, mode recipes, XMLV3 scaffolds, and
failure repairs. Read `../../references/card-authoring-templates.md` when turning
the packet into a welcome scaffold. Read `../../references/quality-rubric.md`
for welcome and self-review checks. Read `../../references/theme-v3-rendering.md`
when the welcome uses XMLV3 or HTML. Read `../../references/playtest-loop.md`
when the task includes testing first-turn behavior. Read
`../../references/boundary-design.md` when the opening is mature, intense,
horror-leaning, or consent-sensitive. Read
`../../references/agency-design.md` when the opening makes the player watch,
narrates player feelings/actions, uses decorative choices, funnels all reply
paths, or lacks meaningful refusal/route-change behavior. Read
`../../references/ensemble-card-design.md` when the opening fails because a
multi-character card introduces the full cast, lacks turn ownership, or lets
speakers talk over the player. Use `lunatalk-ensemble-director` first when the
cast structure is unresolved. Read `../../references/play-engine-design.md` when
an RPG, adventure, open-world, survival, investigation, simulator, or game-like
opening reads like a rule manual, exposes decorative stats, lacks compact state,
or offers choices without resource/risk/state consequences. Use
`lunatalk-play-engineer` first when the playable rules are unresolved.

## Boundary

Do not call MCP tools from this skill. Do not patch `roleWelcome` directly unless
the user explicitly asked to operate through `lunatalk-card-author`. Design the
opening, then hand off to authoring, render review, or simulation.

## Workflow

1. Identify the current opening failure: greeting-only, lore dump, menu without
   scene, passive mood, missing player role, missing pressure, unclear first
   action, too-long welcome, or second-turn dead end.
2. Infer or ask only for missing information that blocks the opening: player
   role, card shape, role desire, current location, pressure, and content rating.
3. Use or preserve `lunatalk-agency-designer` when the first-screen problem is
   spectator play, decorative choices, player-feeling narration, route funneling,
   or missing refusal/redirect paths.
   Use or preserve `lunatalk-play-engineer` when the first-screen problem is a
   game manual, decorative state, unclear resources, missing turn protocol, or
   choices with no risk/cost/state update.
4. Build the five beats: place/time, role action, pressure, player implication,
   and reply paths.
5. Write one expected first user message.
6. Write the role's second-turn move and what changes.
7. Choose welcome mode: plain, XMLV3, or HTML. Prefer XMLV3 when structure,
   choices, or state visibility help the first screen.
8. State token tradeoff: what stays in welcome, what belongs in detail, and what
   to cut.
9. Run opening self-review.
10. Hand off to `lunatalk-card-author` for actual private-card patching, or to
   `lunatalk-chat-simulation` for first-turn probes after author approval and
   normal billing acceptance.

## Output format

Return:

```text
Opening packet:
- current failure:
- opening promise:
- player role:
- place / time:
- role action already happening:
- pressure:
- player implication:
- reply paths:
- expected first user message:
- second-turn move:
- what changes:
- renewed hook:
- state visibility:
- welcome mode:
- token tradeoff:

Welcome draft:
...

Self-review:
- first reply under 10 seconds:
- role acts first:
- pressure visible:
- meaningful reply paths:
- second-turn change:
- token balance:
- player agency:

Handoff:
- next skill:
- ready: yes | no
- missing input:
```

## Quality rules

- Do not polish a greeting. Replace it with a scene.
- Do not make choices carry the whole opening. Add scene beats first.
- Do not let choices become mood labels. Each reply path should change response,
  information, relationship, state, risk, route, or the next hook.
- Do not put the full world bible in welcome. Keep only what the first action
  needs.
- Do not write a beautiful first screen that has no second-turn consequence.
- Do not decide the player's feelings, consent, actions, or commitments.
- If the opening is mature or coercion-adjacent, preserve the boundary packet's
  reply paths and stop conditions.
- Keep the output public-safe and original.

## Repair heuristics

- If the role waits for the player, add a role action already happening.
- If the player has no reason to care, add player implication and pressure.
- If the opening is just mood, add a concrete object, decision, risk, or route.
- If the player can only watch, run agency design before rewriting prose.
- If the opening is too long, move reusable lore and rules to `roleDetailDesc`.
- If the second turn is generic, add state change, reveal, complication, or route
  offer.
- If an ensemble opening is a roll call, choose one focal conflict and delay the
  rest of the cast. If speaker entry, spotlight, or turn ownership is unclear,
  use `lunatalk-ensemble-director` before rewriting the welcome.
- If a game-like opening is a manual, define a play-engine packet first, then
  rebuild the welcome around one crisis, visible compact state, and 2-4 choices
  tied to resource, risk, route, or state.
