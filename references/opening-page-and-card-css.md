# Opening pages, card CSS, and display rules

Use this guide when an author asks for an opening web page (開場網頁), card
styles (卡片樣式), CSS selectors, or display rules / regex (顯示規則／正則).
All story text and artwork descriptions below are original synthetic examples.
The CSS sizes and colors in examples are design choices, not platform limits.

## Contents

- [Choose the right surface](#choose-the-right-surface)
- [Write an opening page](#write-an-opening-page)
- [Style the chat with cardCss](#style-the-chat-with-cardcss)
- [Write display rules](#write-display-rules)
- [Apply the work with an AI client](#apply-the-work-with-an-ai-client)
- [Check the result](#check-the-result)

## Choose the right surface

| Goal | Surface | What the model receives |
| --- | --- | --- |
| Show a custom introduction before the player's first message | `openingMode: "page"` and `openingPage` | None of this page's HTML, CSS, or JavaScript |
| Start with a character's opening message | `openingMode: "welcome"` and `roleWelcome` | The opening message follows the normal conversation path |
| Change this card's chat appearance | `cardCss` | No CSS |
| Restyle or hide markers in displayed messages | Display rules (`rules`) | The original message, unchanged by the display rule |
| Style XMLV3 narrative/components | Theme V3 | Follow [Theme V3 rendering](theme-v3-rendering.md) |
| Decorate the role detail screen | Preview page | Follow [preview-page authoring](preview-page-authoring.md) |

An opening page and a text opening are alternative opening presentations. The
inactive content is retained when switching modes. Page mode does not create an
assistant opening-message row. The page is shown when the new conversation has
no player message; it is not an extra assistant turn or a prompt instruction.
Put facts the model must know in the role definition or the appropriate story
resource as well. A secret written on the page is visible to the player.

The opening page is an independent HTML document. It does not automatically
inherit chat CSS, Theme V3, or the `hc-*` component runtime. Use ordinary HTML
buttons/forms there. `hc-*` message components belong to the chat HTML renderer;
see [HTML card components](html-card-components.md).

## Write an opening page

In the web card editor, open the opening step (開場白), choose opening web page
(開場網頁), and paste HTML into the page field. HTML, `<style>`, `<script>`, and
inline event handlers work in this author-controlled document. Do not strip
scripts as a prerequisite for authoring it.

### Frame and interaction contract

The web clients use an iframe with `srcdoc` and
`sandbox="allow-scripts allow-forms allow-pointer-lock"`, without
`allow-same-origin`. The frame's permission policy requests
`clipboard-write; autoplay`; the browser still decides whether those operations
are available. Do not depend on parent DOM access, parent storage, or navigation
outside the frame. Use the supplied `luna` API for the composer.

| Capability | Actual behavior |
| --- | --- |
| `luna.fill(text)` | Fill the player's composer draft; the player decides whether to send |
| `luna.send(text)` | Compatibility alias with the same draft-only outcome; it does **not** submit a chat message |
| `navigator.clipboard.writeText(text)` | The bridge also fills the draft, even if the browser cannot complete the clipboard write |
| Copy event | Selected text from a text field or document selection also fills the draft |
| Frame sizing | The bridge reports content height; short pages shrink, long pages scroll inside a frame capped by the chat area |

These are the complete `luna.*` methods for this opening-page bridge. Do not
invent `luna.navigate`, `luna.getState`, `luna.save`, or the APIs of a different
sandbox product. Both methods ignore blank input and truncate to 8,000 JavaScript
string units (not UTF-8 bytes). If a draft already exists, the chat client asks
the player before replacing it. The page itself never sends a model request.

The injected default is light paper: white background, dark text, no body margin,
and body padding. Your own later `<style>` can override it. `body`, `html`, and
`:root` **work inside this iframe**. Size content to its own viewport and allow
wrapping; a long page scrolls within the frame rather than stretching the whole
chat indefinitely.

`openingPage` may contain at most **512 KiB = 524,288 UTF-8 bytes**. Images embedded
as data URLs count toward that size. Measure the complete string, including CSS
and scripts, with `new TextEncoder().encode(html).length`.

### Minimal page

Paste this whole fragment as the opening page. The inline SVG data image is
self-contained; there is no image host to configure. Clicking the button fills
a proposed first message, leaving sending to the player.

```html
<style>
  body { font: 16px/1.6 system-ui; background: #f7f2e9; color: #29251f; }
  main { max-width: 38rem; margin: auto; }
  img { display: block; width: 100%; height: auto; border-radius: 12px; }
  button { padding: 12px 18px; background: #344c40; color: white;
    border: 0; border-radius: 10px; font: inherit; cursor: pointer; }
</style>
<main>
  <h1>The lantern workshop</h1>
  <img alt="An amber lantern in a dark green window" width="480" height="160"
    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='160'%3E%3Crect width='480' height='160' fill='%23344c40'/%3E%3Ccircle cx='240' cy='80' r='38' fill='%23f2c46d'/%3E%3C/svg%3E">
  <p>The last lantern is still unclaimed. Decide why you came to the workshop.</p>
  <button type="button" onclick="luna.fill('I came to ask about the unclaimed lantern.')">Prepare my first line</button>
  <p>You can edit the line in the chat box before sending.</p>
</main>
```

### Advanced page: build a first line from a form

This form collects a player choice and an optional detail, then fills the
composer. It does not persist story state. If a choice must affect the AI,
include it in the proposed message, as this example does.

```html
<style>
  body { font: 16px/1.6 system-ui; color: #242c30; background: #eef3f2; }
  main { max-width: 38rem; margin: auto; }
  label { display: block; margin: 14px 0; }
  select, input, button { box-sizing: border-box; width: 100%;
    min-height: 44px; padding: 10px; font: inherit; border-radius: 8px;
    border: 1px solid #70837e; }
  button { background: #254c42; color: white; cursor: pointer; }
  output { display: block; overflow-wrap: anywhere; margin-top: 12px; }
</style>
<main>
  <h1>A letter after closing time</h1>
  <p>Choose an approach, or write your own opening in the chat box.</p>
  <form id="arrival">
    <label>My approach
      <select name="approach">
        <option value="ask who left the letter">Ask about the letter</option>
        <option value="offer to help close the workshop">Offer practical help</option>
        <option value="wait outside and watch the window">Wait and observe</option>
      </select>
    </label>
    <label>One detail I want to add
      <input name="detail" maxlength="160" placeholder="For example: my coat is soaked">
    </label>
    <button type="submit">Prepare my opening</button>
  </form>
  <output id="result" aria-live="polite"></output>
</main>
<script>
  document.getElementById('arrival').addEventListener('submit', function (event) {
    event.preventDefault();
    const form = event.currentTarget;
    const detail = form.elements.detail.value.trim();
    const text = 'I ' + form.elements.approach.value + '.' +
      (detail ? ' One detail: ' + detail + '.' : '');
    document.getElementById('result').textContent = text;
    luna.fill(text);
  });
</script>
```

### Pair the page with first-message choices

You can also supply up to **20** player first-message candidates through
`role_patch_welcome.patch.prologue`. They are not alternate AI welcomes.
Before the first player message, the web client offers “Choose opening”
(選擇開場). Picking a line fills the composer, with confirmation before replacing
a nonempty draft. A page button and these choices can coexist. Neither sends
on selection. Keep candidates in the author's intended language.

## Style the chat with cardCss

`cardCss` is stored verbatim, up to **512 KiB = 524,288 UTF-8 bytes**. At runtime,
web clients compile a separate scoped stylesheet for this card's chat page and
remove it when that page is left. It cannot reach the independent opening-page
iframe or shadow-root internals of HTML Web Components.

### Native chat hooks

Use these hooks rather than copying incidental Vue class names. Both web clients
mark these chat elements. A hook affects only matching rendered nodes; a
collapsed toolbar, missing avatar, or a different rendering mode may have no
matching element.

| Selector written in cardCss | What it targets |
| --- | --- |
| `[data-lt="message"][data-lt-role="ai"]` | AI message row, including its body and adjacent row content |
| `[data-lt="message"][data-lt-role="user"]` | Player message row |
| `[data-lt="message-body"]` | Message bubble/body wrapper |
| `[data-lt="message-text"]` | Rendered message text region |
| `[data-lt="avatar"]` | Message avatar element |
| `[data-lt="composer"]` | Composer field wrapper |
| `[data-lt="send"]` | Send control |
| `[data-lt="retry"]` | Retry control where present |

For example, this changes the AI bubble without moving the player bubble:

```css
[data-lt="message"][data-lt-role="ai"] [data-lt="message-body"] {
  background: #f4ead7;
  color: #30281e;
  border: 1px solid #bca780;
  border-radius: 16px;
}
[data-lt="message-text"] p { line-height: 1.8; }
```

Ordinary Markdown output contains elements such as `p`, `strong`, `em`, `blockquote`,
`pre`, and `code`; scope their rules beneath `[data-lt="message-text"]`.
For stable narrative/dialogue styling, prefer your own display-rule classes
(e.g. `.story-action` / `.story-dialogue`) or Theme V3's declared hooks. Plain
prose does not automatically acquire a narration or dialogue class simply
because of its meaning. Example CSS for the display rules below:

```css
.story-action { color: #66717b; font-style: italic; }
.story-dialogue { color: #7b4e9b; }
.story-status { display: block; padding: 10px; border: 1px solid #738780;
  border-radius: 10px; color: #233b33; background: #edf4ef; }
```

### Supported Fengyue selector mapping

Fengyue `builtInCss` becomes `cardCss` on import. The following ID selectors
are translated; the IDs need not literally exist in LunaTalk's DOM.

| Fengyue selector | LunaTalk target | Declaration handling |
| --- | --- | --- |
| `#installedBuiltInCss` | This card's scoped chat root | Full |
| `#customized-answer` | AI message row | Full |
| `#customized-question` | Player message row | Full |
| `#customized-answer-container` | AI message body | Paint |
| `#customized-answer-content-container` | AI message body | Paint |
| `#customized-question-content-container` | Player message body | Paint |
| `#customized-answer-content` | AI message body | Full |
| `#customized-question-content` | Player message body | Full |
| `#customized-answer-content-markdown` | AI message text | Full |
| `#customized-question-content-markdown` | Player message text | Full |
| `#customized-answer-avatar` | AI avatar | Paint |
| `#customized-question-avatar` | Player avatar | Paint |
| `#customized-reload-button` | Retry control | Paint |
| `#ai-chat-input` | Composer | Full |
| `#ai-input-content` | Composer | Full |
| `#customized-ai-input-container` | Composer | Paint |
| `#ai-send-button` | Send control | Paint |
| `#ai-send-button-icon` | SVG inside send control, if present | Paint |

“Full” retains ordinary declarations after compilation. “Paint” filters
position/layout/size declarations such as `position`, `width`, `height`,
`display`, margins, padding, transforms, overflow, and `z-index`; use it for
colors and borders rather than relocating controls. If a comma-separated rule
includes a Paint target, that restriction applies to the whole rule.

Composer `:focus` becomes `:focus-within`, and `::placeholder` maps to the
client's placeholder element. Text/font declarations on the mapped composer
also propagate to its native textarea. For mapped bubble/composer text targets,
an explicit recognizable background without a text color can receive an
automatic readable text color. Set both yourself for predictable design.

### Scoping and unsupported CSS

- Ordinary selectors receive this card's root prefix. Author-defined classes
  and IDs remain usable inside it; `#installedBuiltInCss` maps to the root itself.
- The adapter uses `:where(...)` plus `:not(#lt-fy)` to preserve mapped ID
  specificity. Do not depend on generated scope IDs or write selectors against
  another card's generated root.
- `body`, `html`, and `:root` selectors are dropped because they cannot match
  beneath the card root. Use `#installedBuiltInCss` for root-level variables.
  This restriction belongs to `cardCss`, not `<style>` inside `openingPage`.
- Leading `.dark` and `html.dark` are adapted to a card-theme marker. With
  nonempty card CSS, current web chats set that marker to `dark`; it is not an
  automatic mirror of the player's OS light/dark preference.
- External `@import` is omitted from the runtime stylesheet; the source remains
  saved. Put needed declarations directly in this field.
- Nested selector blocks are skipped. Write flat selectors. Conditional
  wrappers such as `@media` and `@supports` are recursively compiled; ordinary
  `@keyframes` and `@font-face` blocks are retained.
- Unknown Fengyue interface IDs (including shortcut-command button IDs) are
  skipped. Selectors that would leave the card root via sibling combinators are
  skipped. `!important` is removed from ordinary declarations during compilation.

This conversion is for `cardCss` only. It does not rewrite legacy display-rule
`<style>` blocks. Their MMD/Tavern format follows the separate author-asset
contract in [Card Writer MCP](card-writer-mcp.md#role_get_author_asset--role_patch_author_asset--role_reset_author_asset).

### HTML content cards and theme variables

`hc-*` tags are components; `.hc-*` classes are CSS hooks. They are not
interchangeable. See the [component catalog](html-card-components.md) for
attributes and client support. Native DOM descendants can be styled normally;
a selector like `hc-btn button` cannot cross a component's shadow root. For a
component with shadow DOM, use its documented attributes and inherited variables.
Opening-page iframes do not register these components automatically.

The following are existing HTML **classes**, effective only on content that
actually uses them. They do not classify ordinary prose automatically.

| Class selectors | Elements affected |
| --- | --- |
| `.hc-p`, `.hc-c`, `.hc-light` | Paragraph, content container, light container variant |
| `.hc-h`, `.hc-h1`, `.hc-h2`, `.hc-h3`, `.hc-v` | Heading styles and emphasized values |
| `.hc-d`, `.hc-n` | Author-marked dialogue and narration |
| `.hc-f`, `.hc-fw`, `.hc-fj`, `.hc-fill`, `.hc-wrap` | Flex layouts, wrapping, justified rows, fill behavior |
| `.hc-tc`, `.hc-tr` | Center/right text alignment |
| `.hc-pt`, `.hc-pb`, `.hc-mt`, `.hc-mb`, `.hc-my` | Padding/margin helpers |
| `.hc-hr`, `.hc-st`, `.hc-sr` | Divider, status section, status row |
| `.hc-ol`, `.hc-g2`, `.hc-g3` | Option list and responsive grids |
| `.hc-avatar`, `.hc-avatar-sm`, `.hc-avatar-lg` | Avatars inside authored content, separate from chat-row avatars |
| `.hc-panel`, `.hc-quote`, `.hc-notice` | Panel, quotation, notice |
| `.hc-speaker`, `.hc-badge`, `.hc-info-row` | Speaker label, value badge, information row |
| `.hc-option`, `.hc-choices` | Option card and option-group layout; CSS alone adds no action |
| `.hc-bg-dark`, `.hc-bg-red`, `.hc-bg-blue`, `.hc-bg-green`, `.hc-bg-purple`, `.hc-bg-orange` | Background variants |
| `.hc-bg-glass`, `.hc-bg-dim`, `.hc-bg-dim-light`, `.hc-bg-pink`, `.hc-bg-cyan`, `.hc-bg-gold`, `.hc-bg-night`, `.hc-bg-forest`, `.hc-bg-blood` | Additional background variants |
| `.hc-glow`, `.hc-glow-text`, `.hc-gradient-text`, `.hc-shimmer`, `.hc-bg-aurora`, `.hc-pulse-border` | Decorative effects and animation |
| `.hc-scene`, `.hc-text-outline`, `.hc-hr-gradient`, `.hc-soft`, `.hc-mark`, `.hc-shadow`, `.hc-shadow-lg` | Scene surface, outlined text, divider, soft card, highlight, shadows |

For example, `.hc-d { color: #d9b8ff; }` changes marked HTML dialogue;
`.hc-n { color: #a8b5c0; }` changes marked HTML narration. In XMLV3, the
corresponding rendered classes are `.lt-d` and `.lt-n`; speaker, quote, choice,
and panel hooks include `.lt-speaker`, `.lt-quote`, `.lt-choice`, `.lt-panel`,
and `.lt-panel-title`. Write CSS class selectors, not XML tag aliases.

| Custom property | Current consumers and limits |
| --- | --- |
| `--lt-chat-composer-bg`, `--lt-chat-composer-border` | Composer background and border on both web clients |
| `--lt-chat-send-bg`, `--lt-chat-retry-bg` | Send control and image retry background on both web clients |
| `--lt-chat-composer-radius`, `--lt-chat-retry-radius` | Desktop consumers; mobile uses its own geometry |
| `--hc-primary`, `--hc-secondary`, `--hc-accent`, `--hc-dark` | HTML quote/speaker accents, gradients/aurora, badges/highlights, badge text respectively |
| `--hc-txt-c` | Text in supporting HTML containers/components; `.hc-c` sets its own default, so override on `.hc-c` when needed |
| `--lt-dialogue-color`, `--lt-speaker-color`, `--lt-quote-color` | Theme V3 dialogue, speaker, quotation |
| `--lt-choice-color`, `--lt-choice-bg`, `--lt-choice-border`, `--lt-choice-bg-hover` | Theme V3 choice appearance |
| `--lt-panel-bg`, `--lt-panel-border-color`, `--lt-panel-title-color` | Theme V3 panel appearance |
| `--lt-fs-body`, `--lt-s-2`, `--lt-s-3` | Theme V3 text sizing and paragraph spacing at consuming elements |

Set chat variables on `#installedBuiltInCss` to affect the card root:

```css
#installedBuiltInCss {
  --lt-chat-composer-bg: #202c28;
  --lt-chat-composer-border: #64796e;
  --lt-chat-send-bg: #355849;
  --hc-primary: #ae91db;
}
.hc-c { --hc-txt-c: #e6edf1; }
.lt-d { --lt-dialogue-color: #e4d6fa; }
.lt-n { color: #a6b8b2; }
```

Theme V3 establishes its own inner scope and baseline token values. A token
set only at the card root may be shadowed there; set it on the actual consuming
element (as `.lt-d` above), or use the dedicated Theme V3 authoring workflow.
Do not promise that `--lt-narration-color` alone changes baseline narration:
that baseline does not directly read it. Several `--lt-chat-bubble-*` tokens
are declared but not currently consumed by the chat renderer; use the bubble
selectors above instead. Similarly, do not assume an arbitrary `--hc-*` name
controls a Web Component: `hc-btn` uses `bg` / `txt-color` attributes, and `hc-bar`
uses its `color` attribute. A declared token is not evidence of a consumer.

## Write display rules

A display rule rewrites the text used for rendering, before the normal message
renderer runs. It never changes the saved story message or what the model reads.
Hiding text is presentation, not removal from the story context.

In the desktop web card editor, go to **關聯資產 → 顯示規則（正則）→ 編輯規則**.
For an empty list, the entry is 新增規則 instead. Add a rule, name it, fill its
match/replacement, and use the test-text field.
Inspect both the replacement text and the rendered preview; switch between the
selected rule and all rules to diagnose interactions. Enable/disable rules and
use Move up / Move down to set order. Each later rule receives the previous
rule's output. Finish the rule editor and save the role through its normal
save/submit path; the preview alone is not a saved card.

The dedicated manual editor is currently on desktop web; mobile web editing is
coming. Mobile web can render the saved rules. This is not an App-release claim.
An AI client can also write rules through MCP; see the workflow below.

### Match syntax and replacement

| Input | Meaning |
| --- | --- |
| `【notice】` | Literal text, matched everywhere; punctuation is not regex syntax |
| `/【notice】/g` | JavaScript regex written with delimiters |
| `/"([^"\n]+)"/g` | Capture text inside straight quotes |
| `$1` in replacement | Insert the first capture; `$2` through `$9` are also supported |
| Empty replacement | Hide each matched span from display |

Match fields are trimmed; a blank match is invalid. Regex flags supported by the
engine are `gimsuy`, with `g` added automatically. Invalid regexes and patterns
that match an empty string are rejected by the editor / skipped by runtime
rollback. Prefer bounded markers such as `[^】]+` rather than a greedy `.*` that
can eat several sections. Check rollback messages as well as the preview.

Captured text is inserted verbatim into the replacement. When wrapping captures
in HTML, define a marker contract whose contents are plain text; do not promise
that arbitrary captured HTML will be escaped for you.

Each rule's replacement is limited to **128 KiB = 131,072 UTF-8 bytes**. The
shared asset total is **32 MiB = 33,554,432 UTF-8 bytes**: rule IDs, names, match
strings and replacements plus `openingPage` and `cardCss`. These are storage
limits; a very broad replacement can still trigger runtime expansion rollback.
Keep replacements small enough to test comfortably.

### Five useful rules

Each block gives the fields to paste into one rule. All are original examples.
Use the class CSS above for the first three. The samples deliberately avoid
introducing block-level HTML at the beginning of a mixed Markdown message.

**Action text** — use single asterisks for actions; keep Markdown bold separate.

```text
Name: Action text
Find: /(?<!\*)\*(?!\*)([^*\n]+)\*(?!\*)/g
Replace: <span class="story-action">$1</span>
Test: *sets down the lantern* **The door opens.**
Result: <span class="story-action">sets down the lantern</span> **The door opens.**
```

**Dialogue** — color straight-quoted speech, leaving the quote marks visible.

```text
Name: Dialogue
Find: /"([^"\n]+)"/g
Replace: <span class="story-dialogue">“$1”</span>
Test: "Who left this here?"
Result: <span class="story-dialogue">“Who left this here?”</span>
```

**Status card** — a block-looking span preserves the normal Markdown path.

```text
Name: Status card
Find: /【Status:([^】\n]+)】/g
Replace: <span class="story-status" style="display:block">Status: $1</span>
Test: 【Status:Waiting】
Result: <span class="story-status" style="display:block">Status: Waiting</span>
```

**Hide a display marker** — the model still sees the marker in the original.

```text
Name: Hide marker
Find: /\[\[display-note:[^\]\n]+\]\]/g
Replace:
Test: A [[display-note:soft chime]]knock.
Result: A knock.
```

**Literal replacement** — no slashes are needed for exact marker text.

```text
Name: Scene label
Find: 【Scene】
Replace: <span class="scene-label">Workshop</span>
Test: 【Scene】 The lantern is lit.
Result: <span class="scene-label">Workshop</span> The lantern is lit.
```

### The first-line HTML trap

If a replacement makes the message start with a block-level tag such as `<div>`,
`<section>`, or `<p>`, the renderer can treat the **whole message** as heavy HTML.
It then skips Markdown parsing: later `**bold**` may remain literal and plain
newlines may not behave as expected. A lone leading HTML code fence can also be
unwrapped before this check.

For mixed Markdown, prefer `<span style="display:block">…</span>` when a visual
block is needed. Test a marker at the very start of the message followed by a
blank line, `**bold text**`, and several ordinary lines. If you intentionally
produce a full HTML message, write the entire message as HTML and use `<strong>`
and explicit structure instead. This is a renderer-mode decision, not a request
to remove the platform's script/style capabilities.

## Apply the work with an AI client

Drafting does not require MCP. First establish which surface the author wants,
preserve their text/language, and show the proposed page, CSS, and ordered rule
list. Route actual mutations to `lunatalk-card-author` and read the current
[Card Writer MCP contract](card-writer-mcp.md). Presentation/opening/component
planning skills do not themselves authorize a mutation.

1. Work on a private card by default, with the author's permission to change it.
   The author-asset tools require the logged-in card owner. This private-card
   workflow is a Moonloom convention; the current shared asset service checks
   ownership and does not impose an unpublished-only write restriction.
2. Call `role_get_author_asset`. Read `structuredContent.authorAsset`, including
   `version`, `rules`, mount fields, `cardFormat`, and existing presentation.
   A card without saved assets starts at `version: 0`.
3. Use `role_patch_author_asset` with the returned `version`, the required
   `schemaVersion`, a fresh `idempotencyKey`, and the role reference obtained
   from the normal tool workflow. This tool already supports `rules`,
   `openingMode`, `openingPage`, and `cardCss`; no new rules-write tool is needed.
4. Preserve the entire existing `rules` array, its order, mount settings, and
   `cardFormat` unless the author requested changes. This is a whole-asset save:
   omitting `rules` can clear them. Optional `openingMode`, `openingPage`, and
   `cardCss` preserve saved values when omitted; an explicit empty string clears
   page/CSS content. Switching modes does not require clearing inactive content.
   Do not reset an existing immersive/sandbox page configuration as a shortcut;
   if the available schema cannot preserve its configuration, use the web editor
   and explain the limitation rather than sending a lossy patch.
5. On `version_conflict`, read again, reconcile the author's intended change with
   the newer asset, then retry with a new request key. Do not overwrite with the
   old version or resend a different payload under a used key.
6. Save first-message choices separately via `role_patch_welcome.patch.prologue`.
   Re-read the saved asset/choices and test a new conversation on desktop and
   mobile web. A successful write confirms storage, not rendering quality.

For a manual handoff, return the full HTML, the CSS, and an ordered table of rule
name / find / replace / enabled. State the desktop editor path above, show test
inputs and expected results, and let the author paste and save. Do not claim
that producing a rule list has updated the card.

For Fengyue imports, keep `builtInCss` as `cardCss`, the introduction as
`openingPage`, and display-only regex rules as display rules. Do not convert
rules that rewrite AI context into presentation rules. Follow the complete
[bounded import mapping](fengyue-import.md).

## Check the result

- Check UTF-8 sizes for the page, CSS, each replacement, and their combined asset.
- Execute both HTML examples through the opening-page bridge; test button/form
  actions, empty details, a nonempty draft, and long input. `luna.send` must still
  leave sending under the player's control.
- Compile CSS before judging it; verify a positive target changes and another
  card/page does not. Check both web clients and page exit/re-entry.
- Run each rule against its stated input, then run the full ordered rule set.
  Include the first-line status marker plus Markdown bold/line breaks, a marker
  with no match, a disabled rule, and an invalid/empty-matching pattern.
- Check the actual new-conversation path after saving. Opening HTML/CSS/display
  transformations must not appear in model context as new instructions.
- Record what was executed. A document harness or successful MCP response is
  not desktop/mobile natural-path QA or an App release verification.
