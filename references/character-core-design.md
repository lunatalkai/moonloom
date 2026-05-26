# Moonloom Character Core Design

Use this reference when a role idea feels thin, trope-only, interchangeable, or
memorable only as a mood label. Character core work happens before field drafting.
It turns a seed into a compact behavioral engine the authoring skill can preserve.

## Core rule

A playable character core is not a biography. It is a pressure system:

```text
desire -> contradiction -> boundary -> mask / wound -> player leverage -> pressure behavior
```

If any link is missing, the role usually drifts into generic friendliness,
exposition, or passive waiting.

## Character-core packet

Return a packet that can be handed to blueprint, authoring, opening, longplay, or
simulation:

```text
Character-core packet:
- current failure:
- appeal promise:
- role identity:
- desire:
- contradiction:
- boundary:
- mask:
- wound / need:
- player leverage:
- relationship asymmetry:
- pressure behavior:
- soft spots:
- hard limits:
- behavioral tells:
- interaction hooks:
- voice implications:
- opening implications:
- longplay implications:
- field patch targets:
- token tradeoff:

Self-review:
- memorable beyond trope:
- desire creates action:
- contradiction creates behavior:
- boundary creates pacing:
- player has leverage:
- pressure behavior covers trust, resistance, passivity, and boundary:
- player agency preserved:
- next skill:
```

## Appeal axes

Pick one to three axes. Too many axes makes the role blurry.

- competence: the role can do something specific under pressure
- vulnerability: the role has a guarded need the player can affect
- mystery: the role withholds a playable secret, clue, rule, or cost
- warmth: the role notices, repairs, protects, or tends to details
- danger: the role brings risk, debt, taboo, or public consequence
- humor: the role creates a repeatable comic pattern with pressure behind it
- dependency: the role needs something from the player but cannot simply demand it
- authority: the role can grant access, impose rules, or test the player
- tension: closeness has cost, pacing, refusal routes, or public stakes
- transformation: the role changes visibly as trust, conflict, or risk moves

Do not use an axis as a label. Convert it into behavior and stakes.

## Anti-generic transforms

| Weak input | Transform into |
| --- | --- |
| mood label | behavior under pressure |
| trope label | contradiction plus cost |
| backstory | present pressure |
| "likes the player" | leverage, risk, and pacing |
| "cold" | refusal style, soft spot, and pressure move |
| "kind" | boundary, cost of helping, and what kindness refuses |
| "mysterious" | what clue appears, what remains hidden, and why now |
| "powerful" | what power cannot solve and what the player controls |
| "shy" | what the role can do indirectly but cannot say directly |
| "chaotic" | repeatable decision rule, not random behavior |

## Player leverage

The player must have something real to do. Good leverage includes:

- knowledge: the player knows a secret, clue, weakness, or contradiction
- access: the player can enter a place, group, system, memory, or route
- trust: the player can protect, question, refuse, expose, or repair something
- resource: the player has time, evidence, skill, status, money, magic, or favor
- interpretation: the player can decide what the role's attention means
- boundary: the player can slow, redirect, or reject a route without ending play
- change: the player can alter the role's plan, habit, risk, or public mask

Weak leverage only asks the player to admire, comfort, or wait.

## Pressure behavior

Define how the role behaves when the player does not follow the expected path:

```text
Player action | Role pressure behavior | What changes
trusts them   | [how the role reveals, asks, or risks] | [state/route]
questions them| [how the role deflects, admits, tests] | [clue/risk]
resists       | [how the role respects agency] | [cost/route shift]
is passive    | [what the role initiates] | [new hook]
sets boundary | [how the role stops or slows] | [safe continuation]
betrays trust | [how the role reacts without railroading] | [consequence]
```

This table prevents a character from working only when the player cooperates.

## Relationship asymmetry

Strong relationship cards usually contain asymmetry. One side knows, needs, owes,
risks, controls, hides, or can lose something the other side does not.

Use asymmetry to create play, not to remove player agency. The player should be
able to question, accept, refuse, test, protect, or change the asymmetry.

## Archetype recipes

### Companion / relationship

Core should include desire, boundary, private cost, relationship asymmetry, and
one recurring pressure behavior. The role should initiate without deciding the
player's feelings.

### Daily-life

Make a small desire specific: habit, object, routine, favor, promise, or
appointment. Add a gentle consequence so ordinary scenes can progress without
melodrama.

### Story / mystery

Tie the role to one clue, lie, rule, or unresolved cost. The player should hold a
piece of the route, not only listen to exposition.

### RPG / system role

Give the role a function and a personal friction with the system. A guide,
merchant, rival, party member, or gatekeeper needs desire and boundaries, not only
utility.

### Ensemble

Before adding cast size, build a contrast matrix:

```text
Role | Desire | Fear / cost | Boundary | Pressure move | Player leverage
```

Merge or cut any role that cannot change player choices, route pressure, or
emotional stakes.

## Failure repairs

| Failure | Repair |
| --- | --- |
| Trope-only character | add a contradiction with visible cost |
| Long biography, no present action | convert history into today's pressure |
| Player has no leverage | give the player knowledge, access, trust, resource, interpretation, boundary, or change |
| Role waits passively | write passive-player pressure behavior |
| Role becomes generic when refused | add refusal style plus alternate route |
| Strong opening, flat later turns | hand off to longplay with core state and route seeds |
| Good voice, weak motive | add desire and what blocks it |
| Appealing secret, no agency | define how the player can protect, expose, question, or refuse it |

## Field implications

- `roleDesc`: sell the appeal promise, relationship, and active tension.
- `roleDetailDesc`: preserve the full character-core packet in compact form:
  desire, contradiction, boundary, player leverage, pressure behavior, and
  behavior tells.
- `roleWelcome`: begin at the moment the core becomes actionable.
- `talkExample`: add only if pressure behavior or voice cannot survive as rules.
- XMLV3 / Theme V3: show state, choices, relationship cues, or first-scene
  affordances when they improve agency.

## Token discipline

Keep character core compact. Preserve desire, contradiction, boundary, player
leverage, and pressure behavior before ornamental backstory. If tokens are tight,
cut biography, synonym lists, mood adjectives, and inactive side characters first.
