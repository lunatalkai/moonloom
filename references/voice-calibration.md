# Moonloom Voice Calibration

Use this reference when a role card needs stronger character voice, ensemble
contrast, or long-session consistency. Voice is not decoration. It is how the
player recognizes a role after several turns, even when the scene changes.
When the voice problem comes from a weak motive, generic persona, or missing
player leverage, repair the character core first with `character-core-design.md`;
voice rules cannot compensate for a role that has no pressure behavior.
Use `../skills/lunatalk-voice-director/SKILL.md` when the task is primarily
generic dialogue, speaking-style repair, catchphrase discipline, voice drift,
blind-line testing, or ensemble voice contrast.
Use `talk-example-design.md` when voice rules already exist and the unresolved
question is whether to omit `talkExample`, add micro-samples, or include full
examples for voice, format, or turn protocol.

## Core rule

Do not stop at adjectives such as gentle, cold, witty, natural, elegant, chaotic,
or human-like. Those labels describe the intended feeling, but they do not tell
the model what to write.

Turn each voice into executable instructions:

- rhythm: sentence length, pauses, fragments, formality, repetition
- vocabulary: address terms, metaphors, technical words, slang, taboo terms
- pressure behavior: what the role says when cornered, refused, trusted, or bored
- action beat: what the role does while speaking
- concealment: what the role avoids saying directly
- refusal style: how the role says no while staying in character

## Voice card

For every main persona, write a compact voice card:

```text
Voice card: [name]
- social surface:
- private motive:
- rhythm:
- vocabulary:
- address terms:
- emotional tells:
- action beats:
- concealment:
- refusal style:
- never says:
- when player is passive:
- when player resists:
- when player trusts them:
```

Use it in `roleDetailDesc`. Keep it short enough to survive token pressure.

## Voice-director packet

When voice is the current weak layer, produce a packet before writing fields:

```text
Voice-director packet:
- current failure:
- voice promise:
- role / speaker scope:
- prerequisite core repair:
- social surface:
- private motive:
- pressure behavior:
- sentence rhythm:
- vocabulary:
- address terms:
- emotional tells:
- action beats:
- concealment:
- refusal style:
- never says:
- catchphrase policy:
- response-mode grid:
- talkExample decision:
- blind-line test:
- pressure probes:
- field patch targets:
- token tradeoff:
```

The packet should be handoff-ready for blueprint, authoring, simulation, or
publish readiness. It should not call MCP tools by itself.

## Minimum samples

Single-persona cards usually need one useful `talkExample` only when voice cannot
be reliably inferred from `roleDetailDesc`.

Ensemble cards need at least one micro-sample per core role when the cast has
three or more active speakers, or when one role is likely to become generic. A
micro-sample can be one player line plus one role response. It should teach:

- who speaks
- how they handle pressure
- what they reveal or hide
- how their line differs from the other roles

Do not add long sample scenes only to decorate the card. Samples cost tokens, so
they must teach voice, format, or decision behavior.

## Catchphrase discipline

A catchphrase can support voice, but it cannot be the voice. Use one only when it
changes with pressure:

- calm state: the phrase may appear as habit
- trust: the phrase softens, shortens, or becomes more honest
- resistance: the phrase becomes a deflection, not a wall
- boundary: the phrase disappears or turns into a clear refusal
- fear or stress: the role revises the phrase or corrects itself

If a phrase appears in every reply, it becomes noise. Replace repetition with
rhythm, vocabulary, action beats, and decision behavior.

## Ensemble contrast matrix

For 2-5 core roles, check contrast before writing the final card:

```text
Role | Wants | Fears | Speech cue | Pressure move | Player leverage
```

If two roles have the same want, same sentence rhythm, and same pressure move,
merge them or redesign one. A cast member who cannot change the player's choices
is scenery, not a core role.

## Blind-line test

Before finalizing a voice-heavy or ensemble card, write one anonymous line for
each core role and ask whether the speaker can be identified without the name.

Pass:

- the line reveals a distinct rhythm or vocabulary
- the line contains a motive or pressure move
- the line does not rely only on a catchphrase

Fail:

- every role sounds like the same narrator
- differences are only punctuation, accent, or one repeated phrase
- a role's line could be assigned to any other cast member

## Response-mode grid

Use this when the role must stay consistent across long sessions:

```text
Player action | Role response mode | What changes
accepts hook  | [how role advances] | [state/relationship]
questions them| [how role deflects/reveals] | [new clue/risk]
resists       | [how role respects agency] | [cost/route shift]
is passive    | [what role initiates] | [new hook]
pushes boundary | [refusal style] | [safe continuation]
```

This grid prevents voices from collapsing when the player behaves unexpectedly.

## Calibration ladder

Use this order when repairing voice:

1. Core repair: desire, contradiction, boundary, player leverage, pressure
   behavior.
2. Voice card: social surface, private motive, rhythm, vocabulary, tells,
   concealment, refusal style.
3. Response-mode grid: trust, question, resistance, passivity, boundary, and
   betrayal when relevant.
4. Blind-line test: anonymous lines should be identifiable without names.
5. Micro-sample or talkExample: use `talk-example-design.md` when rules still do
   not preserve the voice and the sample needs a token-safe packet.
6. Simulation probe: use real LunaTalk simulation only after the card is private,
   valid, and the author accepts normal chat billing.

## Talk example placement

Use `talkExample` when:

- a voice has an unusual rhythm that rules alone will not preserve
- an assistant/generator card needs stable output format
- an ensemble card needs one compact sample per speaker
- simulation showed that a role's voice drifts or becomes generic

Avoid `talkExample` when:

- it repeats the welcome scene without teaching new behavior
- it is long worldbuilding disguised as dialogue
- it teaches the model to decide the player's feelings or actions
- it locks the card into one route instead of demonstrating a reusable pattern

## Patch triggers

Patch voice guidance when review or simulation shows:

- the role replies in generic tone labels rather than behavior
- the role has a polished voice but no clear desire, boundary, or player leverage
- the role repeats the same catchphrase without adapting
- ensemble speakers become interchangeable
- a quiet role becomes passive and stops initiating
- a comic or charming role becomes random instead of purposeful
- a mysterious role withholds everything and creates no playable clue
- refusal breaks character or seizes player agency

Patch in this order:

1. Add or tighten the voice card in `roleDetailDesc`.
2. Add response-mode rules for passive, resistant, trusting, or boundary-pushing
   player messages.
3. Add one compact talk example only if the voice still needs calibration.
4. Remove duplicate adjectives, lore, or repeated catchphrases to pay for the
   extra voice tokens.

## Token discipline

Voice calibration should make future turns cheaper, not bloat the card. Prefer
short reusable rules over many sample lines.

Keep:

- voice cards for core roles
- one sample per difficult or core ensemble role
- response-mode rules that prevent drift

Cut:

- synonyms that all mean the same mood
- catchphrase lists
- sample scenes that do not teach a reusable behavior
- full cast dialogue when only one role needs calibration
