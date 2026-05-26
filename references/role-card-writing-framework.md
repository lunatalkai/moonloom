# Moonloom Role Card Writing Framework

Use this framework when writing, improving, reviewing, or simulating LunaTalk role
cards. It should evolve through author feedback, render review, and simulation
results.

## Core thesis

A top LunaTalk card is not just a well-written persona. It is a playable engine:

```text
Hook -> Agency -> Consequence -> Memory -> Progression -> New Hook
```

The visible opening should be easy to answer. The hidden detail should keep the
role consistent. The interaction loop should give the player a reason to continue.

## The four-layer card model

### 1. Promise layer

This is what the user understands in three seconds.

Use `roleName`, `roleDesc`, tags, and avatar/theme to answer:

- What fantasy does this card offer?
- Who is the player in relation to it?
- What can happen that cannot happen in a generic chat?

Good promise examples by shape:

- "You are a new student in a living magical academy."
- "Your quiet classmate has a dangerous secret."
- "You can generate and govern an entire world."
- "You are an anomalous entity being evaluated by a secret research bureau."

Keep `roleDesc` tight: usually 80-260 characters for normal cards, up to 500 for
systems, RPGs, or generators with many modes. If the premise cannot be stated
briefly, the card is not ready to write.

### 2. Engine layer

This is the role's durable behavior and world logic. It belongs mostly in
`roleDetailDesc`, not in the opening.

Include:

- identity and relationship to the player
- personality drivers and contradictions
- boundaries, taboos, escalation rules, and pacing
- speech style and behavioral tells
- world rules, factions, locations, systems, currencies, stats, or routes
- what the role should proactively do when the player is passive
- what must remain stable across long sessions

Practical length targets:

- Companion or relationship card: 800-2,200 characters
- Scenario/story card: 1,500-4,000 characters
- System, RPG, sandbox, generator: 4,500-10,000 characters
- Ultra-large world: allowed above 10,000 only when structured into modules

Do not pad. A short, sharp relationship card can work; a long vague card still
fails.

### 3. Play layer

This is the first scene and the ongoing action loop. It belongs in `roleWelcome`
and, when needed, structured XMLV3/Theme V3.

A strong welcome includes:

- location, time, and immediate situation
- the role's first concrete action
- pressure, tension, curiosity, or a choice
- a clear player response path
- optional state panel or setup prompt for reusable systems

Avoid:

- "Hello, I am X, what do you want to do?"
- lore dumps before the player can act
- instructions that make the AI play the user
- long menu screens with no scene
- visual HTML that consumes tokens but adds no playable affordance

Practical welcome targets:

- Companion or relationship card: 80-700 characters
- Story or scenario card: 200-1,200 characters
- System/RPG/sandbox: 300-2,000 characters with choices or setup prompts
- HTML/XMLV3 visual welcome: only as long as needed to make the first action clear

### 4. Presentation layer

This is how the card feels visually without corrupting the story logic.

Prefer XMLV3 plus Theme V3 for new visual cards. Use HTML only for a specific
custom layout or legacy import. Visual styling should reveal state, mood, or
choice structure; it should not hide critical instructions inside decoration.

## The PACT quality loop

Use PACT to judge every card.

### P: Playable

The player knows what to do in the next message. The opening creates action rather
than asking the player to invent everything.

Check:

- Can the first user reply be written in under 10 seconds?
- Does the scene invite action, choice, confession, conflict, exploration, or setup?
- Is the user role clear enough?

### A: Anchored

The role has stable identity and behavior. The AI has enough anchors to avoid
generic drift.

Check:

- Does the detail specify what the role wants?
- Does it specify how the role talks?
- Does it define what changes slowly and what can change quickly?

### C: Consequential

The card has a loop where user actions matter.

Check:

- Do relationships, resources, trust, location, time, reputation, or route state
  change based on choices?
- Is there a reason to continue after the first scene?
- Does the card include consequences without railroading?

### T: Token-efficient

The card spends tokens where they improve play.

Check:

- Keep the welcome shorter than the engine unless the welcome is an interactive UI.
- Move reusable visual rules to Theme V3.
- Remove repeated adjectives, duplicated lore, and one-off lists that will not be
  used in play.
- Use compact state blocks only when the state will actually be updated.

When `validate_role` returns `tokenBudget`, use it as a structural check:

- `roleDetailDescChars` should usually carry the durable engine.
- `roleWelcomeChars` should usually stay below `roleDetailDescChars`; an
  interactive setup can be longer, but it must add immediate agency.
- `welcomeToDetailRatio > 2` usually means lore, rules, or visual scaffolding
  should move out of welcome.
- `estimatedTokens` is approximate. Use it to compare revisions, not as a billing
  statement.

## Validation-facing minimums

Moonloom should aim above these minimums, but never ignore them when authoring a
real private card:

1. `roleDesc` sells the premise in one compact sentence: who, relationship, and
   tension.
2. `roleDetailDesc` is long enough to act as an engine, not a label. Include
   identity, desire, contradiction, boundaries, speech style, and progression
   rules.
3. Speaking style is explicit and executable: sentence length, rhythm, vocabulary,
   address terms, emotional tells, restraint, and what the role avoids saying.
4. Voice texture is not just a mood label. Avoid stopping at "natural",
   "gentle", "witty", or "like a real person"; state how that voice appears in
   actual replies.
5. Progression is explicit: what player choices change, which state can move,
   and how the next hook renews.
6. Role initiative is explicit: what the role asks, reveals, escalates, or offers
   when the player is passive or stalls.
7. `roleWelcome` gives a clear first action path through choices, a direct
   question, or an explicit "you can..." affordance.
8. `roleWelcome` is not only a menu. It opens with concrete sensory/location
   context, a role beat, pressure, and a reason the player is implicated.
9. `zh-Hant` / `zh-TW` cards use Traditional Chinese consistently in profile,
   detail, welcome, and examples.

Validation warnings usually mean the card is still below publish-grade quality.
Patch the card, then re-run validation before render or simulation.

## Agent repair dimensions

When `validate_role` returns `qualityDimensions`, repair the card in this order:

1. `promise`: make the premise readable in three seconds.
2. `anchor`: add the durable identity, desire, contradiction, boundary, and voice
   anchors that prevent generic drift.
3. `voiceTexture`: replace generic tone labels with executable voice behavior.
4. `consequence`: define what changes when the player acts.
5. `roleInitiative`: add proactive turn rules for passive or stalled player input.
6. `agency`: make the first reply path obvious.
7. `openingScene`: add location, time, sensory detail, role beat, pressure, and
   player implication before choices.
8. `playerAgency`: remove rules that decide the player's actions, feelings,
   consent, or commitments.
9. `languageStyle`: rewrite Simplified Chinese terms into Traditional Chinese
   while preserving names, tone, and XMLV3 tags.
10. `archetype`: satisfy the chosen card type rather than writing a generic card.
11. `tokenEfficiency`: move reusable visual or rule structure out of welcome when
   it costs more tokens than it adds play value.

Do not treat a single high total score as enough. A card with weak agency or weak
consequence still needs repair even if it has polished prose.

For `archetype` repairs, match the card type:

- Companion / relationship: add relationship history, emotional pressure,
  contradiction, boundaries, and trust pacing.
- Story / scenario: add named locations, stakes, likely branches, and route
  consequences.
- Game / RPG / simulator: add rules, stats or resources, failure pressure, and an
  opening setup/state/choice surface.

## Archetype recipes

### Companion / relationship card

Goal: high emotional immediacy and consistent role behavior.

Use:

- one clear relationship pressure
- one contradiction in the role
- one reason the scene starts now
- a welcome that puts the role in motion

Structure:

```text
roleDesc: premise + relationship + tension
roleDetailDesc: identity, desire, contradiction, boundaries, speech, pacing
roleWelcome: scene in progress, role acts first, player is implicated
```

Good first-scene pressures:

- late-night confrontation
- secret discovered
- overdue apology
- forced cooperation
- returning home after an absence
- social mask cracking in private

### Story / scenario card

Goal: make the player enter an ongoing situation.

Use:

- protagonist position
- starting conflict
- named locations and stakes
- 2-4 likely branches
- lightweight memory rules

Welcome should begin inside the scene, not at the character sheet.

### System / simulator card

Goal: replayable generation and control.

Use:

- explicit mode selection or setup prompt
- world rules and simulation loop
- state format
- what the AI should generate vs ask
- how the system advances when the user says "continue"

The highest-usage cards often succeed here because they provide agency and
replayability. Make the first message a clear control surface.

### RPG / open-world card

Goal: durable long-session play.

Use:

- character creation inputs
- location/quest loop
- stats, inventory, factions, time, risk, rewards
- consequences for travel, combat, social choices, and resource use
- state update rules

RPG cards can justify long `roleDetailDesc`, but only if the detail is modular:
core rules, world map, progression, NPC behavior, combat, economy, and output
format should be separated.

### Generator / creator assistant card

Goal: help the user produce an artifact.

Use:

- intake questions
- output schema
- revision loop with stable commands
- quality rubric
- default assumptions when the user skips intake
- at least one finished artifact per normal turn
- refusal/constraint handling

The card should not just chat about the task; it should drive the user toward a
finished artifact.

### Canon/IP adaptation card

Goal: preserve recognizable fantasy while avoiding brittle trivia dependence.

Use:

- canonical premise and relationship
- stable voice/personality cues
- flexible scene framing
- fallback rules when canon is uncertain

Do not rely on the model "knowing everything." Put the facts needed for this card's
scene in `roleDetailDesc`.

## Field allocation

### `roleDesc`

Write the pitch. It should sell the card and orient the player.

Template:

```text
[Player role] enters [situation] with [role/system], where [central tension] creates [play loop].
```

### `roleDetailDesc`

Write the engine. Use headings or compact sections.

Recommended sections:

```text
Core premise
Player position
Role identity
Personality and contradictions
Speech style
World rules or relationship rules
Progression / consequence loop
Memory and state rules
Do / Avoid
```

### `roleWelcome`

Write the first playable moment.

Scene formula:

```text
[Sensory opening] + [role action] + [pressure] + [player implication] + [reply path]
```

For systems:

```text
[System greeting] + [available modes] + [required setup fields] + [example command]
```

### `talkExample`

Use only when it teaches voice or format that the detail cannot capture. Do not
fill it with generic dialogue.

### `jailbreak`

Use sparingly. Prefer explicit behavior rules in detail. Only add jailbreak text
when the card needs stable formatting or style constraints that repeatedly fail.

## Common failure patterns

- Pretty prose with no player action.
- Generic "Hello, I am X, what do you want to do?" openings.
- A long world bible in welcome.
- Generic relationship labels without concrete tension.
- The AI is instructed to decide the player's actions.
- State panels that are never updated.
- HTML/CSS decoration that makes the card harder to read.
- Many NPC names but no immediate scene.
- Canon card that assumes model memory instead of encoding needed facts.
- Helper/generator card that asks vague questions and never outputs a finished
  artifact.

## Evaluation probes

Use these during simulation:

1. Hook probe: a normal first reply that accepts the scene.
2. Agency probe: a reply that does something unexpected but plausible.
3. Continuity probe: ask the role to continue after a state or relationship change.
4. Boundary probe: push against a stated rule or taboo.
5. Token probe: inspect whether the reply spends tokens on reusable story progress
   instead of repeating setup.

Patch the card when simulation exposes a missing anchor, unclear player role, weak
consequence loop, or excessive token repetition.

Use `simulate_private_chat.evaluation` to triage failures:

- `responsePresence`: the reply is empty, too short, or too generic.
- `agency`: the reply does not give the player a concrete next move.
- `progression`: the reply does not change scene, relationship, route, risk, or
  state.
- `safetyFormat`: the reply leaks system/model artifacts or breaks the in-world
  frame.
