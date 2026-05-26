---
name: lunatalk-benchmark-runner
description: Run public-safe Moonloom benchmark checks for LunaTalk card authoring quality. Use this skill when evaluating whether Moonloom can guide MCP-backed creation of strong cards across companion, story, game/RPG, and generator archetypes, or when running regression checks after changing prompts, skills, render review, or simulation behavior.
---

# LunaTalk Benchmark Runner

Use this skill to run a public-safe regression loop against synthetic role-card
briefs. The benchmark checks whether the authoring workflow can produce playable,
renderable, simulatable cards across major archetypes and pressure shapes.

## Required references

Read `../../examples/synthetic-card-briefs.md` first. Read
`../../references/card-writer-mcp.md` for tool contracts and
`../../references/quality-rubric.md` for pass/fail criteria. Read
`../../references/archetype-contracts.md` when benchmarking card-type routing,
hybrid cards, archetype contracts, or field allocation by card shape. Read
`../../references/character-core-design.md` when benchmarking generic persona,
trope repair, ensemble identity, or character appeal. Read
`../../references/world-engine-design.md` when benchmarking worldbuilding,
relationship networks, factions, locations, lore-heavy settings, or lore-dump
repair. Read
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
- a `zh-Hant` card mixes Simplified Chinese into profile, detail, welcome, or
  examples.
- the opening has choices but no concrete location, sensory beat, role action, or
  pressure.
- the detail defines consequences but lacks proactive turn rules for passive or
  stalled player input.
- a persona-driven card has scene structure but lacks a clear want/need,
  contradiction, or boundary.
- a schema-valid persona is still trope-only and has no character-core packet,
  player leverage, relationship asymmetry, pressure behavior, or interaction
  hooks.
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
  intake/output/revision loop.
- a hybrid card treats all archetypes as equal instead of choosing one primary
  playable contract and secondary overlays.
- a companion plus heavy-setting or generator card lets lore or assistant mode
  replace the relationship engine.
- a quiet daily-life card has mood but no small playable desire or progression.
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
- a mature or intense card creates pressure without explicit pacing, refusal
  style, player agency boundary, explicitness ceiling, escalation ladder, stop
  conditions, or safer fallback.

When a negative check fails, treat it as a skill or prompt regression. Do not
turn the failed writing check into an MCP hard gate unless it is actually
a technical safety, format, ownership, billing, or publish-control issue.
Use `lunatalk-voice-director` for regressions where the weakest layer is generic
dialogue, repeated phrasing, catchphrase overuse, refusal voice, blind-line
failure, or ensemble voice blur.
Use `lunatalk-agency-designer` for regressions where the weakest layer is player
insertion space, decorative choices, route funneling, role-controlled player
feelings/actions, missing refusal routes, or consequences that ignore player
choice.
Use `lunatalk-token-architect` for regressions where the weakest layer is field
allocation, `tokenBudget`, high `welcomeToDetailRatio`, duplicated lore,
overlong welcome, visual bloat, or compression that risks deleting the engine.
Use `lunatalk-archetype-director` for regressions where the weakest layer is
card-type selection, hybrid contract, rejected archetypes, or field allocation by
primary card shape.

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
