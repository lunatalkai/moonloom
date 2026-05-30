# Moonloom One-Shot Prompt Runtime

Use this reference when writing `roleDetailDesc`, long raw detail, XMLV3 control
contracts, or Tier 4 prompt guidance for a card that must stay stable without a
repair agent inside the same turn.

Moonloom assumes the chat runtime is one-shot: each assistant reply is generated
by one model call from the assembled prompt. There is no harness agent reading a
broken reply, repairing missing choices, restoring panels, or re-asking the model
inside that turn. Stability must therefore be carried by the role fields,
generic runtime guides, and the current conversation context.

This file is intentionally sanitized. It describes prompt shape, not private
implementation details.

## Sanitized Prompt V2 Layout

A typical one-shot roleplay prompt has this high-level shape:

```text
pre-history runtime frame
  - fiction / language / roleplay framing
  - user or card-level custom system text, if present
  - creative writing and behavior rules
  - RoleDetail block:
      RoleName
      roleDetailDesc / raw detail after placeholder resolution
      role sex or basic profile metadata
  - RoleUserName / user profile block, if present
  - talk examples, if present
  - world, memory, or reference segments, if active
  - start-new-conversation marker

conversation history
  - older user and assistant turns
  - summaries or pinned memories, when present
  - the current user turn normally appears as the latest user item in history

post-history / near-generation instructions
  - language reminder
  - preset or behavior reminder
  - content-scope or session reminder, if active
  - format runtime guide, when XMLV3 / Theme V3 is active
  - current state snapshot, when the runtime has one

output position
  - assistant generation starts after the assembled prompt above
```

The exact provider role names and message merging behavior can vary. Some
providers preserve many system messages; others receive a merged pre-history
block and a merged post-history block. Moonloom authors should not depend on
message-role mechanics. They should design the raw detail so it remains readable
as a single document inside the pre-history block.

## Field Placement Consequences

`roleDetailDesc` is the durable card engine, but it is not the last instruction
before assistant generation. It is read before conversation history, summaries,
assistant outputs, and near-generation reminders. This means:

- raw detail must start with the most important runtime rules
- raw detail must not hide hard rules after biography or lore
- raw detail should include a short final checklist, because the field itself
  may be long even though the whole prompt has later sections
- raw detail cannot rely on the current user message being visually adjacent to
  its rules
- if a previous assistant reply used malformed format, the next one-shot prompt
  may contain that malformed reply in recent history

`RoleUserName` can be used by runtime framing and user profile sections, and
placeholders in raw detail may be resolved before prompt assembly. Do not hard
code a durable player identity that should remain user-configurable. State what
the participant controls, what the assistant may infer, and what must remain the
player's decision.

## One-Shot Stability Rules

Use these rules when writing long Tier 4 raw detail:

1. Start with `Every-Turn Iron Laws`: 5-7 bullets only.
2. Put the card-specific output contract early, before lore.
3. Include a `Minimum Viable Reply` rule: when token pressure or emotional prose
   rises, cut prose before structure. Preserve scene wrapper, visible state or
   panel, and choices at decision points.
4. Include one small format exemplar / few-shot shape when XMLV3 or choices must
   survive weak models. The exemplar teaches structure, not story content.
5. Write a bad-format quarantine rule: do not imitate malformed history,
   summaries, Markdown memory, plain-text prior assistant replies, or broken XML.
   Regenerate each turn from the format skeleton.
6. Treat summaries as memory, not output examples. Summary memory is not output example text.
   A story summary can explain what happened; it must not teach the next reply
   to use summary headings.
7. Prefer visible state as the player-facing source of truth. Hidden `<state>` is
   useful when it appears, but the card should remain playable if it is omitted.

## Raw Detail Shape For One-Shot Use

```markdown
# Role Runtime Contract

## 0. Every-Turn Iron Laws
- [Narrative must move toward a next station.]
- [Player agency boundary.]
- [Minimum viable reply: cut prose before dropping structure.]
- [Decision points end with visible choices or a direct actionable question.]
- [Do not imitate malformed prior assistant format or summary headings.]

## 1. Card Contract
- Player position:
- Main pressure:
- External goal:
- Opposing force:
- Story direction owner:

## 2. State and Output Contract
- Required visible state:
- Optional hidden state:
- Bar value rule:
- Choices rule:
- Format skeleton name:

## 3. Tier 4 Format Exemplar
- Use one tiny positive exemplar with placeholders.
- Do not include a dramatic sample scene.
- Do not include code fences in the actual role field if the card output forbids
  Markdown fences.

## 4. Narrative, Agency, Voice, World, and Reference Material
- Put long lore and reservoirs here, not before the control plane.

## Final Recency Checklist
- [Repeat only the brittle rules most likely to regress.]
```

## Format Exemplar Guidance

The exemplar should be small enough to survive one-shot attention pressure:

```text
<scene>
  <n>[one current action]</n>
  <d>[one in-character reply]</d>
</scene>
<panel title="[visible state]">[route, risk, clue, or phase]</panel>
<choices>
  <choice send="[concrete action]">[short label]</choice>
  <choice send="[resist or redirect]">[short label]</choice>
  <choice send="[ask or inspect]">[short label]</choice>
</choices>
```

Use the smallest structure that preserves play. A heavy sample with panels, bars,
forms, long nested controls, and emotional prose can look impressive in the first
turn and still increase weak-model format dilution later.

## Failure Mode To Test

Weak models can show an absorbing-state-like or self-reinforcing format drift:
once one long emotional turn becomes plain text, recent plain-text assistant
history may become a stronger local pattern than the older raw detail contract.
U-shaped prompt placement can delay this, but it does not guarantee recovery.

Test with at least one 10+ turn long-arc format stability probe when the card
depends on XMLV3, visible panels, bars, choices, or hidden state.
