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
`render_preview`, `simulate_private_chat`, or mutating card tools. Do not patch
real role fields.

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
   structured welcomes.
4. Separate visible content, hidden JSON state, Theme V3 responsibilities, and
   `roleDetailDesc` responsibilities.
5. Apply the visual affordance test: every visible element must prove action,
   state, mood, route, risk, clue, resource, boundary, or relationship pressure.
6. Define first-screen hierarchy and mobile/readability risks.
7. State the token stance without inventing tokenBudget numbers.
8. Provide a compact XMLV3 scaffold only when it clarifies structure.
9. Hand off to `lunatalk-card-author`, `lunatalk-opening-director`,
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
- hidden state is JSON, not prose:
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
- Do not write prose inside `<state>`. Keep hidden state compact JSON and put
  visible status text in visible tags.
- Do not choose HTML just because the card should look good. Use HTML only for a
  layout need XMLV3 and Theme V3 cannot express.
- Do not overrule a weak opening with visual polish. If the next player action is
  unclear, repair the opening first.
- Keep output original and public-safe.
