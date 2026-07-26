# Preview Page Authoring Reference

Use this reference when an agent decorates a role's preview page through the
Card Writer MCP. The preview page is the author-controlled long-form section a
visitor sees on the role detail screen. It is a structured document, not free
HTML: the agent builds a whitelisted block document, saves it, and waits for
moderation to settle.

This reference is the author-facing contract. It does not describe server
internals, moderation thresholds, quota numbers, or storage layout. The MCP
validator is authoritative: when a block, mark, attribute, or limit is not
allowed, the save fails with `invalid_param` and a `path` to the first offending
node, and the agent repairs from there.

## Document shape

A preview page document is a ProseMirror-style JSON tree. The top level is
`{ "type": "doc", "version": 1, "content": [ ...blocks ] }`. Every node is
`{ "type": "<node>", "attrs": { ... }, "content": [ ...children ] }`; inline
text is `{ "type": "text", "text": "...", "marks": [ { "type": "<mark>", "attrs": { ... } } ] }`.

```json
{
  "type": "doc",
  "version": 1,
  "content": [
    { "type": "heading", "attrs": { "level": 2, "textAlign": "center" },
      "content": [ { "type": "text", "text": "Who you are talking to" } ] },
    { "type": "paragraph", "content": [
      { "type": "text", "text": "A night-shift archivist who " },
      { "type": "text", "text": "remembers everything", "marks": [ { "type": "bold" } ] },
      { "type": "text", "text": " and forgives nothing." }
    ] },
    { "type": "image", "attrs": { "src": "<asset-library image URL that passed review>" } },
    { "type": "divider" }
  ]
}
```

The `src` value in the example is a placeholder. Use a real URL from the
account's asset library that has already passed review (see Image rules).

## Schema v1 whitelist

Schema v1 accepts a fixed vocabulary. Anything outside it is rejected with
`invalid_param` plus a `path` to the first offending node. These node and mark
type strings are the exact wire contract — send them verbatim.

- **17 block types**: `heading`, `paragraph`, `blockquote`, `bulletList`,
  `orderedList`, `listItem`, `dialogueBubble`, `statCard`, `spoiler`,
  `divider`, `image`, `columns`, `column`, `profileCard`, `gallery`,
  `meter`, and `panel`.
- **2 inline node types**: `text` and `hardBreak`.
- **6 marks** on inline `text`: `bold`, `italic`, `underline`, `strike`,
  `highlight`, and `textStyle`.

Attribute contract per node:

- `heading.attrs.level`: `2` or `3` only.
- `heading` / `paragraph` may carry `attrs.textAlign`: `left`, `center`, or
  `right` (the key is `textAlign`, not `align`).
- `heading.attrs.art`: an optional decorative style layered on the heading
  text — `bubble`, `neon`, `outline`, `glitch`, `ink`, or `serif` — built from
  CSS effects (text-shadow, stroke, gradient-clip), so it renders the same
  way across every script with no font file involved. Omitting `art`, or
  sending it explicitly as `none`, renders the heading as plain text; a
  document written before `art` existed needs no migration and keeps
  rendering exactly as it did.
- `dialogueBubble.attrs.name`: speaker label, at most 20 characters. Its
  content is inline (`text` / `hardBreak`). Paragraph-wrapped content is
  tolerated and flattened into lines on render — prefer plain inline content.
- `dialogueBubble.attrs.side`: `left` or `right`, choosing which edge the bubble
  hangs from. When `side` is absent the bubble defaults to `left`. Keep one
  speaker on one side for the whole page — alternating sides at random reads as
  noise rather than as a conversation.
- `statCard.attrs.title`: at most 20 characters; `statCard.attrs.rows` is an
  array of `{ "k": "...", "v": "..." }`, at most 12 rows, each key and value at
  most 30 characters. `statCard` has no children (`content` stays empty).
- `spoiler.attrs.title`: at most 40 characters; its `content` is block nodes.
- `image.attrs.src`: an allowed asset URL (see Image rules).
- `image.attrs.frame`: an optional display frame — `default`, `none`,
  `polaroid`, or `tape`. `default` is the plain figure — the same rendering
  an image had before `frame` existed. `none` strips even that plain
  treatment for a borderless cutout, meant for a picture with a transparent
  background used as a sticker. `polaroid` and `tape` add a bordered,
  scrapbook-style presentation. Omitting `frame` defaults to `default`, so a
  document written before `frame` existed needs no migration.
- `image.attrs.width`: `25`, `33`, `50`, `66`, or `100` — the percentage of the
  text column the figure spans. These five steps are the entire range; a width
  outside them is rejected, not rounded to the nearest step. When `width` is
  omitted (or `null`) it defaults to `100` and the figure spans the full column.
  (`gallery.attrs.width` takes the same five steps but defaults to `33` — see
  below.) There is no pixel sizing: a preview page is read at every screen width,
  so a figure is always a share of the column. Reach for a narrower step when a
  figure is a portrait or an aside that prose should sit beside — a hero image
  stays at `100`.
- `columns` takes no attributes. Its children are only `column` nodes, and there
  must be two to four of them. There is no `cols` attribute: the column count is
  derived from the number of children you send, so a `columns` holding one child
  or five children is rejected rather than silently reflowed. Four is the ceiling,
  not a recommendation: the reading column is narrow, and four ways of splitting it
  leaves each column too tight for anything but a few words — a `profileCard` in
  particular has no room left for its text beside the portrait. Prefer two.
- `column` takes no attributes and may only appear as a direct child of
  `columns`. Its content is block nodes. A `column` anywhere else is an unknown
  node.
- `profileCard.attrs.name`: at most 20 characters.
  `profileCard.attrs.subtitle`: optional, at most 40 characters.
  `profileCard.attrs.desc`: optional, at most 60 characters.
  `profileCard.attrs.avatarSrc`: optional; an allowed asset URL (see Image
  rules). `profileCard.attrs.tags`: optional array of short strings, at most 6
  tags, each at most 12 characters. `profileCard` has no children (`content`
  stays empty).
- `profileCard.attrs.bgSrc`: optional; an allowed asset URL (see Image rules)
  that fills the card behind the text as a background picture. When `avatarSrc`
  is absent, the portrait is cropped from `bgSrc` instead, so one picture can
  serve as both the card background and the portrait; set `avatarSrc` as well
  only when the portrait should be a different picture. The two are separate
  image-bearing attributes and each is checked against the image rules on its
  own — a card that carries only `bgSrc` still needs that picture to have passed
  review. Text stays readable over the picture without any work from you, so
  choose the picture for mood; a portrait whose subject sits high in the frame
  crops best, since the derived avatar is taken from the top of the picture.
- `gallery.attrs.items`: an array of `{ "src": "..." }` entries — a `gallery`
  holds 1 to 6 items. Each `src` is an allowed asset URL (see Image rules).
  `gallery` has no children. A `gallery` renders as a rail the reader scrolls
  horizontally, and each picture keeps its own natural proportions — pictures are
  not cropped to a common shape, so a portrait and a landscape may sit side by
  side in one gallery. Each item's own shape is closed to exactly `src` and an
  optional `width` (the per-item `width` key is accepted but has no effect of
  its own — the step that sizes every picture in the rail is the gallery-level
  `gallery.attrs.width` below, not a setting on the item). Any other key on an
  item — including `frame` — is rejected: gallery pictures always render at
  frame `default` in this release, and there is no way to set a frame per
  picture inside a gallery.
- `gallery.attrs.width`: `25`, `33`, `50`, `66`, or `100` — the same five steps as
  `image.attrs.width`, and the same rule that a width outside them is rejected
  rather than rounded. When `width` is omitted (or `null`) it defaults to `33`.
  The step means something different here, and it is the easy thing to get wrong:
  an image width sizes the block, while a gallery width sizes **each picture** in
  the rail. The `gallery` block itself always spans the full column. So the step
  chooses how many pictures a reader sees at once before scrolling — `33` shows
  about three, `50` about two, and `100` shows one picture at a time with the next
  one edging into view, which is to say a carousel.

  **The two defaults differ on purpose.** `image.attrs.width` defaults to `100`
  and `gallery.attrs.width` defaults to `33`; sharing the five steps does not mean
  sharing the default. The reason is the per-picture split above: a lone figure
  spanning the whole column is what an `image` is for, but a `gallery` that
  defaulted to `100` would show exactly one picture and hide the rest of the set —
  and a gallery showing one picture is only a worse `image`. The default therefore
  shows the set as a set. `100` remains available for when a one-at-a-time
  carousel is genuinely what you want.
- `meter.attrs.label`: at most 20 characters. `meter.attrs.value`: an integer
  from 0 to 100 — a `value` that is omitted, out of range, or not a whole number
  is rejected, not clamped to the nearest legal value.
  `meter.attrs.tone`: `gold`, `rose`, or `violet`. `meter` has no children.
- `panel.attrs.tone`: **required** — `gold`, `rose`, `violet`, `sky`, `mint`,
  `amber`, `silver`, or `ink`. Unlike every other attribute in this reference,
  `tone` has no default: a `panel` sent without one of these eight exact
  strings is rejected outright rather than rendered in a fallback color. A
  `panel` is a colored content box — a tinted background and border in the
  chosen tone — wrapping a block of content; see "Where `panel` may appear"
  below for its placement rule.
- `highlight.attrs.tone`: `gold`, `rose`, or `violet`.
- `textStyle.attrs.color`: one of the 8-value palette `gold`, `rose`,
  `violet`, `mint`, `sky`, `amber`, `silver`, or `default` (empty/`default`
  means no color).

Unknown node types, marks, or attributes are rejected; do not invent inline
styles, class names, script handlers, or raw HTML.

### Where `columns` may appear

`columns` may only appear at the top level of the document — as a direct child of
`doc`, never inside `spoiler`, `blockquote`, or `listItem`, and never inside
another `columns`. A grid nested anywhere else is rejected. Build a page as a
flat sequence of blocks and reach for a `columns` row only where a few short
parallel items genuinely belong beside each other.

Inside a `column`, a block spans the column it sits in: an `image` fills its
column, so the image width step has no effect there. Choose the split by how many
columns you send, not by sizing the contents.

That does not extend to `gallery`. Inside a `column`, `gallery.attrs.width` still
applies, because the two settings decide different things: the column decides how
wide the gallery block is, while the gallery width decides how many pictures fit
across whatever width the block ends up with. A gallery in a narrow column is a
narrow rail, and its width step still chooses whether that rail shows one picture
or three.

### Where `panel` may appear

`panel` follows the same placement rule as `columns`: only at the top level of the
document, as a direct child of `doc`. A `panel` inside a `columns` column, inside a
`spoiler`, inside another `panel`, or anywhere else that is not the document's top
level is rejected as nesting — it is not silently flattened out to the top level.

Inside a `panel`, send any block that is legal at the top level **except**
`columns` and another `panel` — a `paragraph`, a `heading`, a `dialogueBubble`, a
`statCard`, a `bulletList`, an `image`, and so on all nest inside a panel
normally. `columns` and `panel` are the two blocks reserved for the top level
only, so neither can appear inside a panel, and a panel cannot contain itself.

A `panel` counts toward the document's 200-block cap the same as any other
block — a page built from a dozen panels each holding a dozen paragraphs reaches
the cap the same way any other structure would.

## Hard limits

These caps are part of the author contract:

- The whole document must stay under **200 KB** when serialized.
- The document must contain at most **200 blocks**. `columns` and each `column`
  count as blocks like any other node, and so does `panel`.
- Any single text field must stay under **20000 characters**.
- The document may reference at most **200 images** in total, counted across
  every image-bearing attribute (see Image rules). A `gallery` carries up to six
  images in a single block, so a page built from galleries reaches this cap long
  before it reaches the block cap.

A document over any cap is rejected. Keep a preview page to a readable
introduction — a handful of sections, not a novel. If content is long, cut or
summarize rather than splitting one idea across dozens of thin blocks.

## Node to visual semantics

Use the block that matches the reading intent, not the one that looks densest.

- `heading` (`level` 2 or 3): a short section label. Do not stack many headings
  with no body between them. `art` layers a decorative CSS style — `bubble`,
  `neon`, `outline`, `glitch`, `ink`, `serif` — on the text; see the skill's
  guidance on `art` for when one fits a heading and when to leave it plain.
- `paragraph`: normal prose. Most of a preview page is paragraphs.
- `blockquote`: a pulled line rendered as an accented quote card — an
  in-character motto, a premise hook.
- `dialogueBubble`: one speaker line rendered as a chat-style bubble with the
  speaker name. A short row of bubbles is a strong way to preview each
  character's voice.
- `statCard`: a compact key/value panel (status board, relationship meter,
  scene facts). Keep keys and values short — it renders as a two-column card.
- `spoiler`: a collapsed section the visitor expands — hide twists or optional
  lore behind a title that teases without revealing.
- `bulletList` / `orderedList` with `listItem` children: scannable facts or a
  short "what you can do here" list. Keep items short.
- `image`: one figure. Use it for a hero or a section anchor. `frame` adds a
  display treatment around it — `polaroid` or `tape` for a scrapbook feel,
  `none` for a borderless cutout that suits a transparent-background sticker,
  `default` for the plain figure with no treatment.
- `divider`: a quiet section break between two ideas.
- `columns` with `column` children: a row of two to four short parallel items —
  a two-up cast pairing, a compact "before / after". A wide screen shows them
  side by side; a narrow one stacks them in order. Two reads best; three still
  holds a short line; four is for terse items only, such as a stat or a word.
- `panel` with block content: a colored content box — a tinted background and
  border in one of eight tones — wrapping the same block content the rest of
  the page uses. Use it to set one section visually apart (a warning, a
  house rule, a pulled-out fact), not to decorate every section; see the
  skill's guidance on `panel` for how sparingly to reach for it.
- `profileCard`: one person at a glance — portrait, name, a one-line role, a
  short description, a few tags. A row or grid of them is the natural way to
  introduce an ensemble.
- `gallery`: a set of images read as one group (a wardrobe, a set of locations).
  Use `image` instead when one picture anchors a section.
- `meter`: a labelled bar showing where one fixed setting value sits on a 0-100
  scale — danger, difficulty, how strong a faction is, a character attribute.
  It is a static author-chosen value, not a live readout.

Marks add emphasis inside prose. Use `bold` and `italic` sparingly, `highlight`
for at most a few glowing phrases, and `textStyle` colors so the page keeps at
most one or two accent colors. Over-marking reads as noise.

## Image rules

Four attributes carry an image, and every one of them obeys the same rule:

- An `image` node: `attrs.src` is the figure.
- A `gallery` node: every item in `attrs.items` carries a `src`, and each one
  follows the same image rules as a single `image` node.
- A `profileCard` node: `avatarSrc` is optional, and when present it follows the
  same rule as any other image.
- A `profileCard` node: `bgSrc` is optional, and follows the same rule
  independently of `avatarSrc`. A portrait derived from `bgSrc` does not make
  `bgSrc` exempt: the picture itself must have passed review either way.

Every image in a preview page — each of those attributes — must be a
URL from the account's own asset library that has already passed review
(`moderationState` is `pass`). Images that are still under review, or
chat-generated images that carry no review state, appear in the picker but
cannot be used in a preview page yet. Selecting one and saving anyway makes the
save fail on the image rule.

To get a usable image:

- Prefer an existing asset-library image that already shows `moderationState`
  `pass`.
- If a new image is generated for a private role, it enters the asset library
  under review first. Wait until it shows as `pass` in the image list before
  putting its URL in the document.

Preview page saves and image work are rate-limited to keep the surface healthy.
The exact limits are internal. When a save is refused because it arrived too
quickly, treat it as a normal rate-limit signal: wait and retry with backoff,
not in a tight loop.

## Status and moderation

A saved preview page moves through three moderation states:

- `pending`: saved and waiting for a moderation decision. This is the normal
  state right after a save. It is **not terminal** and can take longer than a few
  seconds. Poll with backoff; do not resubmit the same document repeatedly while
  it is pending — resubmitting does not speed it up.
- `passed`: the page cleared moderation and can be shown to visitors.
- `rejected`: a human reviewer took the page down. Adjust the content and save a
  new version. A rejection carries policy categories (`rejectReasonCodes`) and,
  when the reviewer wrote one, a note (`rejectReasonNote`) — but no per-node
  location, so re-read the document and self-check against each category rather
  than expecting an exact pointer. Automated rating alone never rejects a page: it
  either clears it or sends it to a person, so a rejection is a considered
  judgement, not a threshold to retry past.

Two more author-facing facts:

- A version you save replaces the previous one. Concurrency is guarded by a
  version number: if the page changed since you last read it, the save is
  refused as a conflict — re-read the current version, reapply your change, and
  save again.
- A page that already `passed` may temporarily not be visible to visitors while
  the platform pauses preview display. This is a display pause, not a rejection,
  and does not require re-saving.

## How the page is used: `landOnHome` and `showComments`

A decorated page is the role's home — the page a visitor sees first. Two author
switches on `role_patch_preview_page` control how it is used. Both are read back
by `role_get_preview_page`.

- `landOnHome` defaults to true. When it is on, a visitor who taps the role from
  a listing, from discovery, or from a newly created share link opens the role
  home instead of going straight to chat. Turn it off when the author wants the
  role to keep opening chat directly even though a home page exists.
- `showComments` defaults to true. It controls whether the role home offers a
  comments tab alongside the page itself. Turn it off for a role whose author
  wants the home to stay purely presentational.

Three behaviours worth stating plainly, because each one produces a confused
author if it is discovered rather than explained:

- Omitting a switch leaves it unchanged. A patch that carries only `doc` never
  alters either switch, so you can keep saving document revisions without
  touching the author's settings. Send a switch only when you intend to change
  it.
- A rejected page ignores `landOnHome`. While the page is rejected, visitors go
  to chat no matter how the switch is set. The switch is not cleared — it takes
  effect again once a new version clears moderation. If an author asks why their
  role still opens chat with the switch on, check the status first.
- A page that is still pending moderation does honour `landOnHome`. Saving takes
  effect immediately, so a visitor can land on a page that has not finished
  moderation yet.

Changing where every visitor lands is not a cosmetic edit. Confirm a switch
change with the author in the conversation before sending it; never flip a
switch as a side effect of saving a document.

## Page skin: `skinId`

A page can also wear one of eight official color skins. Unlike every block and
attribute above, a skin is not part of the document — `skinId` is a separate
page-level field read back by both `role_get_preview_page` and
`role_patch_preview_page`'s response, and written by sending `skinId` on a
`role_patch_preview_page` request. Saving a document and choosing a skin are
two independent decisions that happen to travel on the same call.

The seven named skins, sent and received as these exact strings, are
`indigo-night`, `sakura-mist`, `azure-dawn`, `jade-bamboo`, `crimson-flame`,
`silver-ash`, and `dark-violet`. The empty string `""` is the eighth skin — the
default gold look every page starts with — and it is always a legal value.

`skinId` on `role_patch_preview_page` is optional, and each of the three things
you can do with it means something different:

- **Omit it** to leave the page's current skin unchanged. A save that carries
  only `doc` never touches the skin, the same way it never touches `landOnHome`
  or `showComments` — send `skinId` only when you intend to change the skin.
- **Send `""`** to reset the page to the default gold skin explicitly.
- **Send one of the seven named strings** to switch to that skin. A value
  outside these eight legal strings is rejected, and the save fails outright —
  the document itself is not saved either, so pick from the exact list above
  rather than guessing at a name.

## Reset

Resetting a preview page restores the default (no custom decoration). Reset is
idempotent: resetting an already-default page is a success, not an error.

Reset also returns both switches to their defaults (on) and the skin to its
default (`""`, gold). They describe how a page is used and how it looks, so
they carry no meaning once the page itself is gone. An author
who decorates the role again starts from the defaults, not from the settings
they had before the reset.
