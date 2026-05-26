# Moonloom Profile Packaging

Use this reference when the role card's engine is coherent but the public-facing
surface is weak: `roleName`, `roleDesc`, tags, first-impression promise, or the
reason a player should open the card.

Profile packaging is not publish readiness. It is the promise layer of the card:

```text
engine -> promise angle -> name / roleDesc / tags -> first-impression check
```

The goal is to make a new player understand the fantasy, their relationship to
the role, and the playable tension in a few seconds without inventing platform
performance claims.

## When to use

Use profile packaging when:

- `roleName` is generic, interchangeable, too long, or only a trope label
- `roleDesc` is too long, vague, mood-only, lore-heavy, or missing player relation
- tags are broad mood labels instead of useful card-shape and play-loop signals
- the author asks for title, tagline, one-line pitch, short description, tags,
  card profile, discovery surface, or first impression
- the draft is coherent but the visible promise does not explain why to open it

Route away when:

- the premise itself is not settled: use `premise-workshop.md`
- the primary card contract is unclear: use `archetype-contracts.md`
- the durable engine is missing: use character, relationship, world, scenario,
  daily-life, play, agency, or longplay guidance first
- the author asks whether the whole draft is good enough: use
  `quality-scorecard.md`
- the author is submitting publicly now: use publish readiness after packaging

## Promise angle

Before writing names or tags, extract the promise angle:

```text
Promise angle:
- card shape:
- player role:
- role / system:
- central tension:
- repeated play loop:
- strongest unusual detail:
- boundary / rating posture if relevant:
- first-screen proof:
```

If any of these are unknown, do not fake certainty. Mark the missing item and
handoff to the narrow skill that can define it.

## Name patterns

Strong `roleName` usually combines specificity with a playable signal:

| Pattern | Use when |
|---|---|
| `[Name], [specific pressure role]` | persona-led cards |
| `[Place/Object/System] of [playable rule]` | world, mystery, or system cards |
| `[Role] Who [contradiction/action]` | trope repair or strong hook cards |
| `[Group/Event] at [pressure point]` | ensemble or scenario cards |

Avoid:

- generic archetypes such as "Vampire Boyfriend" or "Fantasy Adventure"
- names that hide the playable premise behind only mood
- joke names unless the card's contract is comedic
- multiple subtitles that make the name look like a synopsis

Return 3 candidates, then choose one. Each candidate should imply a different
angle, not just swap adjectives.

## roleDesc patterns

Use one compact sentence. For most cards target 80-260 characters; use up to 500
only for systems, RPGs, generators, or complex ensemble cards.

Core patterns:

```text
[Player role] enters [situation] with [role/system], where [tension] creates [play loop].
```

```text
[Role/system] needs [player leverage] before [external pressure] breaks [relationship, secret, mission, or world rule].
```

```text
You keep meeting [role] during [routine], where [small pressure] slowly changes [relationship, habit, or route].
```

```text
Lead [position] through [world/system], managing [resource/risk] as choices change [state or route].
```

Cut from `roleDesc`:

- backstory that belongs in `roleDetailDesc`
- multiple proper nouns before the player knows what they do
- mood stacks such as beautiful, dark, mysterious, emotional, immersive
- unsupported performance claims such as popular, top, viral, best, trending
- safety or policy disclaimers that belong in boundary handling

## Tag set

Tags should help the author and agent see the card's contract. They are not a
ranking strategy or analytics claim.

Build 4-8 tags from these buckets:

1. primary card shape: companion, scenario, mystery, RPG, generator, daily-life,
   heavy-setting, light-setting, ensemble, system
2. relationship or role axis: mentor, rival, neighbor, partner, crew, suspect,
   patron, witness, caretaker, contractor
3. player action loop: investigation, negotiation, survival, cohabitation,
   exploration, ritual, management, repair, confession, route-choice
4. tone / rating posture: cozy, eerie, slow-burn, comedic, intense, horror,
   boundary-sensitive, low-stakes
5. special mechanic or format: compact-state, XMLV3, Theme-V3, inventory,
   clue-route, memory-thread, multi-speaker

Prefer concrete tags over duplicate synonyms. Do not include internal product,
traffic, ranking, or audience-size claims.

## First-impression check

Before handoff, answer:

- Can a new player describe who they are in this card?
- Can they name what pressure or desire starts play?
- Does `roleName` plus `roleDesc` promise something the first screen proves?
- Are tags specific enough to distinguish this card from nearby archetypes?
- Did packaging avoid changing the engine or inventing unearned claims?

## Profile package packet

Return this packet:

```text
Profile package packet:
- current request:
- card shape:
- language:
- premise / engine preserved:
- promise angle:
  - player role:
  - role / system:
  - central tension:
  - repeated play loop:
  - strongest unusual detail:
  - first-screen proof:
- roleName candidates:
  - candidate:
  - angle:
  - risk:
- selected roleName:
- roleDesc candidates:
  - candidate:
  - char estimate:
  - angle:
  - cut / moved:
- selected roleDesc:
- tag set:
  - primary shape:
  - relationship / role axis:
  - action loop:
  - tone / rating:
  - mechanics / format:
- first-impression check:
- fields to preserve:
- fields to patch:
- handoff:
```

## Common repairs

| Failure | Repair |
|---|---|
| Name is only a trope | add specific pressure role or contradiction |
| roleDesc is a synopsis | keep one player relation, one tension, one loop |
| Tags are mood-only | add card shape and player action loop |
| First impression overpromises | align roleDesc with the first-screen proof |
| Public package changes the card | preserve the engine and patch only profile fields |
| Author asks for "top" phrasing | translate to clarity, specificity, agency, and hook |

## Public-safety posture

Keep the package original and public-safe. Do not mention source cards, private
examples, internal metrics, rankings, traffic, user behavior, or non-public
origin. Treat "popular" or "top-tier" as craft goals: clear promise, specific
player role, distinct pressure, scannable length, and honest handoff.
