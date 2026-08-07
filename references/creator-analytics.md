# Creator Analytics

Use this reference when an author asks what to write next, which existing card
signals to trust, or how to use LunaTalk Creator Brief data before ideation,
repair, or field authoring.

Creator analytics is a decision aid, not a writing-quality gate. It should guide
which Moonloom skill to run next; it should not replace premise, character,
relationship, world, detail, render, or simulation review.

## Tool

Call the read-only Card Writer MCP tool:

```json
{
  "schemaVersion": "2026-05-26.m1",
  "period": "last30d",
  "rating": "all",
  "language": "zh-Hant"
}
```

Read the payload from `result.structuredContent.creatorAnalytics`.

The tool returns a Creator Brief with market signal, my card insight, writing
suggestion, creative opportunity, watchout, metric contract, period range, and
next recommended tools. Typical next tools are `role_find` for owned card
context and `public_search` for public summary discovery.

## Inputs

Allowed periods are `last1d`, `last7d`, `last30d`, `last90d`, `lastMonth`,
`lastQuarter`, and `custom`. For `custom`, provide `startMonth` and `endMonth`
as `YYYY-MM`.

Allowed ratings are `all`, `safe`, and `r18`. Allowed languages are `zh-Hant`,
`zh-Hans`, `en`, `ja`, `ko`, and `all`.

The tool does not accept `accountId`; account identity comes from the
authenticated MCP session. It is read-only and does not need an idempotency key.

## Confidence

Treat `confidenceLevel` as the tone control for every recommendation:

- `high`: may be presented as a strong recommendation.
- `medium`: present as a useful reference, not certainty.
- `low`, `experimental`, or `insufficient_data`: present as observation only.

Do not turn low-confidence analytics into a definitive writing direction. When
the brief is weak, route the author to `lunatalk-premise-workshop`,
`lunatalk-quality-auditor`, or another narrow Moonloom skill instead of forcing
the trend.

## Workflow

1. Call `creator_analytics_brief` when the author asks for trend-aware next
   steps, card opportunity, personal card insight, or market-informed writing
   direction.
2. Summarize the Creator Brief in author language: next lane, matching owned
   strength, writing tip, and watchout.
3. If the author names an existing card, call `role_find` before reading or
   patching anything.
4. If public discovery is useful, call `public_search` and use only public
   summaries.
5. Route to the narrow Moonloom writing skill that fixes the real bottleneck.

Analytics can suggest where to focus. Moonloom still owns the craft decision:
premise clarity, character engine, player agency, relationship dynamics,
opening proof, token architecture, visual presentation, and simulation behavior.
