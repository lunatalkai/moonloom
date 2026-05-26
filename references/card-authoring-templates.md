# Moonloom Card Authoring Templates

Use these templates after choosing the card shape. They are scaffolds, not
finished prose. Replace every bracketed field with concrete card content.

## Universal draft packet

Before calling mutating MCP tools, draft this packet:

```text
Card shape:
Language:
Content rating intent:
Boundary packet:
- rating intent:
- explicitness ceiling:
- premise risk:
- player agency contract:
- escalation ladder:
- refusal / slowdown behavior:
- stop conditions:
- safer fallback:
Player role:

Promise:
- fantasy:
- relationship:
- central tension:

Character-core packet:
- current failure:
- appeal promise:
- role identity:
- desire:
- contradiction:
- boundary:
- mask:
- wound / need:
- player leverage:
- relationship asymmetry:
- pressure behavior:
- interaction hooks:
- token tradeoff:

World-engine packet:
- current failure:
- world promise:
- card shape:
- player position:
- scope:
- core world rule:
- playable slice:
- active pressure:
- relationship / faction network:
- locations:
- resources / clocks / costs:
- state model:
- route seeds:
- exposition policy:
- token tradeoff:

Voice-director packet:
- current failure:
- voice promise:
- role / speaker scope:
- prerequisite core repair:
- social surface:
- private motive:
- pressure behavior:
- sentence rhythm:
- vocabulary:
- address terms:
- emotional tells:
- action beats:
- concealment:
- refusal style:
- never says:
- catchphrase policy:
- response-mode grid:
- talkExample decision:
- blind-line test:
- pressure probes:
- field patch targets:
- token tradeoff:

Agency packet:
- current failure:
- agency promise:
- prerequisite repair:
- player role:
- player insertion space:
- player controls:
- player can refuse:
- player can change:
- card must not decide:
- interaction hooks:
- agency guardrails:
- reply-path matrix:
- compact state:
- passive-player behavior:
- boundary handling:
- consequence checks:
- field patch targets:
- token tradeoff:

Engine:
- role desire:
- contradiction:
- boundary:
- player leverage:
- pressure behavior:
- world rule:
- world state:
- route seeds:
- voice fingerprint:
- voice calibration need:
- proactive behavior:
- consequence loop:

Play:
- first scene:
- first reply path:
- expected first user message:
- expected second-turn move:

Opening packet:
- current failure:
- opening promise:
- place / time:
- role action already happening:
- pressure:
- player implication:
- reply paths:
- expected first user message:
- second-turn move:
- what changes:
- token tradeoff:

Longplay packet:
- continuity spine:
- progression phases:
- state model:
- route seeds:
- memory threads:
- role initiative:
- passive / stalled player behavior:
- scene renewal rules:
- continuation probes:
- token tradeoff:

Presentation:
- welcome mode: plain | xmlv3 | html
- Theme V3 need:
- visible state or choices:

Token plan:
- roleDesc target:
- roleDetailDesc target:
- roleWelcome target:
- what to cut first:
```

## Source-to-play handoff packet

Use after `lunatalk-material-distiller` has processed notes, files, drafts, or a
large world bible.

```text
Material inventory:
- [source name/type]: [play function]

Playable promise:
- fantasy:
- player role:
- central tension:

Kept modules:
- durable rule:
- character/relationship engine:
- state or consequence:
- voice anchor:

Opening slice:
- location:
- immediate pressure:
- role action:
- player implication:

Delayed / cut:
- delay:
- cut:

Token plan:
- roleDesc:
- roleDetailDesc:
- roleWelcome:
- talkExample:
- cut first:

Ready for:
- blueprint: yes | no
- authoring: yes | no
```

## `roleDesc` patterns

Use one compact sentence. It should make the player understand the card in three
seconds.

```text
[Player role] is pulled into [situation] with [role/system], where [tension]
forces [play loop].
```

```text
[Role] needs [player leverage] before [external pressure] breaks [relationship,
secret, mission, or world rule].
```

For daily-life cards:

```text
You keep meeting [role] during [ordinary routine], where [small pressure] slowly
turns [relationship or habit] into [play loop].
```

For RPG/system cards:

```text
Lead [player position] through [world/system], managing [resources] and [risk] as
choices change [state or route].
```

## `roleDetailDesc` section template

Use headings or compact labels. Keep durable rules here, not in welcome.

```text
Core premise
- [One paragraph that restates the playable promise.]

Player position
- [Who the player is.]
- [What the player controls.]
- [What the player does not control.]
- [What the player can enter, refuse, change, risk, spend, carry, reveal, hide,
  or unlock.]

Agency and interaction
- player insertion space:
- interaction hooks:
- reply-path matrix:
- consequence checks:
- passive-player behavior:
- boundary handling:

Role identity
- [Who the role is.]
- [What they want.]
- [What they fear, hide, owe, or refuse.]
- [What makes the role memorable beyond a trope or mood label.]

Contradiction and boundary
- [Contradiction that creates tension.]
- [Boundaries and pacing rules.]
- [What the role must not decide for the player.]

Player leverage and pressure behavior
- [What the player knows, controls, withholds, risks, or changes.]
- If the player trusts them, [role behavior and what changes].
- If the player questions or resists, [role behavior and what changes].
- If the player is passive, [role initiative and renewed hook].
- If the player sets a boundary, [refusal style and alternate route].

World engine
- core world rule:
- playable slice:
- active pressure:
- faction / relationship network:
- active locations:
- resources / clocks / costs:
- state model:
- exposition policy:

Voice fingerprint
- sentence rhythm:
- vocabulary:
- address terms:
- emotional tells:
- avoided phrasing:
- refusal style:

Proactive behavior
- If the player is passive, [role action].
- If the player resists, [role action].
- If the player cooperates, [role action].
- If the scene stalls, [new hook].

Progression and consequence
- state that changes:
- what raises it:
- what lowers it:
- what it unlocks:

Routes
- route 1:
- route 2:
- route 3:

Longplay engine
- continuity spine:
- progression phases:
- memory threads:
- role initiative:
- scene renewal rule:

Do / Avoid
- Do:
- Avoid:
```

## `roleWelcome` scene template

Use for companion, story, daily-life, romance, and ensemble cards.

```xml
<scene>
  <state>{"location":"[place]","time":"[time]","tension":"[short state]"}</state>
  <n>[Sensory opening tied to place/time.]</n>
  <n>[Role action already in progress.]</n>
  <speaker>[Role name]</speaker>
  <d>[Dialogue that reveals pressure and invites response.]</d>
  <n>[Player implication: why the player matters now.]</n>
  <choice>[Concrete action option 1]</choice>
  <choice>[Concrete action option 2]</choice>
  <choice>[Concrete action option 3]</choice>
</scene>
```

Do not use choices as a substitute for scene. The scene must already contain
place, role action, pressure, and player implication.

## Opening repair packet

Use when a current welcome is greeting-only, overloaded, hollow, or unclear.

```text
Current failure:
Opening promise:
Player role:
Five beats:
- place / time:
- role action already happening:
- pressure:
- player implication:
- reply paths:
Expected first user message:
Second-turn move:
What changes:
Welcome mode:
Token tradeoff:
- keep in welcome:
- move to roleDetailDesc:
- move to XMLV3/Theme V3:
- cut:
Ready for role_patch_welcome: yes | no
```

Do not repair a flat welcome by adding more exposition. Add a playable scene, a
first reply path, and a second-turn move.

## System / RPG welcome template

```xml
<scene>
  <state>{"mode":"setup","resources":{"[key]":"[value]"},"risk":"[level]"}</state>
  <n>[One-sentence premise and immediate situation.]</n>
  <n>[What the player controls and what pressure is active.]</n>
  <form>
    <input name="[field]" label="[setup field]" />
    <radio name="[mode]" label="[mode choice]" options="[option A]|[option B]|[option C]" />
  </form>
  <choice>[Start with default setup]</choice>
  <choice>[Ask for a custom setup]</choice>
  <choice>[Jump into the first crisis]</choice>
</scene>
```

The system should proceed with defaults if the player gives minimal input.

## Ensemble cast template

Use no more than five core roles unless the card is explicitly a large simulator.

```text
Cast
- [Name]: motive, player relationship, speech cue, conflict with another cast
  member, what they do under pressure.
- [Name]: motive, player relationship, speech cue, conflict with another cast
  member, what they do under pressure.

Turn ownership
- Opening focus:
- Who interrupts:
- Who hangs back:
- When secondary roles enter:
```

The welcome should start with one focal crisis. Do not introduce the full cast in
a roll call.

## Voice calibration packet

Use when a card has a strong persona, a delicate speaking style, or an ensemble
cast whose voices may blur together.

```text
Current failure:
Voice promise:

Voice cards
- [Name]:
  - rhythm:
  - vocabulary:
  - address terms:
  - emotional tells:
  - action beats:
  - concealment:
  - refusal style:
  - never says:
  - if player is passive:
  - if player resists:
  - if player trusts them:

Response-mode grid
- trust:
- question:
- resist:
- passive:
- boundary:

Catchphrase policy:

Ensemble contrast
- [Name]: wants, fears, speech cue, pressure move, player leverage
- [Name]: wants, fears, speech cue, pressure move, player leverage

Blind-line test
- anonymous line 1:
- anonymous line 2:
- anonymous line 3:
- can identify speakers: yes | no

Talk example need
- no example needed because:
- add micro-sample for:
- cut elsewhere to pay tokens:

Pressure probes
- trust:
- question:
- resist:
- passive:
- boundary:
```

For ensemble cards with three or more core speakers, add one compact micro-sample
per core role if the cast voices are not already unmistakable in `roleDetailDesc`.
Each sample should teach pressure behavior, not just a catchphrase.

## Boundary-sensitive template

Use when the card is mature, emotionally intense, horror-leaning, or otherwise
likely to need pacing and consent clarity.

```text
Rating intent:
Explicitness ceiling:
Premise risk:
Player agency contract:
Allowed tension:
Allowed pressure tools:
Disallowed moves:
Escalation ladder:
Player refusal handling:
Role refusal style:
Stop conditions:
What the role may invite:
What the role must not decide:
Safer fallback:
First-scene guardrails:
Simulation probes:
```

The role can create pressure while still preserving player agency. If the player
sets a boundary, the role should react in character and keep the scene playable.

## Self-review packet

Before render or simulation, answer:

```text
Promise: pass | revise because ...
Anchor: pass | revise because ...
Voice texture: pass | revise because ...
Voice calibration: pass | revise because ...
Consequence: pass | revise because ...
Role initiative: pass | revise because ...
Agency: pass | revise because ...
Agency design: pass | revise because ...
Opening scene: pass | revise because ...
Longplay: pass | revise because ...
Player agency: pass | revise because ...
Boundary design: pass | revise because ...
Archetype fit: pass | revise because ...
Token efficiency: pass | revise because ...

Expected first user message:
Expected second-turn move:
Cut if too long:
```

If any item says `revise`, patch the draft before calling render or simulation.
