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
- `skills/lunatalk-archetype-director` chooses the primary card contract,
  secondary overlays, field allocation, hybrid risks, and Moonloom skill order
  before blueprinting or authoring mixed card types.
- `skills/lunatalk-series-architect` plans related card sets, alternate
  versions, seasonal/event variants, daily-life variants, RPG/system variants,
  and generator/helper variants before blueprinting or authoring.
- `skills/lunatalk-ensemble-director` plans multi-character cards, cast
  keep/merge/cut decisions, turn ownership, spotlight rules, group tension,
  player agency, and voice/sample tradeoffs before blueprinting or authoring.
- `skills/lunatalk-play-engineer` plans RPG, adventure, open-world, survival,
  investigation, sandbox, and simulator cards through compact state, resources,
  quests, turn protocol, failure-forward behavior, and simulation probes before
  blueprinting or authoring.
- `skills/lunatalk-character-core` turns thin, trope-only, or generic personas
  into memorable character-core packets before blueprinting or authoring.
- `skills/lunatalk-relationship-architect` turns flat relationship dynamics,
  generic flirting, comfort loops, instant intimacy, and weak repair/rupture
  routes into relationship-engine packets.
- `skills/lunatalk-world-engineer` turns world seeds, relationship networks,
  factions, locations, and lore-heavy settings into playable world-engine packets.
- `skills/lunatalk-voice-director` turns generic dialogue, voice drift,
  catchphrase overuse, and blurred ensemble speakers into voice-director packets.
- `skills/lunatalk-agency-designer` turns spectator openings, decorative choices,
  route funneling, and player-agency takeover into agency packets.
- `skills/lunatalk-token-architect` turns tokenBudget warnings, overlong
  welcomes, misplaced rules, and visual bloat into token architecture packets.
- `skills/lunatalk-quality-auditor` reviews drafts, blueprints, packet stacks,
  and role fields with a public craft scorecard before authoring, simulation, or
  publishing.
- `skills/lunatalk-card-doctor` diagnoses existing cards, drafts, validation
  results, render reports, simulation symptoms, or author feedback before
  choosing a repair order or rewriting fields.
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
- `references/relationship-engine.md` defines relationship promise, asymmetry,
  closeness/friction state, pacing gates, repair/rupture routes, passive-player
  behavior, and field allocation for relationship-heavy cards.
- `references/world-engine-design.md` defines playable world rules, relationship
  networks, location functions, compact state, route seeds, and lore compression.
- `references/role-card-writing-framework.md` defines the practical framework for
  writing high-playability cards.
- `references/archetype-contracts.md` defines primary card contracts, hybrid
  rules, field allocation, and archetype packets for companion, story, system,
  RPG, generator, daily-life, light-setting, heavy-setting, and ensemble cards.
- `references/card-series-design.md` defines shared-core discipline, keep/merge/
  reject rules, variant contracts, authoring order, and regression checks for
  related role-card sets.
- `references/ensemble-card-design.md` defines cast scope, decision matrices,
  turn ownership, spotlight rules, group tension state, opening policy, and
  agency probes for ensemble cards.
- `references/play-engine-design.md` defines compact state, resource economy,
  quest/risk routes, turn protocol, failure-forward behavior, opening contract,
  token plan, and probes for game-like cards.
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
- `references/agency-design.md` defines player insertion space, reply-path
  matrices, agency guardrails, consequence checks, and interaction hooks.
- `references/token-economy.md` defines token budget diagnostics, field
  allocation, compression ladders, and keep / move / cut / rewrite plans.
- `references/quality-scorecard.md` defines the public craft score scale,
  dimensions, blockers, tiers, and quality audit packet for "is this good
  enough?" reviews.
- `references/card-diagnosis.md` defines multi-symptom card diagnosis,
  weakest-layer triage, field patch mapping, repair order, and verification
  planning for existing-card improvement.
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

Configure the Card Writer MCP endpoint and authentication through the AI client's
normal MCP settings. Moonloom does not publish environment-specific URLs or
credentials in this repository.

Moonloom does not introduce separate MCP-specific scopes; the server applies
normal login identity, account ownership, quota, moderation, publishing, and
billing rules.

## Status

This repository is an initial public scaffold. The skills are designed to match
the LunaTalk Card Writer MCP M1 workflow and will evolve as the MCP surface expands.
