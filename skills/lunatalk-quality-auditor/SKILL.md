---
name: lunatalk-quality-auditor
description: Use when a LunaTalk role card, draft, blueprint, packet stack, or role fields need a quality audit, scorecard, craft rating, top-tier check, good-enough review, first-three repair list, or decision on whether to continue ideation, authoring, render review, simulation, or publish readiness.
---

# LunaTalk Quality Auditor

Use this skill when the author wants to know how strong a draft is. The output is
a quality audit packet and repair priority, not a rewrite, not a mutating MCP
operation, and not public submission.

This skill is for rubric-based craft review. It separates "is this good enough?"
from "how do I patch this exact private card?" and from "should I publish now?"

## Required references

Read `../../references/quality-scorecard.md` first. Read
`../../references/quality-rubric.md` for the broader self-review checklist. Read
`../../references/role-card-writing-framework.md` for promise, engine, play,
presentation, PACT, and top-card patterns. Read
`../../references/card-authoring-templates.md` when the audit needs to preserve
existing packets or hand off to field drafting.

Read narrow references only for weak dimensions: archetype contracts, character
core, relationship engine, world engine, play engine, agency, opening, longplay,
voice, boundary, token economy, Theme V3 rendering, or playtest loop.

## Boundary

Do not call MCP tools from this skill. Do not rewrite fields unless the author
continues through `lunatalk-card-author`.

Do not treat scorecard results as MCP validation, ranking, analytics, or platform
metrics. The scorecard is public craft guidance for authoring.

Use `lunatalk-card-doctor` instead when an existing card has several concrete
symptoms and the main task is diagnosis, field patch mapping, or repair order.
Use `lunatalk-publish-readiness` instead when the author explicitly wants to
submit a private role for public review.

## Workflow

1. Gather evidence: card shape, goal, language, rating intent, field snippets,
   existing packets, render notes, tokenBudget, and simulation summaries if
   provided.
2. State missing evidence. Do not invent field content or simulation results.
3. Flag critical blockers before scoring.
4. Score relevant dimensions from `quality-scorecard.md` on the `0-4` scale.
5. Assign an overall tier: blocked, needs architecture, usable private draft,
   strong candidate, or signature candidate.
6. Name strongest dimensions and weakest dimensions.
7. Choose the first three repairs by risk and leverage.
8. Map repairs to Moonloom skills and fields.
9. State whether validation, render review, simulation, authoring, or publish
   readiness should happen next.

## Output format

Return:

```text
Quality audit packet:
- audit scope:
- evidence available:
- evidence missing:
- card shape:
- overall tier:
- critical blockers:
- scorecard:
  - promise:
  - archetype contract:
  - character appeal:
  - relationship / world engine:
  - play engine:
  - player agency:
  - opening:
  - second-turn engine:
  - longplay:
  - voice:
  - boundary handling:
  - token allocation:
  - presentation:
  - testability:
- strongest dimensions:
- weakest dimensions:
- first three repairs:
- repair skill order:
- keep / move / cut / rewrite:
- validation / render / simulation stance:
- handoff:

Self-review:
- scores are evidence-backed:
- blockers considered before total:
- no MCP hard gate:
- no unsupported source or platform claims:
- next skill:
```

## Quality rules

- Use `N/A` for dimensions that do not apply. Do not punish a simple companion
  card for lacking RPG mechanics or a generator schema.
- A beautiful welcome cannot compensate for no durable engine.
- A strong premise cannot compensate for player-agency takeover.
- A long detail field is not automatically strong; it must create reusable
  behavior, state, voice, routes, or boundaries.
- A readable preview is not proof of playability.
- A simulation should be delayed when the scorecard already identifies structural
  repairs.
- Keep the first three repairs concrete enough that another Moonloom skill can
  continue without rereading the full audit.

## Handoff

Hand off to:

- `lunatalk-card-doctor` when several weak dimensions interact and the repair
  order needs diagnosis.
- `lunatalk-archetype-director` when the primary contract is unclear.
- `lunatalk-character-core`, `lunatalk-relationship-architect`, or
  `lunatalk-world-engineer` when the durable engine is weak.
- `lunatalk-play-engineer` when RPG/adventure/sandbox mechanics, compact state,
  resources, quest/risk routes, turn protocol, or failure-forward behavior are
  the weakest dimension.
- `lunatalk-agency-designer`, `lunatalk-opening-director`, or
  `lunatalk-longplay-architect` when play, reply paths, second turn, or
  continuation fails.
- `lunatalk-voice-director` when voice is the weakest remaining dimension.
- `lunatalk-token-architect` when field allocation hides the engine.
- `lunatalk-card-author` when the author wants the repairs applied to a private
  card.
- `lunatalk-render-review`, `lunatalk-chat-simulation`, or
  `lunatalk-publish-readiness` only after the writing-layer audit no longer has
  unresolved structural blockers.
