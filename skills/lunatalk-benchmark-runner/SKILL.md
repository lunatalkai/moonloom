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
`../../references/material-distillation.md` when benchmarking material-heavy,
imported, or large-world workflows. Read `../../references/voice-calibration.md`
when the benchmark touches dialogue, persona consistency, or ensemble cards. Read
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
- the speaking style is only generic tone labels such as natural, gentle, or like
  a real person.
- the opening is generic despite having a question.
- the card controls the player's actions, feelings, consent, or commitments.
- an archetype is missing its contract, such as game rules/resources or generator
  intake/output/revision loop.
- a quiet daily-life card has mood but no small playable desire or progression.
- a lore-rich card has many proper nouns but no immediate action surface.
- a material-heavy card copies or summarizes source material without converting it
  into player role, first scene, state, consequence, and route seeds.
- an ensemble card introduces cast members without distinct motives, voice, or
  turn ownership.
- an ensemble card gives one strong sample but lets the other core speakers share
  the same rhythm, motive, or pressure behavior.
- a mature or intense card creates pressure without explicit pacing, refusal
  style, or player agency boundary.

When a negative check fails, treat it as a skill or prompt regression. Do not
turn the failed writing check into an MCP hard gate unless it is actually
a technical safety, format, ownership, billing, or publish-control issue.

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
