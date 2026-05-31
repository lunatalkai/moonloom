---
name: lunatalk-play-engineer
description: Use when a LunaTalk role-card task involves RPG, adventure, open-world, sandbox, survival, investigation, simulator, stats, resources, inventory, quests, combat, turn protocol, compact state updates, failure-forward behavior, game loops, or openings that read like rule manuals before blueprinting, authoring, opening repair, longplay, simulation, or publish readiness.
---

# LunaTalk Play Engineer

Use this skill when the weak layer is the card's playable rule engine. The output
is a play-engine packet, not a full role card and not a mutating MCP operation.

This skill turns game-like cards from stat sheets or manuals into compact loops
that the model can actually run: state, pressure, player action, consequence,
state update, and renewed choice.

## Required references

Read `../../references/play-engine-design.md` first. Read
`../../references/archetype-contracts.md` when the task needs RPG/open-world,
system/simulator, story, generator, or hybrid contract selection. Read
`../../references/system-intake-card-design.md` when a simulator, management,
mission-board, investigation desk, or RPG setup welcome needs an intake-first
setup wizard, intake console, defaults surface, or HTML-to-XMLV3 rewrite parity
for panel/form/choices before authoring. Read
`../../references/world-engine-design.md` when the play engine depends on
factions, locations, relationship networks, lore-heavy settings, or world rules.
Read `../../references/longplay-design.md` when the task needs route memory,
progression phases, return-later behavior, or continuation probes. Read
`../../references/agency-design.md` when the system controls player actions,
feelings, consent, loyalty, courage, memories, or route choices. Read
`../../references/opening-design.md` when the first screen reads like a manual.
Read `../../references/token-economy.md` when stats, rulebooks, inventory, or
visual panels bloat `roleWelcome` or crowd out `roleDetailDesc`. Read
`../../references/playtest-loop.md` when the task includes simulation probes or
transcript triage. Read `../../references/card-authoring-templates.md` when the
packet must become field patch targets.

## Boundary

Do not call MCP tools from this skill. Do not patch real fields unless the author
explicitly continues through `lunatalk-card-author`.

Do not turn playability judgment into MCP validation or server gates. Rules,
resources, failure pressure, and state update quality belong in Moonloom writing
guidance.

## Workflow

1. Identify the play-engine failure: manual opening, too many stats, resources
   with no consequences, decorative inventory, forgotten state updates,
   failure-ending or failure-ignored routes, combat that overwhelms play, or
   quests with no cost/reward/memory.
2. Choose the smallest scope: light adventure, investigation/case,
   RPG/open-world, survival/horror, or simulator/management.
3. Define player position and controls: what the player can enter, risk, spend,
   refuse, retreat from, investigate, bargain with, unlock, carry, hide, or
   change.
4. Define what the card must not decide for the player: feelings, courage,
   loyalty, consent, memories, future actions, or commitments.
5. Write the core loop from visible state through renewed choice.
6. Build a compact state model with only fields that affect future choices.
7. Define resource rules: what each kept resource buys, saves, loses, or unlocks.
8. Define quest/risk routes with trigger, objective, approaches, pressure, cost,
   risk, reward/unlock, failure-forward outcome, memory, and renewed hook.
9. Write the turn protocol so every assistant turn resolves action, updates
   state, and offers meaningful next paths without playing the user.
10. Write failure-forward behavior and lethal-risk warnings.
11. Define progression phases, opening contract, field allocation, token plan,
    and play-engine probes.
    If the first screen needs setup controls, preserve a system intake packet:
    scene beat first, then sibling `panel`, `grid`, `form`, `bar`, `choices`,
    and preview-compatible `state` so XMLV3 carries the same play value as a
    rich HTML control surface.
12. Run self-review and hand off to the narrow next skill or authoring.

## Output format

Return:

```text
Play-engine packet:
- current failure:
- card shape:
- play promise:
- player position:
- player controls:
- card must not decide:
- core loop:
- compact state model:
- resource rules:
- quest / risk model:
- turn protocol:
- failure-forward behavior:
- progression phases:
- opening contract:
- state visibility:
- field allocation:
- token plan:
- simulation probes:
- handoff:

Self-review:
- every visible stat changes choices:
- state can update after each assistant turn:
- resources buy or cost something concrete:
- failure changes play without automatic dead end:
- turn protocol preserves player agency:
- opening is playable before it explains the full system:
- token spend favors reusable rules over lore:

Handoff:
- next skill:
- ready: yes | no
- missing input:
```

## Quality rules

- Do not solve RPG problems by adding a bigger rulebook. Cut to state and rules
  the model can run reliably.
- Do not keep stats, items, factions, quests, or combat rules unless they change
  available choices, cost, access, risk, reward, relationship, or route state.
- Always define failure-forward behavior. Ignored failure and instant dead end
  both make the loop weaker.
- Keep the state visible and compact enough to update after each assistant turn.
- The opening should prove the system through one playable setup or crisis, not
  explain the whole game.
- A simulator setup wizard should not become a left-heavy button pile or one
  flat scene. Use XMLV3 panel/form/choices structure and Theme V3 tones before
  tuning the writing logic.
- Preserve player agency. The system may pressure, warn, tempt, block, or price
  a route, but it must not write the user's next action or interior state.
- Keep output original and public-safe.

## Handoff

Hand the packet to:

- `lunatalk-card-author` when the author wants a real private card or patch and
  the play-engine packet is coherent.
- `lunatalk-opening-director` when the first screen still reads like a rule
  manual after the engine is clear.
- `lunatalk-world-engineer` when factions, locations, lore rules, or relationship
  networks need stronger play functions.
- `lunatalk-longplay-architect` when route memory, return-later behavior, or
  multi-session progression is still weak after the play engine is clear.
- `lunatalk-agency-designer` when the system writes player actions, feelings, or
  loyalty, or every route funnels to the same outcome.
- `lunatalk-token-architect` when rule, inventory, state, or visual bloat hides
  the engine in the wrong field.
- `lunatalk-chat-simulation` after authoring and validation when behavior,
  state updates, failure-forward play, or resources need real chat testing.
