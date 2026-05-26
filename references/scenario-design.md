# Moonloom Scenario Design

Use this reference when a LunaTalk role card is story-first: mystery,
investigation, social drama, event scenario, case file, rescue, betrayal,
political incident, festival crisis, haunting, trial, or any focused situation
where the player enters an ongoing problem and choices should change stakes.

Scenario design is not a fixed plot outline. It is a compact story engine that
lets the role reveal, pressure, branch, and remember without forcing the player
onto one route.

## Core rule

Build a branchable incident:

```text
incident -> player choice -> pressure response -> clue / cost / state change -> renewed hook
```

The card should know what can be revealed next, but it should not decide which
truth the player accepts, who the player trusts, or which route the player takes.

## Scenario packet

Return this packet before blueprinting or authoring story/scenario cards:

```text
Scenario packet:
- current seed or failure:
- scenario promise:
- card shape: story | mystery | drama | event | trial | rescue | hybrid
- player role:
- ongoing incident:
- stakes:
- core question:
- story spine:
- route branches:
  - [branch]:
    - trigger:
    - player leverage:
    - pressure response:
    - clue / reveal:
    - cost:
    - state change:
    - renewal hook:
- clue / reveal ladder:
  - visible clue:
  - contradiction:
  - false lead:
  - partial reveal:
  - reversal:
  - final pressure:
- suspect / pressure network:
  - [person or force]: want, leverage, secret, pressure move, how player can affect them
- compact consequence state:
- opening incident:
- expected first user message:
- second-turn reveal:
- passive-player behavior:
- false-lead handling:
- route-funnel guardrails:
- field allocation:
- token plan:
- simulation probes:
- handoff:
```

## Route branch grammar

Write branches as consequences, not menu labels:

```text
Branch:
- trigger:
- player leverage:
- pressure response:
- clue / reveal:
- cost:
- state change:
- renewal hook:
```

Useful branch verbs:

- investigate, hide, accuse, protect, expose, bargain, flee, delay, confess,
  distract, test, decode, follow, confront, mislead, destroy, preserve

If two branches produce the same state, merge them or make the cost different.

## Clue and reveal ladder

A story card needs enough information to move without becoming an encyclopedia.
Use a ladder:

1. visible clue: something the player can inspect or act on immediately
2. contradiction: a detail that makes two explanations impossible together
3. false lead: a tempting interpretation that creates cost when followed
4. partial reveal: one truth that changes risk but does not end the scenario
5. reversal: someone acts differently because of the player's earlier choice
6. final pressure: the card can continue through aftermath, repair, accusation,
   escape, confession, or changed trust

Do not reveal the full answer in `roleWelcome`. The first screen should expose a
playable clue and a reason to act.

## Suspect / pressure network

For mystery, trial, social drama, or event cards, define pressure through people
or forces:

```text
Node | Wants | Leverage | Secret | Pressure move | Player can affect
```

Every node should be able to change behavior when the player accuses, protects,
questions, bargains, refuses, or follows a false lead.

Keep the network small. Most scenario cards need 2-5 active pressure nodes, not a
full cast list.

## Compact consequence state

Track state that changes future scenes:

- clue known / hidden / distorted
- suspect trust, suspicion, debt, fear, or hostility
- public risk, deadline, danger, or attention
- evidence status: intact, missing, planted, destroyed, protected, exposed
- player stance: investigator, accomplice, protector, suspect, negotiator
- route flag: trust, accuse, hide, expose, bargain, escape, repair
- unresolved promise, lie, boundary, or owed favor

Avoid binary "solved/not solved" state unless the card has a short one-shot
contract. Good story cards preserve aftermath and route consequences.

## False lead handling

False leads should create play, not punish curiosity.

When the player follows a false lead:

- reveal why it seemed plausible
- introduce a cost, delay, social risk, or changed access
- leave a recoverable clue
- let the role or suspect react in character
- preserve player agency and avoid mocking the player

The card should never require the player to guess the author's intended route.

## Opening policy

Open inside the incident:

- one active place
- one clue, demand, contradiction, body, missing object, overheard line, or social
  consequence
- one role or pressure node already acting
- one reason the player matters
- 2-4 reply paths that change clue, trust, risk, access, or route

The second turn should reveal, complicate, accuse, narrow access, or show a cost.
If it only explains the setting, the scenario is not ready.

## Field implications

- `roleDesc`: promise player role, incident, and route pressure in one scannable
  sentence.
- `roleDetailDesc`: preserve story spine, branch rules, clue ladder, pressure
  network, consequence state, route-funnel guardrails, and passive-player
  behavior.
- `roleWelcome`: begin at the first active clue or consequence, not a briefing.
- XMLV3 / Theme V3: use short state panels for clue/risk/route only when they
  make action clearer.
- `talkExample`: use micro-samples only when narrator/suspect pressure or reveal
  style will otherwise drift.

## Simulation probes

Use these before paid simulation, or as the plan for `simulate_private_chat` when
the author accepts normal billing:

```text
Scenario probes:
1. Opening clue probe:
2. Accuse / protect probe:
3. False-lead probe:
4. Passive-player probe:
5. Continuity / reveal probe:
```

Pass means the role changes clue, trust, risk, access, route, or pressure, then
offers a renewed hook without deciding the player's conclusion.

## Failure repairs

| Failure | Repair |
|---|---|
| Premise summary with no scene | start at the incident with one visible clue |
| Railroaded route | add branch triggers, costs, and route-funnel guardrails |
| Fake choices | require each route to change clue, risk, trust, access, or state |
| Full answer revealed too early | rebuild clue ladder with partial reveals |
| False lead punishes player | make it recoverable and consequential |
| Player is only witness | add leverage: evidence, access, trust, accusation, protection, refusal |
| Suspects are only names | give each want, secret, pressure move, and player effect |
| Later turns repeat exposition | add consequence state and second-turn reveal rules |

## Self-review

- Can the player act in the first reply without reading a briefing?
- Does each route branch change state, risk, trust, clue, access, or pressure?
- Does the clue ladder reveal enough to continue but not so much that play ends?
- Are false leads playable and recoverable?
- Can the role move the scenario when the player is passive?
- Does the story preserve player conclusions and decisions?
- Is the token spend in durable branch rules rather than decorative plot prose?
