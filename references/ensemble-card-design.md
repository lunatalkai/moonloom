# Moonloom Ensemble Card Design

Use this reference when a LunaTalk role card has multiple active speakers,
cast members, factions, suspects, crew members, roommates, party members, or
group-scene pressure. A strong ensemble card is not a list of characters. It is
a scene engine where several roles create choices without taking the player out
of the center.

## Core rule

Every core speaker must change play.

```text
cast member -> pressure move -> player choice -> group state change -> renewed hook
```

If a speaker only adds color, lore, banter, or exposition, merge them into
another role, demote them to a background mention, or delay their entrance.

## Ensemble packet

Return this packet before blueprinting, authoring, opening repair, voice
calibration, or simulation when the current problem is multi-character structure.

```text
Ensemble packet:
- current seed or failure:
- card shape:
- ensemble promise:
- cast scope:
- player role:
- player leverage:
- cast decision matrix:
  - [speaker]: function, want, fear/cost, speech cue, pressure move,
    player leverage, keep / merge / cut
- conflict network:
- turn ownership:
  - opening focus:
  - first speaker:
  - interrupter:
  - holder-back:
  - secondary entry rules:
  - max active speakers per turn:
  - when the player must be addressed:
- spotlight rules:
- group tension state:
- opening focus:
- voice contrast plan:
- talkExample decision:
- token plan:
- agency and simulation probes:
- cast members (multi-character story card, or "single-role" with reason):
  - [name]: aliases, sex, intro, persona focus, isPrimary
- field allocation:
- handoff:

Self-review:
- every core speaker changes play:
- player is not crowded out:
- opening is not a roll call:
- turn ownership is explicit:
- group tension is trackable:
- voices pass blind-line risk check:
- token spend is justified:
- next skill:
```

## Cast scope

Most ensemble cards should use 2-5 active core speakers.

- 2 speakers: use when the player is caught between a pair, rivalry, or double
  pressure.
- 3 speakers: default for mystery, crew, roommates, party, or faction-crossing
  cards. Enough contrast without heavy token cost.
- 4-5 speakers: keep only when every speaker has a different function and can
  change the player's choices.
- 6+ speakers: use only for explicit simulator or large-system cards. Otherwise
  split into routes, scenes, or secondary roles.

Keep a role when it has a unique function, pressure move, player leverage, and
voice. Merge when two roles want the same thing and pressure the player the same
way. Cut or demote when a role cannot change choice, route, risk, clue access,
relationship, faction stance, or boundary.

## Cast decision matrix

Use this before writing dialogue:

```text
Speaker | Function | Wants | Fears / cost | Speech cue | Pressure move | Player leverage | Keep / merge / cut
```

Useful functions:

- accuser: forces the player to take a side or test evidence
- protector: offers safety at a cost
- witness: knows a partial truth but cannot solve it alone
- rival: challenges competence, loyalty, or interpretation
- broker: opens a shortcut but creates debt
- skeptic: blocks easy consensus and demands proof
- dependent: creates stakes without removing agency
- wildcard: changes the group state when ignored

A good matrix makes cast conflict playable. Names and archetypes are not enough.

## Cast members on a multi-character story card

LunaTalk can store a story's characters as separate cast members (2-8) instead
of packing every character into `roleDetailDesc`. When the author's account can
use multi-character story cards, the matrix above becomes the cast list:

- one cast member per keep row: `name`, `aliases` for the names players will
  actually type, `sex`, a public `intro` one-liner, and a `persona` that holds
  that row's function, want, fear/cost, speech cue, pressure move, and player
  leverage
- mark at most one member `isPrimary`; `{{char}}` expands to that member
- the story itself stays on the card: `roleDesc` sells the situation,
  `roleDetailDesc` holds the story, the conflict network, turn ownership,
  group tension state, and route rules, and `roleWelcome` opens the scene
- merge and cut rows before writing members; a cut row must not become a
  member
- recurring side characters who speak more than once in a route (a landlord, a
  rival's second, a recurring witness) are worth adding as cast members so
  their lines are attributed and their voice stays stable. One-scene
  background characters stay as mentions in `roleDetailDesc`.

Persona budget: at most 1,500 tokens per member and 8,000 tokens across the
cast. Write the persona as behavior, not biography. Names must be unique in the
card (including aliases and simplified/traditional variants), contain no `【】`
or line breaks, and cannot be a narrator word such as `旁白` or `narrator`.

Multi-character story cards cannot bind an XMLV3 theme. If the card needs XMLV3
controls, keep it single-role and use the matrix inside `roleDetailDesc`.
When the account cannot use cast members (`cast_disabled`), fall back to the
same single-role layout.

## Speaker header lines

Cast cards mark who is speaking with plain-text header lines. Both the welcome
and the model's replies use the same format:

```text
暴雨把渡口的燈吹得一明一暗。
【沈鷺】
她把船票拍在桌上。「三張票，四個人。誰留下，你來決定。」
【阿遲】
「我可以游過去。」他笑著說，眼睛卻一直看著你。
【旁白】
最後一班船的汽笛響了第一聲。
```

- Before each character speaks, a line contains only `【名字】`, using a cast
  name or alias.
- Text before the first header is scene narration. `【旁白】` starts narration
  again after a character has spoken.
- Even a single speaker starts with their header line.
- No XML or HTML tags around headers.

Readers also accept a few common slips when the name is a known cast name or
alias: `名字：…` at the start of a line, `【名字】「…」` on one line,
`**【名字】**`, and `**名字**` only when it stands alone on its line or is
followed directly by `：`, `:`, or an opening quote. `**名字**走進來` is
narration, not a header. A bracketed line that is not a cast name, such as
`【狀態】`, never starts a speaker. Write the canonical form; do not rely on
the tolerated ones.

Put the header rule into `roleDetailDesc` as part of the card's output format
when the turn style matters, and show it in `talkExample` samples.

## Turn ownership

The model needs rules for who owns each turn. Without them, group scenes become
roll calls or multi-speaker monologues.

Define:

- opening focus: one speaker, one demand, one crisis
- first speaker: who creates the first player-facing pressure
- interrupter: who can cut in and why
- holder-back: who withholds information or watches for a specific trigger
- secondary entry rules: when another speaker enters the current scene
- max active speakers per turn: usually 1-2, rarely 3
- address rule: after cast conflict, a speaker must turn the pressure back to
  the player

Do not write long cast exchanges where the player only watches. A speaker may
interrupt another speaker only when it creates a clue, cost, risk, route, or
relationship shift for the player.

## Spotlight rules

Use one focal conflict per scene.

Strong spotlight patterns:

- triangle: two speakers disagree and the player can side, mediate, test, or
  walk away
- relay: one speaker reveals pressure, another complicates it, then the player
  decides what to do
- withheld seat: one speaker stays silent until the player asks, accuses, or
  reveals something
- split route: the player can follow one speaker and lose or delay access to
  another
- group cost: helping one speaker changes trust, suspicion, access, or danger
  for the rest

Weak patterns:

- every speaker greets the player
- every speaker states a personality trait
- speakers debate each other for paragraphs before inviting a player response
- the player can only observe, admire, comfort, or obey the group

## Group tension state

Track only state that changes future turns. Good group state includes:

- suspicion
- alliance
- trust / distance per speaker or faction
- clue access
- promise, debt, threat, or favor
- hidden accusation
- route split
- unresolved boundary or refusal

Keep it compact. The card does not need a full relationship table unless those
values change routes.

## Opening policy

The welcome should not introduce the full cast. Start with:

- one place and time
- one focal speaker action
- one visible group pressure
- one reason the player matters now
- 2-4 reply paths that change clue, trust, risk, access, alliance, or boundary
- one second-turn move that updates group tension

The rest of the cast can enter by interruption, evidence, noise, absence, a door
opening, a message, or a consequence of the player's first action.

On a multi-character story card, write the opening with speaker header lines:
narration first, then `【名字】` before the focal speaker. A second speaker may
enter only when it changes the pressure. Every header name must be a cast
name or alias; remove a member's headers from the welcome before removing the
member.

## Voice and talkExample

Voice contrast starts from motive and pressure, not punctuation.

For each core speaker, define:

- private motive
- fear or cost
- sentence rhythm
- vocabulary or address style
- action beat while speaking
- pressure move
- refusal or slowdown style

Add `talkExample` only when compact rules cannot preserve a speaker's voice or
turn style. Prefer one micro-sample per weak or easily blurred core speaker.
Each sample should teach how the speaker handles pressure and how they differ
from the others. Cut repeated lore or decorative banter to pay for samples.

## Field allocation

- `roleDesc`: group situation, player role, and immediate ensemble pressure.
- `cast` (multi-character story card): one member per kept speaker; each
  `persona` carries that speaker's matrix row and voice; `intro` is the public
  one-liner.
- `roleDetailDesc`: the story and relationships: conflict network, turn
  ownership, group tension state, player agency boundaries, route rules, and
  the speaker header rule. On a single-role card it also holds the cast
  decision matrix and voice contrast.
- `roleWelcome`: one focal crisis, not the whole cast manual. On a cast card,
  use speaker header lines.
- `talkExample`: compact micro-samples only for weak voices or turn format.
- XMLV3 / Theme V3: single-role ensemble cards only. Show current speaker,
  state, clue, choice, or tension only when it helps the player act.

## Testing

Use manual probes before paid simulation. Use real LunaTalk simulation only after
the role exists privately, passes technical validation, and the author accepts
normal chat cost.

Probe:

- side with the least trusted speaker
- refuse the obvious group demand
- accuse the focal speaker
- ask the quiet speaker directly
- stay passive or give minimal input
- set a boundary or leave the room

Pass criteria:

- cast members do not keep debating while ignoring the player
- the card does not decide the player's feelings, loyalty, consent, or actions
- at least three reply paths change state, clue access, suspicion, alliance,
  risk, relationship, boundary, or route
- refusal and passivity keep play alive
- blind-line checks can identify the core speakers without names
- on a cast card, every speaking turn starts with a `【名字】` header for a
  cast name, and narration does not borrow a character's header

