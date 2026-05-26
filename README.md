# Moonloom

Moonloom is the LunaTalk AI creation toolkit for agent clients.

It packages skills, prompts, and MCP guidance that help external AI clients create,
validate, render-review, simulate, and submit LunaTalk content through the LunaTalk
MCP surface. The first release focuses on private role card creation with the
Card Writer MCP; the project is intentionally broader than card writing so it can
later include worldbuilding, material packs, import flows, moderation assistance,
and creator workflow automation.

## What is included

- `skills/using-moonloom` routes agents into the right Moonloom workflow.
- `skills/lunatalk-card-author` guides end-to-end private role card creation.
- `skills/lunatalk-render-review` reviews HTML/XMLV3/Theme V3 render output.
- `skills/lunatalk-chat-simulation` runs and evaluates private chat simulation.
- `skills/lunatalk-publish-readiness` checks whether a private card is ready to submit.
- `.mcp.json` contains an example remote MCP client configuration.

## MCP endpoint

The current production-facing MCP surface is expected to be:

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
