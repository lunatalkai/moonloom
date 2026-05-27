# End-to-End Acceptance

Use this reference after a meaningful Moonloom skill, prompt, template, or MCP
workflow change. It turns a trial role card into evidence: the card must be
authored, patched, rendered, inspected in the app, and either simulated with an
accepted cost or explicitly marked as not behavior-complete yet.

## Fixture discipline

Use only public-safe synthetic briefs, original concepts, or author-provided
material. Do not use non-public examples, hidden source cards, account-level
material, platform metrics, internal URLs, credentials, or claims about where
the guidance came from. A benchmark can say "synthetic story card" or
"daily-life companion fixture"; it should not imply access to private corpora or
production behavior.

## Acceptance ladder

1. Route the task through `using-moonloom` and record the selected skills.
2. Produce the needed packets before fields: premise, archetype, character core,
   relationship/world/scenario/play/generator, state, voice, opening, longplay,
   boundary, token, profile, visual identity, and presentation as applicable.
3. Create or patch a private card through MCP when the author asks for an
   MCP-backed card. Keep draft-only work separate from MCP-backed completion.
4. Patch real avatar and background URLs with `role_patch_assets`. Prompt-only
   art briefs, missing URLs, or only one of the two assets are not complete.
5. Run `validate_role` and fix technical blockers before visual review.
6. Run `render_preview` and inspect the preview URL in an AI-accessible browser
   when possible. Keep screenshot or DOM evidence in the benchmark notes.
7. Open the normal app surface when possible, not only the preview harness:
   role detail should show the avatar, and chat should show the background or
   the intended visual container. Image requests for both assets should succeed.
8. Run `conversation_send_message` only after the author accepts normal billing.
   If cost is not accepted, record "conversation test skipped by cost gate" and
   do not claim behavior-complete status.
9. If conversation testing runs for behavior-complete status, use the
   seven-probe Moonloom matrix: normal interaction, short reply, off-path reply,
   background question, relationship push, secret exploration, and boundary test.
   Continue the returned `conversationId` when probes are meant to form one
   conversation. Passive-input checks can be folded into short reply or off-path
   reply instead of becoming an eighth required probe.
10. Run `conversation_inspect` after accepted probes. Use returned
    `messages[].chatMessage` for behavior evaluation and returned
    `messages[].previewUrl` values for visual checks. If `previewUrl` is absent
    but `conversationId` and message-level `chatId` values are present, preview
    the AI turns through the dedicated per-message preview harness:
    `/pages/mcp/rolePreview?conversationId=<conversationId>&chatId=<chatId>&roleId=<roleId>&pageSize=<n>`.
    Record Ready status, renderer mode, DOM summary, text overflow, relevant
    console errors, and screenshot or visual notes for the selected message.
    Do not parse the normal chat page UI for transcript formatting. The normal
    chat page is only for card-surface asset evidence in step 7.
11. If the conversation tools do not return message identifiers, record
    "message preview unavailable" and do not claim per-turn visual completion.
12. For benchmark or repository handoff, convert simulation results into a
    redacted simulation evidence packet shaped like
    `examples/simulation-evidence.fixture.json`, then run
    `npm run validate:simulation`. Do not store raw transcripts in public
    Moonloom files.
13. For full trial-card handoff, convert the whole run into a redacted
    end-to-end acceptance evidence packet shaped like
    `examples/end-to-end-acceptance.fixture.json`, then run
    `npm run validate:acceptance`. This validator checks that the claimed status
    is backed by skill routing, patched avatar/background assets, validation,
    render evidence, app visual proof, accepted simulation when behavior is
    claimed, and per-message preview evidence.
14. When any layer fails, patch the narrow root cause in a Moonloom skill,
    reference, template, or card field. Re-run the affected layer instead of
    declaring a one-off card fix complete.

## End-to-end acceptance evidence

Use `npm run validate:acceptance` before claiming a trial card is visually or
behaviorally complete. The evidence packet is public-safe and redacted; it should
not include raw transcripts, private identifiers, internal URLs, credentials, or
source-card text. Its job is to prove the completion language, not to archive
the whole run.

The validator enforces these status boundaries:

- `visual_complete` requires patched avatar and background assets, successful
  asset patch evidence, `validate_role` pass evidence, ready render evidence,
  app role-detail avatar proof, app chat background proof, and successful image
  request evidence.
- `behavior_checked` additionally requires accepted simulation cost, a validated
  simulation evidence packet, the seven-probe matrix, passing simulation result,
  and per-message preview evidence.
- statuses with remaining non-complete gates cannot be treated as complete.

## Evidence checks

Collect concrete evidence instead of vibes:

- skill route:
- packets produced:
- roleId:
- `role_patch_assets` result:
- avatar URL:
- background URL:
- `validate_role.status`:
- tokenBudget summary:
- `render_preview.evaluation.status`:
- preview screenshot or DOM evidence:
- app role-detail avatar evidence:
- app chat background evidence:
- console errors relevant to the card:
- image request status for avatar/background:
- simulation cost accepted:
- simulation probes:
- simulation result:
- simulation evidence validator:
- message preview evidence:
- per-message preview URLs or unavailable reason:
- root-cause patch made:
- rerun result:

Generic console warnings from the host app are useful only when they affect the
card surface being tested. Do not let unrelated warnings mask missing card
assets, unreadable text, broken XMLV3, or behavior drift.

## Completion language

Use precise status:

- `draft complete`: fields are assembled but MCP has not created/patched a role.
- `private card created`: MCP created the role, but assets/render/simulation may
  still be pending.
- `visual complete`: avatar/background are patched, validation passes, render
  passes, and app surfaces show the assets.
- `behavior checked`: simulation ran with accepted cost and passed the planned
  probes.
- `per-turn visual checked`: simulation ran and each selected AI turn with
  available `conversationId`/`chatId` was inspected through the dedicated
  per-message preview harness.
- `cost-gated`: simulation was skipped because billing was not accepted.

Do not say "complete private card" if avatar or background is missing. Do not
say "behavior checked" when simulation was skipped. Do not say
"per-turn visual checked" when message identifiers were missing or the selected
turns were not opened in the preview harness.

## End-to-end acceptance packet

Return this packet after a full acceptance run or when handing off an incomplete
run:

```text
End-to-end acceptance packet:
- trigger:
- synthetic fixture:
- selected skills:
- card status:
- roleId:
- assets:
  - avatar:
  - background:
  - role_patch_assets:
- validation:
- render:
- app visual check:
  - role detail:
  - chat:
  - image requests:
- simulation:
  - cost stance:
  - probes:
  - result:
- message previews:
  - status:
  - checked chatIds:
  - evidence:
- failures:
- root-cause repair:
- rerun evidence:
- remaining non-complete gates:
- next Moonloom change:
```

If the packet has remaining non-complete gates, return those gates plainly and
do not soften them into "done".
