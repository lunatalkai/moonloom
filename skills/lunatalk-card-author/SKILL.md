---
name: lunatalk-card-author
description: Use when the user wants an AI client to write, improve, import, restructure, iterate on, or assemble field-ready drafts for a LunaTalk role card, including prepared Moonloom packet stacks and MCP-backed private role creation or editing.
---

# LunaTalk Card Author
Use this skill to turn an author's idea, draft, world notes, imported material,
or Moonloom packet stack into field-ready LunaTalk role content. Use the Card
Writer MCP only after the draft is coherent and self-reviewed.

## Required references

Read `../../references/card-writer-mcp.md` before MCP calls and
`../../references/card-authoring-templates.md` before final field drafts.

Load the narrow reference and skill before authoring when that layer is primary:
`../../references/premise-workshop.md` / `lunatalk-premise-workshop` for loose
ideas; `../../references/sample-driven-calibration.md` plus
`../../examples/sample-card-packets.md` / `lunatalk-sample-calibrator` for
examples, golden samples, sample output packets, benchmark expected-output
shapes, draft-to-sample comparison, or copy-risk review; `profile-packaging.md`,
`language-style.md`, `quality-scorecard.md`, `card-series-design.md`,
`ensemble-card-design.md`, `archetype-contracts.md`, `card-diagnosis.md`,
`presentation-design.md`, `token-economy.md`, `voice-calibration.md`,
`boundary-design.md`, `opening-design.md`, `longplay-design.md`,
`agency-design.md`, `instruction-guardrails.md`, or `playtest-loop.md` for their
matching focused tasks.

For card-shape engines, use `character-core-design.md`,
`relationship-engine.md`, `world-engine-design.md`, `scenario-design.md`,
`daily-life-design.md`, `play-engine-design.md`, and `generator-design.md` with
their matching Moonloom skills before fields when those layers are unresolved.
Use `material-distillation.md` for author-provided files or large notes,
`theme-v3-rendering.md` for HTML/XMLV3/Theme V3, `safety-and-cost.md` for
rating/simulation/publishing/credentials, `role-card-writing-framework.md` and
`quality-rubric.md` for Moonloom self-review, and
`../../examples/synthetic-card-briefs.md` for benchmark or regression work.

## Workflow

1. Capture the card goal and mode: draft-only field assembly, MCP-backed private
   role creation, or patching an existing private role. Also capture role
   premise, relationship dynamic, play loop, tone, language, content rating
   intent, and success criteria.
   If the author has no settled premise yet and only gives mood, trope,
   aesthetic cluster, or asks to brainstorm/open directions before fields, use
   `lunatalk-premise-workshop` first unless a premise workshop packet already
   exists.
   If the author asks for examples, golden samples, sample output packets,
   benchmark expected-output shapes, draft-to-sample comparison, "make it like
   this sample", or copy-risk review before fields, use
   `lunatalk-sample-calibrator` first unless a sample calibration packet already
   exists. Treat samples as structure-only calibration, not final prose and not
   a reason to call MCP tools.
   If the author asks for `roleName`, `roleDesc`, tags, title, tagline, short
   pitch, public-facing package, first impression, discovery surface, or why a
   player should open the card, use `lunatalk-profile-packager` first unless a
   profile package packet already exists.
   If the author asks for language consistency, zh-Hant / zh-TW cleanup,
   Traditional/Simplified mixing, translated-sounding prose, register alignment,
   pronouns, address terms, punctuation, mixed-language tags, or mismatch between
   `roleDesc`, `roleDetailDesc`, `roleWelcome`, and `talkExample`, use
   `lunatalk-language-stylist` first unless a language-style packet already
   exists.
   If the author asks whether a draft, blueprint, packet stack, or role fields
   are good enough, top-tier, ready to continue, or needs a scorecard / first
   three repairs, use `lunatalk-quality-auditor` first unless a quality audit
   packet already exists.
   If the author asks for system behavior changes, instruction-layer repair,
   jailbreak text, `role_patch_jailbreak`, or transcript-backed fixes for
   repeated out-of-character assistant framing, schema drift, state protocol
   drift, or format drift after normal fields are coherent, use
   `lunatalk-instruction-guardrail` first unless an instruction guardrail packet
   already exists. Do not use jailbreak for boring, generic, passive, or
   trope-only cards.
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
   If the author is unsure whether the card is companion, story, system, RPG,
   generator, daily-life, light-setting, heavy-setting, ensemble, or a hybrid,
   or if generator/helper behavior is only a small overlay inside another card
   contract, use `lunatalk-archetype-director` first unless an archetype packet
   already exists.
   If the author asks to create or repair an RPG, adventure, open-world,
   sandbox, survival, investigation, simulator, or game-like card with stats,
   resources, inventory, quests, combat, turn protocol, compact state updates,
   or failure-forward behavior, use `lunatalk-play-engineer` first unless a
   play-engine packet already exists. Do not create or patch the card until the
   playable rule loop, state model, resource rules, and failure behavior are
   coherent.
   If the author asks to create or repair a primary generator, helper,
   creator-assistant, artifact-producing, intake/defaults, output-schema,
   revision-command, or advice-only assistant card, use
   `lunatalk-generator-architect` first unless a generator packet already exists.
   Do not create or patch the card until the artifact contract, defaults, schema,
   revision operations, and artifact memory are coherent.
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
   If the author is improving an existing card and provides concrete symptoms,
   validation/render output, simulation findings, or asks what to fix first, use
   `lunatalk-card-doctor` first unless a diagnosis packet already exists. If the
   feedback is taste-level or comparative, use `lunatalk-collaboration-director`
   first unless a collaboration packet already exists.
   If the author provides large source material, local files, a draft, or a world
   bible, use `lunatalk-material-distiller` first and author from its
   source-to-play map instead of pasting the source into role fields.
   If the goal is mature, intense, adult, horror-leaning, consent-sensitive, or
   boundary-sensitive, use `lunatalk-boundary-designer` first unless a boundary
   packet already exists.
2. If the brief is thin but still has no settled role, player position, first
   scene, or primary contract, use or preserve `lunatalk-premise-workshop`
   before blueprinting or authoring. If the brief is thin but already has a
   chosen direction, preserve that direction and fill the narrow missing layer
   instead of reopening broad alternatives, unless the author explicitly asks to
   compare new directions. Prefer
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
   `lunatalk-language-stylist` when the author primarily asks for script
   consistency, zh-Hant / zh-TW localization, translated-sounding prose,
   pronouns, address terms, register, punctuation, or field-to-field language
   mismatch after the voice rules are already coherent. Prefer
   `lunatalk-play-engineer` when the author primarily asks for RPG/adventure
   mechanics, resources, inventory, quests, combat, compact state, turn
   protocol, failure-forward behavior, or rule-manual opening repair. Prefer
   `lunatalk-generator-architect` when the author primarily asks for a generator,
   helper, creator-assistant, artifact output, intake defaults, stable schema,
   revision commands, or repair for advice-only / endless-intake behavior. Prefer
   `lunatalk-token-architect` when the author primarily asks about tokenBudget,
   welcomeToDetailRatio, overlong fields, compression, keep/move/cut/rewrite, or
   preserving playability while reducing token cost. Prefer
   `lunatalk-presentation-director` when the author primarily asks how to present
   a coherent card through XMLV3, Theme V3, HTML, visible state, hidden state, or
   first-screen hierarchy before final fields or render review.
3. Choose or preserve the archetype packet: companion/relationship,
   story/scenario, system/simulator, RPG/open-world, generator/assistant,
   canon/IP adaptation, daily-life, light-setting, heavy-setting, or ensemble.
4. Draft the card in Moonloom first: promise, engine, play, and presentation. Use
   the universal draft packet from `card-authoring-templates.md` for thin or
   high-stakes briefs. Preserve any `lunatalk-presentation-director` packet when
   assembling fields. When the author already provides a coherent packet stack
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
   Use or preserve `lunatalk-generator-architect` when the current patch changes
   artifact type, intake rules, defaults, output schema, revision operations,
   artifact memory, diegetic creator behavior, or advice-only drift.
11. Before patching the welcome, use `lunatalk-opening-director` when the current
   task is welcome/opening repair or the first-action path is unclear. Use or
   preserve `lunatalk-presentation-director` when the opening is coherent but the
   unresolved layer is welcome mode, XMLV3 structure, Theme V3 split, hidden
   state, visible status, visual affordances, or first-screen hierarchy. Patch
   the opening scene with `role_patch_welcome` from the opening and presentation
   packets.
12. Prefer `mode: "xmlv3"` for new visual welcomes. Use `plain` for simple text.
   Use `html` only when the author explicitly needs custom HTML, legacy HTML, or
   a presentation packet justifies a layout that XMLV3 plus Theme V3 cannot
   express.
13. Before calling `role_patch_jailbreak`, use or preserve
    `lunatalk-instruction-guardrail`. Only patch jailbreak text when the author
    explicitly asks for a real instruction-layer patch or confirms
    transcript-backed behavior evidence. Prefer `roleDetailDesc`, `roleWelcome`,
    and `talkExample` for ordinary behavior fixes.
14. Optionally use `theme_bind` and `extension_enable` for Theme V3.
15. Call `validate_role`.
16. Fix MCP blockers before moving on. Do not rely on MCP to judge writing
    quality; run the Moonloom self-review checklist from
    `role-card-writing-framework.md` and `quality-rubric.md`.
17. If `validate_role.tokenBudget` shows allocation drift, use
    `lunatalk-token-architect` before render or simulation.
18. Call `render_preview` and review the result with `lunatalk-render-review`.
    If render found visual or first-action failures, preserve render repair
    before patching visual fields or before another render pass.
19. Call `simulate_private_chat` with `lunatalk-chat-simulation` when behavior
    needs to be tested and the author accepts normal chat billing. Include a
    playtest plan, transcript triage, simulation repair packet, and
    evidence-backed patch decision, not only a tool status check.
    If simulation found behavior failures, preserve simulation repair before
    patching fields or before another simulation pass.
20. Summarize the card, validation result, render result, simulation result, and
    remaining risks.

## Collaboration Loop

Moonloom should behave like a card-writing skill framework, not a form filler.

- Before drafting, surface the emotional promise, player fantasy, pressure, or
  gameplay loop that should survive every route.
- For weak ideas, propose concrete alternatives with player leverage, first-scene
  pressure, hidden contradiction, and a repeatable loop.
- For existing cards, diagnose the weakest layer first and patch that layer
  directly. Keep replayability in state, consequence, and role initiative rather
  than longer prose.

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

- Keep the author in the loop through agent chat, not an in-app comment system.
- Do not create extra storage, review sessions, or side ledgers. If feedback is
  ambiguous or comparative, use `lunatalk-collaboration-director` first.
- When a prepared packet stack already exists, do not brainstorm from scratch.
  Resolve conflicts, preserve the strongest packet signals, and assemble
  `roleName`, `roleDesc`, `roleDetailDesc`, `roleWelcome`, `talkExample`,
  tags/theme notes, token allocation, validation/render/simulation handoff, and
  self-review. Use the final role-field authoring packet in
  `card-authoring-templates.md`; do not copy every optional packet into the
  response unless it is present or required.
- Preserve packets by name and by behavior. At minimum, keep the selected
  premise, sample calibration, profile package, language-style decisions,
  quality audit, render repair, simulation repair, instruction guardrail,
  archetype, character core, relationship/daily-life/world/play/generator/scenario/ensemble engines,
  agency, voice, opening, longplay, boundary, token, presentation, and
  material-distillation packets whenever they exist.
- If a packet is missing and the missing layer blocks a good card, route to the
  narrow skill before field assembly. Do not fill missing packets with generic
  prose just to continue.
- Use Traditional Chinese for user-facing LunaTalk card content when the author
  writes in Traditional Chinese or asks for it. For `zh-Hant` cards, keep
  profile, detail, welcome, and examples consistently Traditional Chinese.
  If the issue is more than a simple script preference, use
  `lunatalk-language-stylist` before patching fields so the language pass does
  not accidentally change engine, opening, voice rules, XMLV3 tags, or JSON keys.
- Keep `roleDesc` scannable. If a draft exceeds the recommended length or feels
  dense, rewrite a compressed final version instead of only noting the issue.
- The first scene should invite the player to act immediately. If the first reply
  path is unclear, the card is not ready.
- If the player can only watch, choices are decorative, or the card narrates the
  player's feelings/actions, use `lunatalk-agency-designer` before patching
  fields.
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
- If the normal fields are coherent but simulation repeatedly shows
  out-of-character assistant framing, schema drift, state protocol drift, or
  format drift, use `lunatalk-instruction-guardrail` before any
  `role_patch_jailbreak` call. Do not use jailbreak text as a shortcut for weak
  character core, missing voice, bad opening, weak longplay, unsafe boundaries,
  or generic writing quality.
- For ensemble cards, run a contrast check before finalizing: each core speaker
  needs a different want, fear, speech cue, pressure move, and player leverage.
  If the cast has three or more active speakers, add compact micro-samples for
  weak or easily blurred voices instead of one long sample for the strongest
  speaker.
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
  choices; generator/helper cards need an artifact contract, intake defaults,
  stable output schema, named revision operations, quality rubric, and at least
  one usable artifact per normal turn; daily-life needs a routine loop, small
  playable desire, tiny disruption, shared object/place, habit state,
  passive-player behavior, and second-turn change; heavy-setting needs modular
  lore that creates action; ensemble needs distinct motives, voices, and turn
  ownership.
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

- Generate one `idempotencyKey` per intended mutating action and reuse it for
  retries.
- Never directly edit a public role; create or use an owned private role.
- Follow `nextRecommendedTools` unless the author conflicts. Patch validation
  blockers and validate again before render, simulation, or publishing; treat
  those fixes as technical, not as the full writing review.

## Final response shape

For MCP-backed work, report `roleId`, what changed, validation status, render
status, simulation status or why it was skipped, remaining risks, and next
action. For draft-only work, report mode/route, role-field packet summary,
packet preservation checklist, conflict resolutions, validation/render/simulation
handoff, remaining risks, and next action.
