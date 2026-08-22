---
name: lunatalk-mod-author
description: Use when the author wants a LunaTalk MOD — a gameplay module that adds per-turn rules to a role and renders a state card (affection, stamina, quest progress, dice, inventory). Covers designing the card fields and rules, exposing player-tunable params, playtesting a draft before publishing, and submitting it. Not for role cards, worldbooks, or themes.
---

# Authoring a LunaTalk MOD

A MOD attaches to a role and does two things every turn: it adds the author's
rules to the AI's instructions, and it can render a state card in the reply.
That is the whole surface. If what you want does not need per-turn state or
per-turn rules, a role card or worldbook is the better home for it.

## The loop

1. `mod_create` — a draft. Only the author can see it.
2. `mod_validate` — check the content before spending a turn on it.
3. **Play it.** Enable the draft on a role the author owns, then send real
   messages and read the replies.
4. `mod_get` → edit → `mod_author_save` → back to 2.
5. `mod_submit` when it holds up.

Step 3 is the one people skip, and it is the only step that tells you whether
the MOD actually works. A draft does not need to be published to be played, so
there is no reason to submit something you have never seen run.

## What decides whether a MOD is good

**The `rule` on each field is the product.** It is the sentence the AI reads
when deciding that field's value each turn. A rule that restates the label
teaches the model nothing:

- Weak: `好感度` → "the affection value"
- Strong: `好感度` → "starts at 0; +5 when the player recalls something she told
  them, +10 when they act on it, −15 when they break a promise; never moves more
  than 20 in one turn"

Concrete thresholds and bounded deltas are what make the number mean something
across a long session. Without them the model drifts and the card becomes
decoration.

**Fewer fields, harder rules.** Every field competes for the model's attention
each turn, and the whole MOD competes with the role card. Three fields with
sharp rules beat eight with vague ones.

**State the model can't observe is dead weight.** A field only works if the
model can decide its value from what happened in the conversation. "Days since
they last visited" has no source unless something in the conversation supplies
it.

## Params: one MOD, many tables

`params` are values the *player* sets when they enable the MOD — the starting
affection, how fast it moves, difficulty. Use them when different players will
reasonably want different numbers, not to avoid deciding. Every param is one
more thing the player has to understand before they can play.

## Cost

MOD rules ride in the prompt every turn. Long rules mean less room for story and
more frequent memory compaction, which the player pays for in credits and in
continuity. Write only the constraints this piece of gameplay actually needs.

## Field mechanics

The exact field names, types and limits live in `lunatalk://schemas/mod-source`,
and the step-by-step flow in `lunatalk://guides/mod`. Read the schema resource
rather than guessing type names; `mod_validate` will also name the offending
field when something is wrong.

Custom card HTML has hard limits (size, allowed components, scoped CSS). When it
is rejected, `mod_validate` says which limit — do not work around it by
inlining more markup.

## Concurrency

`mod_author_save` needs the `version` from `mod_get`. If it comes back as a
version conflict, the MOD changed after you read it: read again, re-apply the
edit, then save. Do not retry the same write.

## Not this skill

Role identity, voice and opening → `lunatalk-card-author`.
Reusable lore triggered by keywords → worldbook skills.
Visual restyling of the chat → theme skills.
