# Moonloom Benchmark Pattern Calibration

Use this reference when a Moonloom iteration has permission to compare a draft or
trial card against a source-restricted benchmark set, and the result must be
reduced into public-safe craft guidance before it enters any Moonloom skill,
template, or prompt.

Benchmark pattern calibration is not sample copying and not market prediction.
It converts source-restricted reading into an anonymous structure packet:

```text
aggregate signals -> deep sample reading -> ordinary-card contrast ->
anonymized pattern gap -> original Moonloom repair
```

## Source Posture

Prefer public synthetic samples for normal authoring. Use source-restricted
benchmark reading only when the workflow explicitly has permission and a clear
repair hypothesis.

Do not store raw source text, names, identifiers, author information, exact
phrasing, exact markup, source URLs, query text, provenance, private tool output,
traffic numbers, or any claim that a public artifact came from a restricted
source. Store only generalized structure, anonymized craft patterns, and repair
targets.

If a reference note would reveal where a pattern came from, keep it outside
Moonloom or rewrite it as a generic design rule before committing.

## What To Read For

Read enough complete samples to understand how the card runs after the first
screen. Do not stop at length statistics. For each source-restricted sample,
extract only abstract craft observations:

| Dimension | What to notice |
|---|---|
| Detail density | How much of `roleDetailDesc` changes future turns instead of adding mood. |
| Durable operating engine | Whether detail defines motive, pressure, state, routes, pacing, voice, and agency. |
| First-turn proof | Whether `roleWelcome` proves the promise through action, not explanation. |
| Longplay spine | Whether time, secrets, consequences, relationship shifts, or resources keep play alive. |
| Role initiative | What the role does when the player is passive, brief, evasive, or resistant. |
| Player freedom | Whether the player can refuse, redirect, test, slow down, or pick a route. |
| Presentation gap | Where HTML-like layout, color, forms, collapses, or state panels improve scannability. |
| Format stability | Whether output rules are durable enough for later turns without flooding welcome. |
| Ordinary-card contrast | Which missing layer makes weaker cards feel empty, passive, or generic. |

## Observed Public-Safe Patterns

Strong long-form cards usually treat detail as an operating manual, not a
biography. They spend detail budget on reusable mechanics:

- sectioned rules with clear priorities
- trigger conditions for scenes, routes, reveals, and state changes
- compact state or relationship variables when they affect choices
- NPC or role autonomy rules that prevent passive waiting
- player agency rules that forbid narrating player feelings, consent, decisions,
  or final route
- pacing rules for escalation, delay, consequence, and recovery
- hidden information with staged reveal conditions
- format rules that survive beyond the opening turn

Strong premises are usually legible before they are original. They give the
player a familiar shelf first, then add novelty:

- academy / school entry, household visit, survival problem, workplace duty,
  investigation, journey, competition, tabletop adventure, simulator, generator,
  or companion relationship
- a concrete player position such as new student, tutor, survivor, recruit,
  investigator, traveler, customer, teammate, heir, patient, debtor, or guide
- one human-scale first action: fill a form, open a door, choose equipment,
  answer a witness, treat a wound, negotiate a rule, check a map, or decide
  whether to leave
- novelty as an overlay that changes routes, costs, secrets, relationships, or
  state, not as an abstract concept the player must decode before acting

Strong openings usually do three jobs at once:

- place the player in a concrete scene with immediate pressure
- show the role's voice and initiative before asking for input
- expose one or more useful reply paths, forms, choices, or state surfaces

Weak ordinary-card patterns tend to cluster around these gaps:

- long biography but no runnable pressure
- many proper nouns but no player action surface
- poetic or abstract premise whose ordinary story shelf is unclear
- beautiful first scene but no second-turn move
- choices that are decorative mood labels
- voice described as adjectives instead of executable rhythm and behavior
- state panels that list facts but do not change consequences
- visual markup that looks rich but hides the durable engine in welcome

## XMLV3 And Presentation

Do not solve every visual gap by falling back to arbitrary HTML. First ask
whether the card can use Theme V3 and XMLV3-compatible layout controls:

- `panel` / container-like grouping for section separation
- `stack`, `row`, and `grid` for hierarchy and comparison
- `divider` for rhythm without decorative clutter
- state/status controls for compact, externalized game or relationship state
- forms or choices only when they create real route, state, or field input

If a benchmark pattern depends on HTML-only styling such as arbitrary colors,
nested wrappers, or highly customized visual blocks, record the presentation gap
as a Theme V3/XMLV3 capability or prompt-injection issue. Do not put subjective
writing quality into MCP server gates.

## Anonymized Benchmark Pattern Packet

Return this packet after reading and before changing Moonloom:

```text
Anonymized benchmark pattern packet:
- calibration scope:
- aggregate signals:
- deep sample reading:
- ordinary-card contrast:
- card shapes represented:
- detail density pattern:
- durable operating engine pattern:
- opening / first-turn proof pattern:
- longplay spine pattern:
- role initiative pattern:
- player agency pattern:
- XMLV3 / presentation gap:
- source safety check:
  - no raw source text:
  - no exact markup:
  - no identifiers:
  - no source URLs:
  - no query text:
  - no provenance or traffic claim:
- Moonloom gap:
- repair target:
- next skill:
- handoff:
```

## Applying The Packet

Use the packet to select one repair:

- Thin detail -> `lunatalk-detail-engineer`
- Missing playable contract -> `lunatalk-archetype-director` or the narrow
  archetype skill
- Weak first screen -> `lunatalk-opening-director`
- Passive later turns -> `lunatalk-longplay-architect` or
  `lunatalk-play-engineer`
- Generic voice -> `lunatalk-voice-director`
- Player funneling -> `lunatalk-agency-designer`
- Visual hierarchy / XMLV3 gap -> `lunatalk-presentation-director` or
  `lunatalk-render-review`
- Mixed symptoms -> `lunatalk-iteration-director`

Do not patch several layers at once unless the evidence shows a technical
blocker plus one mechanical follow-up. The point of benchmark pattern
calibration is traceability: every Moonloom improvement should map to a failed
trial, an anonymized pattern gap, or both.
