# Moonloom TalkExample Design

Use this reference when a role card needs a `talkExample` decision, micro-samples,
dialogue samples, or example turns that teach voice, format, refusal behavior, or
state updates.

`talkExample` is not decorative dialogue. It is a calibration field:

```text
voice or format risk -> sample job -> minimal example -> token payment -> handoff
```

## Decision

Use this decision set:

```text
talkExample decision: omit | micro-samples | full examples
```

- `omit`: voice, pressure behavior, and format are clear from compact rules.
- `micro-samples`: one player line plus one role/system response teaches a
  reusable behavior.
- `full examples`: only when a generator/helper/system card needs a complete
  output artifact, or a turn protocol cannot be learned from a shorter sample.

Prefer omission or micro-samples. Full examples are expensive and should be rare.

## When to use

Add talk examples when:

- voice rules are coherent but unusual rhythm may still drift
- ensemble speakers blur after cast and voice packets are already clear
- a generator/helper card needs stable output schema or revision style
- an RPG/system card needs turn protocol, state update, or action resolution
- simulation or review shows generic replies after normal field repairs

Route away when:

- the voice card itself is missing: use voice calibration first
- the relationship, play, generator, or ensemble engine is unresolved: repair the
  narrow engine before samples
- the problem is language/register mismatch: use language style
- the problem is token bloat: use token architecture before adding samples

## Sample Jobs

Every sample must declare its job:

| Job | Good sample teaches |
|---|---|
| Voice pressure | rhythm, address terms, concealment, refusal, or boundary style |
| Ensemble contrast | who speaks, pressure move, player leverage, and contrast |
| Generator format | complete artifact shape, defaults, and revision behavior |
| Play protocol | action resolution, state update, resource cost, and consequence |
| Relationship repair | acceptance, refusal, questioning, rupture, or repair route |

Do not repeat the welcome. A sample should teach a reusable response pattern, not
replay the first scene with different wording.

Do not decide the player's feelings, actions, consent, attraction, loyalty, or
commitments in a sample. The user line may express a move; the role response must
leave agency intact.

## Token Payment

Every added sample needs a token payment:

- cut repeated mood adjectives
- cut duplicated lore that does not change play
- shorten catchphrase lists
- replace long sample scenes with micro-samples
- move durable rules from samples into `roleDetailDesc`
- remove examples that only restate the welcome

If no token payment is available, omit the sample and tighten the voice card or
engine rules instead.

## TalkExample packet

Return this before final field assembly:

```text
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
```

## Quality Checks

Before handoff, verify:

- each sample has one clear job
- sample lines are shorter than the rules they replace
- role response changes state, pressure, voice, format, or boundary behavior
- no copied source dialogue or unprovided reference text is used
- no sample decides player feelings or actions
- samples match the language/register of the target card
- samples do not lock the card into one route
- token payment is explicit

## Handoff

- Use voice director when the sample need is really missing voice rules.
- Use generator, play, relationship, or ensemble skills when the sample would
  otherwise invent unresolved engine behavior.
- Use language stylist when sample register differs from the card.
- Use token architect when examples are too long or numerous.
- Use card author when the packet is ready for field assembly.
