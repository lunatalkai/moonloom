# Moonloom Archetype Contracts

Use this reference before blueprinting or authoring when the author is unsure what
kind of LunaTalk card they are making, when a card mixes several formats, or when
the chosen card type is technically valid but behaviorally generic.

An archetype is not a genre label. It is the playable contract the card makes
with the player. Pick one primary contract, then let secondary overlays support
that contract instead of competing with it.

## Primary contract rule

Every card needs one primary contract:

- What does the player come here to do?
- What pressure makes the next reply easy to write?
- What changes because of the player's choices?
- Which field carries the durable engine?
- Which first-screen affordance proves the contract?

Secondary archetypes are overlays. A companion card can have a heavy world, a
story card can expose a generator artifact, and an RPG can contain romance, but
the first screen and durable rules should still serve one main promise.

## Archetype contracts

### Companion / relationship

Player promise: become involved with a specific role whose desire, contradiction,
and boundary create emotional pressure.

Required engine:

- relationship pressure
- role desire and contradiction
- player leverage
- pacing and refusal behavior
- proactive behavior when the player is passive

Field contract:

- `roleDesc`: relationship promise plus immediate tension.
- `roleDetailDesc`: identity, desire, contradiction, boundary, voice, pressure
  behavior, trust or distance progression.
- `roleWelcome`: a scene already in motion where the role acts first and the
  player can answer naturally.
- `talkExample`: only if voice cannot be preserved by compact rules.

Failure modes:

- The role is only a mood label.
- The first turn asks for comfort but has no decision.
- Closeness has no pacing or boundary.
- The card decides the player's feelings or consent.

### Story / scenario

Player promise: enter an ongoing situation with stakes, route branches, and
consequences.

Required engine:

- player position in the conflict
- starting incident
- 2-4 likely branches
- named places or people only when they affect action
- memory of route choices

Field contract:

- `roleDesc`: player position plus the incident.
- `roleDetailDesc`: stakes, routes, important locations, pressure moves, memory
  rules, consequence loop.
- `roleWelcome`: start inside the incident, not at a setting tour.
- `talkExample`: only if it teaches route or narrator behavior.

Failure modes:

- A premise summary with no scene.
- Branches change scenery but not state, risk, relationship, or access.
- The player is a witness with no leverage.

### System / simulator

Player promise: control or replay a structured system.

Required engine:

- modes or setup inputs
- defaults when the player gives little input
- state format
- generation rules
- update loop for continue/revise/retry

Field contract:

- `roleDesc`: system purpose and main controls.
- `roleDetailDesc`: modes, state schema, generation rules, commands, revision
  loop, limits.
- `roleWelcome`: a compact control surface with setup, defaults, and first
  action.
- `talkExample`: useful when it teaches output format.

Failure modes:

- The system only chats about the task.
- It asks many intake questions before producing anything useful.
- State is too large to update.

### RPG / open-world

Player promise: make durable choices under rules, risk, resources, and routes.

Required engine:

- player position or character setup
- compact stats/resources
- locations or quests that produce pressure
- failure that changes play without ending it too early
- route rewards or costs

Field contract:

- `roleDesc`: player position, world, and choice pressure.
- `roleDetailDesc`: rules, state, resources, factions, travel/scene loop, failure
  behavior, progression.
- `roleWelcome`: setup state or first crisis with choices.
- `talkExample`: only if it teaches turn format or state update.

Failure modes:

- Long lore but no rules.
- Stats exist but never change choices.
- The opening is a manual with no playable scene.

### Generator / creator assistant

Player promise: create a usable artifact through intake, defaults, output, and
revision.

Required engine:

- clear artifact type
- intake questions with defaults
- output schema
- quality rubric
- named revision operations
- one usable artifact when enough input is present

Field contract:

- `roleDesc`: artifact produced and collaboration loop.
- `roleDetailDesc`: intake, defaults, output schema, revision commands, quality
  rules, refusal and constraint handling.
- `roleWelcome`: ask for minimal input or offer defaults; do not become a vague
  chat prompt.
- `talkExample`: useful when it teaches output schema.

Failure modes:

- The card gives generic advice instead of artifacts.
- It asks questions indefinitely.
- It breaks character when the generator is meant to be diegetic.

### Daily-life / slice-of-life

Player promise: small, ordinary actions slowly change trust, habit, or emotional
distance.

Required engine:

- ordinary routine
- hidden or small pressure
- sensory anchor
- role wants something specific
- tiny progression signals

Field contract:

- `roleDesc`: routine plus small pressure.
- `roleDetailDesc`: habits, boundaries, preferred actions, slow progression,
  passive-player initiative.
- `roleWelcome`: a specific ordinary moment where the player can help, notice,
  refuse, tease, ask, leave, or change the plan.
- `talkExample`: only for subtle voice calibration.

Failure modes:

- Low stakes become no stakes.
- The card waits for the player to invent all intimacy.
- Progression jumps to melodrama because no small state exists.

### Light-setting

Player promise: enter a clean fantasy frame without reading a manual.

Required engine:

- one core rule or hook
- one main relationship or role position
- one active location
- one progression path

Field contract:

- `roleDesc`: simple fantasy or relationship hook.
- `roleDetailDesc`: the minimum world rules needed for behavior and consequence.
- `roleWelcome`: reveal the rule through action.
- `talkExample`: usually unnecessary.

Failure modes:

- Extra lore crowds out the first action.
- The core rule is atmospheric but creates no choice.

### Heavy-setting / lore-rich

Player promise: explore a larger world through modular rules that become actions,
costs, routes, and consequences.

Required engine:

- compact summary before modules
- player position inside the setting
- modules for rules, factions, locations, routes, and state
- exposition policy
- token plan

Field contract:

- `roleDesc`: player position plus world pressure.
- `roleDetailDesc`: modular world engine, not an encyclopedia.
- `roleWelcome`: one playable slice that works even if the player ignores most
  lore.
- `talkExample`: only for narrator, faction, or format calibration.

Failure modes:

- Proper nouns replace play functions.
- History appears before the player can act.
- Lore is preserved because it sounds good, not because it changes choices.

### Ensemble / multi-character

Player promise: interact with multiple core roles whose motives, voices, and
pressure moves create choices.

Required engine:

- 2-5 active core roles for most cards
- cast table with want, fear/cost, speech cue, pressure move, player leverage
- turn ownership
- gradual entry rules
- memory of alliances, suspicion, promises, and unresolved conflicts

Field contract:

- `roleDesc`: group situation plus player role.
- `roleDetailDesc`: cast table, turn rules, conflict network, voice contrast,
  state/memory.
- `roleWelcome`: one focal interaction, not a roll call.
- `talkExample`: compact micro-samples for weak or easily blurred speakers.

Failure modes:

- Names differ but motives and voices match.
- The cast crowds out the player.
- The welcome introduces everyone before anything happens.

## Hybrid rules

When a card combines several archetypes:

1. Name the primary contract first.
2. Name secondary overlays and what they are allowed to do.
3. Reject archetypes that would require a different primary loop.
4. Allocate fields according to the primary contract.
5. Add failure modes for each overlay conflict.

Common hybrids:

- Companion + heavy-setting: relationship pressure stays primary. World facts
  become choices, costs, secrets, or state.
- Companion + generator: generator output should be an in-world artifact or a
  limited mode, not generic writing advice.
- Story + generator: generated artifacts should advance the scenario.
- RPG + romance: resources and routes should intensify relationship choices
  without drowning the emotional engine.
- Ensemble + any: define turn ownership before adding more cast.
- Boundary-sensitive + any: route boundary design before first-scene escalation.

## Archetype packet

Use this packet before blueprinting or authoring when card shape is unclear:

```text
Archetype packet:
- current seed:
- primary archetype:
- secondary overlays:
- rejected archetypes:
- archetype contract:
- player promise:
- player role:
- core loop:
- first-screen proof:
- field allocation:
  - roleDesc:
  - roleDetailDesc:
  - roleWelcome:
  - talkExample:
  - XMLV3 / Theme V3:
- required packets:
  - character core:
  - world engine:
  - agency:
  - voice:
  - opening:
  - longplay:
  - boundary:
  - token:
- recommended Moonloom skill order:
- hybrid failure modes:
- repair rules:
- self-review probes:
- handoff:
```

## Self-review probes

- Can the primary archetype be named in one line?
- Does the first screen prove that primary contract?
- Do secondary overlays add choice, cost, state, voice, or artifact value without
  stealing the main loop?
- Does `roleDetailDesc` carry the durable engine?
- Does `roleWelcome` start play instead of explaining the concept?
- Does the player have a response path in under ten seconds?
- Does the card avoid deciding the player's feelings, memories, consent, actions,
  or commitments?
- Is the token plan appropriate for the archetype?
