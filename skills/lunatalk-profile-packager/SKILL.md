---
name: lunatalk-profile-packager
description: Use when a LunaTalk role-card task focuses on roleName, roleDesc, tags, card profile, title, tagline, short pitch, public-facing package, first impression, discovery surface, promise compression, top-tier/popular/viral phrasing for profile fields, or why a player should open a coherent card before authoring, MCP calls, render, simulation, or publishing.
---

# LunaTalk Profile Packager

Use this skill when the card's engine mostly exists but the public-facing promise
is weak. The output is a profile package packet for `roleName`, `roleDesc`, tags,
and first-impression alignment, not a full rewrite and not a publish submission.

## Required references

Read `../../references/profile-packaging.md` first. Read
`../../references/role-card-writing-framework.md` when the promise layer needs
the four-layer model. Read `../../references/archetype-contracts.md` when the
card shape is unclear. Read `../../references/card-authoring-templates.md` when
the packet must be preserved through field assembly.

## Boundary

Do not call MCP tools. Do not create, patch, validate, render, simulate, or
publish a real role from this skill.

Do not reopen the premise unless the profile surface exposes a missing engine.
Preserve the existing card engine and patch only the public promise surface.

Do not present packaging advice as platform data, ranking, traffic, source-card,
or private-example analysis. Keep output original and public-safe.

## Workflow

1. Confirm this is a profile packaging task:
   - use this skill for `roleName`, `roleDesc`, tags, title, tagline, card
     profile, public surface, first impression, or reason-to-open work
   - route to `lunatalk-premise-workshop` if the premise is not chosen
   - route to `lunatalk-archetype-director` if the card shape is unclear
   - route to `lunatalk-quality-auditor` if the author asks for whole-card score
2. Extract the promise angle: card shape, player role, role/system, central
   tension, repeated play loop, strongest unusual detail, and first-screen proof.
3. Generate three `roleName` candidates with different angles.
4. Generate three `roleDesc` candidates. Keep most cards in the 80-260 character
   range; allow up to 500 only for systems, RPGs, generators, or complex ensemble
   cards.
5. Build a 4-8 tag set across card shape, relationship/role axis, action loop,
   tone/rating, and mechanic/format.
6. Run the first-impression check: player role, starting pressure, proof in first
   screen, tag specificity, and engine preservation.
7. Return a profile package packet and handoff target.

## Output format

Return:

```text
Route:
- entry skill:
- selected skill: lunatalk-profile-packager
- mode: profile package / promise compression
- MCP calls now: no
- final fields now: no, unless the author explicitly asks for draft-only field assembly
- next skill:

Profile package packet:
- current request:
- card shape:
- language:
- premise / engine preserved:
- promise angle:
  - player role:
  - role / system:
  - central tension:
  - repeated play loop:
  - strongest unusual detail:
  - first-screen proof:
- roleName candidates:
  - candidate:
  - angle:
  - risk:
- selected roleName:
- roleDesc candidates:
  - candidate:
  - char estimate:
  - angle:
  - cut / moved:
- selected roleDesc:
- tag set:
  - primary shape:
  - relationship / role axis:
  - action loop:
  - tone / rating:
  - mechanics / format:
- first-impression check:
- fields to preserve:
- fields to patch:
- handoff:

Self-review:
- premise preserved:
- player relation visible:
- tension visible:
- play loop visible:
- roleDesc scannable:
- tags specific:
- first screen can prove the promise:
- public-safe:
```

## Quality rules

- A good package sells the card; it does not summarize the whole card.
- `roleName` should be memorable because it is specific, not because it is long.
- `roleDesc` should include player relation and tension, not only role biography.
- Tags should describe shape, action, relationship, tone, or mechanic. Avoid
  duplicate mood synonyms.
- If the best roleDesc cannot be made compact, route back to archetype,
  premise, or engine design; the promise is not ready.
- If profile packaging changes the engine, stop and route to blueprint or the
  relevant narrow skill.
- If the author asks for "popular", "top", "viral", or similar language,
  translate it into public craft goals rather than claims. Do not use unsupported
  market words like "premium", "high-demand", "popular", "trending", "viral",
  "best", or "top-ranked" unless the author explicitly wants those words as
  in-world tone. Prefer specificity, player agency, tension, proof, and a clear
  reason to open.

## Handoff

Hand the packet to:

- `lunatalk-card-author` when the author wants draft-only field assembly or a
  profile patch on a private role.
- `lunatalk-opening-director` when the first screen cannot prove the new promise.
- `lunatalk-token-architect` when profile compression reveals broader allocation
  drift.
- `lunatalk-quality-auditor` when the author asks whether the whole card is good
  enough after packaging.
- `lunatalk-publish-readiness` only after the card is packaged, technically
  valid, tested as needed, and the author explicitly asks to submit.
