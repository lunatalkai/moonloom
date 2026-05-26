# Moonloom Quality Scorecard

Use this reference when an author asks whether a LunaTalk role card, draft,
blueprint, or packet stack is strong enough before creation, simulation, or
publishing.

This is a craft scorecard. It is not a platform metric, ranking signal,
analytics model, or MCP validation rule.

## Score scale

Score each dimension from `0` to `4`:

| Score | Meaning |
|---:|---|
| 0 | missing or blocking |
| 1 | present but fragile |
| 2 | usable private draft |
| 3 | strong candidate |
| 4 | signature strength |

Do not average away blockers. A high total with player-agency takeover, unsafe
boundary handling, copied material, or no first action is still not ready.

## Dimensions

Use the dimensions that apply to the card shape. Mark irrelevant dimensions as
`N/A`, not `0`.

| Dimension | Score asks |
|---|---|
| Promise | Can the player understand the fantasy, relationship, and tension in a few seconds? |
| Archetype contract | Does one primary card shape drive the experience while overlays support it? |
| Character appeal | Does the role have desire, contradiction, boundary, player leverage, and pressure behavior? |
| Relationship / world engine | Does relationship, setting, faction, or system content create choices, costs, state, and routes? |
| Player agency | Can the player accept, question, refuse, redirect, test, or change the route without being overwritten? |
| Opening | Does the first screen include place/time, role action, pressure, player implication, and reply paths? |
| Second-turn engine | Can the role's next move react, reveal, complicate, update state, or renew pressure? |
| Longplay | Can the card sustain multiple turns through state, memory, progression, route costs, and role initiative? |
| Voice | Is the role recognizable by rhythm, vocabulary, emotional tells, refusal style, and behavior under pressure? |
| Boundary handling | Are rating, pacing, refusal, slowdown, and stop conditions explicit when needed? |
| Token allocation | Do long sections create reusable behavior, state, voice, routes, or first-action clarity? |
| Presentation | Does XMLV3, HTML, or Theme V3 support readability, state, action, and mood without hiding the engine? |
| Testability | Are render checks, simulation probes, and patch triggers clear enough for a later closed loop? |

## Overall tier

Use this tier after scoring:

- `Blocked`: any critical blocker exists, regardless of total.
- `Needs architecture`: several core dimensions are `0-1`, or primary contract is unclear.
- `Usable private draft`: most relevant dimensions are at least `2`, with known repairs.
- `Strong candidate`: core dimensions are mostly `3`, no blocker, and first repair is narrow.
- `Signature candidate`: several dimensions reach `4`, no major weak layer, and simulation probes are ready.

## Critical blockers

Flag blockers before scoring:

- missing required role fields or known technical validation blockers
- player-agency takeover: card decides the player's feelings, consent, actions,
  commitments, or route choice
- no playable first action
- boundary-sensitive premise without rating, pacing, refusal, or stop conditions
- copied or unprovided material presented as card content
- primary archetype conflict that makes field allocation impossible
- durable engine hidden entirely in `roleWelcome` while detail cannot sustain play

## Quality audit packet

Return this packet before rewriting fields:

```text
Quality audit packet:
- audit scope:
- evidence available:
- evidence missing:
- card shape:
- overall tier:
- critical blockers:
- scorecard:
  - promise:
  - archetype contract:
  - character appeal:
  - relationship / world engine:
  - player agency:
  - opening:
  - second-turn engine:
  - longplay:
  - voice:
  - boundary handling:
  - token allocation:
  - presentation:
  - testability:
- strongest dimensions:
- weakest dimensions:
- first three repairs:
- repair skill order:
- keep / move / cut / rewrite:
- validation / render / simulation stance:
- handoff:
```

## Repair priority

Choose first repairs by risk and leverage:

1. Critical blockers and player agency.
2. Archetype contract and promise.
3. Durable engine: character core, relationship engine, world engine, or system rules.
4. Opening and second-turn engine.
5. Longplay and state.
6. Voice calibration.
7. Token allocation and presentation polish, unless allocation hides the engine.
8. Simulation and publishing only after the writing layer is worth testing.

If the audit reveals several interacting symptoms and the repair order is still
unclear, hand off to `lunatalk-card-doctor`. If the weak layer is narrow, hand
off directly to the matching Moonloom skill.

## Scorecard rules

- Score from evidence, not taste. Quote or summarize the field behavior that
  caused the score.
- Do not call MCP tools from a quality audit unless another skill explicitly
  takes over.
- Do not turn the score into a server gate. Use it to guide authoring.
- Do not require simulation before obvious structural repairs.
- Keep the output public-safe and original.
