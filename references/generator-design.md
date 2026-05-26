# Moonloom Generator Design

Use this reference when a LunaTalk role card's primary promise is to help the
player create a usable artifact: ritual, contract, poem, outfit, scene prompt,
quest hook, menu, spell, city custom, letter, itinerary, or another structured
output. A generator card is not a generic advice assistant. It should turn brief
input into a finished artifact, then support focused revision.

Use `../skills/lunatalk-generator-architect/SKILL.md` when the task is primarily
generator/helper/creator-assistant structure: intake, defaults, artifact schema,
revision operations, quality rubric, artifact continuity, or assistant-mode
drift before blueprinting or authoring.

## Core Rule

Generator cards must produce.

```text
input or defaults -> artifact schema -> finished artifact -> named revisions
-> reusable follow-up
```

The card can ask questions, but only enough to make the next artifact better.
If the player gives minimal input, the card should proceed with defaults and
return one usable artifact rather than waiting.

## Boundary

Use generator design when artifact creation is the main loop.

Route away when:

- the main promise is stats, resources, combat, or simulator state:
  use `play-engine-design.md`
- the main promise is a mystery, rescue, trial, betrayal, or branchable incident:
  use `scenario-design.md`
- the main promise is relationship, comfort, rivalry, or slow-burn intimacy:
  use `relationship-engine.md`
- the generator is only a small overlay inside a companion/story/world card:
  keep it as an in-world artifact mode and use `archetype-contracts.md`

Do not present generator quality as unsupported origin or performance analysis.
Keep the output original and public-safe.

## Generator Packet

Return this packet before field assembly or patching:

```text
Generator packet:
- current seed or failure:
- generator promise:
- card shape:
- artifact type:
- player role:
- creator persona:
- artifact contract:
  - artifact must include:
  - artifact may include:
  - artifact must not include:
- intake surface:
  - required inputs:
  - optional inputs:
  - defaults:
  - when to ask:
  - when to proceed:
- output schema:
  - sections:
  - ordering:
  - length target:
  - formatting rules:
- revision operations:
  - [operation]:
    - trigger:
    - effect:
    - preserves:
- quality rubric:
- artifact memory:
- refusal / constraint handling:
- diegetic mode:
- opening contract:
- field allocation:
  - roleDesc:
  - roleDetailDesc:
  - roleWelcome:
  - talkExample:
  - XMLV3 / Theme V3:
- token plan:
- simulation probes:
- handoff:
```

## Artifact Contract

Define the artifact before writing prose:

- artifact type: what the card produces
- audience: who would use the artifact in-world or out-of-world
- utility: what the artifact helps the player do next
- stable sections: the output shape that should persist across turns
- quality bar: what makes an output usable instead of decorative
- forbidden drift: advice-only reply, endless intake, lore dump, or unrelated
  story scene

A strong artifact has internal decisions. For a festival ritual, for example,
the sections might include purpose, symbols, steps, public conflict, private
cost, scene hook, and revision handle. The exact sections should match the
artifact type rather than use a generic template.

## Intake With Defaults

Intake should be small and productive.

Ask only for inputs that change the artifact:

- target mood or purpose
- setting constraints
- audience or participants
- material/resource limits
- taboo, rating, or tone boundaries
- desired format or length

Provide defaults for everything else. If the player gives one sentence, produce
the artifact and include a short assumptions line. If the player gives no
constraints, offer 2-3 quick presets and a default-start option.

Avoid:

- asking five or more setup questions before producing anything
- requiring the player to know the whole output schema
- making the player choose every section manually
- treating missing input as permission to stall

## Output Schema

The schema is the card's promise. It should be stable enough that the player can
ask for revisions by section.

Schema rules:

- 4-8 sections are usually enough
- every section must add utility, action, constraint, conflict, or replay value
- section names should be memorable and specific to the artifact type
- keep prose compact enough to revise in later turns
- make one field easy to transform into a scene, hook, or next artifact

For creator-assistant cards, `talkExample` is useful when it demonstrates the
schema and revision commands without bloating `roleWelcome`.

## Revision Operations

Named revisions make the card usable across turns.

Common operations:

- `expand`: add detail while preserving the schema
- `compress`: shorten without losing the artifact's use
- `darken` / `soften`: change tone within rating boundaries
- `localize`: adapt to a place, faction, culture, or audience
- `add-conflict`: add a playable obstacle or cost
- `make-diegetic`: turn the output into an in-world document, speech, ritual, or
  item
- `split`: produce variants with clear tradeoffs
- `continue`: transform the previous artifact into the next usable artifact

Each operation should state what it preserves. Revisions should not silently
erase the player's constraints or previous artifact.

## Diegetic Mode

Some generator cards are plain helpers. Others are in-world creators: scribe,
oracle, mechanic, tailor, contract broker, ritualist, archivist, or menu keeper.

If diegetic, define:

- why the role can produce the artifact
- what personality colors the output
- what the role refuses or warns about
- how they stay in character while still producing useful sections

Do not let diegetic flavor hide the artifact. The player still needs a usable
output.

## Opening Contract

The welcome should start production quickly:

- one sentence naming what the card can make
- 2-4 intake fields or choices that matter
- a default-start option
- an example artifact type or preset
- a promise that the next reply will produce one finished artifact

The opening should not be a vague "What would you like to create?" prompt unless
the role also offers concrete defaults.

## Field Allocation

- `roleDesc`: name the artifact and the collaboration loop in one scannable
  promise.
- `roleDetailDesc`: carry intake rules, defaults, output schema, revision
  operations, quality rubric, constraint handling, and diegetic behavior.
- `roleWelcome`: offer minimal intake and defaults; do not become a long manual.
- `talkExample`: include only when it teaches output schema or revision style.
- XMLV3 / Theme V3: use forms or choices only when they make intake clearer.

## Simulation Probes

Use probes that verify output, not only conversation:

- "Make one with these constraints and choose sensible defaults."
- "I only give one vague line; produce the artifact anyway."
- "Revise the previous artifact darker while preserving the same sections."
- "Turn the previous artifact into a scene prompt or next usable artifact."
- "I ask for something outside the card's rating or constraints."

Patch the card if it asks another generic question, gives advice without an
artifact, forgets the previous artifact, changes schema unpredictably, or breaks
the intended role voice.

## Failure Map

| Failure | Repair |
|---|---|
| Endless intake | add defaults and proceed rule |
| Advice instead of artifact | define artifact contract and schema |
| Output changes shape every turn | stabilize schema and revision commands |
| Revisions erase constraints | add preserve rules per operation |
| Artifact has no playable use | add scene hook, conflict, cost, or next use |
| Diegetic role breaks into generic assistant | add creator persona and voice rules |
| Welcome is a form with no payoff | promise one finished artifact on next turn |
