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
render issues affect playability, token cost, or first-scene clarity.

## Workflow

1. Call `validate_role` unless a fresh validation report is already available.
2. Fix blockers before relying on visual review.
3. Call `render_preview` with `mode: "full-card"` by default.
4. If a specific issue is being debugged, use `mode: "xmlv3"` or `mode: "html"`.
5. If the AI client can open a browser or inspect images, open `previewUrl` and
   visually inspect desktop and mobile.
6. If the client cannot see the page, use `structuredReport`, DOM summary,
   console errors, blocked requests, overflow, contrast, and XML tag lists.
7. Patch the role or theme, then re-run validation and preview.

## What to check

- Text does not overflow, clip, or overlap.
- Contrast is readable against the active theme/background.
- Mobile and desktop maintain the intended hierarchy.
- HTML has no scripts, inline event handlers, external URLs, or unsupported assets.
- XMLV3 parses cleanly and does not fall back into unstructured raw text.
- The role's visual style supports the premise without hiding story content.
- The preview makes the next user action obvious; a beautiful but inert first
  screen is a card quality problem, not only a visual problem.

## Reporting

Return a compact review:

- render mode and preview status
- visible issues
- validation blockers or warnings
- patch recommendations
- whether another render pass is needed
