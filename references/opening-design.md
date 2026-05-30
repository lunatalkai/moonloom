# Moonloom Opening Design

Use this reference when a LunaTalk role card needs a stronger `roleWelcome`,
first screen, first user reply path, or second-turn engine. The opening is not a
greeting. It is the card's first playable contract.

## Core rule

Design the first two turns together:

```text
Opening scene -> likely first user reply -> role second-turn move -> changed state
```

A good opening does three jobs at once:

- shows the player where they are
- puts the role in motion before the player speaks
- gives the player a clear next action that can change the scene

For plot-driven, scenario, mystery, RPG, system, or meta-narrative cards, the
opening also needs an inciting incident. Within the opening or the first 1-2
assistant turns, the role, narrator, system, or world should expose an external
goal: a destination, task, clue, threat, deadline, authority demand, or rule
conflict that gives the main line somewhere to go. The player chooses how to
respond; do not make the player invent the main objective.
External goal must be visible before the opening can be considered complete.

## Opening packet

Return this packet before patching `roleWelcome`:

```text
Opening packet:
- current failure:
- opening promise:
- player role:
- place / time:
- role action already happening:
- pressure:
- player implication:
- reply paths:
  - authority opposition axis when relevant:
- expected first user message:
- second-turn move:
- what changes:
- renewed hook:
- state visibility:
- welcome mode:
- token tradeoff:
```

This packet should be concrete enough that `lunatalk-card-author` can patch the
welcome without rereading the whole design conversation.

## The five beats

Every narrative opening needs these beats:

1. **Place/time:** where and when the player is.
2. **Role action:** what the role is already doing.
3. **Pressure:** why this moment starts now.
4. **Player implication:** why the player matters.
5. **Reply path:** what the player can do next.

If any beat is missing, the opening usually becomes a generic prompt, menu, or
lore paragraph.

## Opening legibility gate

Before mood, metaphor, or named lore, the first two lines must make the 4-W
legible: Who is acting, Where the player is, When this is happening, and What
problem is already in motion. Use concrete nouns and concrete objects the player
can point at, take, refuse, inspect, open, hide, or question.

Reject a mood-first opening when it feels pretty but unclear,雲裡霧裡, or asks
the player to decode invented terms before they know what they can do. One
invented noun is fine only if the same first screen explains its playable
function through an object, risk, or choice.

## First reply path

The player should be able to write a first reply in under ten seconds. Use one or
more of these affordances:

- a direct question
- a concrete object to inspect, take, refuse, fix, hide, open, or break
- a role demand, offer, confession, warning, or mistake
- 2-4 choices that are consequences, not decorative menu labels
- a setup form only when the card is a system/RPG/generator

Do not ask "what do you want to do?" unless the scene already gives obvious
things to do.

If the opening sets up player vs narrator, system, rule, institution, fate, or
NPC authority, make the first option set carry an authority opposition axis.
Include at least one obey/comply/順從 path and at least one resist/oppose/對抗
path. In short: at least one obey/comply option and at least one resist/oppose
option. Keep the tone axis separate: jokes, sarcasm, or chaos are only tone unless
they actually resist the authority.

## Second-turn engine

Before finalizing, write one likely first user message and the role's next move.
The role's second turn should do at least one:

- react to the player's choice
- reveal a specific truth
- complicate the situation
- update relationship, risk, route, resource, or trust
- offer a new route
- ask a sharper question
- move a practical problem forward

If the second turn can only restate the premise, the opening is still weak.

## Mode recipes

### Companion / relationship

- Start at the moment a mask cracks, a promise is tested, or a private pressure
  becomes visible.
- Let the role act first: arriving late, hiding something, asking for a term,
  leaving a message half-written, refusing to look away.
- Give the player social agency: invite, refuse, ask, comfort, confront, set
  terms, leave, or change the subject.

### Daily-life / slice-of-life

- Use an ordinary routine with one small disruption.
- Make the first action natural: help, notice, tease, offer, hide, ask, or break a
  tiny pattern.
- Progression should come from repeated objects, habits, weather, time, or small
  disclosures.

### Story / mystery / scenario

- Begin inside an ongoing problem, not at the exposition desk.
- Put one clue, risk, location, or social consequence in front of the player.
- The second turn should create a branch: pursue, hide, accuse, protect, bargain,
  or investigate.

### RPG / open world / simulator

- Put setup and action on the same first screen.
- If choices are needed, tie each to a resource, risk, route, or state update.
- The system should proceed with defaults if the player gives minimal input.

### Generator / creator assistant

- The opening should offer an intake surface and defaults.
- The first normal user message should produce an artifact, not only more
  questions.
- The second turn should revise, format, expand, compress, or convert the
  artifact.

### Ensemble

- Start with one focal conflict. Do not introduce the full cast in a roll call.
- Define who speaks first, who interrupts, and who hangs back.
- The player must have a way to affect group tension instead of watching dialogue.

## XMLV3 opening scaffold

Use XMLV3 when structure helps the first screen:

```xml
<scene>
  <state>{"location":"[place]","time":"[time]","pressure":"[short pressure]"}</state>
  <n>[Sensory opening tied to the current place/time.]</n>
  <n>[Role action already in progress.]</n>
  <d>[Dialogue that reveals pressure and invites response.]</d>
  <n>[Why the player matters now.]</n>
  <choice>[Action with consequence 1]</choice>
  <choice>[Action with consequence 2]</choice>
  <choice>[Action with consequence 3]</choice>
</scene>
```

Use choices only after the scene exists. Choices cannot replace place, action,
pressure, or player implication.
For a single-speaker opening, omit `<speaker>`; use it only when the visible
turn needs to mark a speaker switch in a multi-speaker scene.

## Failure repairs

| Failure | Repair |
|---|---|
| Greeting-only opening | add five beats and a second-turn move |
| Lore before action | move durable lore to `roleDetailDesc`; open on one active problem |
| Menu with no scene | add place, role action, pressure, and player implication before choices |
| Pretty mood with no task | add a concrete object, decision, risk, or route |
| Mood-first / 雲裡霧裡 opening | rewrite the first two lines with 4-W, concrete nouns, and one immediate object or decision |
| Role waits for player to invent plot | add proactive role action and passive-player behavior |
| Welcome too long | cut backstory, keep immediate pressure and reply path |
| System/RPG manual | expose defaults, state, and first crisis together |
| Ensemble roll call | choose one focal speaker and one group pressure |

## Opening self-review

Before handoff, answer:

- Can the player reply in under ten seconds?
- Does the role act before the player speaks?
- Is the pressure visible on the first screen?
- Does the player have at least two meaningfully different reply paths?
- Does the expected second turn change state, relationship, risk, route, or
  information?
- Is the welcome shorter than the durable engine unless it is an interactive
  setup?
- Does the opening avoid deciding the player's feelings, actions, or consent?
