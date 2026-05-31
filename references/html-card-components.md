# HTML Card Components (hc-*)

Use this reference with `lunatalk-html-card-components` when Moonloom must
author, review, or migrate a LunaTalk welcome in `mode: "html"` and the output
contains `hc-*` HTML card components. For new visual cards, prefer XMLV3 plus
Theme V3 first. HTML is for legacy migration, a user-explicit HTML request, or a
custom layout that XMLV3 layout packs cannot express yet.

This document is public-safe synthetic guidance. It describes platform component
contracts and examples only; it does not contain private role fields, private
chat transcripts, account identifiers, or non-public source material.

Audited runtime sources include desktop/mobile HTML component registration,
Theme template compatibility components, sanitizer whitelists, HTML card CSS
utilities, MCP preview behavior, and server-side HTML preservation rules.

## Safety Rules

- Prefer XMLV3 first. Before choosing HTML, check whether `<panel>`, `<stack>`,
  `<grid>`, `<field>`, `<choices>`, `<form>`, `<bar>`, `<tag>`, or
  `<collapse>` can carry the same play value.
- Do not invent `hc-*` tags or attributes. Unsupported custom elements may pass
  through validation but render as empty or plain unknown elements in one client.
- Do not use scripts, inline event handlers, external URLs, iframes, object
  embeds, or behavior that depends on arbitrary JavaScript.
- Keep actions explicit: `send` fills the chat input with the intended player
  action; `copy` copies text. Do not hide critical play state in button labels.
- Validate, render preview, and inspect desktop/mobile when HTML mode is used.

## Support Tiers

- **Cross-client stable**: allowed for new Moonloom HTML cards after the
  XMLV3-first check. These components exist in the shared app runtime and are
  the default safe catalog.
- **Legacy Theme primitives**: registered for existing Theme template output and
  older cards. Preserve or review them, but prefer the clearer cross-client
  components for new Moonloom HTML.
- **Limited / client-specific**: observed in mobile or older theme-pack docs,
  but not safe as a new cross-client Moonloom default unless a current renderer
  validation report proves support on every target.

## Cross-Client Component Catalog

These are the stable `hc-*` elements Moonloom may use for HTML cards across
desktop, mobile, MCP preview, and sanitizer paths.

### `hc-btn`

Action button for a player intent.

| Attribute | Meaning |
| --- | --- |
| `send` | Text inserted into the chat input. Use a complete player intent, not only a label. |
| `copy` | Text copied to clipboard. Use for reusable prompts or codes, not hidden state. |
| `bg` | Button background. Use a solid color or simple comma-separated gradient colors. |
| `w` | Width. Empty/default is full width; `full` is 100%; `auto` or a percentage is allowed. |
| `c` | Centers the button when width is set. |
| `txt-color` | Button text color. Keep contrast readable against `bg`. |

### `hc-bar`

Numeric progress bar for continuous values.

| Attribute | Meaning |
| --- | --- |
| `value` | Current numeric value. |
| `max` | Maximum numeric value. Defaults to 100 when omitted. |
| `color` | Fill color. |
| `label` | Optional label shown near the bar in preview paths that support it. |

Use only for continuous values such as pressure, trust, heat, countdown, or
resources. Do not use bars for text phases, flags, locations, or relationship
labels.

### `hc-stat`

Label/value fact row.

| Attribute | Meaning |
| --- | --- |
| `label` | Fact name, such as Trust, Route, Location, or Deadline. |
| `value` | Fact value shown to the player. |
| `color` | Accent color for the value or row. |
| `icon` | Mobile-supported visual marker. For cross-client clarity, prefer text in `label`. |

### `hc-tag`

Compact badge for route, status, clue type, rarity, or phase.

| Attribute | Meaning |
| --- | --- |
| `bg` | Tag background color. |
| `txt-color` | Tag text color. |

### `hc-collapse`

Expandable optional detail panel.

| Attribute | Meaning |
| --- | --- |
| `title` | Header text. Defaults to a generic expand label when omitted. |
| `open` | Starts expanded when present. Omit it for collapsed by default. |

Use for optional rules, case files, logs, help text, clues, or setup details
that should not crowd the first screen.

### `hc-radio`

Single-choice form group used inside `hc-form`.

| Attribute | Meaning |
| --- | --- |
| `label` | Question label shown above the choices. |
| `name` | Field key used when assembling the submitted chat text. |
| `options` | Comma-separated options. Keep each option short. |
| `color` | Accent color. Inherits `hc-form color` when omitted in shared runtimes. |

### `hc-checkbox`

Multi-choice form group used inside `hc-form`.

| Attribute | Meaning |
| --- | --- |
| `label` | Question label shown above the choices. |
| `name` | Field key used when assembling the submitted chat text. |
| `options` | Comma-separated options. Keep each option short. |
| `color` | Accent color. Inherits `hc-form color` when omitted in shared runtimes. |

### `hc-input`

Text input used inside `hc-form`.

| Attribute | Meaning |
| --- | --- |
| `label` | Field label. |
| `name` | Field key used when assembling the submitted chat text. |
| `placeholder` | Empty-state hint text. |
| `color` | Accent color. Inherits `hc-form color` when omitted in shared runtimes. |

Use for first-turn setup or short free text. Do not depend on a prefilled
`value` attribute for cross-client behavior.

### `hc-form`

Wrapper that gathers child inputs and submits them as chat input text.

| Attribute | Meaning |
| --- | --- |
| `title` | Form title. |
| `btn` | Submit button label. |
| `bg` | Submit button background. |
| `color` | Submit button text color and inherited child accent color. |

The submitted text is assembled from child `hc-input`, `hc-radio`, and
`hc-checkbox` fields. Use forms for setup or intake, not for every normal turn.

## Safe Layout and Text Classes

These classes are safe to use as lightweight HTML card primitives:

- `hc-c`, `hc-light`: card container variants.
- `hc-st`: compact status strip.
- `hc-d`, `hc-n`, `hc-p`, `hc-quote`: dialogue, narration, paragraph, and
  quote text blocks.
- `hc-h`, `hc-h1`, `hc-h2`, `hc-h3`: headings.
- `hc-hr`: divider.
- `hc-f`, `hc-fj`, `hc-fw`, `hc-fill`, `hc-wrap`: flex grouping and wrapping.
- `hc-g2`, `hc-g3`: compact grids. Avoid multi-column long prose on mobile.
- `hc-panel`, `hc-notice`, `hc-speaker`, `hc-badge`, `hc-info-row`,
  `hc-option`, `hc-choices`: common card surfaces and option groups.
- `hc-bg-dark`, `hc-bg-red`, `hc-bg-blue`, `hc-bg-green`, `hc-bg-purple`,
  `hc-bg-orange`, `hc-bg-glass`, `hc-bg-dim`, `hc-bg-pink`, `hc-bg-cyan`,
  `hc-bg-gold`, `hc-bg-night`, `hc-bg-forest`, `hc-bg-blood`: background
  utility classes. Use them sparingly and keep contrast readable.
- `hc-glow`, `hc-glow-text`, `hc-gradient-text`, `hc-shimmer`,
  `hc-pulse-border`, `hc-hr-gradient`, `hc-bg-aurora`: decorative effects.
  Do not let effects replace playable state, actions, or readable text.

## Legacy Theme Compatibility Components

`hc-action`, `hc-display`, and `hc-toggle` are legacy/Theme template
compatibility primitives. They are still registered for existing theme
templates, but new Moonloom-authored HTML cards should use the clearer
cross-client components above: `hc-btn`, `hc-bar`, `hc-stat`, `hc-tag`,
`hc-collapse`, and the `hc-form` family.

| Component | Purpose | Attributes |
| --- | --- | --- |
| `hc-action` | Legacy action button | `send`, `copy` |
| `hc-display` | Legacy display primitive | `type`, `value`, `max`, `label`, `data-level` |
| `hc-toggle` | Legacy expandable block | `title`, `open` |

`hc-display type="bar"` uses `value`, `max`, `label`, and optional
`data-level` (`danger`, `warning`, or default). `type="stat"` uses `label` and
`value`. `type="tag"` uses its slot text and optional `data-level`.

## Limited / Client-Specific Components

Avoid these for new cross-client Moonloom cards unless a current renderer
validation report proves support on every target client:

| Component | Observed purpose | Attributes | Safer cross-client default |
| --- | --- | --- | --- |
| `hc-meter` | Mobile meter / alert-level bar | `label`, `value`, `max`, `color`, `data-level` | `hc-bar` plus `hc-stat` |
| `hc-tabs` | Mobile tab group wrapper | child `hc-tab` elements | `hc-collapse` sections or XMLV3 layout |
| `hc-tab` | Mobile tab panel | `title` | `hc-collapse` section |
| `hc-list` | Mobile list wrapper | child `hc-item` elements | `hc-panel`, `hc-stat`, or plain list markup |
| `hc-item` | Mobile list row | `icon` | text label inside stable layout |
| `hc-alert` | Mobile alert block | `type` (`info`, `warning`, `danger`, `success`) | `hc-tag`, `hc-notice`, or `hc-collapse` |

## Examples

Status and action surface:

```html
<section class="hc-c hc-bg-dark">
  <h2 class="hc-h hc-h2">Signal Room</h2>
  <p class="hc-p">The console shows three active channels. Choose one lead before the signal expires.</p>
  <div class="hc-g2">
    <hc-stat label="Trust" value="42/100" color="#f5c542"></hc-stat>
    <hc-stat label="Pressure" value="71/100" color="#fb7185"></hc-stat>
  </div>
  <hc-bar value="71" max="100" color="#fb7185" label="Pressure"></hc-bar>
  <div class="hc-f hc-wrap hc-mt">
    <hc-btn w="auto" send="Check the locked channel" bg="#f5c542" txt-color="#101418">Check channel</hc-btn>
    <hc-btn w="auto" send="Ask why the signal is repeating" bg="#78dce8" txt-color="#081016">Ask about signal</hc-btn>
  </div>
</section>
```

Setup form:

```html
<section class="hc-c hc-bg-glass">
  <h2 class="hc-h hc-h2">First Setup</h2>
  <p class="hc-p">Pick the starting stance before the first reply.</p>
  <hc-form title="Setup" btn="Apply setup" bg="#f5c542" color="#101418">
    <hc-input label="Known clue" name="clue" placeholder="A clue you already trust"></hc-input>
    <hc-radio label="Opening stance" name="stance" options="Careful,Direct,Quiet"></hc-radio>
    <hc-checkbox label="Boundaries" name="boundaries" options="No violence,No romance,Keep mystery"></hc-checkbox>
  </hc-form>
</section>
```

## Review Checklist

- The card can still be understood if custom CSS fails.
- The first screen shows place, pressure, and next player action.
- Buttons use `send` text that represents a full player intent.
- Forms are for setup or intake; they are not repeated every turn unless the
  card is an explicit generator or simulator.
- Bars are numeric and are not used for text states, phases, flags, locations,
  or relationship labels.
- The output uses only supported `hc-*` components and safe classes above.
