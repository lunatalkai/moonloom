---
name: lunatalk-card-author
description: Create or edit LunaTalk private role cards through the Card Writer MCP. Use this skill whenever the user wants an AI client to write, improve, import, restructure, or iterate on a LunaTalk role card, especially when the workflow should produce a real private card rather than only text.
---

# LunaTalk Card Author

Use this skill to turn an author's idea, draft, world notes, or imported material
into a private LunaTalk role card using the Card Writer MCP.

## Required references

Read `../../references/card-writer-mcp.md` before making MCP calls. Read
`../../references/character-core-design.md` when the role idea is thin,
trope-only, generic, or needs persona appeal repair. Read
`../../references/world-engine-design.md` when the card needs worldbuilding,
relationship networks, factions, locations, lore-heavy settings, or lore-dump
repair. Read
`../../references/role-card-writing-framework.md` before writing or deeply
revising the card. Read `../../references/quality-rubric.md` when judging whether
the card is usable. Read `../../references/safety-and-cost.md` when content
rating, sensitive themes, simulation cost, publishing, or credentials matter. Read
`../../references/card-authoring-templates.md` when turning an idea into concrete
field drafts. Read `../../references/material-distillation.md` when the author
provides files, notes, imported drafts, source fragments, or a large world bible.
Read `../../references/theme-v3-rendering.md` if the welcome uses HTML, XMLV3, or
Theme V3. Read `../../references/voice-calibration.md` when the card relies on
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

1. Capture the card goal: role premise, relationship dynamic, play loop, tone,
   language, content rating intent, and success criteria.
   If the author provides large source material, local files, a draft, or a world
   bible, use `lunatalk-material-distiller` first and author from its
   source-to-play map instead of pasting the source into role fields.
   If the goal is mature, intense, adult, horror-leaning, consent-sensitive, or
   boundary-sensitive, use `lunatalk-boundary-designer` first unless a boundary
   packet already exists.
2. If the brief is thin, brainstorm 2-3 sharply different playable directions
   with the author before creating the card. Make the options differ by conflict,
   player role, first scene, and long-term loop, not only by mood. Prefer
   `lunatalk-character-core` when the author needs persona appeal, memorable
   identity, trope repair, relationship leverage, or desire/contradiction/
   boundary design before fields. Prefer `lunatalk-world-engineer` when the
   author needs worldbuilding, relationship networks, factions, locations, lore
   compression, or a world rule that creates play. Prefer
   `lunatalk-card-blueprint` when the author needs broader ideation,
   relationship design, voice design, or opening-scene planning before a real
   role is created. Prefer `lunatalk-voice-director` when the author primarily
   asks for character voice, speaking style, generic dialogue repair,
   catchphrase discipline, refusal style, talkExample need, blind-line tests, or
   ensemble voice contrast. Prefer `lunatalk-agency-designer` when the author
   primarily asks for player agency, user insertion space, interaction hooks,
   decorative choices, route funneling, or player-agency takeover.
3. Choose the archetype or pressure shape: companion/relationship,
   story/scenario, system/simulator, RPG/open-world, generator/assistant,
   canon/IP adaptation, daily-life, light-setting, heavy-setting, or ensemble.
4. Draft the card in Moonloom first: promise, engine, play, and presentation. Use
   the universal draft packet from `card-authoring-templates.md` for thin or
   high-stakes briefs.
5. Run Moonloom self-review before calling mutating tools.
6. If there is no `roleId`, call `role_create_private`.
7. Patch profile fields with `role_patch_profile`.
8. Before patching stable character and world context with `role_patch_detail`,
   use `lunatalk-longplay-architect` when the current task is long-term
   playability, memory/state, route seeds, progression, or a dead third-turn
   loop. Use or preserve `lunatalk-voice-director` when the current patch changes
   speech style, voice cards, talkExample, refusal voice, or ensemble contrast.
   Use or preserve `lunatalk-agency-designer` when the patch changes player
   insertion space, reply paths, route consequences, passive-player behavior, or
   agency guardrails.
9. Before patching the welcome, use `lunatalk-opening-director` when the current
   task is welcome/opening repair or the first-action path is unclear. Patch the
   opening scene with `role_patch_welcome` from the opening packet.
10. Prefer `mode: "xmlv3"` for new visual welcomes. Use `plain` for simple text.
   Use `html` only when the author explicitly needs custom HTML or legacy HTML.
11. Optionally use `theme_bind` and `extension_enable` for Theme V3.
12. Call `validate_role`.
13. Fix MCP blockers before moving on. Do not rely on MCP to judge writing
    quality; run the Moonloom self-review checklist from
    `role-card-writing-framework.md` and `quality-rubric.md`.
14. Call `render_preview` and review the result with `lunatalk-render-review`.
15. Call `simulate_private_chat` with `lunatalk-chat-simulation` when behavior
    needs to be tested and the author accepts normal chat billing. Include a
    playtest plan, transcript triage, and evidence-backed patch decision, not
    only a tool status check.
16. Summarize the card, validation result, render result, simulation result, and
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
- Preserve the world-engine packet when one exists: world promise, player
  position, core world rule, faction/location play functions, state model, route
  seeds, exposition policy, and token tradeoff.
- Preserve the voice-director packet when one exists: current failure, voice
  promise, rhythm, vocabulary, emotional tells, refusal style, response-mode
  grid, catchphrase policy, talkExample decision, blind-line test, pressure
  probes, field patch targets, and token tradeoff.
- Preserve the agency packet when one exists: current failure, agency promise,
  player insertion space, player controls/refusals/changes, agency guardrails,
  reply-path matrix, compact state, passive-player behavior, boundary handling,
  consequence checks, field patch targets, and token tradeoff.
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
- Run Moonloom self-review before render: promise, anchor, voice texture,
  voice calibration, consequence, role initiative, agency, opening scene,
  longplay, player agency, language style, boundary design, archetype, then token
  efficiency.
  When voice calibration is relevant, do not merge it into generic voice texture;
  report the voice cards, micro-sample need, and blind-line risk explicitly.
- Do not let polished prose hide a weak character engine, generic voice, passive
  role behavior, weak first-turn action, hollow opening, missing consequence loop,
  user agency takeover, mixed language, or a generic card that fails its chosen
  type.
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
  emotional boundaries; story needs setting stakes and likely branches;
  game/RPG/system cards need rules, resources, failure pressure, and opening
  setup/state/choices; daily-life needs a small playable desire; heavy-setting
  needs modular lore that creates action; ensemble needs distinct motives, voices,
  and turn ownership.
- If a heavy-setting, RPG, scenario, or light-setting card starts to read like a
  lore digest, call `lunatalk-world-engineer` before adding more names or history.
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
