#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_XMLV3_PATH = 'examples/complete-synthetic-card-fixture.md';
const VALID_CHOICE_COLS = new Set(['1', '2', '3', '4', 'auto']);
const VALID_CHOICE_SPANS = new Set(['full', '2', '3', '4']);
const MAX_SHORT_CHOICE_TEXT = 80;

function issue(code, file, message) {
  return { code, file, message };
}

function extractXml(input) {
  if (typeof input !== 'string') {
    return '';
  }
  const blocks = [...input.matchAll(/```xml\s*([\s\S]*?)```/gi)].map((match) => match[1].trim());
  return blocks.length > 0 ? blocks.join('\n') : input.trim();
}

function stripTags(input) {
  return input.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function countChoiceTags(xml) {
  return [...xml.matchAll(/<choice\b[^>]*>/gi)].length;
}

function collectGroupedChoiceCount(xml) {
  let groupedChoiceCount = 0;
  let choicesGroupCount = 0;
  let choiceSpanCount = 0;
  const invalidGroups = [];
  const invalidSpans = [];

  for (const match of xml.matchAll(/<choices\b([^>]*)>([\s\S]*?)<\/choices>/gi)) {
    choicesGroupCount += 1;
    const attrs = match[1] || '';
    const body = match[2] || '';
    const colsMatch = attrs.match(/\bcols\s*=\s*["']([^"']+)["']/i);
    if (!colsMatch || !VALID_CHOICE_COLS.has(colsMatch[1])) {
      invalidGroups.push(match[0]);
    }
    for (const choiceMatch of body.matchAll(/<choice\b([^>]*)>/gi)) {
      const choiceAttrs = choiceMatch[1] || '';
      const spanMatch = choiceAttrs.match(/\bspan\s*=\s*["']([^"']+)["']/i);
      if (!spanMatch) {
        continue;
      }
      const span = spanMatch[1].trim().toLowerCase();
      if (VALID_CHOICE_SPANS.has(span)) {
        choiceSpanCount += 1;
      } else {
        invalidSpans.push(choiceMatch[0]);
      }
    }
    groupedChoiceCount += countChoiceTags(body);
  }

  return { groupedChoiceCount, choicesGroupCount, choiceSpanCount, invalidGroups, invalidSpans };
}

function removeChoicesGroups(xml) {
  return xml.replace(/<choices\b[^>]*>[\s\S]*?<\/choices>/gi, '');
}

function collectNakedChoices(xml) {
  const withoutGroups = removeChoicesGroups(xml);
  return [...withoutGroups.matchAll(/<choice\b[^>]*>([\s\S]*?)<\/choice>/gi)].map((match) => ({
    raw: match[0],
    text: stripTags(match[1] || ''),
  }));
}

function parseState(xml) {
  const match = xml.match(/<state>\s*([\s\S]*?)\s*<\/state>/i);
  if (!match) {
    return { state: null, error: 'missing' };
  }
  try {
    return { state: JSON.parse(match[1]), error: '' };
  } catch (error) {
    return { state: null, error: error.message };
  }
}

function hasPreviewStateShape(state) {
  return Boolean(
    state
      && typeof state === 'object'
      && !Array.isArray(state)
      && state.scene
      && Object.prototype.hasOwnProperty.call(state, 'status')
      && Object.prototype.hasOwnProperty.call(state, 'relationships'),
  );
}

function validateXmlv3Presentation(input, options = {}) {
  const file = options.filePath || DEFAULT_XMLV3_PATH;
  const xml = extractXml(input);
  const issues = [];

  if (!xml) {
    return {
      issues: [issue('xmlv3.empty', file, 'XMLV3 content is empty.')],
      summary: {
        choiceCount: 0,
        groupedChoiceCount: 0,
        choicesGroupCount: 0,
        choiceSpanCount: 0,
        hasPreviewState: false,
      },
    };
  }

  if (/\s(?:style|class)\s*=/i.test(xml)) {
    issues.push(issue('xmlv3.raw_style.present', file, 'XMLV3 must not use raw style/class attributes.'));
  }

  for (const match of xml.matchAll(/<scene\b[^>]*>([\s\S]*?)<\/scene>/gi)) {
    if (/<choices?\b/i.test(match[1])) {
      issues.push(
        issue('xmlv3.controls.inside_scene', file, 'Close </scene> before placing choice controls.'),
      );
      break;
    }
  }

  const { state, error } = parseState(xml);
  let hasPreviewState = false;
  if (error === 'missing') {
    issues.push(issue('xmlv3.state.missing', file, 'Missing XMLV3 <state> JSON.'));
  } else if (error) {
    issues.push(issue('xmlv3.state.invalid', file, `Invalid XMLV3 state JSON: ${error}`));
  } else {
    hasPreviewState = hasPreviewStateShape(state);
    if (!hasPreviewState) {
      issues.push(
        issue(
          'xmlv3.state.preview_shape',
          file,
          'State JSON should expose preview-compatible scene, status, and relationships keys.',
        ),
      );
    }
  }

  const {
    groupedChoiceCount,
    choicesGroupCount,
    choiceSpanCount,
    invalidGroups,
    invalidSpans,
  } = collectGroupedChoiceCount(xml);
  for (const _group of invalidGroups) {
    issues.push(
      issue('xmlv3.choices.cols_invalid', file, 'Each <choices> group should declare cols="1|2|3|4|auto".'),
    );
  }
  for (const _choice of invalidSpans) {
    issues.push(
      issue('xmlv3.choice.span_invalid', file, 'Each weighted <choice> span should be full, 2, 3, or 4. Omit span for a one-column item.'),
    );
  }

  const nakedChoices = collectNakedChoices(xml);
  const shortNakedChoices = nakedChoices.filter((item) => item.text.length <= MAX_SHORT_CHOICE_TEXT);
  if (shortNakedChoices.length >= 3) {
    issues.push(
      issue(
        'xmlv3.choice.naked_pile',
        file,
        'Three or more short sibling <choice> buttons should use <choices> for grid/row intent.',
      ),
    );
  }

  return {
    issues,
    summary: {
      choiceCount: countChoiceTags(xml),
      groupedChoiceCount,
      choicesGroupCount,
      choiceSpanCount,
      hasPreviewState,
    },
  };
}

export { validateXmlv3Presentation };

export async function validateXmlv3PresentationFile(filePath = DEFAULT_XMLV3_PATH) {
  const content = await readFile(filePath, 'utf8');
  return validateXmlv3Presentation(content, { filePath });
}

async function main() {
  const target = process.argv[2] || DEFAULT_XMLV3_PATH;
  const result = await validateXmlv3PresentationFile(target);

  if (result.issues.length > 0) {
    for (const item of result.issues) {
      console.error(`${item.code} ${item.file}: ${item.message}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(
    [
      `XMLV3 presentation validation passed: ${result.summary.choiceCount} choices`,
      `${result.summary.groupedChoiceCount} grouped choices`,
      `${result.summary.choicesGroupCount} choice groups`,
      `${result.summary.choiceSpanCount} weighted choices`,
      `preview state: ${result.summary.hasPreviewState ? 'yes' : 'no'}.`,
    ].join(', '),
  );
}

const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === currentFile) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
