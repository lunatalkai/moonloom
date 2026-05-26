---
name: lunatalk-benchmark-runner
description: Run public-safe Moonloom benchmark checks for LunaTalk card authoring quality. Use this skill when evaluating whether Moonloom can guide MCP-backed creation of strong cards across companion, daily-life, story, game/RPG, and generator archetypes, or when running regression checks after changing prompts, skills, render review, or simulation behavior.
---

# LunaTalk Benchmark Runner

Use this skill to run a public-safe regression loop against synthetic role-card
briefs. The benchmark checks whether the authoring workflow can produce playable,
renderable, simulatable cards across major archetypes and pressure shapes.

## Required references

Read `../../examples/synthetic-card-briefs.md` first. Read
`../../references/card-writer-mcp.md` for tool contracts and
`../../references/quality-rubric.md` for pass/fail criteria. Read
`../../references/premise-workshop.md` when benchmarking early mood/trope/
aesthetic brainstorming, "popular/top-tier" requests without a settled premise,
or whether workflows route to `lunatalk-premise-workshop` before blueprinting.
Read
`../../references/quality-scorecard.md` when benchmarking craft scorecards,
quality audit routing, top-tier checks, first-three repairs, or whether drafts
should continue to authoring, render, simulation, or publish readiness. Read
`../../references/profile-packaging.md` when benchmarking `roleName`,
`roleDesc`, tags, public-facing profile, first impression, discovery surface, or
promise compression for a coherent card engine. Read
`../../references/language-style.md` when benchmarking language consistency,
zh-Hant / zh-TW cleanup, Simplified/Traditional mixing, translated-sounding
prose, pronoun/address drift, mixed-language tags, or register mismatch across
fields. Read
`../../references/card-series-design.md` when benchmarking related card sets,
alternate versions, seasonal/event variants, daily-life variants,
generator/helper variants, keep/merge/reject decisions, or variant authoring
order. Read
`../../references/ensemble-card-design.md` when benchmarking multi-character
cards, cast size, turn ownership, spotlight, group tension, roll-call openings,
or cast-over-player failures. Read
`../../references/archetype-contracts.md` when benchmarking card-type routing,
hybrid cards, archetype contracts, or field allocation by card shape. Read
`../../references/card-diagnosis.md` when benchmarking existing-card repair,
mixed symptoms, validation/render pass but behavior failure, simulation triage,
or repair-order routing. Read
`../../references/character-core-design.md` when benchmarking generic persona,
trope repair, ensemble identity, or character appeal. Read
`../../references/relationship-engine.md` when benchmarking companion, romance,
friendship, rivalry, cohabitation, daily-life, slow-burn pacing, generic
flirting, comfort loops, repair/rupture routes, or relationship state. Read
`../../references/daily-life-design.md` when benchmarking daily-life,
slice-of-life, quiet companion, neighbor, roommate, cohabitation, cafe,
workplace, school, ordinary routine, low-stakes progression, shared object,
habit state, tiny disruption, passive-player behavior, second-turn change, or
return-next-time hooks. Read
`../../references/world-engine-design.md` when benchmarking worldbuilding,
relationship networks, factions, locations, lore-heavy settings, or lore-dump
repair. Read `../../references/scenario-design.md` when benchmarking story,
scenario, mystery, case-file, event, trial, rescue, betrayal, clue/reveal
pacing, false leads, suspect pressure, branch consequences, or route-funnel
repair. Read `../../references/play-engine-design.md` when benchmarking RPG,
adventure, open-world, survival, investigation, simulator, stats, resources,
inventory, quests, combat, turn protocol, compact state updates, or
failure-forward behavior. Read
`../../references/generator-design.md` when benchmarking generator/helper/
creator-assistant cards, artifact contracts, intake defaults, output schema,
revision commands, advice-only drift, endless intake, or artifact continuity.
Read
`../../references/material-distillation.md` when benchmarking material-heavy,
imported, or large-world workflows. Read `../../references/voice-calibration.md`
when the benchmark touches dialogue, persona consistency, or ensemble cards. Read
`../../references/opening-design.md` when benchmarking welcome repair, first
screen playability, or second-turn behavior. Read
`../../references/longplay-design.md` when benchmarking long-term playability,
route seeds, memory/state, progression, passive/stalled behavior, or session
continuation. Read `../../references/agency-design.md` when benchmarking player
agency, spectator openings, decorative choices, role-controlled player actions,
or route funneling. Read `../../references/token-economy.md` when benchmarking
tokenBudget, overlong welcomes, duplicated lore, field allocation, visual bloat,
or keep/move/cut/rewrite repairs. Read
`../../references/boundary-design.md` when benchmarking mature, adult, horror,
jealous, consent-sensitive, or boundary-sensitive cards. Read
`../../references/playtest-loop.md` for probe design and transcript-to-patch
triage. Read `../../references/safety-and-cost.md` before simulation.

## Workflow

1. Pick one or more synthetic briefs.
2. Create a private card with the matching shape: companion, story, game,
   generator, daily-life, heavy-setting, ensemble, or boundary-sensitive romance.
   For story/mystery/event briefs, confirm a scenario packet exists before
   authoring. For daily-life/slice-of-life briefs, confirm a daily-life packet
   exists before authoring. For generator/helper briefs, confirm a generator
   packet exists before authoring.
3. Run Moonloom self-review against `quality-rubric.md` before tool validation.
4. Run `validate_role` and patch technical blockers only.
5. Run `render_preview`; inspect `evaluation`, `structuredReport`, and
   `previewUrl` when browser or multimodal access is available.
6. Run `simulate_private_chat` with the listed probes or a playtest plan from
   `playtest-loop.md` only when normal billing is acceptable.
7. Record pass/fail by archetype and list the weakest dimension.

## Negative checks

Regression should include at least one synthetic fail case. Confirm through
Moonloom self-review, render review, or simulation that:

- `roleDesc` is too long to scan quickly.
- a request has no settled role, player position, first scene, or primary
  contract and only asks to open up a mood/trope/aesthetic cluster, but the
  workflow jumps straight to field drafting, broad blueprinting, MCP tools, or
  a single overloaded premise instead of producing a premise workshop packet.
- a draft asks for a top-tier quality audit or scorecard, but the workflow jumps
  to publish readiness, simulation, or broad rewriting instead of producing a
  quality audit packet with blockers, scorecard, tier, and first three repairs.
- a coherent card has a generic `roleName`, overlong or vague `roleDesc`,
  broad mood-only tags, or weak first impression, but the workflow jumps to
  broad diagnosis, field assembly, render, simulation, or publish readiness
  instead of producing a profile package packet.
- a role-card series request asks which variants to keep, merge, reject, author,
  render, or simulate first, but the workflow jumps straight to one overloaded
  hybrid card or several duplicate cards instead of producing a card-series
  packet.
- an existing card passes validation and render review but has several writing
  failures, and the workflow jumps straight to rewriting or another simulation
  instead of producing a card diagnosis packet and repair order.
- a story/mystery request asks for clue/reveal pacing, route branches, false
  leads, and consequence state, but the workflow jumps to broad blueprinting,
  opening-only repair, longplay-only repair, or RPG mechanics instead of
  producing a scenario packet.
- a `zh-Hant` card mixes Simplified Chinese into profile, detail, welcome, or
  examples, or has no language-style packet when script, register, pronouns,
  address terms, tags, or field-to-field wording are the weak layer.
- the opening has choices but no concrete location, sensory beat, role action, or
  pressure.
- the detail defines consequences but lacks proactive turn rules for passive or
  stalled player input.
- a persona-driven card has scene structure but lacks a clear want/need,
  contradiction, or boundary.
- a schema-valid persona is still trope-only and has no character-core packet,
  player leverage, relationship asymmetry, pressure behavior, or interaction
  hooks.
- a relationship-heavy card has a good profile and opening but collapses into
  generic flirting, comfort, instant intimacy, harmless banter, or refusal-ending
  play with no relationship-engine packet, pacing gates, repair/rupture routes,
  or reply-path state changes.
- the speaking style is only generic tone labels such as natural, gentle, or like
  a real person.
- the card repeats a catchphrase as the whole voice instead of defining rhythm,
  vocabulary, emotional tells, refusal style, and pressure behavior.
- the opening is generic despite having a question.
- a schema-valid welcome is only a greeting or hollow question and has no opening
  packet, expected first user message, or second-turn move.
- a card has a strong opening but no continuity spine, route costs, memory
  threads, role initiative, or continuation probes.
- the card controls the player's actions, feelings, consent, or commitments.
- the player can only watch, choices are mood labels, or every reply path funnels
  into the same response with no state, information, relationship, risk, route,
  or next-hook difference.
- an archetype is missing its contract, such as game rules/resources or generator
  artifact contract, intake defaults, stable output schema, artifact memory, and
  revision loop.
- a generator/helper card asks indefinitely, gives advice only, changes output
  shape across turns, forgets the previous artifact, or cannot produce one
  usable artifact from minimal input with sensible defaults.
- an RPG/adventure/sandbox card has stats, resources, inventory, quests, or
  combat but no play-engine packet, compact state update rule, turn protocol,
  resource consequences, failure-forward behavior, opening contract, or
  play-engine probes.
- a game-like opening reads like a rule manual and never proves one runnable turn
  with state, cost/risk, player action, consequence, and renewed choice.
- a hybrid card treats all archetypes as equal instead of choosing one primary
  playable contract and secondary overlays.
- a proposed card set keeps mood-only, costume-only, or seasonal variants that
  have the same player role, same first-screen proof, same second-turn move, and
  same longplay loop.
- a companion plus heavy-setting or generator card lets lore or assistant mode
  replace the relationship engine.
- a quiet daily-life card has mood but no daily-life packet, small playable
  desire, tiny disruption, shared object/place, habit state, passive-player
  behavior, second-turn change, or return-next-time progression.
- a lore-rich card has many proper nouns but no immediate action surface.
- a world-heavy card has factions, locations, calendars, systems, or history but
  no world-engine packet, player position, compact state, route costs, or
  exposition policy.
- a material-heavy card copies or summarizes source material without converting it
  into player role, first scene, state, consequence, and route seeds.
- a card puts durable rules, repeated lore, duplicated monologues, or visual
  panels into `roleWelcome` while `roleDetailDesc` is too thin to sustain play.
- an ensemble card introduces cast members without distinct motives, voice, or
  turn ownership.
- an ensemble card gives one strong sample but lets the other core speakers share
  the same rhythm, motive, or pressure behavior.
- an ensemble card has no cast keep/merge/cut decision, spotlight rules, group
  tension state, or agency probes, so the cast crowds out the player.
- a mature or intense card creates pressure without explicit pacing, refusal
  style, player agency boundary, explicitness ceiling, escalation ladder, stop
  conditions, or safer fallback.

When a negative check fails, treat it as a skill or prompt regression. Do not
turn the failed writing check into an MCP hard gate unless it is actually
a technical safety, format, ownership, billing, or publish-control issue.
Use `lunatalk-voice-director` for regressions where the weakest layer is generic
dialogue, repeated phrasing, catchphrase overuse, refusal voice, blind-line
failure, or ensemble voice blur.
Use `lunatalk-relationship-architect` for regressions where the weakest layer is
relationship dynamics, slow-burn pacing, generic flirting, flat comfort, instant
intimacy, weak trust/friction state, repair/rupture routes, or relationship
field allocation.
Use `lunatalk-daily-life-architect` for regressions where the weakest layer is a
quiet routine, small playable desire, tiny disruption, shared object/place, habit
state, passive-player behavior, non-forced romance posture, second-turn change,
or return-next-time hooks.
Use `lunatalk-agency-designer` for regressions where the weakest layer is player
insertion space, decorative choices, route funneling, role-controlled player
feelings/actions, missing refusal routes, or consequences that ignore player
choice.
Use `lunatalk-token-architect` for regressions where the weakest layer is field
allocation, `tokenBudget`, high `welcomeToDetailRatio`, duplicated lore,
overlong welcome, visual bloat, or compression that risks deleting the engine.
Use `lunatalk-card-doctor` for regressions where the weakest layer is not yet
known because an existing card has mixed symptoms, vague author feedback,
simulation findings, validation/render pass but weak behavior, or unclear repair
order.
Use `lunatalk-quality-auditor` for regressions where the user needs a scorecard,
craft tier, top-tier check, good-enough review, or first-three repair list before
authoring, render review, simulation, or publish readiness.
Use `lunatalk-profile-packager` for regressions where the coherent card engine
exists but the weakest layer is `roleName`, `roleDesc`, tags, public-facing
profile, first impression, discovery surface, or promise compression.
Use `lunatalk-language-stylist` for regressions where the coherent card engine,
opening, and voice exist but the weakest layer is language consistency, zh-Hant /
zh-TW style, Simplified/Traditional mixing, translated-sounding prose, pronouns,
address terms, mixed-language tags, or field-to-field register mismatch.
Use `lunatalk-archetype-director` for regressions where the weakest layer is
card-type selection, hybrid contract, rejected archetypes, or field allocation by
primary card shape.
Use `lunatalk-series-architect` for regressions where the user needs a related
card set, alternate versions, keep/merge/reject decisions, variant contracts,
shared core discipline, or authoring/render/simulation order before blueprinting
or authoring individual cards.
Use `lunatalk-ensemble-director` for regressions where the weakest layer is cast
scope, keep/merge/cut decisions, turn ownership, spotlight, group tension,
roll-call openings, or cast-over-player behavior.
Use `lunatalk-play-engineer` for regressions where the weakest layer is
RPG/adventure mechanics, compact state, resource rules, inventory, quests,
combat, turn protocol, failure-forward behavior, or a rule-manual opening.
Use `lunatalk-generator-architect` for regressions where the weakest layer is a
generator/helper/creator-assistant artifact loop, intake defaults, output schema,
named revision operations, artifact continuity, advice-only drift, or endless
intake.

## Pass criteria

- Moonloom self-review finds no unresolved publish-grade writing issue.
- `validate_role.status` is `pass` with no technical blockers.
- `render_preview.evaluation.status` is `pass`, or any remaining visual risk is
  explicitly accepted.
- `simulate_private_chat.evaluation.status` is `pass`, or simulation was skipped
  with an explicit cost-aware reason.
- `tokenBudget` is reasonable for the archetype.
- The card does not copy benchmark text verbatim; it is a fresh original card.
- The benchmark identifies whether failures belong to Moonloom writing guidance,
  render/theme guidance, simulation behavior, or MCP technical flow.

## Reporting

Return:

- briefs tested
- role IDs created or edited
- validation/render/simulation status
- weakest Moonloom self-review dimensions
- patch loop count
- cost summary when simulation ran
- whether Moonloom guidance or the MCP technical flow needs another iteration
