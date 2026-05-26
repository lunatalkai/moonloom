# Moonloom World Engine Design

Use this reference when a LunaTalk role idea needs worldbuilding, relationship
networks, factions, locations, setting rules, or lore compression. The goal is
not a larger encyclopedia. The goal is a playable world engine that creates
choices, consequences, memory, and renewed hooks.

## Core rule

Every world fact must earn its tokens through play:

```text
world fact -> player action -> state / consequence -> renewed hook
```

If a fact does not change what the player can do, what a role wants, what a
faction risks, what location can be reached, or what future scene becomes
possible, delay or cut it.

## World-engine packet

Return a packet that can be handed to blueprint, authoring, opening, longplay, or
simulation:

```text
World-engine packet:
- current failure:
- world promise:
- card shape:
- player position:
- scope: light-setting | heavy-setting | RPG/open-world | scenario | ensemble
- core world rule:
- playable slice:
- active pressure:
- relationship / faction network:
- locations:
- resources / clocks / costs:
- state model:
- route seeds:
- exposition policy:
- opening implications:
- longplay implications:
- render / state visibility:
- field patch targets:
- token tradeoff:

Self-review:
- world rule creates choices:
- player position is clear:
- each faction/location has a play function:
- state is compact and updateable:
- opening avoids lore dump:
- routes have costs and memory:
- token spend is justified:
- next skill:
```

## Scope ladder

Choose the smallest scope that can deliver the fantasy.

| Scope | Use when | Keep |
| --- | --- | --- |
| light-setting | the world is atmosphere around a relationship or daily-life loop | one rule, one main place, one pressure, one progression path |
| scenario | the world exists to drive a focused conflict | one conflict, 2-4 locations, 2-4 branches, a clear clock |
| heavy-setting | the world itself is the fantasy | modular rules, factions, places, routes, state, and lore priority |
| RPG/open-world | player choices need resources, travel, combat, crafting, or progression | compact state, route costs, failure pressure, reward unlocks |
| ensemble | multiple factions or speakers must stay active | turn ownership, group tension, contrast, and player leverage |

Do not promote a light-setting card into heavy-setting because the author has
interesting lore. Scope should follow the play loop.

## Play-function filter

Keep an entity only if it can do at least one verb:

- visit, cross, unlock, lose, protect, expose, hide, betray, bargain, repair
- block, pursue, shelter, tax, remember, forget, transform, escalate, reward

Named factions, places, artifacts, dates, species, powers, and historical events
that cannot take one of these verbs are likely decorative lore.

## Relationship / faction network

A world network should describe pressure, not only hierarchy:

```text
Node | Wants | Leverage over player | Cost to help | Pressure move | Route use
```

Useful node types:

- guide: gives access but hides a cost
- authority: offers legitimacy but narrows routes
- vulnerable group: creates stakes and refusal pressure
- broker: opens shortcuts at a social, memory, money, or reputation cost
- rival: tests competence, loyalty, or interpretation
- witness: knows truth but cannot act directly
- wild card: changes a route when ignored

Every node should have a reason to act when the player is passive.

## Location design

A location is not a backdrop. Give each active place:

- access rule: how the player enters, leaves, or is blocked
- pressure: what starts there
- resource or risk: what can be gained, lost, owed, or exposed
- faction tie: who controls or contests it
- return hook: why coming back later matters

Most cards need 1-3 active locations at first. Heavy settings can define more,
but only one to two should appear in the opening.

## State model

Track only state that changes future turns. Good world state changes access,
behavior, route, risk, or cost.

Common fields:

- location / unlocked place
- faction stance
- clock / deadline / danger
- resource / debt / clue / reputation
- relationship thread
- route flag
- promise / boundary / unresolved question

Avoid decorative meters, too many stats, and hidden state that contradicts the
player's visible choices.

## Route seed grammar

Write world routes as contracts:

```text
Route:
- trigger:
- world pressure:
- player leverage:
- faction / relationship shift:
- unlock:
- cost:
- memory left behind:
- renewal hook:
```

Routes should make the world react. A route that only changes scenery is not a
route yet.

## Exposition policy

Reveal lore through action surfaces:

- object: warrant, map, debt note, broken device, invitation, key
- demand: pay, choose, testify, hide, escort, repair, translate
- consequence: curfew, changed status, lost access, faction suspicion
- witness: someone affected by the rule now
- contradiction: two rules cannot both be true, and the player can test them

Avoid explaining the full system before the player can act. If the player asks
for lore, answer through what it changes now.

## Opening policy

The first screen should use one playable slice:

- one place
- one active role or narrator voice
- one object, demand, or threat
- one visible world rule
- one player implication
- 2-4 reply paths with consequences

Do not introduce the full faction list in the welcome. Let later scenes unlock
more of the world.

## Field implications

- `roleDesc`: promise the player position, world rule, and conflict in one
  scannable sentence.
- `roleDetailDesc`: preserve the world-engine packet: core rule, player position,
  network, locations, state model, routes, exposition policy, and initiative.
- `roleWelcome`: begin at the moment the world rule creates a choice.
- XMLV3 / Theme V3: use state panels, maps, route choices, or status sections
  only when they make the first action clearer.
- `talkExample`: add only if the narrator/system output or ensemble turn style
  cannot survive as rules.

## Token discipline

Spend tokens in this order:

1. core world rule and player position
2. state that changes future turns
3. factions/locations that create choices
4. route seeds and role initiative
5. opening slice
6. lore history only when it creates a route or consequence

Cut first: calendars, genealogies, timelines, proper noun lists, inactive NPCs,
visual ornament, repeated atmosphere, and explanations that do not affect the
next three turns.
