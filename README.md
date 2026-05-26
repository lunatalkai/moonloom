# Moonloom

Moonloom is the LunaTalk AI creation toolkit for agent clients.

It packages skills, prompts, and MCP guidance that help external AI clients create,
validate, render-review, simulate, and submit LunaTalk content through the LunaTalk
MCP surface. The first release focuses on private role card creation with the
Card Writer MCP; the project is intentionally broader than card writing so it can
later include worldbuilding, material packs, import flows, moderation assistance,
and creator workflow automation.

Moonloom is designed as a role-card authoring framework, not only a tool catalog.
It helps an agent collaborate with an author through ideation, character
positioning, worldbuilding, opening-scene design, voice control, interaction-loop
repair, token budgeting, render review, simulation, and publish readiness.

## What is included

- `skills/using-moonloom` is the router skill. Start here when an agent is unsure
  which Moonloom workflow applies.
- `skills/lunatalk-character-core` turns thin, trope-only, or generic personas
  into memorable character-core packets before blueprinting or authoring.
- `skills/lunatalk-world-engineer` turns world seeds, relationship networks,
  factions, locations, and lore-heavy settings into playable world-engine packets.
- `skills/lunatalk-voice-director` turns generic dialogue, voice drift,
  catchphrase overuse, and blurred ensemble speakers into voice-director packets.
- `skills/lunatalk-card-blueprint` turns vague ideas, tropes, settings, and
  relationship seeds into card-ready blueprints before MCP creation.
- `skills/lunatalk-material-distiller` turns author-provided notes, local files,
  material packs, drafts, and large world bibles into source-to-play maps before
  blueprinting or authoring.
- `skills/lunatalk-boundary-designer` turns mature, intense, horror-leaning, or
  consent-sensitive premises into boundary packets before blueprinting,
  authoring, simulation, or publish readiness.
- `skills/lunatalk-opening-director` turns greeting-only, hollow, or overloaded
  welcomes into opening packets with first reply paths and second-turn moves.
- `skills/lunatalk-longplay-architect` turns dead third turns, repetitive loops,
  weak memory, and flat routes into longplay packets for sustained sessions.
- `skills/lunatalk-card-author` guides end-to-end private role card creation.
- `skills/lunatalk-render-review` reviews HTML/XMLV3/Theme V3 render output.
- `skills/lunatalk-chat-simulation` runs and evaluates private chat simulation.
- `skills/lunatalk-publish-readiness` checks whether a private card is ready to submit.
- `skills/lunatalk-benchmark-runner` runs public-safe synthetic regression checks.
- `references/character-core-design.md` defines desire, contradiction, boundary,
  player leverage, relationship asymmetry, pressure behavior, and appeal repair.
- `references/world-engine-design.md` defines playable world rules, relationship
  networks, location functions, compact state, route seeds, and lore compression.
- `references/role-card-writing-framework.md` defines the practical framework for
  writing high-playability cards.
- `references/card-authoring-templates.md` provides reusable draft packets,
  field templates, XMLV3 welcome scaffolds, boundary-sensitive prompts, and
  self-review packets.
- `references/material-distillation.md` defines source-to-play mapping,
  large-world compression, source hygiene, conflict handling, and token budget
  rules for material-heavy cards.
- `references/boundary-design.md` defines rating intent, explicitness ceilings,
  player agency contracts, escalation ladders, refusal behavior, safer fallbacks,
  first-scene guardrails, and probes for boundary-sensitive cards.
- `references/opening-design.md` defines five-beat opening design, opening
  packets, first reply paths, second-turn moves, XMLV3 scaffolds, and opening
  failure repairs.
- `references/longplay-design.md` defines continuity spines, progression phases,
  state economy, route seeds, memory threads, role initiative, and continuation
  probes.
- `references/playtest-loop.md` defines simulation probe design, transcript
  triage, patch mapping, and author co-review for closed-loop card testing.
- `references/voice-calibration.md` defines executable voice cards,
  micro-samples, ensemble contrast checks, and blind-line tests for consistent
  character voice.
- `references/quality-rubric.md` defines the public checklist for judging whether
  a card is playable, anchored, consequential, token-efficient, visually readable,
  and ready for simulation or submission.
- `references/safety-and-cost.md` covers ownership, public actions, mature-content
  boundaries, simulation cost, and credential handling.
- `examples/synthetic-card-briefs.md` provides fictional benchmark prompts for
  testing authoring, render review, and simulation loops.
- `.mcp.json` contains an example remote MCP client configuration.

## Skill references

Shared references live in the repository-level `references/` directory so every
skill can reuse the same public guidance without duplicating it. Inside a skill,
link to these files relative to the skill directory, for example
`../../references/voice-calibration.md`. When an agent runs from the repository
root, the same file is available as `references/voice-calibration.md`.

## MCP endpoint

The hosted MCP surface is expected to be:

```text
https://api.lunatalk.ai/mcp/card-writer
```

Local development usually proxies through:

```text
http://localhost:8888/mcp/card-writer
```

Use an authenticated LunaTalk account token. Moonloom does not introduce separate
MCP-specific scopes; the server applies normal login identity, account ownership,
quota, moderation, publishing, and billing rules.

## Status

This repository is an initial public scaffold. The skills are designed to match
the LunaTalk Card Writer MCP M1 workflow and will evolve as the MCP surface expands.
