# MOD authoring

A MOD is a gameplay module an author attaches to a role. Every turn it adds the
author's rules to the model's instructions, and it can render a state card in
the reply — affection, stamina, quest progress, dice, inventory.

The exhaustive field list lives in the MCP resource
`lunatalk://schemas/mod-source`; the step-by-step flow in
`lunatalk://guides/mod`. This document is the part those two do not cover:
what makes a MOD work, and the ways they usually fail.

## Play the draft before publishing

A draft is visible only to its author, and it can be enabled on a role the
author owns and played without ever being published. Submitting something that
has never been run is the most common way to ship a MOD that does not work: the
schema check only proves the content parses, not that the model behaves.

The loop is create → validate → **play** → save → submit, and the middle step is
the one that finds real problems.

## Rules are the product

Each card field carries a `rule` — the sentence the model reads when deciding
that field's value this turn. The rule is where a MOD succeeds or fails.

A rule that restates the label gives the model nothing to decide with:

> `好感度` — "the affection value"

A rule with concrete triggers and bounded movement produces a number that means
something twenty turns later:

> `好感度` — "starts at 0; +5 when the player recalls something she told them,
> +10 when they act on it, −15 when they break a promise; never moves more than
> 20 in one turn"

Two properties matter: **named triggers** (what specifically causes movement)
and **bounded deltas** (how far it can move at once). Without bounds the value
swings to an extreme early and stops carrying information.

## Failure modes seen in practice

**Too many fields.** Every field competes for attention each turn, and the MOD
as a whole competes with the role card. Three fields with sharp rules outperform
eight with vague ones.

**State the model cannot observe.** A field only works if its value is derivable
from the conversation. Wall-clock time, real-world events, or anything the model
has no way to read will be invented or frozen.

**Rules that duplicate the role card.** If a constraint belongs to who the
character is, it belongs in the role card, where it applies whether or not a MOD
is installed.

**Treating params as indecision.** `params` are for values different players
reasonably want set differently — starting difficulty, how fast a meter moves.
Every param is another thing a player must understand before playing. Deciding
on the author's behalf is usually the better product.

## Cost

MOD rules are in the prompt on every turn. Longer rules mean less room for the
story and more frequent memory compaction, which the player pays for in credits
and in continuity. Write the constraints this gameplay needs and stop.

## Custom card HTML

Card appearance can be customised, with hard limits on size, which interactive
components are allowed, and CSS scoping — a MOD's styles cannot escape its own
card. When a template is rejected, the validation diagnostics name the limit
that was hit. That limit is the answer, not an obstacle to route around by
splitting or inlining markup.

## Editing safely

Saving requires the `version` returned by the read. A version conflict means the
MOD changed after it was read — the correct response is to read it back, re-apply
the edit on top, and save again. Retrying the same write either fails again or
overwrites somebody's change.
