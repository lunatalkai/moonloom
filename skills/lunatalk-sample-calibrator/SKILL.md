---
name: lunatalk-sample-calibrator
description: Use when a LunaTalk role-card task asks for examples, golden samples, sample output packets, benchmark calibration, draft-to-sample comparison, or making a card resemble strong public Moonloom examples without copying text before blueprinting, authoring, simulation, or publishing.
---

# LunaTalk Sample Calibrator

Use this skill when the author needs a public example shape before writing or
repairing a card. The output is a sample calibration packet, not final fields and
not permission to copy sample prose.

## Required references

Read `../../references/sample-driven-calibration.md` first. Read
`../../examples/sample-card-packets.md` to select the closest public synthetic
sample. Read `../../references/quality-scorecard.md` when the author asks
whether the draft is strong enough after calibration. Read only the narrow
archetype reference after the packet identifies the missing layer.

## Boundary

Do not call MCP tools. Do not create, patch, validate, render, simulate, or
publish a real role from this skill.

Do not copy sample names, scene text, role wording, tag strings, voice lines,
route names, resource labels, artifact schema labels, or fictional details.
Borrow structure only: field allocation, pressure shape, player agency, opening
proof, token placement, and probe type.

Do not attach origin or performance claims to samples. They are public synthetic
teaching fixtures.

## Workflow

1. Identify whether the request is example-seeking, draft calibration, benchmark
   expected-output shaping, or copy-risk review.
2. Select one primary sample and, only when useful, one secondary overlay.
3. Compare by structure: primary contract, promise, engine, opening proof, voice,
   longplay, token allocation, probes, and originality.
4. State exactly what structure may be borrowed and what text/details must not be
   reused.
5. Name the missing Moonloom layer and repair skill order.
6. Return a sample calibration packet and handoff target.

## Output format

Return:

```text
Route:
- entry skill:
- selected skill: lunatalk-sample-calibrator
- mode: example calibration / draft comparison / benchmark shaping / copy-risk review
- MCP calls now: no
- final fields now: no
- next skill:

Sample calibration packet:
- request:
- selected sample:
- secondary overlay:
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

Self-review:
- sample used as structure only:
- no sample text copied:
- no origin/performance claim:
- primary contract clear:
- next skill is narrow:
- public-safe:
```

## Routing

- No premise yet: route to `lunatalk-premise-workshop`.
- Card type unclear: route to `lunatalk-archetype-director`.
- Missing structure before fields: route to `lunatalk-card-blueprint` or the
  narrow archetype skill.
- Ready for draft-only field assembly: route to `lunatalk-card-author`.
- Needs a score, tier, or first-three repairs: route to
  `lunatalk-quality-auditor`.
- Needs regression across multiple briefs: route to `lunatalk-benchmark-runner`.

## Quality rules

- Calibration should reduce ambiguity, not produce a second generic checklist.
- Pick a primary sample. Overlays are allowed only for a specific missing layer.
- If the draft resembles a sample too closely, repair originality before
  authoring.
- Prefer specific field-allocation advice over vague style advice.
- Treat samples as output-shape fixtures, not as market proof or content sources.
