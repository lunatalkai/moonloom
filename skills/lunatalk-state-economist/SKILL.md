---
name: lunatalk-state-economist
description: Use when LunaTalk role-card work needs state economy design: deciding which memory/state fields exist, visible vs hidden vs detail-only placement, update rules, decorative meter removal, or player-agency-safe state before authoring, longplay, presentation, render review, simulation, or publishing.
---

# LunaTalk State Economist

Use this skill when the unresolved layer is not "make more state", but which
state is worth paying for. The output is a State economy packet, not final role
fields, not XMLV3, and not a mutating MCP operation.

## Required references

Read `../../references/state-economy-design.md` first. Read
`../../references/role-card-writing-framework.md` for the broader card quality
stack. Read `../../references/card-authoring-templates.md` when the packet must
be preserved into blueprinting or field assembly.

Load neighboring references only when needed: `longplay-design.md` for
progression and route seeds, `play-engine-design.md` for RPG/resources/turn
protocol, `presentation-design.md` for visible status or hidden JSON placement,
and `agency-design.md` when state risks deciding the player's feelings, consent,
loyalty, actions, or route.

## Boundary

Do not call MCP tools. Do not create, patch, validate, render, simulate, publish,
or upload assets from this skill.

Do not invent state because a UI panel would look good. Track only state that
changes future behavior, choices, access, risk, cost, clue, relationship,
promise, route, or boundary handling.

## Workflow

1. Identify why state is being considered: longplay memory, route consequence,
   game resource, relationship pacing, scenario clue, world pressure, daily-life
   habit, presentation status, or author confusion.
2. List candidate fields and reject any that are decorative meters, duplicate
   prose, or only express mood.
3. Classify each candidate as `visible`, `hidden`, `detail-only`, or `omit`.
4. For each kept field, define owner, allowed values, update trigger, update
   cadence, effect on role behavior, effect on player options, and token cost.
5. Apply agency safety: state must not store player feelings, consent, loyalty,
   actions, guilt, confession, desire, or final route choice.
6. Decide placement: durable rules in `roleDetailDesc`, visible status in
   welcome/XMLV3, compact hidden JSON only when it supports future updates.
7. Produce verification probes and hand off to longplay, play-engine,
   presentation, card-author, or simulation.

## Output format

Return:

```text
Route:
- entry skill:
- selected skill: lunatalk-state-economist
- mode: state economy design
- MCP calls now: no
- final fields now: no
- next skill:

State economy packet:
- current request:
- card shape:
- state need:
- candidate fields:
  - field:
  - keep | omit:
  - reason:
- state fields:
  - key:
  - visibility: visible | hidden | detail-only
  - owner:
  - allowed values:
  - update trigger:
  - update cadence:
  - role behavior changed:
  - player options changed:
  - token cost:
- omitted state:
  - candidate:
  - reason:
- field placement:
  - roleDetailDesc:
  - roleWelcome / XMLV3:
  - Theme V3:
  - hidden JSON:
- agency guardrails:
- verification probes:
- handoff:

Self-review:
- every kept field changes future play:
- decorative meters removed:
- player feelings/actions not stored:
- update cadence is executable:
- visible state helps the next action:
- hidden JSON is compact:
- next skill:
```

## Quality rules

- Good state changes access, behavior, risk, cost, clue, resource, relationship,
  promise, route, boundary, or the next role move.
- Do not track decorative meters, vibe labels, poster stats, or fields that only
  make a status panel look richer.
- Do not track the player's feelings, consent, loyalty, guilt, desire, actions,
  confession, commitment, or route choice. Track what the role has observed,
  promised, risked, withheld, unlocked, lost, or made available.
- Visible state should help the player decide the next action. Hidden state
  should be compact JSON-like data the role can actually update.
- If state is mainly about multi-turn continuation, hand off to
  `lunatalk-longplay-architect`. If it is a game loop, hand off to
  `lunatalk-play-engineer`. If it is only visual placement, hand off to
  `lunatalk-presentation-director`.
- Keep output public-safe and original.
