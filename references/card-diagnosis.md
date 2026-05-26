# Moonloom Card Diagnosis

Use this reference when an existing LunaTalk role card, imported draft, render
report, validation result, simulation transcript, or author feedback contains
several symptoms and the agent must decide what to repair first.

Card diagnosis is not a rewrite. It is a triage loop:

```text
evidence -> weakest layer -> source field -> narrow skill -> patch plan -> verification
```

The goal is to stop agents from polishing prose, adding lore, or spending another
simulation pass before the actual card engine is repaired.

## Inputs

Accept any public-safe summary of:

- card shape, author goal, language, and content rating intent
- `roleDesc`, `roleDetailDesc`, `roleWelcome`, XMLV3/HTML, Theme V3, or
  `talkExample` snippets
- `validate_role` blockers or `tokenBudget` signals
- render review findings
- simulation transcript summary or structured evaluation
- author feedback such as boring, passive, too generic, too verbose,
  controlling, confusing, out of character, or not ready

Do not require raw source material. Do not invent separate review storage.
The author feedback surface is the agent conversation.

## Diagnosis packet

Return this packet before patching fields:

```text
Card diagnosis packet:
- current request:
- available evidence:
- card shape:
- primary failure:
- secondary failures:
- do not rewrite yet because:
- repair order:
- symptom map:
  - symptom:
  - likely missing layer:
  - source field:
  - narrow Moonloom skill:
  - patch target:
- field triage:
  - roleDesc:
  - roleDetailDesc:
  - roleWelcome:
  - talkExample:
  - XMLV3 / Theme V3:
- keep / move / cut / rewrite:
- packets to preserve:
- packets to create next:
- author-facing patch plan:
- validation / render / simulation rerun plan:
- stop conditions:
- handoff:
```

## Repair order

Use evidence, not taste, to choose order. When multiple symptoms exist, prefer:

1. Technical blockers: required fields, unsafe HTML, invalid XMLV3, unsupported
   tags, ownership, publish prerequisites.
2. Boundary risk: mature, jealous, coercion-adjacent, horror, power imbalance,
   refusal, pacing, or stop-condition gaps.
3. Token allocation: `welcomeToDetailRatio` above `2`, bloated welcome, thin
   detail, duplicated lore, misplaced durable rules, or visual panels carrying
   the engine.
4. Archetype contract: mixed card type, unclear primary loop, generator/story/RPG
   conflict, or companion promise drowned by assistant mode or setting lore.
5. Durable engine: thin character core, flat relationship, mood-only daily-life,
   inert world, missing player leverage, no state/consequence, no route pressure.
6. Agency and opening: spectator play, decorative choices, route funneling,
   generic questions, missing first reply path, missing second-turn move.
7. Longplay: dead third turn, no memory, no route costs, passive role, no scene
   renewal.
8. Voice: polite assistant tone, generic dialogue, repeated catchphrase, refusal
   voice drift, ensemble blur.
9. Render and simulation: rerun only after structural patches that change visual
   markup, behavior, state, boundaries, voice, or first-turn flow.

This order is a default. If evidence shows a single narrow blocker, route
directly to that narrow skill.

## Symptom map

| Symptom | Likely missing layer | Source field | Narrow skill |
|---|---|---|---|
| Pretty premise but vague expectation | Promise | `roleDesc` | `lunatalk-profile-packager`, `lunatalk-card-blueprint`, or `lunatalk-archetype-director` |
| Generic roleName, overlong roleDesc, vague tags, or weak reason to open | Profile packaging / promise compression | `roleName`, `roleDesc`, tags | `lunatalk-profile-packager` |
| Biography or trivia with no present pressure | Character core / world engine | `roleDetailDesc` | `lunatalk-character-core` or `lunatalk-world-engineer` |
| Long visual welcome carries lore/rules | Token architecture / opening | `roleWelcome`, XMLV3/HTML | `lunatalk-token-architect` then `lunatalk-opening-director` |
| Choices all return to same response | Agency / consequence | `roleWelcome`, `roleDetailDesc` | `lunatalk-agency-designer` |
| Role waits or asks generic questions | Opening / role initiative | `roleWelcome`, `roleDetailDesc` | `lunatalk-opening-director`, `lunatalk-longplay-architect` |
| Boring after one reply | Longplay / durable engine | `roleDetailDesc` | `lunatalk-longplay-architect` |
| Polite assistant voice | Voice / weak core | `roleDetailDesc`, `talkExample` | `lunatalk-voice-director` |
| Relationship becomes comfort/flirting loop | Relationship engine | `roleDetailDesc`, `roleWelcome` | `lunatalk-relationship-architect` |
| Quiet routine becomes mood-only small talk | Daily-life engine | `roleDetailDesc`, `roleWelcome` | `lunatalk-daily-life-architect` |
| Lore dump during chat | World engine / token economy | `roleDetailDesc`, `roleWelcome` | `lunatalk-world-engineer`, `lunatalk-token-architect` |
| RPG resources, inventory, quests, or combat do not change choices | Play engine | `roleDetailDesc`, `roleWelcome` | `lunatalk-play-engineer` |
| Compact state is forgotten or not updated | Play engine / longplay | `roleDetailDesc`, `roleWelcome` | `lunatalk-play-engineer`, `lunatalk-longplay-architect` |
| Failure ends the story or has no consequence | Play engine / agency | `roleDetailDesc` | `lunatalk-play-engineer`, `lunatalk-agency-designer` |
| Render is pretty but inert | Opening / agency / token | `roleWelcome`, XMLV3/Theme V3 | `lunatalk-render-review`, `lunatalk-opening-director` |
| Simulation passes safety but feels generic | Character / voice / longplay | `roleDetailDesc`, `talkExample` | choose by transcript evidence |
| zh-Hant fields mix scripts, pronouns, register, or tags | Language style | profile, detail, welcome, examples, tags | `lunatalk-language-stylist` |

## Field triage

- `roleDesc`: should state promise, player relation, and tension. Rewrite vague
  aesthetic descriptions into one scannable contract. Use
  `lunatalk-profile-packager` when the package fields are the main weak layer.
- `roleDetailDesc`: should carry durable engine: character core, relationship,
  daily-life routine, or world rules, agency boundaries, voice, state, route
  costs, and role initiative.
- `roleWelcome`: should be one playable first screen, not the full card manual.
- `talkExample`: should teach reusable voice, refusal, pressure, output format,
  or route behavior; otherwise cut.
- Language style: profile, detail, welcome, examples, and user-facing tags should
  share one target language, script, register, and pronoun/address matrix. Use
  `lunatalk-language-stylist` when this is the main weak layer and the engine,
  opening, and voice card are otherwise coherent.
- XMLV3 / Theme V3: should reveal state, mood, route, or choices that help the
  player act. Move reusable styling to Theme V3 when possible.

## Patch plan rules

- Diagnose before rewriting. Do not turn a multi-symptom failure into a full-card
  rewrite unless the engine is underdefined.
- Preserve working packets. If opening works but longplay fails, do not rewrite
  the opening except for state handoff.
- Patch the smallest source field that can fix the observed failure.
- When token allocation is broken, move durable rules into `roleDetailDesc`
  before polishing the welcome.
- When feedback is vague, convert it into observable failure triggers: generic
  reply, no next action, route funneling, voice drift, agency takeover, lore dump,
  or repeated setup.
- Keep quality checks in Moonloom. MCP validation should handle technical
  blockers, not subjective writing taste.

## Verification plan

Before spending simulation cost, state:

```text
Verification plan:
- validate_role: needed because ...
- render_preview: needed because ...
- simulation: needed because ...
- probes:
  1. ...
- patch triggers:
- cost stance:
```

If the current evidence already proves the failure, patch first and simulate
later. Rerun simulation only when the patch changes behavior, boundary handling,
state, voice, or first-turn flow.
