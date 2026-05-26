---
name: lunatalk-agency-designer
description: Use when a LunaTalk role-card task involves player agency, user insertion space, interaction hooks, decorative choices, railroaded routes, the role deciding the player's feelings or actions, spectator openings, passive-player repair, reply-path design, consequence checks, or making the player able to accept, refuse, question, leave, set terms, or change the route.
---

# LunaTalk Agency Designer

Use this skill when the weak layer is the player's ability to act. The output is
an agency packet, not a full card and not a mutating MCP operation.

## Required references

Read `../../references/agency-design.md` first. Read
`../../references/opening-design.md` when the failure starts on the first screen
or choices are decorative. Read `../../references/longplay-design.md` when
choices stop mattering after the opening. Read
`../../references/character-core-design.md` when the role has no player leverage.
Read `../../references/boundary-design.md` when the premise is mature, coercive,
power-imbalanced, horror-leaning, jealous, or consent-sensitive. Read
`../../references/card-authoring-templates.md` for field patch targets. Read
`../../references/quality-rubric.md` for self-review and publish-readiness checks.
Read `../../references/playtest-loop.md` when planning probes or simulation.

## Boundary

Do not call MCP tools from this skill. Do not write or patch real role fields
unless the author explicitly continues through `lunatalk-card-author`. Agency is
Moonloom writing guidance, not an MCP validation gate.

## Workflow

1. Diagnose the agency failure: spectator opening, player-feeling narration,
   forced compliance, decorative choices, route funneling, passive role, no
   refusal route, no meaningful consequence, or the role deciding player actions.
2. If the role has no player leverage, use `lunatalk-character-core` first or
   preserve its packet.
3. If the premise is boundary-sensitive, use `lunatalk-boundary-designer` first
   or preserve its boundary packet.
4. Define player insertion space: identity, emotion, intention, method, boundary,
   and what the card must not decide.
5. Build interaction hooks that give the player knowledge, access, resource,
   relationship power, interpretation, boundary, or change authority.
6. Write a reply-path matrix. Each meaningful path needs a role response, a state
   or route change, and a renewed hook.
7. Add passive-player and boundary-setting behavior without making the role wait
   forever or seize the player's actions.
8. Name field patch targets and hand off to opening, longplay, authoring,
   simulation, or publish readiness.

## Output format

Return:

```text
Agency packet:
- current failure:
- agency promise:
- prerequisite repair:
- player role:
- player insertion space:
- player controls:
- player can refuse:
- player can change:
- card must not decide:
- interaction hooks:
- agency guardrails:
- reply-path matrix:
- compact state:
- passive-player behavior:
- boundary handling:
- consequence checks:
- field patch targets:
- token tradeoff:

Self-review:
- player can act before lore expands:
- at least three reply paths matter:
- role pressures without deciding the player:
- refusal keeps play alive:
- passive input gets a new hook:
- choices change state, route, risk, relationship, information, or boundary:
- token tradeoff:
- next skill:
```

## Quality rules

- Do not fix agency by adding more choices if those choices do not change
  consequence, state, route, relationship, information, or boundary terms.
- Do not narrate the player's feelings, consent, attraction, loyalty, memory, or
  actions.
- Do not make the player only admire, comfort, obey, or watch the role perform.
- Do not make refusal end play. Give refusal a cost, alternate route, changed
  boundary, or later-return hook.
- Do not make the role passive. The role can reveal, ask, bargain, pressure,
  withdraw, change location, introduce a cost, or call back a prior choice.
- Keep the output original and public-safe. Do not copy unprovided material or
  make unsupported origin claims.

## Handoff

Hand the packet to:

- `lunatalk-opening-director` when the first screen needs a playable reply path.
- `lunatalk-longplay-architect` when choices need memory, route costs, or
  continuation probes.
- `lunatalk-card-author` when the author wants an MCP-backed role or patch.
- `lunatalk-chat-simulation` when transcripts show player-agency takeover,
  ignored choices, or no next action and the author accepts normal simulation
  cost.
- `lunatalk-publish-readiness` when agency is the remaining blocker before public
  submission.
