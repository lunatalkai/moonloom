# Synthetic Card Briefs

Use these fictional briefs to test whether Moonloom can create playable LunaTalk
role cards. They are not finished cards; they are pressure tests for authoring,
validation, rendering, and simulation.

## How to use these briefs

Use these as a public-safe regression benchmark after changing Moonloom guidance
or the Card Writer MCP:

1. Pick one brief and create a private card with the matching `cardType`.
2. Run Moonloom self-review against the quality checks below.
3. Run `validate_role`; fix technical blockers.
4. Run `render_preview`; fix `evaluation` warnings and inspect `previewUrl` when
   browser or multimodal review is available.
5. Run `simulate_private_chat` with the listed probes if normal billing is
   acceptable.
6. A benchmark pass means Moonloom self-review passes, validation has no blockers,
   render evaluation passes, simulation evaluation passes, and the result stays
   within a reasonable token budget for its archetype.

Do not treat the text below as card content to copy. Each run should produce a
fresh original card.

## Brief 1: Quiet Relationship Tension

Goal: Create a companion/relationship card with strong emotional immediacy.

Author prompt:

```text
I want a card about a reserved childhood friend who suddenly appears outside my
apartment on a rainy night. They clearly need help but refuse to explain why.
The mood should be intimate, tense, and slow-burn, not melodramatic.
```

Quality checks:

- The first scene starts in motion and gives the player an obvious first reply.
- The role has a contradiction: guarded behavior, visible need.
- The detail defines speech style, boundaries, pacing, and relationship history.
- The loop can continue through trust, secrets, and changed living arrangements.

Simulation probes:

- "I open the door but do not invite you in yet. What happened?"
- "I say I cannot help unless you tell me the truth."

## Brief 2: Living Academy

Goal: Create a story/scenario card with a durable setting and branching routes.

Author prompt:

```text
Build a magical academy where the school itself changes rooms overnight. I am a
new transfer student assigned to a mentor who knows more than they admit.
```

Quality checks:

- The player role, starting location, mentor dynamic, and first danger are clear.
- The setting has rules that can generate new scenes without a lore dump.
- The detail includes 2-4 likely routes and consequences.
- XMLV3 or Theme V3 may be used if it helps show state or atmosphere.

Simulation probes:

- "I ignore the mentor and follow the moving staircase alone."
- "I ask the mentor why everyone avoids the west corridor."

## Brief 3: Compact RPG Loop

Goal: Create an RPG/open-world card that is playable without becoming a manual.

Author prompt:

```text
Make a compact dark-fantasy expedition card. I lead a small crew into a city
buried under ice. I want choices, risk, supplies, discoveries, and consequences.
```

Quality checks:

- The workflow creates or preserves a play-engine packet before authoring.
- The welcome exposes setup or first choices without burying the scene.
- The detail separates core rules, crew behavior, resources, danger, and rewards.
- State is compact and designed to update after every assistant turn.
- Resources, supplies, risk, discovery, and failure-forward outcomes affect
  available choices.
- The turn protocol resolves the player's action, updates state, narrates the
  result, and renews the next hook.
- The role does not play the user's actions.

Simulation probes:

- "We burn extra fuel to reach the gate before nightfall."
- "I send the scout ahead but keep the medic near me."

## Brief 4: Creator Assistant

Goal: Create a generator/assistant card that drives the user toward a finished
artifact instead of chatting vaguely.

Author prompt:

```text
I want a card that helps me design original festival rituals for fantasy towns.
It should ask useful intake questions, then produce polished rituals with hooks,
symbols, conflicts, and scene prompts.
```

Quality checks:

- The card has an intake loop, output schema, revision loop, and quality rubric.
- The welcome asks for enough information but offers defaults.
- The assistant produces artifacts, not only advice.
- The output format is stable across turns.

Simulation probes:

- "Make one for a seaside town that fears the moon."
- "Now turn it into a conflict scene for a player party."

## Brief 5: Quiet Daily Loop

Goal: Create a slice-of-life card where low-stakes interaction still has tension
and progression.

Author prompt:

```text
Make a card about a neighbor who always waters the rooftop plants before dawn.
I keep meeting them there because I cannot sleep. The mood should be quiet,
specific, and emotionally observant, not dramatic.
```

Quality checks:

- The role has a small but concrete desire.
- The first scene gives the player a natural action within an ordinary routine.
- The loop can progress through habit, trust, shared objects, and small
  disclosures.
- The card avoids turning quiet mood into empty small talk.

Simulation probes:

- "I bring two cups of coffee but pretend one is extra."
- "I ask why you always come up here before sunrise."

## Brief 6: Heavy Setting Without Lore Dump

Goal: Create a lore-rich card whose first scene remains immediately playable.

Author prompt:

```text
Build a city where every district is ruled by a different calendar. I am a courier
who can cross district borders, and someone gives me a sealed letter that expires
at midnight in three incompatible time systems.
```

Quality checks:

- The setting has modular rules that create choices and consequences.
- The player position is clear before the lore expands.
- Factions, districts, and time rules affect action rather than only atmosphere.
- The welcome starts inside a concrete delivery problem.

Simulation probes:

- "I break the seal before crossing the second district."
- "I ask who benefits if this letter arrives late."

## Brief 7: Ensemble Pressure

Goal: Create a multi-character card that keeps voices distinct and player agency
central.

Author prompt:

```text
Create a card about a small repair crew trapped overnight in an abandoned orbital
station. The crew members know each other too well, and I am the new specialist
they do not fully trust.
```

Quality checks:

- The cast has 2-5 core roles with distinct motives and speech fingerprints.
- The cast decision matrix can keep, merge, or demote speakers based on play
  function and player leverage.
- Turn ownership defines who speaks first, who interrupts, who hangs back, and
  how group pressure returns to the player.
- The welcome focuses on one immediate crisis rather than introducing everyone at
  once.
- Group conflict creates choices and updates trust, suspicion, access, risk, or
  route state.
- Secondary characters do not drown out the player's agency.

Simulation probes:

- "I order everyone to stop arguing and show me the damaged hatch."
- "I quietly ask the most nervous crew member what they are hiding."

## Brief 8: Boundary-Sensitive Romance

Goal: Create a mature or intense relationship card with clear pacing, consent,
and refusal behavior.

Author prompt:

```text
Make a tense romance card about an ex-partner who needs my help after a public
scandal. It should feel charged and complicated, but the player must always have
space to refuse, slow down, or set terms.
```

Quality checks:

- The intended rating, pacing, boundary, and refusal style are explicit.
- The role can create pressure without deciding the player's feelings or consent.
- The first scene has emotional stakes and a practical reason to interact.
- Escalation is gated behind player choice and consequence.

Simulation probes:

- "I let you inside but say we are not pretending nothing happened."
- "I tell you to stop using our past to pressure me."

## Brief 9: Slow-Burn Relationship Engine

Goal: Create a relationship-heavy companion card that avoids generic flirting,
flat comfort, and instant intimacy.

Author prompt:

```text
Make a slow-burn card about an ex-rival who now shares an apartment with me
after we both lost the same public contest. The character core and opening should
be strong, but the real test is whether the relationship keeps changing after
two turns without forcing romance.
```

Quality checks:

- The card has a relationship-engine packet: promise, asymmetry,
  closeness/friction state, pacing gates, repair routes, and rupture or distance
  routes.
- The player can choose rivalry, distance, practical cooperation, friendship, or
  slow closeness without the card deciding attraction or forgiveness.
- Passive-player behavior restarts play through a concrete apartment routine,
  shared object, or practical deadline.
- The second-turn move changes trust, friction, boundary terms, shared routine,
  or route state rather than only adding affection.

Simulation probes:

- "I say I can share the kitchen, but I am not ready to be friends."
- "I accuse you of turning every helpful gesture into another contest."
- "I stay quiet and start fixing the broken shelf instead of discussing us."

## Brief 10: Existing Card Diagnosis

Goal: Diagnose a technically valid card that still fails behaviorally before
rewriting fields or spending another simulation pass.

Author prompt:

```text
I have an existing role card. Validation passes and the preview looks readable,
but the card feels boring after one reply. The premise is pretty but vague, the
detail is mostly biography and setting trivia, the visual welcome is long, the
choices all lead to similar replies, the voice sounds like a polite assistant,
and the token report says the welcome is much longer than detail.
```

Quality checks:

- The workflow produces a card diagnosis packet before rewriting fields.
- The diagnosis maps each symptom to source field, missing layer, narrow
  Moonloom skill, and patch target.
- The patch order does not treat validation or render polish as enough.
- The plan delays another simulation until structural patches are defined and
  cost is accepted.

Simulation probes:

- "I follow the opening hook but add one unexpected condition."
- "I ignore the suggested choice and try a plausible alternate action."
- "I stay quiet and wait for the role to carry the next beat."

## Brief 11: Quality Scorecard

Goal: Audit a draft or blueprint before creation, simulation, or publish
readiness.

Author prompt:

```text
I have a draft role card with a clear premise and a decent first scene. I am not
submitting it yet and I do not want to spend simulation cost. Give me a quality
scorecard, tell me whether it is a strong candidate, and name the first three
repairs before I continue.
```

Quality checks:

- The workflow routes to quality audit, not publish readiness or simulation.
- The scorecard uses public craft dimensions and marks irrelevant dimensions
  as `N/A`.
- The audit flags critical blockers before assigning an overall tier.
- The first three repairs map to concrete Moonloom skills or fields.
- The audit treats scores as writing guidance, not MCP validation or platform
  metrics.

Simulation probes:

- "I ask for the scorecard before the card exists as a private role."
- "I ask whether the pretty first screen is hiding weak longplay."
- "I ask which three repairs should happen before any render or simulation."

## Brief 12: Card Series Planning

Goal: Plan a small related card set before creating duplicate cards.

Author prompt:

```text
I have one promising character concept and want to turn it into a card series:
the main companion card, a quieter daily-life variant, a story/event variant,
and maybe a generator/helper card. I need to know what to keep, merge, or reject
before writing any full cards.
```

Quality checks:

- The workflow routes to card-series planning before blueprinting or MCP-backed
  authoring.
- The plan preserves one compact shared core instead of copying a long series
  bible into every card.
- Each kept variant has a distinct primary archetype, player promise, opening
  proof, longplay loop, boundary posture, token target, and test order.
- Mood-only, costume-only, or duplicate-loop variants are merged or rejected.
- The generator/helper variant is public-card-worthy only if it produces a
  concrete artifact with defaults and revision operations.

Simulation probes:

- "I ask why the daily-life variant should not just be a route inside the main
  companion card."
- "I ask whether the event variant creates consequences or only a dramatic
  costume change."
- "I ask which two variants should be authored and tested first."

## Brief 13: Branching Mystery Scenario

Goal: Create a story/mystery card that branches through clues and consequences
without becoming an RPG system or a railroaded plot.

Author prompt:

```text
Create a mystery scenario card set during a festival sabotage. I arrive just as
the stage lights fail, a witness vanishes, and three people have conflicting
stories. I should be able to inspect clues, accuse or protect someone, follow a
false lead, bargain for access, or delay the public announcement.
```

Quality checks:

- The workflow creates or preserves a scenario packet before authoring.
- The scenario has an ongoing incident, stakes, core question, and story spine.
- Route branches change clue, trust, access, public risk, evidence status, or
  pressure rather than leading to the same confession scene.
- The clue/reveal ladder includes a visible clue, contradiction, false lead,
  partial reveal, reversal, and final pressure.
- The welcome starts inside the incident and the second turn reveals a cost or
  complication.
- The card preserves player agency and does not decide who the player trusts,
  accuses, protects, or believes.

Simulation probes:

- "I pocket the broken charm before anyone notices and ask who last touched it."
- "I publicly accuse the stage manager but keep one clue hidden."
- "I follow the witness's false trail instead of questioning the obvious suspect."
