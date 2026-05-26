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
Read `../../references/card-diagnosis.md` when the transcript has multiple
symptoms and the weakest layer or repair order is unclear. Use
`lunatalk-card-doctor` before another simulation when validation/render passed
but behavior is still boring, generic, passive, or inconsistent.
Read `../../references/character-core-design.md` when simulation shows a generic
persona, weak motive, missing leverage, passive pressure response, or behavior
that collapses to a trope.
Read `../../references/world-engine-design.md` when simulation shows lore
dumping, decorative factions/locations, passive world response, broken state, or
route choices that do not change the world.
Read `../../references/play-engine-design.md` when simulation shows RPG,
adventure, open-world, survival, investigation, simulator, compact state,
resources, inventory, quests, combat, turn protocol, or failure-forward behavior
breaking down. Use `lunatalk-play-engineer` when the transcript points to
decorative stats, resources that do not change choices, forgotten state updates,
or failure that ends play or changes nothing.
Read `../../references/generator-design.md` when simulation shows a generator,
helper, creator-assistant, artifact-producing card, advice-only drift, endless
intake, unstable output schema, missing revision commands, or lost artifact
continuity. Use `lunatalk-generator-architect` when the transcript points to a
broken artifact loop.
Read `../../references/voice-calibration.md` when simulation shows generic
dialogue, voice drift, or ensemble speakers blending together. Use
`lunatalk-voice-director` when the transcript points to speaking style,
catchphrase overuse, refusal voice, or blind-line failures.
Read `../../references/opening-design.md` when testing the opening hook, first
user reply path, second-turn move, or onboarding clarity.
Read `../../references/longplay-design.md` when testing long-term playability,
route seeds, memory/state, progression, passive/stalled behavior, or session
continuation.
Read `../../references/agency-design.md` when the transcript shows the player can
only watch, the role narrates player feelings/actions, refusal is ignored,
choices are decorative, or route changes funnel back to one outcome. Use
`lunatalk-agency-designer` when the transcript points to user insertion space,
interaction hooks, agency guardrails, reply paths, or consequence checks.
Read `../../references/boundary-design.md` when simulation touches mature,
adult, horror-leaning, consent-sensitive, refusal, pacing, jealousy, power
imbalance, or safer-version behavior.
Read `../../references/quality-rubric.md` for behavior evaluation.
Read `../../references/role-card-writing-framework.md` to decide whether failures
come from missing anchors, weak play loop, or poor token economy.
Read `../../references/token-economy.md` when simulation shows repeated setup,
lore dumps, high welcome-to-detail imbalance, verbose state, or compression
risk. Use `lunatalk-token-architect` when the transcript points to field
allocation, welcome bloat, duplicated lore, visual bloat, or token-heavy state
that should be repaired before another paid pass.
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
   If the transcript shows several failures at once, create or preserve a
   `lunatalk-card-doctor` diagnosis packet before choosing field patches.
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
- The role never narrates the player's feelings, consent, commitments, or
  irreversible actions. If it does, patch agency design before another paid run.
- Refusal, questioning, redirecting, testing, and cooperation should create
  distinct role responses rather than collapse into one forced path.
- For longplay tests, use continuation probes from the longplay packet and check
  whether the role changes state, recalls a memory thread, shifts route pressure,
  or renews a hook without waiting for the player to write the whole plot.
- The transcript has no obvious safety, formatting, or system-leak issue.
- The billing summary or charged amount is included when available.
- Treat `evaluation.qualityDimensions` as the first triage map:
  `responsePresence`, `agency`, `progression`, and `safetyFormat`.
- If `evaluation.status` is `warning`, follow `nextRecommendedTools`. There is no
  separate `simulation_evaluate` tool.
- For top-card behavior, check whether the simulated second turn is stronger
  than the setup: it should react, complicate, reveal, offer a route, update
  state, or renew pressure without taking over the player's agency.
- For generator or assistant cards, the output should produce a usable artifact
  when the user gives enough input or accepts defaults, preserve a stable schema,
  remember the artifact version, and support named revision operations. If the
  transcript is advice-only, asks indefinitely, changes format, or forgets prior
  artifacts, patch with `lunatalk-generator-architect` before another paid
  simulation.
- For RPG/system cards, state and resources should be compact enough to update
  every turn. Resources, failure, and route choices should change access, cost,
  risk, reward, or renewed hooks; if not, patch the play-engine packet before
  another paid simulation.
- For ensemble cards, the cast should not drown out the player; each active voice
  needs a motive and turn ownership.
- If ensemble speakers become interchangeable, patch voice cards, response-mode
  rules, or compact micro-samples with `lunatalk-voice-director` before running
  another simulation.
- If a single-role persona becomes generic under pressure, first decide whether
  the missing layer is character core or voice. Use `lunatalk-character-core`
  for weak motive/leverage, and `lunatalk-voice-director` for rhythm,
  vocabulary, refusal style, catchphrase, or pressure-speech repair.
- If a world-heavy card dumps lore or treats factions/locations as scenery, patch
  the world-engine packet before adding more setting text.
- If the transcript repeats welcome lore, spends turns on decorative setup, or
  loses engine detail because durable rules were placed in `roleWelcome`, patch
  the token architecture with `lunatalk-token-architect` before another paid
  simulation.
- If the player can only watch, choices are decorative, or all routes collapse
  into the same response, patch the agency packet before changing prose polish.
- For mature, intense, or boundary-sensitive cards, pressure must remain tied to
  player choice, pacing, refusal style, stop conditions, and the boundary
  packet's explicitness ceiling and escalation ladder.

## Author co-review

The author's feedback surface is the agent conversation. After a simulation,
show the probes, concise transcript findings, what passed, what failed, the
proposed card patch, and whether another paid pass is worth running. Ask for
confirmation before `publish_submit`, and before extra simulation passes when
cost is not already accepted.

If the author wants to compare patch directions, adjust taste, or decide what to
preserve before another simulation, hand the evidence to
`lunatalk-collaboration-director` before spending another paid pass.

## Reporting

Return:

- prompts used
- transcript summary
- behavior issues found
- suggested card patches with target field
- billing/cost summary when available
- whether another simulation pass is needed
