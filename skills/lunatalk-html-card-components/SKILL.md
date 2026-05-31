---
name: lunatalk-html-card-components
description: Use when authoring, reviewing, migrating, or debugging LunaTalk HTML mode cards that use hc-* HTML card components, component attributes, safe html-card.css classes, legacy Theme primitives, or cross-client support questions.
---

# LunaTalk HTML Card Components

Use this skill when a Moonloom task needs to choose, call, explain, review, or
repair LunaTalk `hc-*` HTML card components. This is a component-contract skill,
not a broad card-writing skill.

## Required reference

Read `../../references/html-card-components.md` before writing, patching, or
reviewing any `hc-*` component. If the task is still deciding whether HTML is
justified, route through `lunatalk-presentation-director` first.

## Boundary

Prefer XMLV3 plus Theme V3 for new visual welcomes. Use HTML only for explicit
HTML requests, legacy HTML migration, or a custom layout that XMLV3 layout packs
cannot express yet.

Renderer modes are mutually exclusive. This skill may return `hc-*` markup only
for `mode: "html"` / normal HTML cards. If the target is `mode: "xmlv3"`, do not
emit `hc-*`, `<div>`, `<section>`, or HTML classes; route to
`lunatalk-presentation-director` for an XMLV3 rewrite instead.

Do not call MCP tools from this skill. Do not create or patch a private card
here; hand the component plan to `lunatalk-card-author` after review.

## Workflow

1. Classify the support tier:
   - cross-client stable: `hc-btn`, `hc-bar`, `hc-stat`, `hc-tag`,
     `hc-collapse`, `hc-radio`, `hc-checkbox`, `hc-input`, `hc-form`
   - legacy Theme primitives: `hc-action`, `hc-display`, `hc-toggle`
   - limited or client-specific: `hc-meter`, `hc-tabs`, `hc-tab`, `hc-list`,
     `hc-item`, `hc-alert`
2. Map the card need to a stable component:
   - player actions: `hc-btn` with `send` or `copy`
   - continuous numeric values: `hc-bar`
   - facts, state labels, route markers: `hc-stat` or `hc-tag`
   - optional detail: `hc-collapse`
   - setup or intake: `hc-form` with `hc-input`, `hc-radio`, and
     `hc-checkbox`
   - older Theme template output: preserve `hc-action`, `hc-display`, or
     `hc-toggle` unless rewriting into the stable catalog is requested
3. Explain each attribute used. The plan should name what the attribute does,
   not just list syntax.
4. Reject invented or unsupported components. If the author asks for limited
   components, either replace them with stable equivalents or require current
   desktop/mobile renderer validation before approval.
5. Reject mixed-renderer output. `hc-*` is not a fallback inside XMLV3; it is an
   HTML-mode component family.
6. Apply HTML safety rules: no scripts, inline event handlers, external URLs,
   iframes, object embeds, arbitrary JavaScript, or hidden critical state in
   labels.
7. Hand off with a preview plan. HTML output needs validation plus desktop and
   mobile render inspection.

## Component Plan Packet

```text
HTML component packet:
- HTML necessity:
- support tier:
- components:
- attributes and meanings:
- rejected components:
- non-mixed XMLV3 rewrite option:
- safety checks:
- preview / validation plan:
- handoff:
```

Use the packet when the caller needs a decision before writing the final
`roleWelcome`.
