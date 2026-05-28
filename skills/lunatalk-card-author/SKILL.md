---
name: lunatalk-card-author
description: Use when the user wants an AI client to write, improve, import, restructure, iterate on, or assemble field-ready drafts for a LunaTalk role card, including prepared Moonloom packet stacks and MCP-backed private role creation or editing.
---

# LunaTalk Card Author
Use this skill to turn an author's idea, draft, world notes, imported material, or
Moonloom packet stack into field-ready LunaTalk role content. Use the Card Writer MCP only after self-review.

## Required references

Read `../../references/card-writer-mcp.md` before MCP calls, `../../references/card-authoring-templates.md`
before final field drafts, and `../../references/field-finalization.md` before MCP-backed creation or patching.

Load the narrow reference and skill before authoring when that layer is primary:
`premise-workshop.md`, `sample-driven-calibration.md` plus `../../examples/sample-card-packets.md`,
`benchmark-pattern-calibration.md`, `originality-adaptation.md`, `profile-packaging.md`, `visual-identity.md`,
`language-style.md`, `quality-scorecard.md`, `card-series-design.md`,
`ensemble-card-design.md`, `archetype-contracts.md`, `card-diagnosis.md`,
`tension-triangle.md`, `state-economy-design.md`, `presentation-design.md`,
`role-detail-engine.md`, `token-economy.md`, `voice-calibration.md`,
`talk-example-design.md`, `boundary-design.md`, `opening-design.md`,
`longplay-design.md`, `agency-design.md`, `instruction-guardrails.md`, or
`playtest-loop.md`. Use `system-intake-card-design.md` when a system,
simulator, generator, or mission-board card needs an intake-first setup wizard,
intake console, or HTML-to-XMLV3 control-surface parity. For card-shape engines,
use `character-core-design.md`, `relationship-engine.md`, `world-engine-design.md`,
`scenario-design.md`, `daily-life-design.md`, `play-engine-design.md`, and
`generator-design.md` with their matching Moonloom skills before fields. Use
`material-distillation.md` for
large notes, `theme-v3-rendering.md` for HTML/XMLV3/Theme V3,
`safety-and-cost.md` for rating/simulation/publishing/credentials,
`role-card-writing-framework.md` and `quality-rubric.md` for self-review, and
`../../examples/synthetic-card-briefs.md` for benchmark or regression work.

## Workflow

1. Capture the card goal and mode: draft-only field assembly, MCP-backed private
   role creation, or patching an existing private role. Also capture role
   premise, relationship dynamic, play loop, tone, language, content rating
   intent, and success criteria.
   Route narrow blockers before field assembly unless the matching packet already
   exists:
   - loose mood/trope/aesthetic directions: `lunatalk-premise-workshop`
   - examples, golden samples, sample output packets, benchmark shapes, copy-risk review: `lunatalk-sample-calibrator`
   - provided benchmark pattern packets, anonymized aggregate/deep-reading gaps, detail density repair, or public-safe method updates: read `benchmark-pattern-calibration.md` before fields; do no source selection in Moonloom
   - canon/IP, fan premise, copied draft, derivative, "like X but original": `lunatalk-originality-adapter`
   - `roleName`, `roleDesc`, tags, title, tagline, public-facing first impression: `lunatalk-profile-packager`
   - avatar, cover, thumbnail, key art, image prompt, art brief, visual identity before profile/presentation: `lunatalk-visual-identity-director`
   - stakes, hook, tension triangle, role desire, player leverage, why-now: `lunatalk-tension-weaver`
   - state fields, visible vs hidden vs detail-only state, memory/state updates: `lunatalk-state-economist`
   - zh-Hant / zh-TW cleanup, Traditional/Simplified mixing, register, pronouns, field language mismatch: `lunatalk-language-stylist`
   - `talkExample`, micro-samples, dialogue samples, output examples, omit/keep decision: `lunatalk-talk-example-curator`
   - "good enough", top-tier, scorecard, first three repairs: `lunatalk-quality-auditor`
   - instruction-layer repair, `role_patch_jailbreak`, assistant framing, schema/state/format drift: `lunatalk-instruction-guardrail`
   - related cards, alternate versions, variants, card set, keep/merge/reject: `lunatalk-series-architect`
   - ensemble / multi-character, cast size, turn ownership, spotlight, group tension: `lunatalk-ensemble-director`
   - unclear card type or hybrid companion/story/system/RPG/generator/daily-life/light-setting/heavy-setting/ensemble: `lunatalk-archetype-director`
   - RPG, adventure, open-world, sandbox, survival, simulator, stats/resources/quests/combat/turn protocol:
     `lunatalk-play-engineer`; read `system-intake-card-design.md` when the first screen should be a setup wizard or intake console
   - generator, helper, creator-assistant, artifact output, intake/defaults, revision commands:
     `lunatalk-generator-architect`; read `system-intake-card-design.md` when the generator welcome needs panel/form/choices parity with a rich HTML control surface
   - story, scenario, mystery, investigation, case-file, event, trial, rescue, betrayal, clue/reveal: `lunatalk-scenario-architect`
   - daily-life, slice-of-life, quiet companion, neighbor/roommate/cohabitation, ordinary routine: `lunatalk-daily-life-architect`
   - existing-card symptoms from validation/render/simulation or "what to fix first": `lunatalk-card-doctor`
   - taste-level/comparative feedback: `lunatalk-collaboration-director`
   - large source material, local files, draft, or world bible: `lunatalk-material-distiller`
   - mature, intense, adult, horror-leaning, consent-sensitive, or boundary-sensitive goals: `lunatalk-boundary-designer`
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
   `lunatalk-detail-engineer` when the author primarily asks for a fuller
   `roleDetailDesc`, less empty settings, full-detail/top-card depth, or a durable detail engine. Prefer `lunatalk-token-architect` when the engine exists
   and the ask is tokenBudget, welcomeToDetailRatio, overlong fields, compression,
   keep/move/cut/rewrite, or preserving playability while reducing token cost. Prefer
   `lunatalk-state-economist` when the author primarily asks which memory/state
   fields to keep, omit, show, hide, or update before longplay or presentation.
   Prefer
   `lunatalk-presentation-director` when the author primarily asks how to present
   a coherent card through XMLV3, Theme V3, HTML, visible state, hidden state, or
   first-screen hierarchy before final fields or render review.
3. Choose or preserve the archetype packet: companion/relationship,
   story/scenario, system/simulator, RPG/open-world, generator/assistant,
   canon/IP adaptation, daily-life, light-setting, heavy-setting, or ensemble.
4. Draft the card in Moonloom first: promise, engine, play, and presentation. Use
   the universal draft packet from `card-authoring-templates.md` for thin or
   high-stakes briefs. Preserve any `lunatalk-state-economist` packet before
   turning state into detail rules, welcome status, XMLV3, or hidden JSON.
   Preserve any `lunatalk-presentation-director` packet when assembling fields.
   For MCP-backed creation, preserve or create a visual identity packet before
   final fields; the finished handoff needs actual avatar/background URLs.
   If the work includes a provided benchmark pattern packet, preserve the packet
   before detail expansion. Use it to repair field allocation, opening proof,
   longplay, and XMLV3 presentation; do not perform source selection in Moonloom
   and do not copy source wording, markup, names, or provenance into the role.
   When the author already provides a coherent packet stack and asks for final
   fields, produce the final role-field authoring packet from
   `card-authoring-templates.md`.
5. Run Moonloom self-review before calling mutating tools. For field-ready
   output or MCP-backed work, run `lunatalk-field-finalizer` before stopping
   with a draft or before any mutating MCP call.
6. If the mode is draft-only field assembly or the author forbids MCP calls,
   stop here after returning the final role-field authoring packet. Do not call
   `role_create_private`, patch tools, render, simulation, or publish tools until
   the author asks to create or patch a real private role.
7. If there is no `roleId`, call `role_create_private`.
8. Patch profile fields with `role_patch_profile`.
   Patch avatar/background URLs with `role_patch_assets` once public-safe image
   URLs exist. If only prompts exist, stop with the missing asset action; do not
   claim completion while `roleAvatar` or `roleBackground` is blank.
9. If the current card or draft has a thin `roleDetailDesc`, thin biography,
   under-budget detail for its language/card ambition, or missing durable role
   engine, use or preserve `lunatalk-detail-engineer` before patching fields. Use
   `lunatalk-token-architect` for overlong `roleDesc`, overlong `roleWelcome`,
   high `welcomeToDetailRatio`, duplicated lore, visual bloat, or misplaced rules.
10. Before patching stable character and world context with `role_patch_detail`,
   use or preserve `lunatalk-play-engineer` when the current patch changes
   RPG/adventure rules, compact state, resources, inventory, quests, combat,
   turn protocol, failure-forward behavior, or visible state updates.
   Use `lunatalk-longplay-architect` when the current task is long-term
   playability, memory/state, route seeds, progression, or a dead third-turn
   loop. Use or preserve `lunatalk-state-economist` when the current patch
   decides state fields, visibility, hidden JSON, update cadence, decorative
   meter removal, or state token cost. Use or preserve
   `lunatalk-voice-director` when the current patch changes
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
   artifact memory, diegetic creator behavior, or advice-only drift. For
   system/simulator or generator welcomes that should behave like an intake-first
   setup wizard, preserve a `system-intake-card-design.md` packet so XMLV3 can
   map rich HTML-style panel, form, state, and choices controls before prose
   polish.
11. Before patching the welcome, use `lunatalk-opening-director` when the current
   task is welcome/opening repair or the first-action path is unclear. Use or
   preserve `lunatalk-presentation-director` when the opening is coherent but the
   unresolved layer is welcome mode, XMLV3 structure, Theme V3 split, hidden
   state, visible status, visual affordances, or first-screen hierarchy. If the
   visible/hidden state fields themselves are not settled, use or preserve
   `lunatalk-state-economist` before presentation. Patch the opening scene with
   `role_patch_welcome` from the opening and presentation packets.
   For a new or repaired opening, the first two lines must pass 4-W legibility
   before mood: Who / Where / When / What, concrete nouns, and one playable
   object, decision, or risk. If the opening feels mood-first, pretty mood,
   or 雲裡霧裡, route back to opening repair before MCP patching.
12. Prefer `mode: "xmlv3"` for new visual welcomes. Use `plain` for simple text.
   Use `html` only when the author explicitly needs custom HTML, legacy HTML, or
   a presentation packet justifies a layout that XMLV3 plus Theme V3 cannot
   express.
   If the author needs HTML div-like sectioning, grouped blocks, or local color
   distinction, prefer the XMLV3 `layout` extension pack first. Use `panel`,
   `stack`, `row`, `grid`, `choices`, and `divider` for container, section
   block, and action-button hierarchy. Use Theme V3 tone/color tokens for
   reusable skin. For local section, button, form, collapse, tag, or meter
   emphasis, use constrained presentation attributes such as `bg`, `border`,
   `color`, `label-color`, `track-bg`, `submit-bg`, `radius`, and `padding`
   instead of falling back to HTML.
   When a forked theme is needed, use CSS variables such as `--lt-panel-bg`,
   `--lt-choice-border-color`, `--lt-form-field-bg`, `--lt-form-submit-bg`,
   `--lt-collapse-bg`, and `--lt-bar-track-bg`. Do not use raw XML
   `style`/`class`; the presentation attributes are the only allowed local
   styling shortcut.
   When these tags appear, include `extension_enable` for `layout` in the MCP
   patch sequence; keep the fallback readable if the pack is unsupported.
   Do not paste the platform XMLV3 server guide into `roleDetailDesc`; detail
   should carry the role-specific format contract: when this card updates state,
   when choices appear, which pack is intentionally enabled, and what visible
   status means for future turns.
   In XMLV3, close `</scene>` after the prose/dialogue beat and put controls
   such as `bar`, `collapse`, `form`, `result-card`, `share-text`, and `choice`
   as sibling tags. Do not wrap or nest the whole interface inside one scene.
   For 2-4 short action buttons, wrap child `<choice>` tags in
   `<choices cols="2" align="stretch" gap="sm">` and use semantic child `tone`
   hooks. Do not leave short buttons as an uneven left-aligned vertical stack
   unless each option is intentionally long prose.
   When a screen needs visible action hierarchy, use weighted XMLV3 choices:
   `<choices cols="4" align="stretch" gap="sm">` with `span="full"` for the
   main action row and `span="2"` / `span="3"` / `span="4"` for 2:1:1, 3:1,
   or full-width weighting. Omit `span` for normal one-column actions; do not
   write `span="1"`. Mobile preview should collapse these buttons into a
   vertical or near-single-column readable path, with fallback text still usable
   if the layout pack is unavailable.
13. Before calling `role_patch_jailbreak`, use or preserve
    `lunatalk-instruction-guardrail`. Only patch jailbreak text when the author
    explicitly asks for a real instruction-layer patch or confirms
    transcript-backed behavior evidence. Prefer `roleDetailDesc`, `roleWelcome`,
    and `talkExample` for ordinary behavior fixes.
14. XMLV3 real chat requires `theme_bind` before conversation acceptance. If
    `roleWelcome` uses XMLV3 and the author expects real chat / 對話回覆 controls,
    call `theme_bind` after `role_patch_welcome`; otherwise conversation replies
    may return `isV3:false` and render as plain text. Use `extension_enable`
    only when a specific pack is needed. Keep compatible XMLV3 extension work on
    the XMLV3 target; do not propose XMLV4/XMLV5 for optional tags, attributes,
    packs, or fallback behavior.
    - If `roleWelcome` or dynamic reply guidance uses Level 2 layout containers,
      grouped/weighted `<choices>`, or fact-card style status, mark the card as
      requiring XMLV3 Feature Level 2 and record the relevant capability names.
      If it only uses the 2026-05-27 baseline, keep the minimum at Feature
      Level 1. Generate future turns at or below the client-declared feature
      level.
15. Call `validate_role`.
16. Fix MCP blockers before moving on. Do not rely on MCP to judge writing
    quality; run the Moonloom self-review checklist from
    `role-card-writing-framework.md` and `quality-rubric.md`.
    If validation reports missing avatar/background, call `role_patch_assets`
    after assets are available, then rerun validation before render or publish.
17. If `validate_role.tokenBudget` shows allocation drift, use
    `lunatalk-token-architect` before render or simulation.
18. Call `render_preview` and review the result with `lunatalk-render-review`.
    If render found visual or first-action failures, preserve render repair
    before patching visual fields or before another render pass.
19. Call `conversation_send_message` then `conversation_inspect` with
    `lunatalk-chat-simulation` when behavior needs testing and the author accepts
    normal chat billing. Include a playtest plan, transcript triage, simulation
    repair packet, and evidence-backed patch decision, not only tool status.
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
   tags/theme notes, avatar/background status, token allocation,
   validation/render/simulation handoff, and self-review. Use the final
   role-field authoring packet in `card-authoring-templates.md`.
- Use `lunatalk-field-finalizer` before role_create_private or patch tools when
  a field draft already exists and needs MCP-ready placeholder cleanup, hard-cap
  checks, compact fallback, format sanity, or patch mapping.
- Preserve packets by name and by behavior. At minimum, keep the selected
  premise, sample calibration, originality adaptation, profile package,
  language-style decisions, visual identity, quality audit, render repair,
  simulation repair, instruction guardrail,
  archetype, character core, relationship/daily-life/world/play/generator/scenario/ensemble engines,
  tension, agency, voice, TalkExample, opening, longplay, boundary, token, presentation, and
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
- The first two lines of `roleWelcome` must state the 4-W in playable terms:
  who is in motion, where/when the player is, and what concrete problem is in
  front of them. Do not let a poetic or mood-first opening make the author feel
  雲裡霧裡 before they know what they can do.
- Build a language-aware detail budget before MCP creation or patching; if `roleDetailDesc` is thin for its language and ambition, use `lunatalk-detail-engineer` and treat it as not ready for MCP patching. Expand durable engine first; token economy removes empty prose and duplicate rules, not playable core.
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
- In XMLV3, use registered tags. Use `<n>` for narration/actions and `<d>` for
  dialogue. Do not invent aliases such as `<narration>` or `<dialogue>`.
- In XMLV3, avoid wrapping controls inside `<scene>`. Close `</scene>` before
  `choice`, `form`, `result-card`, `bar`, or `collapse` blocks so the preview
  keeps usable mobile width and clear panel hierarchy.
- Treat `<state>` as hidden JSON data. If text should be visible, put it in
  `<n>`; if it should drive state UI, make it valid JSON.
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

For MCP-backed work, report `roleId`, changes, validation/render/simulation
status, remaining risks, and next action. For draft-only work, report route,
role-field packet summary, packet preservation, conflict resolutions, handoff,
remaining risks, and next action.
