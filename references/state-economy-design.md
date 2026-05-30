# Moonloom State Economy Design

Use this reference when a role card needs memory or state, but the author or
agent has not decided which fields deserve token budget, which state should be
visible, which should be hidden, and which should be omitted.

State economy is a writing workflow. It is not MCP validation, a database schema,
or a server-side quality gate.

## When To Use

Use state economy design when:

- the draft has a status panel, memory block, hidden JSON state, relationship
  meters, route labels, resource counters, or scenario flags that may be too big
- the card forgets choices, repeats setup, or needs durable consequences
- Theme V3/XMLV3 planning depends on visible state or hidden JSON state
- longplay, play-engine, scenario, world, relationship, or daily-life packets
  mention state but do not define update rules
- a field exists only because it looks useful, not because it changes play

Route away when:

- the state model is coherent and the issue is visual layout: use presentation
- the issue is full long-term route design: use longplay
- the issue is RPG/resources/turn protocol: use play-engine
- the issue is player agency takeover: use agency design first

## Keep Test

Keep a state field only if it changes at least one of these:

- future role behavior
- player options
- access, route, clue, risk, cost, or resource
- relationship pressure or boundary handling
- promise, debt, taboo, unresolved choice, or return-later hook

If it does not change future play, omit it.

## Visibility

Classify every candidate field:

- `visible`: the player should see it because it helps the next action
- `hidden`: the role needs compact state for future updates, but showing it would
  spoil, clutter, or turn the card into a dashboard
- `detail-only`: the rule belongs in `roleDetailDesc`, not in runtime JSON
- `omit`: the field is decorative, duplicative, unsafe, or too costly

Do not use visible panels as decoration. A visible state field earns space by
clarifying action, risk, clue, resource, relationship pressure, route, or
boundary.

## Status Bar Contract

The status bar / 狀態欄 is a visible update contract, not progress bars or a
meter dump. Keep 2-6 fields that help the next player action or future role behavior:
scene/time/phase, relationship pressure, risk, resources, clues, route gates, or
available support.

Use `bar` only for continuous numeric state. Text, enum, flag, resource, phase,
location, available/unavailable, and pending/locked values should render as
tags, fact cards, relationship/resource cards, or short panels. Do not add a
fake `max:100` just to make a field look like a meter.

`roleDetailDesc` should own the update contract for every kept field: stable key,
label, allowed values, update trigger, update cadence, and the play effect. The
welcome only shows the first useful surface; hidden JSON stores compact runtime
updates.

Hidden <state> JSON high-drift is expected in long real chats. Hidden `<state>`
JSON is a high-drift output trap; hidden <state> JSON is high-drift. Do not rely
on hidden JSON as the only proof of state when long real chats matter; add a visible panel
fallback for player-facing state such as phase, route, clue, risk, location, or
relationship pressure. The visible panel fallback should stay understandable
when the model forgets `<state>`, and hidden JSON should remain compact when it
is emitted.

For visible bars, value must be a single numeric value; bar value must be a
single number. Do not write 8 -> 14 in bar value; it will break progress
rendering. Do not write bar value strings such as `8 -> 14`, `8-14`, or `+6`;
those belong in prose as the delta or change amount. Keep the bar at the current
number and explain the change in a nearby field or status note.

## Agency Safety

State must not store player feelings, consent, loyalty, guilt, desire, actions,
confession, commitment, or final route choice.

Instead, track observable or negotiable facts:

- what the role knows, suspects, promised, withheld, offered, lost, or unlocked
- what route, clue, resource, place, deadline, debt, boundary, or relationship
  pressure changed
- what option is now available, risky, delayed, or closed

## Decorative State

Do not track decorative meters.

Common cuts:

- mood meters that do not alter behavior
- trust bars with no unlock, cost, refusal, or pacing effect
- danger/risk labels that never trigger consequences
- route badges that lead to the same scene
- aesthetic stats copied from a genre UI
- duplicate fields that restate prose already in the detail

When a meter is attractive, convert it into one concrete consequence or omit it.

## Placement

- `roleDetailDesc`: durable rules, update protocol, state meanings, boundary
  rules, and compact examples.
- `roleWelcome` / XMLV3: only visible state needed for the first decision.
- Theme V3: styling and hierarchy only, never story logic.
- hidden JSON: compact runtime state with stable keys and update triggers.
- `talkExample`: only if a sample teaches how state updates in one turn.

## State economy packet

Return this before longplay, presentation, or final field assembly when state is
the blocker:

```text
State economy packet:
- current request:
- card shape:
- state need:
- candidate fields:
  - field:
  - keep | omit:
  - reason:
- state fields:
  - key:
  - visibility: visible | hidden | detail-only
  - owner:
  - allowed values:
  - update trigger:
  - update cadence:
  - role behavior changed:
  - player options changed:
  - token cost:
- omitted state:
  - candidate:
  - reason:
- field placement:
  - roleDetailDesc:
  - roleWelcome / XMLV3:
  - Theme V3:
  - hidden JSON:
- agency guardrails:
- verification probes:
- handoff:
```

## Verification

Before handing off, check:

- every kept field changes future play
- every field has allowed values and an update trigger
- update cadence is executable in chat
- visible fields help the next player action
- hidden JSON is compact and does not contain prose
- player feelings/actions are not stored
- decorative meters were removed or converted into consequences
- the packet names the next skill: longplay, play-engine, presentation,
  card-author, or simulation
