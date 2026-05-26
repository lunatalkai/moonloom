---
name: lunatalk-chat-simulation
description: Run and evaluate LunaTalk private chat simulations through simulate_private_chat. Use this skill whenever the user wants an AI client to test a card's behavior, dialogue quality, first-turn response, role consistency, or end-to-end LunaTalk chat behavior before publishing.
---

# LunaTalk Chat Simulation

Use this skill to test role behavior through LunaTalk's real private chat
pipeline. The goal is a closed loop: design realistic probes, run the simulation
when cost is accepted, read the transcript, patch the card from evidence, and
decide whether another pass is worth the cost.

## Required references

Read `../../references/card-writer-mcp.md` for `simulate_private_chat`.
Read `../../references/playtest-loop.md` for probe design, transcript triage,
patch mapping, and author co-review.
Read `../../references/quality-rubric.md` for behavior evaluation.
Read `../../references/role-card-writing-framework.md` to decide whether failures
come from missing anchors, weak play loop, or poor token economy.
Read `../../references/safety-and-cost.md` before running a simulation.

## Cost and consent

`simulate_private_chat` uses normal LunaTalk chat billing and deducts points or
credits. If the author has not already asked to run a simulation, explain that it
costs normal chat resources and ask for confirmation before calling the tool.
When the author asks only for a test plan, do not call the tool.

## Workflow

1. Confirm the role is private and owned by the authenticated account.
2. Confirm `validate_role` has no blockers. If it still has blockers, patch and
   validate before spending simulation cost.
3. Build a playtest plan before the tool call:
   - target risk: opening hook, agency, continuity, boundary, token/progression,
     archetype behavior, or onboarding clarity
   - probe count: 1 to 5 user messages
   - probe text: realistic player messages, not evaluator instructions
   - expected healthy behavior: what the role should do if the card works
   - patch triggers: what transcript evidence would require changes to
     `roleDetailDesc`, `roleWelcome`, profile fields, or jailbreak
   - cost stance: already accepted, needs confirmation, or skipped
4. Call `simulate_private_chat` only after cost is accepted.
5. Read every simulated turn and the returned `evaluation`. Evaluate behavior,
   not just whether the tool ran.
6. Map each failure to a Moonloom patch target using `playtest-loop.md`.
7. Patch profile, detail, welcome, or jailbreak only when the transcript shows a
   concrete role-card problem. Most behavior fixes should target
   `roleDetailDesc` or `roleWelcome`; do not change MCP validation logic.
8. Run `validate_role` after structural patches.
9. Re-run simulation when the patch changes core behavior, boundary handling,
   state, voice, or first-turn flow and the author accepts the cost.

## Playtest plan format

Before a simulation call, write this compact plan:

```text
Playtest plan:
- roleId:
- target risks:
- probes:
  1. ...
- expected healthy behavior:
- patch triggers:
- cost stance:
- tool call: run now | wait for confirmation | skipped
```

## Evaluation criteria

- The role stays in character.
- The reply advances the scene and gives the player something to do.
- Tone, boundaries, and content rating match the card.
- The reply uses relevant world details without dumping the whole setting.
- Player actions produce visible consequence, state change, relationship movement,
  or a new hook.
- The transcript has no obvious safety, formatting, or system-leak issue.
- The billing summary or charged score is included when available.
- Treat `evaluation.qualityDimensions` as the first triage map:
  `responsePresence`, `agency`, `progression`, and `safetyFormat`.
- If `evaluation.status` is `warning`, follow `nextRecommendedTools`. There is no
  separate `simulation_evaluate` tool.
- For top-card behavior, check whether the simulated second turn is stronger
  than the setup: it should react, complicate, reveal, offer a route, update
  state, or renew pressure without taking over the player's agency.
- For generator or assistant cards, the output should produce a usable artifact
  when the user gives enough input, not only ask vague questions.
- For RPG/system cards, state and resources should be compact enough to update
  every turn.
- For ensemble cards, the cast should not drown out the player; each active voice
  needs a motive and turn ownership.
- For mature, intense, or boundary-sensitive cards, pressure must remain tied to
  player choice, pacing, refusal style, and stop conditions.

## Author co-review

The author's feedback surface is the agent conversation. After a simulation,
show the probes, concise transcript findings, what passed, what failed, the
proposed card patch, and whether another paid pass is worth running. Ask for
confirmation before `publish_submit`, and before extra simulation passes when
cost is not already accepted.

## Reporting

Return:

- prompts used
- transcript summary
- behavior issues found
- suggested card patches with target field
- billing/cost summary when available
- whether another simulation pass is needed
