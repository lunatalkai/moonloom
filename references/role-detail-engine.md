# Moonloom Role Detail Engine

Use this reference when `roleDetailDesc` is too thin, biography-heavy, padded,
or scattered across welcome, examples, and visual markup. The goal is to turn
detail into the durable operating engine that keeps a LunaTalk role consistent
after the first screen.

## Core Rule

`roleDetailDesc` is not a character bio. It is the role's runbook:

```text
identity -> motive -> pressure -> relationship -> world/play functions ->
voice -> consequence -> longplay -> boundaries -> format stability
```

Do not pad. Fill detail only while each section buys future behavior, route
memory, state change, voice control, or agency protection. Stop when the next
section would only repeat mood, lore, or adjectives.

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
exists, use `token-economy.md`. If the role's appeal, world, relationship, play
rules, agency, voice, or longplay layer is not designed yet, preserve that narrow
packet before final detail assembly.

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
  - player relationship:
  - world / scenario / play functions:
  - proactive turn behavior:
  - voice and action logic:
  - emotional reactions:
  - longplay hooks:
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
4. Move durable rules out of welcome or examples.
5. Compress repeated mood, biography, and lore that do not affect play.
6. Rebuild welcome only if it was carrying the engine.
7. Validate, render, and simulate after the detail can sustain later turns.
