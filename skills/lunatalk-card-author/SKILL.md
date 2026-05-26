---
name: lunatalk-card-author
description: Use when the user wants an AI client to write, improve, import, restructure, iterate on, or assemble field-ready drafts for a LunaTalk role card, including prepared Moonloom packet stacks and MCP-backed private role creation or editing.
---

# LunaTalk Card Author

Use this skill to turn an author's idea, draft, world notes, imported material,
or prepared Moonloom packet stack into field-ready LunaTalk role content. When
the author asks for a real private role, use the Card Writer MCP after the draft
is coherent and self-reviewed.

## Required references

Read `../../references/card-writer-mcp.md` before making MCP calls. Read
`../../references/character-core-design.md` when the role idea is thin,
trope-only, generic, or needs persona appeal repair. Read
`../../references/relationship-engine.md` when the card is relationship-heavy,
slow-burn, companion, romance, friendship, rivalry, cohabitation, or when drafts
collapse into generic flirting, comfort loops, instant intimacy, flat warmth,
weak repair, or weak rupture routes. Read
`../../references/world-engine-design.md` when the card needs worldbuilding,
relationship networks, factions, locations, lore-heavy settings, or lore-dump
repair. Read `../../references/scenario-design.md` when the card is story,
scenario, mystery, investigation, case-file, event, rescue, trial, betrayal, or
social drama, or when it needs stakes, route branches, clue/reveal pacing, false
leads, suspect pressure, compact consequence state, or route-funnel repair. Use
`lunatalk-scenario-architect` first when scenario structure is the primary task.
Read `../../references/daily-life-design.md` when the card is daily-life,
slice-of-life, quiet companion, neighbor, roommate, cohabitation, cafe,
workplace, school, ordinary-routine, low-stakes, habit-state, shared-object,
comfort-loop, flat small-talk, or when it needs small playable desire, tiny
disruption, passive-player behavior, second-turn change, or return-next-time
hooks. Use `lunatalk-daily-life-architect` first when quiet routine structure is
the primary task.
Read `../../references/play-engine-design.md` when the card is RPG,
adventure, open-world, sandbox, survival, investigation, simulator, or has
stats, resources, inventory, quests, combat, turn protocol, compact state,
failure-forward behavior, or a rule-manual opening. Read
`../../references/role-card-writing-framework.md` before writing or deeply
revising the card. Read `../../references/quality-rubric.md` when judging whether
the card is usable. Read `../../references/quality-scorecard.md` when the author
asks for a scorecard, top-tier check, craft rating, good-enough review, or
first-three repairs before creation, simulation, or publishing. Use
`lunatalk-quality-auditor` first when the primary task is quality audit rather
than field drafting. Read `../../references/card-series-design.md` when the
author wants multiple related cards, alternate versions, seasonal/event
variants, daily-life variants, RPG/system variants, generator/helper variants,
or a keep/merge/reject plan before real card creation. Use
`lunatalk-series-architect` first when series planning is the primary task. Read
`../../references/ensemble-card-design.md` when the card has multiple active
speakers, ensemble cast structure, cast keep/merge/cut decisions, turn ownership,
spotlight rules, group tension, roll-call openings, or cast-over-player risk.
Use `lunatalk-ensemble-director` first when ensemble structure is the primary
task. Read
`../../references/safety-and-cost.md` when content
rating, sensitive themes, simulation cost, publishing, or credentials matter. Read
`../../references/archetype-contracts.md` when the author is unsure which card
type should drive the role, when several archetypes are mixed, or when field
allocation depends on card shape. Use `lunatalk-archetype-director` first when
card type or hybrid contract is the primary problem. Read
`../../references/card-authoring-templates.md` when turning an idea into concrete
field drafts. Read `../../references/material-distillation.md` when the author
provides files, notes, imported drafts, source fragments, or a large world bible.
Read `../../references/card-diagnosis.md` when improving an existing card with
mixed symptoms, author feedback, validation/render passing but weak behavior,
simulation failures, or unclear repair order. Use `lunatalk-card-doctor` first
when the weakest layer is not obvious.
Read `../../references/theme-v3-rendering.md` if the welcome uses HTML, XMLV3, or
Theme V3. Read `../../references/token-economy.md` when `validate_role`
returns tokenBudget warnings, when `roleWelcome` is much longer than
`roleDetailDesc`, when durable rules are hidden in welcome, or when the task asks
for compression, keep/move/cut/rewrite, or field allocation repair. Read
`../../references/voice-calibration.md` when the card relies on
distinctive voice, dialogue examples, long-session consistency, or ensemble cast
contrast. Use `lunatalk-voice-director` first when voice repair is the primary
task. Read `../../references/boundary-design.md` when the card is mature,
adult, NSFW, emotionally intense, horror-leaning, consent-sensitive, jealous,
power-imbalanced, or needs refusal/pacing repair. Read
`../../references/opening-design.md` when creating or repairing `roleWelcome`,
first screen playability, first reply paths, or second-turn moves. Read
`../../references/longplay-design.md` when creating or repairing long-term
playability, route seeds, memory/state, progression, passive/stalled behavior, or
dead third-turn loops. Read `../../references/agency-design.md` when the card
lets the player only watch, narrates player feelings/actions, has decorative
choices, funnels routes, or lacks meaningful refusal/route-change behavior. Read
`../../references/playtest-loop.md` when designing or interpreting private chat
simulations. Use `../../examples/synthetic-card-briefs.md` when the task asks for
benchmark creation, regression checks, or example-driven iteration.

## Workflow

1. Capture the card goal and mode: draft-only field assembly, MCP-backed private
   role creation, or patching an existing private role. Also capture role
   premise, relationship dynamic, play loop, tone, language, content rating
   intent, and success criteria.
   If the author asks whether a draft, blueprint, packet stack, or role fields
   are good enough, top-tier, ready to continue, or needs a scorecard / first
   three repairs, use `lunatalk-quality-auditor` first unless a quality audit
   packet already exists.
   If the author asks to create or plan several related cards, alternate
   versions, variants, a card set, or decides what to keep, merge, reject, or
   author first, use `lunatalk-series-architect` first unless a card-series
   packet already exists. Create real private cards one at a time after the
   series packet is coherent.
   If the author asks to create or repair an ensemble / multi-character card,
   several active speakers, cast size, keep/merge/cut decisions, turn ownership,
   spotlight rules, or group tension, use `lunatalk-ensemble-director` first
   unless an ensemble packet already exists. Do not create or patch the card
   until the cast structure, player leverage, and turn ownership are coherent.
   If the author asks to create or repair an RPG, adventure, open-world,
   sandbox, survival, investigation, simulator, or game-like card with stats,
   resources, inventory, quests, combat, turn protocol, compact state updates,
   or failure-forward behavior, use `lunatalk-play-engineer` first unless a
   play-engine packet already exists. Do not create or patch the card until the
   playable rule loop, state model, resource rules, and failure behavior are
   coherent.
   If the author asks to create or repair a story, scenario, mystery,
   investigation, case-file, event, trial, rescue, betrayal, or social-drama card
   with stakes, route branches, clue/reveal pacing, false leads, suspect
   pressure, compact consequence state, route-funnel repair, opening incident,
   second-turn reveal, or scenario probes, use `lunatalk-scenario-architect`
   first unless a scenario packet already exists. Do not create or patch the card
   until the scenario branches, clue ladder, and consequence state are coherent.
   If the author asks to create or repair a daily-life, slice-of-life, quiet
   companion, neighbor, roommate, cohabitation, cafe, workplace, school, or
   ordinary-routine card with small playable desire, tiny disruption, shared
   object/place, habit state, passive-player behavior, second-turn change, or
   return-next-time hooks, use `lunatalk-daily-life-architect` first unless a
   daily-life packet already exists. Do not create or patch the card until the
   routine loop, habit state, and first two turns are coherent.
   If the author is improving an existing card and provides several symptoms,
   feedback, validation/render output, simulation findings, or asks what to fix
   first, use `lunatalk-card-doctor` first unless a diagnosis packet already
   exists.
   If the author provides large source material, local files, a draft, or a world
   bible, use `lunatalk-material-distiller` first and author from its
   source-to-play map instead of pasting the source into role fields.
   If the goal is mature, intense, adult, horror-leaning, consent-sensitive, or
   boundary-sensitive, use `lunatalk-boundary-designer` first unless a boundary
   packet already exists.
   If the author is unsure whether the card is companion, story, system, RPG,
   generator, daily-life, light-setting, heavy-setting, ensemble, or a hybrid,
   use `lunatalk-archetype-director` first unless an archetype packet already
   exists.
2. If the brief is thin, brainstorm 2-3 sharply different playable directions
   with the author before creating the card. Make the options differ by conflict,
   player role, first scene, and long-term loop, not only by mood. Prefer
   `lunatalk-character-core` when the author needs persona appeal, memorable
   identity, trope repair, relationship leverage, or desire/contradiction/
   boundary design before fields. Prefer `lunatalk-relationship-architect` when
   the author needs relationship dynamics, slow-burn pacing, trust/friction
   state, generic flirting or comfort-loop repair, repair/rupture routes, or
   relationship field allocation. Prefer `lunatalk-world-engineer` when the
   author needs worldbuilding, relationship networks, factions, locations, lore
   compression, or a world rule that creates play. Prefer
   `lunatalk-scenario-architect` when the author needs story/scenario stakes,
   route branches, clue/reveal pacing, false leads, suspect pressure, compact
   consequence state, route-funnel repair, or scenario probes. Prefer
   `lunatalk-daily-life-architect` when the author needs a quiet routine engine,
   small playable desire, tiny disruption, shared object/place, habit state,
   passive-player behavior, non-forced romance posture, second-turn change, or
   return-next-time hooks. Prefer
   `lunatalk-card-blueprint` when the author needs broader ideation,
   relationship design, voice design, or opening-scene planning before a real
   role is created. Prefer `lunatalk-voice-director` when the author primarily
   asks for character voice, speaking style, generic dialogue repair,
   catchphrase discipline, refusal style, talkExample need, blind-line tests, or
   ensemble voice contrast. Prefer `lunatalk-agency-designer` when the author
   primarily asks for player agency, user insertion space, interaction hooks,
   decorative choices, route funneling, or player-agency takeover. Prefer
   `lunatalk-play-engineer` when the author primarily asks for RPG/adventure
   mechanics, resources, inventory, quests, combat, compact state, turn
   protocol, failure-forward behavior, or rule-manual opening repair. Prefer
   `lunatalk-token-architect` when the author primarily asks about tokenBudget,
   welcomeToDetailRatio, overlong fields, compression, keep/move/cut/rewrite, or
   preserving playability while reducing token cost.
3. Choose or preserve the archetype packet: companion/relationship,
   story/scenario, system/simulator, RPG/open-world, generator/assistant,
   canon/IP adaptation, daily-life, light-setting, heavy-setting, or ensemble.
4. Draft the card in Moonloom first: promise, engine, play, and presentation. Use
   the universal draft packet from `card-authoring-templates.md` for thin or
   high-stakes briefs. When the author already provides a coherent packet stack
   and asks for final fields, produce the final role-field authoring packet from
   `card-authoring-templates.md`.
5. Run Moonloom self-review before calling mutating tools.
6. If the mode is draft-only field assembly or the author forbids MCP calls,
   stop here after returning the final role-field authoring packet. Do not call
   `role_create_private`, patch tools, render, simulation, or publish tools until
   the author asks to create or patch a real private role.
7. If there is no `roleId`, call `role_create_private`.
8. Patch profile fields with `role_patch_profile`.
9. If the current card or draft has an overlong `roleDesc`, thin
   `roleDetailDesc`, overlong `roleWelcome`, high `welcomeToDetailRatio`,
   duplicated lore, visual bloat, or misplaced durable rules, use or preserve
   `lunatalk-token-architect` before patching fields.
10. Before patching stable character and world context with `role_patch_detail`,
   use or preserve `lunatalk-play-engineer` when the current patch changes
   RPG/adventure rules, compact state, resources, inventory, quests, combat,
   turn protocol, failure-forward behavior, or visible state updates.
   Use `lunatalk-longplay-architect` when the current task is long-term
   playability, memory/state, route seeds, progression, or a dead third-turn
   loop. Use or preserve `lunatalk-voice-director` when the current patch changes
   speech style, voice cards, talkExample, refusal voice, or ensemble contrast.
   Use or preserve `lunatalk-relationship-architect` when the current patch
   changes relationship promise, asymmetry, trust/friction state, pacing gates,
   repair/rupture routes, passive-player relationship behavior, or relationship
   field allocation.
   Use or preserve `lunatalk-agency-designer` when the patch changes player
   insertion space, reply paths, route consequences, passive-player behavior, or
   agency guardrails.
   Use or preserve `lunatalk-scenario-architect` when the current patch changes
   story/scenario stakes, route branches, clue/reveal pacing, suspect pressure,
   false leads, compact consequence state, route-funnel guardrails, opening
   incident, or second-turn reveal.
   Use or preserve `lunatalk-daily-life-architect` when the current patch changes
   ordinary routine, small playable desire, tiny disruption, shared object/place,
   habit state, passive-player behavior, boundary/romance posture, routine reply
   paths, second-turn change, or return-next-time hooks.
11. Before patching the welcome, use `lunatalk-opening-director` when the current
   task is welcome/opening repair or the first-action path is unclear. Patch the
   opening scene with `role_patch_welcome` from the opening packet.
12. Prefer `mode: "xmlv3"` for new visual welcomes. Use `plain` for simple text.
   Use `html` only when the author explicitly needs custom HTML or legacy HTML.
13. Optionally use `theme_bind` and `extension_enable` for Theme V3.
14. Call `validate_role`.
15. Fix MCP blockers before moving on. Do not rely on MCP to judge writing
    quality; run the Moonloom self-review checklist from
    `role-card-writing-framework.md` and `quality-rubric.md`.
16. If `validate_role.tokenBudget` shows allocation drift, use
    `lunatalk-token-architect` before render or simulation.
17. Call `render_preview` and review the result with `lunatalk-render-review`.
18. Call `simulate_private_chat` with `lunatalk-chat-simulation` when behavior
    needs to be tested and the author accepts normal chat billing. Include a
    playtest plan, transcript triage, and evidence-backed patch decision, not
    only a tool status check.
19. Summarize the card, validation result, render result, simulation result, and
    remaining risks.

## Collaboration Loop

Moonloom should behave like a card-writing skill framework, not a form filler.

- Open the author's imagination before drafting: ask what emotional promise,
  player fantasy, forbidden pressure, or gameplay loop they want to feel.
- When the author gives a weak or generic idea, propose concrete alternatives:
  a relationship pressure, a first-scene incident, a hidden contradiction, and a
  repeatable loop.
- When improving an existing card, diagnose the weakest layer first: promise,
  engine, play, presentation, render, or simulation. Patch that layer directly.
- Keep the card source compact. Strong cards usually get replayability from
  state, consequence, and role initiative, not from longer prose.

## MCP boundary

MCP tools make the card real; Moonloom makes the card good.

- Do not ask MCP to reject a technically valid card because it is generic,
  passive, emotionally thin, or missing a strong second-turn loop.
- Use MCP validation for concrete blockers: required fields, unsafe HTML,
  invalid XMLV3, unsupported render tags, ownership, and publish prerequisites.
- Use Moonloom references and self-review for writing quality. If
  `validate_role` passes but the card still feels weak, patch the role-card
  prompt, detail, welcome, voice rules, or play loop before render or simulation.
- When improving the system itself, update this skill, the writing framework,
  rubric, or eval expectations. Do not convert writing taste into hidden server
  gates.

## Authoring guidance

- Keep the author in the loop through conversation. The author feedback surface is
  the agent chat, not an in-app comment system.
- Do not create extra storage, review sessions, or side ledgers in the skill.
  The role card is the source of truth.
- When a prepared packet stack already exists, do not brainstorm from scratch.
  Resolve conflicts, preserve the strongest packet signals, and assemble
  `roleName`, `roleDesc`, `roleDetailDesc`, `roleWelcome`, `talkExample`,
  tags/theme notes, token allocation, validation/render/simulation handoff, and
  self-review.
- Use Traditional Chinese for user-facing LunaTalk card content when the author
  writes in Traditional Chinese or asks for it. For `zh-Hant` cards, keep
  profile, detail, welcome, and examples consistently Traditional Chinese.
- Keep `roleDesc` scannable. If a draft exceeds the recommended length or feels
  dense, rewrite a compressed final version instead of only noting the issue.
- The first scene should invite the player to act immediately. If the first reply
  path is unclear, the card is not ready.
- If the player can only watch, choices are decorative, or the card narrates the
  player's feelings/actions, use `lunatalk-agency-designer` before patching
  fields.
- Preserve the opening packet when one exists: current failure, opening promise,
  reply paths, expected first user message, second-turn move, what changes, and
  token tradeoff.
- Preserve the character-core packet when one exists: appeal promise, desire,
  contradiction, boundary, mask/wound, player leverage, relationship asymmetry,
  pressure behavior, interaction hooks, and token tradeoff.
- Preserve the relationship-engine packet when one exists: relationship promise,
  shape, asymmetry, closeness/friction state, pacing gates, repair/rupture
  routes, player agency boundaries, reply-path matrix, passive-player behavior,
  second-turn move, long-session renewal, field allocation, and token tradeoff.
- Preserve the world-engine packet when one exists: world promise, player
  position, core world rule, faction/location play functions, state model, route
  seeds, exposition policy, and token tradeoff.
- Preserve the play-engine packet when one exists: play promise, player
  position, player controls, compact state model, resource rules, quest/risk
  model, turn protocol, failure-forward behavior, progression phases, opening
  contract, state visibility, token plan, and simulation probes.
- Preserve the scenario packet when one exists: scenario promise, player role,
  ongoing incident, stakes, core question, story spine, route branches,
  clue/reveal ladder, suspect or pressure network, compact consequence state,
  opening incident, second-turn reveal, passive-player behavior, false-lead
  handling, route-funnel guardrails, token plan, and simulation probes.
- Preserve the daily-life packet when one exists: daily-life promise, ordinary
  routine, small playable desire, tiny disruption, shared object/place, sensory
  anchors, player leverage, routine loop, micro-tension, habit state, reply
  paths, closeness/distance lanes, passive-player behavior, boundary and romance
  posture, opening moment, second-turn change, long-session renewal, token plan,
  and simulation probes.
- Preserve the voice-director packet when one exists: current failure, voice
  promise, rhythm, vocabulary, emotional tells, refusal style, response-mode
  grid, catchphrase policy, talkExample decision, blind-line test, pressure
  probes, field patch targets, and token tradeoff.
- Preserve the agency packet when one exists: current failure, agency promise,
  player insertion space, player controls/refusals/changes, agency guardrails,
  reply-path matrix, compact state, passive-player behavior, boundary handling,
  consequence checks, field patch targets, and token tradeoff.
- Preserve the token architecture packet when one exists: current failure,
  archetype, token budget signal, target allocation, field triage,
  keep/move/cut/rewrite, compression ladder, visual budget, state budget,
  example budget, patch order, rerun checks, and handoff.
- Preserve the card diagnosis packet when one exists: available evidence,
  primary and secondary failures, repair order, symptom map, field triage,
  keep/move/cut/rewrite decisions, packets to preserve/create, verification
  plan, stop conditions, and handoff.
- Preserve the quality audit packet when one exists: evidence available/missing,
  overall tier, critical blockers, scorecard, strongest and weakest dimensions,
  first three repairs, repair skill order, validation/render/simulation stance,
  and handoff.
- Preserve the archetype packet when one exists: current seed, primary archetype,
  secondary overlays, rejected archetypes, archetype contract, player promise,
  player role, core loop, first-screen proof, field allocation, required packets,
  recommended Moonloom skill order, hybrid failure modes, repair rules,
  self-review probes, and handoff.
- Preserve the card-series packet when one exists: shared core, variant map,
  keep/merge/reject decisions, variant contracts, overlap risks, authoring order,
  validation/render/simulation plan, and handoff. Do not flatten a series into
  one overloaded hybrid card or create duplicate cards with the same playable
  loop.
- Preserve the longplay packet when one exists: continuity spine, progression
  phases, state model, route seeds, memory threads, role initiative, continuation
  probes, and token tradeoff.
- `roleDetailDesc` should carry durable identity, backstory, constraints, speech
  style, boundaries, world facts, proactive turn behavior, and the consequence
  loop.
- For world-heavy cards, detail should carry the world engine: player position,
  core rule, faction/location play functions, compact state, route seeds,
  exposition policy, and what to delay or cut.
- For persona-driven cards, the detail should make the role's engine legible:
  what the role wants, what blocks that desire, what they will not do, and what
  changes when the player pushes closer or pulls away.
- If the role feels like a trope, mood, or biography rather than a person who can
  act under pressure, call `lunatalk-character-core` before patching fields.
- For relationship-heavy cards, detail should carry the relationship engine:
  promise, asymmetry, closeness/friction states, pacing gates, repair/rupture
  routes, passive-player behavior, and what the role does when the player
  accepts, questions, refuses, slows down, or reopens an old wound.
- If the card becomes generic flirting, flat comfort, instant intimacy, harmless
  banter, or refusal-ending play, call `lunatalk-relationship-architect` before
  adding more affectionate prose or sample scenes.
- For daily-life cards, detail should carry the quiet routine engine: ordinary
  routine, small desire, tiny disruption, shared object/place, habit state,
  reply paths, passive-player behavior, second-turn change, and return-next-time
  renewal. If the card is just pleasant atmosphere, comfort, or small talk, call
  `lunatalk-daily-life-architect` before adding more mood prose.
- Speaking style must be executable. Replace labels such as natural, gentle,
  witty, or like a real person with sentence rhythm, vocabulary, address terms,
  emotional tells, and what the role avoids saying.
- For voice-heavy cards, write a voice card: surface, private motive, rhythm,
  vocabulary, action beats, concealment, refusal style, passive-player behavior,
  resistance behavior, and trust behavior.
- If voice is the main problem, use `lunatalk-voice-director` before patching
  fields so the voice card, pressure grid, talkExample decision, and blind-line
  test stay coherent.
- For ensemble cards, run a contrast check before finalizing: each core speaker
  needs a different want, fear, speech cue, pressure move, and player leverage.
  If the cast has three or more active speakers, add compact micro-samples for
  weak or easily blurred voices instead of one long sample for the strongest
  speaker.
- For ensemble cards, preserve the ensemble packet before field work: cast
  keep/merge/cut decisions, turn ownership, spotlight rules, group tension,
  player leverage, voice contrast, token plan, and agency probes. If that packet
  is missing, use `lunatalk-ensemble-director` before patching fields.
- Run Moonloom self-review before render: promise, anchor, relationship engine,
  daily-life engine, voice texture, voice calibration, consequence, role
  initiative, agency, opening scene, longplay, player agency, language style,
  boundary design, archetype, then token efficiency.
  When voice calibration is relevant, do not merge it into generic voice texture;
  report the voice cards, micro-sample need, and blind-line risk explicitly.
- Do not let polished prose hide a weak character engine, generic voice, passive
  role behavior, weak first-turn action, hollow opening, missing consequence loop,
  user agency takeover, mixed language, or a generic card that fails its chosen
  type.
- If an existing card has several failures at once, diagnose first with
  `lunatalk-card-doctor`; do not directly rewrite all fields or spend another
  simulation pass before the repair order is clear.
- If the author primarily asks "is this good enough?" or asks for a craft score,
  audit first with `lunatalk-quality-auditor`; do not patch or simulate until the
  first three repairs are clear.
- Patch detail with the role's want/need, the contradiction that blocks it, the
  boundaries that keep escalation playable, the player's leverage, and the role's
  pressure behavior for trust, resistance, passivity, and boundaries.
- Patch detail with concrete voice behavior: sentence rhythm, vocabulary, address
  terms, emotional tells, and avoided phrasing.
- Patch blurred ensemble voices with contrast first, then micro-samples only when
  rules alone are not enough. Pay for those samples by cutting repeated mood
  adjectives or lore that does not change play.
- Patch detail with proactive turn rules: what the role asks, reveals, escalates,
  or offers when the player is passive or stalls.
- Rewrite welcome before render review when it lacks a real opening scene. Add
  location/time or sensory context, a concrete role beat, pressure, and player
  implication before choices or setup fields.
- If only the welcome is weak, call `lunatalk-opening-director` before rewriting
  other fields; avoid turning a narrow first-screen repair into an unnecessary
  full-card rewrite.
- Remove any rule that decides the player's actions, feelings, consent, or
  commitments. Replace generic openings with a concrete scene and specific reply
  path.
- Patch profile, detail, welcome, and examples together for language consistency.
  Preserve character names, tone, and XMLV3 tags while converting card prose to
  Traditional Chinese when needed.
- Repair the chosen card type directly: companion needs relationship pressure and
  emotional boundaries; story/scenario needs stakes, route branches,
  clue/reveal pacing, false leads, and consequence state;
  game/RPG/system cards need a play-engine packet with compact state, resource
  rules, turn protocol, failure-forward behavior, and opening setup/state/
  choices; daily-life needs a routine loop, small playable desire, tiny
  disruption, shared object/place, habit state, passive-player behavior, and
  second-turn change; heavy-setting
  needs modular lore that creates action; ensemble needs distinct motives, voices,
  and turn ownership.
- When making a related card set, author the anchor card first and then only one
  clearly distinct secondary variant. Validate and render before adding more
  variants, and simulate only variants whose behavior changed and whose cost is
  accepted.
- If a heavy-setting, RPG, scenario, or light-setting card starts to read like a
  lore digest, call `lunatalk-world-engineer` before adding more names or history.
- If an ensemble card starts to read like a roll call, banter transcript, or
  group conversation that ignores the player, call `lunatalk-ensemble-director`
  before opening, voice, token, or authoring patches.
- For mature, intense, or sensitive premises, make the intended rating, pacing,
  taboo, refusal style, player agency boundary, and stop conditions explicit in
  the card design before writing a provocative welcome. Preserve the boundary
  packet's explicitness ceiling, escalation ladder, allowed pressure tools,
  disallowed moves, safer fallback, and simulation probes.
- If `tokenBudget` shows `welcomeToDetailRatio` above `2`, move durable rules,
  repeated lore, or visual scaffolding out of welcome before render/simulation.
- Avoid stuffing long visual scaffolding into welcome. Move reusable visual style
  into Theme V3 where possible.
- In XMLV3, use registered tags. Use `<n>` for narration/actions and `<d>` for
  dialogue. Do not invent aliases such as `<narration>` or `<dialogue>`.
- Treat `<state>` as hidden JSON data. If text should be visible, put it in
  `<n>`; if it should drive state UI, make it valid JSON.
- For high-retention cards, design the loop explicitly: hook, agency,
  consequence, memory, progression, and renewed hook.
- If the card is strong for one scene but weak over time, call
  `lunatalk-longplay-architect` before adding more lore or sample dialogue.
- Before finalizing, write one expected first user message and one expected second
  turn. If the card cannot produce a more interesting second turn than the first,
  revise the engine before render or simulation.

## Tool call discipline

- Generate a unique `idempotencyKey` per mutating action and reuse it for retries.
- Never directly edit a public role. Create or use an owned private role.
- If a tool returns `nextRecommendedTools`, treat it as the next normal step unless
  the author's latest instruction conflicts.
- When `validate_role` returns patch tools, patch and validate again before render
  or simulation. Treat those as technical fixes, not as the full writing review.
- If validation returns blockers, patch the card before publishing.

## Final response shape

Report:

- `roleId`
- what changed
- validation status
- render review status
- simulation status or why it was skipped
- recommended next action

For draft-only field assembly, report:

- mode and route
- final role-field authoring packet summary
- packet preservation checklist
- conflict resolutions
- validation / render / simulation handoff
- remaining risks and recommended next action
