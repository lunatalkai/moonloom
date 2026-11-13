# Bounded Fengyue import

Read the author's export locally, show a conversion report, and confirm the chosen
content before writing. This mapping is partial; do not claim full compatibility.
Use private role/worldbook creation unless the author explicitly chooses publishing.
UI labels follow the viewer's language; imported text and code remain in their
original language. While parsing the file, do not translate, trim or execute imported code. The saved opening page intentionally allows author scripts inside its sandboxed frame.

## Detection and fields

Fengyue exports rotate top-level aliases. Require at least four recognized field
families plus a key starting with `ai_v` or `ai_variable`; a lone `name` is not proof.
A nonempty worldbook array must contain objects with `key`, `value`, `key_region`
and `value_region`. Tavern cards and standalone worldbooks are separate formats.

| Source aliases | Target |
|---|---|
| title / ttl / name / nm / app_name | roleName |
| summary / smry / sum_info / abs_txt / abstract | roleDesc |
| pre_prompt / prompt_pre / pre_pt / ppt | roleDetailDesc |
| pre_text / pre_tx / pretxt / ptx / prefix_txt | roleOutputContract |
| post_text / post_tx / posttxt / potx / suffix_txt | jailbreak |
| description / desc / descr / dsc / intro | openingMode=page and verbatim openingPage |
| builtCss / builtInCss / bicss / inner_css / built_in_css / custom_css | verbatim cardCss |
| sq / sug_q / sugg_ques / suggested_questions | player first-message choices, prologue |

Do not replace the inactive roleWelcome with a player choice. With no introductory
page, tell the author to supply opening content before saving. Keep every candidate
in the preview; if there are more than 20, ask the author to select up to 20 before
writing. Never silently truncate or convert these into assistant alternates.
For preset-chat mode (`ps_type` aliases, value 2), extract each group's
`suggested_questions`; report that preset dialogue itself is not converted.

## Worldbook and regex subset

Create a private `format: tavern` worldbook through `worldbook_create`, then use
`worldbook_entry_create` and `worldbook_bind` (or an owned document patch). Preserve
`enable:false`. Only verified OR keywords (`_or_`, separated by `@wb@` or commas),
`key_region:2` (user_only), `value_region:1`, default probability 100 and no group
are mapped. Unknown match/region/position/probability/group entries are skipped and
counted in the report. Source ordering/depth settings are not equivalent to Luna's
entry schema; report this and retain export order. Do not change recall budgets.

Regex goes through `role_patch_author_asset.rules`, after reading the current
asset/version. Preserve replacement text and disabled state. Only scope 10
(AI and player) with explicit `is_only_render:true` is imported. Scope 1 (AI-only),
unknown scopes, history-changing rules and invalid patterns are skipped and counted.
Escape slash delimiters and use global matching. Never add a before-send rewrite
or alter stored chat text to emulate an unsupported regex scope.

List variable panels, quick commands, blocked words, default themes and unknown
content fields as unconverted. They are not enabled by importing this format.
If a write outcome is uncertain, read back the owned asset before retrying; do not
blindly repeat an unconfirmed creation. The web form retains confirmed worldbook
progress, and asks the author to inspect and manually select a book after an
uncertain HTTP write.

## Card CSS

Supported Fengyue hooks include `#customized-answer-content`,
`#customized-question-content`, their `-markdown` variants, `#ai-chat-input`,
`#ai-input-content` and `#ai-send-button`. Native `data-lt` selectors and author
content selectors are also scoped to the card's chat page. Platform buttons are
paint-only: layout/position/size/padding declarations are omitted. Unknown platform hooks
are inert. `body`, `html` and `:root` rules remain inert as on Fengyue;
`.dark` / `html.dark` rules target the chat's dark root. The adapter removes
important priority from this field; legacy display-rule styles remain untouched.
External CSS imports, nested style rules and selectors that reach outside the chat root are not applied; the source remains stored verbatim and skipped rules are reported. A single stylesheet is mounted per visible page, then removed on hide/disposal.

Examples (author-written synthetic CSS):

```css
#customized-answer-content { background: #192838; color: #f5f7fa; }
[data-lt="composer"] { border-color: #d8b56a; }
.story-card { border-radius: 12px; }
```

These examples demonstrate mappings, not full rendering or import acceptance.

For writing or adapting the imported opening page, card CSS selectors, and
display rules, read [the authoring guide](opening-page-and-card-css.md).
