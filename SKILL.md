---
name: moonloom
description: LunaTalk role-card creation bundle for AI clients. Use when the user wants to create, improve, diagnose, theme, test, or publish a LunaTalk role card, MOD, worldbook, Theme V3 skin, or preview page, wants to set up or use the LunaTalk Card Writer MCP, or is unsure which Moonloom workflow applies. This file is the router; the specialized skills live under skills/ and their shared reference docs under references/ and examples/.
repository: https://github.com/lunatalkai/moonloom
license: MIT
---

# Moonloom

Moonloom is the skill framework for LunaTalk creation work: ideation, field
writing, diagnosis, presentation (XMLV3 / Theme V3 / HTML), render review, chat
simulation, closed-loop iteration, and publish readiness, backed by the LunaTalk
Card Writer MCP tools.

This bundle is the whole Moonloom repository packaged as one skill. This file is
the entry router. It tells you which specialized skill to load and how to find
the shared documents that skill needs.

## Bundle layout

- `skills/<skill-name>/SKILL.md` — one specialized skill per directory (listed below).
- `references/<file>.md` — shared design and MCP contract documents.
- `examples/<file>` — synthetic sample packets and fixtures. Structure only; never copy their text, names, tags, or scenes into a real card.
- `skills/using-moonloom/SKILL.md` — the full routing rulebook. Read it whenever the compact table below is not decisive.

## How to use a specialized skill from this bundle

1. Pick the narrowest matching skill from the table below.
2. Read `skills/<skill-name>/SKILL.md` before doing that skill's work. Follow it as if it were the active skill.
3. When that file says to read `../../references/<file>.md`, read `references/<file>.md` from this bundle. When it says `../../examples/<file>`, read `examples/<file>`. Those relative links are written from the skill's own directory; this bundle's root is two levels up.
4. Load only the references the chosen skill asks for. Do not read all of them.
5. Keep all role edits on private cards unless the author explicitly asks to submit a private card for public review.

If the task might be Moonloom work but the route is unclear, classify the intent
first and state the route before rewriting fields or calling any MCP tool. If no
Moonloom skill fits, say so and continue with a general workflow.

## Card Writer MCP

Role, worldbook, MOD, theme, render, simulation, and publish operations are MCP
tools provided by the LunaTalk Card Writer connector, not by this bundle. If
those tools are not available in the conversation, tell the user to connect the
LunaTalk Card Writer integration (OAuth login with their LunaTalk account) and
continue with draft-only work in the meantime. Tool names, arguments, and
response contracts are in `references/card-writer-mcp.md`; client setup, auth
posture, and stage gates are in `references/mcp-client-workflow.md`.

## Skill routing

Start with the task's current bottleneck. Earlier rows are upstream of later
rows: if an upstream layer is unresolved, route there first.

### Orchestration and setup

| Skill | Use when |
| --- | --- |
| `skills/using-moonloom/SKILL.md` | Unsure which skill applies; need the full router packet and every routing rule. |
| `skills/lunatalk-creation-conductor/SKILL.md` | End-to-end "idea to private card", full workflow, deciding the skill queue. |
| `skills/lunatalk-mcp-operator/SKILL.md` | MCP readiness, tool availability, auth status, idempotency, stage gates before real mutations. |
| `skills/lunatalk-collaboration-director/SKILL.md` | Author feedback, co-review, taste calibration, "almost right but off", choosing between patch options. |
| `skills/lunatalk-iteration-director/SKILL.md` | Evidence already exists (validation, render, simulation, benchmark, feedback) and the next single repair must be chosen. |
| `skills/lunatalk-benchmark-runner/SKILL.md` | Regression checks, benchmark report packets, end-to-end acceptance of a trial card. |

### Direction and originality

| Skill | Use when |
| --- | --- |
| `skills/lunatalk-premise-workshop/SKILL.md` | No settled premise; only mood, trope, genre, or "make it popular". |
| `skills/lunatalk-originality-adapter/SKILL.md` | Canon, IP, fan premise, another card, or copied draft that must become original. |
| `skills/lunatalk-sample-calibrator/SKILL.md` | Golden samples, expected-output shapes, draft-to-sample comparison, copy-risk review. |
| `skills/lunatalk-material-distiller/SKILL.md` | Author-provided files, world bibles, pasted lore, or imports that must be compressed first. |
| `skills/lunatalk-archetype-director/SKILL.md` | Card-type uncertainty, mixed archetypes, choosing the primary playable contract. |
| `skills/lunatalk-series-architect/SKILL.md` | Card sets, series, spin-offs, seasonal or alternate variants. |
| `skills/lunatalk-card-blueprint/SKILL.md` | A direction exists and needs a card-ready blueprint. |

### Engine layers

| Skill | Use when |
| --- | --- |
| `skills/lunatalk-tension-weaver/SKILL.md` | Missing stakes, hook, why-now, player leverage; pretty-but-passive premise. |
| `skills/lunatalk-character-core/SKILL.md` | Thin or generic role, trope repair, desire/contradiction/boundary, mask/wound. |
| `skills/lunatalk-relationship-architect/SKILL.md` | Companion, romance, friendship, rivalry, slow-burn pacing, trust/friction state. |
| `skills/lunatalk-daily-life-architect/SKILL.md` | Slice-of-life, quiet companion, low-stakes cards that must stay consequential. |
| `skills/lunatalk-scenario-architect/SKILL.md` | Story, mystery, investigation, event, or plot-heavy cards: stakes, branches, clue pacing. |
| `skills/lunatalk-play-engineer/SKILL.md` | RPG, sandbox, survival, simulator: stats, resources, inventory, combat, turn protocol. |
| `skills/lunatalk-generator-architect/SKILL.md` | Generator, helper, or artifact-producing cards: intake, output schema, revision commands. |
| `skills/lunatalk-ensemble-director/SKILL.md` | Multi-character cards, cast size, speaker merge/cut, turn ownership. |
| `skills/lunatalk-world-engineer/SKILL.md` | Worldbuilding, factions, locations, lore compression, playable world rules. |
| `skills/lunatalk-longplay-architect/SKILL.md` | Long-term playability, route seeds, progression, dead third turns, repetitive loops. |
| `skills/lunatalk-state-economist/SKILL.md` | Which state fields exist, visible vs hidden vs detail-only, update rules, decorative meters. |
| `skills/lunatalk-agency-designer/SKILL.md` | Player agency, insertion space, decorative choices, spectator openings. |
| `skills/lunatalk-boundary-designer/SKILL.md` | Mature, NSFW, intense, power-imbalanced, or consent-sensitive content; rating and refusal posture. |

### Voice, opening, and fields

| Skill | Use when |
| --- | --- |
| `skills/lunatalk-voice-director/SKILL.md` | Speaking style, generic dialogue, catchphrases, emotional tells, refusal style, voice drift. |
| `skills/lunatalk-opening-director/SKILL.md` | `roleWelcome`, first screen, first user reply, second-turn move, hollow openings. |
| `skills/lunatalk-detail-engineer/SKILL.md` | `roleDetailDesc` is thin, biography-heavy, under budget, or lacks a durable engine. |
| `skills/lunatalk-token-architect/SKILL.md` | tokenBudget, estimatedTokens, welcome-to-detail ratio, compression, keep/move/cut/rewrite. |
| `skills/lunatalk-talk-example-curator/SKILL.md` | `talkExample` decisions, micro-samples, example turns, whether to omit examples. |
| `skills/lunatalk-language-stylist/SKILL.md` | zh-Hant cleanup, Simplified/Traditional mixing, translated-sounding prose, register and address terms. |
| `skills/lunatalk-profile-packager/SKILL.md` | `roleName`, `roleDesc`, tags, tagline, first impression, discovery surface. |
| `skills/lunatalk-visual-identity-director/SKILL.md` | Avatar, cover, key art, image prompts, missing `roleAvatar` / `roleBackground`. |
| `skills/lunatalk-instruction-guardrail/SKILL.md` | Instruction-layer repairs, jailbreak text, out-of-character framing, schema or state-protocol drift. |
| `skills/lunatalk-field-finalizer/SKILL.md` | Last-mile field QA, placeholder cleanup, hard caps, MCP-ready handoff. |
| `skills/lunatalk-card-author/SKILL.md` | Assemble final fields from packets, or create and patch a real private role through MCP. |

### Presentation and extensions

| Skill | Use when |
| --- | --- |
| `skills/lunatalk-presentation-director/SKILL.md` | XMLV3 vs plain vs HTML, Theme V3 design and custom components, visible-state placement, "make me a theme". |
| `skills/lunatalk-html-card-components/SKILL.md` | HTML mode and `hc-*` card components. |
| `skills/lunatalk-mod-author/SKILL.md` | MODs: per-turn rules and state cards (affection, stamina, quests, dice, inventory) attached to a role. |
| `skills/lunatalk-preview-page-designer/SKILL.md` | Decorating a role's preview page: document, images, moderation states. |

### Diagnosis, verification, and release

| Skill | Use when |
| --- | --- |
| `skills/lunatalk-card-doctor/SKILL.md` | Existing card with mixed symptoms; weakest-layer triage and repair order. |
| `skills/lunatalk-quality-auditor/SKILL.md` | Scorecard, craft rating, "is this good enough", first three repairs. |
| `skills/lunatalk-render-review/SKILL.md` | A preview, screenshot, render report, or validation report already exists. |
| `skills/lunatalk-chat-simulation/SKILL.md` | Testing role behavior in LunaTalk chat, probe design, transcript triage. |
| `skills/lunatalk-publish-readiness/SKILL.md` | Public submission readiness and publish blocker triage. |

## Shared references most skills ask for

- `references/card-writer-mcp.md` — MCP tool names, arguments, endpoint, auth.
- `references/mcp-client-workflow.md` — client setup, readiness, stage gates.
- `references/role-card-writing-framework.md` — the field model every writing skill builds on.
- `references/card-authoring-templates.md` — field templates used by `lunatalk-card-author`.
- `references/quality-rubric.md` and `references/quality-scorecard.md` — audit criteria.
- `references/theme-v3-rendering.md` — Theme V3 / XMLV3 rendering and theme quality.
- `references/iteration-loop.md` — stop/continue decisions after evidence exists.
- `references/safety-and-cost.md` — billed operations and safe defaults.

Other reference and example files are named inside the skill that needs them;
read them only on that skill's instruction.
