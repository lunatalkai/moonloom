# Moonloom Visual Identity

Use this reference when a role card needs avatar, cover, thumbnail, or image
prompt direction. Visual identity is the first visual proof of the card promise;
it is not a substitute for profile packaging, presentation planning, render
review, or a real asset pipeline.

```text
card promise -> visual proof -> avatar / cover / thumbnail brief -> prompt set -> handoff
```

Avatar, cover, and thumbnail must prove the promise, player role, and tension in
one glance. If the image could fit any nearby trope, it is too generic.

For MCP-backed creation, visual direction is only the planning layer. The final
private-card handoff still needs real `roleAvatar` and `roleBackground` image
URLs patched through `role_patch_assets`. If the agent has only prompts or an art
brief, report the asset gap instead of calling the card complete.

## When to use

Use visual identity when the author asks for:

- avatar, cover, thumbnail, profile image, key art, image prompt, or art brief
- first-impression visual direction after the card premise is mostly coherent
- visual consistency between `roleName`, `roleDesc`, Theme V3, and the first
  scene
- a public-safe image-generation prompt before final profile or presentation work
- a repair when the profile package is clear but the visual promise is vague

Route away when:

- the premise, player role, or primary tension is missing: use premise, archetype,
  character, relationship, world, scenario, daily-life, play, or generator work
  first
- the task is about XMLV3, HTML, visible state, or Theme V3 layout: use
  `presentation-design.md`
- a screenshot, preview URL, DOM summary, overflow, contrast, or console report
  already exists: use render review
- the task is only `roleName`, `roleDesc`, tags, or short pitch: use profile
  packaging first

## Visual proof

The visual direction must answer:

- Who or what anchors the card?
- Where does the player stand relative to it?
- What pressure makes the scene start now?
- What detail could not belong to a generic version of the same trope?
- What mood, palette, and framing support the promise without hiding play?

Prefer one specific playable signal over many decorative symbols. A cover with
one charged object, glance, setting rule, or route clue is stronger than a collage
of unrelated mood markers.

## Asset roles

| Asset | Job | Avoid |
|---|---|---|
| Avatar | make the role or system recognizable at small size | full-body scene with no readable face/object/silhouette |
| Background / cover | prove the playable tension and player relation | poster-only atmosphere with no action or pressure |
| Thumbnail | stay legible in discovery surfaces | tiny text, busy lore objects, low-contrast dark scenes |
| Image prompt | give an art model a clear target | copying unprovided art, named living artists, or vague style stacks |
| Negative prompt | reduce failure modes | banning the actual mood or important card signal |

## Prompt rules

Write prompts as original art direction, not as copied references.

- Do not copy unprovided art, protected character designs, exact outfits, exact
  compositions, or image text from another work.
- Do not name living artists or private reference sources.
- Do not imply the card was based on non-public material.
- Use visual traits that serve the card: silhouette, expression, camera distance,
  lighting, palette, key object, setting pressure, and player-relative framing.
- Keep text out of generated images unless the asset pipeline explicitly supports
  reliable typography.
- Add negative prompts only for concrete risks such as unreadable face, extra
  limbs, cluttered background, text artifacts, washed-out contrast, or wrong age
  impression.

## Alignment with Moonloom layers

Visual identity does not replace profile, presentation, or render review.

- Profile packaging decides the public promise in words.
- Visual identity turns that promise into avatar, cover, thumbnail, and image
  prompt direction.
- Presentation planning decides XMLV3, HTML, Theme V3, visible state, and first-
  screen hierarchy.
- Render review checks actual rendered output after validation or preview.

If a visual idea changes the role engine, stop and route back to the missing
writing skill. Do not let an appealing image pull the card into a different
premise.

## Visual identity packet

Return this packet:

```text
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
  - next action: generate / upload / author-provide / patch-assets
- handoff:
```

## Common repairs

| Failure | Repair |
|---|---|
| Pretty but generic image | add player relation, pressure, or unusual card-specific object |
| Avatar is unreadable small | simplify silhouette, crop closer, increase contrast |
| Cover contradicts roleDesc | preserve the engine and rewrite art direction |
| Prompt copies a reference | replace with original traits and composition goals |
| Visual idea changes the card | route back to premise or archetype instead of patching assets |
| Theme and cover clash | hand off to presentation after visual identity is stable |
| MCP card created without images | prepare URLs, call `role_patch_assets`, rerun validation before render/publish |

## Self-review

Before handoff, verify:

- the image direction is original and public-safe
- avatar, cover, and thumbnail each have a distinct job
- the visual proof shows promise, player role, and tension
- the prompt avoids copied or unprovided art references
- Theme V3 and opening can support the same visual promise
- any actual preview still needs render review
