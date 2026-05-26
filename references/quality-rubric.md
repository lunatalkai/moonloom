# Moonloom Quality Rubric

Use this rubric when deciding whether a LunaTalk role card is usable, needs more
iteration, or is ready to submit for public review.

## Role card quality

- The role has a clear premise, relationship dynamic, and first playable scene.
- `roleDesc` is concise enough to scan but specific enough to set expectations.
- `roleDetailDesc` contains stable identity, backstory, personality, constraints,
  speaking style, boundaries, and important world context.
- The role can respond consistently without relying on hidden assumptions.
- The author-facing language matches the user's request. Use Traditional Chinese
  when the author writes in Traditional Chinese or asks for it.

## Welcome quality

- The welcome creates an immediate interaction opportunity.
- The player has a clear way to respond in the first turn.
- The welcome does not dump the full world bible.
- New cards should prefer XMLV3 plus Theme V3. Use HTML only for a specific visual
  need or a legacy import.
- Long visual structure should move toward Theme V3 rather than bloating welcome.

## Render quality

- No obvious overflow, clipped text, invisible text, or unreadable contrast.
- Desktop and mobile both preserve the intended hierarchy.
- HTML does not use scripts, inline event handlers, or external URLs.
- XMLV3 parses and has meaningful structured tags rather than raw fallback text.
- Theme V3 tokens support the card mood without making the page one-note.

## Simulation quality

- The role stays in character across at least one realistic user turn.
- The first reply advances the scene instead of restating the profile.
- The role's tone matches the role card and content rating intent.
- The simulation does not expose implementation details or moderation artifacts.
- The cost/charged score is included in the agent's summary when available.

## Publish readiness

Ready means all of these are true:

- `validate_role` has no blockers.
- `render_preview` has been reviewed, or the author explicitly accepts the risk.
- `simulate_private_chat` has been run, or the author explicitly skips it knowing
  it is the closest real behavior check.
- The author explicitly confirms submission in the agent conversation.
