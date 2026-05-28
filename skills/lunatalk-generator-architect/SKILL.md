---
name: lunatalk-generator-architect
description: Use when a LunaTalk role-card task involves generator, creator-assistant, helper, artifact-producing, intake/defaults, output schema, revision commands, advice-only drift, endless intake, or diegetic creator cards before blueprinting, authoring, simulation, or publish readiness.
---

# LunaTalk Generator Architect

Use this skill when the card's weak layer is artifact creation. The output is a
generator packet: a concrete artifact loop with intake, defaults, output schema,
revision operations, quality rubric, and simulation probes.

## Required References

Read `../../references/generator-design.md` first. Read
`../../references/archetype-contracts.md` when the task needs generator vs
companion/story/RPG/system classification. Read `../../references/opening-design.md`
when the intake welcome is vague or too long. Read
`../../references/system-intake-card-design.md` when the generator needs an
intake-first setup wizard, intake console, defaults surface, or HTML-to-XMLV3
panel/form/choices parity before field assembly. Read
`../../references/voice-calibration.md` when the generator has a diegetic persona
or drifts into generic assistant voice. Read `../../references/token-economy.md`
when the schema, examples, or forms bloat `roleWelcome`. Read
`../../references/playtest-loop.md` when planning simulation probes or transcript
triage. Read `../../references/card-authoring-templates.md` when the packet must
be preserved for field assembly.

## Boundary

Do not call MCP tools from this skill. Do not create, patch, validate, render,
simulate, or publish a real role from this skill.

Use `lunatalk-play-engineer` instead when the main loop is stats, resources,
quests, combat, turn protocol, or simulator state. Use `lunatalk-scenario-architect`
instead when the main loop is a branchable incident. Use
`lunatalk-archetype-director` first when the author is still deciding whether the
generator is primary or only an overlay.

Do not present generator design as unsupported origin or performance analysis.
Keep output original and public-safe.

## Workflow

1. Confirm this is a generator task: artifact output, creator assistant,
   helper mode, intake/defaults, output schema, revision commands, or advice-only
   drift.
2. Identify artifact type, player role, creator persona, and whether generator is
   the primary contract or an overlay.
3. If primary contract is unclear, route to `lunatalk-archetype-director` first.
4. Define the artifact contract: what every output must include, may include,
   and must not include.
5. Design intake with defaults: required inputs, optional inputs, default
   assumptions, when to ask, and when to proceed.
   If the intake is a visible setup wizard or console, use
   `system-intake-card-design.md` to map the first screen into XMLV3 `panel`,
   `form`, `grid`, `bar`, and `choices` before authoring prose.
6. Build the output schema and quality rubric.
7. Define named revision operations and what each operation preserves.
8. Define artifact memory and `continue` behavior.
9. If diegetic, define creator persona and how the role stays in character while
   producing useful artifacts.
10. Design the opening contract, field allocation, token plan, and simulation
    probes.
11. Run self-review and hand off to authoring, opening repair, voice calibration,
    token repair, or simulation.

## Output Format

Return:

```text
Generator packet:
- current seed or failure:
- generator promise:
- card shape:
- artifact type:
- player role:
- creator persona:
- artifact contract:
  - artifact must include:
  - artifact may include:
  - artifact must not include:
- intake surface:
  - required inputs:
  - optional inputs:
  - defaults:
  - when to ask:
  - when to proceed:
- output schema:
  - sections:
  - ordering:
  - length target:
  - formatting rules:
- revision operations:
  - [operation]:
    - trigger:
    - effect:
    - preserves:
- quality rubric:
- artifact memory:
- refusal / constraint handling:
- diegetic mode:
- opening contract:
- field allocation:
  - roleDesc:
  - roleDetailDesc:
  - roleWelcome:
  - talkExample:
  - XMLV3 / Theme V3:
- token plan:
- simulation probes:
- handoff:

Self-review:
- produces one usable artifact:
- defaults prevent endless intake:
- schema is stable:
- revision commands preserve constraints:
- artifact has use beyond advice:
- player agency preserved:
- diegetic voice preserved if relevant:
- token tradeoff:
- no MCP calls:
- public-safe:
```

## Quality Rules

- The card should produce a usable artifact when the player gives enough input or
  accepts defaults.
- Do not let setup questions become the whole experience. Ask only for details
  that change the artifact.
- Do not flatten a generator intake console into one XMLV3 scene. When the
  welcome needs controls, use system-intake structure: scene first, then sibling
  panel/form/choices/state blocks with defaults and one default-start action.
- Do not answer with generic advice when the player asked for an artifact.
- Keep schema stable enough that the player can revise by section.
- Named revision operations should preserve the player's constraints and the
  previous artifact unless the player asks to replace them.
- A diegetic creator can have personality, limits, and warnings, but usefulness
  comes first.
- Do not make the generator decide the player's taste, feelings, consent, or
  future action. It can suggest defaults and ask permission.
- Keep output original and public-safe.

## Handoff

Hand the packet to:

- `lunatalk-card-author` when the author wants field-ready draft assembly or a
  real private role after the generator packet is coherent.
- `lunatalk-opening-director` when the intake welcome still stalls, asks too many
  questions, or lacks a default-start path.
- `lunatalk-voice-director` when diegetic creator voice or output-format voice is
  weak.
- `lunatalk-token-architect` when schema, examples, or visual intake controls
  bloat the wrong field.
- `lunatalk-chat-simulation` after authoring and validation when artifact output,
  revision behavior, defaults, or continuity need real chat testing and the
  author accepts normal billing.
