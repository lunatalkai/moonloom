---
name: lunatalk-presentation-director
description: Use when LunaTalk role-card work needs pre-authoring or pre-render decisions about XMLV3, Theme V3, HTML, visible state, hidden state, first-screen hierarchy, visual affordances, or theme-vs-welcome structure before card authoring, render review, simulation, or publishing.
---

# LunaTalk Presentation Director

Use this skill when the card's promise, opening, or engine is mostly known but
the presentation layer is unresolved. The output is a presentation packet, not a
real card patch and not a render report.

## Required references

Read `../../references/presentation-design.md` first. Read
`../../references/theme-v3-rendering.md` for XMLV3, Theme V3, and HTML syntax
boundaries. Read `../../references/card-authoring-templates.md` when a
presentation packet must be preserved into field assembly. Read
`../../references/state-economy-design.md` when visible status, hidden JSON, or
status panels require unsettled state-field decisions. Use
`lunatalk-state-economist` first when state economy is unresolved. Read
`../../references/opening-design.md` when first-screen beats or second-turn
change are incomplete. Read `../../references/token-economy.md` when visual
structure may become welcome bloat. Read `../../references/agency-design.md`
when choices, forms, panels, or route labels may be decorative or funnel the
player.

## Boundary

Do not call MCP tools from this skill. Do not call `validate_role`,
`render_preview`, `conversation_send_message`, `conversation_inspect`, or
mutating card tools. Do not patch real role fields.

Use `lunatalk-render-review` instead when a preview URL, screenshot, validation
report, DOM summary, contrast report, overflow report, blocked request list, or
console error list already exists.

Use `lunatalk-token-architect` instead when the primary evidence is a concrete
tokenBudget, `welcomeToDetailRatio`, overlong welcome, field allocation drift, or
validated HTML/XMLV3 bloat.

Use `lunatalk-opening-director` first when the first screen lacks place/time,
role action, pressure, player implication, reply paths, or second-turn change.
Use `lunatalk-agency-designer` first when visual choices decide the player's
feelings/actions or funnel every route.
Use `lunatalk-state-economist` first when the task has not decided which state
fields exist, how they update, which are visible vs hidden vs detail-only, or
which meters are decorative and should be omitted.

## Workflow

1. Classify the stage: pre-authoring plan, field assembly handoff, or pre-render
   repair plan.
2. Check prerequisites. If opening beats, agency, or token evidence are the real
   blocker, route to the narrower skill before presentation polish.
   If state fields, update rules, or visible/hidden classification are unresolved,
   route to `lunatalk-state-economist` before designing the presentation layer.
3. Choose welcome mode: plain, XMLV3, or HTML. Prefer XMLV3 plus Theme V3 for new
   structured welcomes. Treat platform XMLV3 syntax as server-provided; do not
   paste the generic XMLV3 manual into `roleDetailDesc`.
   `roleDetailDesc` stores the role-specific format contract, not the platform
   XMLV3 server guide.
4. Separate visible content, hidden JSON state, Theme V3 responsibilities, and
   `roleDetailDesc` responsibilities.
   Hidden `<state>` must be preview-compatible: use top-level `scene`, `status`,
   and `relationships`. Flat JSON state can render as `state:none` in MCP preview
   evidence even when it is syntactically valid.
5. Before choosing HTML, check whether core XMLV3 plus an extension pack can
   express the need. Use pack tags such as `collapse`, `bar`, `tag`,
   `result-card`, or `share-text` only when the presentation packet explains the
   play value and the MCP handoff includes `extension_enable`.
   When the missing capability is HTML div-like structure or per-section color,
   prefer the `layout` extension pack: `panel`, `stack`, `row`, `grid`,
   `choices`, and `divider` create container, section block, and action-button
   hierarchy, while Theme V3 owns theme-bound tone, palette, and panel color. Do
   not place raw style/class or arbitrary CSS in XML. If this pack is used, the
   MCP handoff must include `extension_enable` for `layout` plus a readable
   XMLV3 fallback stance.
   When a screen has 2-4 short action buttons, prefer
   `<choices cols="2" align="stretch" gap="sm">` over several naked `<choice>`
   tags so the preview does not collapse into an uneven left-aligned stack.
6. Keep XMLV3 evolution on the compatible XMLV3 extension target. Do not propose
   XMLV4/XMLV5 for backward-compatible additions; use optional tags,
   attributes, packs, and fallback behavior.
7. Apply the visual affordance test: every visible element must prove action,
   state, mood, route, risk, clue, resource, boundary, or relationship pressure.
8. Define first-screen hierarchy and mobile/readability risks.
9. State the token stance without inventing tokenBudget numbers.
10. Provide a compact XMLV3 scaffold only when it clarifies structure.
    If the scaffold changes the XMLV3 welcome structure, include
    `npm run validate:xmlv3-presentation` in the handoff before field
    finalization or render review.
11. Hand off to `lunatalk-card-author`, `lunatalk-opening-director`,
   `lunatalk-token-architect`, or `lunatalk-render-review` as the next step.

## Output format

Return:

```text
Presentation packet:
- current request:
- presentation promise:
- prerequisite packets:
- welcome mode: plain | xmlv3 | html
- mode decision:
- XMLV3 semantic plan:
- XMLV3 capability / pack plan:
- visible content map:
- hidden state JSON plan:
- Theme V3 responsibilities:
- roleDetailDesc responsibilities:
- HTML decision:
- visual affordance table:
  - element:
  - purpose:
  - proves action / state / mood / route / risk / clue / resource / boundary:
  - keep | move | cut:
- first-screen hierarchy:
- mobile / readability risks:
- token stance:
- render review plan:
- handoff:

Optional XMLV3 scaffold:
...

Self-review:
- content is playable, not poster-only:
- hidden state uses preview-compatible scene/status/relationships JSON:
- Theme V3 carries style, not story logic:
- HTML is justified or rejected:
- player's next action is visible:
- next skill:
```

## Quality rules

- Do not design visual blocks that only decorate. Move style to Theme V3 or cut
  it.
- Do not hide durable role rules, relationship gates, or scenario logic in Theme
  V3.
- Do not write prose or flat key/value dumps inside `<state>`. Keep hidden state
  compact, use `scene` / `status` / `relationships`, and put visible status text
  in visible tags.
- Do not choose HTML just because the card should look good. Use HTML only for a
  layout need XMLV3 and Theme V3 cannot express.
- Do not use arbitrary XML `style`/`class` as a shortcut for HTML div styling.
  Use layout pack `panel`, `stack`, `row`, `grid`, `choices`, and `divider`
  plus Theme V3 tone/variant tokens, then check fallback readability.
- Do not leave several short action buttons as a left-heavy vertical pile. Use
  `<choices>` for button-grid intent, with semantic `tone` hooks on each child
  `<choice>` when the theme needs visual distinction.
- Do not mark XMLV3 scaffold structure ready until the handoff names
  `validate:xmlv3-presentation` for grouped choices, preview-compatible state,
  scene/control separation, and no raw style/class hooks.
- Do not duplicate the platform XMLV3 server guide inside role detail. Detail
  gets the role-specific format contract: state update rules, choice rules,
  visible status meaning, pack usage, and player-agency boundaries.
- Do not invent XMLV4/XMLV5. Compatible XMLV3 extension work uses optional tags,
  attributes, extension packs, and readable fallback behavior.
- Do not overrule a weak opening with visual polish. If the next player action is
  unclear, repair the opening first.
- Keep output original and public-safe.
