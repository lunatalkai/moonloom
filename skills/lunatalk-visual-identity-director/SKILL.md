---
name: lunatalk-visual-identity-director
description: Use when LunaTalk role-card work focuses on avatar, cover, thumbnail, profile image, visual identity, image prompt, key art, art brief, first-impression visual direction, or aligning card visuals with roleName, roleDesc, Theme V3, and the opening before authoring, render review, simulation, or publishing.
---

# LunaTalk Visual Identity Director

Use this skill when a card's premise or packet stack mostly exists, but the
avatar, cover, thumbnail, or image prompt direction is unresolved. The output is
a visual identity packet, not an asset upload, image generation run, MCP patch,
or render report. For MCP-backed creation, the packet must explicitly say whether
real avatar/background URLs are ready or still missing.

## Required references

Read `../../references/visual-identity.md` first. Read
`../../references/profile-packaging.md` when the public promise in `roleName`,
`roleDesc`, or tags is weak. Read `../../references/presentation-design.md` and
`../../references/theme-v3-rendering.md` when Theme V3, XMLV3, HTML, or first-
screen hierarchy must align with the visual direction. Read
`../../references/card-authoring-templates.md` when the packet must be preserved
through field assembly.

## Boundary

Do not call MCP tools. Do not create, patch, validate, render, simulate, publish,
generate images, or upload assets from this skill.

Do not copy unprovided art, protected character designs, exact compositions,
image text, or private references. Keep all visual direction original and
public-safe.

Use `lunatalk-profile-packager` instead when the unresolved layer is only
`roleName`, `roleDesc`, tags, short pitch, or discovery copy. Use
`lunatalk-presentation-director` instead when the unresolved layer is XMLV3,
HTML, Theme V3, visible state, hidden state, or first-screen UI hierarchy. Use
`lunatalk-render-review` when an actual preview, screenshot, or render report
already exists.

## Workflow

1. Confirm the card promise is coherent enough to visualize: card shape, player
   role, role/system anchor, central tension, and first-scene proof.
2. Route to the missing writing skill first if the premise, player role, or
   tension is absent. Visual polish must not hide an unresolved engine.
3. Extract the visual proof: one non-generic image signal that shows why this card
   is not a stock trope.
4. Define separate jobs for avatar, cover, and thumbnail.
5. Write original art direction: focal subject, silhouette, expression/gesture,
   key object, setting pressure, camera/crop, palette, lighting, and texture.
6. Draft avatar, cover, thumbnail, and negative prompts without copying
   unprovided art or naming private references.
7. Decide asset readiness: author-provided URL, generated/uploaded URL,
   prompt-only, or missing. If URLs are ready, hand off to `role_patch_assets`;
   if not, hand off to `role_generate_assets` to generate and bind the images
   directly (pass this packet's art brief as its `prompt` override), or to author
   provision, before MCP-backed completion. A prompt-only packet is not a
   complete MCP-backed card.
8. Check alignment with `roleName`, `roleDesc`, Theme V3, and the opening scene.
9. Hand off to profile packaging, presentation, card authoring, or render review
   as the next bottleneck.

## Output format

Return:

```text
Route:
- entry skill:
- selected skill: lunatalk-visual-identity-director
- mode: visual identity / art brief
- MCP calls now: no
- asset upload now: no
- next skill:

Visual identity packet:
- current request:
- card shape:
- language:
- premise / engine preserved:
- promise proof:
  - player role:
  - role / system anchor:
  - central tension:
  - first-scene proof:
  - non-generic visual detail:
- asset plan:
  - avatar:
  - cover:
  - thumbnail:
- art direction:
  - silhouette / focal subject:
  - expression / gesture / object:
  - setting pressure:
  - camera / crop:
  - palette / lighting:
  - texture / finish:
- image prompts:
  - avatar prompt:
  - cover prompt:
  - thumbnail prompt:
  - negative prompt:
- consistency checks:
  - roleName / roleDesc aligned:
  - Theme V3 aligned:
  - opening aligned:
  - readable at small size:
  - public-safe and original:
- fields to preserve:
- fields to patch:
- MCP asset readiness:
  - roleAvatar URL:
  - roleBackground URL:
  - next action: generate (role_generate_assets) / upload / author-provide / patch-assets
- handoff:

Self-review:
- promise visible:
- player role visible:
- tension visible:
- asset jobs separated:
- prompts original:
- visual identity does not replace profile, presentation, or render review:
- MCP-backed card is not complete until avatar/background URLs are patched:
- next skill:
```

## Quality rules

- A visual identity brief must prove the card promise, not only decorate it.
- Avatar should be readable at small size. Prefer face, object, or silhouette
  clarity over full-scene complexity.
- Cover should show pressure, player relation, or a route clue. Avoid mood-only
  posters.
- Thumbnail should preserve contrast and composition after cropping.
- Negative prompts should target concrete image failures, not strip out the
  intended mood.
- If visual direction contradicts the engine, preserve the engine and repair the
  brief or route back to premise/archetype work.
- If Theme V3 or XMLV3 structure is the real blocker, hand off to
  `lunatalk-presentation-director`.
- If a private card already exists without avatar or background, keep the
  writing fields intact, then either prepare public-safe asset URLs and call
  `role_patch_assets`, or hand off to `role_generate_assets` (with this packet's
  art brief as the `prompt`) to generate and bind them; rerun validation before
  render or publish readiness. `role_generate_assets` charges image-generation
  points, so treat it as a real, billed asset action, not a design preview.

## Handoff

Hand the packet to:

- `lunatalk-profile-packager` when visual work exposes weak public promise copy.
- `lunatalk-presentation-director` when Theme V3, XMLV3, HTML, or first-screen
  hierarchy must carry the same visual promise.
- `lunatalk-card-author` when the author wants draft-only field assembly or a
  private-role patch once asset fields are available.
- `lunatalk-render-review` after an actual preview or screenshot exists.
