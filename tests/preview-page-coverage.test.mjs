import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const TOOLS = [
  'role_get_preview_page',
  'role_patch_preview_page',
  'role_reset_preview_page',
  'creator_image_list',
];

async function fileExists(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

test('preview page decoration has a dedicated public skill, evals, and reference', async () => {
  assert.equal(
    await fileExists('skills/lunatalk-preview-page-designer/SKILL.md'),
    true,
    'missing preview page designer skill',
  );
  assert.equal(
    await fileExists('skills/lunatalk-preview-page-designer/evals/evals.json'),
    true,
    'missing preview page designer evals',
  );
  assert.equal(
    await fileExists('references/preview-page-authoring.md'),
    true,
    'missing preview page authoring reference',
  );
});

test('preview page designer skill names all four MCP tools', async () => {
  const skill = await readFile('skills/lunatalk-preview-page-designer/SKILL.md', 'utf8');
  for (const tool of TOOLS) {
    assert.match(skill, new RegExp(tool), `skill missing ${tool}`);
  }
});

test('preview page designer skill requires a new idempotency key per saved doc', async () => {
  const skill = await readFile('skills/lunatalk-preview-page-designer/SKILL.md', 'utf8');
  assert.match(skill, /idempotencyKey/);
  // A new key must accompany each new doc; replaying an old key returns the old result.
  assert.match(skill, /new\s+idempotencyKey[\s\S]{0,200}(?:each|every|per|new doc)/i);
  assert.match(skill, /(?:replay|reus\w+)[\s\S]{0,160}(?:old|cached|previous)\s+result/i);
});

test('preview page designer skill drives the poll-until-pass image workflow', async () => {
  const skill = await readFile('skills/lunatalk-preview-page-designer/SKILL.md', 'utf8');
  assert.match(skill, /creator_image_list/);
  // Only moderationState=pass images may go into the doc.
  assert.match(skill, /moderationState/);
  assert.match(skill, /\bpass\b/);
  // After generating, poll the list until the target URL shows as pass before using it.
  assert.match(skill, /poll[\s\S]{0,200}\bpass\b/i);
});

test('preview page designer skill treats a vanished image URL as a terminal rejection', async () => {
  const skill = await readFile('skills/lunatalk-preview-page-designer/SKILL.md', 'utf8');
  // Rejected generated images are removed from the list, not written back as a status.
  assert.match(skill, /(?:disappear|vanish|remov\w+|gone|drops? out|no longer)/i);
  assert.match(skill, /terminal/i);
  // Distinguish "seen then disappeared" (terminal reject) from "never appeared" (insert lag).
  assert.match(skill, /seen[\s\S]{0,80}disappear|disappear[\s\S]{0,80}(?:after|once)\s+seen/i);
  assert.match(skill, /never\s+(?:appear|show)/i);
});

test('preview page designer skill bounds polling with backoff', async () => {
  const skill = await readFile('skills/lunatalk-preview-page-designer/SKILL.md', 'utf8');
  assert.match(skill, /backoff/i);
  assert.match(skill, /(?:bounded|upper bound|limit|do not[\s\S]{0,40}forever|stop after|window)/i);
});

test('preview page designer skill recovers from public_role_requires_clone', async () => {
  const skill = await readFile('skills/lunatalk-preview-page-designer/SKILL.md', 'utf8');
  assert.match(skill, /public_role_requires_clone/);
  // Recovery is to fall back to an existing pass image, not to retry generation.
  assert.match(skill, /(?:fall\s*back|use[\s\S]{0,40}existing)[\s\S]{0,160}pass/i);
  assert.match(skill, /(?:do not|don't)\s+re(?:-|\s)?(?:try|generat)/i);
});

test('preview page designer skill tolerates pending and handles conflict/rate-limit errors', async () => {
  const skill = await readFile('skills/lunatalk-preview-page-designer/SKILL.md', 'utf8');
  // pending is a normal, non-terminal state; do not resubmit in a tight loop.
  assert.match(skill, /pending/);
  assert.match(skill, /(?:not\s+terminal|non-terminal|normal|can\s+take\s+longer|may\s+persist)/i);
  // Concurrency and rate-limit handling.
  assert.match(skill, /version_conflict|409/);
  assert.match(skill, /rate_limited|429/);
});

test('preview page designer skill states rejection has category only, no per-node path', async () => {
  const skill = await readFile('skills/lunatalk-preview-page-designer/SKILL.md', 'utf8');
  assert.match(skill, /rejectReason/);
  assert.match(skill, /(?:category|class)/i);
  assert.match(skill, /(?:no\s+per-node|without[\s\S]{0,40}location|re-?read[\s\S]{0,60}doc)/i);
});

test('preview page designer skill teaches the columns anti-pattern', async () => {
  const skill = await readFile('skills/lunatalk-preview-page-designer/SKILL.md', 'utf8');
  // a single column is the default; columns is an exception, not a layout habit
  assert.match(skill, /(?:single column|one column)[\s\S]{0,160}(?:default|prefer|first)/i);
  assert.match(skill, /(?:do not|don't|avoid)[\s\S]{0,120}(?:wrap|put)[\s\S]{0,80}everything[\s\S]{0,60}`?columns`?/i);
  // the cap is 2-4 and the skill must not still teach the old 2-3 ceiling (2026-07-17)
  assert.doesNotMatch(skill, /two or three short parallel/i);
  assert.match(skill, /(?:two to four|2 to 4)/i);
  // narrow screens stack columns top-to-bottom, so side-by-side is never guaranteed
  assert.match(skill, /(?:collapse|stack)[\s\S]{0,160}(?:narrow|small)[\s\S]{0,60}(?:screen|viewport|width)/i);
  assert.match(skill, /(?:never|do not|don't)[\s\S]{0,120}(?:rely|depend)[\s\S]{0,120}side-by-side/i);
  // column order is the reading order on a phone
  assert.match(skill, /column order[\s\S]{0,160}reading order/i);
});

test('preview page designer skill bounds meter to static setting values', async () => {
  const skill = await readFile('skills/lunatalk-preview-page-designer/SKILL.md', 'utf8');
  // meter marks a fixed setting value chosen by the author
  assert.match(skill, /`meter`[\s\S]{0,300}?static/i);
  assert.match(skill, /(?:danger|difficulty|threat|power|attribute)/i);
  // it is NOT a live state readout: values that move during chat do not belong here
  assert.match(skill, /(?:do not|don't|never)[\s\S]{0,200}(?:change|move|shift)[\s\S]{0,120}(?:chat|conversation|play)/i);
  assert.match(skill, /(?:affection|tension|mood)/i);
  assert.match(skill, /(?:decorative|decoration|misleads?|mislead\w*)[\s\S]{0,200}(?:live|real-?time|current)|(?:live|real-?time)[\s\S]{0,200}(?:misleads?|decorat\w+)/i);
});

test('preview page designer skill states the accent budget for meter tone', async () => {
  const skill = await readFile('skills/lunatalk-preview-page-designer/SKILL.md', 'utf8');
  assert.match(skill, /`?tone`?[\s\S]{0,160}default[\s\S]{0,60}`?gold`?/i);
  assert.match(skill, /(?:at most|no more than|only)\s+one[\s\S]{0,160}(?:non-gold|other tone|accent)/i);
});

test('preview page designer skill disambiguates the overlapping new blocks', async () => {
  const skill = await readFile('skills/lunatalk-preview-page-designer/SKILL.md', 'utf8');
  // meter vs statCard: a scale versus a key/value table
  assert.match(skill, /`meter`[\s\S]{0,300}?`statCard`/);
  assert.match(skill, /(?:scale|magnitude|bar)[\s\S]{0,300}?(?:key\/value|key-value|rows)/i);
  // gallery vs image: a set versus a single anchor
  assert.match(skill, /`gallery`[\s\S]{0,300}?`image`/);
  assert.match(skill, /(?:set|group|several)[\s\S]{0,300}?(?:single|one)[\s\S]{0,120}(?:anchor|figure|hero)/i);
  // profileCard vs dialogueBubble: a cast wall versus a conversation
  assert.match(skill, /`profileCard`[\s\S]{0,300}?`dialogueBubble`/);
  assert.match(skill, /(?:cast|ensemble|group)[\s\S]{0,300}?`profileCard`|`profileCard`[\s\S]{0,300}?(?:cast|ensemble)/i);
});

test('lunatalk-mcp-operator skill exposes the four preview page tools', async () => {
  const operator = await readFile('skills/lunatalk-mcp-operator/SKILL.md', 'utf8');
  for (const tool of TOOLS) {
    assert.match(operator, new RegExp(tool), `operator skill missing ${tool}`);
  }
});

test('README registers the preview page designer skill', async () => {
  const readme = await readFile('README.md', 'utf8');
  assert.match(readme, /lunatalk-preview-page-designer/);
  assert.match(readme, /preview-page-authoring\.md/);
});

test('using-moonloom routes and references the preview page designer', async () => {
  const router = await readFile('skills/using-moonloom/SKILL.md', 'utf8');
  assert.match(router, /lunatalk-preview-page-designer/);
  assert.match(router, /preview page|preview-page-authoring/i);
  assert.match(router, /preview-page-authoring\.md/);
});

test('card-writer-mcp reference documents the four preview tools with idempotency requirement', async () => {
  const reference = await readFile('references/card-writer-mcp.md', 'utf8');
  for (const tool of TOOLS) {
    assert.match(reference, new RegExp(tool), `card-writer reference missing ${tool}`);
  }
  // mutating preview tools require idempotencyKey of at least 8 characters
  assert.match(reference, /role_patch_preview_page[\s\S]{0,600}idempotencyKey/);
  assert.match(reference, /role_reset_preview_page[\s\S]{0,600}idempotencyKey/);
  assert.match(reference, /at least 8 characters/);
  // read tools carry schemaVersion but no idempotencyKey
  assert.match(reference, /role_get_preview_page[\s\S]{0,600}schemaVersion/);
  // closed response whitelist / non-leak contract
  assert.match(reference, /doc/);
  assert.match(reference, /status/);
  assert.match(reference, /rejectReason/);
});

test('mcp-client-workflow reference documents the preview decoration stage with non-happy paths', async () => {
  const workflow = await readFile('references/mcp-client-workflow.md', 'utf8');
  for (const tool of TOOLS) {
    assert.match(workflow, new RegExp(tool), `client workflow missing ${tool}`);
  }
  assert.match(workflow, /version_conflict|409/);
  assert.match(workflow, /rate_limited|429/);
  assert.match(workflow, /reject/i);
  assert.match(workflow, /public_role_requires_clone/);
});

test('preview-page-authoring reference documents schema whitelist, limits, and state machine', async () => {
  const authoring = await readFile('references/preview-page-authoring.md', 'utf8');
  // schema v1 whitelist and hard limits (author-facing contract)
  assert.match(authoring, /200\s?KB/i);
  assert.match(authoring, /200\s+blocks/i);
  assert.match(authoring, /20000|20,000/);
  // Anchored to the real count. The previous `/11\s+block|block types/i` was an
  // alternation over the whole pattern, so the bare words "block types" satisfied
  // it and the number could never go stale-Red.
  assert.match(authoring, /16\s+block\s+types/i);
  // image sourcing rule in author-facing language, pass-only
  assert.match(authoring, /pass/);
  assert.match(authoring, /moderationState/);
  // image.attrs.width: the five-step enum is the wire contract. An author that
  // cannot read the legal values here has no way to discover them — a width outside
  // the enum is rejected, and the rejection does not enumerate what would have been
  // accepted. This reference is the only place a client can learn them, so the steps
  // are pinned literally rather than left to prose.
  assert.match(authoring, /`width`|attrs\.width/);
  for (const step of ['25', '33', '50', '66', '100']) {
    assert.match(authoring, new RegExp(`\`${step}\``), `authoring missing width step ${step}`);
  }
  // Absent width is legal and means full width — an author who omits it must not
  // think the block is malformed. Anchored to `image.attrs.width`: this default is
  // NOT shared with `gallery.attrs.width` (which defaults to `33`), so an
  // unanchored "omitted ... 100" would drift onto the wrong node's prose.
  assert.match(
    authoring,
    /`image\.attrs\.width`[\s\S]{0,400}?(?:omit\w*|absent|without)[\s\S]{0,160}`?100`?/i,
  );
  // state machine
  assert.match(authoring, /pending/);
  assert.match(authoring, /passed/);
  assert.match(authoring, /rejected/);
  // pending tolerance + paused-visibility author-facing wording
  assert.match(authoring, /(?:not\s+terminal|non-terminal|can\s+take\s+longer|may\s+persist)/i);
  assert.match(authoring, /(?:temporarily|paused|not\s+be\s+visible|unavailable)/i);
});

test('preview-page-authoring reference states the REAL wire node/mark vocabulary', async () => {
  const authoring = await readFile('references/preview-page-authoring.md', 'utf8');
  // node type strings ARE the public wire contract — a client must send these
  // exact names. Docs listing invented names strand every external AI client.
  for (const node of ['heading', 'paragraph', 'blockquote', 'bulletList', 'orderedList',
    'listItem', 'dialogueBubble', 'statCard', 'spoiler', 'divider', 'image',
    'columns', 'column', 'profileCard', 'gallery', 'meter']) {
    assert.match(authoring, new RegExp('`' + node + '`'), `missing block node \`${node}\``);
  }
  for (const mark of ['bold', 'italic', 'underline', 'strike', 'highlight', 'textStyle']) {
    assert.match(authoring, new RegExp('`' + mark + '`'), `missing mark \`${mark}\``);
  }
  // palette + tone enums and alignment attr key
  assert.match(authoring, /gold/);
  assert.match(authoring, /textAlign/);
  // Invented vocabulary must never come back. This guard was added after a round
  // that documented node names the server had never accepted, which strands every
  // external AI client that sends them verbatim.
  //
  // DELIBERATE RATCHET RELAXATION: `gallery` was removed from this list because it
  // is now a REAL node in the schema whitelist — it moved into the positive wire
  // assertion above, which is the stronger guard (it must be documented, not merely
  // absent). `callout` and `spacer` remain invented and stay protected here. Only
  // ever remove a name from this list in the same change that ships it as a real
  // node and adds it to the positive loop; never delete the list itself.
  for (const fake of ['`callout`', '`spacer`']) {
    assert.ok(!authoring.includes(fake), `invented node ${fake} must not be documented`);
  }
  // dialogue bubble content shape: inline preferred, paragraphs flattened
  assert.match(authoring, /dialogueBubble[\s\S]{0,400}?(?:inline|flatten)/i);
});

test('preview-page-authoring reference states the columns/column structural contract', async () => {
  const authoring = await readFile('references/preview-page-authoring.md', 'utf8');
  // children are only `column`, and there are 2 to 4 of them
  assert.match(authoring, /`columns`[\s\S]{0,400}?only[\s\S]{0,80}?`column`/i);
  assert.match(authoring, /`columns`[\s\S]{0,500}?(?:two to four|2 to 4)/i);
  // the rejected counts are one and five — the old text named four as rejected,
  // which silently became wrong when the cap moved 3 -> 4 (2026-07-17)
  assert.match(authoring, /`columns`[\s\S]{0,600}?five children[\s\S]{0,80}?rejected/i);
  assert.doesNotMatch(authoring, /four children is rejected|two or three of them/i);
  // there is no cols attr: the count is derived from the children
  assert.match(authoring, /no\s+`cols`/i);
  assert.match(authoring, /(?:derived|comes)\s+from[\s\S]{0,80}children/i);
  // columns is top-level only, never nested in another block and never self-nested
  assert.match(authoring, /`columns`[\s\S]{0,400}?top level/i);
  assert.match(authoring, /`spoiler`[\s\S]{0,120}`blockquote`[\s\S]{0,120}`listItem`/);
  assert.match(authoring, /(?:nest|inside)[\s\S]{0,120}another\s+`columns`/i);
  // column may only appear as a direct child of columns
  assert.match(authoring, /`column`[\s\S]{0,300}?direct child[\s\S]{0,80}?`columns`/i);
  // image width steps do not apply inside a column
  assert.match(authoring, /`column`[\s\S]{0,400}?(?:image|width)[\s\S]{0,300}?(?:no effect|ignored|does not apply)/i);
});

test('preview-page-authoring reference states profileCard, gallery, meter, and side attrs', async () => {
  const authoring = await readFile('references/preview-page-authoring.md', 'utf8');
  // profileCard field caps and no children
  assert.match(authoring, /`profileCard\.attrs\.name`[\s\S]{0,140}20/);
  assert.match(authoring, /`profileCard\.attrs\.subtitle`[\s\S]{0,140}40/);
  assert.match(authoring, /`profileCard\.attrs\.desc`[\s\S]{0,140}60/);
  assert.match(authoring, /`profileCard\.attrs\.avatarSrc`/);
  assert.match(authoring, /`profileCard\.attrs\.tags`[\s\S]{0,300}?6[\s\S]{0,200}?12/);
  assert.match(authoring, /`profileCard`[\s\S]{0,500}?no children/i);
  // bgSrc: the second image-bearing attr on profileCard. A client that does not
  // know it exists cannot use it and cannot discover it from a 400 either.
  assert.match(authoring, /`profileCard\.attrs\.bgSrc`/);
  // ...and the avatar fallback, which is the whole point of bgSrc: one pick,
  // both a card background and an avatar. Stated where the attr is defined.
  assert.match(
    authoring,
    /`profileCard\.attrs\.bgSrc`[\s\S]{0,420}?`avatarSrc`[\s\S]{0,200}?(?:absent|omitted|missing|not set)/i,
  );
  // gallery item shape and count bounds
  assert.match(authoring, /`gallery\.attrs\.items`[\s\S]{0,300}?`src`/);
  assert.match(authoring, /`gallery`[\s\S]{0,400}?(?:1 to 6|one to six)/i);
  // meter: label cap, integer 0-100, tone enum
  assert.match(authoring, /`meter\.attrs\.label`[\s\S]{0,140}20/);
  assert.match(authoring, /`meter\.attrs\.value`[\s\S]{0,240}?0[\s\S]{0,40}?100/);
  assert.match(authoring, /`meter\.attrs\.value`[\s\S]{0,300}?integer/i);
  assert.match(authoring, /`meter\.attrs\.tone`[\s\S]{0,160}?`gold`[\s\S]{0,60}`rose`[\s\S]{0,60}`violet`/);
  // an out-of-range, non-integer, or omitted value is rejected — never clamped
  assert.match(authoring, /(?:omitted|missing)[\s\S]{0,200}?reject/i);
  assert.match(authoring, /not\s+clamped|no\s+clamping|never\s+clamp/i);
  // dialogueBubble side enum with left default
  assert.match(authoring, /`dialogueBubble\.attrs\.side`[\s\S]{0,160}?`left`[\s\S]{0,60}`right`/);
  assert.match(authoring, /`side`[\s\S]{0,200}?default[\s\S]{0,40}?`left`/i);
});

test('preview-page-authoring reference states gallery width as a per-picture step', async () => {
  const authoring = await readFile('references/preview-page-authoring.md', 'utf8');
  // `gallery.attrs.width` reuses the image width enum. Like image width, the
  // rejection does not enumerate the legal values, so this reference is the only
  // place an external client can learn them — pin the steps literally.
  assert.match(authoring, /`gallery\.attrs\.width`/);
  for (const step of ['25', '33', '50', '66', '100']) {
    assert.match(
      authoring,
      new RegExp(`\`gallery\\.attrs\\.width\`[\\s\\S]{0,400}?\`${step}\``),
      `authoring missing gallery width step ${step}`,
    );
  }
  // Absent gallery width means `33`, NOT `100`. The two widths share an enum but
  // not a default, so an author who assumes the shared enum implies a shared
  // default sends nothing and expects a full-width picture.
  assert.match(
    authoring,
    /`gallery\.attrs\.width`[\s\S]{0,700}?(?:omit\w*|absent|null)[\s\S]{0,200}?`?33`?/i,
  );
  // The semantic that authors WILL get wrong: image width sizes the block, gallery
  // width sizes each picture inside the rail. The gallery block itself always spans
  // the column. Without this the enum reads as "same meaning", and a `100` gallery
  // gets sent expecting a full-width strip of six pictures.
  assert.match(
    authoring,
    /`gallery\.attrs\.width`[\s\S]{0,600}?each[\s\S]{0,80}(?:picture|image|item)/i,
  );
  assert.match(
    authoring,
    /`gallery`[\s\S]{0,900}?(?:block|itself)[\s\S]{0,120}(?:always|full)[\s\S]{0,80}column/i,
  );
  // A 100 step is one picture at a time — a carousel, not a wide single figure.
  assert.match(authoring, /`100`[\s\S]{0,200}?one[\s\S]{0,80}(?:picture|image)[\s\S]{0,80}at a time/i);
  // A gallery scrolls horizontally and keeps each picture's natural proportions.
  assert.match(authoring, /`gallery`[\s\S]{0,900}?scroll\w*[\s\S]{0,80}horizontal|horizontal\w*[\s\S]{0,80}scroll/i);
  assert.match(authoring, /(?:not cropped|no cropping|never cropped|without cropping)/i);
});

test('preview-page-authoring reference states the two width defaults differ on purpose', async () => {
  const authoring = await readFile('references/preview-page-authoring.md', 'utf8');
  // The shared five-step enum invites the assumption of a shared default. The
  // reference must state both defaults in the SAME breath and say the split is
  // deliberate, or an author reads one bullet and generalizes it to the other node.
  //
  // These two are pinned as literal "defaults to `N`" phrases rather than as a
  // loose <node> ... <number> proximity. An earlier draft of this test used
  // proximity and passed against prose that mentioned `image.attrs.width` and
  // `100` while stating no default at all — the assertion has to fail when the
  // defaults are missing, which is the entire point of the test.
  assert.match(authoring, /defaults?\s+to\s+`33`/i);
  assert.match(authoring, /defaults?\s+to\s+`100`/i);
  assert.match(
    authoring,
    /defaults?\s+to\s+`33`[\s\S]{0,400}?`100`|`100`[\s\S]{0,400}?defaults?\s+to\s+`33`/i,
  );
  assert.match(
    authoring,
    /(?:deliberate\w*|on\s+purpose|intentional\w*|diverge\w*|not\s+the\s+same\s+default)/i,
  );
  // The reason is the per-picture vs per-block split, stated where the defaults are.
  assert.match(
    authoring,
    /`33`[\s\S]{0,500}?(?:each\s+picture|per\s+picture|sizes?\s+each)/i,
  );
  // A defaulted-to-100 gallery would show one picture and hide the set — that is
  // the author-facing reason the defaults cannot match.
  assert.match(
    authoring,
    /(?:hide|conceal|lose|hidden)[\s\S]{0,200}(?:set|rest|group)|(?:one\s+picture)[\s\S]{0,200}(?:hide|hides|hiding)/i,
  );
});

test('preview-page-authoring reference exempts gallery width from the column rule', async () => {
  const authoring = await readFile('references/preview-page-authoring.md', 'utf8');
  // Inside a `column`, `image.attrs.width` has no effect but `gallery.attrs.width`
  // still applies: the column decides the BLOCK width, not how many pictures fit on
  // one screen. The existing "no effect inside a column" sentence must not be read
  // as covering gallery, or authors drop a legal attribute believing it is inert.
  // \s+ rather than a literal space: the reference is hard-wrapped, so any
  // multi-word phrase can land across a line break.
  assert.match(
    authoring,
    /`column`[\s\S]{0,700}?`gallery`[\s\S]{0,300}?(?:still\s+applies|still\s+has\s+effect|does\s+apply|continues\s+to)/i,
  );
});

test('preview page designer skill guides the gallery width step choice', async () => {
  const skill = await readFile('skills/lunatalk-preview-page-designer/SKILL.md', 'utf8');
  assert.match(skill, /`?width`?/);
  // The step is chosen by how many pictures should be visible at once.
  assert.match(skill, /`gallery`[\s\S]{0,900}?how many[\s\S]{0,120}(?:picture|image)/i);
  // `100` is the one-at-a-time carousel case.
  assert.match(skill, /`100`[\s\S]{0,240}?(?:carousel|one at a time)/i);
  // `100` is a deliberate carousel choice, not a general-purpose step and not the
  // default — the skill must not leave it reading as the safe pick.
  assert.match(
    skill,
    /(?:only|reach for it only|not|rather than)[\s\S]{0,200}(?:when you (?:actually )?want|general|default)/i,
  );
  assert.match(skill, /`33`[\s\S]{0,300}?default/i);
});

test('preview-page-authoring reference caps total images per document', async () => {
  const authoring = await readFile('references/preview-page-authoring.md', 'utf8');
  // gallery breaks the implicit "one block = one image" ceiling, so the doc-wide
  // image cap is now an explicit part of the author contract.
  assert.match(authoring, /200\s+images/i);
  // every image-bearing attr obeys the same pass-only rule
  assert.match(authoring, /`gallery`[\s\S]{0,400}?`src`[\s\S]{0,300}?same[\s\S]{0,120}(?:image rule|rules as)/i);
  assert.match(authoring, /`avatarSrc`[\s\S]{0,400}?(?:same|pass)/i);
});
