# Moonloom Role Detail Engine

Use this reference when `roleDetailDesc` is too thin, biography-heavy, padded,
or scattered across welcome, examples, and visual markup. The goal is to turn
detail into the durable operating engine that keeps a LunaTalk role consistent
after the first screen.

## Core Rule

`roleDetailDesc` is not a character bio. It is the role's runbook:

```text
identity -> motive -> pressure -> relationship -> world/play functions ->
voice -> consequence -> longplay -> scene reservoir -> boundaries ->
format stability
```

Do not pad. Fill detail only while each section buys future behavior, route
memory, state change, voice control, or agency protection. Stop when the next
section would only repeat mood, lore, or adjectives.

## Every-Turn Iron Laws

Put a compact 5-7 item every-turn iron laws block near the top of any long
`roleDetailDesc` for a high-ambition story, scenario, RPG, system, or
meta-narrative card. This protects the most important behavior from attention
dilution in long prompts and gives the model a primacy anchor before lore,
voice, and scene reservoirs.
This is explicitly an attention dilution guardrail for instruction-following.

For zh-Hant and other CJK-heavy fields, remember that the platform limit is a
character cap / character-count cap. Leave buffer under the hard cap so final
format checks, hidden state rules, and MCP patching do not push the field over
the limit.

For plot-driven cards, include a **Narrative progression engine**:

1. **Inciting incident:** within the first 1-2 assistant turns, the role,
   narrator, system, or world must ignite a main line with an external goal,
   pressure, route, risk, or obligation. Do not let the card remain in
   goal-less daily chatter unless daily-life is the primary contract.
2. **Next station:** every assistant turn must leave one concrete next station:
   a reachable place, route, clue, person, object, task, deadline, or decision
   that points beyond the current beat.
3. **Progression and responding to the player are separate duties:** the
   assistant answers the player's move, then also moves the story one step. The
   player chooses how to act; the role/narrator owns story direction.
4. **Do not make the player open the new scene:** if the player is passive,
   evasive, joking, or off-path, the role/narrator still introduces a playable
   next situation while preserving player agency.
5. **State change over mood loop:** each turn should change relationship, route,
   risk, clue, location/access, resource, boundary, or obligation. If only mood
   changes, add a concrete affordance.
6. **Output contract:** when XMLV3/state is part of the card, include compact
   hidden state updates and visible player-facing meaning without turning the
   reply into a dashboard.

Do not write turn-count rules as the enforcement mechanism. Anti-pattern:
"same scene for 1-2 turns," "after three turns move on," "on turn 5 reveal the
secret," or any rule that depends on the model counting history, round count, or
第幾輪. The model may not reliably see or count enough history, and hard turn
timers can rush players who want to linger. Prefer stateless, per-turn rules:
keep the forward door open, leave a next station, and make the current turn
self-contained enough that it can progress from whatever context is visible.

## When To Use

Use a detail engine pass when any of these are true:

- `roleDetailDesc` is short for the card's language, ambition, or archetype.
- The card has a thin biography: history, personality labels, or mood, but no
  runnable behavior under pressure.
- The first turn is strong, but later turns drift, wait passively, or forget the
  promise.
- Durable rules live inside `roleWelcome`, HTML/XMLV3 panels, or long examples.
- The author asks for a high-quality, top-card-level, full-detail, deep-setting,
  longplay, or less-empty role.

If the issue is only field allocation or compression after a complete engine
exists, use `token-economy.md`. If the issue is long-prompt attention dilution,
cross-model instruction-following drift, or raw detail / raw description
Markdown structure, read `prompt-attention-architecture.md` before final detail
assembly. If the issue is where `roleDetailDesc`, `RoleUserName`, current user
input, summaries, and near-generation rules sit in a one-shot Prompt V2 layout,
read `one-shot-prompt-runtime.md`; detail is a pre-history runtime contract, not
the final instruction before generation. If the role's appeal, world,
relationship, play rules, agency, voice, or longplay layer is not designed yet,
preserve that narrow packet before final detail assembly.

## Language-Aware Detail Budget

Use language-aware detail budget as a craft target, not a padding order.

- Non-English cards with 10,000-character `roleDetailDesc` limits often need
  5,000-10,000 characters for story, relationship, world, ensemble, RPG, system,
  or generator engines.
- English cards with 50,000-character `roleDetailDesc` limits need more
  characters for the same engine depth. Use word/token proxy and behavior
  coverage rather than Chinese character-count intuition.
- Light-setting or intimate companion cards can be shorter, but they still need
  motive, relationship rules, voice, initiative, boundaries, and progression.

Treat the lower edge of the budget band as a target floor for complete,
high-ambition drafts. A non-English complete card fixture, public benchmark, or
top-card-level draft below 5,000 detail characters is usually not finished yet
unless the card is intentionally light-setting and every engine module is
already proven by simulation. This is a writing-quality signal, not a server
validation rule.

A long detail is only justified when modules change future turns. A short detail
is acceptable only when it can still pass the engine coverage check below.

## Benchmark Pattern Calibration

When a task includes a provided benchmark pattern packet, read
`benchmark-pattern-calibration.md` before expanding detail. Use benchmark pattern
calibration to translate aggregate plus deep-reading evidence into safe craft
targets. Moonloom only consumes already-sanitized pattern packets; it does not
define how to gather, rank, or choose non-public source material:

- ordinary-card contrast: identify whether the weaker draft stops at biography,
  ability lists, mood, or a setup form instead of a runnable engine.
- bilingual budget translation: judge English and non-English drafts by module
  coverage and language budget, not by copying the same character-count target.
- detail density: keep only sections that change future behavior, route, state,
  consequence, voice, or agency.
- scene reservoir: preserve reusable scene seeds, triggers, and turn recipes so
  later replies do not become abstract mood or repeated setup.
- presentation gap: if HTML-like grouping was doing real work, move the
  structure into XMLV3 layout or Theme V3 guidance instead of hiding durable
  rules in visual markup.

Do not paste benchmark wording, exact markup, names, or source provenance into
detail. The output should be an original operating engine for the current card.

## Detail Engine Packet

Return this packet before writing or patching a large `roleDetailDesc`:

```text
Detail engine packet:
- current failure:
- language / budget target:
- card shape:
- existing packets preserved:
- engine modules:
  - identity and core charm:
  - background and motive:
  - current pressure:
  - narrative progression engine:
  - player relationship:
  - world / scenario / play functions:
  - proactive turn behavior:
  - voice and action logic:
  - emotional reactions:
  - longplay hooks:
  - scene reservoir / turn recipes:
  - time and consequence:
  - secret and reveal plan:
  - player insertion space:
  - agency boundaries:
  - format stability:
- field placement:
  - roleDetailDesc:
  - roleWelcome:
  - talkExample:
  - XMLV3 / Theme V3:
- compression stance:
- validation / render / simulation probes:
- handoff:
```

## Engine Modules

### Identity And Core Charm

State what makes the role memorable as behavior. Replace labels such as quiet,
cold, powerful, sweet, mysterious, or chaotic with how the role acts when they
want something, hide something, or are challenged.

### Background And Motive

Keep history only when it changes play. Every backstory item should explain a
current want, fear, debt, skill, taboo, relationship pressure, or available
route.

### Current Pressure

Name what starts now: a timer, visit, demand, lost object, secret, threat,
promise, test, deadline, debt, ritual, accident, or social consequence. Without
current pressure, detail becomes static lore.

### Player Relationship

Define who the player is allowed to be relative to the role: witness, partner,
client, rival, caretaker, student, suspect, recruit, stranger, cohabitant,
operator, or creator. Include what the player knows, controls, risks, withholds,
or can change.

### World / Scenario / Play Functions

Convert setting into functions:

- faction -> want, cost, leverage, pressure move
- location -> access rule, risk, resource, return hook
- object -> use, loss, clue, promise, debt
- resource -> what spending, saving, losing, or gaining changes
- clue -> what it unlocks and what false assumption it complicates
- rule -> what choices it creates, forbids, delays, or prices

Do not include calendars, species lists, maps, NPC catalogs, or terminology that
does not change access, behavior, risk, route, cost, state, or relationship.

### Proactive Turn Behavior

Specify what the role does when the player is passive, brief, evasive,
resistant, curious, boundary-setting, or route-changing. The role should ask,
reveal, escalate, offer, test, delay, bargain, protect, or complicate instead of
waiting for the player to carry every beat.

### Voice And Action Logic

Write executable voice instructions: sentence rhythm, vocabulary, address terms,
metaphors, emotional tells, action beats, refusal style, and avoided phrasing.
Tie voice to pressure so it changes under trust, fear, embarrassment, anger,
relief, or suspicion.

### Emotional Reactions

Define reaction logic, not only emotion labels. Include what the role admits,
deflects, hides, jokes about, turns into action, or refuses to name when the
player approaches, doubts, helps, mocks, refuses, or asks about the past.

### Longplay Hooks

List route seeds with triggers, costs, unlocks, memory, and renewed hooks. A
strong detail can name what changes by turn two, what can recur later, and what
the role remembers when the player returns.

### Scene Reservoir / Turn Recipes

Give the role concrete material to spend after the opening. A scene reservoir is
not a script and not a list of copied sample scenes; it is a compact inventory of
playable situations the model can recombine.

Use this grammar:

```text
Scene seed:
- trigger:
- place / object:
- role move:
- player leverage:
- state or relationship change:
- renewed hook:
```

Write 4-8 seeds for high-ambition cards, fewer for light cards. Cover normal,
passive, refusal, route-change, return-later, and pressure-spike situations when
the card shape needs them. Include at least one turn recipe for what the role
does after a short player reply:

```text
Turn recipe:
observe player move -> show concrete consequence -> make in-character move ->
offer one next action or sharper question
```

Add an explicit action-path closure rule for cards that failed simulation on
agency or next-move clarity:

```text
Action-path closure:
- every reviewed assistant turn's last visible block must return control to the
  player;
- close with either grouped choices, a direct in-character decision question, or
  a concrete affordance the player can act on now;
- it is not enough to end a turn on only mood, a twist line, a clue reveal, or a
  character statement unless it is immediately followed by the playable next
  move;
- if the turn reveals information, name what the player can do with it next:
  preserve / compare / ask / confront / leave / wait / risk / choose route.
```

This protects against abstract cards whose detail explains the mood but gives no
specific second or third scene to run. Keep seeds original, short, and modular.
Do not write long prose samples unless `talkExample` is the cheaper way to teach
voice or format.

### Time And Consequence

Define how time passes and what delay changes: location status, relationship
distance, suspicion, resource decay, faction alert, weather, deadline,
opportunity, debt, or risk. Consequences should continue play rather than end it.

### Secret And Reveal Plan

Secrets should create behavior before they are revealed. Define:

- what the role hides or misdirects
- what evidence can surface early
- what the player can ask, notice, test, or risk
- what changes when a secret is partially or fully revealed

Do not dump all secrets in the welcome. Detail should guide pacing.

### Player Insertion Space

Leave the player's feelings, consent, motives, exact action, and final route to
the player. Detail can pressure, invite, tempt, or constrain; it cannot decide.

### Agency Boundaries

State what the role must not narrate for the player: feelings, commitments,
consent, route choices, guilt, loyalty, desire, bodily action, or final
interpretation. Include refusal and slowdown behavior when needed.

### Format Stability

For cards with XMLV3, state, generator schemas, RPG turn protocols, or special
formats, keep the format rules compact and explicit. Put durable format rules in
detail, not hidden in the first-screen prose.

## Field Placement

- Put durable identity, relationship, world/play functions, voice, boundaries,
  longplay, state rules, and format stability in `roleDetailDesc`.
- Put only the playable first scene, immediate pressure, and first reply paths in
  `roleWelcome`.
- Use `talkExample` only when examples teach voice, refusal handling, output
  format, or turn protocol more cheaply than prose rules.
- Use XMLV3/Theme V3 for presentation and state visibility, not as the only place
  where durable rules exist.

## Self-Review

- Would the second turn be better than the first without inventing a new plot?
- Does each section change future behavior, state, route, voice, or boundary?
- Can the role act when the player gives a short or passive message?
- Does the detail include enough scene seeds or turn recipes to avoid abstract
  repeated setup after the opening?
- Can the player refuse, redirect, ask, test, or slow down without the card
  ending?
- Are secrets paced instead of dumped?
- Is time/consequence concrete enough to create memory?
- Does the detail protect player insertion space?
- Is the welcome shorter because the durable engine moved into detail?
- Is the English or non-English budget appropriate for the same engine depth?

## Repair Pattern

When detail is thin:

1. Preserve existing narrow packets and author taste.
2. Identify missing engine modules.
3. Expand missing modules with concrete behavior, not prose padding.
4. Add a small scene reservoir and turn recipe for the next few likely player
   moves.
5. Move durable rules out of welcome or examples.
6. Compress repeated mood, biography, and lore that do not affect play.
7. Rebuild welcome only if it was carrying the engine.
8. Validate, render, and simulate after the detail can sustain later turns.
