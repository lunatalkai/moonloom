---
name: lunatalk-language-stylist
description: Use when a LunaTalk role-card task focuses on language consistency, zh-Hant/zh-TW or Traditional Chinese cleanup, Simplified/Traditional mixing, translated-sounding prose, register alignment, pronouns, address terms, punctuation, mixed-language tags, or field-to-field language mismatch before authoring, render, simulation, or publishing.
---

# LunaTalk Language Stylist

Use this skill when the card's engine, opening, and voice plan are mostly
coherent but the language surface is weak. The output is a language-style packet,
not a plot rewrite, not a new voice design, and not a mutating MCP operation.

## Required references

Read `../../references/language-style.md` first. Read
`../../references/card-authoring-templates.md` when the packet must be preserved
through field assembly. Read `../../references/voice-calibration.md` only when
the language pass exposes a real voice-rule conflict. Read
`../../references/boundary-design.md` when the card is mature, adult,
horror-leaning, coercion-adjacent, power-imbalanced, boundary-sensitive, or the
rating posture is unclear. Read
`../../references/quality-rubric.md` when the task is a broader readiness or
quality review.

## Boundary

Do not call MCP tools. Do not create, patch, validate, render, simulate, or
publish a real role from this skill.

Do not change premise, plot, relationship state, play loop, opening beats,
boundary posture, or voice rules during a language pass. Preserve registered
XMLV3 tags, JSON keys, platform terms, and intentional proper nouns.

Do not use language styling to invent a missing boundary contract. If sensitive
content has no clear rating posture, explicitness ceiling, refusal behavior, or
player agency contract, route to `lunatalk-boundary-designer` first.

Do not present language advice as unsupported origin or performance analysis.
Keep output original and public-safe.

## Workflow

1. Confirm this is a language-style task: script consistency, zh-Hant cleanup,
   translated-sounding prose, register mismatch, pronoun or address drift,
   punctuation, mixed-language tags, or cross-field language mismatch.
2. Confirm the engine, opening, and voice plan are coherent enough to preserve.
   If the engine or opening is unresolved, route to `lunatalk-card-doctor`,
   `lunatalk-card-blueprint`, or `lunatalk-opening-director` before styling.
3. If sensitive content has no clear boundary posture, route to
   `lunatalk-boundary-designer` before styling.
4. If the author is really asking for character voice, refusal style, rhythm,
   emotional tells, blind-line tests, or `talkExample` voice behavior, route to
   `lunatalk-voice-director`.
5. If the author is asking to assemble final fields or patch a real role, hand
   the language-style packet to `lunatalk-card-author` after the pass.
6. Extract target language / locale, card shape, fields affected, and packets to
   preserve.
7. Build a pronoun / address matrix before rewriting.
8. Sweep `roleName`, `roleDesc`, `roleDetailDesc`, `roleWelcome`,
   `talkExample`, tags, and XMLV3 / Theme V3 visible prose.
9. Return a language-style packet and handoff target.

## Output format

Return:

```text
Route:
- entry skill:
- selected skill: lunatalk-language-stylist
- mode: language consistency / localization pass
- MCP calls now: no
- plot / engine changes now: no
- next skill:

Language-style packet:
- current request:
- target language / locale:
- card shape:
- preserve:
  - engine:
  - opening:
  - voice card:
  - boundary posture:
  - XMLV3 / Theme V3 tags:
- language failures:
  - script:
  - register:
  - pronouns / address terms:
  - translated-sounding prose:
  - mixed-language tags:
  - field mismatch:
- pronoun / address matrix:
  - role self-reference:
  - role address for player:
  - player reference:
  - intimacy / formality ladder:
  - stage-based variations:
- field pass:
  - roleName:
  - roleDesc:
  - roleDetailDesc:
  - roleWelcome:
  - talkExample:
  - tags:
  - XMLV3 / Theme V3:
- rewrite rules:
- keep / rewrite / preserve:
- verification checklist:
- handoff:

Self-review:
- target language explicit:
- script consistent:
- register consistent:
- address matrix coherent:
- boundary posture preserved or routed:
- voice preserved:
- opening action preserved:
- XMLV3 / JSON preserved:
- no engine or plot drift:
- public-safe:
```

## Quality rules

- A language pass should make the same card read naturally in the requested
  language; it should not make a different card.
- For `zh-Hant` or `zh-TW`, convert Simplified Chinese residue to Traditional
  Chinese across profile, detail, welcome, examples, and user-facing tags.
- Fix translated cadence by changing sentence shape, particles, idioms,
  connectors, and punctuation while preserving role pressure and player agency.
- Do not remove intentional code-switching, proper nouns, faction names,
  registered XMLV3 tags, JSON keys, or fixed platform taxonomy.
- `talkExample` must match the same register and address rules as
  `roleDetailDesc`.
- If the language pass requires changing rhythm, refusal style, or behavior under
  pressure, stop and route to `lunatalk-voice-director`.
- If the language pass touches sensitive intensity and boundary posture is
  missing or unclear, stop and route to `lunatalk-boundary-designer`.

## Handoff

Hand the packet to:

- `lunatalk-card-author` when the author wants draft-only field assembly or a
  profile/detail/welcome/example patch on a private role.
- `lunatalk-voice-director` when language cleanup exposes a voice-rule conflict.
- `lunatalk-boundary-designer` when sensitive content lacks rating posture,
  explicitness ceiling, refusal behavior, or a player agency contract.
- `lunatalk-profile-packager` when the public profile promise remains weak after
  language consistency is repaired.
- `lunatalk-quality-auditor` when the author asks whether the whole card is good
  enough after the language pass.
- `lunatalk-publish-readiness` only after the card is packaged, language-clean,
  technically valid, tested as needed, and the author explicitly asks to submit.
