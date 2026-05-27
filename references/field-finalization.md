# Moonloom Field Finalization

Use this reference after the card engine, packet stack, profile, presentation,
token plan, and draft fields mostly exist. Field finalization is the last-mile
pass that decides whether the fields are ready to hand to Card Writer MCP or
whether a narrow Moonloom repair is still needed.

Do not brainstorm new premises here. Do not expand the card because a field has
unused room. Finalization protects craft decisions from being lost during MCP
patching.

## Finalization Gates

Check these gates in order:

1. Packet preservation: every supplied packet is either preserved, deliberately
   resolved, or sent back to the right narrow skill.
2. Field completeness: `roleName`, `roleDesc`, `roleDetailDesc`, `roleWelcome`,
   tags, talkExample decision, language, rating posture, and visual asset status
   are explicit.
3. No placeholders: remove bracket labels, TODO text, "fill later" notes,
   unresolved choices, meta commentary, and author-facing instructions from
   final role fields.
4. Hard caps: a 10,000-character `roleDetailDesc` hard cap is a ceiling, not a
   quality target. Record the intended range, current estimate, and why each long
   section changes behavior, route, state, voice, boundary, or return-later play.
5. Compact fallback: when any field is near a client limit, provide a shorter
   fallback that preserves the role engine before calling MCP tools.
6. Format sanity: validate XMLV3 tags, JSON blocks, Markdown spacing, YAML-style
   lists, line breaks, and indentation before render review.
7. MCP patch mapping: map each final field to the intended tool:
   `role_patch_profile`, `role_patch_assets`, `role_patch_detail`,
   `role_patch_welcome`, optional `role_patch_jailbreak`, `theme_bind`, and
   `extension_enable`.
8. Handoff: state whether the packet is `ready | needs narrow repair | missing external asset | cost-gated`.

## Format Checks

- XMLV3: use registered tags only. Use `<n>` for narration/actions and `<d>` for
  dialogue. Treat `<state>` as hidden JSON; visible text belongs in `<n>`.
- JSON: every hidden state or setup object must be parseable and compact. Do not
  store player feelings, consent, loyalty, irreversible actions, or chosen route
  as facts.
- Markdown: keep headings and lists readable without over-nesting. Do not place
  long setup manuals inside `roleWelcome`.
- YAML-style lists: keep indentation consistent and avoid pseudo-YAML that mixes
  free prose, broken colons, and unclosed quotes.
- Plain text: preserve paragraph breaks for action, dialogue, rules, and examples.

## Field Finalization Packet

Return this packet before MCP-backed creation/patching or when handing off an
incomplete final draft:

```text
Field finalization packet:
- mode: draft-only | MCP-ready creation | MCP-ready patch | blocked
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
- final status: ready | needs narrow repair | missing external asset | cost-gated
- next action:
```

## Repair Routing

- Missing premise, player role, or card contract: route to premise, archetype, or
  blueprint work before finalizing.
- Generic persona, weak desire, or trope-only role: route to character core.
- Weak relationship or daily-life loop: route to relationship or daily-life.
- Lore dump or inactive setting: route to world engine or material distillation.
- Broken RPG/system/generator behavior: route to play engine or generator.
- Passive player, decorative choices, or agency takeover: route to agency.
- Generic dialogue or blurred speakers: route to voice or talkExample.
- Mixed language or translated-sounding prose: route to language stylist.
- Overlong welcome, thin detail, or misplaced durable rules: route to token
  architect.
- XMLV3/Theme V3/HTML structure is unresolved: route to presentation.
- Fields are coherent but instruction-layer behavior still drifts: route to
  instruction guardrail.

## Ready Standard

The packet is MCP-ready only when the final fields can be patched without
inventing missing creative decisions, exceeding hard caps, losing packet
constraints, or relying on validation/render/simulation to discover obvious
format defects.
