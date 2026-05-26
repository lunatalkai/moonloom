# Moonloom Author Collaboration

Use this reference when the author is not asking for a single technical fix, but
is reviewing taste, direction, draft fit, simulation evidence, render evidence,
or a proposed patch through the agent conversation.

Author collaboration turns subjective feedback into an actionable role-card
decision. It should not become a comment system, task database, analytics layer,
or MCP validation gate.

## Core loop

```text
author signal -> evidence -> preference axis -> options -> decision -> patch packet
```

1. Restate what the author is reacting to.
2. Separate taste, evidence, constraints, and unresolved decisions.
3. Translate vague words into observable card behavior.
4. Offer two or three concrete choices, including one recommended path.
5. Record what to preserve, change, reject, and delay.
6. Hand off to the narrow Moonloom skill that should perform the next patch.

## Feedback surface

The feedback surface is the agent conversation.

Do not invent comment tables, review storage, issue queues, hidden SQL, or
separate approval records. If a final MCP action needs confirmation, summarize
the author-confirmed decision inside the normal MCP call fields, such as a
publish confirmation summary.

## Translate taste into behavior

When the author says:

| Feedback | Translate into |
|---|---|
| "Boring" | no pressure, no consequence, weak role initiative, or flat second turn |
| "Not like them" | voice fingerprint, behavior rule, contradiction, or pressure response mismatch |
| "Too much" | token bloat, over-explained lore, excessive intensity, or pacing mismatch |
| "Too generic" | weak character core, profile promise, voice texture, or opening affordance |
| "I want it softer" | rating posture, emotional distance, refusal route, or lower-pressure opening |
| "More playable" | player agency, reply paths, state changes, route consequences, or longplay hooks |
| "Feels off" | ask for the exact line, scene beat, route, or field that triggered the reaction |

Do not treat a taste label as the patch. Convert it into a field target and a
verification trigger.

## Decision framing

Offer compact choices when the author is undecided:

```text
Decision frame:
- current tension:
- option A:
  - what changes:
  - what it preserves:
  - risk:
- option B:
  - what changes:
  - what it preserves:
  - risk:
- option C, optional:
  - what changes:
  - what it preserves:
  - risk:
- recommendation:
- author decision needed:
```

Use three options for premise direction, archetype conflict, or strong taste
uncertainty. Use two options for narrow patches such as warmer/colder voice,
shorter/denser welcome, or safer/charged boundary posture.

## Collaboration packet

```text
Author collaboration packet:
- author signal:
- current artifact:
- evidence available:
- inferred preference axes:
- non-negotiables:
- preserve:
- change:
- reject:
- delay:
- decision frame:
- recommended next move:
- patch target:
- next Moonloom skill:
- confirmation needed:
- validation / render / simulation stance:
```

## Co-review after evidence

After render review or simulation:

1. Show the author the probe or preview being judged.
2. Summarize the most important evidence in plain language.
3. Name what passed and what failed.
4. Suggest one patch path, not a full rewrite.
5. Ask whether the patch matches the author's taste before spending another
   simulation pass or submitting for public review.

Do not ask the author to decide from raw logs alone. Turn evidence into a
meaningful card-design choice.

## Handoff map

- No settled premise or author wants directions: `lunatalk-premise-workshop`.
- Existing card has several symptoms: `lunatalk-card-doctor`.
- A packet stack needs final fields: `lunatalk-card-author`.
- Public profile does not match the author's promise: `lunatalk-profile-packager`.
- Language/locale/register is the only issue: `lunatalk-language-stylist`.
- Render evidence needs visual repair: `lunatalk-render-review`.
- Simulation evidence needs behavior repair: `lunatalk-chat-simulation` for
  evidence, then the narrow repair skill named by the transcript.
- Publish decision needs final confirmation: `lunatalk-publish-readiness`.

## Guardrails

- Keep the output public-safe and original.
- Do not mention source provenance, private examples, platform metrics, or
  unsupported performance claims.
- Do not create hidden approval systems or comment storage.
- Do not overwrite the author's taste with the agent's preference.
- Do not ask more than three questions before making progress. When evidence is
  enough, propose a decision frame instead of interrogating the author.
