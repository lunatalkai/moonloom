# Moonloom Prompt Attention Architecture

Use this reference when a role card's raw description, raw detail,
`roleDetailDesc`, or MCP-ready field draft is long enough that important rules
start getting ignored across models. This is especially relevant for 5,000-10,000
character non-English detail fields, plot-heavy cards, XMLV3/state contracts,
and cards that behave well on one model but drift on a non-Claude or smaller
model. Read `one-shot-prompt-runtime.md` first when the question is how these
fields sit inside the one-shot Prompt V2 runtime.

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
- Few-shot / in-context examples can teach output shape better than abstract
  rules alone, but examples add context cost and can teach unintended patterns if
  they are too many, too specific, or inconsistent. Sources:
  https://platform.openai.com/docs/guides/prompt-engineering,
  https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/few-shot-examples,
  and https://huggingface.co/docs/transformers/tasks/prompting
- Structured-output benchmarks show that format compliance is a distinct model
  capability from task correctness. Prompting helps, but format adherence can
  still fail on weaker models. Sources:
  https://www.sciencedirect.com/science/article/pii/S0306457324001687 and
  https://huggingface.co/papers/2605.02363

Moonloom turns that into a conservative rule: put runtime-critical instructions
where the model is most likely to see them, make section boundaries obvious, and
test cross-model behavior with long-arc probes.

## One-Shot Runtime Assumption

Moonloom fields are written for a one-shot generation path. `roleDetailDesc` is
the durable card engine, but it is not the last instruction before assistant
generation: conversation history, summaries, memory/world segments, and
near-generation reminders can follow it. Treat raw detail as a self-contained
pre-history runtime contract, not as a final message.

Use the sanitized layout in `one-shot-prompt-runtime.md` to understand where
`RoleDetail`, `RoleUserName`, the latest user turn, summaries, runtime guides,
and the assistant output position sit in the assembled prompt.

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

## Weak-Model Format Dilution

Separate behavioral rules from structural rules. Behavioral rules tell the model
what story move to make, who owns direction, how refusal works, and what pressure
continues. Structural rules tell the model to keep XMLV3, panels, bars, choices,
or hidden state syntax alive. U-shaped placement can make behavioral rules more
available and can delay weak-model format dilution, but U-shaped anchors delay
not cure structural drift. U-shaped anchors can delay but not cure structural
drift.

Weak models can enter an absorbing-state-like / self-reinforcing format drift:
once a long emotional turn drops XMLV3 structure and emits plain text, recent
plain-text outputs can become self-contagion examples. The model may keep
copying its own recent plain-text shape even though the top and bottom of
`roleDetailDesc` still contain the format rule. A context summary may not reset
this; summary content can even compete with the card's XMLV3 shape if it is
written as unrelated Markdown. Treat summaries as memory, not output examples.

For weak-model cards, reduce the structural contract before adding more rules:

- keep required XMLV3 controls minimal and card-specific
- treat choices as the fragile first-drop control and protect them as the most
  important action-path closure surface
- prefer visible panel state over hidden-only state
- avoid requiring full panel/bar/choices/state scaffolds on every single turn
- define a Minimum Viable Reply: under pressure, cut prose before structure and
  preserve the current scene wrapper, visible state/panel, and choices at
  decision points
- test format stability for 10+ turns, not only the first two turns

## Tier 4 Format Exemplar

When the card needs XMLV3 or choices to survive weak models, reserve a small Tier
4 prompt budget for one positive example / format exemplar. This is a tiny
few-shot anchor, not another story scene. It should show the minimal viable
structure the model must imitate:

```xml
<scene>
  <n>[One current action or sensory beat.]</n>
  <d>[One in-character line that reacts to the player.]</d>
</scene>
<panel title="[visible state]">[phase, route, risk, or clue in short text]</panel>
<choices>
  <choice send="[concrete player action 1]">[label 1]</choice>
  <choice send="[concrete player action 2]">[label 2]</choice>
  <choice send="[resist or redirect]">[label 3]</choice>
  <choice send="[ask or inspect]">[label 4]</choice>
</choices>
```

Rules for the exemplar:

- Keep it under 120-180 words or equivalent XML. If the format example is longer
  than the runtime rule it teaches, it becomes competing content.
- Use placeholders or generic labels so the model copies the shape, not a fixed
  plot beat, emotion, location, or line.
- Show only required controls. If the example includes too heavy XMLV3, weak
  models may copy the weight for a few turns and then collapse.
- Put the exemplar near the output contract and before long reference material;
  repeat only the skeleton name in the final recency checklist.
- Include one explicit recovery sentence: do not imitate previous bad format;
  each turn regenerates from the format skeleton. This is a prompt-only guard
  against bad-format absorption, not a guarantee.
- In actual role fields, avoid code fences around the exemplar when the card
  output contract forbids Markdown fences. Use a clearly labeled short example
  block or XML-style `<example>` wrapper instead.

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
- Treating structural rules as equally reachable as behavioral rules on weak
  models.
- Using a long dramatic sample as the format exemplar; it will teach content,
  mood, and pacing as much as structure.

## Verification

Before MCP patching or long simulation, check:

- The first 20 lines contain the highest-priority runtime rules.
- The middle contains reference material, not the only copy of a hard rule.
- The end repeats the brittle rules most likely to regress.
- A long-arc macro-progression probe runs 8-12 turns and includes passive,
  chaotic, or oppositional player behavior.
- A long-arc format stability probe runs 10+ turns when XMLV3 panels, bars,
  choices, or hidden state matter.
- Cross-model evidence, when available, includes at least one model that is not
  the strongest instruction follower in the target environment.
