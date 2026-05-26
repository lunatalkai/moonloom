---
name: lunatalk-ensemble-director
description: Use when a LunaTalk role-card task involves ensemble cards, multi-character cards, multiple active speakers, cast size, speaker merge/cut decisions, group scenes, turn ownership, spotlight rules, cast crowding the player, roll-call openings, group tension, or keeping several speakers playable before blueprinting, authoring, opening repair, voice calibration, simulation, or publish readiness.
---

# LunaTalk Ensemble Director

Use this skill when the weak layer is multi-character structure. The output is an
ensemble packet, not a full role card and not a mutating MCP operation.

This skill prevents ensemble cards from becoming cast lists, roll-call welcomes,
or conversations where characters talk over the player. It coordinates cast
scope, player leverage, turn ownership, spotlight, group state, voice contrast,
token cost, and test probes before narrower Moonloom skills write fields.

## Required references

Read `../../references/ensemble-card-design.md` first. Read
`../../references/archetype-contracts.md` when choosing whether ensemble is the
primary contract or an overlay. Read `../../references/voice-calibration.md` when
speakers blur or `talkExample` may be needed. Read
`../../references/opening-design.md` when the first screen is a roll call or has
no player-facing crisis. Read `../../references/agency-design.md` when the cast
crowds out the player. Read `../../references/longplay-design.md` when group
tension needs memory or route continuation. Read `../../references/token-economy.md`
when cast, samples, or XMLV3 bloat fields. Read
`../../references/card-authoring-templates.md` for handoff packet shape.

## Boundary

Do not call MCP tools from this skill. Do not write or patch real role fields
unless the author explicitly continues through `lunatalk-card-author`.

Do not treat ensemble quality as an MCP/server validation gate. MCP validation
can catch mechanical issues; Moonloom handles cast focus, agency, voice, and
playability.

## Workflow

1. Restate the ensemble seed or failure: new design, roll-call welcome, cast
   crowding, blurred speakers, token bloat, or weak player role.
2. Decide whether ensemble is the primary contract or an overlay. Use
   `lunatalk-archetype-director` when card shape is still unresolved.
3. Define player role and player leverage before keeping the cast. The player
   must be able to affect clue, route, trust, alliance, risk, access, or boundary.
4. Build the cast decision matrix. Keep, merge, or cut speakers based on play
   function, not how interesting their biography sounds.
5. Define conflict network and group tension state.
6. Define turn ownership: opening focus, first speaker, interrupter,
   holder-back, secondary entry rules, max active speakers per turn, and when a
   speaker must address the player.
7. Define spotlight rules and opening focus. If the welcome is the main failure,
   hand off to `lunatalk-opening-director` after the ensemble packet.
8. Define voice contrast and `talkExample` decision. Use `lunatalk-voice-director`
   for detailed voice cards or blind-line repair after cast structure is clear.
9. Produce token plan and field allocation.
10. Produce agency and simulation probes, then hand off to blueprint, authoring,
    opening repair, voice calibration, longplay, or chat simulation.

## Output format

Return:

```text
Ensemble packet:
- current seed or failure:
- card shape:
- ensemble promise:
- cast scope:
- player role:
- player leverage:
- cast decision matrix:
  - [speaker]: function, want, fear/cost, speech cue, pressure move,
    player leverage, keep / merge / cut
- conflict network:
- turn ownership:
  - opening focus:
  - first speaker:
  - interrupter:
  - holder-back:
  - secondary entry rules:
  - max active speakers per turn:
  - when the player must be addressed:
- spotlight rules:
- group tension state:
- opening focus:
- voice contrast plan:
- talkExample decision:
- token plan:
- agency and simulation probes:
- field allocation:
- handoff:

Self-review:
- every core speaker changes play:
- player is not crowded out:
- opening is not a roll call:
- turn ownership is explicit:
- group tension is trackable:
- voices pass blind-line risk check:
- token spend is justified:
- next skill:
```

## Quality rules

- Keep 2-5 active core speakers for most cards. More speakers need a simulator or
  large-system reason.
- Merge speakers that share function, want, pressure move, rhythm, and player
  leverage. Cut or demote speakers who cannot change play.
- Do not let every speaker introduce themselves in the welcome. Start with one
  focal crisis.
- Do not allow cast dialogue to replace player agency. After a speaker-to-speaker
  conflict, pressure must return to the player.
- Limit active speakers per turn. Usually one or two speakers is enough.
- Do not distinguish speakers only by name, punctuation, accent, or a catchphrase.
  Distinguish motive, fear, pressure move, rhythm, vocabulary, and player leverage.
- Add micro-samples only when rules cannot preserve voice or turn style.
- Keep output original and public-safe. Do not copy unprovided material or make
  unsupported source, ranking, traffic, analytics, or provenance claims.

## Handoff

Hand the packet to:

- `lunatalk-archetype-director` when ensemble might be only an overlay under
  story, relationship, RPG, or heavy-setting.
- `lunatalk-card-blueprint` when the author wants a card-ready blueprint after
  cast structure is clear.
- `lunatalk-card-author` when the author wants an MCP-backed private card or
  patch.
- `lunatalk-opening-director` when the first screen is a roll call or lacks a
  focal crisis.
- `lunatalk-voice-director` when speakers still blur after cast decisions.
- `lunatalk-agency-designer` when the cast still crowds out the player.
- `lunatalk-longplay-architect` when group tension needs route memory and
  continuation.
- `lunatalk-chat-simulation` when transcripts show cast-over-player behavior,
  blurred speakers, or ignored player choices and the author accepts normal
  simulation cost.

