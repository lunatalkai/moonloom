---
name: lunatalk-benchmark-runner
description: Run public-safe Moonloom benchmark checks for LunaTalk card authoring quality. Use this skill when evaluating whether Moonloom or the Card Writer MCP can create strong cards across companion, story, game/RPG, and generator archetypes, or when running regression checks after changing prompts, skills, validation, render review, or simulation behavior.
---

# LunaTalk Benchmark Runner

Use this skill to run a public-safe regression loop against synthetic role-card
briefs. The benchmark checks whether the authoring workflow can produce playable,
renderable, simulatable cards across major archetypes.

## Required references

Read `../../examples/synthetic-card-briefs.md` first. Read
`../../references/card-writer-mcp.md` for tool contracts and
`../../references/quality-rubric.md` for pass/fail criteria. Read
`../../references/safety-and-cost.md` before simulation.

## Workflow

1. Pick one or more synthetic briefs.
2. Create a private card with the matching `cardType`:
   companion, story, game, or generator.
3. Run `validate_role`.
4. Patch until validation has no blockers and no quality warnings, unless the
   author explicitly accepts a tradeoff.
5. Run `render_preview`; inspect `evaluation`, `structuredReport`, and
   `previewUrl` when browser or multimodal access is available.
6. Run `simulate_private_chat` with the listed probes only when normal billing is
   acceptable.
7. Record pass/fail by archetype and list the weakest dimension.

## Negative checks

Regression should include at least one synthetic fail case. Confirm that
`validate_role` warns when:

- `roleDesc` is too long to scan quickly.
- a `zh-Hant` card mixes Simplified Chinese into profile, detail, welcome, or
  examples.
- the opening has choices but no concrete location, sensory beat, role action, or
  pressure.
- the opening is generic despite having a question.
- the card controls the player's actions, feelings, consent, or commitments.
- an archetype is missing its contract, such as game rules/resources or generator
  intake/output/revision loop.

## Pass criteria

- `validate_role.status` is `pass`.
- `render_preview.evaluation.status` is `pass`, or any remaining visual risk is
  explicitly accepted.
- `simulate_private_chat.evaluation.status` is `pass`, or simulation was skipped
  with an explicit cost-aware reason.
- `tokenBudget` is reasonable for the archetype.
- The card does not copy benchmark text verbatim; it is a fresh original card.

## Reporting

Return:

- briefs tested
- role IDs created or edited
- validation/render/simulation status
- weakest quality dimensions
- patch loop count
- cost summary when simulation ran
- whether Moonloom guidance or MCP validation needs another iteration
