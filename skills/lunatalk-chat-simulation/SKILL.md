---
name: lunatalk-chat-simulation
description: Run and evaluate LunaTalk private chat simulations through simulate_private_chat. Use this skill whenever the user wants an AI client to test a card's behavior, dialogue quality, first-turn response, role consistency, or end-to-end LunaTalk chat behavior before publishing.
---

# LunaTalk Chat Simulation

Use this skill to test role behavior through LunaTalk's real private chat pipeline.

## Required references

Read `../../references/card-writer-mcp.md` for `simulate_private_chat`.
Read `../../references/quality-rubric.md` for behavior evaluation.
Read `../../references/safety-and-cost.md` before running a simulation.

## Cost and consent

`simulate_private_chat` uses normal LunaTalk chat billing and deducts points or
credits. If the author has not already asked to run a simulation, explain that it
costs normal chat resources before calling the tool.

## Workflow

1. Confirm the role is private and owned by the authenticated account.
2. Choose 1 to 5 realistic user messages. Cover the opening hook and at least one
   likely edge case if the author has concerns.
3. Call `simulate_private_chat`.
4. Read every simulated turn. Evaluate behavior, not just whether the tool ran.
5. Patch profile, detail, welcome, or jailbreak only when the transcript shows a
   concrete role-card problem.
6. Re-run simulation when the patch changes core behavior.

## Evaluation criteria

- The role stays in character.
- The reply advances the scene and gives the player something to do.
- Tone, boundaries, and content rating match the card.
- The reply uses relevant world details without dumping the whole setting.
- The transcript has no obvious safety, formatting, or system-leak issue.
- The billing summary or charged score is included when available.

## Reporting

Return:

- prompts used
- transcript summary
- behavior issues found
- suggested card patches
- billing/cost summary when available
- whether another simulation pass is needed
