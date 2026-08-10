# Moonloom Agent Mode Runtime

Use this reference when a card will be played in agent mode, when an author asks
why the same card behaves differently for two players, or when a conversation
test should exercise the agent path. Read `one-shot-prompt-runtime.md` first for
the default runtime; this file describes what changes when agent mode is on.

This file is intentionally sanitized. It describes what the runtime does and what
that means for authoring, not private implementation details.

## Two runtimes, one card

LunaTalk plays a card in one of two ways, and the player chooses which:

- **One-shot.** The platform decides in advance which parts of the card's
  material are likely relevant to this turn, assembles them into the prompt, and
  the model writes the reply in a single pass. This is the default and the
  runtime `one-shot-prompt-runtime.md` describes.
- **Agent.** Before writing anything, the model works through the card's material
  itself: it can list what exists, search it, and read specific pieces, deciding
  as it goes what it still needs. When it is done it writes the reply. Once it has
  looked something up for itself, the platform stops pre-selecting material for
  that turn — otherwise the model would learn that searching changes nothing.

Both runtimes read the same fields. Neither is a different card format, and there
is no field that turns agent mode on. The mode is a per-conversation player
setting, so **any published card can be played either way** and an author who has
only tested one of them has only tested half of what players will experience.

## What the model can reach in agent mode

Stated as capabilities, because that is what matters for authoring:

- **The card's world material.** It can see what entries exist by name, search
  their text, and read the ones it decides it needs.
- **Its own earlier notes.** It writes short notes for itself during a
  conversation and can look them up later. These are its compressed impressions,
  not a second source of truth.
- **Earlier conversation.** It can search what was actually said, including
  stretches that have scrolled out of the visible context.
- **Installed gameplay modules.** What the player has added to this conversation
  and what each provides.
- **A requirements view.** The card's format contract and this turn's required
  blocks, without the conversation attached — so a rule like "every reply ends
  with a status panel" is still legible after a long scene.
- **Its own working state and drafts.** A per-conversation state block whose shape
  the model defines, plus scratch drafts.
- **Settled facts.** Things already rolled, decided, or sealed earlier in the
  conversation, which it cannot quietly rewrite.

It also ends the preparation with an explicit hand-off rather than trailing off.
The practical consequence for authors: **the model arrives at the reply having
already gathered what it thought it needed**, so instructions that assume "you
only know what is in front of you" are weaker here than in one-shot.

## What changes for authoring

### World entries are found by name and wording, not only by trigger words

In one-shot, an entry surfaces because the player's message or recent context
matched its trigger terms and it won a bounded ranked selection. In agent mode
the model browses and searches for itself: it first sees **entry names**, and it
searches **the words in the bodies**.

So the same entry needs both handles:

- Give every entry a name that says what is inside it. `Moon Gate` is findable;
  `Location 3` and `Misc lore B` are not, and a name is often all the model sees
  before deciding whether to open it.
- Write bodies in the words a model would search for. If an entry is the only
  place a rule lives, the rule's own vocabulary should appear in the body, not
  only in the trigger list.
- Keep trigger terms anyway. They still carry the one-shot path, and the same
  card is played both ways.

A card whose discoverability lives entirely in trigger words degrades in agent
mode: the model looks, sees a list of opaque names, and writes from what it
already had.

### Constant entries are the only guaranteed material

Always-available entries are still always available. Everything else is reached
only if one runtime selects it or the other goes looking. Identity, voice, and
the rules that must hold every single turn belong in the role fields, which is
the same advice as one-shot — but the cost of getting it wrong is higher here,
because the model may spend its preparation on the wrong material and never open
the entry you were relying on.

### Format contracts survive better, and are still worth restating

The requirements view exists precisely because long conversations dilute format
rules. Agent mode gives the model a way to re-read the contract before handing
over the reply. This does not remove the need for a compact output contract in
the card — it means a clear, self-contained contract now gets read a second time
instead of competing with the whole scene.

### State the model maintains is its own

The per-conversation state block's shape is the model's decision, not a schema the
card declares. If the card needs a specific visible panel, that belongs in the
output contract as a format requirement, not as an assumption about what the model
keeps internally.

### Preparation is not a place to put your plot

The model decides how many steps it needs. Writing "first check the world book,
then check your notes, then decide" into a card is the same mistake as scripting
a chain of thought: it replaces the model's own judgment about what this turn
needs with a fixed sequence. Describe what exists and why it matters; let it route.

## What changes for the player

- Turns take noticeably longer — the preparation runs before any text appears.
- Cost follows actual usage rather than a flat per-turn estimate, so a turn where
  the model searched six times costs more than one where it searched once.
- Free models cannot run agent mode.

An author does not need to design around these, but should expect them when
testing and should not read a slow agent turn as a stuck one.

## Testing both modes

`playtest-loop.md` has the probe ladder; the mode-specific part is short:

1. Ask which runtime the card is meant for. If the answer is "both", both need a
   pass.
2. Run the same probe in each mode on the same card, one conversation each, and
   compare: did the agent turn use material the one-shot turn missed, or did it
   spend its preparation and arrive with nothing extra?
3. On the agent turn, read the preparation trace, not only the reply. The trace
   says which material it went looking for and with what words. An agent turn that
   searched and found nothing usually means entry names and body wording are the
   problem, not the reply.
4. Treat "the agent found it, the one-shot did not" as a trigger-word gap, and
   "the one-shot found it, the agent did not" as a naming or wording gap. They are
   different defects with different fixes.

`card-writer-mcp.md` documents the tool contract for running an agent turn and
reading the trace back.

## What this reference is not

It is not a claim that agent mode is the better runtime. It is slower and costs
more, and a well-built card with good trigger terms can outperform a weakly named
one under agent preparation. The point is that both runtimes are real, players
choose between them, and a card is only as good as its worse mode.
