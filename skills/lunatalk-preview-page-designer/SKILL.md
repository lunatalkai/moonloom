---
name: lunatalk-preview-page-designer
description: Use when decorating a LunaTalk role's preview page — building the author-controlled role-detail document, selecting or generating preview images, saving through role_patch_preview_page, polling image and moderation status, recovering from rejection, version conflict, rate limit, or public_role_requires_clone, or resetting the page to default.
---

# LunaTalk Preview Page Designer

Use this skill when the author wants to decorate a role's preview page: the
long-form, author-controlled section a visitor sees on the role detail screen.
The preview page is a whitelisted block document, not free HTML. This skill
builds that document, chooses images the account may legally use, saves it
through MCP, and drives the moderation and image polling loops to a settled
result.

Read `../../references/preview-page-authoring.md` first for the schema v1
whitelist, hard limits, node-to-visual semantics, image rules, and the
`pending` / `passed` / `rejected` state machine. Read
`../../references/card-writer-mcp.md` for the exact tool arguments and response
envelope of the four preview tools. Read `../../references/mcp-client-workflow.md`
for where preview decoration sits among the other MCP stages.

## Tools

Four Card Writer MCP tools cover the preview page:

- `role_get_preview_page` (read): returns the author's current editable page as
  `{ doc, status, version, rejectReason }`. When the role has no decoration yet
  the call still succeeds with `status: "none"`, `doc: null`, and `version: 0`.
- `role_patch_preview_page` (mutating): saves the whole document. It is the only
  write path for content; there is no partial patch. Returns `{ status, version,
  moderating }`.
- `role_reset_preview_page` (mutating): restores the default (no custom page).
  Idempotent.
- `creator_image_list` (read): lists the authenticated account's own asset-library
  images with each image's URL, `moderationState`, owning role, and create time.
  Only images whose `moderationState` is `pass` may be placed in the document.

`role_patch_preview_page` and `role_reset_preview_page` are mutating, so each
call carries `schemaVersion` and an `idempotencyKey` of at least 8 characters.
`role_get_preview_page` and `creator_image_list` are read-only: they carry
`schemaVersion` but no `idempotencyKey`.

## Idempotency: a new key per document

The server caches a mutating result by `idempotencyKey`, not by payload. Reusing
a key replays the previous cached result and ignores the new document. So use a
**new idempotencyKey for each new doc you save**. Reuse the same key only to
retry the exact same intended save after a transport error — never to push a
changed document. If a save comes back and you then edit the document, the next
save needs a fresh key or the edit is silently dropped as an old-key replay.

## Workflow

1. **Read the role material.** Use `role_get` for the role's identity, premise,
   and voice, and `role_get_preview_page` for any current decoration and its
   `version`. A `status: "none"` result means this is a first decoration.
2. **Plan the content structure.** Decide the sections a visitor needs — a hook,
   who they are talking to, what they can do, one or two images — and map each to
   a whitelisted block from the authoring reference. Keep it a readable
   introduction inside the hard limits (200 KB, 200 blocks, 20000 characters per
   field), not an exhaustive dump.
3. **Choose images.** Call `creator_image_list` and pick images whose
   `moderationState` is `pass`. Only `pass` images may go into the document.
   Images still under review, or chat-generated images with no review state,
   appear in the list but are not eligible; do not place them.
4. **Generate an image only when needed, then poll.** If no suitable `pass` image
   exists and the role is private, `role_generate_assets` can produce one. A
   generated image enters the asset library under review first. After generating,
   poll `creator_image_list` until the URL you intend to use shows
   `moderationState: "pass"`, then place it. Do not place a freshly generated URL
   before it reads `pass` — the save would fail the image rule.
5. **Assemble the document** from whitelisted blocks, inline `text` / `hardBreak`
   nodes, and the six marks. Validate against the authoring reference before
   saving.
6. **Save** with `role_patch_preview_page`, passing the `version` you last read
   and a fresh `idempotencyKey`. Read the returned `status` and `version`.
7. **Wait for moderation to settle** (see State handling), then report the final
   state to the author in their language.

## Layout: a single column is the default

A preview page is read as one vertical column, and that is the layout to prefer.
`columns` is an exception you reach for when a few short parallel items
genuinely belong beside each other — a two-up cast pairing, a compact before and
after. Do not wrap everything in `columns`; a page whose sections are all grids
reads as a form, not as an introduction.

Three rules follow from how the grid renders:

- **Two to four columns are allowed, and the number you pick is a reading
  decision, not a capacity one.** The reading area is narrow to begin with, and
  every extra column divides it again: two columns still hold a sentence, three
  hold a short line, and four hold only a few words — a stat, a label, a name.
  Four is the ceiling, not a target; a `profileCard` at four across has almost no
  room for text beside its portrait. When in doubt, send two.

- **A narrow screen collapses the grid.** Columns stack top to bottom once the
  reading area is narrow — a phone screen, a small window — and most visitors
  read on a phone. Never rely on a
  side-by-side arrangement for the meaning: content that only makes sense read
  across (a comparison whose two halves must sit level, a left/right visual pun,
  a table faked out of columns) breaks the moment it stacks. If the point needs
  the pairing, say it in the text instead.
- **Column order is the reading order.** When the grid stacks, the columns appear
  in the order you sent them — first column first. Order them so the stacked
  sequence still reads correctly, and check that sequence before the wide layout.

## `meter` marks a static setting value

`meter` shows where one fixed, author-chosen value sits on a 0-100 scale: how
dangerous a place is, the difficulty of a route, how strong a faction stands, a
character attribute. The value is part of the setting, decided while writing the
page, and it never changes on its own.

Do not use `meter` for anything that moves during chat. Affection, trust,
tension, mood, a quest counter — these change as the conversation plays out, and
the preview page is a static introduction that knows nothing about any reader's
session. A meter of a live value is decorative at best, and at worst it misleads
the reader into thinking they are seeing a real-time state readout of their own
playthrough. Describe a changing quantity in prose ("she warms slowly, and only
to people who tell her the truth") instead of drawing a bar for it.

## Accent budget

`meter.attrs.tone` defaults to `gold`, which is the page's own accent. Use it
unless a meter has a reason to differ. Across one screen, use at most one
non-gold tone — a `rose` danger bar among gold ones reads as a warning, while
three tones read as decoration and the highlight lands nowhere. The same budget
covers `highlight` and `textStyle` colors: the whole page holds one or two
accents, not one per block.

## Choosing between blocks that look alike

Three pairs overlap in practice:

- **`meter` vs `statCard`.** A `meter` is one scale — a bar the eye reads as a
  magnitude. A `statCard` is a key/value table of short facts in rows. Use the
  meter when the number's position on a range is the point; use the card when
  the labels are the point. Do not draw five meters where one card with five rows
  is clearer.
- **`gallery` vs `image`.** A `gallery` shows a set of pictures read as one group
  (a wardrobe, several locations). An `image` is a single figure anchoring a
  section — a hero shot. If one picture carries the section, use `image`; a
  one-item gallery is just a weaker image.
- **`profileCard` vs `dialogueBubble`.** A `profileCard` introduces a person at a
  glance; a `dialogueBubble` previews a voice by showing a line spoken. For an
  ensemble, prefer a cast wall of `profileCard` blocks over a long bubble
  string — a chain of bubbles between several people asks the reader to
  reconstruct who is who, which is exactly what the wall does for them. Bubbles
  are strongest as a couple of lines showing how one character actually talks.

## Choosing a `gallery` width step

`gallery.attrs.width` takes the same five steps as `image.attrs.width`, but it
sizes each picture in the rail rather than the block — the gallery always spans
its column. Pick the step by asking **how many pictures the reader should see at
once**, since that is all the step controls: `33` fits about three across, `50`
about two, `100` one at a time.

The default is `33`, and it is a sensible default: three across reads
immediately as a set. Note this differs from `image.attrs.width`, which defaults
to `100` — the shared steps do not mean a shared default, so omitting `width` on
a gallery gives you three across, not a full-width picture.

Let the pictures decide:

- **A set to browse** — a wardrobe, a handful of locations, a cast's faces. The
  point is that there are several and they belong together, so show several at
  once: `33` or `50`. The reader takes in the group first and scrolls for the
  rest.
- **Tall pictures** want a wider step. Nothing is cropped, so a portrait shown
  three-across is a sliver; `50` or `66` gives it room while still showing that
  more follows.
- **`100` means one picture at a time.** The rail shows a single picture with the
  next one edging in — a **carousel**. Reach for it only when a one-at-a-time
  presentation is what you actually want: a few strong establishing shots where
  each deserves the whole width and the reader loses nothing by not seeing the
  group at a glance. It is not a general-purpose step and it is not the safe
  pick. A `100` gallery hides the set it exists to show, and at that point an
  `image` is usually the honest block.

When unsure, stay at `33` or step to `50`: the pictures still read as a group,
and no picture is a stamp. Do not put a `100` gallery next to an `image` in the
same section — two full-width figures in a row read as one thing broken in half.

## Image generation: rejection is a vanished URL

A generated image is moderated in the background. The result is written back into
`creator_image_list`, not returned inline:

- **Passed**: the URL appears with `moderationState: "pass"`. Use it.
- **Rejected**: the library row is deleted, so the URL simply **disappears from
  the list**. There is no `rejected` state written back for a generated image —
  the vanished URL is the terminal reject signal.

This makes two observations look similar, and they need different handling:

- **Seen, then disappeared**: the URL showed up in a prior `creator_image_list`
  (usually as `pending`) and is gone on a later poll. That is a **terminal
  rejection** — stop polling for it immediately.
- **Never appeared**: the URL has not shown up at all yet. That is insert lag, not
  a decision — keep polling within your window.

Poll the exact URL you intend to use (the background URL or the avatar URL — track
whichever one the document actually needs), with **bounded** polling and
**backoff**. Do not poll forever: if the image is still `pending` past a
reasonable window, deliver the page without that image and tell the author it is
still under review rather than blocking indefinitely.

On a terminal rejection, recover by one of: adjusting the art direction and
regenerating, falling back to an existing asset-library `pass` image, or dropping
that image block. Regenerating charges points again; a generated image that is
later rejected is not refunded and cannot be used, so prefer an existing `pass`
image when one fits.

## public_role_requires_clone

`role_generate_assets` only runs for a private role the account owns. Decorating
a **public** role and trying to generate returns `public_role_requires_clone`.
When you see it, do not retry generation — the image generation fallback is not
available for a public role. Fall back to an existing asset-library `pass` image,
or drop the image block. Treat `public_role_requires_clone` as a terminal signal
for the generation path, list it in your error handling, and keep decorating the
text.

## State handling and errors

- `pending` after a save is **normal and non-terminal**. Poll
  `role_get_preview_page` with backoff; it can take longer than a few seconds. Do
  not resubmit the same document while it is pending — resubmitting does not speed
  it up and burns idempotency keys.
- `passed`: the page cleared moderation. Report success. Note that a passed page
  can still be temporarily hidden from visitors during a platform display pause;
  that is not a rejection and needs no re-save.
- `rejected`: the content did not clear moderation. The `rejectReason` is a
  **category only** (such as a text or image policy class) with **no per-node
  path**, so re-read the document and self-check against the category, then save a
  corrected version with a fresh `idempotencyKey`.
- **Version conflict** (`version_conflict`, a 409-style refusal): the page changed
  since you last read it. Re-read with `role_get_preview_page` to get the current
  `version`, reapply your change, and save again.
- **Rate limited** (`rate_limited`, a 429-style refusal): you saved or generated
  too quickly. Wait and retry with backoff, not in a tight loop.
- Other save errors: `empty_doc` (nothing to save), `rejected_content_reused`
  (re-saving content already rejected), `invalid_param` (a block, mark, attribute,
  or limit is out of the schema v1 whitelist — the `reason` and `path` point at
  the first offending node so you can repair it), and `permission_denied` (the
  role is not owned by the authenticated account).

## Boundary

- Do not place an image whose `moderationState` is not `pass`.
- Do not reuse an idempotency key across different documents.
- Do not poll a vanished-after-seen URL — it is a terminal rejection.
- Do not retry generation after `public_role_requires_clone`.
- Do not report a `pending` page to the author as live.
- Do not print tokens, cookies, auth headers, internal rate-limit numbers, CDN
  hosts, table names, or account identifiers. Describe rejection reasons to the
  author in natural language in the author's own language.

## Handoff

- Use `lunatalk-mcp-operator` first if the four preview tools are not visible or
  auth is unverified.
- Use `lunatalk-visual-identity-director` when the blocker is art direction for a
  generated or chosen image rather than page structure.
- Use `lunatalk-card-author` when the request is really role-field authoring, not
  preview-page decoration.
