# System Intake Card Design

Use this reference when a LunaTalk role card behaves like a system, simulator,
management console, investigation desk, mission board, planner, or creator
assistant whose first screen needs setup inputs, state, choices, and a clear run
loop. This is the card shape most likely to regress when rich HTML control
surfaces are converted into flat XMLV3 scenes.

Use `lunatalk-play-engineer` when the primary loop is state, resources, quests,
or simulator consequences. Use `lunatalk-generator-architect` when the primary
loop is producing a usable artifact. Use `lunatalk-presentation-director` when
the unresolved layer is whether the intake console should be XMLV3, Theme V3,
or HTML.

## Core Rule

An intake-first system card must prove the system on the first screen.

```text
concrete premise -> setup defaults -> visible state -> first run action
-> state-changing response -> next branch
```

The welcome is not a manual and not a poster. It is a playable console: the
player should understand what they can configure, what state matters, and which
action starts the loop.

## Public Safety

Keep examples synthetic and original. Do not include copied role text, copied
HTML/XML, identifiers, author details, internal queries, private metrics, or
private API details in public Moonloom materials.

## When To Use

Use this pattern when the card has:

- modes, presets, or setup inputs
- a dashboard, case board, mission board, planner, or simulator console
- resources, risk, progress, route, quality, budget, inventory, clue, or trust
  state
- repeatable `start / continue / revise / reroll / inspect / commit` actions
- an output artifact plus revision operations
- a tendency to ask many questions before doing anything useful

Route away when the first screen is simply a relationship scene, daily-life
moment, or story incident without setup controls.

## Field Allocation

- `roleDesc`: one scannable promise naming the system and the player control.
- `roleDetailDesc`: the durable engine: modes, defaults, state schema, turn
  protocol, failure-forward behavior, event pool, progression, output schema,
  revision commands, and format contract.
- `roleWelcome`: a compact setup wizard or intake console. It should show only
  the controls needed for the next step, not the whole rulebook.
- `talkExample`: useful only when it teaches the response schema, state update,
  or revision command.
- Theme V3: reusable color, typography, panel skin, button tone, and density.
- XMLV3: semantic first-screen controls and state. Prefer XMLV3 plus Theme V3
  over HTML unless the needed layout still cannot be expressed.

## Detail Engine Budget

System cards need detail density because the role must run a process over time.
For high-ambition cards, spend detail budget roughly like this:

- 10-15% premise, player role, and system promise
- 20-25% state model, visible/hidden fields, and update rules
- 20-25% turn protocol, failure-forward behavior, and player-agency rules
- 15-20% event pool, scenario reservoir, and progression loop
- 10-15% output schema, revision commands, and continuity
- 5-10% voice, style, and format contract

Do not spend the welcome on durable rules that belong in detail.

## XMLV3 Console Pattern

Use this shape for a rich system intake welcome:

```xml
<scene location="..." time="..." mood="...">
  <n>One concrete situation, not a manual.</n>
  <speaker name="..." />
  <d>One line that makes the next player action obvious.</d>
</scene>
<stack gap="md">
  <panel title="Current case" tone="case">
    <n>What the player is about to configure or run.</n>
  </panel>
  <grid cols="2" gap="sm">
    <panel title="Risk"><bar label="Risk" value="42" max="100" /></panel>
    <panel title="Access"><n>Limited but usable.</n></panel>
  </grid>
  <form btn="Start run">
    <input label="Focus" name="focus" value="default focus" />
    <radio label="Mode" name="mode" options="safe,balanced,risky" />
    <checkbox label="Constraints" name="constraints" options="keep budget,avoid harm" />
  </form>
  <choices cols="2" align="stretch" gap="sm">
    <choice tone="primary" send="Start with defaults">Start defaults</choice>
    <choice tone="clue" send="Inspect the state first">Inspect state</choice>
  </choices>
</stack>
<state>{"scene":{"location":"...","time":"...","mood":"..."},"status":[],"relationships":[]}</state>
```

Rules:

- Close `</scene>` before controls. The scene is the current beat; the console
  is sibling structure.
- Use `panel`, `stack`, `grid`, `divider`, `form`, `bar`, `tag`, and `choices`
  for layout and controls.
- Use `<choices cols="2" align="stretch">` for 2-4 short action buttons.
- Use Theme V3 tones for reusable style. Use constrained presentation attributes
  only for local contrast, not arbitrary CSS.
- Keep `<state>` preview-compatible with `scene`, `status`, and
  `relationships`.
- Provide readable fallback if the layout pack is unavailable.

## HTML-To-XMLV3 Parity

When converting or competing with rich HTML cards, check parity by play value:

- Sectioning parity: HTML `div` stacks should map to XMLV3 `panel`, `stack`,
  `grid`, and `divider`, not one long scene.
- Local color parity: HTML per-section colors should map to Theme V3 tones or
  constrained XMLV3 presentation attributes.
- Action density parity: short buttons should share rows through `choices`.
- Form parity: HTML inputs, radios, and checkboxes should become XMLV3 `form`,
  `input`, `radio`, and `checkbox`.
- State parity: visible meters should become `bar` or status panels; hidden
  state belongs in `<state>` and the external state surface.
- Capture parity: long outputs require vertical capture segments; do not shorten
  the card only because one screenshot does not show the bottom.

## System Intake Packet

Return this packet before field assembly or patching:

```text
System intake packet:
- current seed or failure:
- primary contract: system/simulator | generator | hybrid
- player role:
- system promise:
- setup wizard:
  - required inputs:
  - optional inputs:
  - defaults:
  - default-start action:
- state model:
  - visible:
  - hidden:
  - detail-only:
  - update cadence:
- run loop:
  - start:
  - continue:
  - inspect:
  - revise / reroll:
  - commit:
- event pool / scenario reservoir:
- progression loop:
- failure-forward behavior:
- output schema or response format:
- player-agency guardrails:
- XMLV3 / Theme V3 plan:
- HTML decision:
- field allocation:
- simulation probes:
- handoff:
```

## Simulation Probes

Use probes that test the system, not only prose:

- Minimal input: the card proceeds with defaults and starts a run.
- Setup change: changing one intake field changes the next output.
- Inspect: the player asks to inspect state before acting.
- Failure-forward: risky input causes cost or complication without ending play.
- Continue: the next turn preserves state and advances the loop.
- Revise/reroll: the card changes the artifact or scenario while preserving
  constraints.
- Passive player: a short reply still receives a concrete next path.

Patch the card if it asks another setup question instead of running, forgets
state, produces generic advice, leaves buttons decorative, or explains rules
without changing the next action.

## Failure Map

| Failure | Repair |
|---|---|
| Long manual welcome | Move rules to detail; make welcome a playable console |
| Endless setup | Add defaults and a default-start action |
| Flat XMLV3 scene | Add sibling `panel`, `grid`, `form`, `choices`, and state |
| Left-heavy buttons | Use `<choices cols="2" align="stretch">` |
| Pretty but inert panels | Keep only panels that expose action, state, risk, clue, resource, or route |
| State is decorative | Cut it or make it affect future choices |
| HTML-only color hierarchy | Map reusable style to Theme V3 tones and local contrast to safe presentation attrs |
