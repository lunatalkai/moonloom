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
Read `../../references/character-core-design.md` when simulation shows a generic
persona, weak motive, missing leverage, passive pressure response, or behavior
that collapses to a trope.
Read `../../references/world-engine-design.md` when simulation shows lore
dumping, decorative factions/locations, passive world response, broken state, or
route choices that do not change the world.
Read `../../references/voice-calibration.md` when simulation shows generic
dialogue, voice drift, or ensemble speakers blending together.
Read `../../references/opening-design.md` when testing the opening hook, first
user reply path, second-turn move, or onboarding clarity.
Read `../../references/longplay-design.md` when testing long-term playability,
route seeds, memory/state, progression, passive/stalled behavior, or session
continuation.
Read `../../references/boundary-design.md` when simulation touches mature,
adult, horror-leaning, consent-sensitive, refusal, pacing, jealousy, power
imbalance, or safer-version behavior.
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
   - target risk: opening hook, agency, continuity, longplay, boundary,
     token/progression, archetype behavior, or onboarding clarity
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
- The role's desire, contradiction, boundary, and player leverage remain visible
  under trust, resistance, passive input, and boundary-setting.
- The reply advances the scene and gives the player something to do.
- The first simulated response matches the opening packet's intended first reply
  path and makes the second-turn move visible through reaction, complication,
  reveal, state change, or renewed pressure.
- Tone, boundaries, and content rating match the card.
- The reply uses relevant world details without dumping the whole setting.
- World-heavy replies should use the world engine: answer lore questions through
  objects, demands, consequences, witnesses, contradictions, state changes, or
  route offers.
- Player actions produce visible consequence, state change, relationship movement,
  or a new hook.
- For longplay tests, use continuation probes from the longplay packet and check
  whether the role changes state, recalls a memory thread, shifts route pressure,
  or renews a hook without waiting for the player to write the whole plot.
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
- If ensemble speakers become interchangeable, patch voice cards, response-mode
  rules, or compact micro-samples before running another simulation.
- If a single-role persona becomes generic under pressure, patch the
  character-core packet before adding more sample dialogue.
- If a world-heavy card dumps lore or treats factions/locations as scenery, patch
  the world-engine packet before adding more setting text.
- For mature, intense, or boundary-sensitive cards, pressure must remain tied to
  player choice, pacing, refusal style, stop conditions, and the boundary
  packet's explicitness ceiling and escalation ladder.

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
