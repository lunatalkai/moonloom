# Moonloom Token Economy

Use this reference when a role card spends context in the wrong field, repeats
lore, bloats `roleWelcome`, hides durable rules in visual markup, or needs a
keep / move / cut / rewrite plan before render or simulation.

## Core Rule

Tokens are not a length target. They are attention budget. Spend them where they
change future behavior:

```text
promise -> durable engine -> playable opening -> compact state -> optional style
```

If the first screen is doing the work of the whole card, repair field allocation
before polishing prose.

## Token Architecture Packet

Return this packet before patching fields:

```text
Token architecture packet:
- current failure:
- archetype:
- token budget signal:
- target allocation:
- field triage:
- keep / move / cut / rewrite:
- compression ladder:
- visual budget:
- state budget:
- example budget:
- patch order:
- rerun checks:
- handoff:
```

## Reading Token Signals

Use `validate_role.tokenBudget` as a structural diagnostic, not as a taste
judgment.

- `roleDescChars`: promise layer for display/search. `roleDesc` is not sent as
  model input in normal chat, so do not use it for AI-input cost math.
- `roleDetailDescChars`: durable engine. Too short means the card may drift after
  the first turn.
- `roleWelcomeChars`: play layer. Too long usually means the welcome is carrying
  lore, rules, visual structure, or repeated monologue.
- `welcomeToDetailRatio`: allocation health. Above `2` with a long welcome is a
  strong signal to move durable content into detail.
- `estimatedTokens`: comparison signal. Use it to compare revisions, not as a
  billing statement.

## Tokenizer Baseline

For current card analysis, use `tiktoken` with `o200k_base` as the single
offline tokenizer baseline. Apply the same baseline to V2 HTML, XMLV3, Theme V3,
OpenAI, Claude, and unknown-provider budget reviews so diffs are comparable.
Treat the result as a local structure and attention-cost estimate, not an exact
provider billing statement.

Input-side budget is `roleDetailDesc + roleWelcome`, not `roleDesc`. Do not make
the detail engine hollow just to reduce tokens; a thin detail creates generic
characters and weak long chats.

When reviewing V2 HTML or XMLV3 bloat, measure both:

- full AI output tokens: everything the AI must generate per turn
- visible text tokens: prose, labels, and changed semantic values after stripping
  markup/CSS
- structure tokens: full AI output minus visible values, including repeated tags, attributes,
  inline CSS, class names, and wrapper scaffolding

A high structure-token share is a format attention problem, not just a cost
problem. It means the model is spending output and attention on layout syntax
instead of current scene change, state change, consequence, voice, and player
agency. The fix is usually to move reusable visual style into Theme V3 and make
XMLV3 emit only semantic structure and changed values.

## Field Targets

These ranges are starting points. Preserve playability before hitting a number.

### Language-aware detail budget

Field limits are ceilings, but high-quality cards should not leave the engine
empty. A draft is an empty budget or thin detail candidate when it spends less
than roughly one third of the useful `roleDetailDesc` room while still missing
durable behavior, route cost, state, voice, boundary handling, or return-later
memory.

Use language-aware limits:

- 10,000-character non-English `roleDetailDesc` limit: mature Chinese, Japanese,
  Korean, or mixed-locale role cards can often justify 5,000-10,000 characters
  when the detail is a modular role engine.
- 50,000-character English `roleDetailDesc` limit: English carries less
  information per character, so do not judge an English card by Chinese
  character counts. Use word/token proxy and require enough English detail to
  preserve the same engine depth.
- 3,000-character non-English `roleWelcome` limit and 10,000-character English
  `roleWelcome` limit: welcome can be longer for setup UI, but it should not
  steal reusable rules from detail.

A full-detail candidate is not padded prose. It is a card whose detail budget is
actively buying future behavior: identity, motive, current pressure, relationship
rules, world functions, proactive moves, voice, emotional reactions, longplay
hooks, time/consequence logic, secrets, player insertion space, agency
boundaries, and output format stability.

For XMLV3 cards, output format stability does not mean pasting the platform
XMLV3 server guide into `roleDetailDesc`. The server guide owns generic tag
syntax. Detail owns the role-specific format contract: when this card emits
choices, what state fields can change, which visible status labels matter, which
extension pack is intentionally enabled, and what the assistant must not decide
for the player. Do not copy a generic XMLV3 manual into detail.

Do not pad. Fill detail until the next section would no longer improve later
turns. Then stop.

| Archetype | roleDesc | roleDetailDesc | roleWelcome |
|---|---:|---:|---:|
| Companion / relationship | 80-260 | 2,000-5,000 non-English; 6,000-15,000 English | 250-700 |
| Daily-life | 80-220 | 1,800-4,500 non-English; 5,000-12,000 English | 200-600 |
| Story / mystery / scenario | 120-260 | 4,000-8,000 non-English; 10,000-25,000 English | 600-1,200 |
| Ensemble | 140-300 | 5,000-10,000 non-English; 12,000-30,000 English | 700-1,400 |
| System / RPG / sandbox | 180-500 | 7,000-10,000 non-English; 18,000-50,000 English | 900-2,000 |
| Generator / assistant | 180-500 | 5,000-10,000 non-English; 12,000-35,000 English | 700-1,600 |

When unsure, keep `roleWelcome` below `roleDetailDesc` unless the welcome is a
true setup UI with forms, default paths, and immediate player control.

## Field Triage

| Field | Keep | Move | Cut | Rewrite |
|---|---|---|---|---|
| `roleDesc` | player role, situation, tension | rules, lore names | mood stacks, duplicate clauses | one scannable promise |
| `roleDetailDesc` | durable engine, voice, boundaries, state | hidden welcome rules | trivia, ornamental lists | compact labeled sections |
| `roleWelcome` | place/time, role action, pressure, player implication, reply paths | lore, rules, route logic | duplicated monologues, long panels | one playable scene |
| XMLV3/HTML | semantic tags, short state JSON | reusable visuals to Theme V3 | decorative layout with no action value | XMLV3 first; HTML only when needed |
| `talkExample` | small pressure samples when voice drifts | repeated monologue | samples that teach nothing | 2-4 micro-samples tied to behavior |

## Compression Ladder

1. Delete exact duplicates and repeated monologues.
2. Remove decorative visual panels that do not reveal state, action, route, or
   mood the player can use.
3. Move durable rules from `roleWelcome` into `roleDetailDesc`.
4. Convert lore into play functions: clue, cost, access, route, state, boundary,
   voice, or player leverage.
5. Replace mood-label choices with consequence choices.
6. Compress `roleDesc` into one promise sentence.
7. Rebuild `roleWelcome` from the five beats instead of shrinking a bad screen.
8. Add compact state only for values that change future replies.
9. Preserve character pressure behavior before preserving decoration.

## Visual Budget

Visual structure earns tokens only when it clarifies:

- what the player can do now
- what state changed
- which route or mode is active
- what mood or risk frames the scene

Use XMLV3 for semantic scene structure and Theme V3 for reusable style. Use HTML
only for a specific layout need that XMLV3 and Theme V3 cannot express.

For XMLV3, do not copy V2 HTML's token profile. Preserve the useful information
hierarchy, but avoid per-turn CSS, class-heavy wrappers, repeated speaker labels,
unchanged setup forms, and decorative panels. After setup, spend AI output tokens
only on the current beat, changed state, consequences, and next playable actions.

## Patch Order

1. Classify the archetype.
2. Read the token budget signal and name the allocation failure.
3. Rewrite `roleDesc` if it is not scannable.
4. Move durable rules, lore functions, voice, boundaries, and state into
   `roleDetailDesc`.
5. Use character core, world engine, agency, voice, opening, or longplay packets
   when the weak layer is not only length.
6. Rebuild `roleWelcome` as one playable screen.
7. Cut or move visual scaffolding.
8. Re-run self-review, then `validate_role`, then render or simulation only when
   the draft is worth testing.

## Self-Review

- Does each long section change future behavior, state, voice, route, or first
  action?
- Is `roleWelcome` a playable scene rather than a poster or manual?
- Can `roleDetailDesc` sustain the card after turn one?
- Did compression preserve desire, contradiction, boundary, player leverage,
  voice, route costs, and consequence?
- Did visual structure move to XMLV3/Theme V3 when it is reusable?
- Are examples short enough to teach behavior rather than consume context?
