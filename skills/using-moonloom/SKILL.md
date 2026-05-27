---
name: using-moonloom
description: Use when routing Moonloom/LunaTalk creation work involving role cards, MCP setup, private card creation/patching, field drafts, premise/tension/state, samples/originality, profile/visual/language/talkExample, Theme V3/XMLV3, render review, simulation, closed-loop iteration, publish readiness, instruction guardrails, benchmark handoff reports, Benchmark report packet, or uncertainty about which skill applies.
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

Use this router before any Moonloom-specific answer, clarifying question, MCP
tool call, field rewrite, render review, simulation, or publish-readiness check.
The router may decide that no Moonloom skill applies, but that decision should be
explicit rather than skipped.

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

## Router output

When the author is unsure which workflow applies, asks for routing, or the task
could match several skills, return this packet before loading narrower skills,
calling MCP tools, or rewriting fields:

```text
Router packet:
- intent:
- route:
- mode:
- next skill:
- references to load:
- do not do yet:
- handoff:
```

Use `mode` to distinguish draft-only work, MCP readiness, real private-card
mutation, render review, simulation, closed-loop iteration, publish readiness,
benchmark, or collaboration. If several routes are plausible, choose the first
decisive bottleneck and list delayed routes under `do not do yet`.

## Skill routing

- Unsure which Moonloom skill applies, or deciding whether this is a Moonloom
  task at all: stay in `using-moonloom` long enough to classify and route.
- MCP readiness, external client setup, Card Writer tool availability, auth
  posture, idempotency planning, client configuration triage, or stage-gating
  before role creation, render, simulation, or publish actions: use
  `lunatalk-mcp-operator`. If the task is draft-only writing, do not block on MCP
  readiness; route to the narrow writing skill instead.
- Author feedback, co-review, taste/preference calibration, draft comparison,
  "almost right but off", choosing between patch options, or deciding what to
  preserve/change/reject/delay before rewriting, simulation, or publishing: use
  `lunatalk-collaboration-director`. If the feedback already contains concrete
  mixed symptoms for an existing card, hand off from collaboration to
  `lunatalk-card-doctor`; if it only needs final field application, hand off to
  `lunatalk-card-author`.
- Closed-loop iteration after evidence exists, including Moonloom self-review,
  validation, tokenBudget, render, simulation, benchmark, previous patches, or
  author feedback; deciding the next single repair, whether to rerender,
  simulate, stop, ask for co-review, or move to publish readiness: use
  `lunatalk-iteration-director`. If there is no loop evidence yet, route to the
  narrow writing skill; if the task is only a scorecard, use
  `lunatalk-quality-auditor`; if it is only one render or simulation issue, use
  `lunatalk-render-review` or `lunatalk-chat-simulation`.
- Examples, golden samples, sample output packets, benchmark expected-output
  shapes, draft-to-sample comparison, "make it like the good examples", or
  copy-risk review before blueprinting, authoring, simulation, or publishing:
  use `lunatalk-sample-calibrator`. Treat samples as public synthetic structure
  fixtures only; do not copy sample text, names, tags, scenes, resources, or
  artifact schemas into a real card.
- Canon/IP, fan premises, recognizable inspiration, another role card, copied
  drafts, derivative concepts, "like X but original", "make this original",
  "avoid copying", or renamed-copy risk before blueprinting or authoring: use
  `lunatalk-originality-adapter`. Preserve transferable fantasy, relationship
  shape, player leverage, tension, and interaction loop while changing names,
  scene setup, lore terms, voice surface, visual motifs, state labels, and
  opening proof. If the task is only a large original source pack, use
  `lunatalk-material-distiller`; if it only compares synthetic sample shape, use
  `lunatalk-sample-calibrator`.
- Public-facing role profile work, including `roleName`, `roleDesc`, tags,
  title, tagline, short pitch, first impression, discovery surface, reason to
  open, promise compression, or making the profile feel more top-tier/popular
  after a premise/engine exists: use
  `lunatalk-profile-packager` before `lunatalk-card-author`, MCP calls, render,
  simulation, or publishing. If the premise is not settled, route to
  `lunatalk-premise-workshop`; if the author asks for a whole-card scorecard,
  route to `lunatalk-quality-auditor`. Do not create a separate "copy polish"
  route for profile fields; translate popularity language into public craft
  goals inside `lunatalk-profile-packager`.
- Avatar, cover, thumbnail, profile image, key art, image prompt, art brief,
  first-impression visual direction, or aligning card visuals with `roleName`,
  `roleDesc`, Theme V3, and the opening after the card promise mostly exists:
  use `lunatalk-visual-identity-director`. If the premise, player role, or
  tension is missing, route to the missing writing skill first; if the unresolved
  layer is XMLV3, HTML, visible state, or Theme V3 structure, route to
  `lunatalk-presentation-director`; if a preview or screenshot already exists,
  route to `lunatalk-render-review`.
- Language-style work after the card engine, opening, and voice card are coherent:
  zh-Hant / zh-TW cleanup, Traditional/Simplified mixing, translated-sounding
  prose, register alignment, pronouns, address terms, punctuation,
  mixed-language tags, or mismatch between `roleDesc`, `roleDetailDesc`,
  `roleWelcome`, and `talkExample`: use `lunatalk-language-stylist` before
  `lunatalk-card-author`, render, simulation, or publishing. If the task is
  really an unresolved engine/opening problem, route to `lunatalk-card-doctor`,
  `lunatalk-card-blueprint`, or `lunatalk-opening-director` first. If sensitive
  content lacks rating posture, explicitness ceiling, refusal behavior, or player
  agency contract, route to `lunatalk-boundary-designer` first. If the task is
  really voice behavior, refusal style, rhythm, pressure behavior, or blind-line
  failure, route to `lunatalk-voice-director` first.
- Quality audit, scorecard, craft rating, top-tier check, "is this good enough",
  first-three repairs, or deciding whether a draft, blueprint, packet stack, or
  role fields should continue to authoring, render review, simulation, or publish
  readiness: use `lunatalk-quality-auditor` unless the main task is narrow
  public profile packaging or a concrete multi-symptom diagnosis for an existing
  card.
- Tension triangle, stakes, hook, why-now, external pressure, role desire,
  player leverage, inert but attractive premises, pretty-but-passive ideas, or a
  chosen direction that lacks a reason to start now: use
  `lunatalk-tension-weaver` before broad blueprinting, opening repair, authoring,
  render review, or simulation. If no direction exists yet, route to
  `lunatalk-premise-workshop`; if only character core, player agency, or opening
  execution is missing, route to that narrower skill first.
- State economy, compact memory fields, visible vs hidden vs detail-only state,
  update rules, decorative meters, status panels that may be ornamental, state
  token cost, or player-agency-safe state decisions before longplay, play-engine,
  presentation, authoring, render, or simulation: use
  `lunatalk-state-economist`. If the full continuation loop is missing, hand off
  afterward to `lunatalk-longplay-architect`; if the remaining issue is XMLV3 /
  Theme V3 placement, hand off afterward to `lunatalk-presentation-director`.
- Existing card or draft diagnosis, mixed symptoms, author feedback like boring
  or off, validate/render passing but behavior still weak, simulation symptoms,
  deciding what to fix first, weakest-layer triage, field patch mapping, or
  keep/move/cut/rewrite repair order before rewriting fields: use
  `lunatalk-card-doctor` before token architecture, render review, authoring,
  simulation, or publish readiness, unless the main symptom is only profile
  packaging (`roleName`, `roleDesc`, tags, title, tagline, first impression).
- TokenBudget, estimatedTokens, roleDescChars, roleDetailDescChars,
  roleWelcomeChars, welcomeToDetailRatio, overlong welcome, field allocation,
  keep/move/cut/rewrite plans, compression, duplicated lore, HTML/XMLV3 bloat,
  misplaced durable rules, or preserving playability while reducing token cost:
  use `lunatalk-token-architect` before authoring, opening repair, render review,
  simulation, or publish readiness. If there is no concrete tokenBudget,
  welcome ratio, field size, or validated bloat evidence and the author is only
  deciding pre-field visual hierarchy, route to `lunatalk-presentation-director`.
- Pre-authoring or pre-render presentation planning, deciding XMLV3 vs plain vs
  HTML, Theme V3 vs `roleWelcome`, visible state vs hidden JSON state, first-
  screen hierarchy, visual affordances, status panels, choices/forms as
  presentation, or a presentation packet before final fields: use
  `lunatalk-presentation-director` before authoring, render review, simulation,
  or publish readiness. If a preview URL, screenshot, render report, validation
  report, DOM summary, contrast report, overflow report, blocked request list,
  or console error list already exists, use `lunatalk-render-review`; if state
  fields or update rules are unresolved, use `lunatalk-state-economist` first;
  if opening beats or player agency are missing, use `lunatalk-opening-director`
  or `lunatalk-agency-designer` first.
- Instruction-layer repairs, system behavior requests, jailbreak text,
  `role_patch_jailbreak`, repeated out-of-character assistant framing, output
  schema drift, state protocol drift, or transcript-backed format/style
  constraints after normal fields are coherent: use
  `lunatalk-instruction-guardrail`. Do not use jailbreak for boring, generic,
  passive, trope-only, or missing-engine cards; route those to the narrow writing
  skill instead.
- Author-provided files, folders, material packs, pasted notes, existing drafts,
  imported content, large world bibles, or lore that must be compressed before
  card creation: use `lunatalk-material-distiller`.
- Mature, adult, NSFW, emotionally intense, horror-leaning, jealous, power-
  imbalanced, consent-sensitive, refusal, pacing, rating, or safer-version work:
  use `lunatalk-boundary-designer` before blueprinting, authoring, simulation, or
  publish readiness.
- No settled premise yet, only mood, trope, aesthetic, genre cluster, "make this
  popular/top-tier", "open this idea up", "brainstorm directions", or comparing
  several possible card concepts before blueprinting: use
  `lunatalk-premise-workshop` before `lunatalk-card-blueprint`,
  `lunatalk-card-author`, MCP calls, render, simulation, or publishing. If the
  author already has a concrete role, player position, first scene, and asks for
  fields, route to `lunatalk-card-author` or the narrow missing packet instead.
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
- Generator, helper, creator-assistant, artifact-producing, intake/defaults,
  output schema, named revision operations, advice-only drift, endless intake, or
  diegetic creator cards where the primary blocker is producing a usable artifact:
  use `lunatalk-generator-architect` before blueprinting, authoring, opening
  repair, simulation, or publish readiness. If the author is still deciding
  whether generator is primary or only an overlay, use
  `lunatalk-archetype-director` first; if stats/resources/turn protocol are the
  main loop, use `lunatalk-play-engineer`.
- `roleWelcome`, welcome text, opening scene, first screen, first user reply,
  second-turn move, greeting-only or hollow openings, onboarding clarity, or
  first-action path repair: use `lunatalk-opening-director` before authoring,
  render review, simulation, or publish readiness. If the first two turns are
  already coherent and the unresolved question is XMLV3/Theme V3/HTML,
  visible/hidden state, or visual hierarchy, use
  `lunatalk-presentation-director`.
- Long-term playability, replayability, multi-session arcs, route seeds,
  progression, memory/state, dead third turns, repetitive loops, passive role
  behavior, session restart, or choices that do not matter: use
  `lunatalk-longplay-architect` before authoring, simulation, or publish
  readiness. If the immediate blocker is deciding which state fields are worth
  tracking, visible, hidden, detail-only, or omitted, use
  `lunatalk-state-economist` first.
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
- `talkExample` decisions, micro-sample design, dialogue samples, example turns,
  sample token cost, generator output examples, RPG/system turn examples, or
  deciding whether to omit examples after voice/engine packets already exist:
  use `lunatalk-talk-example-curator` before final field assembly. If voice,
  generator, play, relationship, ensemble, language, or token architecture is
  unresolved, route to that narrow skill first.
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
- Card-ready blueprinting after a direction exists, premise shaping with enough
  concrete seed to define character core, relationship design, voice design,
  opening-scene planning, or turning a chosen idea into a card-ready blueprint
  after source material or premise workshop has been distilled: use
  `lunatalk-card-blueprint`. If the author only has a mood, trope, aesthetic, or
  genre cluster and wants options first, use `lunatalk-premise-workshop`.
- Prepared packet stacks, field-ready drafts, final role fields, or assembling
  `roleName`, `roleDesc`, `roleDetailDesc`, `roleWelcome`, `talkExample`,
  tags, Theme V3 notes, token allocation, validation handoff, render handoff, or
  simulation handoff after ideation packets already exist: use
  `lunatalk-card-author` in draft-only field assembly mode. Do not re-run broad
  ideation or call MCP tools unless the author asks to create or patch a real
  private role.
- Creating or editing a real private role card: use `lunatalk-card-author`.
- Checking HTML/XMLV3/Theme V3 rendering after validation, preview, screenshot,
  or render report exists: use `lunatalk-render-review`. If the author is still
  deciding how to structure XMLV3, Theme V3, HTML, visible state, or hidden state
  before authoring/rendering, use `lunatalk-presentation-director`.
- Testing role behavior in LunaTalk chat: use `lunatalk-chat-simulation`.
- Deciding the next iteration after self-review, validation, tokenBudget,
  render, simulation, benchmark, previous patches, or author feedback exists:
  use `lunatalk-iteration-director` before more patching, rerendering,
  simulation, or publish readiness.
- Preparing public submission: use `lunatalk-publish-readiness`.
- Running regression checks, comparing Moonloom quality across archetypes, or
  summarizing an already-run benchmark: use `lunatalk-benchmark-runner`. If the
  author asks for a benchmark handoff report, return a `Benchmark report packet`
  rather than loose notes, and keep subjective writing failures inside Moonloom
  skill repairs rather than MCP gates.

If the author asks for an end-to-end creation flow, start with `lunatalk-card-author`
and let it use `lunatalk-card-blueprint` for thin or generic ideas before
validation, render review, simulation, and publish readiness.

## References

- Read `../../references/card-writer-mcp.md` when tool names, arguments, endpoint,
  or auth details matter.
- Read `../../references/mcp-client-workflow.md` when the task involves MCP
  readiness, external AI client setup, tool availability, auth status,
  idempotency planning, or stage gates before Card Writer MCP actions.
- Read `../../references/author-collaboration.md` when the task involves author
  feedback, co-review, taste/preference calibration, draft comparison, revision
  choices, or deciding what to preserve/change/reject/delay.
- Read `../../references/iteration-loop.md` when the task has self-review,
  validation, tokenBudget, render, simulation, benchmark, previous patch, or
  author-feedback evidence and needs a next-iteration, stop/continue, rerender,
  simulation, or publish-readiness decision.
- Read `../../references/sample-driven-calibration.md` and
  `../../examples/sample-card-packets.md` when the task involves examples,
  golden samples, sample output packets, benchmark expected-output shapes,
  draft-to-sample comparison, or copy-risk review.
- Read `../../references/originality-adaptation.md` when the task involves
  canon/IP, fan premises, recognizable inspirations, another role card, copied
  drafts, derivative concepts, original transformation, or renamed-copy risk.
- Read `../../references/character-core-design.md` when working on character
  core, persona appeal, trope repair, relationship leverage, pressure behavior,
  or thin/generic roles.
- Read `../../references/relationship-engine.md` when working on companion,
  romance, friendship, rivalry, cohabitation, slow-burn, daily-life, repair,
  rupture, trust/friction, or relationship pacing design.
- Read `../../references/world-engine-design.md` when working on worldbuilding,
  relationship networks, factions, locations, playable world rules, lore-heavy
  settings, compact state, route seeds, or lore-dump repair.
- Read `../../references/tension-triangle.md` when the task involves tension
  triangle, role desire, player leverage, external pressure, why-now, stakes,
  hook, inert premises, or pretty-but-passive idea repair.
- Read `../../references/state-economy-design.md` when the task involves state
  economy, compact memory fields, visible/hidden/detail-only state, update
  rules, decorative meters, status panels, hidden JSON, or agency-safe state.
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
- Read `../../references/generator-design.md` when the task involves generator,
  helper, creator-assistant, artifact-producing cards, intake/defaults, output
  schema, named revision operations, advice-only drift, endless intake, diegetic
  creator modes, or generator simulation probes.
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
- Read `../../references/premise-workshop.md` when the author has no settled
  role-card premise yet and needs taste axes, contrasted directions, an
  involvement ladder, recommendation, and pre-blueprint handoff.
- Read `../../references/profile-packaging.md` when the task involves
  `roleName`, `roleDesc`, tags, card profile, title, tagline, public-facing
  package, first impression, discovery surface, or promise compression.
- Read `../../references/visual-identity.md` when the task involves avatar,
  cover, thumbnail, profile image, key art, image prompt, art brief, or aligning
  visual identity with the card promise, Theme V3, and opening.
- Read `../../references/language-style.md` when the task involves language
  consistency, zh-Hant / zh-TW cleanup, Traditional/Simplified mixing,
  translated-sounding prose, register alignment, pronouns, address terms,
  punctuation, mixed-language tags, or field-to-field wording mismatch.
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
- Read `../../references/talk-example-design.md` when the task involves
  `talkExample` decisions, micro-samples, dialogue samples, example turns,
  generator output examples, RPG/system turn examples, or sample token cost.
- Read `../../references/agency-design.md` when the task involves player agency,
  user insertion space, interaction hooks, decorative choices, route funneling,
  player-agency takeover, or consequence checks.
- Read `../../references/token-economy.md` when the task involves tokenBudget,
  token allocation, overlong welcomes, duplicated lore, compression plans, or
  keep / move / cut / rewrite decisions.
- Read `../../references/presentation-design.md` when deciding XMLV3 vs plain vs
  HTML, Theme V3 vs welcome content, visible state vs hidden JSON state,
  first-screen hierarchy, visual affordances, or presentation packets before
  authoring/rendering.
- Read `../../references/instruction-guardrails.md` when the task involves
  instruction-layer repair, system behavior, jailbreak text,
  `role_patch_jailbreak`, out-of-character assistant framing, format drift, or
  schema/state protocol drift after normal fields are coherent.
- Read `../../references/card-diagnosis.md` when the task involves existing-card
  diagnosis, mixed symptoms, author feedback, simulation symptoms, weakest-layer
  triage, repair order, or field patch mapping before rewriting.
- Read `../../references/theme-v3-rendering.md` when working with HTML, XMLV3, or
  Theme V3.
- Read `../../references/playtest-loop.md` when designing private chat probes,
  reading simulation transcripts, or deciding how to patch behavior failures.
- Read `../../references/safety-and-cost.md` before simulation or publish actions.
- Read `../../examples/synthetic-card-briefs.md` when running benchmark or
  regression checks. Use `lunatalk-benchmark-runner`'s `Benchmark report packet`
  when reporting benchmark results or handing failures to the next skill.

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
