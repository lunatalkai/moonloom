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
the card is usable. Read `../../references/theme-v3-rendering.md` if the welcome
uses HTML, XMLV3, or Theme V3. Use `../../examples/synthetic-card-briefs.md` when
the task asks for benchmark creation, regression checks, or example-driven
iteration.

## Workflow

1. Capture the card goal: role premise, relationship dynamic, play loop, tone,
   language, content rating intent, and success criteria.
2. If there is no `roleId`, call `role_create_private`.
3. Choose the archetype: companion/relationship, story/scenario, system/simulator,
   RPG/open-world, generator/assistant, or canon/IP adaptation.
4. Patch profile fields with `role_patch_profile`.
5. Patch stable character and world context with `role_patch_detail`.
6. Patch the opening scene with `role_patch_welcome`.
7. Prefer `mode: "xmlv3"` for new visual welcomes. Use `plain` for simple text.
   Use `html` only when the author explicitly needs custom HTML or legacy HTML.
8. Optionally use `theme_bind` and `extension_enable` for Theme V3.
9. Call `validate_role`.
10. Fix blockers before moving on. Treat warnings as work items unless the author
   explicitly accepts the tradeoff. Use `qualityDimensions` to repair the weakest
   dimension first.
11. Call `render_preview` and review the result with `lunatalk-render-review`.
12. Call `simulate_private_chat` with `lunatalk-chat-simulation` when behavior
    needs to be tested and the author accepts normal chat billing.
13. Summarize the card, validation result, render result, simulation result, and
    remaining risks.

## Authoring guidance

- Keep the author in the loop through conversation. The author feedback surface is
  the agent chat, not an in-app comment system.
- Do not create extra storage, review sessions, or side ledgers in the skill.
  The role card is the source of truth.
- Use Traditional Chinese for user-facing LunaTalk card content when the author
  writes in Traditional Chinese or asks for it. For `zh-Hant` cards, keep
  profile, detail, welcome, and examples consistently Traditional Chinese.
- The first scene should invite the player to act immediately. If the first reply
  path is unclear, the card is not ready.
- `roleDetailDesc` should carry durable identity, backstory, constraints, speech
  style, boundaries, world facts, proactive turn behavior, and the consequence
  loop.
- Clear `validate_role` quality warnings by strengthening the premise, role
  engine, speaking style, progression rules, concrete opening scene, or first
  action path.
- If `qualityDimensions` is present, repair in this order: `promise`, `anchor`,
  `consequence`, `roleInitiative`, `agency`, `openingScene`, `playerAgency`,
  `languageStyle`, `archetype`, then `tokenEfficiency`. Do not let polished prose
  hide passive role behavior, weak first-turn action, hollow opening, missing
  consequence loop, user agency takeover, mixed language, or a generic card that
  fails its chosen type.
- For `roleInitiative` warnings, patch detail with proactive turn rules: what the
  role asks, reveals, escalates, or offers when the player is passive or stalls.
- For `openingScene` warnings, rewrite welcome before render review. Add
  location/time or sensory context, a concrete role beat, pressure, and player
  implication before choices or setup fields.
- For `playerAgency` warnings, remove any rule that decides the player's actions,
  feelings, consent, or commitments. Replace generic openings with a concrete
  scene and specific reply path.
- For `languageStyle` warnings, patch profile, detail, welcome, and examples
  together. Preserve character names, tone, and XMLV3 tags while converting card
  prose to Traditional Chinese.
- For `archetype` warnings, repair the chosen card type directly: companion needs
  relationship pressure and emotional boundaries; story needs setting stakes and
  likely branches; game/RPG/system cards need rules, resources, failure pressure,
  and opening setup/state/choices.
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

## Tool call discipline

- Generate a unique `idempotencyKey` per mutating action and reuse it for retries.
- Never directly edit a public role. Create or use an owned private role.
- If a tool returns `nextRecommendedTools`, treat it as the next normal step unless
  the author's latest instruction conflicts.
- When `validate_role` returns patch tools, patch and validate again before render
  or simulation unless the author explicitly accepts the remaining tradeoff.
- If validation returns blockers, patch the card before publishing.

## Final response shape

Report:

- `roleId`
- what changed
- validation status
- render review status
- simulation status or why it was skipped
- recommended next action
