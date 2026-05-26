---
name: lunatalk-longplay-architect
description: Use when a LunaTalk role-card task involves long-term playability, replayability, multi-session arcs, route seeds, progression, memory/state, scene continuation, cards that die after the first few turns, passive or stalled loops, relationship pacing, RPG state, or making choices matter beyond the opening.
---

# LunaTalk Longplay Architect

Use this skill when the opening works but the card cannot sustain play. The output
is a longplay packet, not a full role card.

## Required references

Read `../../references/longplay-design.md` for continuity spines, progression
phases, state economy, route seeds, memory threads, role initiative, and
continuation probes. Read `../../references/role-card-writing-framework.md` for
PACT and archetype recipes. Read `../../references/card-authoring-templates.md`
when turning the packet into `roleDetailDesc` patch targets. Read
`../../references/playtest-loop.md` when the task includes simulation or probe
design. Read `../../references/voice-calibration.md` when long sessions cause
voice drift. Read `../../references/boundary-design.md` when routes involve
mature, intense, horror-leaning, jealous, or consent-sensitive pressure.
Read `../../references/relationship-engine.md` when long sessions flatten into
generic flirting, comfort loops, instant intimacy, rivalry without repair, weak
trust/friction state, or relationship pacing drift.
Read `../../references/agency-design.md` when choices are cosmetic, routes
funnel back to the same scene, the player can only watch progression, or route
changes do not create distinct consequences. Read
`../../references/ensemble-card-design.md` when longplay depends on group
tension, alliance, suspicion, speaker entry, or cast-over-player repair. Use
`lunatalk-ensemble-director` first when cast structure or turn ownership is not
yet clear.

## Boundary

Do not call MCP tools from this skill. Do not patch `roleDetailDesc` directly
unless the user explicitly asked to operate through `lunatalk-card-author`.
Design the longplay engine, then hand off to authoring or simulation.

## Workflow

1. Identify the longplay failure: dead third turn, repeated setup, passive role,
   choices with no memory, flat relationship, lost state, stalled route, or
   session restart.
2. Preserve any working opening packet. Do not rewrite the welcome unless the
   longplay failure starts on the first screen.
3. Use or preserve `lunatalk-agency-designer` when the failure is decorative
   choices, route funneling, spectator progression, missing refusal/redirect
   routes, or consequences that ignore player choice.
4. Use or preserve `lunatalk-relationship-architect` when the failure is generic
   flirting, comfort loops, instant intimacy, flat trust/friction state, rivalry
   without repair, or relationship refusal that ends play.
5. Define the continuity spine: what choice changes what pressure over time.
6. Build 3-6 progression phases with triggers, role behavior, player leverage,
   unlocks, and risks.
7. Design a compact state model that the role can update every 2-3 turns.
8. Write 2-4 route seeds. Each route needs trigger, role pressure, player
   leverage, unlock, cost, memory, and renewal hook.
9. Write memory threads and return-later behavior.
10. Write role initiative for accepting, questioning, resisting, passive,
   route-changing, and returning-later player messages.
11. Produce continuation probes and pass/fail triggers.
12. State token tradeoff and handoff target.

## Output format

Return:

```text
Longplay packet:
- current failure:
- longplay promise:
- card shape:
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

Self-review:
- role can continue without player carrying plot:
- state changes every 2-3 turns:
- routes have cost and memory:
- later sessions restart from unresolved hook:
- player agency preserved:
- state model compact:
- token balance:

Handoff:
- next skill:
- ready: yes | no
- missing input:
```

## Quality rules

- Do not solve longplay by adding more lore. Add state, routes, memory, and role
  initiative.
- Do not create decorative meters. Track only state that changes future turns.
- Do not make routes linear unless the card is explicitly a scenario.
- Do not let memory decide the player's feelings, consent, loyalty, or actions.
- Make the role proactive without railroading: reveal, offer, ask, complicate,
  escalate, withdraw, change location, or call back a prior choice.
- For relationship cards, make small repeated beats matter. For game cards, keep
  state small enough to update. For ensemble cards, preserve the ensemble packet
  and track group tension without drowning out the player.
- Keep the output public-safe and original.

## Repair heuristics

- If the third turn repeats setup, add a continuity spine and one forced state
  change by turn two.
- If the player carries every beat, add passive-player behavior and role
  initiative table.
- If relationship play flattens into comfort or flirting, preserve or create a
  relationship-engine packet before expanding longplay routes.
- If choices feel cosmetic, add route costs and memory left behind.
- If every route returns to one scene, build a reply-path matrix and consequence
  checks before adding more route labels.
- If the card forgets later, add return-later behavior and unresolved hooks.
- If state is too large, cut to fields that change access, behavior, risk, route,
  or relationship.
- If longplay rules bloat the card, cut lore before cutting state, route, memory,
  or role initiative.
