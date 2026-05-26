---
name: lunatalk-render-review
description: Review LunaTalk card rendering through validate_role and render_preview. Use this skill whenever the user asks whether a LunaTalk role card, HTML welcome, XMLV3 welcome, Theme V3 style, preview URL, screenshot, or render report looks correct or needs visual fixes.
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
5. If the AI client can open a browser or inspect images, open `previewUrl` and
   visually inspect desktop and mobile.
6. Use `evaluation` first, then `structuredReport`, DOM summary, console errors,
   blocked requests, overflow, contrast, and XML tag lists.
7. Produce a render repair packet before patching the role/theme or running
   another render pass.
8. Patch the role or theme, then re-run validation and preview.

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
