---
name: lunatalk-render-review
description: Review LunaTalk card rendering through validate_role and render_preview. Use this skill whenever the user asks whether a LunaTalk role card, HTML welcome, XMLV3 welcome, Theme V3 style, preview URL, screenshot, or render report looks correct or needs visual fixes.
---

# LunaTalk Render Review

Use this skill to close the visual feedback loop for LunaTalk role cards.

## Required references

Read `../../references/card-writer-mcp.md` for `validate_role` and
`render_preview` details. Read `../../references/theme-v3-rendering.md` for XMLV3,
HTML, and Theme V3 decisions. Read `../../references/quality-rubric.md` for the
visual quality rubric. Read `../../references/role-card-writing-framework.md` when
render issues affect playability, token cost, or first-scene clarity. Read
`../../references/token-economy.md` when visual panels, repeated lore, HTML/XMLV3
bulk, or welcome-first layout creates token allocation risk. Read
`../../references/opening-design.md` when visual warnings affect first action
visibility, opening clarity, or second-turn setup.

## Workflow

1. Call `validate_role` unless a fresh validation report is already available.
2. Fix blockers before relying on visual review.
3. Call `render_preview` with `mode: "full-card"` by default.
4. If a specific issue is being debugged, use `mode: "xmlv3"` or `mode: "html"`.
5. If the AI client can open a browser or inspect images, open `previewUrl` and
   visually inspect desktop and mobile.
6. Use `evaluation` first, then `structuredReport`, DOM summary, console errors,
   blocked requests, overflow, contrast, and XML tag lists.
7. Patch the role or theme, then re-run validation and preview.

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
