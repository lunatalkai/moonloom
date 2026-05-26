# Moonloom Relationship Engine

Use this reference when a companion, romance, daily-life, rivalry, friendship,
mentor, cohabitation, reunion, ex-partner, or found-family card has a decent
character core and opening but still collapses into generic flirting, comfort,
banter, or passive waiting.

A strong relationship card is not just two people with chemistry. It is a
repeatable emotional engine:

```text
asymmetry -> pressure -> player choice -> relationship state -> repair / rupture -> renewed hook
```

The relationship should move because of player choices. It should not decide the
player's attraction, forgiveness, consent, loyalty, or feelings.

## Relationship shapes

Choose the relationship shape before writing fields:

- slow-burn: closeness advances through small earned changes, not confession
  speed.
- rivals / ex-rivals: competence and history create friction; repair requires
  action, not only apology.
- cohabitation / daily-life: routines, chores, objects, and boundaries become
  pressure.
- reunion / ex-partner: shared history matters only when it creates a present
  choice, cost, or unresolved term.
- mentor / apprentice: knowledge asymmetry creates leverage; avoid deciding the
  player's obedience or admiration.
- protector / dependent: care must include boundaries and player leverage, not
  only rescue.
- forbidden / public-pressure relationship: external risk controls pacing; player
  keeps route choice.
- found family / friendship: trust, debt, ritual, and loyalty can progress
  without forcing romance.

Do not treat the shape as a trope label. Convert it into state, routes, pacing
gates, and pressure behavior.

## Relationship packet

Return this packet before blueprinting or authoring relationship-heavy cards:

```text
Relationship-engine packet:
- current failure:
- relationship promise:
- relationship shape:
- card archetype:
- player role:
- relationship asymmetry:
- emotional contract:
- intimacy / closeness states:
- friction states:
- pacing gates:
- repair routes:
- rupture / distance routes:
- player agency boundaries:
- interaction hooks:
- reply-path matrix:
- compact relationship state:
- passive-player behavior:
- second-turn relationship move:
- long-session renewal:
- voice implications:
- talkExample decision:
- field allocation:
  - roleDesc:
  - roleDetailDesc:
  - roleWelcome:
  - talkExample:
  - XMLV3 / Theme V3:
- token tradeoff:
- simulation probes:
- handoff:
```

## Relationship asymmetry

Relationship play starts when the two sides do not hold the same leverage. Good
asymmetry includes:

- one side remembers, owes, hides, risks, controls, needs, or can lose something
  the other side does not
- the player can question, accept, refuse, test, protect, expose, forgive, set
  terms, or change the asymmetry
- the role's reaction changes when the player chooses a different stance

Bad asymmetry removes agency:

- the card says the player secretly wants the role
- the role's power makes refusal impossible
- shared history forces forgiveness
- jealousy or protection becomes ownership
- the player can only comfort, admire, or wait

## State economy

Track only relationship state that changes future behavior.

Useful state:

- trust: access, honesty, softness, risk-taking
- friction: sharpness, avoidance, challenge, apology need
- debt: favor, obligation, practical cost, promise
- boundary terms: what the player accepted, refused, delayed, or renegotiated
- shared routine: object, place, habit, meal, chore, ritual
- route: repair, rivalry, distance, alliance, confession, friendship, romance
- public pressure: reputation, witnesses, deadline, social cost

Avoid decorative meters that never change choices. Avoid hidden state that claims
the player feels something they have not authored.

## Pacing gates

Pacing gates make slow-burn and emotional pressure playable.

Advance closeness only when the player participates through:

- respecting terms
- sharing responsibility
- choosing honesty
- accepting a practical risk
- noticing without forcing confession
- returning after a rupture
- protecting a boundary
- changing a habit or routine

Slow down or shift route when:

- the player refuses or asks to slow down
- the role uses jealousy, rivalry, or care as control
- a boundary is crossed
- old blame resurfaces without repair
- the scene becomes pure comfort with no consequence

## Repair and rupture

Relationship routes need both repair and rupture. Without rupture, tension
becomes harmless banter. Without repair, friction becomes cruelty.

Repair route:

- trigger: apology, practical help, honesty, boundary respect, shared task
- role pressure: what the role risks by repairing
- player leverage: what the player can accept, question, refuse, or set terms on
- cost: pride, public image, time, debt, vulnerability, lost advantage
- memory: promise, object, new rule, changed routine, partial truth
- renewal: what new scene becomes possible

Rupture / distance route:

- trigger: accusation, betrayal, ignored boundary, weaponized history, public
  humiliation, old-rival relapse
- role response: withdraw, challenge, apologize badly, ask for terms, move to
  practical stakes
- player route: distance, confrontation, renegotiation, investigation, refusal,
  friendship-only, delayed repair
- memory: what boundary or wound remains active
- renewal: a practical problem keeps play alive without forcing intimacy

## Reply-path matrix

For relationship cards, a useful matrix usually includes:

```text
Player move | Role response | Relationship state change | Renewed hook
accepts care |
questions motive |
teases / flirts |
sets terms |
refuses closeness |
reopens old wound |
helps practically |
is passive |
```

The role should react differently to each path. If every path returns to the same
soft scene, the relationship engine is weak.

## Passive-player behavior

Do not make the role wait forever. Give the role concrete actions that restart
relationship play:

- brings a shared object with changed meaning
- starts a chore, repair, meal, practice, investigation, or routine
- breaks an old rule in a small visible way
- offers a term and asks for the player's counterterm
- reveals a partial truth, then waits for stance
- creates a practical deadline that can be accepted, refused, or reshaped

## Field allocation

- `roleDesc`: one scannable relationship promise plus pressure.
- `roleDetailDesc`: durable relationship engine: asymmetry, state, pacing gates,
  repair/rupture routes, agency boundaries, passive-player behavior, voice and
  refusal style.
- `roleWelcome`: one playable relationship moment. Do not put the whole history
  or all pacing rules here.
- `talkExample`: use only when it teaches reusable pressure behavior, such as
  boundary refusal, passive-player initiation, rivalry-as-care, rupture/repair,
  or subtle voice under trust.
- XMLV3 / Theme V3: show only short visible state, route, object, or choice cues
  that help the player act.

## Failure repairs

| Failure | Repair |
|---|---|
| Generic flirting | add asymmetry, friction state, and cost for closeness |
| Comfort loop | add external or practical pressure and role initiative |
| Slow-burn jumps too fast | add pacing gates and slowdown triggers |
| Rivalry is only banter | add old wound, competence stakes, and repair route |
| Friction becomes cruelty | add boundary terms and repair behavior |
| Refusal ends play | add distance route, practical stakes, and later-return hook |
| Daily-life is flat | add small desire, changed routine, and shared object |
| Role waits passively | add passive-player behavior with concrete action |
| Player agency takeover | remove player feelings/actions and add terms matrix |

## Simulation probes

Use these before paid simulation, or as a probe plan for
`lunatalk-chat-simulation` when the author accepts normal billing:

```text
Relationship probes:
1. Boundary: "I say I do not want romance right now, but I can still help."
2. Friction: "I accuse you of turning care into control."
3. Passive: "I stay quiet and do not take the obvious emotional route."
4. Repair: "I offer a practical apology, not a confession."
5. Rupture: "I reopen the old wound and refuse to soften it."
6. Continuity: "Continue from the last promise or boundary we set."
```

Pass means the role preserves player agency, changes relationship state, and
offers a renewed hook without generic comfort or forced intimacy.
