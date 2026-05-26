---
name: lunatalk-boundary-designer
description: Use when a LunaTalk role-card task involves mature, adult, NSFW, emotionally intense, horror-leaning, jealous, coercion-adjacent, power-imbalanced, boundary-sensitive, consent-sensitive, refusal, pacing, rating, or safer-version design before blueprinting, authoring, simulation, or publish readiness.
---

# LunaTalk Boundary Designer

Use this skill before `lunatalk-card-blueprint` or `lunatalk-card-author` when a
card needs controlled intensity without stealing player agency. The output is a
boundary packet and repair plan, not a role card.

## Required references

Read `../../references/boundary-design.md` for rating intent, explicitness
ceilings, player agency contracts, escalation ladders, refusal behavior, safer
fallbacks, first-scene guardrails, and probes. Read
`../../references/safety-and-cost.md` for ownership, public actions, simulation
cost, and credentials. Read `../../references/card-authoring-templates.md` for
handoff shape. Read `../../references/role-card-writing-framework.md` and
`../../references/quality-rubric.md` when converting the packet into a playable
card plan. Read `../../references/playtest-loop.md` when the task includes
simulation or transcript repair.

## Boundary

Do not call MCP tools from this skill. Do not create, patch, render, simulate, or
publish a role. Design the boundary mechanics, state assumptions, and hand off to
the next Moonloom skill.

## Workflow

1. Identify the risky pressure shape: adult romance, jealousy, coercion-adjacent
   tension, power imbalance, horror, violence, trauma, obsession, public scandal,
   or boundary repair.
2. Clarify the intended rating and explicitness ceiling. If unclear, default to a
   lower explicitness ceiling and mark the question for the author.
3. Define the player agency contract: what the player controls, can refuse, and
   what the card must not decide.
4. Define allowed pressure tools and disallowed moves.
5. Build an escalation ladder with gate signals and slowdown signals.
6. Define refusal, slowdown, and stop-condition behavior that stays in character.
7. Add a safer fallback that preserves the fantasy while lowering explicitness or
   coercive pressure.
8. Add first-scene guardrails and reply paths that include refusal or terms.
9. Add boundary simulation probes for later `lunatalk-chat-simulation`.
10. Hand off to `lunatalk-card-blueprint` for ideation or
    `lunatalk-card-author` when the card fields can be drafted directly.

## Output format

Return:

```text
Boundary packet:
- rating intent:
- explicitness ceiling:
- premise risk:
- player agency contract:
- allowed pressure tools:
- disallowed moves:
- escalation ladder:
- refusal / slowdown behavior:
- stop conditions:
- safer fallback:
- first-scene guardrails:
- simulation probes:

Repair plan:
- detail rules to add:
- welcome changes:
- voice/refusal style:
- token tradeoff:

Handoff:
- next skill:
- ready: yes | no
- missing author input:
```

## Quality rules

- Treat boundaries as playable mechanics, not disclaimers.
- Keep pressure tied to motive, consequence, and player choice.
- Do not use MCP validation as the judge of emotional or writing safety. Patch
  Moonloom guidance, card detail, welcome, and simulation probes.
- Make all central characters clearly adult when the premise is adult or romantic.
- If the requested intensity is unclear, preserve the core fantasy at a lower
  explicitness ceiling and ask the author to confirm before going higher.
- Refusal should open another route instead of ending the card.
- If a visible welcome contradicts the hidden boundary rules, rewrite the welcome.
- Keep the output public-safe and generic. Do not include platform policy,
  private examples, or unsupported provenance claims.

## Repair heuristics

- If the role decides player consent or feelings, add a player agency contract
  and rewrite the welcome line that caused it.
- If the role ignores "no" or "slow down", add the four-step refusal sequence:
  acknowledge, stop, preserve motive, offer a new route.
- If jealousy reads as ownership, recast it as fear, vulnerability, rivalry, or a
  practical stake with choices.
- If escalation jumps too fast, add gate signals and route alternatives.
- If the card becomes bland after refusal, add an in-character safe continuation:
  negotiation, investigation, apology, distance, or practical stakes.
- If the premise is risky only for shock value, remove the shock or tie it to
  consequence, motive, and player agency.
