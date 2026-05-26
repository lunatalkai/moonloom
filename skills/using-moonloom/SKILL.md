---
name: using-moonloom
description: Use when a task may involve Moonloom, LunaTalk MCP, external AI clients creating LunaTalk content, role cards, field-ready drafts, prepared packet stacks, card series or variants, ensemble or multi-character cards, story/scenario/mystery incidents, daily-life/slice-of-life routines, RPG/adventure play engines, compact state, resources, quests, material packs, character core, persona appeal, character voice, player agency, interaction hooks, worldbuilding, relationship networks, tokenBudget or token compression, opening or welcome repair, long-term playability, mature or boundary-sensitive cards, Theme V3/XMLV3, render review, private chat simulation, or publishing, especially when unsure which Moonloom skill applies.
---

# Using Moonloom

Moonloom is the skill framework for LunaTalk creation work. Use it to choose the
right specialized skill, guide the author through ideation and revision, and call
the MCP tools only when the card is ready for concrete creation, render review,
simulation, or publishing.

This is Moonloom's entry router. When an agent is unsure what to use, load this
skill first, classify the task, and then route to the narrowest matching skill.
This mirrors the start-with-the-router pattern: if a task might be Moonloom work,
route first and only then load narrower skills.

## Router rule

When there is any reasonable chance the task is about LunaTalk creation, role
cards, card quality, Theme V3/XMLV3, MCP card tools, render review, simulation,
or publishing, start with this skill and route from here. Do this before making
MCP calls or choosing a narrower Moonloom skill.

If the task says "not sure which skill", "which Moonloom workflow", "route this",
"use Moonloom", "use MCP later", or otherwise asks for tool/skill selection, stay
in this router until the route is explicit. The output should name the route,
mode, next skill, and handoff packet before doing any narrower work.

If the task is ambiguous, do not guess silently. Classify the author's intent,
pick the narrowest matching skill, and state the route in the response. If no
Moonloom skill fits, say so and proceed with the closest general workflow.

## Start here

1. Identify the author's current intent.
2. Pick the narrowest Moonloom skill that fits.
3. Load only the references needed for that workflow.
4. Keep all role edits on private cards unless the author is explicitly submitting
   a private card for public review.

## Skill routing

- Unsure which Moonloom skill applies, or deciding whether this is a Moonloom
  task at all: stay in `using-moonloom` long enough to classify and route.
- Quality audit, scorecard, craft rating, top-tier check, "is this good enough",
  first-three repairs, or deciding whether a draft, blueprint, packet stack, or
  role fields should continue to authoring, render review, simulation, or publish
  readiness: use `lunatalk-quality-auditor` unless the main task is a concrete
  multi-symptom diagnosis for an existing card.
- Existing card or draft diagnosis, mixed symptoms, author feedback like boring
  or off, validate/render passing but behavior still weak, simulation symptoms,
  deciding what to fix first, weakest-layer triage, field patch mapping, or
  keep/move/cut/rewrite repair order before rewriting fields: use
  `lunatalk-card-doctor` before token architecture, render review, authoring,
  simulation, or publish readiness.
- TokenBudget, estimatedTokens, roleDescChars, roleDetailDescChars,
  roleWelcomeChars, welcomeToDetailRatio, overlong welcome, field allocation,
  keep/move/cut/rewrite plans, compression, duplicated lore, HTML/XMLV3 bloat,
  misplaced durable rules, or preserving playability while reducing token cost:
  use `lunatalk-token-architect` before authoring, opening repair, render review,
  simulation, or publish readiness.
- Author-provided files, folders, material packs, pasted notes, existing drafts,
  imported content, large world bibles, or lore that must be compressed before
  card creation: use `lunatalk-material-distiller`.
- Mature, adult, NSFW, emotionally intense, horror-leaning, jealous, power-
  imbalanced, consent-sensitive, refusal, pacing, rating, or safer-version work:
  use `lunatalk-boundary-designer` before blueprinting, authoring, simulation, or
  publish readiness.
- Card type uncertainty, mixed archetypes, companion/story/RPG/system/generator
  ambiguity, hybrid cards, choosing the primary playable contract, field
  allocation by card type, or deciding which Moonloom skills to run before
  blueprinting: use `lunatalk-archetype-director`.
- Multiple related cards, role-card series, card set planning, alternate
  versions, spin-offs, seasonal/event variants, daily-life variants, RPG/system
  variants, generator/helper variants, or deciding which variants to keep,
  merge, reject, author, render, or simulate first: use
  `lunatalk-series-architect` before blueprinting or authoring individual cards.
- Ensemble cards, multi-character cards, multiple active speakers, cast size,
  speaker keep/merge/cut decisions, group scenes, turn ownership, spotlight
  rules, cast crowding the player, roll-call welcomes, or group tension: use
  `lunatalk-ensemble-director` before blueprinting, opening repair, voice
  calibration, authoring, or simulation.
- Story, scenario, mystery, investigation, case-file, event, trial, rescue,
  betrayal, social-drama, or plot-heavy cards where the primary blocker is
  stakes, route branches, clue/reveal pacing, suspect pressure, false leads,
  compact consequence state, route-funnel repair, opening incident, second-turn
  reveal, or scenario probes: use `lunatalk-scenario-architect` before
  blueprinting, opening repair, longplay repair, authoring, or simulation. If
  the primary blocker is explicit resources, stats, inventory, combat, turn
  protocol, or game-like mechanics, use `lunatalk-play-engineer`; if it is
  factions, locations, relationship networks, lore compression, or world scope,
  use `lunatalk-world-engineer`.
- Daily-life, slice-of-life, quiet companion, neighbor, roommate, cohabitation,
  cafe, workplace, school, ordinary-routine, low-stakes, subtle emotional,
  flat-comfort, flat small-talk, shared-object, habit-state, tiny-disruption, or
  return-next-time cards where the primary blocker is making quiet play
  consequential without melodrama: use `lunatalk-daily-life-architect` before
  blueprinting, opening repair, longplay repair, relationship repair, authoring,
  or simulation. If intimacy pacing, romance, repair/rupture, or relationship
  state is primary, use `lunatalk-relationship-architect`.
- RPG, adventure, open-world, sandbox, survival, investigation, or simulator
  tasks where playable mechanics are the primary blocker: stats, resources,
  inventory, quests, combat, turn protocol, compact state updates,
  failure-forward behavior, game loops, or rule-manual openings caused by
  unresolved rules. Use `lunatalk-play-engineer` before opening repair, longplay
  repair, authoring, or simulation. If the primary blocker is factions,
  locations, relationship networks, lore compression, or avoiding lore dumps, use
  `lunatalk-world-engineer` first; if it is only first-screen structure, use
  `lunatalk-opening-director`; if it is only continuation after a working
  opening, use `lunatalk-longplay-architect`.
- `roleWelcome`, welcome text, opening scene, first screen, first user reply,
  second-turn move, greeting-only or hollow openings, onboarding clarity, or
  first-action path repair: use `lunatalk-opening-director` before authoring,
  render review, simulation, or publish readiness.
- Long-term playability, replayability, multi-session arcs, route seeds,
  progression, memory/state, dead third turns, repetitive loops, passive role
  behavior, session restart, or choices that do not matter: use
  `lunatalk-longplay-architect` before authoring, simulation, or publish
  readiness.
- Character core, persona appeal, memorable identity, thin or generic roles,
  trope repair, desire/contradiction/boundary, mask/wound, relationship
  leverage, asymmetry, emotional hook, or distinctiveness repair: use
  `lunatalk-character-core` before blueprinting, authoring, voice, opening,
  longplay, simulation, or publish readiness.
- Relationship dynamics, companion/romance/friendship/rivalry/cohabitation,
  slow-burn pacing, trust/friction state, generic flirting, comfort loops,
  instant intimacy, repair/rupture routes, relationship refusal routes, or
  relationship field allocation: use `lunatalk-relationship-architect` before
  blueprinting, authoring, longplay, simulation, or publish readiness.
- Character voice, speaking style, generic dialogue, catchphrase or repeated
  phrasing problems, emotional tells, refusal style, talkExample need,
  blind-line checks, voice drift, or ensemble speakers blending together: use
  `lunatalk-voice-director` before blueprinting, authoring, simulation, or
  publish readiness.
- Player agency, user insertion space, interaction hooks, decorative choices,
  route funneling, spectator openings, role decides the player's feelings or
  actions, player can only watch, player has no meaningful refusal route, or
  reply paths that do not change consequence: use `lunatalk-agency-designer`
  before opening, longplay, blueprinting, authoring, simulation, or publish
  readiness.
- Worldbuilding, relationship networks, factions, locations, lore-heavy settings,
  light-setting or heavy-setting design, playable world rules, state/consequence
  from world facts, or avoiding lore dumps: use `lunatalk-world-engineer` before
  blueprinting, authoring, opening, longplay, render review, simulation, or
  publish readiness.
- Brainstorming, premise shaping, relationship design, voice design,
  opening-scene planning, or turning a vague idea into a card-ready blueprint
  after source material has been distilled: use
  `lunatalk-card-blueprint`.
- Prepared packet stacks, field-ready drafts, final role fields, or assembling
  `roleName`, `roleDesc`, `roleDetailDesc`, `roleWelcome`, `talkExample`,
  tags, Theme V3 notes, token allocation, validation handoff, render handoff, or
  simulation handoff after ideation packets already exist: use
  `lunatalk-card-author` in draft-only field assembly mode. Do not re-run broad
  ideation or call MCP tools unless the author asks to create or patch a real
  private role.
- Creating or editing a real private role card: use `lunatalk-card-author`.
- Checking HTML/XMLV3/Theme V3 rendering: use `lunatalk-render-review`.
- Testing role behavior in LunaTalk chat: use `lunatalk-chat-simulation`.
- Preparing public submission: use `lunatalk-publish-readiness`.
- Running regression checks or comparing Moonloom quality across archetypes: use
  `lunatalk-benchmark-runner`.

If the author asks for an end-to-end creation flow, start with `lunatalk-card-author`
and let it use `lunatalk-card-blueprint` for thin or generic ideas before
validation, render review, simulation, and publish readiness.

## References

- Read `../../references/card-writer-mcp.md` when tool names, arguments, endpoint,
  or auth details matter.
- Read `../../references/character-core-design.md` when working on character
  core, persona appeal, trope repair, relationship leverage, pressure behavior,
  or thin/generic roles.
- Read `../../references/relationship-engine.md` when working on companion,
  romance, friendship, rivalry, cohabitation, slow-burn, daily-life, repair,
  rupture, trust/friction, or relationship pacing design.
- Read `../../references/world-engine-design.md` when working on worldbuilding,
  relationship networks, factions, locations, playable world rules, lore-heavy
  settings, compact state, route seeds, or lore-dump repair.
- Read `../../references/role-card-writing-framework.md` before writing or deeply
  revising any role card.
- Read `../../references/archetype-contracts.md` when the task involves card
  type selection, hybrid archetypes, primary/secondary card contracts, or field
  allocation by card shape.
- Read `../../references/card-series-design.md` when the task involves multiple
  related cards, role-card series, alternate versions, seasonal/event variants,
  daily-life variants, generator/helper variants, or keep/merge/reject decisions
  before blueprinting or authoring.
- Read `../../references/ensemble-card-design.md` when the task involves ensemble
  cards, multi-character cards, cast size, speaker keep/merge/cut decisions,
  turn ownership, spotlight rules, group tension, roll-call openings, or cast
  crowding the player.
- Read `../../references/play-engine-design.md` when the task involves RPG,
  adventure, open-world, sandbox, survival, investigation, simulator, stats,
  resources, inventory, quests, combat, turn protocol, compact state updates,
  failure-forward behavior, or rule-manual openings.
- Read `../../references/scenario-design.md` when the task involves story,
  scenario, mystery, investigation, event, trial, rescue, betrayal, clue/reveal
  pacing, false leads, suspect pressure, route-funnel repair, branch
  consequences, or a focused incident without game-like mechanics.
- Read `../../references/daily-life-design.md` when the task involves
  daily-life, slice-of-life, quiet companion, neighbor, roommate, cohabitation,
  cafe, workplace, school, ordinary routine, small playable desire, tiny
  disruption, shared object, habit state, passive-player behavior, romance
  posture, or return-next-time hooks.
- Read `../../references/card-authoring-templates.md` when producing or checking
  a blueprint packet, role field draft, XMLV3 welcome scaffold, boundary-sensitive
  plan, or self-review packet.
- Read `../../references/material-distillation.md` when working from local files,
  notes, material packs, imported drafts, source fragments, or large world bibles.
- Read `../../references/boundary-design.md` when working on mature, adult,
  horror-leaning, emotionally intense, consent-sensitive, refusal, pacing,
  rating, or safer-version design.
- Read `../../references/opening-design.md` when working on `roleWelcome`,
  opening scenes, first screen playability, first reply paths, second-turn moves,
  hollow welcomes, or overloaded setup screens.
- Read `../../references/longplay-design.md` when working on long-term
  playability, route seeds, progression, memory/state, passive/stalled behavior,
  session continuation, or dead third-turn repairs.
- Read `../../references/quality-rubric.md` when judging content quality.
- Read `../../references/quality-scorecard.md` when the task involves quality
  audit, scorecard, craft tier, top-tier check, good-enough review, first-three
  repairs, or deciding whether to continue to authoring, render, simulation, or
  publish readiness.
- Read `../../references/voice-calibration.md` when the task involves voice,
  speaking style, dialogue examples, role consistency, or ensemble cast contrast.
- Read `../../references/agency-design.md` when the task involves player agency,
  user insertion space, interaction hooks, decorative choices, route funneling,
  player-agency takeover, or consequence checks.
- Read `../../references/token-economy.md` when the task involves tokenBudget,
  token allocation, overlong welcomes, duplicated lore, compression plans, or
  keep / move / cut / rewrite decisions.
- Read `../../references/card-diagnosis.md` when the task involves existing-card
  diagnosis, mixed symptoms, author feedback, simulation symptoms, weakest-layer
  triage, repair order, or field patch mapping before rewriting.
- Read `../../references/theme-v3-rendering.md` when working with HTML, XMLV3, or
  Theme V3.
- Read `../../references/playtest-loop.md` when designing private chat probes,
  reading simulation transcripts, or deciding how to patch behavior failures.
- Read `../../references/safety-and-cost.md` before simulation or publish actions.
- Read `../../examples/synthetic-card-briefs.md` when running benchmark or
  regression checks.

## Operating principles

- Use the authenticated LunaTalk account; do not invent separate MCP scopes.
- Use idempotency keys for every mutating tool call.
- Prefer XMLV3 plus Theme V3 for new cards.
- Use Moonloom self-review, render preview, and simulation as the quality loop,
  not as optional decoration.
- Treat MCP validation as mechanical validation. It can block unsafe HTML,
  invalid XMLV3, missing fields, or publish prerequisites, but it is not
  responsible for deciding whether a card is emotionally strong, playable, or
  original enough.
- Keep writing quality inside the Moonloom skills. When a card is boring,
  generic, passive, or weak after a technical pass, revise the role-card prompt
  and authoring framework rather than expecting MCP to reject it.
- Optimize for playable loops: hook, agency, consequence, memory, progression, and
  a new hook.
- Do not call `publish_submit` until the author explicitly confirms submission.
