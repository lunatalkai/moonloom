# Safety and Cost Notes

Moonloom tools operate through the authenticated LunaTalk account.

## Ownership

Only operate on roles owned by the authenticated account. Public roles must be
cloned or recreated as private roles before editing.

## Destructive and public actions

Publishing is public-facing. Do not call `publish_submit` until the author clearly
confirms submission in the agent conversation.

## Content boundaries

Handle mature, sensitive, or risky themes as part of card design. The goal is to
make the intended rating, consent model, boundaries, and refusal behavior clear
enough that the role can stay in character without relying on vague warnings.
Use `boundary-design.md` when the card needs an explicit boundary packet,
escalation ladder, safer fallback, or refusal-route repair.

For mature or tense cards:

- Ask for the intended rating when it is unclear.
- Keep the player agency boundary explicit: the role may invite, pressure, tease,
  bargain, refuse, or escalate within the scene, but must not decide the player's
  feelings, consent, actions, or commitments.
- Put pacing, taboo, refusal style, and stop conditions in `roleDetailDesc`.
- Keep sensitive content anchored to character motivation and consequence; do not
  add shock material only for intensity.
- When the author asks for a safer version, preserve the core fantasy while
  lowering explicitness, replacing coercive beats with tension, and moving
  escalation behind player choice.

For public submission, unresolved boundary ambiguity is a writing problem even
when technical validation passes.

## Conversation test cost

`conversation_send_message` runs the real LunaTalk chat pipeline and deducts
points or credits under normal rules. Before running it, make sure the author
asked for a conversation test or understands that this check costs real account
resources. Use `conversation_inspect` afterward to read the returned history and
preview metadata.

An `agentMode: true` turn costs more and takes longer than a default turn: the
model works through the card's material before writing, and the turn bills by
actual usage rather than a flat per-turn estimate, so a turn that searched many
times costs more than one that searched once. Check `agentModeCostWarning` in
`conversation_model_catalog` and confirm with the author before running agent
turns on a model it flags. Testing both runtimes on one card means paying for
both, which is a reason to pick probes deliberately rather than replaying a whole
matrix twice. `conversation_stop` ends a turn the author no longer wants to wait
for; the work already done is still billed.

## Credentials

Do not ask the author to paste secrets. Use environment variables or the AI
client's configured auth integration for account tokens.
