---
name: lunatalk-iteration-director
description: Use when a Moonloom role-card workflow has self-review, validation, tokenBudget, render, simulation, benchmark, benchmark_pattern, or author-feedback evidence and needs a closed-loop next-iteration decision, patch hypothesis, rerender/simulation stance, stop/continue criteria, or handoff before more rewriting, MCP calls, or publishing.
---

# LunaTalk Iteration Director

Use this skill to manage the card improvement loop after evidence exists. The
output is an iteration packet: what to do next, why that move is justified, what
to preserve, how to verify it, and when to stop.

This skill is not a new card writer, scorecard, render reviewer, or simulation
runner. It prevents endless rewriting by choosing one evidence-backed repair at a
time.

## Required references

Read `../../references/iteration-loop.md` first. Read
`../../references/quality-rubric.md` for self-review criteria,
`../../references/card-writer-mcp.md` for validate/render/simulation tool
contracts, and `../../references/author-collaboration.md` when author feedback
or taste tradeoffs should drive the next decision.

Read `../../references/card-diagnosis.md` when multiple symptoms interact and
the weakest layer is unclear. Read `../../references/playtest-loop.md` when the
evidence includes simulation probes or transcript findings. Read
`../../references/token-economy.md` when tokenBudget, welcome/detail balance,
field allocation, duplicated lore, or overfilling risk is part of the decision.
Read `../../references/presentation-design.md` and
`../../references/theme-v3-rendering.md` when render evidence points to XMLV3,
HTML, Theme V3, visible state, or first-screen hierarchy.

Then load only the narrow reference for the selected repair: profile, premise,
tension, archetype, character core, relationship, daily-life, world, scenario,
play engine, generator, ensemble, state, agency, opening, longplay, voice,
language, boundary, token, render, simulation, authoring, or publish readiness.

## Boundary

Do not call MCP tools from this skill. Do not patch real role fields. Do not run
simulation. Do not submit publishing.

This skill chooses the next move. The chosen repair is executed by a narrow
Moonloom skill, `lunatalk-card-author`, `lunatalk-render-review`,
`lunatalk-chat-simulation`, or `lunatalk-publish-readiness`.

Use `lunatalk-quality-auditor` instead when the author asks only for a
scorecard. Use `lunatalk-card-doctor` when there are several concrete symptoms
but no loop decision yet. Use `lunatalk-render-review` when the only evidence is
a render issue. Use `lunatalk-chat-simulation` when the author is specifically
designing or running probes.

## Workflow

1. Gather the evidence stack: Moonloom self-review, validation, tokenBudget,
   render report or screenshot, simulation probes/transcript, author feedback,
   benchmark report, anonymized `benchmark_pattern` packet with source safety
   status, and previous patches.
2. Mark missing evidence explicitly. Do not invent validation, render,
   simulation, or author feedback.
3. Separate hard blockers from craft issues, taste tradeoffs, and cost decisions.
4. Choose the loop stage: pre-MCP draft, post-validation, post-render,
   post-simulation, author co-review, regression repair, publish-readiness, or
   stop.
5. Apply the decision ladder from `iteration-loop.md`.
6. Choose exactly one primary next repair. If a technical blocker exists, it can
   be paired with one mechanical follow-up; otherwise keep the repair narrow.
7. Name rejected next moves so the agent does not prematurely rerender,
   simulate, publish, or rewrite everything.
8. State token stance. Do not recommend filling a field to its maximum length
   unless the added content changes behavior, routes, state, voice, boundaries,
   or memory.
9. State cost stance for simulation: already accepted, ask first, skip, or not
   worth another paid pass.
10. State stop / continue criteria and hand off to the next skill.
11. When the loop changed Moonloom guidance, templates, prompts, examples, or
    XMLV3 method, prepare a public-safe iteration summary and validate it with
    `npm run validate:iteration-summary` before treating the loop as reusable
    evidence.

## Output format

Return:

```text
Iteration packet:
- roleId or draft:
- loop stage:
- evidence stack:
  - self_review:
  - validation:
  - render:
  - simulation:
  - author_feedback:
  - benchmark:
  - benchmark_pattern:
- decision:
- hard blockers:
- strongest evidence:
- weakest Moonloom dimension:
- rejected next moves:
- next single repair:
  - hypothesis:
  - patch target:
  - preserve:
  - change:
  - expected verification:
- token stance:
- cost stance:
- stop / continue criteria:
- next skill:
- handoff:

Self-review:
- evidence was not invented:
- next move is one repair:
- player agency / boundary risk checked:
- token stance avoids max-length padding:
- MCP gates are not used for writing quality:
- author taste tradeoffs are separated:
- benchmark_pattern source safety preserved:
- iteration summary needed / validate:iteration-summary:
- next skill:
```

## Quality rules

- The best next move is the smallest patch that can change the next verification
  result.
- A pass from `validate_role` or `render_preview` does not prove the card is fun;
  a failed craft review does not justify a server gate.
- Do not rerun paid simulation without a concrete hypothesis and accepted cost.
- Do not keep adding lore after the engine is already coherent. Add only durable
  behavior, route cost, state update, voice control, boundary handling, or memory.
- Do not overwrite working packets. Preserve what passed and patch the weakest
  layer.
- Preserve `benchmark_pattern` only as generalized craft evidence. Do not expose
  source origins, sample identifiers, copied examples, traffic, or private
  selection mechanics in the iteration packet.
- Public iteration summaries must contain only summaries and status evidence:
  card shape, field review, MCP visual result, chat playtest, validated benchmark
  pattern gap, one repair target, rerun result, and next TODO. Do not store raw
  role fields, raw transcripts, role/chat identifiers, query text, URLs, source
  selection details, or exact XML/HTML.
- If two loops fail on the same symptom, stop and ask for a design decision
  through the agent conversation.
- Keep output public-safe and original.

## Handoff

Hand off to:

- `lunatalk-card-doctor` when the weakest layer is still unclear.
- `lunatalk-quality-auditor` when evidence is insufficient and the next step is a
  craft scorecard.
- `lunatalk-collaboration-director` when the remaining decision is author taste,
  not a craft blocker.
- `lunatalk-token-architect` when the next repair is field allocation, welcome
  bloat, or overfilling risk.
- `lunatalk-render-review` when the next move is a focused rerender or visual
  repair.
- `lunatalk-chat-simulation` when the next move is a cost-accepted behavior
  probe.
- `lunatalk-card-author` when a decided patch should be applied to a private
  role.
- `lunatalk-publish-readiness` only when the loop's stop criteria are satisfied
  and the author explicitly wants public submission.
