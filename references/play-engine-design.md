# Moonloom Play Engine Design

Use this reference when a LunaTalk role card behaves like an RPG, adventure,
open-world, survival, investigation, sandbox, or structured game loop. The goal
is not to add more rules. The goal is to make every visible rule produce a
choice, a cost, a state update, and a renewed hook.

## Core rule

Design the playable loop first:

```text
visible state -> immediate pressure -> player action -> resolution -> state update -> renewed choice
```

If a stat, resource, inventory item, quest, faction, combat rule, or route does
not change the next choices within a few turns, cut it, merge it, or turn it into
a concrete cost.

## Play-engine packet

Return this packet before authoring or patching fields:

```text
Play-engine packet:
- current failure:
- card shape:
- play promise:
- player position:
- player controls:
- card must not decide:
- core loop:
- compact state model:
- resource rules:
- quest / risk model:
- turn protocol:
- failure-forward behavior:
- progression phases:
- opening contract:
- state visibility:
- field allocation:
- token plan:
- simulation probes:
- handoff:

Self-review:
- every visible stat changes choices:
- state can update after each assistant turn:
- resources buy or cost something concrete:
- failure changes play without automatic dead end:
- turn protocol preserves player agency:
- opening is playable before it explains the full system:
- token spend favors reusable rules over lore:
```

The packet should be concrete enough that `lunatalk-card-author` can write
`roleDetailDesc` and `roleWelcome` without turning the card into a manual.

## Scope ladder

Choose the smallest playable scope.

| Scope | Use when | Keep |
| --- | --- | --- |
| light adventure | one mission or journey drives the card | one pressure, 2-3 routes, 3-5 state fields |
| investigation / case | clues, suspects, evidence, or deductions matter | clue state, risk clock, access rules, consequence of accusation |
| RPG / open-world | travel, resources, quests, combat, factions, or progression matter | compact state, resource costs, failure-forward rules, route rewards |
| survival / horror | danger, scarcity, wounds, exposure, or pursuit matter | visible risk, limited resources, retreat routes, pacing and boundaries |
| simulator / management | the player controls a system over repeated turns | mode, state schema, update loop, defaults, revision or retry rules |

Do not promote a card to RPG/open-world only because it has lore. RPG/open-world
is justified when player choices need resources, risks, routes, state, and
progression.

## Compact state

Track only what changes future behavior. Most playable cards should expose 5-9
state fields, not a full character sheet.

Useful state categories:

- place / time: current location, watch, scene phase, deadline
- pressure: danger, exposure, curse, suspicion, pursuit, public attention
- resources: supplies, coin, fuel, magic, stamina, light, evidence, favor
- condition: wound, fatigue, corruption, debt, wanted status, tool damage
- route: active quest, clue, unlocked place, faction stance, reputation
- relationship: trust, rivalry, debt, promise, boundary, crew morale

State rules:

- Update state after every assistant turn when a player action, refusal,
  retreat, passive input, or partial success changes the situation.
- Show only state the player can use now or soon.
- Prefer named flags and simple levels over many numbers.
- Do not hide state that contradicts visible player agency.
- Do not track decorative stats that never affect access, cost, risk, or role
  behavior.

## Resource economy

A resource is playable only if spending, saving, losing, or gaining it changes
the next scene.

Resource verbs:

- spend for speed, safety, leverage, information, healing, access, concealment
- save to endure a later clock, bargain, repair, shelter, or reveal
- lose through risk, time, injury, betrayal, exposure, damage, or poor route fit
- gain by trade, discovery, alliance, sacrifice, craft, or accepting a cost

Avoid:

- inventory lists where items never matter
- stats that exist only to look game-like
- resource loss that only punishes without opening another route
- rewards that do not change access, risk, relationship, route, or state

## Quest and risk model

Use a small number of active routes. A strong play engine usually needs one main
pressure, 2-3 active quest routes, and a few deferred routes.

Quest route grammar:

```text
Quest:
- trigger:
- objective:
- player approaches:
- pressure:
- cost:
- risk:
- reward / unlock:
- failure-forward outcome:
- memory left behind:
- renewed hook:
```

Risk should be legible before the player commits. A route can still surprise the
player, but the card should show enough pressure that the choice feels authored
by the player, not by a hidden punishment.

## Turn protocol

Use this protocol for structured play:

```text
1. Read the player's last action and intent.
2. Resolve consequence without playing the user's next action.
3. Update compact state.
4. Narrate the immediate result through the current scene.
5. Present the next pressure.
6. Offer 2-4 actionable paths with visible cost, risk, or route meaning.
```

The role may infer reasonable consequences, but it must not decide the player's
feelings, courage, loyalty, consent, memories, or future action. Avoid generic
"what do you do now?" prompts unless the scene already gives obvious affordances.

## Failure-forward behavior

Failure should change play rather than end it or disappear.

Useful failure outcomes:

- wound, fatigue, debt, damaged item, lost time, raised clock, exposed secret
- faction suspicion, blocked shortcut, separated ally, public attention
- partial clue, costly bargain, cursed mark, forced retreat, route delay
- resource depletion that unlocks a harder but playable alternative

Death, permanent lockout, or story end should require clear warnings and an
explicit player choice to keep taking lethal risk. Ignored failure is also a
failure: if nothing changes, the route was decorative.

## Progression phases

Use phases as behavior modes, not chapters.

```text
Phase | Trigger | System pressure | Player leverage | Unlocks | Risk
```

Common phases:

- setup under pressure: the player sees state and makes the first meaningful
  tradeoff
- first route: resources or access change because of a chosen approach
- entanglement: faction, clue, relationship, danger, or resource state matters
- reversal: prior success creates a cost, betrayal, timer, or exposed weakness
- mastery / endgame: the player can spend earned leverage on a major route
- renewal: a new expedition, case, district, or contract starts from remembered
  state

Do not require a fixed phase order unless the card is a linear scenario.

## Opening contract

The first screen should combine setup and action:

- one place and current pressure
- one visible state panel or compact setup
- one concrete object, threat, demand, clue, route, or resource decision
- 2-4 choices tied to risk, resource, route, or state
- defaults when the player gives minimal setup input

Do not start with a full rulebook, faction list, combat manual, or inventory
catalog. Put durable rules in `roleDetailDesc`; let `roleWelcome` prove that the
system is playable.

## Field allocation

- `roleDesc`: player position, world/system, and core choice pressure.
- `roleDetailDesc`: play-engine packet, compact state, resources, turn protocol,
  quest/risk routes, failure-forward behavior, progression, agency guardrails,
  and voice/system style.
- `roleWelcome`: one playable setup or crisis with visible state and choices.
- `talkExample`: only when it teaches turn protocol, state updates, narrator
  style, or structured output better than rules alone.
- XMLV3 / Theme V3: reveal state, choices, maps, or route panels only when they
  help the player act.

## Token plan

Spend tokens in this order:

1. player position and core loop
2. compact state and resource rules
3. turn protocol and failure-forward behavior
4. quest/risk routes and progression phases
5. opening setup/crisis
6. voice or narrator style
7. optional samples

Cut first: inactive factions, unused stats, detailed equipment catalogs, combat
edge cases, proper noun lists, lore history, repeated atmosphere, and visual
ornament that does not change player action.

## Simulation probes

Use these before paid simulation or as the plan for `simulate_private_chat` when
normal billing is accepted:

```text
Play-engine probes:
1. Resource probe:
2. Route-change probe:
3. Failure-forward probe:
4. Continuity/state probe:
5. Passive/minimal-input probe:
```

Pass means the role resolves the action, updates visible compact state, changes
resource/risk/route/access/relationship, preserves player agency, and offers a
renewed playable hook.

## Failure repairs

| Failure | Repair |
|---|---|
| Opening reads like a manual | move durable rules to detail; open on one crisis with state and choices |
| Many stats never matter | cut to state that changes choices in 2-3 turns |
| Inventory is decorative | give each kept item a spend/save/lose/gain verb |
| Failure ends or disappears | add fail-forward outcomes and warnings for lethal routes |
| AI forgets state updates | add turn protocol and visible compact state rules |
| Combat overwhelms roleplay | reduce to risk, cost, consequence, and route shift |
| Factions are lore labels | give each faction leverage, cost, pressure move, and route use |
| Player only watches system output | add player controls, refusal routes, and reply-path consequences |
