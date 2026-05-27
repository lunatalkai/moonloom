# Moonloom Iteration Loop

Use this reference when a role card has enough evidence to decide the next
iteration. The iteration loop is not another writing layer; it is the traffic
controller that keeps agents from endlessly rewriting, overfilling fields, or
spending simulation cost without a clear hypothesis.

## When to use

Use iteration planning when any of these exist:

- a Moonloom self-review, quality audit, diagnosis, or benchmark report
- `validate_role` output, tokenBudget, render report, preview URL, or screenshot
- simulation probes, transcript findings, or returned evaluation
- author feedback after a draft, preview, simulation, or private play session
- a revised card that needs a stop / continue decision

Route away when:

- there is no card direction yet: use premise workshop or blueprinting
- only one narrow layer is missing and no loop evidence exists: use that narrow
  skill directly
- the author asks for a scorecard only: use quality auditor
- a single render issue is already known: use render review
- a single simulation failure is already known: use chat simulation or the narrow
  repair skill

## Evidence stack

Normalize evidence before deciding:

- `self_review`: Moonloom checklist result, unresolved writing risks, packets
  already created
- `validation`: technical blockers, warnings, tokenBudget, next tools
- `render`: evaluation status, screenshot/preview observations, readability,
  action visibility, console or request issues
- `simulation`: probes, transcript-backed failures, structured evaluation, cost
  already spent
- `author_feedback`: taste signals, concrete complaints, preserve/change/reject
  decisions from the agent conversation
- `benchmark`: synthetic regression result, positive/negative case failures,
  weakest dimensions

Evidence can be missing. Say what is missing and avoid pretending it was checked.

## Decision ladder

Choose exactly one primary next move:

1. Fix technical blockers before craft work.
2. Fix player agency, boundary, or safety problems before polish.
3. Fix missing archetype contract, premise pressure, or durable engine before
   opening or visual work.
4. Fix opening and second-turn failures before longplay probes.
5. Fix token allocation when field placement hides the durable engine or welcome
   carries reusable rules.
6. Fix render only when the first screen is already playable.
7. Run or rerun simulation only when the next paid pass has a clear hypothesis.
8. Move to author co-review when taste tradeoffs are real and evidence does not
   pick one repair direction.
9. Move to publish readiness only when self-review, technical validation, render,
   and any accepted simulation scope have no unresolved blocker.

Do not fill fields to their maximum length. A 10,000-character
`roleDetailDesc` limit is a hard cap, not a quality target. Add detail only when
it creates reusable behavior, route costs, state updates, voice control,
boundaries, or return-later memory. If the card is already coherent, stop before
extra lore turns into drag.

## Patch budget

Limit each loop to one decisive repair unless the evidence shows a technical
blocker plus a small mechanical follow-up. A good patch hypothesis names:

- the exact symptom
- the field or packet to patch
- the smallest content change likely to fix it
- the expected verification result
- the cost of verifying it

After two failed repair loops on the same symptom, stop and ask the author to
choose a direction or revisit the premise/player role.

## Iteration packet

```text
Iteration packet:
- roleId or draft:
- loop stage:
- evidence stack:
  - self_review:
  - validation:
  - render:
  - simulation:
  - author_feedback:
  - benchmark:
- decision:
- hard blockers:
- strongest evidence:
- weakest Moonloom dimension:
- rejected next moves:
- next single repair:
  - hypothesis:
  - patch target:
  - preserve:
  - change:
  - expected verification:
- token stance:
- cost stance:
- stop / continue criteria:
- next skill:
- handoff:
```

## Stop criteria

Stop patching when:

- the remaining issue is a taste tradeoff, not a craft blocker
- the next patch would add lore, mood, or length without changing play
- validation and render pass, simulation scope passes or was intentionally
  skipped, and self-review has no structural blocker
- the author wants to play the private card before more changes
- two repair loops failed for the same symptom

## Quality rules

- Evidence beats preference, but author taste decides tradeoffs after craft
  blockers are gone.
- The next move should be narrow enough that another agent can execute it without
  rereading the entire card.
- Keep public-facing language generic and safe. Do not mention non-public source
  origins, platform analytics, traffic, rankings, internal tools, or unprovided
  data origins.
- Do not convert writing-quality findings into MCP hard gates. Skills decide
  craft; MCP tools enforce technical, ownership, billing, and publish controls.
