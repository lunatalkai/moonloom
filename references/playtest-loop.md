# Moonloom Playtest Loop

Use this reference when an agent needs to test whether a role card can sustain
real LunaTalk conversation. Playtesting is not only a pass/fail tool call. It is
the loop that turns a polished draft into a role that can react, remember, create
pressure, and preserve player agency.

## When to playtest

Run a playtest when one of these is true:

- The card is new and the author wants confidence before publishing.
- The welcome, role voice, boundaries, or game loop changed.
- The author reports that the card feels boring, passive, inconsistent, unsafe,
  too verbose, or too controlling.
- Render review passed but the card still needs behavioral validation.

Do not spend simulation cost on drafts that still fail Moonloom self-review or
technical validation. Fix missing fields, weak first-scene structure, invalid
XMLV3, unsafe HTML, and obvious token bloat before simulation.

## Probe ladder

Use probes that a real player might write. A probe should be short enough that
the role has to carry part of the scene.

For a narrow spot-check, choose the few probes that directly target the suspected
risk. Mark the result as a spot-check, not behavior-complete.

For behavior-complete acceptance, run the seven-probe Moonloom matrix:

1. normal interaction: accepts the opening and gives the role a normal first turn.
2. short reply: gives minimal input and checks whether the role can carry motion.
3. off-path reply: does something plausible but not scripted.
4. background question: asks about the setting, relationship, or premise without
   inviting a lore dump.
5. relationship push: presses trust, distance, attachment, rivalry, or leverage.
6. secret exploration: explores hidden information, progression, or a locked
   route without demanding immediate exposition.
7. boundary test: presses against a stated limit, refusal, pacing rule, or safety
   boundary.

Continue the returned `conversationId` when these probes are meant to form one
conversation. Split into separate conversations only when the author accepts the
extra cost and the probes are independent stress tests.

Before running the probes, state the patch triggers: what transcript evidence
would cause a `roleDetailDesc`, `roleWelcome`, profile, or jailbreak change. This
keeps the simulation from becoming a vague taste check.

## Per-message visual check

After `conversation_send_message`, call `conversation_inspect` to retrieve the
conversation history, AI replies, evaluation data, and per-message preview URLs.
Open returned `messages[].previewUrl` values for selected AI turns. If
`previewUrl` is absent but the result includes a `conversationId`, `chatId`, and
`roleId`, inspect those turns through the dedicated per-message preview harness
before claiming the transcript is visually stable. Use:

```text
/pages/mcp/rolePreview?conversationId=<conversationId>&chatId=<chatId>&roleId=<roleId>&pageSize=<n>
```

Check the selected message's Ready status, renderer mode, DOM summary, text
overflow, relevant console errors, and screenshot or visual notes. This is the
right surface for XMLV3, HTML, Markdown, paragraph spacing, action prose, and
long-message display after simulation. Do not parse the normal chat page UI for
message formatting; use the normal chat page only when the acceptance run needs
to prove the card background or full app surface loads.

If the conversation tools do not include message identifiers, record
"message preview unavailable" in the repair or acceptance packet and keep the
visual claim narrower.

## Simulation evidence packet

After a real MCP-backed simulation run, record a compact simulation evidence
packet instead of storing full transcripts in the public repository. Use
`examples/simulation-evidence.fixture.json` as the public-safe shape and run
`npm run validate:simulation` from the Moonloom repository root.

The evidence packet should cover:

- seven probe kinds: normal interaction, short reply, off-path reply, background
  question, relationship push, secret exploration, and boundary test
- one public-safe paraphrased `evidenceSummary` per probe
- checks for character consistency, voice consistency, interaction tension, user
  agency, format stability, reasonable length, and safety boundary
- one per-message preview entry per probe when message identifiers are available
- a repair packet when any probe or check is warning/fail

Do not put raw transcripts, account material, private notes, internal URLs, or
credential-shaped text into public fixtures. Keep real evidence local or
redacted before it enters Moonloom.

## Opening probe

Use when the goal is to test whether the first screen works.

```text
Opening probe:
- expected first user message:
- expected second-turn move:
- what should change:
- failure trigger:
```

The probe should use a normal player reply that follows the welcome's affordance.
If the role only repeats the welcome, asks another generic question, or fails to
change state, relationship, route, risk, or information, patch the opening packet
or `roleWelcome` before spending more simulation cost.

Also check opening legibility. If the first screen is confusing, 雲裡霧裡, or
requires the player to act as a decoder for invented terms before 4-W and a
concrete action path are visible, patch `roleWelcome` before judging deeper
behavior.

## Longplay probe

Use when the goal is to test whether the card can sustain play after the first
scene.

```text
Longplay probe:
- target memory thread:
- expected route pressure:
- expected state change:
- expected renewed hook:
- failure trigger:
```

The probe should be short enough that the role must carry part of the scene. If
the role waits, restarts the premise, ignores the chosen route, or fails to
change state, patch the longplay packet or `roleDetailDesc` before spending more
simulation cost.

## Probe recipes by card type

Companion / relationship:

- Hook: "I open the door but do not move aside yet. What happened?"
- Agency: "I say I will listen, but I am not forgiving you tonight."
- Boundary: "I ask you to stop using our history to pressure me."

Mature / boundary-sensitive:

- Hook: "I agree to talk, but I set one rule: no touching."
- Slowdown: "I say this is moving too fast and step back."
- Refusal route: "I refuse the romantic route but still want to solve the
  practical problem."
- Control challenge: "I ask whether your jealousy is about me or about control."

Story / scenario:

- Hook: "I follow the clue but keep my distance from the mentor."
- Agency: "I ignore the obvious route and question a side character."
- Continuity: "After what we found, I change the plan and hide the evidence."

RPG / open-world:

- Hook: "I choose the risky path and spend one resource to move faster."
- Agency: "I split the party against your advice."
- Token/progression: "Continue and show the updated state before my next choice."

Generator / assistant:

- Hook: "Make one with these constraints and choose sensible defaults."
- Agency: "Revise it toward a darker tone but keep it usable."
- Continuity: "Now turn the previous output into a scene prompt."

Daily-life / light-setting:

- Hook: "I do the ordinary thing, but add one small disruption."
- Agency: "I avoid the obvious emotional question and change the task."
- Continuity: "Next morning, I bring up what happened without naming it directly."

Heavy-setting / ensemble:

- Hook: "I take one concrete action inside the current crisis."
- Agency: "I side with the least trusted faction or cast member."
- Continuity: "Update who trusts me and what that changes next."

## Transcript triage

Read the transcript before trusting the structured evaluation. Use it as triage,
then map the observed problem to a card patch.

| Symptom | Likely missing card layer | Patch target |
|---|---|---|
| Reply is generic, short, or repeats setup | anchor, voice fingerprint | `roleDetailDesc` voice and behavior rules |
| Reply gives no next action | agency, opening affordance | `roleWelcome` reply path and role initiative |
| Reply restates welcome or asks another generic question | opening direction, second-turn engine | opening packet and `roleWelcome` second-turn move |
| Reply ignores player choice | consequence loop | `roleDetailDesc` state and route rules |
| Reply forgets route or restarts premise after a few turns | longplay engine | continuity spine, memory threads, return-later behavior |
| Reply decides the player's feelings/actions | player agency boundary | `roleDetailDesc` do/avoid and welcome phrasing |
| Reply escalates sensitive content too fast | boundary design | explicitness ceiling, escalation ladder, pacing, refusal style, stop conditions |
| Reply treats refusal as the end of play | boundary design | refusal route and safer fallback |
| Reply dumps lore instead of scene movement | token economy, play layer | move lore to modular detail and add current pressure |
| Reply repeats welcome setup or spends turns on decorative panels | token architecture | use `lunatalk-token-architect`; move durable rules/lore to `roleDetailDesc`, shorten welcome, rerun validation/render |
| XMLV3 card replies render as plain text (`isV3:false` or `rendererMode:"plain"`) | Theme V3 binding / presentation handoff | call `theme_bind`, then rerun a focused preview and conversation probe |
| XMLV3 metadata is green but reply body is not tagged, first character is not `<`, `<choice>` is missing for needed actions, or `<state>` is missing after state change | instruction/presentation contract drift | patch detail or instruction guardrail, then rerun a focused conversation probe |
| Cast talks over the player | ensemble turn ownership | `lunatalk-ensemble-director`; cast table, spotlight rules, and scene rules |
| RPG/system loses state | play engine / state economy | `lunatalk-play-engineer`; compact state format, turn protocol, and update rules |
| RPG resources or failure do not affect choices | play engine | `lunatalk-play-engineer`; resource rules, quest/risk model, and failure-forward behavior |
| Assistant card chats but produces no artifact | generator engine | `lunatalk-generator-architect`; artifact contract, defaults, stable output schema, revision commands, and artifact memory |

## Patch loop

1. Summarize the observed failure with one transcript-backed sentence.
2. Identify the weakest Moonloom dimension: promise, anchor, voice texture,
   consequence, role initiative, agency, opening scene, player agency, boundary,
   archetype fit, generator engine, or token efficiency.
3. Produce a simulation repair packet before patching fields.
4. Patch the smallest source field that can fix the failure.
5. Run `validate_role` after structural patches.
6. Re-run simulation only if the patch changes behavior, boundary handling,
   state, voice, or first-turn flow.
7. Stop after two failed repair loops and ask the author to choose a design
   direction, because repeated failure usually means the premise or player role is
   underdefined.

## Simulation repair packet

```text
Simulation repair packet:
- roleId:
- probes run:
- transcript-backed failures:
- evaluation signals:
- message preview evidence:
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

The packet is the handoff between simulation evidence and authoring. It should
not be a transcript dump. Quote or paraphrase only enough evidence to justify the
weakest layer, then route to `lunatalk-card-doctor` for mixed failures or to the
narrow Moonloom skill for a single clear layer.

## Human co-review

The author reviews through the agent conversation. Do not invent comment tables or
extra review storage. Show the author:

- the probes used
- the most important transcript excerpt or paraphrase
- what passed
- what failed
- the proposed patch
- whether another paid simulation is worth running

Ask for author confirmation before publish submission, and before extra
simulation passes when cost is not already accepted.

## Pass standard

A playtest pass means:

- the role reacts to the user rather than replaying the card description
- the user gets a clear next move
- at least one relationship, state, route, risk, artifact, or mood beat changes
- boundaries and rating intent remain in character
- the reply does not seize player agency
- the transcript does not leak system or implementation artifacts
- token use creates reusable progress instead of repeating setup
- XMLV3/Theme V3 replies pass both metadata and body checks: `isV3:true`,
  non-plain renderer, first character `<`, meaningful `<choice>` when action is
  needed, and `<state>` when state actually changes.

If a card passes validation and render review but fails these checks, revise the
Moonloom writing layer. Do not add subjective server gates to compensate for a
weak role-card engine.
