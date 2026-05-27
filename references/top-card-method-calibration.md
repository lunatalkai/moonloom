# Moonloom Top-Card Method Calibration

Use this reference when Moonloom is allowed to use anonymized benchmark reading
to improve a role-card draft, skill, template, prompt framework, XMLV3 guidance,
or test method. This reference describes public-safe craft patterns only. It
does not preserve source text, identifiers, exact markup, source names, source
URLs, private tool output, or claims about where the public guidance came from.

The calibration goal is practical:

```text
aggregate calibration -> deep sample reading -> top vs ordinary contrast ->
public-safe method -> original card draft -> MCP validation/render/playtest
```

## Source Safety

Before any benchmark-derived learning enters Moonloom, rewrite it as generalized
craft guidance.

- Do not store raw source text, exact names, exact markup, IDs, source URLs,
  account details, private queries, private ranking logic, or protected metrics.
- Do not describe public Moonloom files as copied from or originating from
  restricted sources.
- Keep only abstract structure: field allocation, engine modules, opening
  functions, interaction rules, state/pacing patterns, and presentation gaps.
- Use synthetic examples when an example is needed. Do not paraphrase a source
  scene closely enough to preserve its specific characters, events, or wording.

## Aggregate Calibration

Aggregate calibration catches broad allocation drift before field writing. Use it
to compare a draft's shape against anonymized patterns, not to chase popularity.

Check these signals:

- `roleDetailDesc` length by language and card ambition
- welcome length and welcome-to-detail ratio
- whether the premise has a recognizable public-facing shelf before the novelty
  layer
- profile/detail/welcome/talkExample field balance
- HTML-like, XMLV3-like, plain text, and Theme V3 presentation posture
- whether the card shape needs state, choices, forms, layout grouping, or plain
  prose
- whether the draft underuses the language's available field budget

Treat numbers as guardrails. A long field is not strong by itself; a short field
is only acceptable when it still contains the complete operating engine for that
card shape.

## Deep Sample Reading

Do not stop at length statistics. Read complete high-quality samples and extract
only abstract craft observations:

- what the detail field makes future turns do
- how the role behaves when the player is passive, brief, evasive, or resistant
- which rules are durable prompt and which belong only to the first screen
- how state, time, secrets, resources, route locks, or relationship variables
  change later choices
- how the first screen proves the card's promise without becoming a manual
- where presentation improves scanning, route choice, or state comprehension
- where HTML-like visual structure exposes a real XMLV3/Theme V3 capability gap

The useful output is not a quote. It is a repair target such as "the detail has
no consequence clock" or "the welcome shows mood but not the first player
decision."

## Top vs Ordinary Contrast

Strong cards usually spend detail budget on an operating system. Weaker cards
often spend it on biography, aesthetic, ability lists, or an attractive opening
without enough rules for turn two.

Use this contrast table when auditing a draft:

| Dimension | Strong pattern | Weak pattern |
|---|---|---|
| Detail operating engine | Motive, pressure, state, triggers, voice, agency, consequences | Character facts and adjectives |
| Premise legibility | Recognizable shelf, concrete player position, human-scale first action, novelty as overlay | Abstract mood or invented institution before the player knows what to do |
| Player role | Concrete leverage, risk, knowledge, and routes | "You can do anything" with no action surface |
| Role initiative | Role asks, tests, reveals, delays, bargains, or complicates | Role waits for the player to carry every beat |
| Longplay hook | Timers, secrets, return hooks, route costs, memory changes | One pretty scene with no renewal path |
| Opening first-turn contract | Scene, role action, pressure, and 2-4 meaningful reply paths | Mood prose or setup form without consequence |
| Presentation | XMLV3/Theme V3 makes state, choices, and sections scannable | Markup is decorative or hides the engine |

## Bilingual Budget Translation

Do not use the same character-count intuition for every locale.

- Non-English high-ambition cards commonly need a large share of the available
  detail field for engine coverage. Target complete modules before trimming.
- English has a much wider detail cap and lower information density per
  character. Use word/token proxy and module coverage rather than applying the
  non-English target directly.
- A bilingual method should ask "which modules are covered?" before "how many
  characters did we use?"
- Welcome budgets differ too. Keep durable mechanics in detail so the welcome can
  stay playable and legible on mobile.

## Detail Operating Engine

Before final fields, require these modules to be either present or intentionally
omitted for a lightweight card:

- identity and current want
- contradiction, wound, debt, taboo, or pressure source
- player position and leverage
- world/scenario functions that change access, risk, or cost
- proactive turn behavior for passive, brief, resistant, and curious players
- voice rhythm, address rules, action tells, and refusal style
- state, route, clue, relationship, or resource changes
- time/consequence rules
- secret/reveal pacing
- agency boundaries
- format stability for XMLV3, Theme V3, state, or tool output

If the draft lacks several modules, expand the engine before polishing prose.

## Premise Legibility Gate

Before a card becomes field-ready, pass the five-second legibility test:

- What familiar shelf is this card on?
- Where is the player in the first scene?
- Who is the role in ordinary terms?
- Who is the player in ordinary terms?
- What can the player do first?

Strong cards can be strange, but the strangeness sits on a recognizable contract:
school, survival, household visit, workplace duty, investigation, journey,
competition, simulator, generator, mission, tabletop adventure, or relationship
obligation. If the answer is mostly a poetic place, metaphysical object, mood, or
private term, route back to `lunatalk-premise-workshop` before blueprinting.

Novelty should change routes, costs, secrets, relationships, or state. It should
not make the first screen harder to understand.

## Opening First-Turn Contract

The first screen should prove the card by doing four jobs:

1. Place the player with Who / Where / When / What before mood.
2. Let the role or system act first.
3. Show the central pressure through a concrete object, risk, clue, demand, or
   social consequence.
4. Offer meaningful reply paths that alter route, state, information, or tone.

Avoid writing an opening that explains all rules. Move durable protocol and
longplay logic into detail.

## Longplay Hook

Every high-ambition card needs at least one renewal path after the first reply:

- a time clock that advances when the player delays
- a secret that changes behavior before revelation
- a relationship variable that affects access, tone, or risk
- a resource, injury, debt, reputation, clue, or promise that can be gained or
  lost
- an NPC or system action that happens even if the player is passive
- a route fork that can be refused, redirected, or revisited

The hook should create new play, not simply reward the player with a bigger
scene.

## XMLV3 Presentation Gap

Legacy HTML can express arbitrary color, nested wrappers, and highly customized
section blocks. New cards should first try XMLV3 plus Theme V3, but Moonloom
must notice when XMLV3 lacks a stable equivalent.

Use this XMLV3 method:

- Put meaning in XMLV3 tags and reusable visual identity in Theme V3.
- Use layout pack tags such as `panel`, `stack`, `row`, `grid`, and `divider`
  when the card needs HTML-like grouping.
- Use `tone`, `variant`, or other theme-bound attributes for semantic styling;
  let Theme V3 decide actual color and contrast.
- Use `<state>` for machine-readable state, and visible status prose or panels
  for what the player should inspect.
- Put forms and choices outside the main scene when they are controls, not prose.
- Keep fallback readable if a client does not support a pack.
- If an HTML pattern cannot be represented well, record a compatible XMLV3
  extension idea. Do not turn taste into a server gate.

## SOP

Use this operating sequence for benchmark-calibrated creation:

1. Build an anonymized benchmark pattern packet from aggregate calibration, deep
   sample reading, and ordinary-card contrast.
2. Pass the premise legibility gate or route back to premise workshop.
3. Choose the card shape and language budget target.
4. Draft the detail operating engine before writing final prose.
5. Draft the opening first-turn contract separately from durable rules.
6. Choose XMLV3/Theme V3 presentation, layout pack, or justified HTML fallback.
7. Run field finalization: caps, placeholders, language consistency, asset
   readiness, and public-safe originality.
8. Create or patch the private role through MCP.
9. Run `validate_role`.
10. Run `render_preview` for desktop and mobile when presentation density matters.
11. Run conversation playtest with `conversation_send_message`,
    `conversation_inspect`, and per-message preview evidence.
12. Compare failures against the benchmark pattern packet and patch one weakest
    layer at a time.

## Prompt Framework

Use this prompt skeleton when asking an AI client to draft or repair a card from
the public-safe method:

```text
Write an original LunaTalk role card in [language] for [card shape].

Use benchmark-calibrated structure, not copied content:
- detail must be a runnable operating engine
- welcome must prove the first-turn contract
- longplay must include state, consequence, route, secret, resource, or time
- player agency must stay open
- XMLV3/Theme V3 should make the output scannable without arbitrary HTML unless
  a justified fallback is needed

Return:
- profile fields
- detail operating engine
- welcome XMLV3
- state / choice / layout plan
- validation, render, and playtest plan
- source safety check confirming no raw source, no exact names, no exact markup,
  no identifiers, and no provenance claim
```

## Testing Method

Benchmark-calibrated cards are not accepted by reading alone.

Run these tests:

- field review: detail modules, budget target, welcome ratio, language
  consistency, assets, originality, and safety posture
- XMLV3 review: valid tags, state JSON, layout fallback, controls outside the
  scene, Theme V3 binding, and mobile density
- MCP validation: `validate_role` blockers before render
- visual review: `render_preview` full-card plus desktop/mobile preview when
  controls or state are dense
- behavior review: conversation create/send/inspect with several probes
- per-message preview review: inspect AI reply rendering, state surface, and
  choices without normal chat-page chrome

Minimum playtest probes for high-ambition cards:

- short passive reply
- direct question about the pressure
- refusal or boundary-setting reply
- route-changing reply
- state or resource query
- follow-up after the role has already answered once
- presentation probe that checks whether XMLV3 controls survive real chat

## Top-Card Method Calibration Packet

Return this packet before changing fields or public guidance:

```text
Top-card method calibration packet:
- calibration scope:
- source safety:
  - no raw source:
  - no exact markup:
  - no identifiers:
  - no source URLs:
  - no provenance claim:
- aggregate calibration:
- deep sample reading:
- top vs ordinary contrast:
- bilingual budget translation:
- detail operating engine gap:
- premise legibility gap:
- opening first-turn contract gap:
- longplay hook gap:
- XMLV3 presentation gap:
- prompt framework changes:
- SOP changes:
- testing method changes:
- next Moonloom skill:
- handoff:
```
