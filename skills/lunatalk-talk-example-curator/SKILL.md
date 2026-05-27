---
name: lunatalk-talk-example-curator
description: Use when LunaTalk role-card work focuses on talkExample decisions, micro-sample design, dialogue samples, example turns, sample token cost, voice or format examples, generator output examples, or RPG/system turn examples before final field assembly, simulation, or publishing.
---

# LunaTalk TalkExample Curator

Use this skill when the unresolved layer is whether `talkExample` is needed and
what compact sample should teach. The output is a TalkExample packet, not final
role fields and not a mutating MCP operation.

## Required references

Read `../../references/talk-example-design.md` first. Read
`../../references/voice-calibration.md` when examples teach voice or ensemble
contrast. Read `../../references/generator-design.md` when examples teach output
schema or revision behavior. Read `../../references/play-engine-design.md` when
examples teach turn protocol or state updates. Read
`../../references/card-authoring-templates.md` when the packet must be preserved
through field assembly.

## Boundary

Do not call MCP tools. Do not create, patch, validate, render, simulate, publish,
or upload assets from this skill.

Do not write long decorative sample scenes. Do not copy source dialogue, repeat
the welcome, decide the player's feelings/actions, or add examples without a
token payment.

## Workflow

1. Confirm prerequisites. If voice, relationship, play, generator, ensemble,
   language, or token architecture is unresolved, route to that skill before
   samples.
2. Choose the decision: `omit`, `micro-samples`, or `full examples`.
3. Define each sample job: voice pressure, ensemble contrast, generator format,
   play protocol, or relationship repair.
4. Draft only the minimal sample shape needed: usually one player line plus one
   role/system response.
5. State what the sample must not decide for the player.
6. Name the token payment: cut, move, or compress something to pay for the
   example.
7. Hand off to `lunatalk-card-author` for field assembly or to the missing narrow
   skill if the sample would otherwise invent engine behavior.

## Output format

Return:

```text
Route:
- entry skill:
- selected skill: lunatalk-talk-example-curator
- mode: talkExample decision / micro-sample curation
- MCP calls now: no
- final fields now: no
- next skill:

TalkExample packet:
- current request:
- prerequisite packets:
  - voice-director:
  - relationship / world / play / generator / ensemble:
  - language-style:
  - token architecture:
- decision: omit | micro-samples | full examples
- reason:
- sample jobs:
  - job:
  - behavior taught:
  - field risk reduced:
- samples to write:
  - player line:
  - role / system response:
  - what it teaches:
  - what it must not decide for player:
- token payment:
  - cut:
  - move:
  - compress:
- field placement:
  - roleDetailDesc:
  - roleWelcome:
  - talkExample:
- verification:
  - voice / format preserved:
  - no welcome repetition:
  - player agency preserved:
  - token cost justified:
- handoff:

Self-review:
- sample has a job:
- decision is minimal:
- no copied dialogue:
- player agency preserved:
- token payment explicit:
- next skill:
```

## Quality rules

- Omit `talkExample` when compact rules are enough.
- Use micro-samples before full examples.
- Full examples are justified mainly for generator/helper/system output formats.
- Samples should teach reusable behavior, not one route.
- The role response may pressure, ask, refuse, reveal, update state, or format an
  artifact; it must not write the player's inner state or commitments.
- For zh-Hant cards, sample register must match the rest of the card.

## Handoff

Hand the packet to:

- `lunatalk-voice-director` when the voice rules are missing.
- `lunatalk-generator-architect`, `lunatalk-play-engineer`,
  `lunatalk-relationship-architect`, or `lunatalk-ensemble-director` when the
  sample would invent unresolved engine behavior.
- `lunatalk-token-architect` when the examples are too long or lack token
  payment.
- `lunatalk-card-author` when the packet is ready for final field assembly.
