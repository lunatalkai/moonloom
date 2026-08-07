---
name: lunatalk-chat-simulation
description: Use when a LunaTalk private role needs chat simulation, realistic probe design, transcript triage, behavior repair, simulation repair handoff, or billed conversation_send_message / conversation_inspect readiness after validation.
---

# LunaTalk Chat Simulation

Use this skill to test role behavior through LunaTalk's real private chat
pipeline. The goal is a closed loop: design realistic probes, run the simulation
when cost is accepted, read the transcript, patch the card from evidence, and
decide whether another pass is worth the cost.

## Required references

Read `../../references/card-writer-mcp.md` for `conversation_send_message` and
`conversation_turn_status` / `conversation_inspect`, plus
`conversation_model_catalog`, `conversation_create`, `conversation_list`, and
`conversation_load` when the test needs model/cost selection, a fresh thread,
conversation discovery, resume, or rollback.
Read `../../references/playtest-loop.md` for probe design, transcript triage,
patch mapping, per-message preview, and author co-review.
Use `npm run validate:simulation` when a run produces a redacted simulation
evidence packet for repository or benchmark handoff.
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

`conversation_send_message` uses normal LunaTalk chat billing and deducts points
or credits. If the author has not already asked to run a conversation test,
explain that it costs normal chat resources and ask for confirmation before
calling a billed conversation tool. When the author asks only for a test plan, do
not call the tool.

## Workflow

1. Confirm the role is private and owned by the authenticated account.
2. Confirm `validate_role` has no blockers. If it still has blockers, patch and
   validate before spending simulation cost.
3. Build a playtest plan before the tool call:
   - target risk: opening hook, agency, continuity, longplay, boundary,
     token/progression, archetype behavior, or onboarding clarity
   - probe scope: narrow spot-check or behavior-complete acceptance
   - probe text: realistic player messages, not evaluator instructions
   - required matrix: behavior-complete acceptance uses the eight-probe
     Moonloom matrix: normal interaction, short reply, off-path reply,
     background question, relationship push, secret exploration, boundary
     test, and long-arc macro-progression
   - expected healthy behavior: what the role should do if the card works
   - patch triggers: what transcript evidence would require changes to
     `roleDetailDesc`, `roleWelcome`, profile fields, or jailbreak
   - cost stance: already accepted, needs confirmation, or skipped
4. Use `conversation_create` when the test needs a fresh thread, or
   `conversation_list` when the author asks to inspect/resume an existing thread.
   Use `conversation_load` only when the author wants that conversation made
   current or rolled back to `rollbackToChatId`.
   In raw JSON-RPC responses, unwrap `result.structuredContent.conversation`
   before reading `conversationId`, `latestMessage`, `messages`, `evaluation`,
   or `previewUrl`.
5. Call `conversation_model_catalog` before the first paid probe. Read
   `recommendedModel`, model status, `status.confidence`,
   `status.gatewayHealth`, `status.errorBuckets`, `costScore`,
   `effectiveCostScore`, `thinkingDepthOptions`, and `defaultThinkingDepth`,
   then pass the chosen value as `model` in
   `conversation_send_message` when the environment default is unknown or known
   to be unavailable. Treat `status.status: "unknown"` as a sample confidence
   warning, not as proof that the model is broken. Treat
   `status.gatewayHealth.state: "unknown"` as gateway sample insufficiency, not
   as healthy capacity. Prefer models with non-red status, non-`none`
   confidence, and no severe gateway or error-bucket warning. If the chosen
   model exposes thinking metadata, choose a listed `thinkingDepth` value from
   `thinkingDepthOptions`; use `defaultThinkingDepth` only after the author
   accepts that stronger thinking can improve hard probes while using more
   tokens. Do not hard-code a model or thinking mode when the catalog can provide
   one. Record the selected thinkingDepth in the simulation evidence.
6. Call `conversation_send_message` after cost is accepted. Set `waitMs: 60000`
   so the MCP call waits up to 60 seconds for the LunaTalk reply. If the result
   still returns `generationStatus: "waiting_ai"` or `"generating"`, treat it as
   the normal async path and poll with `conversation_turn_status` instead of
   holding the client request open longer. For a multi-turn probe, continue with
   the returned `conversationId`, but do not send the next probe until the latest
   AI message is complete. If the latest message is USER, keep polling or inspect
   the failed turn before adding more input.
7. Call `conversation_inspect` after each accepted message once the latest turn
   is complete. For long conversations, pass `chatIds` for the specific messages
   under review instead of loading an oversized history page. Read the
   returned conversation history, AI messages, `evaluation`, and per-message
   metadata. Evaluate behavior, not just whether the tool ran.
   Apply per-turn action-path closure as an acceptance gate: if any selected AI
   turn lacks a concrete next action path, decision, question, visible affordance,
   or meaningful consequence, do not accept the conversation just because later
   turns pass. Patch `roleDetailDesc` and `roleWelcome` so first replies and
   route replies close with a playable next move.
   For XMLV3 or control-heavy cards, also record longArcFormatStability during
   the 10+ turn long arc: `structureShare`, `panelRetention`,
   `choicesRetention`, `hiddenStateObserved`, and `absorbingStateRisk`.
   Treat absorbing-state-like / self-reinforcing format drift as a warning even
   when behavior stays in character. Choices are often first to drop, so a
   choices first failure is a structural acceptance failure at decision points.
   When triaging a warning, inspect the last visible block of the AI turn. Ending
   on a clue reveal, mood beat, twist quote, or character statement is not enough
   unless the turn also names what the player can do next. Prefer a role-specific
   repair rule that closes with grouped choices, a direct in-character decision
   question, or a concrete object/action affordance instead of forcing buttons
   onto every reply.
8. If `conversation_inspect` returns `messages[].previewUrl`, open those URLs for
   selected AI messages. If `previewUrl` is absent but the result includes
   `conversationId`, `chatId`, and `roleId`, build the dedicated preview harness URL:
   `/pages/mcp/rolePreview?conversationId=<conversationId>&chatId=<chatId>&roleId=<roleId>&pageSize=<n>&viewport=mobile`.
   Use `viewport=desktop` for PC chat-column proportions and `viewport=mobile`
   for mobile bubble proportions. Check both when layout is part of acceptance.
   Record Ready status, renderer mode, DOM summary, text overflow, relevant
   console errors, and screenshot or visual notes as message preview evidence.
   Do not parse the normal chat page UI for transcript formatting.
   When the role is supposed to be XMLV3/Theme V3, treat `isV3:false` or
   `rendererMode:"plain"` on AI messages as a format failure. The likely patch
   is `theme_bind` first, then `role_patch_welcome` or `role_patch_detail` only
   if the content itself is not following the chosen presentation contract.
   After metadata is correct, inspect the message body too: the first character
   should be `<`, scene text should be wrapped in XMLV3 tags, player affordances
   should use `<choice>`, and state changes should use `<state>` with compact
   JSON. Do not mark XMLV3 visual closure just because `isV3:true` is present.
9. If message identifiers are missing, record "message preview unavailable" and
   keep the visual claim narrower.
10. When preparing benchmark or repository handoff evidence, write a redacted
   simulation evidence packet shaped like
   `../../examples/simulation-evidence.fixture.json` and run
   `npm run validate:simulation`. Do not store raw transcripts in Moonloom.
11. Map each failure to a Moonloom patch target using `playtest-loop.md`.
   If the transcript shows several failures at once, create or preserve a
   `lunatalk-card-doctor` diagnosis packet before choosing field patches.
12. Produce a simulation repair packet before patching fields or paying for
   another simulation pass.
13. Patch profile, detail, welcome, or jailbreak only when the transcript shows a
   concrete role-card problem. Most behavior fixes should target
   `roleDetailDesc` or `roleWelcome`; do not change MCP validation logic.
14. Run `validate_role` after structural patches.
15. Re-run the conversation test when the patch changes core behavior, boundary
    handling, state, voice, or first-turn flow and the author accepts the cost.

## Playtest plan format

Before a simulation call, write this compact plan:

```text
Playtest plan:
- roleId:
- target risks:
- probe scope: narrow spot-check | behavior-complete
- probes:
  1. ...
- expected healthy behavior:
- patch triggers:
- model/cost stance:
- cost stance:
- tool call: conversation_model_catalog then conversation_send_message with model and waitMs: 60000 now | wait for confirmation | skipped
```

Use a narrow spot-check only for a targeted regression, a known weak layer, or a
cost-limited pass; label it as not behavior-complete. To claim behavior-complete
status, run the eight-probe Moonloom matrix:

1. normal interaction
2. short reply
3. off-path reply
4. background question
5. relationship push
6. secret exploration
7. boundary test
8. long-arc macro-progression: 8-12 turns in one conversation, including passive
   or off-path inputs, to catch same location/route stagnation and macro story
   movement failures that per-turn checks miss.

## Simulation repair packet

When a transcript fails or returns `warning`, return this packet before another
paid run or field patch:

```text
Simulation repair packet:
- roleId:
- probes run:
- transcript-backed failures:
- evaluation signals:
- message preview evidence:
- longArcFormatStability:
  - turns:
  - structureShare:
  - panelRetention:
  - choicesRetention:
  - hiddenStateObserved:
  - absorbingStateRisk: none | watch | warning | fail
- weakest Moonloom dimension:
- patch target:
- next Moonloom skill:
- fields to preserve:
- fields to patch:
- validation needed:
- rerun stance:
- cost stance:
- handoff:
```

Use `lunatalk-card-doctor` as `next Moonloom skill` when several failures
interact. Use the narrow skill when the transcript points clearly to one layer:
agency, opening, longplay, voice, boundary, token, play engine, generator,
world, relationship, daily-life, ensemble, or character core.

## Evaluation criteria

- The role stays in character.
- The role's desire, contradiction, boundary, and player leverage remain visible
  under trust, resistance, passive input, and boundary-setting.
- The reply advances the scene and gives the player something to do.
- Per-turn action-path closure is required: any selected AI turn without a
  concrete player-facing next move fails the acceptance run, even when later
  turns pass. Patch `roleDetailDesc` and `roleWelcome` before another paid pass.
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
- For XMLV3/Theme V3 cards, AI messages are not accepted as visually stable when
  they return `isV3:false` or `rendererMode:"plain"`; bind Theme V3 with
  `theme_bind` and rerun a focused conversation probe.
- For XMLV3/Theme V3 cards, metadata is necessary but not sufficient: the reply
  body's first character should be `<`, the turn should expose meaningful
  `<choice>` buttons when the player needs a next move, and `<state>` should
  appear when scene, risk, route, resource, or relationship state changes.
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
- message preview evidence or unavailable reason
- behavior issues found
- suggested card patches with target field
- billing/cost summary when available
- whether another simulation pass is needed
