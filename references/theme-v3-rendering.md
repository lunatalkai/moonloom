# Theme V3 and Rendering Notes

Use this reference when authoring or reviewing visual card content. For
pre-authoring or pre-render decisions about what belongs in XMLV3, Theme V3,
HTML, visible state, hidden state, or first-screen hierarchy, read
`presentation-design.md` first. When a card intentionally uses HTML mode or
`hc-*` HTML card components, use `lunatalk-html-card-components` and also read
`html-card-components.md`.

## Default choice

For new LunaTalk cards, prefer:

```text
XMLV3 welcome + Theme V3 styling
```

This keeps semantic story content separate from reusable visual style and makes
render review easier for AI clients.

## Custom Theme V3 closed loop

Use custom Theme V3 when default styling cannot carry the role atmosphere,
worldview, story mood, custom action hierarchy, or custom `tone` values. Theme
V3 is for reusable visual language, not story facts.

Required loop before acceptance:

1. Draft the XMLV3 bubble and Theme V3 CSS together.
2. Call `theme_validate_css` and fix sanitizer warnings that affect the intended
   style.
3. Call `render_xmlv3_theme_case` to get a MCP preview URL and structured
   diagnostics before mutating a real role.
4. Run Visual Check in desktop and mobile using screenshots plus
   `window.__LUNATALK_MCP_PREVIEW__` when available.
5. Patch XMLV3 or Theme V3 CSS when contrast, spacing, overflow, unresolved
   custom tone hooks, action hierarchy, or mobile touch target issues appear.
6. Repeat for at most 3 loops / 3 iterations. If it still fails, report the
   remaining visual risk instead of claiming pass.
7. Only after the case passes, call `theme_create` or `theme_update`, then
   `theme_bind`, then real `render_preview`. Use `theme_submit` only when the
   author wants the Theme V3 itself submitted to the public market review queue.

Use `theme_get` or `theme_list_available` when deciding whether to extend an
existing theme. Use `theme_create` for a new private custom theme and
`theme_update` for an owned draft. Use `theme_submit` after review evidence when
the theme should become market-review pending. Never rely on default fallback
when custom `data-tone` or `tone` hooks are part of the XMLV3 card.

Official themes are read-only: `theme_update` returns `official_theme_read_only`
if the target is official. Call `theme_fork` first to copy an official, public,
or already-owned theme into a new owned `themeId` that can then take
`theme_update`. `theme_fork` is not the same operation as `theme_bind` with
`mode: "forked"`: `theme_bind(mode: "forked")` only freezes a CSS snapshot onto
one role and creates no new theme record, while `theme_fork` creates an
independent, reusable theme the caller can keep editing. Use `theme_unbind` to
remove a role's Theme V3 binding without touching the theme record, and
`theme_delete` to remove an owned theme entirely — deleting a theme
automatically unbinds every role that still referenced it.

## AI Chat Bubble UI Guide

Design inside the AI reply bubble as message output, not as app chrome. Separate
the hierarchy:

- Dialogue / 台詞: use `<d>` for spoken lines.
- Narration / 旁白: use `<n>` for action, scene movement, and sensory prose.
- Status / 狀態: use `<field>` for text or enum facts and `<bar>` only for
  numeric continuous values.
- Choices / 選項: use `<choices>` with child `<choice>` so the action layout is
  explicit and durable.
- Hidden state: use `<state>` outside visible prose; keep it synchronized with
  visible fields or bars.

Theme V3 owns palette, borders, panel surfaces, button states, and custom tone
hooks such as `.lt-choice[data-tone="postal"]` or
`.lt-layout-panel[data-tone="signal"]`. XMLV3 owns the semantic content. Do not
put one-off inline `style` or `class` into XMLV3 just to force a look.

### Theme CSS hook contract (read before writing any theme CSS)

The renderer turns each core tag into a fixed `.lt-*` class, and the client
**drops every rule whose selector does not start with `.lt-`**:

| Tag | Class hook |
| --- | --- |
| `<scene>` | `.lt-scene` |
| `<n>` narration | `.lt-n` |
| `<d>` dialogue | `.lt-d` |
| `<speaker>` | `.lt-speaker` |
| `<quote>` | `.lt-quote` |
| `<choice>` | `.lt-choice` |

Rules for theme CSS:

- Target only `.lt-*` selectors and set only `--lt-*` variables (plus `:root`
  and `body`). **Never invent selectors** like `.scene-card`, `.narration`, or
  `.dialogue`, and never set non-`--lt-` custom properties like `--card-bg` for
  color — the client drops those rules, so the theme renders with **no effect**
  and the card silently falls back to base styling.
- `theme_validate_css` (and `theme_create` / `theme_update`) return
  `styleHookCount`. **`styleHookCount: 0` means the CSS hit zero Theme V3 hooks
  — treat it as dead CSS and rewrite** using `.lt-*` / `--lt-*` before moving on;
  the tool now also returns a `warning` status and steers you back to
  `theme_update` in that case.
- The base default leaves `.lt-n` and `.lt-d` visually identical (no color, no
  bubble) on purpose — **differentiating narration from dialogue is the theme's
  job**. A theme that does not distinguish `.lt-n` (muted prose) from `.lt-d`
  (brighter, e.g. speaker nameplate + accent) is incomplete. Colors come from
  `--lt-c-text` / `--lt-c-text-dim` / `--lt-c-gold`; dialogue/choice surfaces
  from `--lt-dialogue-*` / `--lt-choice-*`; speaker from `--lt-speaker-color`.

### Styling custom components (their internals are NOT reachable from `.lt-scene`)

The six hooks above cover the **core story tags only**. A **custom component**
renders as its own element with class `.lt-cmp-<tag>` (e.g. a `<bond-meter>`
component → `.lt-cmp-bond-meter`), and it is a **sibling** of `<scene>`, NOT a
child of it. `.lt-scene` wraps only the `<scene>` tag, so a custom component's
internal elements are unreachable from any `.lt-scene …` selector.

Style a custom component's internals in the **component's own `css` field**
(`components[].css`), never the theme global css. The renderer **auto-scopes**
that css to the component so it cannot leak:

- `:host` → the component root `.lt-cmp-<tag>`.
- `part(name)` → an element you marked with `part="name"` on a template element
  (it renders as `.lt-part-<name>`).
- any other selector (e.g. `[data-tone="fill"]`) is auto-prefixed with
  `.lt-cmp-<tag> `, so it matches only inside this component.

Two rules that cause the classic **"meter bars never paint"** bug:

1. **NEVER style custom-component internals from the theme global css under
   `.lt-scene`.** `.lt-scene` wraps only the `<scene>` tag, so a rule like
   `.lt-scene [data-tone="track"] { height:6px }` matches nothing for a sibling
   custom component — the track stays `height:0` / transparent and no bar paints,
   even though the fill's inline `width` is applied. This is exactly why generated
   meters render as bare labels with no bars.
2. **Put `--lt-*` design tokens on `:root`, not on `.lt-scene`.** Design tokens on
   `:root` resolve everywhere; tokens declared on `.lt-scene` are **undefined for
   everything outside a scene** — i.e. every custom component — so
   `background: var(--lt-c-accent)` resolves to nothing and the fill is invisible.
   `:root` is allowed by the contract; use it for tokens.

Meter pattern, correct end-to-end: mark the bar elements with `part` in the
template — `<view part="track"><view part="fill" width="{value}%"></view></view>`
inside the vertical stack — and style them in the component's `css` field:
`part(track){height:6px;background:var(--lt-track-bg);border-radius:3px;overflow:hidden}`
and `part(fill){height:6px;background:var(--lt-c-accent);border-radius:3px}`. The
fill's height + background come from the component css; its width comes from the
`width="{value}%"` binding; the `--lt-*` tokens live on `:root`. See the complete
`bond-meter` example below.

Visual Check must verify readable contrast, no clipping or overlap, clear action
hierarchy, resolved custom tone hooks, and mobile touch target size. Use at
least 44pt / 48dp as the practical minimum target for tappable choices and CTAs.

## Theme quality: a rich, genre-coherent world — not a bare reskin, not a generic dashboard

A LunaTalk theme is **not** a palette swap over the base dialogue tags. Every
strong theme is **rich**: it dresses the whole story in a coherent set of
in-world custom XMLV3 components, and it carries at least **two signature
narrative objects** that belong only to that genre. Richness is the product; the
discipline is that every piece must be **genre-coherent** — dressed in this
story's material world, not a naked widget.

**Study real exemplars before you design.** Call `theme_list_available` with
`includeOfficial: true` and read the `tagConfig` of two or three official themes
across different genres. Internalize how a complete theme is built — the
component set, how each piece is skinned into its world, and when each one is
allowed to appear — rather than designing a theme from an empty page.

### The component set a rich theme targets

Skin every piece below into the theme's genre. The synthetic examples are
illustrations, not a catalog to copy — your components should be your genre's.

- **Identity header (×1)** — an in-world identity card emitted **once** when the
  session opens (synthetic examples: a guild charter, a field badge, a
  ship's manifest). Re-emit only when the identity itself changes, never every
  turn.
- **Three-stat pulling status (×1)** — a status card with exactly **three stats
  that pull against each other**, each a 0–100 meter plus a `delta` line and an
  italic `hint`. The soul is the **tension**: raising one stat forces another
  down (synthetic example: raising `影响力` necessarily raises `暴露`, or spends
  `资源`). Re-emit the whole status **every action**; never let all three improve
  at once.
- **Timeline (×1)** — done / now / next rows with exactly one "now" row, and it
  **always ends on a "next" hook** (a countdown or a promise) so the player
  always sees what is coming. Re-emit on **stage change**, not every turn.
- **Collection grid (×1)** — a 2-column badge grid with single-direction
  progress (`todo → done → key`). List every known item including `todo`; keep at
  most two `key` items lit at once. It never regresses.
- **Cost/risk choices (×1)** — choice cards that each carry an **act, a cost, and
  a risk**, 2–3 at a time, with costs on **different axes** (time vs trust vs
  safety). Pair the card with a native `<choice send>` (the card displays, the
  choice is the tappable button) and always include a free-input "describe it
  myself" fallback option.
- **Signature narrative objects (×2 or more)** — **the soul of the theme**:
  genre-defining narrative **objects**, not dashboards — a prop, document, or
  ritual from the story world, each with its own independent layout (synthetic
  examples: a wax-sealed letter that unfolds, a brewing apparatus that fills as a
  craft completes). These carry the strictest cadence: surface them only on
  **milestones**, never every turn.

**Cadence / emit-timing discipline is part of the design, not an afterthought.**
Identity once, status every action, timeline on stage change, collection on
acquisition, signatures on milestones. A theme whose components all fire every
turn floods the screen and drifts; a theme whose state only moves one direction
(a grid that never regresses, a status that re-states the whole picture each
action) stays self-consistent turn over turn.

### The two failure modes (avoid both)

- **Bare reskin (under-built).** A theme that only recolors the base
  `<n>` / `<d>` / `<scene>` tags with `tagConfig: {}` and **zero custom
  components** is not a theme — it is a palette. It gives the card none of the
  in-world structure above and reads as flat prose in new paint. A theme with no
  custom components is unfinished.
- **Generic kitchen-sink (mis-built).** The opposite failure is piling on
  **ungenred** mechanic widgets — raw dice rolls, DC / skill checks,
  combat / enemy panels, loot grids — that **could belong to any game** and are
  dressed in nothing but a palette. That reads like a QA fixture, not a designed
  world. The fix is **not fewer components** — it is genre-coherence: every
  component must be dressed in this story's material world, and at least two must
  be genuine signatures. If a component would fit any other theme unchanged, it
  is generic; redesign it, do not delete the richness.

The needle between them is **rich AND genre-coherent AND signature-bearing.** Add
components generously, but every one must earn its place by belonging to this
genre, and two or more must be objects only this world would have.

**Each component above is only real when it ships a `template` + `example`.** The
structure that makes a piece rich comes entirely from its `template` of FL3
primitives — a status meter is `<view tone="track"><view tone="fill"
width="{x}%">` bars, a timeline is rows, a collection grid is a `<grid-layout>`,
a signature note is its own paper — and its editor preview comes from its
`example`. A component that declares only `extends` + `attributes` renders as a
flat colored box no matter how genre-right its name: that is the bare-reskin
failure one component deep. See the custom-component declaration section below
for the full contract and a complete meter example.

### Visual standards (how the layers read)

- Build hierarchy with **whitespace, font weight, and de-emphasis color** — not
  by wrapping every block in a bordered box. Boxes-on-boxes is the engineering
  look the paradigm rejects; a divider line or a shift in weight usually beats a
  new card.
- **Narration vs dialogue must be visually distinct**: narration is muted / calm
  prose (`--lt-c-text-dim`), dialogue is brighter with a **speaker nameplate**
  and an accent bubble (`--lt-c-text` + `--lt-speaker-color` + `--lt-dialogue-*`).
- **Inner thought (`<quote>`)** reads as a softer tinted / italic aside, not
  another box.
- **Mainstream plus one accent**: keep the whole surface calm and let a single
  brand accent (one gold sparkle, the speaker nameplate) be the one highlight. At
  most two accent colors on screen. A rich theme is still visually disciplined —
  the richness lives in the **structure and the in-world objects**, not in a riot
  of color.

### Anti-homogenization (so every theme does not look the same)

Separate two layers so themes share plumbing but read as distinct:

- **Mechanism layer** (status row, choice grid, collection grid, timeline, ID
  card): sharing structure across themes is a feature — only the CSS skin differs.
  Do not rename a shared mechanic to fake distinctiveness.
- **Signature layer**: each theme should carry at least **two genre-specific
  narrative objects** (a prop / document / ritual from the story world, with its
  own independent layout), not another dashboard widget.

Two quick tests before shipping a theme:

- **Genre-noun test**: strip the genre nouns from a component's description. If
  what remains ("a card with three lines of text and a stamp on the right") would
  fit any other theme, it is a clone — redesign it.
- **Grayscale silhouette test**: desaturate a screenshot. If it is
  indistinguishable from another theme's silhouette, the difference was only
  color. Push the difference into **structure** (circular gauge / vertical text /
  scattered pinboard / dual-axis scroll / terminal scanline …), not the palette.

## HTML Card Components

HTML mode is a legacy/custom-layout exception, not the default for new cards. If
HTML is justified, use the stable component catalog in
`html-card-components.md`: `hc-btn`, `hc-bar`, `hc-stat`, `hc-tag`,
`hc-collapse`, `hc-radio`, `hc-checkbox`, `hc-input`, and `hc-form`. Do not
invent new `hc-*` components or rely on scripts, inline event handlers, external
URLs, or client-specific custom elements. If XMLV3 plus layout/control packs can
express the same play value, stay in XMLV3. Renderer modes are mutually
exclusive: never put `hc-*` or HTML containers inside XMLV3 content.

## Server guide vs role contract

XMLV3's generic tag grammar is a platform concern. The server injects the
XMLV3 format guide near generation so AI clients do not need to paste the full
platform tag manual into `roleDetailDesc`.

Use `roleDetailDesc` for the card-specific format contract instead:

- which state fields this card updates
- which status bar fields this card shows and how each one updates
- when choices should appear and what they should change
- which optional extension pack is part of the card shape
- which visible status labels matter to play
- what the assistant must never decide for the player
- roleDetailDesc: when this card should use controls, which state fields update,
  and what visible choices/status blocks mean

Do not copy a generic XMLV3 instruction manual into detail. That wastes the
durable engine budget and makes future platform guide updates harder to follow.

## Compatible XMLV3 Extension Target

Keep XMLV3 evolution on one compatible XMLV3 extension target. No XMLV4:
do not create XMLV4, XMLV5, or a new format name when extending the framework. Add optional
tags, optional attributes, or extension packs with fallback behavior while
keeping older XMLV3 tags backward compatible.

## XMLV3 feature levels

Use XMLV3 feature levels to separate the stable baseline from newer renderer
capabilities.

- **Feature Level 1** is the 2026-05-27 XMLV3 baseline. Treat it as supported by
  all XMLV3-capable LunaTalk clients. It covers the core XMLV3 tags and older
  extension behavior.
- **Feature Level 2** is the HTML-parity extension layer. It covers layout
  containers, explicit grouped/weighted choices, fact-card style visible status,
  semantic speaker usage, and token-economy guidance for dynamic XML output.
- **Feature Level 3** is the atomized layout and custom component layer. It adds
  lowercase/kebab-case `<linear-layout>`, `<flex-layout>`, and `<grid-layout>`;
  primitives such as `<view>`, `<container>`, `<card>`, `<text>`, `<heading>`,
  `<paragraph>`, `<image>`, `<button>`, `<badge>`, `<notice>`, `<list>`,
  `<list-item>`, `<avatar>`, `<info-row>`, and `<fact>`; and Theme V3
  `tagConfig.xmlv3.components` custom controls based on those atoms.
- **Feature Level 4** is the template component layer (`custom.templates`
  capability). A Theme V3 custom component may declare a `template` — a small
  tree of FL3 primitives that the client expands at render time — so each
  dynamic turn only carries the compact custom tag and its declared
  attributes. See "Template components (Feature Level 4)" below.

Cards should declare the minimum XMLV3 feature level they require. A card that
uses Level 2 tags or behavior should set its minimum feature level to `2`; a
card that uses Level 3 primitives or custom components should set its minimum
feature level to `3`. List the relevant capabilities, such as
`layout.containers`, `choices.weighted`, `status.fact-cards`,
`speaker.semantic`, `token.output-economy`, `layout.standard-v3`,
`view.primitives`, `custom.registry`, or `custom.templates`. A baseline XMLV3
card should remain at Level 1. A theme that declares template components does
**not** force the card minimum to `4`: older clients render the component's
skin base plus the children alt text, so the content stays readable. Declare
minimum level `4` only when the template carries interaction the degraded view
cannot express.

When generating dynamic assistant turns, do not assume the latest XMLV3 feature
level. Generate at or below the client-declared renderer level. If the client is
Level 1, use Level 1-safe output even when the platform has newer guidance. If a
card itself requires Level 2 and the current client only supports Level 1, treat
that as a compatibility issue before judging the prose or interaction quality.

Level 2 and Feature Level 3 are still XMLV3, not a new format. Do not create XMLV4/XMLV5, do not
paste raw HTML into XMLV3, and do not copy a full platform XMLV3 manual into
`roleDetailDesc`. The role should contain the card-specific contract: which
feature level it needs, which packs are enabled, which state fields update, and
how visible status/actions should behave.

FL3 size attributes use XMLV3 layout unit numbers. Write `height="120"` rather
than `height="120px"` or `height="240rpx"`: Desktop/H5 maps 1 layout unit to
1px, while Mobile/uni-app maps 1 layout unit to 2rpx. Use token values such as
`padding="md"` and `gap="sm"` when possible.

Theme V3 custom components live in `tagConfig.xmlv3.components`. A declaration
names a lowercase/kebab-case tag, chooses an atomic `extends` primitive, lists
allowed semantic `attributes`, and — for any component that is more than a
one-primitive skin — **MUST declare a `template`** (the FL3 primitive tree that
gives it real visual structure) **and an `example`** (a realistic usage string
the theme editor's live preview and the degraded/alt render both depend on). A
declaration that sets only `tag` + `extends` + `attributes` renders as a **flat
box** — a name-and-color shell with none of the meter bars, timeline rows, grid
cells, or note paper it is supposed to show. That hollow shell is the
bare-reskin failure one component deep: "rich" in name only. A component with no
`example` is worse than invisible — the editor preview cannot render it, so it
shows none of your theme's components and falls back to a generic universal
sample. It may also include `defaults` and scoped component CSS. In component
CSS, `:host` targets the custom component root and `part(name)` targets an
atomic child with `part="name"`. In XML, add `part="name"` only as a stable
local hook; do not add `class` or `style`.

**Declare `tagConfig.xmlv3.officialComponents`** too — at least `["dialogue"]`. A
theme that omits `officialComponents` is treated as a **legacy** theme, which
also triggers the generic universal fallback sample (dice / DC / generic combat
props in default colors) in the editor preview instead of the theme's own
components. So a complete theme carries, at the `xmlv3` level, all three:
`officialComponents`, a `components[]` library where every structural entry has a
`template` + `example`, and `enabledComponents`.

### Enabling custom components (`enabledComponents`)

`tagConfig.xmlv3.enabledComponents` is an opt-in gate for custom components,
parallel to `officialComponents` for official ones. The `components[]` array is
the **library** of all defined custom components; `enabledComponents` selects
which of them are **active** — only active custom components register for
rendering, are offered to the AI, and appear in the theme's component list.

- When `enabledComponents` is **absent** (not an array), all custom components in
  `components[]` are enabled (backward-compatible default).
- When it is an **array**, only the listed tags are active; an empty array `[]`
  enables none.
- Disabling a custom component never deletes it — its definition stays in
  `components[]` (the library), so re-enabling restores it unchanged.

A complete theme block looks like this — note the `officialComponents`, the full
`template` + `example` + per-component **`css`** on the structural component, the
`--lt-*` tokens on **`:root`** (in the theme global css, shown below the block),
and `enabledComponents` (a synthetic bond meter; invent your own genre and stat
names, do not copy any official theme):

```json
{
  "xmlv3": {
    "officialComponents": ["dialogue"],
    "components": [
      {
        "tag": "bond-meter",
        "extends": "card",
        "name": "Bond meter",
        "description": "Three bonds that pull against each other",
        "attributes": { "warmth": "0-100", "trust": "0-100", "doubt": "0-100", "delta": "what just moved", "hint": "the tension this turn" },
        "defaults": { "warmth": "50", "trust": "50", "doubt": "20" },
        "template": "<card padding=\"md\" gap=\"sm\"><linear-layout orientation=\"vertical\" gap=\"sm\"><linear-layout orientation=\"vertical\" gap=\"xs\"><flex-layout justify=\"between\" alignment=\"center\"><text>暖意</text><text>{warmth}</text></flex-layout><view part=\"track\"><view part=\"fill\" width=\"{warmth}%\"></view></view></linear-layout><linear-layout orientation=\"vertical\" gap=\"xs\"><flex-layout justify=\"between\" alignment=\"center\"><text>信任</text><text>{trust}</text></flex-layout><view part=\"track\"><view part=\"fill\" width=\"{trust}%\"></view></view></linear-layout><linear-layout orientation=\"vertical\" gap=\"xs\"><flex-layout justify=\"between\" alignment=\"center\"><text>疑慮</text><text>{doubt}</text></flex-layout><view part=\"track\"><view part=\"fill\" tone=\"warn\" width=\"{doubt}%\"></view></view></linear-layout></linear-layout><text tone=\"delta\">{delta}</text><text tone=\"hint\">{hint}</text></card>",
        "css": ":host{display:block} part(track){height:6px;background:var(--lt-track-bg);border-radius:3px;overflow:hidden;margin-top:2px} part(fill){height:6px;background:var(--lt-c-accent);border-radius:3px} [data-tone=\"warn\"]{background:var(--lt-c-warn)} [data-tone=\"delta\"]{color:var(--lt-c-accent);font-size:12px} [data-tone=\"hint\"]{color:var(--lt-c-text-dim);font-style:italic;font-size:12px}",
        "example": "<bond-meter warmth=\"62\" trust=\"48\" doubt=\"30\" delta=\"暖意 +12,疑慮 +8\" hint=\"你靠得越近,她越怕被看穿\">暖意62 信任48 疑慮30</bond-meter>"
      }
    ],
    "enabledComponents": ["bond-meter"]
  }
}
```

The tokens the component css references live on `:root` in the **theme global
css** field (never on `.lt-scene`, or they would be undefined for this sibling
component):

```css
:root {
  --lt-track-bg: rgba(255,255,255,.12);
  --lt-c-accent: #e58fb0;   /* warmth / trust fill */
  --lt-c-warn:   #d98a4a;   /* doubt fill */
  --lt-c-text-dim: rgba(255,255,255,.6);
}
```

Why this paints where the old shape did not:

- The `template` marks each bar rail `part="track"` and its inner fill
  `part="fill"`; the component's **`css` field** styles them via `part(track)` /
  `part(fill)`, which the renderer auto-scopes to `.lt-cmp-bond-meter`. The fill's
  **height + background come from the css**; its **width comes from the
  `width="{warmth}%"` binding**. Without the css field the bars are `height:0` and
  transparent — a template alone paints nothing.
- Each stat is a **vertical stack**: a label + value row on top
  (`<flex-layout justify="between">`), then the `part="track"` rail on its **own
  full-width row** below. **A meter's track must sit on its OWN full-width row
  inside a vertical stack.** Never place a `weight`-bearing label and the track in
  the **same horizontal flex row** — the label's flex-grow steals the width, the
  track collapses to zero, and no bar paints.
- The doubt fill carries `tone="warn"`; the auto-scoped `[data-tone="warn"]` rule
  in the component css overrides its color, so one stat reads as caution without a
  separate component.

The `example` is what the editor preview renders, so the author sees a real bond
meter with painted bars, not a gold dice widget. `enabledComponents` gates which
library entries are active: listing only `bond-meter` activates that tag even if
`components[]` defines more.

A declaration may also carry an optional `name`: a short human-readable display
title (mirroring official components) shown as the card heading in the theme
editor. Keep it plain and reader-friendly — describe what the author sees, not
the tag or any engine term. When `name` is absent, the client falls back to a
humanized form of the `tag` (`relationship-meter` → `Relationship Meter`), so
always set `name` when you want a clean, non-technical title:

```json
{
  "tag": "relationship-meter",
  "extends": "card",
  "name": "Relationship meter",
  "description": "Shows how close the player and character have become"
}
```

Custom components may also declare root `defaults`:

```json
{
  "tag": "primary-action",
  "extends": "button",
  "defaults": {
    "tone": "primary",
    "variant": "solid",
    "width": "full",
    "height": "44",
    "borderRadius": "pill"
  }
}
```

Defaults are XMLV3/FL3-only. They do not change legacy HTML cards or `hc-*`
HTML components. The merge order is:

```text
primitive defaults < component defaults < XML instance attrs
```

This means a component can define normal spacing, variant, tone, radius, or
sizing once, while a specific XML tag can still override it. Alias overrides are
kept compatible: XML `border-radius`/`radius` overrides a default
`borderRadius`, and XML `align` overrides a default `alignment`.

## Custom component normalization and diagnostics

Renderers normalize `tagConfig.xmlv3.components` before registering anything.
Declarations that fail normalization are silently skipped at render time, so
XML that uses a skipped tag falls back to plain child text. The Theme V3 MCP
tools (`theme_validate_css`, `theme_create`, `theme_update`,
`render_xmlv3_theme_case`) report every normalization decision through the
`componentDiagnostics` array described in `card-writer-mcp.md`. Treat
`error`-severity entries as authoring blockers and fix `tagConfig` before
binding the theme.

A declaration registers only when all of these hold:

- `tag` is lowercase kebab-case (`hp-bar`, not `Hp-Bar`, `1bar`, or `bar-`);
  otherwise `invalid_tag_name`.
- `tag` does not collide with a reserved LunaTalk tag (core tags, legacy layout
  tags, and the FL3 primitives); otherwise `reserved_tag`.
- `tag` is not declared twice; later duplicates get `duplicate_tag`.
- At most 24 components register per theme; extra declarations get
  `component_limit_exceeded`.

`extends` must be a non-container atomic primitive: `view`, `container`,
`card`, `text`, `paragraph`, `heading`, `image`, `button`, `badge`, `notice`,
`list-item`, `avatar`, `info-row`, or `fact`. Any other value falls back to `view`
and the component still registers, reported as `invalid_extends_fallback_view`.
The container-flow primitives (`linear-layout`, `flex-layout`, `grid-layout`,
`list`) are not valid `extends` bases.

`defaults` attrs are sanitized one by one; every removed attr is reported as
`default_attr_dropped`:

- Keys must be simple attribute names. `style`, `class`, and any `on*` key are
  always dropped.
- Values must be a string, number, or boolean. Trimmed values must be
  non-empty and at most 512 characters.
- At most 32 default attrs are kept per component.

## Template components (Feature Level 4)

A custom component may declare a `template`: an XMLV3 string describing the
primitive tree the component expands into. The client expands the template at
render time, so dynamic turns pay only for the compact tag, not the structure
— structure tokens move into the theme once instead of being re-emitted every
message.

```json
{
  "tag": "hp-bar",
  "extends": "card",
  "name": "HP bar",
  "description": "Label + meter + value in one compact tag",
  "attributes": { "label": "display name", "value": "current value", "max": "max value", "tone": "tone hook" },
  "defaults": { "tone": "danger", "max": "100" },
  "template": "<card tone=\"{tone}\" padding=\"sm\"><flex-layout alignment=\"center\" gap=\"sm\"><text part=\"label\">{label}</text><badge part=\"value\">{value}/{max}</badge></flex-layout></card>",
  "example": "<hp-bar label=\"HP\" value=\"30\" max=\"100\">HP 30/100</hp-bar>"
}
```

### Template field contract

- The template must have **exactly one root element** (single root). Multiple
  roots or root-level text are rejected.
- Allowed tags are the 18 FL3 primitives plus at most one `<slot/>`. Core
  story tags, extension pack tags, `<state>`, and other custom components are
  forbidden inside a template. `slot` is a reserved tag name and cannot be
  registered as a custom component.
- Attributes must use straight double or single quotes (`name="value"`). XML
  comments, CDATA, processing instructions, DOCTYPE, fullwidth quotes,
  unquoted values, and bare value-less attributes are rejected.
- Hard limits: source at most 4096 characters, at most 64 nodes, nesting depth
  at most 8. Template node attrs follow the same sanitization as `defaults`
  (`style` / `class` / `on*` dropped, values at most 512 characters).
- Placeholders use `{name}` (lowercase kebab-case identifiers, e.g. `{label}`)
  in attribute values and text nodes. The substitution domain is the declared
  `attributes` and `defaults` keys; value priority is XML instance attr >
  default > empty string. Substitution is **single-pass**: a substituted value
  is never re-scanned for placeholders and never re-parsed as XML — placeholder
  values are opaque text, so markup inside a value stays literal text.
- `<slot/>` marks where the custom tag's children render. At most one slot is
  allowed, and it must sit directly under a container primitive (`view`,
  `container`, `card`, `linear-layout`, `flex-layout`, `grid-layout`, `list`,
  `list-item`, `notice`, `info-row`).

### Degradation alt text (no content loss on old clients)

Children of a template component have two meanings:

- **No slot in the template**: children are the FL3 degradation alt text.
  Newer clients expand the template and do not render children; older clients
  render the skin base (`extends`) with the children inline. Write **one short
  summary line** (e.g. `HP 30/100`), never the body text.
- **Slot in the template**: children are real content and render at the slot
  position on every client level.

The `example` field should always show the children alt text usage so AI
generation copies the degradable shape. When a template references
content-carrying placeholders but `example` shows no children, the tools warn
with `template_fl3_content_hidden`.

### Authoring rules for dynamic output

1. Emit the **compact tag** with declared attributes only. Do not hand-build
   the template's internal primitive structure in dynamic XML — that wastes
   output tokens every turn and drifts visually between messages.
2. For no-slot components, put one short summary line in children as alt text;
   do not put the story body there.
3. For slot components, put the body in children.

### When to use a template component

Declare a template when the same multi-primitive structure repeats across
turns (status bars, stat cards, inventory rows, fixed info panels): the AI
repeats only a compact tag, and the structure stays pixel-stable. Keep using
plain FL3 primitives for one-off layout that appears in a single message, and
keep using simple skin-only custom components (no template) when one primitive
with defaults is enough. Templates are presentation-only: no conditionals, no
loops, and no nesting of other custom components.

### Template diagnostics

Template problems are reported through the same `componentDiagnostics` array
(see `card-writer-mcp.md` for the full table). `error` codes —
`template_parse_failed`, `template_invalid_root`, `template_forbidden_tag`,
`template_too_large`, `template_multiple_slots`,
`template_invalid_slot_position` — mean the template is rejected and the
component falls back to skin-only rendering. `warning` codes —
`template_attr_dropped`, `template_unknown_placeholder`,
`template_attr_missing_default`, `template_fl3_content_hidden` — keep the
template active but flag authoring risks. Use `render_xmlv3_theme_case` with
`viewMode: "fl3-degraded"` to preview the degraded form before publishing.

## XMLV3 FL3 Component API Reference

Use this as the full Moonloom authoring manual for XMLV3 Feature Level 3 atoms.
All public tags are lowercase/kebab-case. Do not output PascalCase names, mixed
aliases such as `linearlayout`, or private Vue component names. Bare numbers in
layout attributes are XMLV3 layout units, not CSS pixels written by the AI:
Desktop/H5 maps `1` unit to `1px`, while Mobile/uni-app maps `1` unit to `2rpx`.
Write `height="120"` when the intended cross-client height is 120 layout units;
do not write `height="120px"`, `height="240rpx"`, or `height="120dp"` in new
XML. Explicit `px`, `rpx`, and `%` are accepted only as migration input from old
cards.

For one-shot AI generation, treat this section as the executable contract: if a
tag, attribute, or value is not listed here or in the active custom-component
contract, omit it. Do not invent `style`, `class`, font-size attributes, helper
aliases, private component names, or CSS syntax to "make it look right"; Theme
V3 supplies visual styling through supported attributes, `tone`, `variant`, and
custom component CSS.

### Primitive Defaults

Do not repeat these attrs unless you need to override them. They are applied
only by the XMLV3/FL3 renderer:

| Primitive | Default attrs |
| --- | --- |
| `<linear-layout>` | `orientation="vertical" gap="md" alignment="stretch"` |
| `<flex-layout>` | `orientation="horizontal" gap="sm" alignment="center" wrap="true"` |
| `<grid-layout>` | `columns="1" gap="md"` |
| `<container>` | `gap="sm"` |
| `<card>` | `padding="md" gap="sm" borderRadius="lg" variant="glass"` |
| `<button>` | `padding="sm" borderRadius="pill" alignment="center" variant="soft"` |
| `<badge>` | `borderRadius="pill" variant="glass"` |
| `<notice>` | `padding="sm" gap="xs" borderRadius="lg" variant="glass"` |
| `<list>` | `gap="xs"` |
| `<avatar>` | `width="56" height="56" borderRadius="pill" fit="cover"` |
| `<image>` | `fit="cover"` |

Buttons are action controls, so the default renderer centers text horizontally
and vertically. Use `align="start"` / `align="end"` or
`alignment="start"` / `alignment="end"` only when a custom component really
needs non-centered button content.

### Attribute Groups

| Attribute Group | Attributes | Allowed values | Default / behavior |
| --- | --- | --- | --- |
| Size values | `width`, `height` | `auto`, `wrap`, `wrap-content`, `match`, `fill`, `full`, `half`, `third`, `quarter`, or bare integer `N` from `0` to `9999` | Empty means natural size. `match`/`fill`/`full` become `100%`; `half`/`third`/`quarter` become percentages. Bare `N` is a layout unit: Desktop/H5 `Npx`, Mobile/uni-app `N*2rpx`. |
| Spacing values | `padding`, `margin`, `gap` | `none`, `xs`, `sm`, `md`, `lg`, `xl`, or 1-4 size values for `padding`/`margin`; `gap` is one token/value | Prefer tokens. `padding="md"` gives a comfortable card inset; `gap="sm"` is for tight rows; `gap="md"` is the normal section rhythm. |
| Border radius values | `borderRadius`, `border-radius`, `radius` | `none`, `sm`, `md`, `lg`, `xl`, `pill` | Empty uses the component/theme default. `pill` is for badges and chips, not large cards. |
| Color values | `background`, `bg`, `border`, `color`, `text-color`, `txt-color` | `#rgb`, `#rrggbb`, `#rrggbbaa`, `rgb()`, `rgba()`, `hsl()`, `hsla()`, `var(--lt-*)` | Unsafe colors are ignored. Do not use `url()`, gradients, raw CSS, theme-unknown CSS variables, `class`, or `style`. |
| Layout values | `orientation`, `alignment`, `align`, `justify`, `wrap`, `weight`, `columns`, `rows`, `row`, `column`, `span` | `orientation`: `vertical` or `horizontal`; `alignment`/`align`: `start`, `center`, `end`, `stretch`, `between`, `around`; `justify`: same alignment values; `wrap`: `true`, `false`, or `wrap`; `weight`: integer `1`-`12`; `columns`: `1`-`4`; `row`/`column`: positive integer; `span`: `full`, `1`, `2`, `3`, `4` | `weight` is a child attribute inside `linear-layout`/`flex-layout`. `row`, `column`, and `span` are child attributes inside `grid-layout`. |
| Semantic hook values | `tone`, `variant`, `part` | `tone`: lowercase/kebab-case semantic token up to 32 chars; `variant`: `glass`, `solid`, `outline`, `plain` for surfaces and `soft`, `solid`, `outline`, `ghost`, `glass` for actions; `part`: lowercase/kebab-case local part name | These are Theme V3 hooks. `part` becomes `.lt-part-<name>` and `data-part="<name>"`; use it only for stable custom-component styling hooks. |
| CommonBoxAttrs | `width`, `height`, `padding`, `margin`, `gap`, `background`/`bg`, `border`, `borderRadius`/`border-radius`/`radius`, `alignment`/`align`, `justify`, `weight`, `row`, `column`, `span`, `part` | See Size, Spacing, Color, Border radius, Layout, and Semantic hook groups | Shared by neutral wrappers, cards, media, buttons, and custom component roots. `weight` applies when the box is a child of linear/flex layout; `row`/`column`/`span` apply when it is a child of grid layout. |
| CommonTextAttrs | `color`, `text-color`, `txt-color`, `alignment`, `align`, `tone` | See Color, Layout, and Semantic hook groups | Text alignment supports `start`, `left`, `center`, `end`, and `right`; unsupported values are ignored instead of becoming raw CSS. |
| CommonTapAttrs | `tap-action`, `tap-value`, `tap-feedback`, `aria-label` | `tap-action="send|fill|copy"`; tap-value is non-empty static text; `tap-feedback` is optional copy feedback; `aria-label` supplies the visible name / accessible name when text is not enough | Use only when a non-button FL3 atom or custom component must behave like a safe action surface. send fills the composer with a complete proposed player turn; fill pre-fills the composer and waits for player confirmation; send/fill never auto-submits, so the user must tap Send manually after review or editing. copy writes `tap-value` to the clipboard and copy does not increment actionCount; it may show `tap-feedback`. send and fill increment actionCount. Renderer adds `role=button`, `tabindex=0`, Enter/Space activation, focus ring, pointer/hover/active affordance, and `[data-interactive]`. Tap surfaces must not nest `<choice>`, `<button>`, or another `tap-action` surface inside a tap surface. `tap-value` for send/fill must be static text, not hidden state or template bindings. Keep choices fallback / visible `<choice>` options when composer-fill support may be unavailable. |

### Component Table

Tag | Purpose | Children | Attributes | Example
--- | --- | --- | --- | ---
| `<linear-layout>` | Row/column layout | Any XMLV3 children | `orientation`, `gap`, `alignment`, `wrap`, `weight`, `CommonBoxAttrs` | `<linear-layout orientation="horizontal" gap="sm" alignment="center"><text weight="1">信任</text><badge>上升</badge></linear-layout>` |
| `<flex-layout>` | Responsive flex layout | Any XMLV3 children | `orientation`, `gap`, `alignment`, `wrap`, `weight`, `CommonBoxAttrs` | `<flex-layout orientation="horizontal" wrap="true" gap="xs"><badge>線索</badge><badge>可交涉</badge></flex-layout>` |
| `<grid-layout>` | CSS-grid style layout | Any XMLV3 children | `columns`, `rows`, `gap`, child `row`, child `column`, child `span`, `CommonBoxAttrs` | `<grid-layout columns="2" gap="sm"><fact label="時間" value="午夜" /><fact label="風險" value="中" /></grid-layout>` |
| `<view>` | Neutral atom wrapper | Any XMLV3 children | `CommonBoxAttrs` | `<view padding="sm" part="meter"><text>局部樣式 hook</text></view>` |
| `<container>` | Grouped atom wrapper | Any XMLV3 children | `CommonBoxAttrs` | `<container padding="md" gap="sm"><heading level="3">現況</heading><paragraph>她正在觀察出口。</paragraph></container>` |
| `<card>` | Card surface | Any XMLV3 children | `CommonBoxAttrs`, `tone`, `variant` | `<card padding="md" borderRadius="lg" tone="clue"><heading level="3">倉庫後門</heading><paragraph>門縫有新鮮水痕。</paragraph></card>` |
| `<text>` | Short inline label/text | Text only | `CommonTextAttrs`, `part` | `<text color="var(--lt-speaker-color)">警戒</text>` |
| `<heading>` | Section title | Text only | `level`, `CommonTextAttrs`, `part` | `<heading level="3">下一步</heading>` |
| `<paragraph>` | Short paragraph | Text only | `CommonTextAttrs`, `part` | `<paragraph>主路被封，繞行會消耗更多時間。</paragraph>` |
| `<image>` | Public media | No children | `src`, `alt`, `width`, `height`, `borderRadius`, `fit`, `part` | `<image src="https://downloads.lunatalk.ai/example.png" alt="倉庫門" width="120" height="80" borderRadius="lg" fit="cover" />` |
| `<button>` | Atom action button | Text/inline children | `send`, `CommonBoxAttrs`, `CommonTextAttrs`, `tone`, `variant` | `<button send="查看倉庫後門" variant="solid" width="full">查看後門</button>` |
| `<badge>` | Small status label | Text only | `label`, `CommonBoxAttrs`, `CommonTextAttrs`, `tone`, `variant` | `<badge tone="warning">風險：中</badge>` |
| `<notice>` | Compact callout | Text/inline children | `title`, `CommonBoxAttrs`, `CommonTextAttrs`, `tone`, `variant` | `<notice title="提示" tone="warning">巡邏會在三分鐘後返回。</notice>` |
| `<list>` | Short list wrapper | `<list-item>` children | `gap`, `tone`, `variant`, `part` | `<list gap="xs"><list-item label="1">關燈</list-item><list-item label="2">貼牆前進</list-item></list>` |
| `<list-item>` | One list row | Text/inline children | `label`, `value`, `tone`, `variant`, `part` | `<list-item label="出口" value="東側">樓梯仍可通行。</list-item>` |
| `<avatar>` | Public thumbnail | No children | `src`, `alt`, `width`, `height`, `borderRadius`, `fit`, `part` | `<avatar src="https://downloads.lunatalk.ai/avatar.png" alt="角色頭像" width="56" height="56" borderRadius="pill" />` |
| `<info-row>` | Key-value row | Text/inline children | `label`, `value`, `tone`, `variant`, `part` | `<info-row label="關係" value="試探">她還沒有完全信任你。</info-row>` |
| `<fact>` | Compact fact | Text/inline children | `label`, `value`, `tone`, `variant`, `part` | `<fact label="資源" value="2">只夠再嘗試兩次。</fact>` |

Use `<text>`, `<heading>`, and `<paragraph>` for concise UI copy inside atom
layouts. Keep long story prose in `<scene>/<n>/<d>/<quote>` so the renderer can
preserve narrative typography. Use `<button>` only when the atom UI itself needs
a semantic action; normal chat options still use `<choice>` or `<choices>`.
`<choice send>` and `<button send>` are action sugar for the same safe send
pipeline: they fill the composer with a complete player intent, never auto-submit,
and never run arbitrary JavaScript. Use `tap-action="fill"` when the payload is
an editable draft rather than a complete proposed turn. `send`/`fill` payloads
count as action paths; copy controls are clipboard utilities and are tracked
separately. `send`, `tap-value`, and visible button text are separate concerns:
payloads must be complete player intents, while labels stay short.

Surface variants are `glass`, `solid`, `outline`, `plain`. Action variants are `soft`, `solid`, `outline`, `ghost`, `glass`. Use variants as Theme V3 hooks, not as raw CSS requests.

`fit` accepts `cover` or `contain` for image-like tags. Use `cover` for avatars,
cards, and fixed thumbnails. Use `contain` only when cropping would remove
important information. Images must be public previewable HTTPS URLs or safe app
relative paths; never emit private, signed, local, base64, or tracking URLs.

Custom component contract: a Theme V3 `tagConfig.xmlv3.components` entry may
declare a custom component that `extends` an atom primitive, lists allowed
semantic attributes, and provides scoped CSS. In component CSS, `:host` styles
the custom root and `part(name)` styles atom children with `part="name"`.
Custom components should save output tokens by replacing repeated atom
structures, not hide state or invent behavior.

HC parity map for migrating old HTML cards:

- `hc-btn` and `hc-action` -> `<button>` inside an atom layout, or `<choice>` /
  `<choices>` for normal chat actions.
- `hc-bar` and `hc-meter` -> `<bar>` for continuous numeric values only.
- `hc-stat`, `hc-info-row`, and `hc-display type="stat"` -> `<field>`,
  `<info-row>`, or `<fact>`.
- `hc-tag`, `hc-badge`, and `hc-display type="tag"` -> `<tag>` or `<badge>`.
- `hc-collapse`, `hc-toggle`, `hc-tabs`, and `hc-tab` -> `<collapse>` or grouped
  `<card>` sections when all content must stay visible.
- `hc-form`, `hc-input`, `hc-radio`, `hc-checkbox`, and `hc-option` -> `<form>`,
  `<input>`, `<radio>`, `<checkbox>`, and `<option>`.
- `hc-c`, `hc-light`, `hc-panel`, and `hc-notice` -> `<panel>`, `<card>`,
  `<container>`, or `<notice>`.
- `hc-h`, `hc-h1`, `hc-h2`, `hc-h3`, `hc-p`, `hc-quote`, `hc-d`, `hc-n`, and
  `hc-speaker` -> `<heading>`, `<paragraph>`, `<quote>`, `<d>`, `<n>`, and
  `<speaker>`.
- `hc-f`, `hc-fj`, `hc-fw`, `hc-fill`, and `hc-wrap` -> `<flex-layout>` or
  `<linear-layout>`.
- `hc-g2` and `hc-g3` -> `<grid-layout>` or `<grid>`.
- `hc-list` and `hc-item` -> `<list>` and `<list-item>`.
- `hc-avatar` -> `<avatar>` or `<image>`.
- Decorative classes such as `hc-bg-*`, `hc-glow`, `hc-gradient-text`,
  `hc-shimmer`, and `hc-bg-aurora` belong in Theme V3 CSS, not XML tags.

## When to use XMLV3

Use XMLV3 when the welcome needs structured narrative blocks, dialogue, stage
directions, status panels, relationship cues, or other semantic sections that can
render consistently across clients.

Keep tags meaningful and parseable. If validation warns about raw fallback text,
rewrite the welcome into explicit XMLV3 tags.

Use the core tags first:

- `<scene>` wraps an opening beat's prose and dialogue.
- `<n>` is narration, physical action, and stage direction.
- `<speaker>` marks speaker changes, not every line of dialogue. For a
  single-speaker card or turn, omit `<speaker>` and write `<d>` directly; the
  chat bubble and role context already identify who is speaking.
- `<d>` is dialogue.
- `<quote>` is inner thought or emotional emphasis.
- `<choice>` gives a player action prompt.
- `<form>`, `<input>`, `<radio>`, and `<checkbox>` are for setup fields.
- `<state>` is hidden state data, not visible prose.

Keep scene prose separate from interactive controls. Close `</scene>` after the
current narrative beat, then place `bar`, `collapse`, `form`, `result-card`,
`share-text`, `choice`, and other controls as sibling tags. Do not wrap or nest a
whole welcome's controls inside one large `<scene>`; it makes mobile previews
cramped and causes every panel to look like it was stuffed into the same glass
card.

Do not invent aliases such as `<narration>` or `<dialogue>`. They may fall back
to visible text, but Theme V3 styling and validation are less reliable. Use
`<n>` and `<d>` instead.

`<state>` must contain valid JSON and is not rendered inline. If the player
should see a status sentence, write it in `<n>` and reserve `<state>` for
machine-readable updates. For MCP preview evidence, use a top-level
`scene` / `status` / `relationships` object so the preview summary can detect
state as present. Do not use flat state objects such as
`{"location":"...","trust":1}`; those may parse as JSON but still appear as
`state:none` in preview reports.

Hidden <state> JSON high-drift is expected in long real chats. Hidden `<state>`
JSON is a high-drift output trap in real chat. In plain terms, hidden <state>
JSON is high-drift. Even when
`roleDetailDesc` asks for state every turn, the model may omit it after several
rounds. When state matters, provide a visible panel/state-surface fallback with
the same player-facing facts; the visible panel is the source of truth for the
player. Then use hidden `<state>` JSON as the machine-readable source when it
appears. Treat missing `<state>` after a real state change as a simulation
warning and patch the role-specific output contract.

Weak models can suffer format dilution even when the card's behavior remains
good. A long emotional turn may drop XMLV3 and create an absorbing-state-like /
self-reinforcing format drift where later turns imitate the plain-text output.
U-shaped attention can delay not cure this. Test format stability for 10+ turns
when using panels, bars, choices, or hidden state, and record
`structureShare`, `panelRetention`, and `choicesRetention` when available.
Choices are fragile and often first drop, so protect choices as the required
closure surface at decision points
rather than adding more decorative controls.
U-shaped can delay not cure weak-model format collapse.

Visible status widgets must stay in sync with hidden state. If a visible `bar`
or meter and hidden `state.status` / `state.relationships` describe the same
metric, they should share the same key or label, and their value/max must match.
A clean preview warning such as `stateVisualMismatchCount > 0` or
`xmlv3_state_visual_value_mismatch` means the bubble and external status surface
are presenting two different truths; fix the XMLV3 output before judging prose
quality.

The status bar / 狀態欄 is an update contract, not progress bars or a meter dump.
Keep it to 2-6 fields that change play: scene/time/phase, relationship
pressure, risk, resources, clues, route gates, or available support. `bar` is
only for continuous numeric values. Text, enum, flag, resource, phase, location,
or available/unavailable fields should use `state.status[].value`,
`state.relationships[].value`, visible field/panel/prose, or the external fact
card surface instead of being forced into `max:100`. `roleDetailDesc` should
define the update contract for every kept field: stable key, label, allowed
values, update trigger, play effect, and output cadence.

The status bar can also be Theme V3-skinned when it is part of the card
experience. Use `.lt-status-bar` for the surface, `.lt-status-eyebrow` for the
label, `.lt-status-stat[data-key="..."]` and `.lt-status-relation[data-key="..."]`
for targeted rows, and `.lt-status-stat-track`, `.lt-status-stat-fill`,
`.lt-status-rel-track`, `.lt-status-rel-fill` for meters. Keep the CSS visual:
background, border, text contrast, track/fill color, and mood-specific hooks
such as `.lt-status-bar[data-mood="tense"]`. Do not put story facts in Theme V3;
the facts still belong in XMLV3 `<state>` / visible prose. Visual Check must
inspect the bubble and status bar separately on desktop and mobile.

For `<bar>`, the `value` attribute must be one single numeric value; bar value
must be a single number. Do not write 8 -> 14 in bar value; it will break
progress rendering. Do not put change strings such as `8 -> 14`, `8-14`, or
`+6` in `value`; that breaks progress rendering. Put the delta / change amount
in visible prose, a field, or the state panel, while the bar keeps `value="14"`
and a numeric `max`.

```xml
<state>{"scene":{"mood":"rain","location":"公寓門口"},"status":[{"key":"risk","label":"風險","value":"低"}],"relationships":[{"target":"小碟","label":"信任","affinity":1,"max":5}]}</state>
```

When using the MCP clean chat preview, inspect the assistant output bubble and
the state surface separately. The bubble should show only message output; XMLV3
state belongs outside the bubble as a status/state panel when available. Do not
judge avatar, byline, sidebar, composer, or other normal chat page chrome as
part of the card render. Open both desktop and mobile preview URLs when the
state surface, choice buttons, or layout density may change with viewport.

For inline XMLV3 preview probes before a production role exists, use the same
clean preview page. Store `{ xml, themeCss, themeMode, state, roleName }` in the
target app origin under `lunatalk:mcp-preview:payload:<payloadKey>`, then open
`/pages/mcp/rolePreview?payloadKey=<payloadKey>&viewport=desktop` and repeat
with `viewport=mobile`. For tiny probes, encoded query params `xml`,
`themeCss`, `themeMode`, `stateJson`, and `roleName` are supported. After
render, compare screenshots with `report.surfaceDiagnostics` when the client can
read `window.__LUNATALK_MCP_PREVIEW__`. Moonloom uses this only to review
generated card content; XMLV3 renderer implementation issues belong to the
LunaTalk renderer project.

Use the preview page capture plan before deciding a visual pass/fail. Desktop
output must be captured at full content width in one horizontal view; do not
review left and right halves separately. Vertical overflow is expected for dense
HTML/XMLV3 cards and long AI turns: capture or scroll through every listed
vertical segment, then judge the full sequence. If only the top of the card is
visible, the review is incomplete, not proof that the card should be shortened.

`<action>` belongs to the battle extension pack. For prose actions, use `<n>`.
Only use `<action>` for battle markers with attributes such as `type`, `by`,
`target`, or `skill`.

## XMLV3 Control Catalog

This catalog mirrors registered LunaTalk XMLV3 controls. It is a platform
reference for authors and server prompts; do not paste it wholesale into
`roleDetailDesc`. A role detail should only say when this card should use
controls, which state fields update, and what each visible choice/status means.

- Core story: `<scene>`, `<n>`, `<d>`, and `<quote>` cover scene grouping,
  narration, dialogue, and inner emphasis. `<speaker>` is only for real speaker
  changes.
- Player actions: `<choices>` groups 2-4 `<choice>` buttons with balanced or
  weighted layout. A single `<choice>` remains valid fallback.
- Setup form: `<form>`, `<input>`, `<radio>`, `<checkbox>`, and `<option>`
  collect first-turn setup or generator intake.
- Layout: `<panel>`, `<stack>`, `<row>`, `<grid>`, `<field>`, and `<divider>`
  create safe HTML-like sections, vertical rhythm, short rows, compact columns,
  label-description facts, and separators.
- Feature Level 3 atoms: `<linear-layout>`, `<flex-layout>`, and
  `<grid-layout>` create Android/CSS-like layout; `<view>`, `<container>`,
  `<card>`, `<text>`, `<heading>`, `<paragraph>`, `<image>`, `<button>`,
  `<badge>`, `<notice>`, `<list>`, `<list-item>`, `<avatar>`, `<info-row>`,
  and `<fact>` create reusable UI primitives. Use these when the card needs
  nested layout, image + text + button composition, or a custom component built
  from atoms.
- Status / mini-game: `<bar>` is for continuous numeric values only;
  `<collapse>`, `<tag>`, `<result-card>`, and `<share-text>` cover optional
  rules, badges, final outcomes, and share text.
- Battle: `<action>`, `<damage>`, and `<turn>` are battle-resolution tags.
- Inventory: `<loot>`, `<item>`, `<stat>`, and `<desc>` are for real item
  acquisition and item cards.
- TRPG: `<roll>`, `<check>`, and `<announcement>` are for dice, checks, and
  system notices.
- VN: `<cg>` and `<flag>` are for rare visual-novel CG moments and route flags.

Control parameter reference:

- scene: mood/location/time. Use for the current narrative beat's atmosphere,
  place, and time; `mood` is a Theme V3 hook, while `location` and `time` may
  render as metadata.
- n/d/quote/speaker: no required params. Use `n` for narration/action prose,
  `d` for spoken dialogue, `quote` for inner emphasis, and `speaker` only when
  the active speaker changes.
- choice: send/tone/variant/width/align/span/type/category. `send` is the full
  user intent; `tone`, `type`, and `category` are semantic hooks; `variant` is
  `soft|solid|outline|ghost|glass`; `width` is `auto|full|half|third|fill`;
  `align` is `left|center|right`; `span` is `full|2|3|4` for weighted action
  grids. Recommended when one button equals one clear player intent.
- state: scene/status/relationships. Hidden JSON only. Use `scene` for
  mood/location/time, `status` for key/label/value/max facts, and
  `relationships` for target/label/value or affinity/max. Recommended when
  later rendering or behavior needs machine-readable state.
- form: btn/submit-label plus safe presentation attrs. Recommended for first
  setup or intake; stop repeating it after setup is complete.
- input: name/label/placeholder/value/type. Recommended for free-text setup;
  `value` pre-fills editable text, not a locked answer.
- radio/checkbox: name/label/options. Use comma/pipe-separated `options` or
  child `<option>` tags; radio is one-of-many, checkbox is many-of-many.
- option: value/label. Use stable `value` for submission and visible label/body
  for the user-facing text.
- panel: title/subtitle/tone/variant. Recommended for one compact information
  section, clue card, status block, or setup group.
- stack: gap. Use `xs|sm|md|lg` when several blocks need vertical rhythm.
- row: gap/wrap/align/justify. Recommended for short chips or tiny facts only;
  do not use row+tag+n for label-description prose.
- grid: cols/gap. Use `cols=1|2|3` for short comparable facts; do not place long
  paragraphs in multi-column grids.
- linear-layout/flex-layout/grid-layout: orientation/weight/wrap/columns/gap.
  Use `orientation="horizontal|vertical"`, `wrap="true"`, child `weight`, and
  `row`/`column`/`span` for atomized FL3 layouts.
- view/container/card/text/heading/paragraph/image/button/badge/notice/list/list-item/avatar/info-row/fact:
  use width/height/padding/margin/gap/border/borderRadius/background/alignment.
  Bare numeric width/height values use layout unit mapping: 1 layout unit = 1px
  on Desktop/H5 and 1 layout unit = 2rpx on Mobile/uni-app.
- field: label/value/tone. Recommended for label + description facts, status
  facts, task summaries, or checklist items.
- choices: cols/gap/align/variant. Use `cols=1|2|3|4|auto`, gap
  `xs|sm|md|lg`, align `start|center|end|stretch`, and variant
  `soft|solid|outline|ghost|glass`. Recommended for 2-4 short actions.
- divider: label. Use only when a visual break improves scanning.
- bar: label/value/max/color. Use only for continuous numeric values and keep
  visible value/max synced with hidden `<state>`.
- tag: color/bg/background/text-color/txt-color/border/radius. Use tiny badges,
  flags, resource markers, or labels; `color` is legacy background.
- collapse: title/open. Use optional rules, help, lore, or logs that should not
  dominate the first screen.
- result-card: title/theme. Themes are `dark|light|purple|red|blue|green|gold`;
  use for final outcomes, scores, endings, or shareable mini-game results.
- share-text: no required params. Use directly after a result-card for a short
  share/copy summary.
- action: by/type/target/skill/dmg/crit. Use only for battle resolution.
- damage: target/amount/type. Use after battle action; type is
  `physical|magic|heal`.
- turn: next. Use for battle turn ownership.
- item: id/name/rarity/type. Rarity is `common|rare|epic|legendary`; type is
  `weapon|armor|consumable|key|misc`. Use only for real item cards inside
  `<loot>`. `<stat>` and `<desc>` carry item stat lines and description text.
- roll: dice/skill/dc/result/total/success. Use for resolved TRPG dice rolls.
- check: type/skill/dc/roll/success. Use active/passive checks; active checks
  may omit roll/success until the player acts.
- announcement: type. Use `death|levelup|warn|info` for system notices that
  affect play.
- cg: prompt/style/seq/url/status/width/height. Use rare VN visual moments;
  `style` is `anime|realistic|pixel|oil_painting|sketch`, `seq` deduplicates,
  and `status` is `loading|ready|failed`.
- flag: key/value. The tag is invisible; write durable route flags into
  `<state>` too.

When to use these controls:

- Use story tags for the current beat, not for dashboard layout.
- Use panel/field/grid when information hierarchy matters; long prose stays in
  one column.
- Use choices when action hierarchy matters; each choice should carry one
  clear intent.
- Use state for machine-readable changes, then show the player-facing meaning
  through visible prose, field, bar, tag, or panel.
- Keep the UI mobile-first: readable body text, line-height around 1.5-1.75,
  at least 4.5:1 contrast for normal text, touch-friendly short choices, and no
  color-only meaning.

## Optional extension packs

Use core tags first. Before falling back to HTML, check whether an XMLV3
extension pack can express the need. For example, a mini-game or structured
result flow can use optional tags such as `collapse`, `bar`, `tag`,
`result-card`, or `share-text` when that pack is enabled.

Use the layout pack when the author needs HTML div-like container structure:
`panel`, `stack`, `row`, `grid`, `field`, `choices`, and `divider` create
section blocks, grouped controls, compact columns, label-description facts,
action groups, and visual separators without exposing raw `style`/`class` or
arbitrary CSS inside XML.

Use `<field label="...">...</field>` for a single information row, status fact,
task summary, or setup checklist item. Do not use row+tag+n or
`<row><tag>...</tag><n>...</n></row>` for label-description facts: that pattern
turns labels into decorative pills and ordinary descriptions into narration.

Treat layout as the safe structure layer. Theme V3 owns reusable identity through
theme-bound tone, palette, and panel tokens. For local HTML-like section
distinctions, XMLV3 also supports a constrained presentation-attribute escape
hatch:

- `panel`: `bg`, `background`, `border`, `color`, `text-color`, `txt-color`,
  `title-color`, `subtitle-color`, `radius`, and `padding`
- `choice`: `bg`, `background`, `border`, `color`, `text-color`, `txt-color`,
  and `radius`
- `form`: `bg`, `background`, `border`, `label-color`, `field-bg`,
  `field-border`, `option-bg`, `option-active-bg`, `accent`, `submit-bg`,
  `submit-color`, `submit-txt-color`, `radius`, and `padding`
- `collapse`: `bg`, `background`, `border`, `title-color`, `color`,
  `text-color`, `txt-color`, and `radius`
- `tag`: `bg`, `background`, `color`, `text-color`, `txt-color`, `border`,
  and `radius`; for legacy tag compatibility, `color` is the tag background
- `bar`: `track-bg`, `label-color`, `value-color`, `bg`, `background`,
  `color`, `text-color`, and `txt-color`

These attributes are not arbitrary CSS. Use only safe color values, Theme V3
variables, and tokenized radius/padding values. They are for card-specific local
contrast and sectioning when a full forked theme would be heavier than the
problem. Prefer Theme V3 variables for reusable style, and use presentation
attributes sparingly where the screenshot needs one section, one action, one
form, one collapse, one tag, or one meter to stand apart immediately. A client
that does not support them should still show readable XMLV3 content with
ordinary panels, fields, choices, forms, collapses, tags, and bars.

Use `<choices cols="2" align="stretch" gap="sm">` for ordinary 2-4 short action
buttons that should share horizontal space. Use weighted action hierarchy when
one action should visually lead the set: `<choices cols="4">` with
`<choice span="full">` for a primary row, or `span="2"` / `span="3"` / `span="4"`
for 2:1:1, 3:1, or full-width weighting. Omit `span` for a normal one-column
item; do not write `span="1"`. Mobile preview collapses weighted choices into a
vertical or near-single-column reading path, so the fallback remains readable
instead of forcing cramped mini-buttons.

Consecutive naked `<choice>` tags may still render as a usable fallback grid,
including a full-width odd final item, but this is a fallback path: the report
should show `fallbackActionGroups`, and the author has not declared grouping,
density, tone strategy, or action hierarchy. Use explicit `choices` for short
actions unless every option is intentionally long prose. `choices` may carry
`cols="1|2|3|4|auto"`, `align="start|center|end|stretch"`, `gap`, and `variant`;
each child `<choice>` may carry semantic `tone`, `variant`, `width`, `align`, or
`span` hooks. Use these as Theme V3 hooks, not arbitrary inline styling. If a
client lacks the layout pack, the child `<choice>` tags still remain readable and
clickable as fallback.

When XMLV3 is replacing a rich HTML card, run an HTML parity checklist before
writing more prose. The goal is not pixel parity with arbitrary HTML, but the
same play value:

- **sectioning parity**: HTML `div`/card stacks usually separate setup,
  clue, risk, status, input, and actions. XMLV3 should mirror that with
  `panel`, `stack`, `grid`, `field`, `divider`, and visible headings, not one
  long scene.
- **local color parity**: HTML often gives each section a different background,
  border, or accent. XMLV3 should map durable identity to semantic `tone` values
  and Theme V3 variables. Use constrained `panel` / `choice` presentation
  attributes only for local section contrast. Do not fake this with XML
  `style` or `class`.
- **action density parity**: 2-4 short actions should occupy a balanced row or
  grid through `choices`, not several unequal left-aligned buttons. When HTML
  gives the primary action more visual weight, XMLV3 should use weighted
  `cols="4"` plus `span="full"` / `span="2"` rather than flattening every button.
- **state parity**: durable meters and facts belong in `<state>` plus the
  external state/status surface; player-facing explanations belong in visible
  `panel`, `bar`, `tag`, or prose. When a visible `bar` and hidden state refer to
  the same key or label, their value/max must match so the bubble and the
  external status surface read as one state system. Do not convert every status
  into a meter: use `bar` for continuous numeric pressure, and use fact cards,
  tags, relationship/resource cards, or short panels for text, enum, flag, phase,
  clue, and resource fields.
- **form parity**: if the HTML card uses inputs/radio/checkboxes, XMLV3 should
  use `form`, `input`, `radio`, and `checkbox` with concise labels. Do not
  bury setup questions in narration. Intake-first system cards should preserve
  dense setup surfaces; a clean preview with fewer than six rendered form
  controls is usually still below rich HTML intake parity.
- **density parity**: desktop can carry more columns and compact panels; mobile
  must remain one vertical reading path. Judge density with actual desktop and
  mobile previews, not by shrinking the card text.
- **token parity**: V2 HTML can spend many generated tokens on repeated tags,
  attributes, inline CSS, class names, and wrapper scaffolding. XMLV3 should
  keep the visual hierarchy but move reusable style to Theme V3, use short
  semantic tone/variant hooks, omit single-speaker `<speaker>`, and emit only
  changed setup/state values after the opening.

If XMLV3 fails this checklist, patch the presentation packet or Theme V3 before
improving the writing logic. A weak renderer makes even a strong role engine
look worse than it is.

For system/simulator and generator cards with a setup wizard or intake console,
also read `system-intake-card-design.md`. These cards should not collapse rich
HTML control surfaces into one XMLV3 scene. Preserve play value by mapping the
intake into sibling `panel`, `grid`, `form`, `bar`, `choices`, and
preview-compatible `state` blocks, with Theme V3 tones or constrained
presentation attributes carrying local color. The goal is migration parity:
rewrite HTML surfaces into XMLV3 equivalents for sectioning, dense form
controls, state, and balanced actions before changing the writing logic.

Read the render report as a parity map before making prose changes:

- `actionColumns` should be at least 2 when there are 3-4 short actions.
- `choiceSpans` / `choiceSpanCount` should be nonzero when a primary action,
  2:1:1 grouping, or 3:1 weighted hierarchy is part of the intended layout.
- `groupedActions` means the author used an explicit layout group; this is
  preferred for dense action rows.
- `fallbackActionGroups` means the renderer rescued naked `<choice>` siblings.
  Accept the visual fallback only as temporary evidence; patch to explicit
  `<choices>` for durable card design.
- `nestedControls` means controls were placed inside `<scene>` and should be
  moved to sibling layout blocks.
- `themeHooks`, `customTones`, and `unresolvedTones` explain whether XMLV3 has
  enough Theme V3 backing to replace HTML local color/style blocks.
- `presentationAttrs` explains whether the author used the safe XMLV3
  presentation-attribute escape hatch. This is not the same as raw
  `style`/`class`; inspect the screenshot for readability, contrast, and visual
  hierarchy instead of treating it as a blocker by itself.
- `stateSurface` should become visible in browser preview when state exists.
  Server-only reports may say `expected`; verify the clean preview status area
  before accepting the card.
- `stateVisualMismatchCount` / `xmlv3_state_visual_value_mismatch` means a
  visible bar or meter disagrees with hidden state using the same key or label.
  Treat this as a structure bug, not a writing-style issue.

Theme V3 can make XMLV3 feel closer to high-quality HTML cards without putting
raw style inside XML. Useful CSS variable hooks include:

- panels: `--lt-panel-bg`, `--lt-panel-border`, `--lt-panel-title-color`
- fields: `--lt-field-accent`, `--lt-field-label-color`,
  `--lt-field-body-color`, `--lt-field-value-color`
- choices: `--lt-choice-bg`, `--lt-choice-border-color`, `--lt-choice-color`
- forms: `--lt-form-bg`, `--lt-form-border`, `--lt-form-field-bg`,
  `--lt-form-field-border`, `--lt-form-option-bg`,
  `--lt-form-option-active-bg`, `--lt-form-control-accent`,
  `--lt-form-submit-bg`
- collapses and bars: `--lt-collapse-bg`, `--lt-collapse-border`,
  `--lt-collapse-title-color`, `--lt-bar-track-bg`, `--lt-bar-label-color`,
  `--lt-bar-value-color`

Call `extension_enable` with `packId: "layout"` when the presentation packet
uses layout pack tags. If layout is unavailable, the same content must still be
readable XMLV3 prose with scene text, choices, and status labels in order.

Use `extension_enable` only when the card's presentation packet names a specific
pack and explains why it improves play. If the pack is unavailable or unsupported
in a client, the card should still degrade to readable XMLV3 prose instead of
depending on custom HTML for core interaction.

## Token-Aware Rendering

Use `o200k_base` as the single offline tokenizer baseline for card token reviews.
Apply it consistently across V2 HTML, XMLV3, Theme V3, OpenAI, Claude, and
unknown-provider budget checks so render-format diffs are comparable. Treat the
result as a local structure and attention-cost estimate, not an exact provider
billing statement.

Review visible value and structure cost separately. Input-side context is
`roleDetailDesc + roleWelcome`; `roleDesc` is display/search context and is not
model input. Do not hollow out detail to reduce tokens. The optimization target
is per-turn AI output: if markup, wrapper tags, inline CSS, class names, or
unchanged setup controls dominate the generated output, do not ask the model to
"write better prose" first. Patch the XMLV3 structure or Theme V3 style layer so
the next turn spends tokens on story, state, consequences, and actionable
choices.

## When to use Theme V3

Use Theme V3 for reusable visual identity: typography, colors, panels, speech
treatments, scene atmosphere, and extension packs. Binding a theme should not
hide critical story content.

## Real chat binding

XMLV3 welcome is not enough to prove XMLV3 real chat. For MCP-backed cards that
expect conversation replies to keep LunaTalk controls, call `theme_bind` before
simulation or acceptance. Without a role Theme V3 binding or enabled extension,
real chat may return `isV3:false` / `rendererMode:"plain"` and the assistant
reply will render like ordinary text even if the welcome preview looked
structured.

`theme_bind` supports:

- `mode: "reference"` with a `themeId`
- `mode: "forked"` with an inline `snapshot`

Use `theme_unbind` to remove the role's binding entirely and fall back to
default client styling; this is different from re-binding with a different
`themeId` or `snapshot`.

`extension_enable` toggles extension packs on the private role.

## When HTML is acceptable

Use HTML only when the author explicitly needs a custom one-off layout or when
migrating legacy HTML card content. HTML must not use scripts, inline event
handlers, or external URLs. Treat any validation blocker as mandatory to fix.

## Render review loop

1. Call `validate_role`.
2. Fix validation blockers before relying on visual review.
3. Call `render_preview` with `mode: "full-card"` unless inspecting a specific
   `html` or `xmlv3` issue.
4. Open the clean `previewUrl` when the client has browser or multimodal access.
   Do not add `debug=1` during ordinary UI review; debug chrome is only for
   renderer diagnosis and can add headers, IDs, and report panels that should
   not be judged as part of the card output.
5. Read `capturePlan` and capture every required vertical segment before visual
   judgment.
6. Read `evaluation` for capture readiness, semantic structure, readability, and
   first-screen action visibility.
7. Check both desktop and mobile if available.
8. Produce a render repair packet before patching.
9. Patch the card or theme.
10. Re-run validation and render preview until blockers are gone.

## Render repair packet

```text
Render repair packet:
- roleId:
- render mode:
- preview evidence:
- visual failures:
- playability failures:
- technical blockers:
- patch target:
- next Moonloom skill:
- fields to preserve:
- fields to patch:
- validation needed:
- rerender stance:
- handoff:
```

Patch XMLV3 or Theme V3 only when the evidence points to visual structure,
readability, hidden/visible state, or first-screen hierarchy. If the preview is
pretty but inert, route to opening or agency repair before styling.
