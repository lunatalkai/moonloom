---
name: lunatalk-premise-workshop
description: Use when a LunaTalk role-card task starts from no settled premise, only a mood, trope, vibe, aesthetic, genre cluster, "make it popular" request, or asks to brainstorm/open up/compare directions before blueprinting, fields, MCP calls, render review, simulation, or publishing.
---

# LunaTalk Premise Workshop

Use this skill at the earliest creative stage, before `lunatalk-card-blueprint`.
The output is a premise workshop packet: contrasted playable directions and a
recommended handoff, not final role fields and not a mutating MCP operation.

## Required references

Read `../../references/premise-workshop.md` first. Read
`../../references/archetype-contracts.md` only when the directions need primary
contract comparison. Read `../../references/card-authoring-templates.md` when the
packet must be preserved for later blueprinting or authoring.

If one direction becomes clearly dominant and exposes a narrow weak layer, hand
off to the matching Moonloom skill instead of continuing to broaden:

- `lunatalk-archetype-director` for card type uncertainty or hybrid contracts.
- `lunatalk-character-core` for a trope-only role that needs desire,
  contradiction, boundary, or player leverage.
- `lunatalk-relationship-architect` for romance, friendship, rivalry,
  slow-burn, repair/rupture, or comfort-loop design.
- `lunatalk-daily-life-architect` for quiet routine, shared object, small desire,
  tiny disruption, or habit-state design.
- `lunatalk-scenario-architect` for incident, mystery, clue/reveal, false lead,
  route branch, or suspect-pressure design.
- `lunatalk-world-engineer` for light-setting or heavy-setting rules, factions,
  locations, relationship networks, or lore-dump risk.
- `lunatalk-agency-designer` for player freedom, refusal routes, spectator play,
  or fake choices.
- `lunatalk-boundary-designer` for mature, intense, horror-leaning, jealous,
  power-imbalanced, consent-sensitive, or rating-sensitive ideas.

## Boundary

Do not call MCP tools. Do not create, patch, validate, render, simulate, or
publish a real role from this skill. Do not write final `roleName`, `roleDesc`,
`roleDetailDesc`, `roleWelcome`, or `talkExample` unless the author explicitly
asks to continue through `lunatalk-card-author`.

Do not present public craft guidance as unsupported origin or performance
analysis. Keep the output original and public-safe.

## Workflow

1. Restate the author's seed as a taste brief, not as a finished premise.
2. Decide whether this task is truly premise workshop:
   - If there is no settled role, player position, first scene, or primary
     contract, continue here.
   - If a concrete premise already exists and the author wants fields, hand off
     to `lunatalk-card-author`.
   - If the blocker is one explicit weak layer, hand off to the narrow skill.
3. Ask at most two high-leverage questions only if the missing choice blocks all
   useful directions. Otherwise state assumptions and proceed.
4. Name 3-5 taste axes that will shape the directions.
5. Propose exactly three sharply different directions. Make them differ by
   primary contract, player role, first scene, core loop, involvement ladder, and
   risk.
6. Pressure-test each direction: first reply clarity, player leverage, what
   changes after reply, likely failure mode, and best next Moonloom skill.
7. Recommend one direction and explain why it is more playable than the generic
   version.
8. Return a premise workshop packet and handoff target.

## Output format

Return:

```text
Route:
- entry skill:
- selected skill: lunatalk-premise-workshop
- mode: pre-blueprint premise workshop
- MCP calls now: no
- final fields now: no
- next skill:

Premise workshop packet:
- current seed:
- author taste signals:
- assumptions:
- questions asked:
- taste axes:
- directions:
  - [direction]:
    - title:
    - primary contract:
    - player role:
    - role seed:
    - first scene:
    - core loop:
    - what changes:
    - involvement ladder:
    - why it fits:
    - tradeoff / risk:
    - best next skill:
- recommendation:
- why this direction wins:
- rejected or delayed ideas:
- risk flags:
- next decisions to lock:
- handoff:

Self-review:
- not field drafting:
- three directions differ by play contract:
- player can act in first reply:
- refusal / distance can continue play:
- next skill is narrow:
- public-safe:
```

## Quality rules

- Prefer three strong options over many weak options.
- Make every option playable in one first scene. A mood without player leverage
  is not a direction.
- Do not let "popular", "top-tier", "like the best cards", or similar requests
  become unsupported performance claims. Translate them into public craft goals.
- Keep romance optional unless the author makes it the primary fantasy.
- Keep genre overlays subordinate to the primary contract.
- If the author provides many aesthetics, cluster them into axes and cut any
  motif that does not affect action, route, or consequence.
- If the author is stuck, recommend a direction. Do not end with only questions.

## Handoff

Hand the packet to:

- `lunatalk-archetype-director` when the next step is choosing the primary
  playable contract or limiting a hybrid.
- `lunatalk-card-blueprint` when the author accepts a direction and needs
  character core, relationship/world/play/opening/longplay planning.
- A narrow Moonloom skill when the chosen direction is mostly blocked by one
  layer.
- `lunatalk-card-author` only after a direction has become a field-ready packet
  stack or the author explicitly asks to create or patch a private role.
