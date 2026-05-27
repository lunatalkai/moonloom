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
- `skills/lunatalk-creation-conductor` coordinates end-to-end creation from a
  vague idea, packet stack, source material, or existing private role through
  skill queue, MCP readiness, assets, validation, render, simulation, iteration,
  and publish-readiness gates.
- `skills/lunatalk-mcp-operator` checks external AI client MCP readiness, tool
  availability, auth posture, idempotency planning, and stage gates before real
  Card Writer MCP actions.
- `skills/lunatalk-collaboration-director` turns author feedback, co-review,
  taste/preference calibration, draft comparisons, and revision choices into a
  decision packet before rewriting, simulating, or publishing.
- `skills/lunatalk-iteration-director` turns self-review, validation,
  tokenBudget, render, simulation, benchmark, previous-patch, and author
  feedback evidence into a closed-loop next iteration decision with one repair,
  stop / continue criteria, cost stance, and handoff.
- `skills/lunatalk-sample-calibrator` compares drafts against public synthetic
  sample packet shapes, flags copy risk, and turns example requests into
  structure-only calibration before blueprinting or authoring.
- `skills/lunatalk-originality-adapter` transforms canon/IP, fan premises,
  copied drafts, similar cards, and recognizable inspirations into original
  card engines before blueprinting or authoring.
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
- `skills/lunatalk-generator-architect` plans generator, helper, and
  creator-assistant cards through artifact contracts, intake defaults, stable
  output schemas, revision operations, and artifact-focused simulation probes.
- `skills/lunatalk-scenario-architect` plans story, mystery, investigation,
  event, trial, rescue, and drama cards through stakes, route branches,
  clue/reveal pacing, false leads, consequence state, and scenario probes before
  blueprinting or authoring.
- `skills/lunatalk-daily-life-architect` plans daily-life, slice-of-life,
  neighbor, roommate, cafe, workplace, school, cohabitation, and quiet routine
  cards through small playable desires, tiny disruptions, shared objects, habit
  state, and return-next-time probes before blueprinting or authoring.
- `skills/lunatalk-character-core` turns thin, trope-only, or generic personas
  into memorable character-core packets before blueprinting or authoring.
- `skills/lunatalk-relationship-architect` turns flat relationship dynamics,
  generic flirting, comfort loops, instant intimacy, and weak repair/rupture
  routes into relationship-engine packets.
- `skills/lunatalk-world-engineer` turns world seeds, relationship networks,
  factions, locations, and lore-heavy settings into playable world-engine packets.
- `skills/lunatalk-tension-weaver` turns inert or pretty-but-passive premises into
  role desire, player leverage, external pressure, why-now, and first-scene hooks.
- `skills/lunatalk-state-economist` decides which state fields deserve token
  budget, which are visible/hidden/detail-only, which decorative meters to omit,
  and how state updates before authoring, longplay, or presentation.
- `skills/lunatalk-detail-engineer` turns thin biographies, under-budget
  `roleDetailDesc`, and missing durable role engines into full Detail engine
  packets before field assembly, MCP patching, render, or simulation.
- `skills/lunatalk-voice-director` turns generic dialogue, voice drift,
  catchphrase overuse, and blurred ensemble speakers into voice-director packets.
- `skills/lunatalk-talk-example-curator` decides when to omit `talkExample`, add
  compact micro-samples, or use full examples for voice, format, and turn protocol.
- `skills/lunatalk-agency-designer` turns spectator openings, decorative choices,
  route funneling, and player-agency takeover into agency packets.
- `skills/lunatalk-token-architect` turns tokenBudget warnings, overlong
  welcomes, misplaced rules, and visual bloat into token architecture packets.
- `skills/lunatalk-presentation-director` plans pre-render XMLV3, Theme V3,
  HTML, visible state, hidden state, visual affordances, and first-screen
  hierarchy before authoring or render review.
- `skills/lunatalk-instruction-guardrail` designs narrow instruction-layer
  guardrails and `role_patch_jailbreak` handoffs only when normal fields are
  coherent but behavior or format still drifts.
- `skills/lunatalk-quality-auditor` reviews drafts, blueprints, packet stacks,
  and role fields with a public craft scorecard before authoring, simulation, or
  publishing.
- `skills/lunatalk-card-doctor` diagnoses existing cards, drafts, validation
  results, render reports, simulation symptoms, or author feedback before
  choosing a repair order or rewriting fields.
- `skills/lunatalk-card-blueprint` turns chosen directions, packet stacks,
  settings, and relationship seeds into card-ready blueprints before MCP creation.
- `skills/lunatalk-material-distiller` turns author-provided notes, local files,
  material packs, drafts, and large world bibles into source-to-play maps before
  blueprinting or authoring.
- `skills/lunatalk-boundary-designer` turns mature, intense, horror-leaning, or
  consent-sensitive premises into boundary packets before blueprinting,
  authoring, simulation, or publish readiness.
- `skills/lunatalk-premise-workshop` turns early mood, trope, aesthetic, genre
  clusters, and "open this idea up" requests into contrasted playable directions
  before blueprinting or authoring.
- `skills/lunatalk-profile-packager` sharpens `roleName`, `roleDesc`, tags, and
  first-impression promise when the card engine exists but the public profile is weak.
- `skills/lunatalk-visual-identity-director` plans avatar, cover, thumbnail,
  image prompts, first-impression visual proof, and MCP asset readiness without
  replacing profile, presentation, or render review.
- `skills/lunatalk-language-stylist` cleans language consistency, zh-Hant /
  zh-TW style, register, pronouns, address terms, and field-to-field wording
  without changing the card engine.
- `skills/lunatalk-opening-director` turns greeting-only, hollow, or overloaded
  welcomes into opening packets with first reply paths and second-turn moves.
- `skills/lunatalk-longplay-architect` turns dead third turns, repetitive loops,
  weak memory, and flat routes into longplay packets for sustained sessions.
- `skills/lunatalk-card-author` assembles packet stacks into field-ready drafts
  and guides end-to-end private role card creation.
- `skills/lunatalk-field-finalizer` performs last-mile field QA for MCP-ready
  drafts: hard caps, placeholders, compact fallbacks, formats, and patch mapping.
- `skills/lunatalk-render-review` reviews HTML/XMLV3/Theme V3 render output.
- `skills/lunatalk-chat-simulation` runs and evaluates private chat simulation.
- `skills/lunatalk-publish-readiness` checks whether a private card is ready to submit.
- `skills/lunatalk-benchmark-runner` runs public-safe synthetic regression checks
  and returns benchmark report packets or end-to-end acceptance packets for the
  next prompt or skill repair.
- `references/character-core-design.md` defines desire, contradiction, boundary,
  player leverage, relationship asymmetry, pressure behavior, and appeal repair.
- `references/relationship-engine.md` defines relationship promise, asymmetry,
  closeness/friction state, pacing gates, repair/rupture routes, passive-player
  behavior, and field allocation for relationship-heavy cards.
- `references/world-engine-design.md` defines playable world rules, relationship
  networks, location functions, compact state, route seeds, and lore compression.
- `references/tension-triangle.md` defines role desire, player leverage, external
  pressure, why-now checks, and tension packets for inert premise repair.
- `references/state-economy-design.md` defines visible/hidden/detail-only state
  decisions, update rules, decorative meter removal, agency-safe state, and State
  economy packets.
- `references/role-detail-engine.md` defines language-aware detail budgets,
  durable detail modules, field placement, thin biography repair, and Detail
  engine packets.
- `references/benchmark-pattern-calibration.md` defines how to consume an
  already-anonymized benchmark pattern packet for detail density, ordinary-card
  contrast, first-turn proof, longplay spine, and XMLV3 presentation repair. It
  intentionally does not define source selection, platform score access, or
  source collection workflows.
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
- `references/generator-design.md` defines artifact contracts, intake defaults,
  output schemas, revision operations, diegetic creator modes, and probes for
  generator/helper/creator-assistant cards.
- `references/scenario-design.md` defines branchable incidents, story spines,
  clue/reveal ladders, false lead handling, suspect pressure networks, compact
  consequence state, and probes for story-first cards.
- `references/daily-life-design.md` defines quiet routine loops, micro-tension,
  shared objects, habit state, second-turn changes, romance posture, and probes
  for daily-life cards.
- `references/card-authoring-templates.md` provides reusable draft packets,
  final role-field authoring packets, field templates, XMLV3 welcome scaffolds,
  boundary-sensitive prompts, and self-review packets.
- `references/field-finalization.md` defines MCP-ready last-mile field gates:
  placeholders, hard caps, compact fallbacks, format checks, and patch mapping.
- `references/creation-workflow.md` defines the end-to-end creation runway,
  stage ladder, Creation runway packet, MCP gates, asset gates, cost gates, and
  completion checks for external AI clients.
- `references/end-to-end-acceptance.md` defines trial-card acceptance evidence:
  skill route, MCP private card, avatar/background patching, validation, render,
  app visual checks, simulation cost gate, per-message preview checks, and
  root-cause reruns.
- `references/mcp-client-workflow.md` defines external AI client readiness,
  tool availability checks, auth handling, idempotency, and stage gates for MCP
  operations.
- `references/material-distillation.md` defines source-to-play mapping,
  large-world compression, source hygiene, conflict handling, and token budget
  rules for material-heavy cards.
- `references/boundary-design.md` defines rating intent, explicitness ceilings,
  player agency contracts, escalation ladders, refusal behavior, safer fallbacks,
  first-scene guardrails, and probes for boundary-sensitive cards.
- `references/premise-workshop.md` defines early taste-to-direction workshops,
  contrast axes, involvement ladders, pressure tests, and pre-blueprint handoff
  packets.
- `references/profile-packaging.md` defines role profile packaging, promise
  compression, scannable `roleDesc` patterns, tag sets, and first-impression checks.
- `references/visual-identity.md` defines avatar, cover, thumbnail, image prompt,
  visual proof, public-safe art direction, `role_patch_assets` handoff, and
  visual identity packets.
- `references/language-style.md` defines language-style packets, Traditional
  Chinese consistency, register alignment, pronoun/address matrices, and
  field-level localization passes.
- `references/opening-design.md` defines five-beat opening design, opening
  packets, first reply paths, second-turn moves, XMLV3 scaffolds, and opening
  failure repairs.
- `references/longplay-design.md` defines continuity spines, progression phases,
  state economy, route seeds, memory threads, role initiative, and continuation
  probes.
- `references/playtest-loop.md` defines simulation probe design, transcript
  triage, patch mapping, and author co-review for closed-loop card testing.
- `references/author-collaboration.md` defines conversation-only author
  feedback, taste-to-behavior translation, decision frames, and collaboration
  packets for co-review.
- `references/iteration-loop.md` defines evidence stacks, decision ladders, patch
  budgets, 10,000-character detail hard-cap vs target guidance, stop criteria,
  and iteration packets for closed-loop card improvement.
- `references/sample-driven-calibration.md` defines how to use public synthetic
  samples as output-shape fixtures without copying sample text or implying
  non-public origin claims.
- `references/originality-adaptation.md` defines transferable fantasy,
  original substitutions, copy-distance checks, and originality adaptation
  packets for recognizable inspirations.
- `references/voice-calibration.md` defines executable voice cards,
  micro-samples, ensemble contrast checks, and blind-line tests for consistent
  character voice.
- `references/talk-example-design.md` defines `talkExample` decisions, sample
  jobs, token payment, player-agency checks, and compact example packets.
- `references/agency-design.md` defines player insertion space, reply-path
  matrices, agency guardrails, consequence checks, and interaction hooks.
- `references/token-economy.md` defines token budget diagnostics, field
  allocation, compression ladders, and keep / move / cut / rewrite plans.
- `references/presentation-design.md` defines pre-render presentation decisions
  for XMLV3, Theme V3, HTML, visible state, hidden state, and first-screen visual
  hierarchy.
- `references/instruction-guardrails.md` defines when a narrow instruction layer
  is justified, how to avoid jailbreak misuse, and how to hand off optional
  `role_patch_jailbreak` patches.
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
- `examples/sample-card-packets.md` provides fictional sample output packets for
  relationship, daily-life, story/scenario, RPG/play-engine, and generator/helper
  card shapes.
- `examples/complete-synthetic-card-fixture.md` provides one public-safe complete
  synthetic card fixture with final fields, compact fallback, playtest probes,
  field finalization, and acceptance handoff shape.
- `examples/simulation-evidence.fixture.json` provides a public-safe closed-loop
  simulation evidence packet shape for seven probes and per-message preview
  evidence.
- `examples/end-to-end-acceptance.fixture.json` provides a public-safe
  end-to-end acceptance evidence packet shape covering skill route, assets,
  validation, render, app visual checks, simulation, and per-message previews.
- `examples/benchmark-pattern.fixture.json` provides a public-safe anonymized
  benchmark pattern packet shape for carrying aggregate signals, deep-reading
  craft patterns, ordinary-card contrast, source-safety flags, and one repair
  target without source-selection details.
- `examples/iteration-summary.fixture.json` provides a public-safe iteration
  summary shape for recording the test-card type, MCP visual result, chat
  playtest result, validated benchmark pattern gap, repair target, rerun result,
  and next TODO without full field text, transcripts, IDs, queries, or source
  selection details.
- `.mcp.json` contains an example remote MCP client configuration.

## Skill references

Shared references live in the repository-level `references/` directory so every
skill can reuse the same public guidance without duplicating it. Inside a skill,
link to these files relative to the skill directory, for example
`../../references/voice-calibration.md`. When an agent runs from the repository
root, the same file is available as `references/voice-calibration.md`.

References are not loaded automatically by the plugin manifest. The active skill
should name the specific references it needs, and the agent should load only
those files for the current workflow.

## Local validation

Run `npm test` for validator unit tests and `npm run validate` before publishing
changes. The validator checks plugin JSON, skill frontmatter, eval coverage,
reference links, skill size, basic release-safety patterns, and the complete
synthetic fixture's field structure, XMLV3 state, probe coverage, and acceptance
handoff shape. Use `npm run validate:fixture` when only the complete fixture or
its expected structure changes. Use `npm run validate:simulation` after recording
MCP simulation evidence to check required probes, per-message preview coverage,
repair-packet requirements, and public-safe evidence shape. Use
`npm run validate:acceptance` after a full trial-card run to check that assets,
validation, render, app visual proof, accepted simulation, and per-message
preview evidence support the claimed completion status. Use
`npm run validate:benchmark-pattern` before committing any benchmark-derived
method update; it accepts only anonymized pattern packets and rejects raw source,
exact markup, identifiers, query text, source-selection workflow, and protected
source claims. Use `npm run validate:iteration-summary` before committing a
closed-loop Moonloom improvement; it verifies that the saved iteration summary
has field review, MCP visual validation, chat playtest, per-message preview,
validated benchmark pattern evidence, one repair target, rerun result, and a
public-safe next TODO.

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
