---
name: lunatalk-instruction-guardrail
description: Use when LunaTalk role work involves instruction-layer repairs, system behavior, jailbreak text, role_patch_jailbreak readiness, out-of-character assistant framing, repeated format drift, schema drift, state protocol drift, or transcript-backed behavior constraints after normal card fields are coherent.
---

# LunaTalk Instruction Guardrail

Use this skill when a card needs a narrow instruction-layer repair. The output is
an instruction guardrail packet, not a broad rewrite and not a quality gate.

## Required references

Read `../../references/instruction-guardrails.md` first. Read
`../../references/card-writer-mcp.md` when `role_patch_jailbreak` may be used.
Read `../../references/card-authoring-templates.md` when the packet must be
preserved into field assembly. Read `../../references/playtest-loop.md` when the
need comes from simulation evidence. Read `../../references/safety-and-cost.md`
when the instruction touches boundaries, refusal, mature content, simulation, or
publishing.

Load the narrow writing skill first when the real problem is character core,
voice, opening, longplay, agency, boundary, generator output, or token
allocation. Do not use this skill as a shortcut around missing card design.

## Boundary

Do not call MCP tools from this skill. Do not patch a real role unless the author
continues through `lunatalk-card-author`.

Do not use jailbreak to fix boring, generic, passive, weak, or trope-only cards.
Do not use it for safety bypasses, policy bypasses, moderation bypasses, or
player-agency takeover. Those are not instruction-layer repairs.

## Workflow

1. Gather evidence: author request, fields, existing packets, validation status,
   render findings, simulation summary, and exact behavior that failed.
2. Confirm prerequisite packets are coherent: engine, opening, voice, agency,
   boundary, longplay, generator/play protocol, and token allocation as relevant.
3. If a normal field can fix the issue, route to that field's Moonloom skill
   instead of writing a guardrail.
4. Define the instruction-layer need: stable role stance, output schema, state
   protocol, refusal style, or recovery from meta-assistant drift.
5. Draft only compact allowed and forbidden constraints. Keep story logic in
   `roleDetailDesc`, visible action in `roleWelcome`, and examples in
   `talkExample`.
6. Decide `jailbreak stance`: omit, draft-only, or patch after confirmation.
7. Hand off to `lunatalk-card-author` for any real `role_patch_jailbreak` call,
   then validate and simulate only when cost is accepted.

## Output format

Return:

```text
Instruction guardrail packet:
- current request:
- evidence:
- prerequisite packets checked:
- instruction-layer need:
- not fixed by:
- allowed constraints:
- forbidden constraints:
- field patch target:
- jailbreak stance: omit | draft-only | patch after confirmation
- role_patch_jailbreak readiness:
- validation / simulation plan:
- handoff:

Self-review:
- evidence-backed:
- not a writing-quality gate:
- not a safety bypass:
- normal fields remain primary:
- player agency preserved:
- next skill:
```

## Quality rules

- Prefer field repair over instruction repair whenever a normal card field can
  carry the behavior.
- Keep guardrails short, behavioral, and testable.
- Do not duplicate role lore, biography, world rules, or full voice cards.
- Preserve player agency and boundary posture.
- Treat `role_patch_jailbreak` as an optional MCP surface, not a required stage
  for every card.
- If simulation shows several failures, use `lunatalk-card-doctor` before
  choosing a guardrail.
