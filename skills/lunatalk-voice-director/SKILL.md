---
name: lunatalk-voice-director
description: Use when a LunaTalk role-card task involves character voice, speaking style, generic dialogue, catchphrases, repeated phrasing, emotional tells, refusal style, behavior consistency, talkExample need, blind-line checks, voice drift, or ensemble speakers blending together before blueprinting, authoring, simulation, or publish readiness.
---

# LunaTalk Voice Director

Use this skill when the weak layer is how a role sounds and behaves in dialogue.
The output is a voice-director packet, not a full card and not a mutating MCP
operation.

## Required references

Read `../../references/voice-calibration.md` first. Read
`../../references/character-core-design.md` when the voice problem comes from a
weak motive, missing player leverage, or a role that collapses under pressure.
Read `../../references/card-authoring-templates.md` when the packet needs field
patch targets or talkExample placement. Read `../../references/quality-rubric.md`
for self-review. Read `../../references/playtest-loop.md` when the packet needs
simulation probes. Read `../../references/world-engine-design.md` when the voice
belongs to an ensemble, narrator, system role, faction, or world guide.

## Boundary

Do not call MCP tools from this skill. Do not write or patch real role fields
unless the author explicitly continues through `lunatalk-card-author`. Voice
quality is Moonloom guidance, not an MCP validation gate.

## Workflow

1. Diagnose the voice failure: generic assistant tone, mood-only labels,
   catchphrase-only identity, voice drift, refusal breaking character,
   over-politeness, exposition voice, ensemble blur, or dialogue that decides the
   player's feelings.
2. If the role has no desire, contradiction, boundary, or player leverage, use
   `lunatalk-character-core` first or preserve its packet. Style cannot rescue a
   role that has no pressure behavior.
3. Choose the voice anchor: social surface, private motive, pressure behavior,
   and what the voice hides.
4. Write executable voice cards: rhythm, vocabulary, address terms, emotional
   tells, action beats, concealment, refusal style, never-says, and behavior when
   the player is passive, resistant, trusting, or boundary-setting.
5. For ensemble cards, build a contrast matrix before adding samples. If two
   speakers share motive, rhythm, pressure move, and player leverage, merge or
   redesign one.
6. Decide talkExample need. Prefer compact rules. Add micro-samples only when
   rules alone will not preserve the voice, the role has unusual rhythm, or
   ensemble speakers still blur.
7. Run blind-line and pressure tests before handoff. A voice passes only if it is
   recognizable without names and survives trust, resistance, passivity, and
   boundary pressure.
8. Name field patch targets and hand off to blueprint, authoring, simulation, or
   publish readiness.

## Output format

Return:

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
- if player trusts:
- if player questions:
- if player resists:
- if player is passive:
- if player sets a boundary:

Ensemble contrast:
- needed: yes | no
- [Name]: want, fear/cost, speech cue, pressure move, player leverage

TalkExample decision:
- needed: yes | no
- why:
- micro-samples to add:
- what to cut to pay tokens:

Blind-line test:
- anonymous lines:
- pass criteria:
- current risk:

Pressure probes:
- trust:
- question:
- resist:
- passive:
- boundary:

Field patch targets:
- roleDesc:
- roleDetailDesc:
- roleWelcome:
- talkExample:
- XMLV3 / Theme V3:

Self-review:
- voice is behavior, not adjectives:
- generic assistant phrases removed:
- refusal stays in character:
- player agency preserved:
- ensemble speakers distinguishable:
- token tradeoff:
- next skill:
```

## Quality rules

- Do not stop at natural, gentle, cold, witty, elegant, chaotic, or human-like.
  Convert the intended feeling into sentence rhythm, vocabulary, tells, choices,
  refusals, and action beats.
- Do not use a catchphrase as the whole voice. A repeated phrase is only useful
  if it changes under trust, resistance, or pressure.
- Do not let a refined voice decide the player's feelings, consent, attraction,
  loyalty, or next action.
- Do not add long sample scenes when a compact voice card would preserve the
  behavior. Samples should teach reusable response behavior, not decorate the
  card.
- Do not make every speaker in an ensemble different only by punctuation,
  accent, or one quirk. Distinguish motive, fear, rhythm, pressure move, and
  player leverage.
- For Traditional Chinese cards, keep voice guidance, samples, and field targets
  consistently Traditional Chinese unless the author asks otherwise.
- Keep the output original and public-safe. Do not copy unprovided source text or
  make unsupported provenance claims.

## Handoff

Hand the packet to:

- `lunatalk-card-blueprint` when the card still needs premise, relationship,
  world, opening, or field planning.
- `lunatalk-card-author` when the author wants a real private card or patch.
- `lunatalk-chat-simulation` when transcripts show voice drift or generic
  replies and the author accepts normal simulation cost.
- `lunatalk-publish-readiness` when voice is the remaining blocker before public
  submission.
