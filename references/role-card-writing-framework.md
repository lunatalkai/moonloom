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

Use `profile-packaging.md` when the engine exists but the public package is weak:
generic `roleName`, overlong `roleDesc`, vague tags, or a first impression that
does not explain why the player should open the card. Profile packaging should
preserve the engine and patch the promise surface, not reopen broad ideation.

Use `visual-identity.md` when the avatar, cover, thumbnail, or image prompt is
the weak first-impression layer. Visual identity must prove the promise, player
role, and tension in one glance. It should preserve the engine, stay original,
and hand off to profile packaging, presentation planning, or render review
instead of replacing those workflows.

Use `language-style.md` when the engine, opening, and voice card already work but
the language layer is weak: mixed Traditional/Simplified Chinese, translated-
sounding prose, pronoun/address drift, mixed-language tags, punctuation mismatch,
or inconsistent register across profile, detail, welcome, and examples.

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

- Companion or relationship card: 2,000-5,000 non-English characters, or
  6,000-15,000 English characters when the relationship engine is deep.
- Scenario/story card: 4,000-8,000 non-English characters, or 10,000-25,000
  English characters when the card needs routes, clues, factions, or secrets.
- System, RPG, sandbox, generator: 7,000-10,000 non-English characters, or
  18,000-50,000 English characters when rules are modular and playable.
- Ultra-large world: only use the high end when modules are structured by play
  function, not encyclopedia order.

Do not pad. A short, sharp relationship card can work; a long vague card still
fails.

Language-aware detail budget matters. A Chinese card near the 10,000-character
ceiling and an English card with far more characters can represent similar
engine depth because their information density differs. Use character counts as
a client-limit signal and use word/token proxy plus behavior coverage as the
quality signal.

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

Visual identity and presentation are adjacent but different. Avatar, cover,
thumbnail, and image prompts define visual proof; Theme V3/XMLV3/HTML define how
the opening renders. A strong card can need both packets before render review.

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
- A language-aware detail budget is required before field assembly. Treat a thin
  `roleDetailDesc` as not ready for MCP patching if it lacks identity, motive,
  current situation, relationship rules, world/play functions, proactive moves,
  voice, emotional reactions, longplay hooks, time/consequence logic, secrets,
  player insertion space, agency boundaries, or format stability.
- A full-detail candidate uses most of the useful budget for the card type, but
  only while each section creates reusable behavior, route costs, state updates,
  voice control, boundary handling, or return-later memory.
- `roleWelcomeChars` should usually stay below `roleDetailDescChars`; an
  interactive setup can be longer, but it must add immediate agency.
- `welcomeToDetailRatio > 2` usually means lore, rules, or visual scaffolding
  should move out of welcome.
- `estimatedTokens` is approximate. Use it to compare revisions, not as a billing
  statement.

Use `token-economy.md` when the repair needs a field-by-field allocation plan,
keep / move / cut / rewrite decisions, visual budget, example budget, or a
compression ladder before render or simulation.

## Quality audit and scorecard

When the author asks whether a draft, blueprint, or packet stack is good enough,
score before rewriting. Use `quality-scorecard.md` to produce evidence-backed
scores, critical blockers, a craft tier, strongest and weakest dimensions, and
the first three repairs.

The scorecard is a public craft review. It should guide Moonloom skill handoff;
it should not become an MCP validation rule, ranking claim, analytics metric, or
publishing shortcut.

Use the scorecard when the request is primarily "how strong is this?" Use
`card-diagnosis.md` when the request is primarily "why is this existing card
failing and what exact field patch order should we use?"

## Existing-card diagnosis

When improving an existing card, diagnose before rewriting. A technically valid
card can still be weak if validation passes, render looks good, and the behavior
fails after one reply.

Use `card-diagnosis.md` when the card has mixed symptoms:

- vague promise plus biography-heavy detail
- long visual welcome plus thin durable engine
- author feedback such as boring, off, passive, too generic, too verbose, or too
  controlling
- simulation symptoms across voice, agency, opening, longplay, or token
  allocation
- unclear repair order

The diagnosis should produce evidence, weakest layer, repair order, symptom map,
field triage, keep / move / cut / rewrite decisions, and verification plan. Do
not rewrite every field or spend another simulation pass until the patch target
is clear.

## Top-card pattern stack

Use this stack when the author asks for a card that should feel competitive with
strong public cards. The goal is not longer prose. The goal is a card that can
generate a better second turn than the first.

### 0. Premise workshop

If the author only has a mood, trope, aesthetic cluster, or broad taste request,
do not rush into fields. Use `premise-workshop.md` to create taste axes, three
contrasted directions, an involvement ladder, risk flags, and a handoff target.

Premise workshop should converge. It opens options, then recommends one
playable direction before blueprinting.

### 1. Tension triangle

Every strong card needs three active forces:

- Role desire: what the role wants from the player, the world, or themselves.
- Player leverage: what the player can decide, withhold, reveal, risk, or change.
- External pressure: a timer, secret, location, debt, threat, rule, opportunity,
  or social consequence that makes this scene start now.

If one side is missing, repair it before writing style polish. A beautiful card
with no player leverage becomes passive. A rich setting with no external pressure
becomes a lore dump.

Use `tension-triangle.md` or `lunatalk-tension-weaver` when the selected premise
is attractive but inert: missing role desire, player leverage, external pressure,
why-now, stakes, or a first-scene hook. Produce a Tension packet before opening
repair or final field assembly.

### 2. Character core

Before polishing fields, make sure the role is memorable as behavior, not only as
a trope, mood, or biography. Use `character-core-design.md` when the weak layer is
persona appeal.

Minimum packet:

- appeal promise: why this role is memorable beyond the label
- desire: what the role wants enough to act
- contradiction: what blocks or complicates that desire
- boundary: what the role will not do, and how pacing works
- mask / wound: what the role hides or protects
- player leverage: what the player can know, withhold, risk, or change
- relationship asymmetry: who knows, needs, owes, risks, or controls what
- pressure behavior: how the role reacts to trust, resistance, passivity, and
  boundaries

If the idea is "cold but soft", "quiet but secretly likes the player", or "a
powerful X", repair the core before writing longer prose.

### 3. Relationship engine

Relationship-heavy cards need more than chemistry. Use
`relationship-engine.md` when companion, romance, friendship, rivalry,
cohabitation, daily-life, or slow-burn cards collapse into generic flirting,
flat comfort, harmless banter, instant intimacy, or refusal-ending scenes.

Minimum packet:

- relationship promise: what repeated emotional play the card offers
- relationship asymmetry: who knows, needs, owes, hides, risks, or controls what
- closeness and friction state: what changes after acceptance, refusal,
  questioning, repair, passivity, or boundary-setting
- pacing gates: what earns closeness and what slows or redirects it
- repair and rupture routes: how the relationship can recover, distance, or
  change shape without ending play
- reply-path matrix: accept, question, refuse, reopen old wound, help
  practically, tease, or stay passive, each with a distinct state change
- passive-player behavior: the role restarts relationship play through concrete
  action, not waiting forever

If a card only gets stronger by adding prettier affection, it has not been
repaired. Add state, cost, agency, and renewal before adding more prose.

### 3a. Daily-life engine

Quiet cards need a routine engine, not only mood. Use `daily-life-design.md` when
daily-life, slice-of-life, neighbor, roommate, cohabitation, cafe, workplace, or
school cards need ordinary routine, small playable desire, tiny disruption,
shared object/place, habit state, passive-player behavior, second-turn change,
or return-next-time hooks before field drafting.

Minimum packet:

- ordinary routine: the repeated action that can return changed
- small playable desire: what the role wants enough to act
- tiny disruption: what makes this specific moment start now
- shared object/place: what can be altered, borrowed, fixed, returned, or missed
- habit state: what changes the next routine
- reply paths: help, ask, refuse, tease, notice, leave, stay silent, set terms
- romance posture: non-romantic, friendship-first, slow-burn optional, or other
  boundary
- second-turn change: the first visible alteration caused by player input

### 4. World engine

Worldbuilding should make choices, not homework. Use `world-engine-design.md`
when the weak layer is setting rules, relationship networks, factions, locations,
RPG/open-world modules, light/heavy setting scope, or lore-dump repair.

Minimum packet:

- world promise: what fantasy the setting offers in one sentence
- player position: what the player can enter, refuse, change, risk, carry,
  reveal, hide, spend, or unlock
- core world rule: the rule that turns lore into choices
- relationship/faction network: nodes with wants, player leverage, costs,
  pressure moves, and route use
- locations: only places with access rules, resources/risks, faction ties, and
  return hooks
- state model: compact fields that change access, behavior, risk, route, or cost
- route seeds: triggers, world pressure, player leverage, unlocks, costs, memory,
  and renewed hooks
- exposition policy: how lore appears through objects, demands, consequences,
  witnesses, or contradictions

If a card starts with calendars, factions, history, species, magic schools, or
proper nouns, repair the world engine before adding more lore.

### 5. Play engine

Game-like cards need runnable rules, not a rulebook. Use
`play-engine-design.md` when RPG, adventure, open-world, survival,
investigation, sandbox, or simulator cards have stats, resources, inventory,
quests, combat, compact state, turn protocol, or failure behavior that does not
change play.

Minimum packet:

- play promise: what the player can repeatedly do under pressure
- player position and controls: what the player can spend, risk, refuse,
  retreat from, investigate, bargain with, unlock, carry, or change
- compact state model: only fields that change choices, cost, access, risk,
  reward, relationship, or route state
- resource rules: what spending, saving, losing, or gaining each resource changes
- quest/risk model: triggers, objectives, approaches, costs, rewards, failure
  outcomes, memory, and renewed hooks
- turn protocol: resolve player action, update state, narrate result, present
  next pressure, and offer meaningful paths
- failure-forward behavior: consequences that keep the session playable

If a card's opening reads like a manual, define the play engine before polishing
the welcome. Put durable rules in detail; make the welcome prove one runnable
turn.

### 6. Player agency / insertion space

Agency is not the same as adding choices. The player needs room to decide
identity, emotion, intention, method, boundary, or route without the role taking
those decisions away.

Use `agency-design.md` when the player can only watch, choices are decorative,
routes funnel, the welcome narrates what the player feels or does, or the role
overrides refusal.

Minimum packet:

- agency promise: what the player can affect
- player insertion space: identity, emotion, intention, method, and boundary
  left open for the player
- interaction hooks: knowledge, access, resource, relationship, interpretation,
  boundary, or change authority
- reply-path matrix: accept, question, refuse, redirect, test, or escalate, with
  a distinct role response for each
- consequence checks: what changes in state, access, relationship, risk, or next
  hook
- card must not decide: feelings, consent, commitments, actions, or route choice
  that belong to the player

### 7. Second-turn engine

Design the first two turns together:

```text
Turn 0: welcome creates the hook and reply path.
Turn 1: role response reacts to the user and changes something.
Turn 2: the role can escalate, reveal, complicate, or offer a route without
waiting for the user to invent the whole plot.
```

Before rendering, write one likely first user message and the role's intended
second-turn move. If the second turn only restates setup, the card needs stronger
consequence or role initiative.

### 8. State economy

Track only state that changes play. Good state is compact, visible when useful,
and tied to consequences.

When state itself is the blocker, use `state-economy-design.md` and create a
State economy packet with candidate fields, visible/hidden/detail-only decisions,
update triggers, omitted decorative meters, agency guardrails, placement, and
handoff. Use `lunatalk-state-economist` before longplay, presentation, or final
fields when the card has unclear state rules or bloated status panels.

Useful state types:

- relationship: trust, suspicion, intimacy, debt, rivalry, loyalty
- world: time, location, danger, faction alert, route progress
- resource: supplies, stamina, money, clues, reputation, magic, crew morale
- promise: secret fragments, vows, taboos, unresolved choices

Avoid decorative state that never updates. A state panel that does not affect
future turns wastes tokens and attention. Do not store player feelings, consent,
loyalty, actions, guilt, confession, desire, or final route choice as state.

### 8. Voice fingerprint

Voice should be executable without relying on vague adjectives. Define:

- sentence rhythm: short cuts, layered clauses, clipped replies, ceremonial tone
- vocabulary: address terms, recurring metaphors, technical words, slang, taboo
  terms, what the role refuses to say
- emotional tells: what changes when embarrassed, cornered, angry, relieved, or
  afraid
- action beats: what the role does while speaking
- refusal style: how the role sets boundaries while staying in character

Do not stop at "gentle", "witty", "cold", "natural", or "human-like". Those are
labels, not instructions the model can reliably execute.

For voice-heavy, romance, companion, assistant, or ensemble cards, use
`voice-calibration.md` to create voice cards, micro-samples, response-mode rules,
and blind-line checks. Ensemble cards should not rely on one strong speaker while
the rest of the cast remains generic.

When voice is the primary requested repair, use `lunatalk-voice-director` before
field drafting. It should produce a voice-director packet with current failure,
voice promise, rhythm, vocabulary, emotional tells, refusal style, catchphrase
policy, response-mode grid, talkExample decision, blind-line test, pressure
probes, field patch targets, and token tradeoff.

When the voice card is already coherent but the prose surface is not, use
`lunatalk-language-stylist` instead of redesigning the voice. It should produce a
language-style packet with target locale, language failures, pronoun/address
matrix, field pass, rewrite rules, verification checklist, and handoff.

### 9. Route seeds

Give the card enough branches to stay replayable without writing a full novel.
Most cards need 2-4 route seeds:

- closer: trust, confession, alliance, intimacy, tutoring, cohabitation
- conflict: accusation, betrayal, rivalry, taboo, public exposure, failed mission
- exploration: new room, clue, location, faction, ritual, hidden system
- mastery: rules learned, resource optimized, rank gained, artifact crafted

Each route seed should have a cost or tradeoff. Choices without cost feel like a
menu; choices with cost create memory.

### 10. Token tradeoff ladder

Spend tokens in this order:

1. Durable engine in `roleDetailDesc`.
2. First playable scene in `roleWelcome`.
3. Compact examples only when they teach voice or output format.
4. Visual structure through XMLV3/Theme V3 when it improves agency or state
   visibility.
5. Decorative prose last, and only if it also improves mood or action clarity.

When forced to shorten, preserve desire, contradiction, boundary, world rule,
state, route costs, voice, and consequence first. Cut repeated lore, synonym
lists, ornamental CSS, and NPC catalogs that do not affect the next few turns.

When the card has a high `welcomeToDetailRatio`, a very long `roleWelcome`, or
durable rules hidden in the first screen, produce a token architecture packet
before further writing. The packet should name target allocation, field triage,
keep/move/cut/rewrite decisions, visual budget, state budget, example budget, and
rerun checks.

### 11. Visual affordance

Visual design should answer at least one of these:

- What can the player do next?
- What state changed?
- What mood or risk frames this scene?
- Which route or mode is currently active?

If XMLV3/Theme V3 looks good but does not clarify action, state, or atmosphere,
compress it and spend the saved tokens on the engine.

### 12. Material distillation

When an author provides notes, files, drafts, or a large world bible, do not turn
the source into a long summary. First create a source-to-play map:

- what fantasy and player role the source supports
- which facts create choices, costs, routes, state, voice, or consequence
- what belongs in `roleDetailDesc`
- what belongs in the first scene
- what should be delayed, merged, renamed, or cut

Use `material-distillation.md` before blueprinting or authoring if the agent
would otherwise need to read a large source pack while drafting.

### 13. Boundary design

When a card is mature, adult, emotionally intense, horror-leaning, jealous,
power-imbalanced, or consent-sensitive, create a boundary packet before writing
the provocative parts:

- rating intent and explicitness ceiling
- player agency contract
- allowed pressure tools and disallowed moves
- escalation ladder with gate and slowdown signals
- refusal behavior, stop conditions, and safer fallback
- first-scene guardrails and simulation probes

Use `boundary-design.md` before blueprinting or authoring when intensity could
otherwise become player-agency takeover or vague disclaimers.

### 14. Opening direction

When the current task is mostly about `roleWelcome`, treat it as a first-turn
design problem before rewriting the whole card. Use an opening packet:

- current failure
- opening promise
- player role
- place/time, role action, pressure, player implication, and reply paths
- expected first user message
- second-turn move
- what changes
- token tradeoff

Use `opening-design.md` when a welcome is greeting-only, a lore tour, a menu with
no scene, an ensemble roll call, or a pretty first screen with no next move.
The repair should make the first screen playable and the second turn stronger;
it should not add more exposition to a weak greeting.

### 15. Longplay design

When the opening works but the card dies after a few turns, treat it as a
longplay problem before adding more lore or sample dialogue. Use a longplay
packet:

- continuity spine
- progression phases
- compact state model
- route seeds with trigger, cost, unlock, memory, and renewal hook
- memory threads
- role initiative for passive, resistant, route-changing, and returning players
- continuation probes
- token tradeoff

Use `longplay-design.md` when a card repeats setup, waits for the player to invent
every beat, forgets choices, has decorative state, restarts every session, or
cannot name what changes after the opening.

### 16. Card series and variants

When one character or setting could become several cards, plan the series before
writing fields. Use `card-series-design.md` to decide what to keep, merge, or
reject. A variant needs a different playable contract, not only a different mood,
costume, season, or intensity level.

Minimum packet:

- shared core: identity, desire, contradiction, boundary, player leverage,
  relationship asymmetry, voice baseline, and reusable motifs
- variant map: keep, merge, reject
- variant contracts: primary archetype, player promise, unique pressure, opening
  proof, longplay loop, boundary posture, token target, and field allocation
- overlap risks: duplicate opening, same second-turn move, copied lore, same
  player role, same route loop, or vague generator/helper behavior
- authoring order and cost-aware validation / render / simulation plan

Author the anchor card first. Add a secondary variant only when it can prove a
different loop. Stop before the set becomes thin copies of the same card.

## Moonloom Self-Review Minimums

Moonloom should aim above these minimums before it asks MCP to render or simulate
a real private card:

1. `roleDesc` sells the premise in one compact sentence: who, relationship, and
   tension.
2. If the public profile is weak, a profile package packet preserves the engine
   and defines selected `roleName`, selected `roleDesc`, concrete tags, and a
   first-impression check before field assembly or publish readiness.
3. `roleDetailDesc` is long enough to act as an engine, not a label. Include
   identity, desire, contradiction, boundaries, speech style, and progression
   rules.
4. Speaking style is explicit and executable: sentence length, rhythm, vocabulary,
   address terms, emotional tells, restraint, and what the role avoids saying.
5. Voice texture is not just a mood label. Avoid stopping at "natural",
   "gentle", "witty", or "like a real person"; state how that voice appears in
   actual replies.
6. Progression is explicit: what player choices change, which state can move,
   and how the next hook renews.
7. Role initiative is explicit: what the role asks, reveals, escalates, or offers
   when the player is passive or stalls.
8. `roleWelcome` gives a clear first action path through choices, a direct
   question, or an explicit "you can..." affordance.
9. `roleWelcome` is not only a menu. It opens with concrete sensory/location
   context, a role beat, pressure, and a reason the player is implicated.
10. Before render or simulation, the author can name one likely first user reply
   and one second-turn move that changes state, relationship, risk, route, or
   information.
11. Long-session cards can name a continuity spine, compact state model, route
    seeds, memory threads, and return-later behavior.
12. Related card sets can name the shared core, each kept variant's distinct
    playable contract, and which proposed variants were merged or rejected.
13. `zh-Hant` / `zh-TW` cards use Traditional Chinese consistently in profile,
    detail, welcome, and examples. If the issue includes register drift,
    pronoun/address mismatch, translated cadence, mixed-language tags, or
    field-to-field wording mismatch, create a language-style packet before final
    field assembly.

These are writing checks. Do not wait for `validate_role` to enforce them.

## Agent Repair Dimensions

Repair the card in this order during Moonloom self-review:

1. Promise: make the premise readable in three seconds.
2. Anchor: add the durable identity, desire, contradiction, boundary, and voice
   anchors that prevent generic drift.
3. Character core: use a character-core packet when the role is trope-only,
   mood-only, passive, or missing player leverage and pressure behavior.
4. World engine: use a world-engine packet when factions, locations, rules,
   relationship networks, or lore do not yet create player action and consequence.
5. Play engine: use a play-engine packet when RPG/adventure/sandbox/survival/
   investigation mechanics have stats, resources, inventory, quests, combat,
   compact state, or failure behavior that do not yet produce runnable turns.
6. Voice texture: replace generic tone labels with executable voice behavior.
7. Consequence: define what changes when the player acts.
8. Role initiative: add proactive turn rules for passive or stalled player input.
9. Agency: make the first reply path obvious.
10. Agency design: when the player can only watch, choices are decorative, routes
   funnel, or the card narrates player feelings/actions, create or preserve an
   agency packet before opening or longplay repair.
11. Opening scene: add location, time, sensory detail, role beat, pressure, and
   player implication before choices.
12. Opening direction: create or preserve an opening packet with first reply
   paths, expected first user message, second-turn move, and token tradeoff.
13. Longplay: create or preserve a longplay packet with continuity spine, state,
   route seeds, memory, role initiative, and continuation probes.
14. Player agency: remove rules that decide the player's actions, feelings,
   consent, or commitments.
15. Language style: create or preserve a language-style packet when script,
    register, pronouns, address terms, mixed-language tags, or field mismatch is
    the narrow weak layer. Rewrite Simplified Chinese terms into Traditional
    Chinese while preserving names, tone, XMLV3 tags, JSON keys, and the existing
    engine.
16. Archetype: satisfy the chosen card type rather than writing a generic card.
17. Token efficiency: move reusable visual or rule structure out of welcome when
   it costs more tokens than it adds play value.
18. Material distillation: convert notes, files, or world bibles into a playable
    source-to-play map before drafting fields.
19. Boundary design: convert mature, intense, horror, jealous, or power-
    imbalanced pressure into rating, explicitness, agency, escalation, refusal,
    fallback, and probe mechanics.
20. Card series: when several related cards are proposed, create a series packet
    before blueprinting individual cards; merge or reject variants that do not
    prove a distinct player promise.

Do not treat a single high validation result as enough. A card with weak agency
or weak consequence still needs repair even if it has polished prose.

For `archetype` repairs, match the card type:

- Companion / relationship: add relationship history, emotional pressure,
  contradiction, boundaries, and trust pacing.
- Story / scenario: add named locations, stakes, likely branches, and route
  consequences.
- Game / RPG / simulator: add a play-engine packet with compact state, resource
  rules, turn protocol, failure-forward behavior, and an opening setup/state/
  choice surface.
- Daily-life / slice-of-life: add a daily-life packet with ordinary routine,
  small playable desire, tiny disruption, shared object/place, habit state,
  passive-player behavior, and second-turn change.

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

Top-card checks:

- The relationship has asymmetry: one side knows, needs, risks, or owes something
  the other does not.
- The role's boundary is clear enough that closeness has pacing.
- The first scene asks for a player decision, not just comfort or small talk.
- The second turn can reveal a secret, test a boundary, or create a practical
  consequence.

### Story / scenario card

Goal: make the player enter an ongoing situation.

Use:

- protagonist position
- starting conflict
- named locations and stakes
- 2-4 likely branches
- lightweight memory rules

Welcome should begin inside the scene, not at the character sheet.

Top-card checks:

- The setting creates scenes by rule, not only by description.
- The player has a position in the conflict: witness, suspect, heir, recruit,
  exile, investigator, rival, or caretaker.
- Branches change route state, not just scenery.
- Named places are useful only when the player can visit, lose, protect, unlock,
  or be trapped by them.

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

Top-card checks:

- The first turn can start even if the user gives minimal input.
- The system has defaults, commands, and a revision loop.
- Each generated result includes hooks or next actions, not only description.
- The card knows when to ask one clarifying question and when to proceed.

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

Top-card checks:

- The player has meaningful choices under pressure: spend, risk, retreat, bargain,
  scout, fight, hide, craft, recruit, or sacrifice.
- State is small enough to update every turn.
- Failure changes the world without ending the session too early.
- NPCs have motives and limits; they are not just quest signs.
- Rewards unlock new choices rather than only increasing numbers.

### Generator / creator assistant card

Goal: help the user produce an artifact.

Use `generator-design.md` or `lunatalk-generator-architect` before blueprinting
or authoring when artifact production is the primary loop, or when the draft is
advice-only, asks indefinitely, shifts output format, or lacks revision commands.

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

Top-card checks:

- The card produces a usable artifact in the same turn when the user gives enough
  input.
- The card offers defaults when the user skips intake.
- The revision loop has named operations such as expand, compress, change tone,
  add conflict, localize, or format.
- The quality rubric is part of the card's behavior, not only a note.

### Canon/IP adaptation card

Goal: preserve recognizable fantasy while avoiding brittle trivia dependence.

Use `originality-adaptation.md` or `lunatalk-originality-adapter` before
blueprinting or authoring when the author wants something like a canon/IP
character, fan premise, similar card, copied draft, or recognizable inspiration
but needs an original card. The goal is transferable fantasy, not a renamed copy.

Use:

- canonical premise and relationship
- stable voice/personality cues
- flexible scene framing
- fallback rules when canon is uncertain
- original substitutions for role identity, player role, pressure source,
  symbolic object, voice strategy, visual motif, state labels, and opening proof
- a distance check that proves the card is not the same scene with renamed nouns

Do not rely on the model "knowing everything." Put the facts needed for this card's
scene in `roleDetailDesc`. Do not copy exact names, quotes, scene text, outfits,
proper nouns, faction names, or unique mechanics unless the author explicitly
wants an allowed canon/fan card and the usage stance is clear.

### Daily-life / slice-of-life card

Goal: make low-stakes scenes emotionally playable instead of flat.

Use `daily-life-design.md` when this recipe is the primary shape.

Use:

- one ordinary routine with a hidden pressure
- one small playable desire and one tiny disruption
- one shared object or place that can return changed later
- compact habit state that affects the next routine
- a relationship or habit that can change slowly
- small choices that reveal preference, trust, embarrassment, jealousy, comfort,
  avoidance, or shared history
- sensory anchors: room, weather, food, object, sound, task, or time of day

Top-card checks:

- The scene has a reason to start now even if the premise is quiet.
- The role wants something small but specific.
- The first turn gives the player a natural action: help, tease, refuse, ask,
  notice, hide, offer, leave, or change the plan.
- The second turn shows one small concrete change in habit, object, boundary,
  next meeting, trust, distance, or routine order.
- Progression comes from accumulated tiny changes, not sudden melodrama.

### Light-setting card

Goal: provide a clean fantasy or relationship frame without overloading the
player with lore.

Use:

- one core rule or hook
- one main location
- one role relationship
- one progression path
- no more lore than the first scene can use

Top-card checks:

- A new player understands the premise from `roleDesc` and the first screen.
- The welcome does not require reading a manual.
- Detail contains enough behavior anchors to prevent generic drift.
- Extra lore is introduced only when it creates a new choice or consequence.

### Heavy-setting / lore-rich card

Goal: make a large world playable through modular structure.

Use:

- a compact summary before deep lore
- modules for rules, factions, places, routes, history, and output behavior
- a clear player position inside the setting
- state rules that decide what lore becomes relevant next
- named entities only when they can affect play

Top-card checks:

- The first scene works even if the player ignores most lore.
- Long lore is organized by how it is used in play.
- Each faction, location, or system creates a possible action, obstacle, cost, or
  reward.
- Token-heavy sections are justified by future behavior, not worldbuilding pride.

### Ensemble / multi-character card

Goal: support multiple characters without losing voice, agency, or focus.

Use:

- 2-5 active core roles for most cards
- a cast table with motive, relationship to player, speech cue, and conflict
- clear turn ownership: who speaks first, who interrupts, who hangs back
- scene rules for introducing secondary roles gradually
- memory rules for alliances, suspicion, promises, and unresolved conflicts
- one compact voice card or micro-sample for each core speaker when voices may
  blur together

For complex ensemble cards, create an ensemble packet before writing fields. It
should decide cast keep/merge/cut, player leverage, conflict network, spotlight
rules, group tension state, opening focus, voice contrast, token plan, and agency
probes. Use `lunatalk-ensemble-director` when these decisions are not already
clear.

Top-card checks:

- Each core role has a distinct desire and speech fingerprint.
- The card does not let the cast drown out the player.
- The welcome starts with one focal interaction, not a roll call.
- Group conflict creates choices: side with, mediate, hide, expose, split up,
  bargain, or leave.
- A blind-line test can identify the speaker from rhythm, motive, or pressure
  behavior without needing the name.

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
fill it with generic dialogue. For ensemble cards, prefer compact micro-samples
over a long scene that showcases only the loudest character.

Use `talk-example-design.md` or `lunatalk-talk-example-curator` when the main
question is whether to omit examples, add micro-samples, or include a full
format example. Every sample needs a job and token payment; it must not repeat
the welcome or decide the player's feelings/actions.

### `jailbreak`

Use sparingly. Prefer explicit behavior rules in detail. Only add jailbreak text
when the card needs stable formatting or style constraints that repeatedly fail.
Use `instruction-guardrails.md` before any `role_patch_jailbreak` patch, and do
not use jailbreak as a shortcut for weak character core, missing voice, bad
opening, weak longplay, unsafe boundaries, or generic card quality.

## Common failure patterns

- Pretty prose with no player action.
- Generic "Hello, I am X, what do you want to do?" openings.
- A long world bible in welcome.
- Imported or pasted source material copied into the role instead of distilled
  into playable rules, state, first scene, and route seeds.
- Boundary-sensitive card that says "respect consent" but has no explicitness
  ceiling, escalation ladder, refusal route, stop conditions, or safer fallback.
- Generic relationship labels without concrete tension.
- The AI is instructed to decide the player's actions.
- State panels that are never updated.
- HTML/CSS decoration that makes the card harder to read.
- Many NPC names but no immediate scene.
- Ensemble cast members who share the same narrator voice and differ only by
  name or catchphrase.
- Canon card that assumes model memory instead of encoding needed facts.
- Helper/generator card that asks vague questions, gives advice only, changes
  output schema, forgets the previous artifact, or never outputs a finished
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

Use `conversation_inspect.evaluation` to triage failures after accepted
conversation sends:

- `responsePresence`: the reply is empty, too short, or too generic.
- `agency`: the reply does not give the player a concrete next move.
- `progression`: the reply does not change scene, relationship, route, risk, or
  state.
- `safetyFormat`: the reply leaks system/model artifacts or breaks the in-world
  frame.
