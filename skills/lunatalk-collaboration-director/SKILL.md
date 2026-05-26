---
name: lunatalk-collaboration-director
description: Use when author feedback, taste or preference calibration, co-review, revision choices, draft comparisons, or "almost right but off" comments need to become Moonloom decisions before rewriting, simulating, or publishing.
---

# LunaTalk Collaboration Director

Use this skill when the author is actively reviewing direction, taste, evidence,
or revision choices through conversation. The output is a collaboration packet
and decision frame, not a full rewrite, comment system, or MCP operation.

This skill keeps the author in the loop without creating new UI or storage. It
turns vague feedback into observable card behavior, then routes to the narrow
Moonloom skill that should do the next patch.

## Required references

Read `../../references/author-collaboration.md` first.

Read only the narrow follow-up reference after the collaboration packet names the
next layer:

- `../../references/premise-workshop.md` for unsettled direction or taste axes.
- `../../references/card-diagnosis.md` for mixed existing-card symptoms.
- `../../references/quality-scorecard.md` for whole-card craft review.
- `../../references/playtest-loop.md` for simulation evidence or probe choices.
- `../../references/theme-v3-rendering.md` for preview/render evidence.
- `../../references/card-authoring-templates.md` for field patch handoff.

## Boundary

Do not call MCP tools from this skill. Do not create comments, review tables,
approval storage, SQL records, or hidden state. The author feedback surface is
the agent conversation.

Do not treat author taste as MCP validation. Use Moonloom skills to translate
taste into field targets, packets, and verification triggers.

## Workflow

1. Identify what the author is reacting to: idea, draft, field, render,
   simulation, profile, language, or publish readiness.
2. Separate evidence from preference. Evidence is what happened; preference is
   what the author wants more or less of.
3. Translate vague feedback into behavior: pressure, voice, agency, pacing,
   token density, relationship distance, opening affordance, route consequence,
   boundary posture, or profile promise.
4. Name non-negotiables and things to preserve before proposing changes.
5. Offer two or three decision options when the direction is not settled.
6. Recommend one path and explain the tradeoff in card-design terms.
7. Produce a collaboration packet with patch target and next Moonloom skill.
8. Ask at most three targeted questions only if the next decision cannot be made
   from available evidence.
9. Hand off to the narrow skill or to `lunatalk-card-author` only after the
   decision frame is clear.

## Output format

Return:

```text
Author collaboration packet:
- current request:
- author signal:
- current artifact:
- evidence available:
- inferred preference axes:
- non-negotiables:
- preserve:
- change:
- reject:
- delay:
- decision frame:
  - option A:
  - option B:
  - option C, optional:
  - recommendation:
- patch target:
- next Moonloom skill:
- confirmation needed:
- validation / render / simulation stance:
- handoff:

Self-review:
- feedback stayed in agent conversation:
- taste translated into observable behavior:
- preserve/change/reject/delay all named:
- decision frame is concrete:
- next skill is narrow:
- no MCP/server hard gate invented:
```

## Collaboration rules

- If the author says "boring", do not rewrite immediately. Identify whether the
  weakness is promise, pressure, consequence, role initiative, voice, opening,
  longplay, or token bloat.
- If the author says "not like the character", route toward voice, character
  core, contradiction, pressure behavior, or field-level language, not generic
  style polish.
- If the author compares two drafts, preserve the winning qualities before
  merging. Do not average incompatible directions.
- If render or simulation evidence exists, summarize the meaningful evidence
  before proposing a patch.
- If the author is choosing between concepts, use a decision frame and then hand
  off to `lunatalk-premise-workshop`, `lunatalk-archetype-director`, or
  `lunatalk-card-blueprint`.
- If the author asks to patch a real private card after the decision, hand off to
  `lunatalk-card-author`.

## Handoff

Hand off to:

- `lunatalk-premise-workshop` when taste signals need contrasted directions.
- `lunatalk-card-doctor` when an existing draft has several symptoms.
- `lunatalk-quality-auditor` when the author wants a whole-card craft decision.
- `lunatalk-profile-packager` when the public promise does not match the
  author's intended appeal.
- `lunatalk-language-stylist` when the remaining issue is language consistency.
- `lunatalk-render-review` when the author is reacting to preview evidence.
- `lunatalk-chat-simulation` when the author wants behavior evidence and accepts
  normal simulation cost.
- `lunatalk-card-author` when the decision is ready to become fields or a real
  private-card patch.

Keep output original and public-safe. Do not mention unprovided source material,
private examples, platform metrics, source provenance, or unsupported claims.
