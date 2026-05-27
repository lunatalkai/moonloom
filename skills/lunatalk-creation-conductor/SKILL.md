---
name: lunatalk-creation-conductor
description: Use when a LunaTalk/Moonloom task needs end-to-end role-card workflow orchestration from vague idea, packet stack, local material, or existing private role through skill selection, MCP readiness, private creation/patching, avatar/background assets, validation, render review, simulation, iteration, or publish-readiness decisions.
---

# LunaTalk Creation Conductor

Use this skill when the author wants the whole card-making journey coordinated,
not just one narrow craft repair. The output is a creation runway packet and a
sequenced handoff plan. Do not replace narrow Moonloom skills; choose when to
call them and what packet they should return.

## Required references

Read `../../references/creation-workflow.md` first. Read
`../../references/mcp-client-workflow.md` before real MCP actions,
`../../references/card-writer-mcp.md` before Card Writer tool calls, and
`../../references/safety-and-cost.md` when simulation, publishing, rating, or
credential handling appears. Load narrow craft references only after the first
bottleneck is chosen.

## Boundary

Do not write final card fields, create a private role, render, simulate, or
publish from this skill alone unless the needed narrow packet and MCP readiness
already exist. This skill decides the route and stop gates.

Do not call paid or public-action tools automatically. `simulate_private_chat`
requires author acceptance of normal cost. `publish_submit` requires explicit
author confirmation in the agent conversation.

## Workflow

1. Identify the output mode: brainstorm, draft-only, MCP-backed private card,
   patch existing role, closed-loop iteration, or publish readiness.
2. Build a Creation runway packet before narrower work when the request is broad,
   ambiguous, or asks for "from idea to card".
3. Choose the first bottleneck, not every possible skill:
   - vague mood/trope: `lunatalk-premise-workshop`
   - mixed card type: `lunatalk-archetype-director`
   - source files/world bible: `lunatalk-material-distiller`
   - recognizable inspiration/copy risk: `lunatalk-originality-adapter`
   - sensitive premise: `lunatalk-boundary-designer`
   - weak engine: character, relationship, world, daily-life, scenario, play,
     generator, or ensemble skill
   - weak interaction: `lunatalk-tension-weaver`, `lunatalk-agency-designer`,
     `lunatalk-opening-director`, or `lunatalk-longplay-architect`
   - weak voice/examples/language: `lunatalk-voice-director`,
     `lunatalk-talk-example-curator`, or `lunatalk-language-stylist`
   - state/token/presentation: `lunatalk-state-economist`,
     `lunatalk-token-architect`, or `lunatalk-presentation-director`
   - profile/visual assets: `lunatalk-profile-packager` or
     `lunatalk-visual-identity-director`
   - "is this good enough": `lunatalk-quality-auditor`
   - existing-card mixed symptoms: `lunatalk-card-doctor`
   - validation/render/simulation/author feedback evidence: `lunatalk-iteration-director`
4. For MCP-backed creation, require `lunatalk-mcp-operator` readiness before
   mutating tools and `lunatalk-card-author` for field assembly and patch order.
5. Require avatar/background readiness for a complete private-card handoff. If
   only prompts exist, route to visual asset production or author-provided URLs
   before final validation/render.
6. Run validation before render. Run render review before simulation unless the
   author explicitly only needs behavior after a known-good render.
7. Treat each evidence loop as one repair at a time. After validation, render,
   simulation, benchmark, or author feedback, route to `lunatalk-iteration-director`.
8. Stop at publish readiness until the author explicitly confirms submission.

## Output Format

Return:

```text
Route:
- entry skill:
- selected skill: lunatalk-creation-conductor
- mode:
- MCP calls now: yes | no
- next skill:

Creation runway packet:
- current request:
- output mode:
- author goal:
- language / locale:
- content rating intent:
- available inputs:
- known decisions:
  - premise:
  - player role:
  - card type:
  - first scene:
  - visual asset status:
- missing decisions:
- first bottleneck:
- skill queue:
  - now:
  - next:
  - later:
- MCP stance:
  - calls now:
  - required tools:
  - asset requirement:
  - validation/render/simulation stance:
- cost / public-action warnings:
- do not do yet:
- stop criteria:
- handoff:

Self-review:
- route starts at first bottleneck:
- no premature MCP mutation:
- avatar/background requirement handled:
- simulation cost handled:
- publish confirmation handled:
- next skill:
```

## Quality Rules

- A broad creation request should not jump straight to `role_create_private`.
- A vague prompt should produce direction choices before field drafting.
- A prepared packet stack should be preserved, not reopened from scratch.
- An existing private role should be patched narrowly; do not create a duplicate
  unless the author asks for a new variant.
- A complete MCP-backed private card must include role fields and real
  avatar/background URLs.
- `validate_role` is technical proof, not proof of card quality.
- Render and simulation evidence should feed the iteration loop, not a broad
  rewrite.
- Publish remains a separate explicit-confirmation step.
