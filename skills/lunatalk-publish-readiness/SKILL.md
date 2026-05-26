---
name: lunatalk-publish-readiness
description: Check whether a LunaTalk private role card is ready for public submission. Use this skill whenever the user asks to publish, submit for review, make a role public, prepare a LunaTalk card for review, or decide whether a private card is ready to go live.
---

# LunaTalk Publish Readiness

Use this skill to decide whether a private role card can be submitted for public
review, and to call `publish_submit` only after explicit author confirmation.

## Required references

Read `../../references/card-writer-mcp.md` for `publish_submit` details.
Read `../../references/quality-rubric.md` for readiness criteria.
Read `../../references/safety-and-cost.md` for public action constraints.

## Readiness checklist

1. Call `role_get`.
2. Confirm the role is private and owned by the authenticated account.
3. Call `validate_role`.
4. Resolve all blockers.
5. Review `render_preview`, or record that the author explicitly accepted the risk.
6. Run `simulate_private_chat`, or record that the author explicitly skipped the
   real behavior check after understanding normal billing.
7. Summarize remaining warnings and tradeoffs.
8. Ask for explicit confirmation if the author has not already given it.

## Publishing rule

Only call `publish_submit` when the author clearly confirms submission in the
agent conversation. Use `confirmationSummary` to describe what was checked and
what the author confirmed.

Examples of sufficient confirmation:

- "Submit it for review."
- "Publish this card now."
- "I confirm, send it to review."

Examples that are not sufficient:

- "Looks good."
- "What do you think?"
- "Maybe publish later."

## Reporting

Return:

- roleId
- validation status
- render status
- simulation status
- unresolved warnings
- whether `publish_submit` was called
- review status or task id when available
