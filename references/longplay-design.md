# Moonloom Longplay Design

Use this reference when a LunaTalk role card has a good first scene but cannot
sustain play. Longplay design turns the card from a single prompt into a compact
engine for repeated scenes, remembered choices, route pressure, and renewal.

## Core rule

Design the loop after the opening:

```text
Choice -> consequence -> memory thread -> progression -> renewed hook
```

The card should not need the player to invent every next beat. The role needs
enough durable rules to react, remember, escalate, redirect, and create a new
playable situation without stealing player agency.

## Longplay packet

Return this packet before patching `roleDetailDesc`:

```text
Longplay packet:
- current failure:
- longplay promise:
- card shape:
- continuity spine:
- progression phases:
- state model:
- route seeds:
- memory threads:
- role initiative:
- passive / stalled player behavior:
- scene renewal rules:
- continuation probes:
- detail patch targets:
- token tradeoff:
```

This packet should be concrete enough that `lunatalk-card-author` can patch the
durable engine without rereading the whole design conversation.

## Continuity spine

The continuity spine is the one sentence that explains why the next scene should
exist.

Good spine:

```text
Each player choice changes [relationship/world/resource], forcing [role] to
respond through [route pressure] while [external pressure] moves closer.
```

Weak spine:

```text
The role keeps talking to the player and interesting things may happen.
```

If the spine does not name what changes, the card will drift or repeat the
opening mood.

## Progression phases

Use 3-6 phases. A phase is not a chapter title; it is a behavior mode with a
trigger and a new kind of pressure.

```text
Phase | Trigger | Role behavior | Player leverage | Unlocks | Risk
```

Common phase shapes:

- opening pressure: first commitment, clue, demand, mistake, or test
- trust / suspicion: relationship state starts affecting access and tone
- route choice: player leans closer, conflicts, explores, or masters a system
- consequence: a prior choice changes social, emotional, practical, or world state
- reversal: the role must reveal, retreat, ask for help, or test a boundary
- renewal: a new scene starts from the remembered unresolved hook

Do not require the phases to happen in a fixed order unless the card is a linear
scenario. Most role cards need flexible progression, not a railroad.

## State economy

Track only state that changes future turns. A useful state field answers:

- What can the player do because this changed?
- How should the role behave differently?
- What new cost, route, risk, or access appears?

Useful state types:

- relationship: trust, suspicion, intimacy, rivalry, debt, loyalty
- pressure: clock, danger, public attention, fatigue, exposure, taboo risk
- route: closer, conflict, exploration, mastery, refusal, alliance
- world: location, faction stance, clue, resource, reputation, unlocked place
- promise: secret, vow, boundary, favor, unresolved question, shared routine

Avoid:

- decorative meters that never change behavior
- too many stats for non-game cards
- hidden state that contradicts visible player agency
- memory fields that store everything instead of decisions that matter

## Route seed grammar

Write route seeds as playable contracts:

```text
Route:
- trigger:
- role pressure:
- player leverage:
- unlock:
- cost:
- memory left behind:
- renewal hook:
```

A route without a cost is just a menu. A route without memory is just scenery.
Most cards need 2-4 route seeds.

When the longplay loop is player vs narrator, system, rule, institution, fate,
or NPC authority, preserve an authority opposition axis across route seeds and
recurring option sets. Include at least one obey/comply/順從 route and at least
one resist/oppose/對抗 route. In short: at least one obey/comply option and at
least one resist/oppose option, then vary the tone axis separately. A playful or
absurd option is not automatically resistance if it still obeys the system.
For option sets, require at least one resist/oppose option when authority is the
opposing force.

## Role initiative table

Use this table to prevent the role from waiting:

```text
Player behavior | Role move | What changes | Next hook
accepts hook    |           |              |
asks question   |           |              |
resists         |           |              |
is passive      |           |              |
changes route   |           |              |
returns later   |           |              |
```

The role move should be in character: reveal, ask, test, offer, pressure,
withdraw, change location, introduce a cost, or call back a memory thread.

## Memory threads

Keep memory playable. Track:

- choices the player made that should be respected later
- promises, terms, boundaries, debts, or refusals
- secrets revealed or still withheld
- relationship state changes
- unresolved practical problems
- recurring objects, places, habits, or rituals that can restart play

Do not track every line. Memory should make later scenes cheaper and sharper.

## Scene renewal

Every scene should end with one renewal hook:

- a changed relationship beat
- a route offer with a cost
- a new clue, risk, location, or obligation
- a practical task that the player can accept, refuse, or reshape
- a callback to a prior promise, secret, boundary, or unresolved question

If the role says "what now?" after every exchange, the longplay engine is weak.

For plot-driven cards, every scene also needs a next-station hook. A next
station is a concrete route pointer: the next place, person, clue, object,
decision, deadline, task, or consequence that can move play beyond the current
beat. The role/narrator owns story direction while the player owns method,
stance, consent, and route choice.

Anti-pattern: do not enforce renewal with turn count, round count, 第幾輪, or rules such as
"same scene for 1-2 turns." Those rules are brittle because the model may not
count visible history reliably and they can rush a player who wants to linger.
Use stateless renewal instead: keep the forward door open in the current reply,
make one concrete change, and offer one next station that remains optional or
contestable.

## Archetype recipes

### Companion / relationship

- State: trust, friction, debt, intimacy, boundary, shared routine.
- Routes: closer, conflict, repair, distance, alliance, confession.
- Renewal: return to a shared object, private place, promise, or unresolved hurt.
- Failure to avoid: the role only seeks comfort and never creates a new beat.

### Story / scenario

- State: clue, danger, public attention, location, suspect/faction stance.
- Routes: investigate, hide, accuse, protect, bargain, betray.
- Renewal: a consequence from a prior choice changes access or risk.
- Failure to avoid: every scene becomes exposition instead of changed stakes.

### RPG / open-world

- State: location, time, resources, risk, faction stance, quest progress.
- Routes: travel, fight, negotiate, craft, recruit, retreat, sacrifice.
- Renewal: show compact state before the next choice.
- Failure to avoid: too many stats for the role to update reliably.

### Daily-life / slice-of-life

- State: habit, mood, weather, task, small favor, repeated place, trust.
- Routes: help, tease, avoid, notice, confess, repair, change plan.
- Renewal: a small object or routine returns with a changed meaning.
- Failure to avoid: quiet mood with no small desire or consequence.

### Ensemble

- State: alliances, suspicion, promises, group tension, turn ownership.
- Routes: side with, mediate, expose, protect, split up, bargain.
- Renewal: one cast member acts on the last unresolved group consequence.
- Failure to avoid: cast dialogue replaces player agency.

### Generator / assistant

- State: artifact version, constraints, accepted choices, rejected options.
- Routes: expand, compress, reframe, localize, format, test, publish.
- Renewal: every reply should produce or revise an artifact.
- Failure to avoid: endless intake questions, advice-only replies, schema drift,
  or forgotten artifacts. Use `generator-design.md` when this is the weak layer.

## Detail patch template

Add this to `roleDetailDesc` when a card dies after the opening:

```text
Longplay engine
- Continuity spine:
- Progression phases:
- State to track:
- Route seeds:
- Memory threads:
- Passive-player behavior:
- Scene renewal rule:
  - Next-station hook:
```

Keep it compact. Prefer durable behavior rules over long sample scenes.

## Continuation probes

Use these before paid simulation, or as the probe plan for
`conversation_send_message` plus `conversation_inspect` when the author accepts
normal billing:

```text
Continuation probes:
1. Hook probe:
2. Passive probe:
3. Route-change probe:
4. Continuity probe:
5. Renewal probe:
```

Pass means the role changes relationship, state, route, risk, artifact, or
information, then offers a new playable hook.

## Failure repairs

| Failure | Repair |
|---|---|
| Good opening, dead third turn | add continuity spine, state model, and role initiative |
| Role waits for the player | add passive-player and stalled-scene behavior |
| Choices do not matter | add route costs and memory left behind |
| Session restarts from premise | add return-later behavior and unresolved hooks |
| Too many stats | cut to state that changes behavior every few turns |
| Relationship stays flat | add trust/friction/debt changes and route pressure |
| Lore never becomes action | convert lore into clue, risk, place, faction, or cost |
| Ensemble loses focus | add turn ownership and group-tension memory |

## Longplay self-review

Before handoff, answer:

- Can the role create a next beat when the player is passive?
- Does at least one state field change every 2-3 turns?
- Do route seeds have triggers, costs, unlocks, and memory?
- Can a later session restart from the last unresolved hook?
- Does memory preserve player choices without deciding their feelings or consent?
- Is the state model compact enough to update reliably?
- Does the token plan spend detail on durable behavior, not ornamental lore?
