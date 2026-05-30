# Moonloom Prompt Attention Architecture

Use this reference when a role card's raw description, raw detail,
`roleDetailDesc`, or MCP-ready field draft is long enough that important rules
start getting ignored across models. This is especially relevant for 5,000-10,000
character non-English detail fields, plot-heavy cards, XMLV3/state contracts,
and cards that behave well on one model but drift on a non-Claude or smaller
model.

This is an engineering standard for prompt salience. Markdown, XML tags,
semantic tags, and repeated anchors can make the prompt easier to parse and
retrieve from, but they do not guarantee attention and cannot control attention
heads. Treat them as structure for instruction-following, not as magic.
Explicitly: this does not guarantee attention and cannot control attention heads.

## Research Basis

The practical basis is:

- Transformers use attention mechanisms rather than recurrent sequence
  processing; multi-head attention lets a model represent several relations at
  once, but it does not mean prompt authors can directly steer specific heads.
  Source: https://arxiv.org/abs/1706.03762
- Long-context models can show lost-in-the-middle behavior: relevant information
  near the beginning or end is often used better than information buried in the
  middle. Source: https://arxiv.org/abs/2307.03172
- Later positional-bias work describes a U-shaped attention / U-shaped
  positional bias where beginning and ending tokens can receive more attention
  regardless of relevance. Source: https://arxiv.org/abs/2406.16008
- Official prompt guidance recommends explicit structure, context-window
  planning, evals for prompt changes, Markdown standards, and XML tags for
  separating instructions, context, inputs, and examples. Sources:
  https://platform.openai.com/docs/guides/prompt-engineering and
  https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags

Moonloom turns that into a conservative rule: put runtime-critical instructions
where the model is most likely to see them, make section boundaries obvious, and
test cross-model behavior with long-arc probes.

## Core Standard

All long raw detail and long raw description working drafts should use Markdown
headings before they are finalized into LunaTalk fields. For `roleDetailDesc`,
the top of the field should be a compact control plane, not lore.

Required structure for long raw detail:

1. Start with a 5-7 item `Every-Turn Iron Laws` or `Critical Control Plane`.
2. Put the card's `Card Contract` immediately after the iron laws.
3. Keep hard runtime rules in short imperative bullets.
4. Use stable Markdown headings and, when helpful, XML-style semantic tags to
   separate engine, state, output, examples, and reference material.
5. Put lore, world history, mood references, and extended examples in the middle.
   The middle is reference material, not the only home for hard rules.
6. Repeat critical constraints early and late: early for primacy, late for
   recency.
7. End with a `Final Recency Checklist` that restates the few rules most likely
   to regress in chat.

Do not write a 9,000-character prose wall and hope the model infers priority
from literary emphasis. A model-to-model difference is a prompt architecture
signal, not only a model quality issue.

## Raw Detail Template

Use this template when `roleDetailDesc` is large, strict, plot-driven, or
cross-model fragile:

```markdown
# Role Runtime Contract

## 0. Every-Turn Iron Laws
- [5-7 must-do rules only.]
- [Include narrative progression, agency boundary, output/state contract, and
  one card-specific safety or format rule.]

## 1. Card Contract
- Player role:
- Main pressure:
- External goal:
- Authority / opposing force:
- Story direction owner:
- Player agency boundary:

## 2. Player Agency Boundary
- What the assistant may decide:
- What the assistant must never decide for the player:
- How refusal, resistance, silence, and chaos remain playable:

## 3. Narrative Progression Engine
- Inciting incident:
- Every-turn next-station hook:
- Passive-player move:
- Stalled-scene repair:
- Route seeds:

## 4. Character Voice and Behavior
- Voice card:
- Pressure behavior:
- Relationship or faction behavior:
- Forbidden generic moves:

## 5. State and Output Contract
- Visible state:
- Hidden state:
- XMLV3 / Markdown output cadence:
- Bar value rule:
- Fallback if hidden `<state>` is omitted:

## 6. World / Scene Reservoir
- Locations:
- Objects:
- NPCs / factions:
- Clues / obligations / deadlines:

## 7. Reference Material
- Backstory:
- Tone references:
- Optional examples:

## Final Recency Checklist
- [Restate the 3-5 most brittle hard rules.]
```

The `Every-Turn Iron Laws` and `Final Recency Checklist` should agree. If they
contradict, the prompt is worse than before because the recency anchor will fight
the primacy anchor.

## Raw Description Standard

`roleDesc` is a public promise, not a durable runtime engine. If the author has a
long raw description source, first compress it into Markdown working notes:

```markdown
## Public Promise

## Player Position

## First-Screen Proof

## Tags / Discovery Hints
```

Then finalize `roleDesc` as a short scannable promise. Do not hide runtime rules
inside raw description or final `roleDesc`; they do not have the same role as
raw detail.

## Tag and Heading Rules

- Use headings for major modules: `## Narrative Progression Engine`,
  `## State and Output Contract`, `## Voice`, `## Reference Material`.
- Use XML tags only when they clarify boundaries that Markdown cannot, such as
  `<instructions>`, `<state_contract>`, `<example>`, or `<reference>`.
- Keep tag names descriptive and consistent. Do not invent decorative tags whose
  names do not explain the content they wrap.
- Do not put the whole card in one giant tag. Tags should separate modules.
- Keep examples under an examples heading or `<example>` tag so models do not
  confuse sample text with mandatory current-scene output.

## Cross-Model Compatibility

Optimize for the least forgiving model that still matters:

- Prefer short explicit bullets over implication-heavy prose.
- Use "must", "must not", and "when X, do Y" for hard rules.
- Avoid rules that require counting turns or scanning long history.
- Repeat stable labels exactly: `next-station hook`, `authority opposition axis`,
  `visible panel fallback`, `single numeric bar value`.
- Keep the middle modular so a weaker model can still recover the main contract
  from the top and bottom.
- Leave CJK / zh-Hant character-count buffer. Do not spend the last 200
  characters on lore if the card still needs state, progression, or output
  contract clarity.

## Anti-Patterns

- Hard rules buried after lore, character biography, or long examples.
- One 9,000-character raw detail wall with no headings.
- A final paragraph that introduces new rules not present in the top control
  plane.
- Contradictory early and late instructions.
- Using Markdown styling as decoration while the instruction hierarchy remains
  unclear.
- Claiming Markdown will force attention. It can improve salience; it does not
  guarantee attention.
- Copying the whole XMLV3 platform manual into `roleDetailDesc` instead of
  writing the card-specific state/output contract.

## Verification

Before MCP patching or long simulation, check:

- The first 20 lines contain the highest-priority runtime rules.
- The middle contains reference material, not the only copy of a hard rule.
- The end repeats the brittle rules most likely to regress.
- A long-arc macro-progression probe runs 8-12 turns and includes passive,
  chaotic, or oppositional player behavior.
- Cross-model evidence, when available, includes at least one model that is not
  the strongest instruction follower in the target environment.
