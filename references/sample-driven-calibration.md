# Moonloom Sample-Driven Calibration

Use this reference when an author or agent wants examples, golden samples,
benchmark output shapes, or a comparison between a draft and public synthetic
Moonloom samples.

Sample calibration is not copying. It compares craft structure:

```text
sample shape -> draft shape -> missing craft layer -> repair skill -> original rewrite
```

## Source posture

Use only the public synthetic samples in `examples/sample-card-packets.md` for
normal author-facing sample calibration. Treat them as fictional teaching
fixtures. Do not attach origin or performance claims to them.

If the workflow already has a source-restricted anonymized benchmark pattern
packet, keep it separate from synthetic sample selection and read
`benchmark-pattern-calibration.md`. Synthetic samples provide a public output
shape; benchmark patterns provide a generalized gap signal. Never blend the two
into a claim that a sample has outside proof.

Do not copy sample names, scene text, role wording, voice lines, tag strings, or
world details into a real card. Borrow the contract shape and checklist logic:
field allocation, tension triangle, first-screen proof, probe design, and repair
order.

## When to use

Use sample-driven calibration when:

- the author asks for examples, references, golden samples, sample output, or
  "make it like the good examples"
- a draft needs comparison against a clear output shape before field assembly
- benchmark results are vague and need a public-safe expected-output model
- a new Moonloom skill needs a synthetic fixture that proves the intended packet
  shape

Route away when:

- the author has no premise yet: use `premise-workshop.md`
- the draft needs a score or repair order: use `quality-scorecard.md` or
  `card-diagnosis.md`
- the author wants final private-role fields now: use `card-authoring-templates.md`
  after calibration
- the next step is technical validation, render, simulation, or publishing

## Calibration dimensions

Compare the draft to the closest sample by structure, not surface content:

| Dimension | Ask |
|---|---|
| Card shape | Is the primary contract as clear as the sample's contract? |
| Promise surface | Can `roleName`, `roleDesc`, and tags explain the player position and loop? |
| Durable engine | Does `roleDetailDesc` carry reusable behavior, routes, state, and boundaries? |
| Opening proof | Does `roleWelcome` prove the public promise through action, pressure, and reply paths? |
| Voice proof | Do examples show rhythm, motive, refusal style, and pressure behavior? |
| Longplay proof | Are state, memory, route costs, or artifact continuity visible? |
| Token allocation | Are durable rules in detail and immediate play in welcome? |
| Test hooks | Are simulation probes tied to expected failures and repairs? |
| Originality | Can the agent explain what structure was borrowed without reusing sample text? |

## Sample selection

Pick the closest one or two samples:

- relationship: slow-burn companion, ex/friend/rival, guarded intimacy, repair
  and refusal routes
- daily-life: ordinary routine, tiny disruption, shared object/place, quiet
  progression
- story / scenario: incident, clues, routes, false leads, branch consequences
- RPG / play engine: compact state, resources, turn protocol, failure-forward
  choices
- generator / helper: artifact contract, intake defaults, output schema, revision
  operations

If two samples apply, choose a primary sample and one overlay. Do not average
several samples into an overloaded hybrid.

## Calibration packet

Return this before rewriting:

```text
Sample calibration packet:
- request:
- selected sample:
- secondary overlay:
- anonymized benchmark pattern:
- card shape:
- structure borrowed, not text:
- draft strengths:
- draft gaps:
- copy-risk check:
- missing Moonloom layer:
- repair skill order:
- field allocation changes:
- opening proof changes:
- simulation probes to keep:
- handoff:
```

## Copy-risk check

Flag copy risk when the draft reuses any of these from a sample:

- role names, location names, artifact names, factions, or proper nouns
- welcome scene sentences, dialogue rhythms, or distinctive images
- exact tag sets or roleDesc structure with only nouns swapped
- sample-specific route names, resource labels, or output schema labels

Repair by keeping the same craft intent while changing the fictional material:
new role relation, new pressure source, new object, new state labels, and new
first-screen proof.

## Good calibration output

Good calibration says:

- "Borrow the sample's field allocation: compact promise, durable engine in
  detail, immediate pressure in welcome."
- "Keep the same test hook type: refusal route and second-turn consequence."
- "Do not reuse the sample's rain-door scene; create a different pressure
  object and relationship history."

Bad calibration says:

- "Use this sample as a template and swap names."
- "This is based on successful cards."
- "The sample proves it will rank well."
- "Just make it longer and more emotional."

## Handoff

- Use `lunatalk-card-blueprint` when calibration exposes missing structure before
  fields.
- Use `lunatalk-card-author` when the packet is ready for draft-only field
  assembly.
- Use `lunatalk-quality-auditor` when the author asks whether the calibrated
  draft is good enough.
- Use `lunatalk-benchmark-runner` when comparing multiple synthetic briefs after
  skill changes.
