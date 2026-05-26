# Moonloom Quality Rubric

Use this rubric when deciding whether a LunaTalk role card is usable, needs more
iteration, or is ready to submit for public review.

For writing guidance, read `role-card-writing-framework.md` first. This file is
the shorter pass/fail rubric.

## Role card quality

- The role has a clear premise, relationship dynamic, and first playable scene.
- The card has a repeatable play loop: hook, agency, consequence, memory,
  progression, and a renewed hook.
- `roleDesc` is concise enough to scan but specific enough to set expectations.
- `roleDetailDesc` contains stable identity, backstory, personality, constraints,
  speaking style, boundaries, and important world context.
- The role can respond consistently without relying on hidden assumptions.
- The author-facing language matches the user's request. Use Traditional Chinese
  when the author writes in Traditional Chinese or asks for it. Do not mix
  Simplified Chinese terms into `zh-Hant` card fields.

## MCP quality warnings

Treat quality warnings from `validate_role` as work items, not decorative lint.
The first publish-grade pass should clear these warnings unless the author
explicitly chooses a tradeoff:

- `promise`: clarify the premise, player relationship, and tension.
- `anchor`: strengthen durable identity, desire, contradiction, boundaries,
  speaking style, and behavioral tells.
- `consequence`: define what player choices change and how the next hook renews.
- `agency`: make the first user response path obvious.
- `openingScene`: add concrete location, time, sensory context, role beat,
  pressure, and player implication before choices.
- `playerAgency`: remove instructions that decide the player's actions, feelings,
  consent, or commitments; replace generic openings with a concrete scene.
- `languageStyle`: rewrite mixed Simplified Chinese terms into Traditional
  Chinese while preserving character names, tone, and XMLV3 tags.
- `tokenEfficiency`: reduce welcome bloat or move durable visual structure into
  XMLV3/Theme V3.
- `archetype`: satisfy the card type's contract. Companion needs relationship
  pressure and emotional boundaries; story needs setting stakes and likely
  branches; game needs rules, resources, failure pressure, and opening
  setup/state/choices; generator needs intake, output schema, revision loop, and
  quality rubric.
- Thin `roleDesc`: rewrite it as premise + player relationship + tension.
- Overlong `roleDesc`: compress it into one scannable premise sentence. Normal
  cards should usually stay under 260 characters; game/system/generator cards can
  use up to about 500 only when modes require it.
- Thin `roleDetailDesc`: add identity, desire, contradiction, boundaries, speech
  style, and progression loop.
- Missing speaking style: specify sentence length, emotional tells, vocabulary,
  and what the role avoids saying.
- Missing progression/consequence/state: define how player choices change trust,
  risk, location, resources, routes, or relationship state.
- Weak first action path: add choices, a direct question, or an explicit response
  path in the opening scene.
- Hollow opening: choices alone are not enough. Add a visible place, sensory cue,
  role action or beat, pressure, and a reason the player is implicated now.
- Player agency takeover: the role can pressure or invite, but it must not narrate
  the player's decisions, feelings, or consent.
- Generic opening: replace "Hello, I am X, what do you want to do?" with location,
  role action, pressure, player implication, and a specific reply path.
- Language mismatch: for `zh-Hant` cards, rewrite profile, detail, welcome, and
  examples into Traditional Chinese before render or simulation.

## Token budget review

Use `tokenBudget` from `validate_role` before render or simulation:

- If welcome is much longer than detail, move durable rules, reusable lore, or
  visual scaffolding into `roleDetailDesc`, XMLV3 state, or Theme V3.
- If detail is short but welcome is long, the card often plays well for one turn
  and then drifts.
- If total size is large, keep only material that changes behavior, state, or
  user agency.

## Welcome quality

- The welcome creates an immediate interaction opportunity.
- The player has a clear way to respond in the first turn.
- The welcome does not dump the full world bible.
- System/RPG/sandbox cards expose setup fields or choices without burying the first
  action in a long manual.
- New cards should prefer XMLV3 plus Theme V3. Use HTML only for a specific visual
  need or a legacy import.
- Long visual structure should move toward Theme V3 rather than bloating welcome.

## Render quality

- No obvious overflow, clipped text, invisible text, or unreadable contrast.
- Desktop and mobile both preserve the intended hierarchy.
- HTML does not use scripts, inline event handlers, or external URLs.
- XMLV3 parses and has meaningful structured tags rather than raw fallback text.
- XMLV3 uses registered tags. Avoid invented aliases such as `<narration>` or
  `<dialogue>`, and keep visible prose out of hidden data tags.
- Theme V3 tokens support the card mood without making the page one-note.
- `render_preview` evaluation passes `captureReadiness`, `semanticStructure`,
  `readability`, and `actionVisibility`, or the author explicitly accepts the
  remaining visual risk.

## Simulation quality

- The role stays in character across at least one realistic user turn.
- The first reply advances the scene instead of restating the profile.
- The reply reflects player agency and creates consequence or a new hook.
- The role's tone matches the role card and content rating intent.
- The simulation does not expose implementation details or moderation artifacts.
- The cost/charged score is included in the agent's summary when available.
- `simulate_private_chat` evaluation passes `responsePresence`, `agency`,
  `progression`, and `safetyFormat`, or the author explicitly accepts the
  remaining tradeoff.

## Publish readiness

Ready means all of these are true:

- `validate_role` has no blockers.
- `render_preview` has been reviewed, or the author explicitly accepts the risk.
- `simulate_private_chat` has been run, or the author explicitly skips it knowing
  it is the closest real behavior check.
- The author explicitly confirms submission in the agent conversation.
