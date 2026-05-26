# Moonloom

Moonloom is the LunaTalk AI creation toolkit for agent clients.

It packages skills, prompts, and MCP guidance that help external AI clients create,
validate, render-review, simulate, and submit LunaTalk content through the LunaTalk
MCP surface. The first release focuses on private role card creation with the
Card Writer MCP; the project is intentionally broader than card writing so it can
later include worldbuilding, material packs, import flows, moderation assistance,
and creator workflow automation.

Moonloom is designed as a role-card authoring framework, not only a tool catalog.
It helps an agent collaborate with an author through ideation, character
positioning, worldbuilding, opening-scene design, voice control, interaction-loop
repair, token budgeting, render review, simulation, and publish readiness.

## What is included

- `skills/using-moonloom` routes agents into the right Moonloom workflow.
- `skills/lunatalk-card-author` guides end-to-end private role card creation.
- `skills/lunatalk-render-review` reviews HTML/XMLV3/Theme V3 render output.
- `skills/lunatalk-chat-simulation` runs and evaluates private chat simulation.
- `skills/lunatalk-publish-readiness` checks whether a private card is ready to submit.
- `skills/lunatalk-benchmark-runner` runs public-safe synthetic regression checks.
- `references/role-card-writing-framework.md` defines the practical framework for
  writing high-playability cards.
- `references/quality-rubric.md` defines the public checklist for judging whether
  a card is playable, anchored, consequential, token-efficient, visually readable,
  and ready for simulation or submission.
- `references/safety-and-cost.md` covers ownership, public actions, mature-content
  boundaries, simulation cost, and credential handling.
- `examples/synthetic-card-briefs.md` provides fictional benchmark prompts for
  testing authoring, render review, and simulation loops.
- `.mcp.json` contains an example remote MCP client configuration.

## MCP endpoint

The hosted MCP surface is expected to be:

```text
https://api.lunatalk.ai/mcp/card-writer
```

Local development usually proxies through:

```text
http://localhost:8888/mcp/card-writer
```

Use an authenticated LunaTalk account token. Moonloom does not introduce separate
MCP-specific scopes; the server applies normal login identity, account ownership,
quota, moderation, publishing, and billing rules.

## Status

This repository is an initial public scaffold. The skills are designed to match
the LunaTalk Card Writer MCP M1 workflow and will evolve as the MCP surface expands.
