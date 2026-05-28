---
name: lunatalk-render-review
description: Use when a LunaTalk role has validate_role/render_preview output, preview URL, screenshot, render report, HTML/XMLV3/Theme V3 visual issue, readability warning, overflow, contrast, or first-action visibility problem.
---

# LunaTalk Render Review

Use this skill to close the visual feedback loop for LunaTalk role cards.

## Required references

Read `../../references/card-writer-mcp.md` for `validate_role` and
`render_preview` details. Read `../../references/theme-v3-rendering.md` for XMLV3,
HTML, and Theme V3 decisions. Read `../../references/presentation-design.md` when
the issue is a pre-render presentation plan rather than an actual preview or
render result. Read `../../references/quality-rubric.md` for the
visual quality rubric. Read `../../references/role-card-writing-framework.md` when
render issues affect playability, token cost, or first-scene clarity. Read
`../../references/card-diagnosis.md` when render looks readable but the existing
card also has author feedback, simulation symptoms, weak behavior, or several
writing risks and the repair order is unclear. Use `lunatalk-card-doctor` before
another render pass or visual-only patch in that case. Read
`../../references/token-economy.md` when visual panels, repeated lore, HTML/XMLV3
bulk, or welcome-first layout creates token allocation risk. Read
`../../references/opening-design.md` when visual warnings affect first action
visibility, opening clarity, or second-turn setup.

## Workflow

0. If no preview URL, screenshot, validation report, render report, DOM summary,
   contrast report, overflow report, blocked request list, or console error list
   exists and the author is only deciding XMLV3/Theme V3/HTML structure, visible
   state, hidden state, or visual hierarchy before authoring/rendering, route to
   `lunatalk-presentation-director` instead of render review.
1. Call `validate_role` unless a fresh validation report is already available.
2. Fix blockers before relying on visual review.
3. Call `render_preview` with `mode: "full-card"` by default.
4. If a specific issue is being debugged, use `mode: "xmlv3"` or `mode: "html"`.
5. If the AI client can open a browser or inspect images, open the clean
   `previewUrl` exactly as returned and visually inspect desktop and mobile. Do
   not add `debug=1` for normal UI review; debug chrome is for renderer
   diagnosis only and can pollute the screenshot with headers, IDs, and report
   panels.
6. Read the preview page `capturePlan` when available. If it is segmented,
   capture every vertical segment before judging. For desktop, resize to
   `requiredCaptureWidth` when requested; do not split screenshots horizontally.
7. Use `evaluation` first, then `structuredReport.surfaceDiagnostics`, DOM
   summary, console errors, blocked requests, overflow, contrast, and XML tag
   lists.
8. Produce a render repair packet before patching the role/theme or running
   another render pass.
9. Patch the role or theme, then re-run validation and preview.

## Render repair packet

When preview evidence shows a blocker, warning, or playability risk, return this
packet before another render pass or visual patch:

```text
Render repair packet:
- roleId:
- render mode:
- preview evidence:
- visual failures:
- playability failures:
- technical blockers:
- patch target:
- next Moonloom skill:
- fields to preserve:
- fields to patch:
- validation needed:
- rerender stance:
- handoff:
```

Use `lunatalk-card-doctor` when readable render combines with mixed behavior
symptoms. Use `lunatalk-token-architect` for welcome bloat or visual panels that
carry durable rules, `lunatalk-opening-director` for inert first screens, and
`lunatalk-presentation-director` for XMLV3/Theme V3 structure changes.

## What to check

- Text does not overflow, clip, or overlap.
- Contrast is readable against the active theme/background.
- Mobile and desktop maintain the intended hierarchy.
- HTML has no scripts, inline event handlers, external URLs, or unsupported assets.
- XMLV3 parses cleanly and does not fall back into unstructured raw text.
- XMLV3 visible text uses registered tags. Hidden data tags such as `<state>` do
  not substitute for on-screen status copy.
- For conversation preview, use the clean chat preview as the AI output surface:
  judge the assistant message bubble, ignore avatar, byline, sidebar, composer,
  and other normal chat page chrome, and verify XMLV3 state outside the bubble
  as a status surface when state exists.
- For long card output or long AI replies, use the preview `capturePlan`. Review
  all listed vertical `segments`; desktop screenshots must remain full-width and
  must not be split into left/right halves. A partial top-only screenshot is
  incomplete evidence, not a reason to shorten content.
- Read `structuredReport.surfaceDiagnostics` and, when available, the browser
  preview `report.surfaceDiagnostics`: check `sectionBlocks`, `panelBlocks`,
  `actionCount`, `groupedActionCount`, `fallbackActionGroupCount`,
  `actionLayoutMaxColumns`, `choiceSpans` / `choiceSpanCount`,
  `formControlCount`, `stateSurface`, `toneCount`, `localStyleHookCount`,
  `themeStyleHookCount`, `presentationAttrCount`, `customToneCount`,
  `unresolvedToneCount`, and `nestedControlCount`.
  Treat `stateSurface: expected` as a prompt to verify the browser preview shows
  the external state/status surface as `visible`.
- For intake-first system cards, target `formControlCount >= 6`; treat
  `formControlCount < 6` as a likely rich HTML parity gap unless the card
  intentionally has a tiny setup surface.
- Treat `presentationAttrCount > 0` as evidence that XMLV3 is using the safe
  local presentation-attribute path for panel or choice contrast. It is not the
  same as raw `style`/`class`. Review the screenshot for contrast, spacing, and
  hierarchy; only patch it if the attributes create a noisy or unreadable
  surface.
- Treat `xmlv3_actions_render_single_column` as an action-layout blocker when
  there are three or more choices: use `<choices cols="2" align="stretch">` or a
  comparable layout pack structure before tuning prose.
- Treat missing `choiceSpans` as a hierarchy gap when the screenshot needs a
  primary action or HTML-style action weighting. Patch to
  `<choices cols="4">` with `span="full"` / `span="2"` / `span="3"` / `span="4"`
  for 2:1:1, 3:1, or full-width weighting, then verify mobile collapses to a
  vertical or near-single-column readable path. Omit `span` for normal
  one-column actions so fallback stays readable.
- Treat `fallbackActionGroupCount > 0` as a repair signal even when
  `actionLayoutMaxColumns >= 2`: the renderer may have recovered naked
  consecutive `<choice>` tags into a usable 2-column fallback, but high-quality
  cards should still patch short action sets into explicit `<choices>` so tone,
  density, and author intent are durable.
- Treat `xmlv3_custom_tones_without_theme_hooks` as a Theme V3 blocker: either
  bind Theme CSS that targets the custom `tone` values, or replace the custom
  tones with supported baseline tones. Do this before changing writing logic.
- Treat `xmlv3_controls_nested_inside_scene` as a structural blocker for rich
  XMLV3: close `<scene>` after the prose beat, then render `choices`, `form`,
  `bar`, `collapse`, `panel`, `grid`, and similar controls as sibling blocks so
  the preview does not collapse everything into one scene card.
- The role's visual style supports the premise without hiding story content.
- The preview makes the next user action obvious; a beautiful but inert first
  screen is a card quality problem, not only a visual problem.
- If the first screen is visually valid but inert, patch the opening packet or
  welcome scene before tuning only CSS or Theme V3.
- If the preview is readable but the existing card also has mixed symptoms such
  as boring behavior, simulation failures, route funneling, generic voice, vague
  premise, or unclear repair order, create or preserve a `lunatalk-card-doctor`
  diagnosis packet before choosing token, opening, or visual patches.
- If the first screen is visually elaborate because durable rules, repeated lore,
  duplicated monologues, or large visual panels live in `roleWelcome`, use
  `lunatalk-token-architect` before more visual polish.
- When reviewing an XMLV3 card that is meant to replace rich HTML presentation,
  check parity of sectioning, local color/tone, action density, state surface,
  form controls, and desktop/mobile density. If the XMLV3 preview cannot carry
  the same play value, patch XMLV3 structure or Theme V3 before changing the
  role's writing logic.
- When a screenshot tool only returns the current viewport, do not infer that the
  lower content is missing. Use the preview `capturePlan` and apply each listed
  vertical segment; horizontal splitting is not part of the review model.
- Treat `evaluation.qualityDimensions` as the structured review map:
  `captureReadiness`, `semanticStructure`, `readability`, and
  `actionVisibility`.
- `evaluation` does not replace screenshot review. If the client has browser or
  multimodal access, still inspect the rendered preview.

## Reporting

Return a compact review:

- render mode and preview status
- visible issues
- render evaluation warnings
- validation blockers or warnings
- patch recommendations
- whether another render pass is needed
