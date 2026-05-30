---
name: lunatalk-token-architect
description: Use when a LunaTalk role-card task involves tokenBudget, estimatedTokens, roleDescChars, roleDetailDescChars, roleWelcomeChars, welcomeToDetailRatio, overlong welcome, field allocation, keep/move/cut/rewrite plans, compression, duplicated lore, HTML/XMLV3 bloat, or preserving playability while reducing token cost.
---

# LunaTalk Token Architect

Use this skill when the weak layer is context allocation. The output is a token
architecture packet, not a full card and not a mutating MCP operation.

## Required References

Read `../../references/token-economy.md` first. Read
`../../references/prompt-attention-architecture.md` and
`../../references/one-shot-prompt-runtime.md` when the token problem is really
attention dilution, Tier 4 format stability, one-shot raw detail placement,
RoleDetail/RoleUserName positioning, or long prompt structure. Read
`../../references/card-writer-mcp.md` when interpreting `validate_role` and
`tokenBudget`. Read `../../references/role-card-writing-framework.md` for PACT,
archetype ranges, and token-efficient play loops. Read
`../../references/card-authoring-templates.md` when converting the packet into
field patches. Read `../../references/theme-v3-rendering.md` when HTML, XMLV3,
or Theme V3 causes welcome bloat. Read `../../references/presentation-design.md`
when visual hierarchy exists without concrete token evidence and should be
routed to presentation planning instead. Read `../../references/material-distillation.md`
when a source pack or world bible is the cause of bloat. Read the narrow Moonloom
skill for the weak layer before cutting it: character core, world engine, play
engine, generator, voice, agency, opening, longplay, or boundary.
Read `../../references/generator-design.md` when schema, examples, intake
controls, artifact memory, revision operations, or generator visual structure
are being compressed.

## Boundary

Do not call MCP tools from this skill. Do not treat high token count as a server
gate. Token architecture is Moonloom writing guidance: it should preserve
playability while moving, cutting, or compressing content.

If the author has no tokenBudget, field sizes, welcome ratio, or validated bloat
evidence and is only deciding what visual elements should appear before fields,
use `lunatalk-presentation-director` instead.

## Workflow

1. Identify the token failure: overlong `roleDesc`, thin `roleDetailDesc`, bloated
   `roleWelcome`, high `welcomeToDetailRatio`, repeated lore, duplicated
   monologue, visual bloat, misplaced durable rules, or excessive examples.
2. Classify archetype and state target field ranges.
3. Interpret token budget signals without treating `estimatedTokens` as billing.
4. Produce field triage for `roleDesc`, `roleDetailDesc`, `roleWelcome`,
   XMLV3/HTML/Theme V3, and `talkExample`.
5. Build a keep / move / cut / rewrite plan.
6. Apply the compression ladder: remove duplicates, move durable rules, convert
   lore to play functions, rebuild welcome, then preserve style only where it
   improves play.
7. Preserve or request the relevant narrow packet before cutting a weak layer.
   For generator/helper cards, preserve the artifact contract, default-start
   path, output schema, named revision operations, quality rubric, and artifact
   memory before moving or cutting schema/examples.
8. If XMLV3, choices, panels, or hidden state are brittle, reserve a small
   structural budget for Minimum Viable Reply and Tier 4 format exemplar before
   cutting lower-priority lore or decoration.
9. Name rerun checks and handoff target.

## Output Format

Return:

```text
Token architecture packet:
- current failure:
- archetype:
- token budget signal:
- target allocation:
- field triage:
- keep / move / cut / rewrite:
- compression ladder:
- visual budget:
- state budget:
- example budget:
- generator packet preservation:
- patch order:
- rerun checks:
- handoff:

Self-review:
- promise remains scannable:
- durable engine moved to detail:
- welcome is a playable screen:
- visual structure earns tokens:
- compression preserved character core, agency, voice, route, and boundary:
- next skill:
```

## Quality Rules

- Do not solve bloat by deleting the engine. Preserve desire, contradiction,
  boundary, player leverage, voice, route costs, consequence, and refusal rules.
- Do not compress a bad welcome into a shorter bad welcome. Rebuild it from the
  five beats when the structure is wrong.
- Do not let XMLV3 or HTML become a poster. Visual content must reveal state,
  action, route, mood, or risk.
- Do not add examples unless they teach voice, output format, refusal handling,
  or pressure behavior more cheaply than rules.
- Do not delete the Tier 4 format exemplar or Minimum Viable Reply from a
  control-heavy card just to reduce character count; cut prose, repeated lore,
  or decorative XML first.
- Do not compress a generator/helper card by deleting the artifact schema,
  default-start path, revision operations, or artifact memory. Move or shorten
  them, but keep the loop executable.
- Do not use token count as proof of quality. A short generic card can still fail.
- Keep the output original and public-safe.

## Handoff

Hand the packet to:

- `lunatalk-character-core` when compression reveals a thin role engine.
- `lunatalk-world-engineer` when lore needs to become playable rules.
- `lunatalk-play-engineer` when stats, inventory, resources, quests, combat,
  turn protocol, or compact state need to become cheaper runnable rules before
  cutting.
- `lunatalk-generator-architect` when the artifact contract, output schema,
  revision operations, default-start path, or artifact memory is unclear before
  compression.
- `lunatalk-agency-designer` when choices or reply paths are decorative.
- `lunatalk-presentation-director` when the work is pre-field visual hierarchy,
  visible/hidden state, Theme V3 split, or XMLV3/HTML mode decision without
  concrete token evidence.
- `lunatalk-voice-director` when samples or voice rules need cheaper calibration.
- `lunatalk-opening-director` when the welcome needs to be rebuilt.
- `lunatalk-longplay-architect` when state, route, or memory needs compression.
- `lunatalk-card-author` when the author wants MCP-backed field patches.
