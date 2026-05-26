# Moonloom Material Distillation

Use this reference when an author gives notes, drafts, local files, world bibles,
setting packs, outlines, pasted fragments, or other source material and wants a
LunaTalk role card. The goal is to turn material into a playable card engine, not
to compress every fact into `roleDetailDesc`.

## Core rule

Distill source material into decisions for play:

```text
Source material -> playable promise -> player role -> first scene -> durable rules
-> state/consequence loop -> card fields
```

A good distillation preserves the author's intent while cutting anything that
does not change player agency, role behavior, state, consequence, voice, or the
first few scenes.

## Source hygiene

Before using material, establish what it is and whether the author is allowed to
use it.

- Use only material the author provides or asks the agent to inspect.
- Do not copy long source passages into the card. Rewrite into original,
  card-native rules, scenes, and voice guidance.
- If the material contains personal, confidential, or irrelevant details, omit
  them unless the author explicitly wants a fictionalized counterpart.
- Preserve public attribution only when the author requests it and it belongs in
  the card. Most role cards do not need source provenance in player-facing text.
- When adapting copyrighted or canon-like material, keep only the requested
  playable fantasy, relationship shape, tone, and scene mechanics unless the
  author has rights or explicitly wants a fan/canon card.

## Distillation passes

Run these passes in order. Do not start by summarizing everything.

1. Inventory: list the material types and what each can contribute.
2. Promise extraction: identify the fantasy, player relationship, and tension.
3. Playability filter: keep only facts that create choices, costs, routes,
   pressure, voice, or state.
4. Compression: merge duplicate factions, locations, rules, and backstory beats.
5. First-scene selection: choose one place, one pressure, and one player action
   surface.
6. Engine mapping: assign durable facts to `roleDetailDesc`, immediate play to
   `roleWelcome`, reusable visuals to XMLV3/Theme V3, and examples only when they
   teach voice or output format.
7. Gap list: ask for missing inputs only when they block the card. Otherwise make
   explicit assumptions and continue.

## Source-to-play map

Return this map before authoring:

```text
Material inventory:
- source A:
- source B:

Playable promise:
- fantasy:
- player role:
- central tension:

Keep for roleDetailDesc:
- durable rule:
- character/relationship engine:
- state or consequence:
- voice anchor:

Use in roleWelcome:
- starting location:
- immediate pressure:
- role action:
- player implication:

Delay or cut:
- delay until later play:
- cut because it does not affect play:

Merge decisions:
- combine:
- rename/generalize:
- simplify:

Open assumptions:
- assumption:
- why it is safe enough to proceed:

Handoff:
- ready for lunatalk-card-blueprint: yes | no
- ready for lunatalk-card-author: yes | no
- next missing input:
```

## Keep / delay / cut

Keep now:

- the player's position and leverage
- the role's desire, contradiction, boundary, and voice
- one immediate pressure that starts the scene
- 2-4 route seeds with costs
- compact state that changes future turns
- rules that let the role generate new scenes

Delay:

- history that matters only after trust, route, or location changes
- secondary factions or NPCs that do not affect the first scene
- advanced mechanics that are not needed in the opening loop
- rare edge cases and exceptions

Cut:

- repeated names, dates, genealogies, faction lists, or object catalogs
- facts that only prove the world is large
- prose that restates mood without changing behavior
- visual descriptions that belong in Theme V3 rather than card logic
- source wording that would make the card feel pasted instead of authored

## Large-world compression

For heavy settings, reduce the world into modules:

```text
Premise summary: one paragraph
Player position: one sentence
Core rule: one or two rules that generate scenes
Locations: only places the player can visit, lose, unlock, protect, or escape
Factions: only groups that create offers, threats, obligations, or routes
State: 3-7 keys that change play
Routes: 2-4 branches with costs
First scene: one concrete problem that uses the setting immediately
```

If a named entity does not create a possible action, obstacle, cost, reward, or
relationship pressure, it should not be in the first card draft.

## Character-source compression

When source material describes a character in detail, reduce it into:

- desire: what they want now
- contradiction: what blocks or complicates that desire
- boundary: what they will not do, reveal, or accept
- player leverage: what the player can change
- voice: rhythm, vocabulary, tells, concealment, refusal style
- turn behavior: passive player, resistant player, trusting player, boundary push
- progression: what changes slowly across play

Backstory matters only when it changes a current choice, fear, habit, or
relationship pressure.

## Material conflict handling

When sources contradict each other:

1. Prefer the version that creates clearer play.
2. Preserve ambiguity only when the card is about investigation or unreliable
   truth.
3. Move low-confidence facts to route seeds or rumors.
4. Ask the author only if the conflict changes the player role, rating, central
   relationship, or first scene.

## Token budget

Material-heavy cards fail when all source facts are treated as equal. Spend tokens
in this order:

1. playable promise and player role
2. role/world engine
3. consequence/state loop
4. first scene
5. voice calibration
6. route seeds
7. examples only when they teach behavior

Cut source material before cutting agency, consequence, voice, or state.

## Handoff quality bar

The material distillation is ready when:

- the player can act in the first scene without reading a lore manual
- each retained source fact has a play reason
- there is a compact token plan
- unresolved gaps are explicit assumptions, not hidden uncertainty
- the next skill can produce a blueprint or role fields without rereading the
  entire material pack
