---
name: lunatalk-card-author
description: Create or edit LunaTalk private role cards through the Card Writer MCP. Use this skill whenever the user wants an AI client to write, improve, import, restructure, or iterate on a LunaTalk role card, especially when the workflow should produce a real private card rather than only text.
---

# LunaTalk Card Author

Use this skill to turn an author's idea, draft, world notes, or imported material
into a private LunaTalk role card using the Card Writer MCP.

## Required references

Read `../../references/card-writer-mcp.md` before making MCP calls. Read
`../../references/role-card-writing-framework.md` before writing or deeply
revising the card. Read `../../references/quality-rubric.md` when judging whether
the card is usable. Read `../../references/safety-and-cost.md` when content
rating, sensitive themes, simulation cost, publishing, or credentials matter. Read
`../../references/card-authoring-templates.md` when turning an idea into concrete
field drafts. Read `../../references/theme-v3-rendering.md` if the welcome uses
HTML, XMLV3, or Theme V3. Use `../../examples/synthetic-card-briefs.md` when the
task asks for benchmark creation, regression checks, or example-driven iteration.

## Workflow

1. Capture the card goal: role premise, relationship dynamic, play loop, tone,
   language, content rating intent, and success criteria.
2. If the brief is thin, brainstorm 2-3 sharply different playable directions
   with the author before creating the card. Make the options differ by conflict,
   player role, first scene, and long-term loop, not only by mood.
3. Choose the archetype or pressure shape: companion/relationship,
   story/scenario, system/simulator, RPG/open-world, generator/assistant,
   canon/IP adaptation, daily-life, light-setting, heavy-setting, or ensemble.
4. Draft the card in Moonloom first: promise, engine, play, and presentation. Use
   the universal draft packet from `card-authoring-templates.md` for thin or
   high-stakes briefs.
5. Run Moonloom self-review before calling mutating tools.
6. If there is no `roleId`, call `role_create_private`.
7. Patch profile fields with `role_patch_profile`.
8. Patch stable character and world context with `role_patch_detail`.
9. Patch the opening scene with `role_patch_welcome`.
10. Prefer `mode: "xmlv3"` for new visual welcomes. Use `plain` for simple text.
   Use `html` only when the author explicitly needs custom HTML or legacy HTML.
11. Optionally use `theme_bind` and `extension_enable` for Theme V3.
12. Call `validate_role`.
13. Fix MCP blockers before moving on. Do not rely on MCP to judge writing
    quality; run the Moonloom self-review checklist from
    `role-card-writing-framework.md` and `quality-rubric.md`.
14. Call `render_preview` and review the result with `lunatalk-render-review`.
15. Call `simulate_private_chat` with `lunatalk-chat-simulation` when behavior
    needs to be tested and the author accepts normal chat billing.
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
- `roleDetailDesc` should carry durable identity, backstory, constraints, speech
  style, boundaries, world facts, proactive turn behavior, and the consequence
  loop.
- For persona-driven cards, the detail should make the role's engine legible:
  what the role wants, what blocks that desire, what they will not do, and what
  changes when the player pushes closer or pulls away.
- Speaking style must be executable. Replace labels such as natural, gentle,
  witty, or like a real person with sentence rhythm, vocabulary, address terms,
  emotional tells, and what the role avoids saying.
- Run Moonloom self-review before render: promise, anchor, voice texture,
  consequence, role initiative, agency, opening scene, player agency, language
  style, boundary design, archetype, then token efficiency.
- Do not let polished prose hide a weak character engine, generic voice, passive
  role behavior, weak first-turn action, hollow opening, missing consequence loop,
  user agency takeover, mixed language, or a generic card that fails its chosen
  type.
- Patch detail with the role's want/need, the contradiction that blocks it, and
  the boundaries that keep escalation playable.
- Patch detail with concrete voice behavior: sentence rhythm, vocabulary, address
  terms, emotional tells, and avoided phrasing.
- Patch detail with proactive turn rules: what the role asks, reveals, escalates,
  or offers when the player is passive or stalls.
- Rewrite welcome before render review when it lacks a real opening scene. Add
  location/time or sensory context, a concrete role beat, pressure, and player
  implication before choices or setup fields.
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
- For mature, intense, or sensitive premises, make the intended rating, pacing,
  taboo, refusal style, player agency boundary, and stop conditions explicit in
  the card design before writing a provocative welcome.
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
