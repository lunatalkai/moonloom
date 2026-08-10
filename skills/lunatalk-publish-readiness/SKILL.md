---
name: lunatalk-publish-readiness
description: Use when a LunaTalk private role needs public submission readiness, publish blocker triage, author confirmation, publish_submit handoff, or a decision about whether a private card is ready for review.
---

# LunaTalk Publish Readiness

Use this skill to decide whether a private role card can be submitted for public
review, and to call `publish_submit` only after explicit author confirmation.

## Required references

Read `../../references/card-writer-mcp.md` for `publish_submit` details.
Read `../../references/quality-rubric.md` for readiness criteria.
Read `../../references/agent-mode-runtime.md` before signing off on the behavior
check: a published card can be played in either runtime and the player chooses,
so coverage of one is not coverage of both.
Read `../../references/quality-scorecard.md` when the author asks for a craft
score, top-tier check, good-enough review, or first-three repairs instead of
explicit submission. Use `lunatalk-quality-auditor` before publish readiness when
the task is quality audit rather than a public submission decision.
Read `../../references/profile-packaging.md` when the public-facing package is
the readiness risk: generic `roleName`, overlong or vague `roleDesc`, vague tags,
weak first impression, discovery surface, or reason-to-open. Use
`lunatalk-profile-packager` before publish readiness when the card engine is
coherent but profile packaging is the weak layer.
Read `../../references/language-style.md` when the readiness risk is language
consistency: zh-Hant / zh-TW inconsistency, Simplified/Traditional mixing,
translated-sounding prose, pronoun/address drift, mixed-language tags, or
field-to-field register mismatch. Use `lunatalk-language-stylist` before publish
readiness when the card engine, opening, and voice are coherent but language
style is the weak layer.
Read `../../references/card-diagnosis.md` when the card has several readiness
risks at once, author feedback is vague, validation/render pass but behavior is
weak, or the repair order is unclear. Use `lunatalk-card-doctor` before publish
readiness when the card needs diagnosis rather than a final yes/no check.
Read `../../references/character-core-design.md` when the role still feels
trope-only, generic, passive, or lacks player leverage.
Read `../../references/world-engine-design.md` when the card has lore-heavy
worldbuilding, decorative factions/locations, unclear player position, or weak
world-state consequences.
Read `../../references/play-engine-design.md` when RPG/adventure/sandbox/
survival/investigation mechanics, compact state, resources, quests, combat, turn
protocol, or failure-forward behavior are part of the readiness risk.
Read `../../references/generator-design.md` when generator/helper/
creator-assistant behavior, artifact output, intake defaults, output schema,
named revisions, artifact memory, advice-only drift, or endless intake is part
of the readiness risk.
Read `../../references/role-card-writing-framework.md` if the card has not already
been checked for playable loop, anchors, consequences, and token efficiency.
Read `../../references/token-economy.md` when `validate_role.tokenBudget`,
`welcomeToDetailRatio`, overlong welcome, thin detail, duplicated lore, visual
bloat, or field allocation is part of the readiness risk.
Read `../../references/safety-and-cost.md` for public action constraints. Read
`../../references/boundary-design.md` when a mature, adult, horror-leaning,
jealous, power-imbalanced, or consent-sensitive card needs boundary readiness.
Read `../../references/opening-design.md` when the welcome is greeting-only,
hollow, overloaded, or unclear about the first user action.
Read `../../references/longplay-design.md` when the card has repetitive loops,
weak memory/state, missing route costs, dead third turns, or no continuation
plan. Read `../../references/voice-calibration.md` when dialogue is generic,
voice drifts, refusal breaks character, catchphrases repeat, or ensemble
speakers blend together. Read `../../references/agency-design.md` when the
player can only watch, choices are decorative, routes funnel, refusal does not
matter, or the card decides the player's feelings/actions.

## Readiness checklist

1. Call `role_get`.
2. Confirm the role is private and owned by the authenticated account.
3. Call `validate_role`.
4. Resolve all blockers.
5. Check the card against PACT: playable, anchored, consequential, token-efficient.
   If the author is asking for a scorecard or quality tier and has not explicitly
   asked to submit, run `lunatalk-quality-auditor` instead of treating the task as
   publish readiness.
   If the role has a generic `roleName`, overlong or vague `roleDesc`, broad
   mood-only tags, or a weak first-impression reason-to-open while the engine is
   otherwise coherent, repair it with `lunatalk-profile-packager` before treating
   the card as ready.
   If a `zh-Hant` / `zh-TW` role mixes Simplified Chinese, English tags that are
   not intentional taxonomy, translated-sounding prose, drifting pronouns or
   address terms, or mismatched register between detail, welcome, and examples,
   repair it with `lunatalk-language-stylist` before treating the card as ready.
   If several readiness risks appear at once, run `lunatalk-card-doctor` first
   to create a diagnosis packet and repair order instead of treating readiness as
   a single checklist failure.
   If the role is trope-only, mood-only, passive, or has no player leverage,
   repair it with `lunatalk-character-core` before treating the card as ready.
   If the setting is lore-heavy but cannot name player position, core world rule,
   faction/location play functions, compact state, route costs, or exposition
   policy, repair it with `lunatalk-world-engineer` before treating the card as
   ready.
   If the card is RPG/adventure/sandbox/survival/investigation-like but cannot
   name compact state, resource consequences, quest/risk routes, turn protocol,
   failure-forward behavior, opening contract, and play-engine probes, repair it
   with `lunatalk-play-engineer` before treating the card as ready.
   If the card is a generator, helper, creator-assistant, or artifact-producing
   role but cannot produce a usable artifact after minimal intake/defaults, keep
   a stable output schema, support named revision operations, preserve artifact
   memory, or avoid advice-only/endless-intake behavior, repair it with
   `lunatalk-generator-architect` before treating the card as ready.
   If dialogue is generic, voice cards are missing, catchphrases repeat, refusal
   voice breaks character, or ensemble speakers are not distinguishable, repair
   it with `lunatalk-voice-director` before treating the card as ready.
   If the welcome is greeting-only, hollow, or a long setup with no first action,
   repair it with `lunatalk-opening-director` before treating the card as ready.
   If the card repeats after the first scene or cannot name route/state/memory
   changes, repair it with `lunatalk-longplay-architect` before treating the card
   as ready.
   If the player can only watch, choices are decorative, routes funnel, refusal
   does not matter, or the card narrates player feelings/actions, repair it with
   `lunatalk-agency-designer` before treating the card as ready.
   If `tokenBudget` shows high `welcomeToDetailRatio`, the welcome carries
   durable rules or repeated lore, `roleDetailDesc` is too thin, visual panels
   consume the first screen, or compression could delete the playable engine,
   repair it with `lunatalk-token-architect` before treating the card as ready.
   For boundary-sensitive cards, confirm rating intent, explicitness ceiling,
   player agency contract, escalation ladder, refusal route, stop conditions, and
   safer fallback are encoded in the card.
6. Review `render_preview`, or record that the author explicitly accepted the risk.
7. Run `conversation_send_message` and `conversation_inspect`, or record that the
   author explicitly skipped the real behavior check after understanding normal
   billing.
8. Name which runtimes the behavior check covered. A published card can be played
   with this turn's material picked for the character in advance, or with the
   character looking things up itself, and the player chooses — so a card checked
   in only one of them is checked in only one of them. If the worldbook carries
   material the card depends on, run at least one probe with `agentMode: true` and
   confirm the character could find what it needed; entries whose discoverability
   lives entirely in trigger terms are invisible when it searches by name and
   wording. When the author declines the extra cost, say so explicitly instead of
   reporting the card as fully checked. See `../../references/agent-mode-runtime.md`.
9. Spend the extra rounds now rather than after submission. Once a card is
   public or queued for review, every patch tool refuses it — fixing anything
   means taking it private with `role_set_visibility`, patching, and going
   through review again. That round trip is the reason a thin pre-publish check
   is expensive: an agent-mode defect found on the live card costs a full review
   cycle, while the same defect found one probe earlier costs one probe.
10. Summarize remaining warnings and tradeoffs.
11. Ask for explicit confirmation if the author has not already given it.

## Publishing rule

Only call `publish_submit` when the author clearly confirms submission in the
agent conversation. Use `confirmationSummary` to describe what was checked and
what the author confirmed.

Examples of sufficient confirmation:

- "Submit it for review."
- "Publish this card now."
- "I confirm, send it to review."

Examples that are not sufficient:

- "Looks good."
- "What do you think?"
- "Maybe publish later."

## Reporting

Return:

- roleId
- validation status
- render status
- simulation status
- runtime coverage: which runtimes the behavior check actually covered
- unresolved warnings
- whether `publish_submit` was called
- review status or task id when available
