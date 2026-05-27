# Moonloom Creation Workflow

Use this reference when an agent needs an end-to-end route from an author's seed
to a private LunaTalk role card, validation, render review, simulation, iteration,
and possible public submission. This is the runway for the whole workflow; it
does not replace narrow Moonloom craft skills.

```text
author seed -> runway packet -> narrow skill queue -> field assembly -> MCP actions
-> validation -> render review -> optional simulation -> iteration -> publish readiness
```

## Runway principle

Move one bottleneck at a time. A complete card workflow is not the same as doing
every possible skill. Choose the first missing layer, preserve its packet, and
continue only when that layer is coherent enough for the next step.

Do not call Card Writer MCP tools while the card still lacks a playable premise,
player position, first-scene pressure, or obvious safety posture. Do not claim a
private card is complete while avatar/background URLs are missing. Do not run a
paid simulation until validation is ready and the author accepts the cost.

## Stage Ladder

| Stage | Purpose | Primary handoff | Stop if |
|---|---|---|---|
| Intake | define author goal, language, rating intent, materials, and output mode | `using-moonloom` or conductor packet | goal is not a role-card task |
| Premise | turn vague mood/trope into a playable direction | `lunatalk-premise-workshop` | no role/player/tension choice exists |
| Contract | choose primary card type and overlays | `lunatalk-archetype-director` | hybrid has no primary contract |
| Source / originality | convert files or inspiration safely | `lunatalk-material-distiller`, `lunatalk-originality-adapter` | source is too raw or copy risk is unresolved |
| Engine | build the card's behavior loop | character, relationship, world, daily-life, scenario, play, generator, ensemble skills | engine packet is generic or contradictory |
| Interaction | make the player matter | `lunatalk-tension-weaver`, `lunatalk-agency-designer`, `lunatalk-opening-director`, `lunatalk-longplay-architect` | first reply or second-turn move is unclear |
| Voice / examples | make behavior executable | `lunatalk-voice-director`, `lunatalk-talk-example-curator`, `lunatalk-language-stylist` | voice cannot survive pressure |
| State / token / presentation | control memory, budget, and render shape | `lunatalk-state-economist`, `lunatalk-token-architect`, `lunatalk-presentation-director` | durable rules are in the wrong field |
| Profile / visual | package first impression and assets | `lunatalk-profile-packager`, `lunatalk-visual-identity-director` | profile is vague or assets are prompt-only |
| Quality gate | decide whether to author | `lunatalk-quality-auditor` | first three repairs are unresolved |
| Field assembly | create final fields or patch plan | `lunatalk-card-author` | required packet is missing |
| MCP readiness | verify client/tool/action safety | `lunatalk-mcp-operator` | tools/auth/stage gate are not ready |
| Private card | create/patch real private card | Card Writer MCP through `lunatalk-card-author` | role is public or not owned |
| Validation | check technical blockers and tokenBudget | `validate_role` | blockers remain |
| Render review | inspect XMLV3/HTML/Theme V3 output | `lunatalk-render-review` | action path or readability fails |
| Conversation test | test behavior through real chat pipeline using MCP conversation tools | `lunatalk-chat-simulation` | author has not accepted normal cost |
| Iteration | choose exactly one next repair | `lunatalk-iteration-director` | evidence is missing or mixed |
| Publish | submit only after explicit confirmation | `lunatalk-publish-readiness`, `publish_submit` | author confirmation is missing |

## Creation Runway Packet

Return this packet before narrow work when the author asks for end-to-end help,
is unsure where to start, or wants the AI client to coordinate the whole flow.

```text
Creation runway packet:
- current request:
- output mode: brainstorm | draft-only | MCP-backed private card | patch existing role | publish-readiness
- author goal:
- language / locale:
- content rating intent:
- available inputs:
- known decisions:
  - premise:
  - player role:
  - card type:
  - first scene:
  - visual asset status:
- missing decisions:
- first bottleneck:
- skill queue:
  - now:
  - next:
  - later:
- MCP stance:
  - calls now: yes | no
  - required tools:
  - asset requirement:
  - validation/render/simulation stance:
- cost / public-action warnings:
- do not do yet:
- stop criteria:
- handoff:
```

## Route Patterns

Vague seed:

```text
using-moonloom -> lunatalk-creation-conductor -> lunatalk-premise-workshop
```

Prepared packet stack:

```text
using-moonloom -> lunatalk-creation-conductor -> quality audit or card author
```

External client wants a real private card:

```text
creation conductor -> mcp operator -> card author -> role_create_private
-> role_patch_profile/assets/detail/welcome -> validate_role -> render_preview
```

After evidence exists:

```text
creation conductor -> iteration director -> one repair -> validate/render/conversation test as needed
```

## Guardrails

- Use language-aware hard caps as ceilings, not targets: 50,000-character
  English `roleDetailDesc`, 10,000-character non-English `roleDetailDesc`,
  10,000-character English `roleWelcome`, and 3,000-character non-English
  `roleWelcome`. Expand only behavior-bearing detail.
- Keep source material as source-to-play maps, not pasted lore.
- Preserve author feedback in the agent conversation; do not invent comment
  systems or separate review ledgers.
- Use `role_patch_assets` only when real public-safe avatar/background URLs are
  available. Prompt-only assets are a handoff, not completion.
- Use `conversation_send_message` only after validation is ready and the author
  accepts normal chat billing; use `conversation_inspect` after each accepted
  message to evaluate history and message previews.
- Use `publish_submit` only after explicit author confirmation in the agent
  conversation.
- Do not turn Moonloom craft judgment into hidden MCP or server gates.

## Completion Check

An end-to-end private-card workflow is complete only when:

- the selected premise, card contract, engine, interaction loop, voice, opening,
  longplay, boundary, token, presentation, profile, and visual asset decisions
  are either present or intentionally omitted with a reason
- final role fields are assembled or patched
- avatar/background URLs are patched when MCP-backed creation is claimed
- `validate_role` has no blockers
- render review has no unresolved readability or action-path failure
- simulation is either run with accepted cost or explicitly deferred
- remaining risks and next iteration are stated
