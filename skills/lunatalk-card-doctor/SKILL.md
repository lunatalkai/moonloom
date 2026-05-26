---
name: lunatalk-card-doctor
description: Use when an existing LunaTalk role card, draft, validation result, render report, simulation transcript, or author feedback has multiple symptoms and needs diagnosis, weakest-layer triage, repair order, field patch mapping, keep/move/cut/rewrite decisions, or a patch plan before rewriting, simulating, or publishing.
---

# LunaTalk Card Doctor

Use this skill when the author has an existing card or draft and the problem is
not a single obvious layer. The output is a diagnosis packet and patch plan, not
a full rewrite and not a mutating MCP operation.

This skill routes multi-symptom cards to the right narrow Moonloom skills before
field rewriting. It prevents agents from polishing prose, adding lore, or running
another paid simulation when the card first needs structural repair.

## Required references

Read `../../references/card-diagnosis.md` first. Read
`../../references/quality-rubric.md` for self-review dimensions. Read
`../../references/playtest-loop.md` when the evidence includes simulation
transcripts, behavior failure, or a probe plan. Read
`../../references/profile-packaging.md` when the symptoms involve generic
`roleName`, overlong or vague `roleDesc`, weak tags, title/tagline, first
impression, public profile, discovery surface, or reason-to-open failures. Read
`../../references/token-economy.md` when `tokenBudget`, overlong welcome, thin
detail, high `welcomeToDetailRatio`, repeated lore, or visual bloat appears.
Read `../../references/card-authoring-templates.md` when the diagnosis needs a
handoff-ready field patch packet.
Read `../../references/language-style.md` when symptoms involve zh-Hant / zh-TW
inconsistency, Simplified/Traditional mixing, translated-sounding prose,
pronoun/address drift, mixed-language tags, or field-to-field register mismatch.

Then load only the narrow reference for the diagnosed weak layer: archetype,
character core, relationship engine, daily-life engine, world engine, play
engine, ensemble structure, agency, opening, longplay, voice, boundary, render,
language style, or publish readiness.

## Boundary

Do not call MCP tools from this skill. Do not patch real role fields unless the
author explicitly continues through `lunatalk-card-author`.

Do not turn writing quality into MCP validation. Use MCP validation for technical
blockers; use Moonloom diagnosis for craft, playability, voice, agency, and token
architecture.

## Workflow

1. Gather available evidence: author complaint, field snippets, validation
   status, tokenBudget, render findings, simulation summary, language, card
   shape, and rating intent.
2. Separate technical blockers from writing failures. If blockers exist, name the
   mechanical fix path before craft work.
3. Identify the primary failure and 1-3 secondary failures. Prefer observable
   symptoms over taste labels.
4. Map each symptom to likely missing layer, source field, narrow Moonloom skill,
   and patch target.
5. Choose repair order. Use token architecture early when field allocation hides
   the durable engine; use boundary design early when risk or refusal is unclear.
6. Decide keep / move / cut / rewrite for `roleDesc`, `roleDetailDesc`,
   `roleWelcome`, `talkExample`, XMLV3, and Theme V3.
7. Name packets to preserve and packets to create next.
8. Produce an author-facing patch plan and verification plan.
9. Hand off to the narrow skill, `lunatalk-card-author`, render review, or chat
   simulation only after the diagnosis is coherent.

## Output format

Return:

```text
Card diagnosis packet:
- current request:
- available evidence:
- card shape:
- primary failure:
- secondary failures:
- do not rewrite yet because:
- repair order:
- symptom map:
  - symptom:
  - likely missing layer:
  - source field:
  - narrow Moonloom skill:
  - patch target:
- field triage:
  - roleDesc:
  - roleDetailDesc:
  - roleWelcome:
  - talkExample:
  - XMLV3 / Theme V3:
- keep / move / cut / rewrite:
- packets to preserve:
- packets to create next:
- author-facing patch plan:
- validation / render / simulation rerun plan:
- stop conditions:
- handoff:

Self-review:
- evidence-backed:
- weakest layer named:
- repair order avoids full rewrite:
- field patch targets are concrete:
- token allocation considered:
- player agency considered:
- next skill:
```

## Quality rules

- Do not diagnose "boring" as a single issue. Translate it into observable
  failures: vague promise, weak engine, generic voice, no consequence, route
  funneling, passive role, overloaded welcome, or missing second-turn move.
- Do not rewrite everything by default. Preserve working packets and patch the
  smallest field that can fix the failure.
- Do not spend simulation cost when current evidence already proves structural
  failure. Patch first, then simulate after the author accepts cost.
- Do not let token compression delete the engine. Move durable behavior into
  `roleDetailDesc` before cutting.
- Do not rely on render polish. A good-looking first screen can still be inert.
- Keep output original and public-safe. Do not mention unprovided source
  material, platform metrics, source provenance, or unsupported performance
  claims.

## Handoff

Hand the packet to:

- `lunatalk-token-architect` when allocation, welcome bloat, or compression is
  the first repair.
- `lunatalk-profile-packager` when the engine is coherent but `roleName`,
  `roleDesc`, tags, short pitch, public profile, or first impression is the weak
  layer.
- `lunatalk-archetype-director` when card type or primary contract is unclear.
- `lunatalk-character-core`, `lunatalk-relationship-architect`,
  `lunatalk-daily-life-architect`, or `lunatalk-world-engineer` when the durable
  engine is weak.
- `lunatalk-ensemble-director` when several speakers, cast keep/merge/cut,
  turn ownership, spotlight rules, group tension, roll-call openings, or
  cast-over-player behavior are the structural failure.
- `lunatalk-play-engineer` when RPG/adventure mechanics, compact state,
  resources, inventory, quests, combat, turn protocol, failure-forward behavior,
  or rule-manual openings are the structural failure.
- `lunatalk-agency-designer`, `lunatalk-opening-director`, or
  `lunatalk-longplay-architect` when play fails through choices, first screen,
  second turn, or continuation.
- `lunatalk-voice-director` when the remaining blocker is generic dialogue,
  polite assistant tone, catchphrase use, refusal style, or ensemble blur.
- `lunatalk-language-stylist` when the engine, opening, and voice are coherent
  but language consistency, script, register, pronouns, address terms, tags, or
  field-to-field wording are the remaining blocker.
- `lunatalk-card-author` when the author wants the diagnosed patch applied to a
  real private card.
- `lunatalk-render-review` or `lunatalk-chat-simulation` after structural patches
  make another review or costed simulation meaningful.
