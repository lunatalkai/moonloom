# Moonloom Daily-Life Design

Use this reference when a LunaTalk role card is quiet, domestic, slice-of-life,
neighborly, roommate, workplace, school, cafe, cohabitation, routine, ordinary
friendship, or low-stakes emotional play where the card should feel subtle but
not flat.

Daily-life design is not the absence of stakes. It is a small engine where
ordinary actions slowly change habit, trust, distance, mood, and shared objects.

## Core rule

Build a repeatable routine loop:

```text
ordinary routine -> tiny disruption -> player choice -> small state change -> next routine returns altered
```

The card should not need melodrama to move. A changed cup, towel, plant, key,
seat, text message, weather pattern, chore, meal, or silence can carry progress
when it changes what the role does next.

## Daily-life packet

Return this packet before blueprinting or authoring daily-life cards:

```text
Daily-life packet:
- current seed or failure:
- daily-life promise:
- card shape:
- player role:
- ordinary routine:
- small playable desire:
- tiny disruption:
- shared object / place:
- sensory anchors:
- player leverage:
- routine loop:
- micro-tension:
- habit state:
- reply paths:
  - [path]:
    - player move:
    - role response:
    - small change:
    - renewed hook:
- closeness / distance lanes:
- passive-player behavior:
- boundary and romance posture:
- opening moment:
- expected first user message:
- second-turn change:
- long-session renewal:
- field allocation:
- token plan:
- simulation probes:
- handoff:
```

## Routine ingredients

A daily-life routine works when it has all four:

- repeatable action: watering plants, making breakfast, taking the last train,
  closing a shop, sorting mail, walking home, cleaning a shared kitchen
- small desire: keep a plant alive, avoid waking someone, finish a repair, save a
  seat, preserve a quiet hour, make one meal correctly
- tiny disruption: missing key, cracked cup, wrong weather, changed schedule,
  broken light, late delivery, forgotten umbrella, overheard line
- player leverage: help, notice, ask, refuse, tease, fix, hide, offer, leave,
  change the order, set terms, or preserve silence

If any ingredient is missing, the card often becomes mood prose or small talk.

## Micro-tension

Use low-pressure tension instead of fake drama:

- privacy: the role wants the routine unseen
- competence: the role is good at small care but bad at asking
- time: the building wakes soon, rain starts, a train leaves, a shop opens
- boundary: help is welcome, intimacy is not automatic
- memory: yesterday's object returns changed
- social friction: a neighbor, coworker, or family rule creates a practical cost
- care cost: helping the player means neglecting the role's own routine

Micro-tension should invite action, not force confession.

## Habit state

Track only values that change behavior:

- routine state: private, shared, interrupted, repaired, avoided, changed
- shared object: missing, broken, repaired, borrowed, returned, personalized
- trust: guarded, practical, warmer, strained
- distance: polite, comfortable, avoidant, renegotiated
- mood/weather: tired, humid, late, raining, noisy, quiet
- promise: note left, favor owed, rule changed, next meeting implied

Avoid decorative meters. If a state does not alter the next routine, cut it.

## Reply path grammar

Write paths as quiet consequences:

```text
Path:
- player move:
- role response:
- small change:
- renewed hook:
```

Useful moves:

- help, notice, ask, deflect, tease, refuse, stay silent, fix, offer, leave,
  delay, set terms, share, hide, return, rearrange

At least three paths should change habit, trust, shared object, boundary, or next
routine differently. Different moods with the same next scene are decorative.

## Opening policy

Open inside the routine:

- one concrete place and time
- one role action already happening
- one sensory anchor
- one tiny disruption
- one reason the player matters now
- 2-4 reply paths that change habit, object, trust, distance, or next routine

The second turn should show a small change: the role hands over an object, alters
the routine order, reveals a bounded reason, respects a boundary, leaves a note,
or creates a next-time callback.

## Romance posture

Daily-life can support romance, friendship, neighbors, rivals, family, or quiet
companionship, but it should not assume intimacy.

Name the posture:

- friendship-first
- slow-burn optional
- non-romantic companionship
- cohabitation friction
- neighbor distance
- found-family habit

Preserve player agency: the player chooses attraction, closeness, forgiveness,
and whether a routine becomes shared.

## Field implications

- `roleDesc`: promise the routine, player relationship, and small pressure in one
  scannable sentence.
- `roleDetailDesc`: preserve the routine loop, small desire, micro-tension,
  habit state, reply paths, passive-player behavior, boundary posture, and
  long-session renewal.
- `roleWelcome`: begin at the ordinary moment with one tiny disruption, not a
  biography or abstract mood.
- XMLV3 / Theme V3: use a short state panel only when object, time, weather, or
  routine status helps the first action.
- `talkExample`: use micro-samples only when subtle voice or boundary handling
  would otherwise drift.

## Simulation probes

Use these before paid simulation, or as the plan for `conversation_send_message`
plus `conversation_inspect` when the author accepts normal billing:

```text
Daily-life probes:
1. Opening routine probe:
2. Help / refuse probe:
3. Passive silence probe:
4. Boundary posture probe:
5. Return-next-time probe:
```

Pass means the role changes habit, object, trust, distance, mood, promise, or
next-routine pressure without forcing intimacy or requiring drama.

## Failure repairs

| Failure | Repair |
|---|---|
| Quiet mood becomes no action | add tiny disruption and player leverage |
| Comfort loop only | add task, boundary, object, and small cost |
| Instant romance | name romance posture and add pacing gates |
| Repeated routine never changes | add habit state and next-time callback |
| Role waits for player | add passive-player behavior tied to the routine |
| Sudden melodrama | replace with micro-tension and practical consequence |
| Generic ordinary setting | add specific sensory anchors and shared object |
| Welcome is only atmosphere | rebuild from place, role action, disruption, player implication |

## Self-review

- Can the player act in the first reply without inventing the premise?
- Does the role want one small specific thing?
- Does each reply path change habit, object, trust, distance, or next routine?
- Can the role continue if the player is quiet, practical, resistant, or kind?
- Does the card preserve non-romantic and slow-burn routes unless the author
  explicitly makes romance primary?
- Does the second turn show a concrete small change?
- Is token spend in reusable routine rules rather than decorative mood prose?
