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

- **11 block types**: `heading`, `paragraph`, `blockquote`, `bulletList`,
  `orderedList`, `listItem`, `dialogueBubble`, `statCard`, `spoiler`,
  `divider`, and `image`.
- **2 inline node types**: `text` and `hardBreak`.
- **6 marks** on inline `text`: `bold`, `italic`, `underline`, `strike`,
  `highlight`, and `textStyle`.

Attribute contract per node:

- `heading.attrs.level`: `2` or `3` only.
- `heading` / `paragraph` may carry `attrs.textAlign`: `left`, `center`, or
  `right` (the key is `textAlign`, not `align`).
- `dialogueBubble.attrs.name`: speaker label, at most 20 characters. Its
  content is inline (`text` / `hardBreak`). Paragraph-wrapped content is
  tolerated and flattened into lines on render — prefer plain inline content.
- `statCard.attrs.title`: at most 20 characters; `statCard.attrs.rows` is an
  array of `{ "k": "...", "v": "..." }`, at most 12 rows, each key and value at
  most 30 characters. `statCard` has no children (`content` stays empty).
- `spoiler.attrs.title`: at most 40 characters; its `content` is block nodes.
- `image.attrs.src`: an allowed asset URL (see Image rules).
- `highlight.attrs.tone`: `gold`, `rose`, or `violet`.
- `textStyle.attrs.color`: one of the 8-value palette `gold`, `rose`,
  `violet`, `mint`, `sky`, `amber`, `silver`, or `default` (empty/`default`
  means no color).

Unknown node types, marks, or attributes are rejected; do not invent inline
styles, class names, script handlers, or raw HTML.

## Hard limits

These caps are part of the author contract:

- The whole document must stay under **200 KB** when serialized.
- The document must contain at most **200 blocks**.
- Any single text field must stay under **20000 characters**.

A document over any cap is rejected. Keep a preview page to a readable
introduction — a handful of sections, not a novel. If content is long, cut or
summarize rather than splitting one idea across dozens of thin blocks.

## Node to visual semantics

Use the block that matches the reading intent, not the one that looks densest.

- `heading` (`level` 2 or 3): a short section label. Do not stack many headings
  with no body between them.
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
- `image`: one figure. Use it for a hero or a section anchor.
- `divider`: a quiet section break between two ideas.

Marks add emphasis inside prose. Use `bold` and `italic` sparingly, `highlight`
for at most a few glowing phrases, and `textStyle` colors so the page keeps at
most one or two accent colors. Over-marking reads as noise.

## Image rules

Every image in a preview page — each `image` node's `attrs.src` — must be a
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
- `rejected`: the saved content did not clear moderation. Adjust the content and
  save a new version. A rejection carries a `rejectReason` category (such as a
  text or image policy class) but no per-node location, so re-read the document
  and self-check against the category rather than expecting an exact pointer.

Two more author-facing facts:

- A version you save replaces the previous one. Concurrency is guarded by a
  version number: if the page changed since you last read it, the save is
  refused as a conflict — re-read the current version, reapply your change, and
  save again.
- A page that already `passed` may temporarily not be visible to visitors while
  the platform pauses preview display. This is a display pause, not a rejection,
  and does not require re-saving.

## Reset

Resetting a preview page restores the default (no custom decoration). Reset is
idempotent: resetting an already-default page is a success, not an error.
