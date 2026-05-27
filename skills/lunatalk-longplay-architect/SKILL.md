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
`../../references/state-economy-design.md` when the main blocker is deciding
which state fields are worth tracking, visible, hidden, detail-only, or omitted.
Use `lunatalk-state-economist` first when state economy is unresolved. Read
`../../references/playtest-loop.md` when the task includes simulation or probe
design. Read `../../references/voice-calibration.md` when long sessions cause
voice drift. Read `../../references/boundary-design.md` when routes involve
mature, intense, horror-leaning, jealous, or consent-sensitive pressure.
Read `../../references/daily-life-design.md` when long sessions for a
daily-life, slice-of-life, neighbor, roommate, cafe, workplace, school, quiet
routine, shared-object, or tiny-disruption card become pleasant but static. Use
`lunatalk-daily-life-architect` first when ordinary routine, habit state, small
playable desire, passive-player behavior, or return-next-time hooks are not yet
coherent.
Read `../../references/relationship-engine.md` when long sessions flatten into
generic flirting, comfort loops, instant intimacy, rivalry without repair, weak
trust/friction state, or relationship pacing drift.
Read `../../references/play-engine-design.md` when longplay depends on RPG,
adventure, open-world, survival, investigation, simulator, compact state,
resources, inventory, quests, combat, turn protocol, or failure-forward behavior.
Use `lunatalk-play-engineer` first when the state/resource/turn loop is not yet
coherent.
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
3. Use or preserve `lunatalk-daily-life-architect` when the card is daily-life
   and the longplay failure is static pleasant routine, no small state change,
   no shared object/place memory, no passive-player behavior, or no
   return-next-time hook. Preserve the daily-life packet before expanding route
   seeds.
4. Use or preserve `lunatalk-agency-designer` when the failure is decorative
   choices, route funneling, spectator progression, missing refusal/redirect
   routes, or consequences that ignore player choice.
5. Use or preserve `lunatalk-relationship-architect` when the failure is generic
   flirting, comfort loops, instant intimacy, flat trust/friction state, rivalry
   without repair, or relationship refusal that ends play.
6. Define the continuity spine: what choice changes what pressure over time.
7. Build 3-6 progression phases with triggers, role behavior, player leverage,
   unlocks, and risks.
8. Design a compact state model that the role can update every 2-3 turns. If the
   state candidates are bloated, decorative, unsafe, or lack update triggers,
   use or preserve `lunatalk-state-economist` before continuing.
9. Write 2-4 route seeds. Each route needs trigger, role pressure, player
   leverage, unlock, cost, memory, and renewal hook.
10. Write memory threads and return-later behavior.
11. Write role initiative for accepting, questioning, resisting, passive,
   route-changing, and returning-later player messages.
12. Produce continuation probes and pass/fail triggers.
13. State token tradeoff and handoff target.

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
- Preserve any State economy packet from `lunatalk-state-economist`; do not
  summarize away visibility, update cadence, omitted state, agency guardrails, or
  field placement.
- Make the role proactive without railroading: reveal, offer, ask, complicate,
  escalate, withdraw, change location, or call back a prior choice.
- For relationship cards, make small repeated beats matter. For game cards, keep
  state small enough to update and preserve the play-engine packet when compact
  state, resources, turn protocol, or failure-forward rules drive continuation.
  For ensemble cards, preserve the ensemble packet and track group tension
  without drowning out the player.
- Keep the output public-safe and original.

## Repair heuristics

- If the third turn repeats setup, add a continuity spine and one forced state
  change by turn two.
- If the player carries every beat, add passive-player behavior and role
  initiative table.
- If relationship play flattens into comfort or flirting, preserve or create a
  relationship-engine packet before expanding longplay routes.
- If daily-life play stays cozy but unchanged, preserve or create a daily-life
  packet before expanding longplay routes; track habit, object/place memory,
  small practical pressure, and return-next-time changes instead of adding
  melodrama.
- If choices feel cosmetic, add route costs and memory left behind.
- If every route returns to one scene, build a reply-path matrix and consequence
  checks before adding more route labels.
- If the card forgets later, add return-later behavior and unresolved hooks.
- If state is too large, cut to fields that change access, behavior, risk, route,
  or relationship.
- If longplay rules bloat the card, cut lore before cutting state, route, memory,
  or role initiative.
