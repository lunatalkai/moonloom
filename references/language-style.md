# Moonloom Language Style

Use this reference when a role card's engine, opening, and voice plan are already
coherent, but the user-facing language is inconsistent, translated-sounding, or
not localized to the requested audience. Language style is a writing layer. It
should preserve the card engine, opening, and voice rules rather than becoming a
plot rewrite.

Use `../skills/lunatalk-language-stylist/SKILL.md` when the task is primarily
script consistency, zh-Hant / zh-TW cleanup, register alignment, pronoun or
address-term drift, mixed-language tags, unnatural translationese, punctuation,
or field-to-field language mismatch.

## Boundary

Language style is not the same as voice design:

- Use language styling when the voice card is valid but the prose surface is
  inconsistent.
- Use `voice-calibration.md` when rhythm, vocabulary, refusal style, emotional
  tells, or behavior under pressure is missing.
- Use `boundary-design.md` when mature, adult, horror-leaning, coercion-adjacent,
  power-imbalanced, boundary-sensitive, or unclear-rating content lacks a clear
  rating posture, explicitness ceiling, refusal behavior, or player agency
  contract.
- Use `profile-packaging.md` when `roleName`, `roleDesc`, or tags do not explain
  why to open the card.
- Use `card-authoring-templates.md` when the author wants final field assembly or
  a real private role patch.

Do not invent platform metrics, source examples, private data, or origin claims.
Keep the output original and public-safe.

## Language-style packet

Return this packet before field assembly or patching:

```text
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
```

## zh-Hant / zh-TW cleanup

For Traditional Chinese card content:

- Use Traditional Chinese consistently in `roleName`, `roleDesc`,
  `roleDetailDesc`, `roleWelcome`, `talkExample`, and user-facing tags.
- Convert Simplified Chinese residue to Traditional Chinese while preserving
  names, intentional dialect, registered tags, JSON keys, code, and platform
  terms.
- Prefer natural Taiwan-facing phrasing when the author asks for `zh-Hant`,
  `zh-TW`, or writes in Traditional Chinese.
- Keep punctuation consistent: Chinese full-width punctuation in prose; preserve
  code punctuation inside JSON, commands, or markup.
- Avoid machine-translation cadence: repeated "並且", "進行", "使得", "通過",
  "於是他將會" patterns that make dialogue sound like a formal report.
- Preserve intended genre diction. A court fantasy, daily-life neighbor, RPG
  system, and contemporary romance should not all share the same neutral prose.

Do not over-localize proper nouns, invented terms, faction names, magic systems,
or in-world code-switching unless the author asks for that change.

## Register alignment

Define register before rewriting:

- narration: literary, conversational, clipped, formal, system-like, diary-like
- role speech: how the existing voice card should sound in the target language
- player address: `你`, `您`, name, title, nickname, role, or no direct address
- intimacy: distant, professional, teasing, familiar, intimate, ritualized
- rating posture: safe, suggestive, mature, horror-leaning, or intense; route to
  `lunatalk-boundary-designer` if sensitive posture is missing or unclear

The register must match across fields:

- `roleDesc` can be sharper than detail, but not in a different genre.
- `roleDetailDesc` carries reusable rules and can be more compact.
- `roleWelcome` should sound like the scene, not like the profile copy.
- `talkExample` must demonstrate the same voice rules as `roleDetailDesc`.
- Tags should be scannable and not mix unrelated scripts unless intentional.

## Pronoun and address matrix

Many language failures are really address failures. Create one matrix:

```text
Pronoun / address matrix:
- role self-reference:
- role address for player:
- player reference in narration:
- third-person reference for role:
- when distant:
- when trusting:
- when resisting:
- when boundary-setting:
- forbidden shifts:
```

Use the matrix to prevent the role from switching between `你`, `您`, nickname,
title, and full name without a relationship-state reason.

## Field pass

Sweep fields in this order:

1. `roleName`: preserve meaning and memorability. Do not replace a strong name
   only because it contains a proper noun or stylized term.
2. `roleDesc`: make the promise readable in the target language; keep player
   relation and tension visible.
3. `roleDetailDesc`: localize rules and voice guidance without changing the
   engine.
4. `roleWelcome`: make the opening natural in the target language while
   preserving action, pressure, player implication, and reply paths.
5. `talkExample`: align register with `roleDetailDesc`; do not introduce a new
   speech style.
6. Tags: keep tags concrete; translate user-facing tags when they are part of
   discovery, but preserve fixed taxonomy or intentional in-world labels.
7. XMLV3 / Theme V3: preserve registered tag names and JSON keys. Rewrite only
   visible prose.

## Rewrite rules

- Preserve facts, route structure, boundaries, and player agency.
- Rewrite sentence shape, particles, idioms, and connectors where the prose
  sounds translated.
- Keep voice-specific terms from the voice card unless they violate the target
  language or register.
- Do not soften conflict just because a line becomes more natural.
- Do not add lore, new feelings, or new attraction during a language pass.
- Do not narrate the player's feelings, consent, loyalty, or next action.

## Verification checklist

Before handoff, check:

- target language is explicit
- fields use one script consistently
- visible tags and profile language match the target language
- pronoun and address terms follow the matrix
- `roleDetailDesc` and `talkExample` share the same register
- `roleWelcome` still has a first action path
- boundary posture is preserved, or sensitive content was handed to
  `lunatalk-boundary-designer`
- XMLV3 tags, JSON keys, and platform terms were preserved
- no plot, engine, boundary, or voice-rule change was introduced accidentally

If a language pass exposes a broken voice card, hand off to
`lunatalk-voice-director`. If sensitive content lacks a clear boundary posture,
hand off to `lunatalk-boundary-designer`. If the card needs field assembly or a
private role patch after the language packet is approved, hand off to
`lunatalk-card-author`.
