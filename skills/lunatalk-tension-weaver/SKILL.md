---
name: lunatalk-tension-weaver
description: Use when LunaTalk role-card work focuses on tension triangle design, inert or pretty-but-passive premises, missing stakes, weak hook, weak why now, missing role desire, player leverage, external pressure, or first-scene pressure before blueprinting, authoring, opening repair, render review, simulation, or publishing.
---

# LunaTalk Tension Weaver

Use this skill when the unresolved layer is the card's core pressure: the idea is
interesting, but it does not yet explain what the role wants, what the player can
change, or why the scene starts now. The output is a Tension packet, not final
role fields and not a mutating MCP operation.

## Required references

Read `../../references/tension-triangle.md` first. Read
`../../references/role-card-writing-framework.md` for the top-card pattern stack.
Read `../../references/card-authoring-templates.md` when the packet must be
preserved through blueprinting or field assembly. Read
`../../references/character-core-design.md` when role desire or boundary is
missing. Read `../../references/agency-design.md` when the player has no real
control. Read the specialized engine reference when the pressure belongs mainly
to relationship, daily-life, scenario, play, world, generator, or ensemble work.

## Boundary

Do not call MCP tools. Do not create, patch, validate, render, simulate, publish,
or upload assets from this skill.

Do not fix inertness with prettier mood prose, a larger lore dump, or forced
player feelings. Build pressure the player can answer.

## Workflow

1. Identify current inertness: missing role desire, player leverage, external
   pressure, why-now, consequence, or renewal.
2. If no direction exists yet, route to `lunatalk-premise-workshop` first. If the
   weak layer is only role core, player agency, opening execution, or a specific
   engine, route there instead.
3. Build the triangle: role desire, player leverage, external pressure.
4. Make the pressure visible in one first-scene hook and one why-now statement.
5. Define what changes if the player accepts, questions, refuses, or redirects.
6. Name the consequence if the player does nothing without taking over the
   player's feelings or actions.
7. State field placement and handoff to blueprint, opening, or the narrow engine
   that should carry the pressure.

## Output format

Return:

```text
Route:
- entry skill:
- selected skill: lunatalk-tension-weaver
- mode: tension triangle / why-now design
- MCP calls now: no
- final fields now: no
- next skill:

Tension packet:
- current inertness:
- card shape:
- role desire:
- desire under pressure:
- player leverage:
- external pressure:
- why now:
- consequence if the player does nothing:
- first-scene hook:
- reply paths:
  - accept / approach:
  - question / investigate:
  - refuse / set terms:
  - redirect / exploit:
- state or route changed:
- field placement:
  - roleDesc:
  - roleDetailDesc:
  - roleWelcome:
  - talkExample:
- delayed routes:
- verification:
  - role acts first:
  - player can change pressure:
  - pressure renews after first reply:
  - no player-agency takeover:
- handoff:

Self-review:
- desire creates action:
- player leverage is concrete:
- external pressure is visible:
- why-now is answerable:
- passive player still gets a role move:
- next skill:
```

## Quality rules

- Pressure must create choice, cost, route, state, access, clue, relationship, or
  boundary change.
- The role may act, ask, reveal, withhold, bargain, pressure, or retreat; it must
  not decide the player's inner state or commitments.
- Use one focused pressure source before adding a second.
- Prefer concrete objects, deadlines, debts, secrets, rules, social risks, or
  care costs over abstract destiny.
- Keep tension public-safe and original.
- Do not turn tension quality into MCP validation or server gates.

## Handoff

Hand the packet to:

- `lunatalk-card-blueprint` when the triangle is ready for full card planning.
- `lunatalk-opening-director` when the triangle exists but the first screen is
  still weak.
- `lunatalk-character-core` when desire, contradiction, or boundary is missing.
- `lunatalk-agency-designer` when the player still cannot change the pressure.
- The relevant engine skill when relationship, daily-life, scenario, play, world,
  generator, or ensemble pressure is the true blocker.
