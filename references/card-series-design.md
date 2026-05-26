# Moonloom Card Series Design

Use this reference when one character, setting, or creator concept may become a
set of related LunaTalk role cards. A series is useful only when each card makes
a different playable promise. Do not split one good card into several weaker
duplicates.

## Core rule

Shared identity should stay recognizable, while each card owns one primary
contract:

```text
shared core -> variant promise -> distinct loop -> separate opening -> test order
```

If two variants have the same player role, same pressure, same opening function,
and same longplay loop, merge them. If a variant cannot name what the player does
differently, reject it or keep it as private planning material.

## Series packet

Return this packet before blueprinting or authoring multiple related cards:

```text
Card-series packet:
- current seed:
- series goal:
- shared core:
  - identity:
  - desire:
  - contradiction:
  - boundary:
  - player leverage:
  - relationship asymmetry:
  - voice baseline:
  - reusable motifs:
- variant map:
  - keep:
  - merge:
  - reject:
- variant contracts:
  - [variant]:
    - primary archetype:
    - player promise:
    - player role:
    - unique pressure:
    - opening proof:
    - longplay loop:
    - boundary posture:
    - token target:
    - field allocation:
    - required Moonloom packets:
- overlap risks:
- authoring order:
- validation / render / simulation plan:
- handoff:
```

## Keep / Merge / Reject

Keep a variant when it has:

- a distinct primary archetype or relationship mode
- a different first-screen affordance
- a different longplay loop, route state, artifact output, or risk pattern
- a specific reason a player would start this card instead of the main card

Merge a variant when it is only:

- softer, darker, cuter, seasonal, or prettier without changing play
- a low-intensity route that fits inside the main card
- a costume or mood change with the same opening and same consequence loop
- a generator that only helps the author plan the other cards

Reject a variant when it:

- steals the main card's primary contract
- breaks the shared character core
- turns into a vague advice bot
- requires too much copied lore to work
- exists only because the idea sounds marketable

## Variant contracts

### Main companion

Use when the recognizable relationship is the anchor.

- Promise: repeated emotional play with desire, contradiction, boundary, and
  player leverage.
- Opening: a private pressure moment where the role acts first.
- Longplay: trust/friction, repair/rupture, distance, renewed intimacy or
  alliance routes.
- Boundary posture: broadest emotional range, but explicit player agency.
- Author first. It defines the shared core.

### Daily-life variant

Use only when quiet interaction has its own routine engine.

- Promise: small ordinary choices change habit, trust, closeness, or distance.
- Opening: one routine with one small disruption.
- Longplay: recurring object, place, task, or time of day that changes slowly.
- Boundary posture: low pressure, soft refusal, no forced intimacy.
- Merge into main if it cannot name a concrete routine, small desire, and
  progression signal.

### Story / event variant

Use when one incident creates stakes and routes that the main card should not
carry every session.

- Promise: enter an active event where choices change access, risk,
  relationship, information, or outcome.
- Opening: start inside the incident, not before it.
- Longplay: branch memory, route consequences, aftermath hooks.
- Boundary posture: event pressure may be higher, but refusal, investigation,
  opposition, bargain, and exit routes must remain playable.
- Reject if it is only a dramatic costume swap or lore tour.

### RPG / system variant

Use when the concept genuinely needs rules, resources, modes, or repeatable
stateful play.

- Promise: make choices under resources, risk, state, and progression.
- Opening: setup plus first crisis or default start.
- Longplay: compact state, resource costs, failure that changes play, route
  rewards.
- Boundary posture: state and rules must not decide player feelings, consent, or
  commitments.

### Generator / helper variant

Use only when it produces a concrete artifact for players or creators.
Use `generator-design.md` or `lunatalk-generator-architect` when this variant is
kept and the artifact contract is not already coherent.

- Promise: produce a usable artifact through intake, defaults, output schema, and
  revision operations.
- Opening: minimal intake plus a default artifact path.
- Longplay: artifact version, accepted constraints, rejected options, revision
  commands.
- Boundary posture: constraints and refusals become alternate outputs.
- Keep it public only if it is playable as a card. Otherwise keep it as private
  authoring support.

## Shared Core Discipline

The shared core should be compact enough to fit every variant without becoming
duplicated lore. Preserve:

- role identity and central desire
- contradiction and boundary
- player leverage and relationship asymmetry
- signature pressure behavior
- refusal / slowdown style
- voice baseline and 2-3 reusable motifs

Vary:

- the first scene
- player task
- route state
- risk level
- pacing and boundary posture
- visual affordance
- token allocation

Do not copy a long series bible into every card. Turn the shared core into
compact role behavior, then let each variant carry its own engine.

## Authoring order

Default order:

1. Shared character-core packet.
2. Series packet.
3. Main companion or primary anchor card.
4. One secondary variant with the clearest different contract.
5. Render and simulate the first two cards before adding more.
6. Add event, RPG, or generator variants only after the overlap risk is resolved.

Stop after two variants if the cards feel redundant. Better one strong anchor and
one distinct alternate than four thin copies.

## Regression checks

- Does each variant have a one-line reason to exist?
- Can the player tell which card to open from `roleDesc` alone?
- Does each welcome prove a different contract?
- Does each variant have a different second-turn move?
- Does the shared core stay recognizable without copied biography?
- Are low-intensity, event, and generator variants kept only when their loops are
  actually distinct?
- Is the test order cost-aware: validate and render before paid simulation, and
  simulate only the variants whose behavior changed?
