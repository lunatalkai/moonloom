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

A preview page document is a single JSON object with a top-level ordered list of
blocks. Each block is one whitelisted node; some blocks carry inline content, and
inline text can carry whitelisted marks.

```json
{
  "schemaVersion": "1",
  "blocks": [
    { "type": "heading", "level": 2, "text": "Who you are talking to" },
    {
      "type": "paragraph",
      "content": [
        { "type": "text", "text": "A night-shift archivist who ", "marks": [] },
        { "type": "text", "text": "remembers everything", "marks": [{ "type": "bold" }] },
        { "type": "text", "text": " and forgives nothing." }
      ]
    },
    { "type": "image", "src": "<asset-library image URL that passed review>", "alt": "The archive at night" },
    { "type": "divider" }
  ]
}
```

The `src` value in the example is a placeholder. Use a real URL from the
account's asset library that has already passed review (see Image rules).

## Schema v1 whitelist

Schema v1 accepts a fixed vocabulary. Anything outside it is rejected with
`invalid_param`.

- **11 block types**: `heading`, `paragraph`, `image`, `gallery`, `quote`,
  `callout`, `bulletList`, `orderedList`, `listItem`, `divider`, and `spacer`.
- **2 inline node types**: `text` and `hardBreak`.
- **6 marks** on inline `text`: `bold`, `italic`, `underline`, `strike`, `code`,
  and `link`.

Attributes are also constrained. Only whitelisted attributes survive, for
example `heading.level` (a small integer), `image.src` / `image.alt`,
`gallery.items[].src` / `gallery.items[].alt`, `link` target on a mark, and
`listItem` children. Unknown attributes are dropped or rejected; do not invent
attributes such as inline styles, class names, script handlers, or raw HTML.

Treat the concrete block names above as the v1 categories. The MCP validator is
the source of truth; when in doubt, save a small draft and read the
`invalid_param` `reason` and `path` rather than guessing.

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
- `image`: one figure with `alt` text. Use it for a hero or a section anchor.
- `gallery`: two to a few images read as a set (a mood board, a cast row).
- `quote`: a pulled line — an in-character motto, a review-style hook.
- `callout`: one boxed note the visitor should not miss (a content note, a
  premise one-liner).
- `bulletList` / `orderedList` with `listItem` children: scannable facts, rules,
  or a short "what you can do here" list. Keep items short.
- `divider`: a quiet section break between two ideas.
- `spacer`: breathing room where a divider would be too loud.

Marks add emphasis inside prose. Use `bold` and `italic` sparingly, `link` only
for a purposeful destination, and `code` for a literal token the visitor will
type or recognize. Over-marking reads as noise.

## Image rules

Every image in a preview page — `image.src` and each `gallery` item — must be a
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
