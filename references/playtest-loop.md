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

Choose 1 to 5 user messages. Prefer fewer probes when the card risk is narrow,
and more probes when the card is close to publishing or has complex behavior.

Use probes that a real player might write. A probe should be short enough that
the role has to carry part of the scene.

1. Hook probe: accepts the opening and gives the role a normal first turn.
2. Agency probe: does something plausible but not scripted.
3. Continuity probe: refers to a changed state, relationship beat, or route.
4. Boundary probe: presses against a stated limit, taboo, refusal, or pacing rule.
5. Token/progression probe: asks the scene to continue and reveals whether the
   role repeats setup instead of moving play forward.

If the probes are meant to be a single short conversation, order them so each
message follows from the previous one. If they are independent stress tests, run
separate simulation passes only when the author accepts the extra cost.

Before running the probes, state the patch triggers: what transcript evidence
would cause a `roleDetailDesc`, `roleWelcome`, profile, or jailbreak change. This
keeps the simulation from becoming a vague taste check.

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

Read the transcript before trusting the score. Use the structured evaluation as
triage, then map the observed problem to a card patch.

| Symptom | Likely missing card layer | Patch target |
|---|---|---|
| Reply is generic, short, or repeats setup | anchor, voice fingerprint | `roleDetailDesc` voice and behavior rules |
| Reply gives no next action | agency, opening affordance | `roleWelcome` reply path and role initiative |
| Reply restates welcome or asks another generic question | opening direction, second-turn engine | opening packet and `roleWelcome` second-turn move |
| Reply ignores player choice | consequence loop | `roleDetailDesc` state and route rules |
| Reply decides the player's feelings/actions | player agency boundary | `roleDetailDesc` do/avoid and welcome phrasing |
| Reply escalates sensitive content too fast | boundary design | explicitness ceiling, escalation ladder, pacing, refusal style, stop conditions |
| Reply treats refusal as the end of play | boundary design | refusal route and safer fallback |
| Reply dumps lore instead of scene movement | token economy, play layer | move lore to modular detail and add current pressure |
| Cast talks over the player | ensemble turn ownership | cast table and scene rules |
| RPG/system loses state | state economy | compact state format and update rules |
| Assistant card chats but produces no artifact | generator contract | output schema, defaults, and revision commands |

## Patch loop

1. Summarize the observed failure with one transcript-backed sentence.
2. Identify the weakest Moonloom dimension: promise, anchor, voice texture,
   consequence, role initiative, agency, opening scene, player agency, boundary,
   archetype fit, or token efficiency.
3. Patch the smallest source field that can fix the failure.
4. Run `validate_role` after structural patches.
5. Re-run simulation only if the patch changes behavior, boundary handling,
   state, voice, or first-turn flow.
6. Stop after two failed repair loops and ask the author to choose a design
   direction, because repeated failure usually means the premise or player role is
   underdefined.

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

If a card passes validation and render review but fails these checks, revise the
Moonloom writing layer. Do not add subjective server gates to compensate for a
weak role-card engine.
