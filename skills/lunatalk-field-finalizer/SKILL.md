---
name: lunatalk-field-finalizer
description: Use when LunaTalk role-card work has field-ready drafts, prepared packet stacks, MCP-ready final handoffs, last-mile field QA, placeholder cleanup, hard-cap checks, compact fallback, XMLV3/JSON/Markdown formatting, or patch mapping before Card Writer MCP calls.
---

# LunaTalk Field Finalizer

Use this skill to turn a mostly complete role-card draft into an MCP-ready field
handoff. This is a last-mile quality pass: preserve the creative packets, verify
the fields can be patched safely, and stop if a narrow repair is still needed.

## Required references

Read `../../references/field-finalization.md` first. Read
`../../references/card-authoring-templates.md` when the draft needs the final
role-field authoring packet. Read `../../references/token-economy.md` when field
lengths, `tokenBudget`, or welcome/detail allocation are uncertain. Read
`../../references/theme-v3-rendering.md` when the final welcome uses XMLV3, HTML,
Theme V3, hidden state JSON, or visible state.

## Workflow

1. Confirm the mode: draft-only finalization, MCP-ready creation, MCP-ready patch,
   or blocked.
2. Preserve existing Moonloom packets. Do not brainstorm a new premise, rewrite
   the engine, or reopen broad alternatives unless the supplied packets
   contradict each other or leave a required field undecidable.
3. Inspect final fields for missing content, placeholders, TODOs, bracketed
   instructions, unresolved alternatives, meta commentary, and author-facing
   notes that should not enter the card.
4. Check hard caps and density. Treat the 10,000-character `roleDetailDesc` hard
   cap as a ceiling, not a target. Add detail only when it changes future
   behavior, route, state, voice, boundary handling, or return-later play.
5. Produce a compact fallback for any field near a limit or any field whose
   purpose could survive in shorter form.
6. Check format stability for XMLV3, JSON, Markdown, YAML-style lists, and plain
   paragraphing. If XMLV3, hidden JSON, or HTML is not stable, hand off to
   `lunatalk-presentation-director` or `lunatalk-render-review` rather than
   patching.
7. Map fields to MCP tools: profile, assets, detail, welcome, optional
   instruction guardrail, theme binding, and extension enablement. XMLV3 real
   chat requires `theme_bind`; if the card expects conversation controls, do not
   mark the final packet ready while `roleWelcome` is XMLV3 and `theme_bind` is
   missing.
8. Return a Field finalization packet and final status:
   `ready | needs narrow repair | missing external asset | cost-gated`.

## Output format

Return this exact packet when finalizing fields:

```text
Field finalization packet:
- mode:
- source packets preserved:
- unresolved packets or conflicts:
- final field status:
  - roleName:
  - roleDesc:
  - roleDetailDesc:
  - roleWelcome:
  - talkExample:
  - tags:
  - avatar/background:
- hard-cap and density check:
  - roleDesc estimate:
  - roleDetailDesc estimate:
  - 10,000-character `roleDetailDesc` hard cap stance:
  - roleWelcome estimate:
  - talkExample estimate:
  - sections that earn tokens:
- compact fallback:
  - roleDesc:
  - roleDetailDesc:
  - roleWelcome:
  - talkExample:
- format checks:
  - XMLV3:
  - JSON:
  - Markdown:
  - YAML-style lists:
  - plain-text paragraphing:
- placeholder / meta check:
- MCP patch mapping:
  - role_patch_profile:
  - role_patch_assets:
  - role_patch_detail:
  - role_patch_welcome:
  - role_patch_jailbreak:
  - theme_bind / extension_enable:
- validation / render / simulation handoff:
  - validate_role focus:
  - render_preview focus:
  - conversation_send_message stance:
  - conversation_inspect focus:
- final status:
- next action:
```

## Routing rules

- If fields are not drafted yet, route to `lunatalk-card-author`.
- If the packet stack is missing a creative decision, route to the narrow missing
  skill before finalization.
- If the final draft contains overlong welcome, thin detail, high
  `welcomeToDetailRatio`, repeated lore, visual bloat, or hard-cap padding, use
  `lunatalk-token-architect` before patching.
- If the issue is XMLV3, hidden JSON, HTML, visible state, Theme V3, or
  first-screen hierarchy, use `lunatalk-presentation-director`.
- If the final fields are coherent but instruction-layer behavior still drifts in
  simulation, use `lunatalk-instruction-guardrail`; do not hide ordinary writing
  weaknesses inside jailbreak text.

## Common mistakes

- Do not use this skill to make the card bigger just because a field has room.
- Do not call MCP tools when placeholder text or unresolved alternatives remain.
- Do not let validation, render review, or simulation discover obvious format
  mistakes that a field pass could catch.
- Do not turn subjective writing quality into MCP/server gates. Route writing
  failures to Moonloom skills.
- Do not claim MCP-ready status when avatar/background URLs are missing; mark
  `missing external asset` and hand off to visual identity or asset patching.
