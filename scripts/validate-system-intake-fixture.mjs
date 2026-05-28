#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_FIXTURE_PATH = 'examples/system-intake-synthetic-card-fixture.md';

const REQUIRED_MARKERS = [
  'System intake synthetic fixture',
  'public-safe synthetic',
  'system/simulator',
  'setup wizard',
  'Mechanics / state model',
  'Event pool / scene generator',
  'Progression loop',
  'Failure-forward behavior',
  'Format protocol',
  'System intake packet',
  'Render Review Plan',
  'Playtest Probes',
];

const REQUIRED_XML_TAGS = [
  'scene',
  'stack',
  'panel',
  'grid',
  'form',
  'input',
  'radio',
  'checkbox',
  'bar',
  'choices',
  'choice',
  'state',
];

const FORBIDDEN_PATTERNS = [
  /\bproduction\s+data\b/i,
  /\braw\s+card\b/i,
  /\bSQL\b/i,
  /\bhttps?:\/\/(?:api|admin)\.lunatalk\.(?:ai|pro)\b/i,
  /Bearer\s+[A-Za-z0-9._-]{20,}/,
  /\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/i,
];

function issue(code, file, message) {
  return { code, file, message };
}

function extractXml(markdown) {
  return markdown.match(/```xml\s*([\s\S]*?)```/i)?.[1]?.trim() || '';
}

function collectTags(xml) {
  return new Set([...xml.matchAll(/<\/?\s*([A-Za-z][A-Za-z0-9-]*)\b/g)].map((match) => match[1]));
}

function parseState(xml) {
  const match = xml.match(/<state>\s*([\s\S]*?)\s*<\/state>/i);
  if (!match) return { state: null, error: 'missing' };
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

export function validateSystemIntakeFixture(markdown, options = {}) {
  const file = options.filePath || DEFAULT_FIXTURE_PATH;
  const issues = [];

  if (!markdown || typeof markdown !== 'string') {
    return {
      issues: [issue('system_intake.empty', file, 'Fixture markdown is empty.')],
      summary: { markers: 0, xmlTags: 0, choicesGrouped: false, hasPreviewState: false },
    };
  }

  for (const marker of REQUIRED_MARKERS) {
    if (!markdown.toLowerCase().includes(marker.toLowerCase())) {
      issues.push(issue('system_intake.marker_missing', file, `Missing marker: ${marker}`));
    }
  }

  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(markdown)) {
      issues.push(issue('system_intake.public_safety', file, 'Fixture contains protected-source-shaped text.'));
      break;
    }
  }

  const xml = extractXml(markdown);
  const tags = collectTags(xml);
  if (!xml) {
    issues.push(issue('system_intake.xml_missing', file, 'Missing XMLV3 code block.'));
  }
  for (const tag of REQUIRED_XML_TAGS) {
    if (!tags.has(tag)) {
      issues.push(issue('system_intake.xml_tag_missing', file, `Missing XMLV3 tag: ${tag}`));
    }
  }

  if (/\s(?:style|class)\s*=/i.test(xml) || /<\s*(div|section|button)\b/i.test(xml)) {
    issues.push(issue('system_intake.xml_raw_html', file, 'XMLV3 fixture must not use raw style/class or HTML layout tags.'));
  }

  const choicesGrouped = /<choices\b[^>]*\bcols\s*=\s*["']2["'][^>]*>/i.test(xml);
  if (!choicesGrouped) {
    issues.push(issue('system_intake.choices_not_grouped', file, 'System intake fixture should group short actions with <choices cols="2">.'));
  }

  const { state, error } = parseState(xml);
  let hasPreviewState = false;
  if (error === 'missing') {
    issues.push(issue('system_intake.state_missing', file, 'Missing XMLV3 state JSON.'));
  } else if (error) {
    issues.push(issue('system_intake.state_invalid', file, `Invalid XMLV3 state JSON: ${error}`));
  } else {
    hasPreviewState = hasPreviewStateShape(state);
    if (!hasPreviewState) {
      issues.push(issue('system_intake.state_shape', file, 'State should expose scene, status, and relationships.'));
    }
  }

  return {
    issues,
    summary: {
      markers: REQUIRED_MARKERS.filter((marker) => markdown.toLowerCase().includes(marker.toLowerCase())).length,
      xmlTags: tags.size,
      choicesGrouped,
      hasPreviewState,
    },
  };
}

export async function validateSystemIntakeFixtureFile(filePath = DEFAULT_FIXTURE_PATH) {
  const markdown = await readFile(filePath, 'utf8');
  return validateSystemIntakeFixture(markdown, { filePath });
}

async function main() {
  const target = process.argv[2] || DEFAULT_FIXTURE_PATH;
  const result = await validateSystemIntakeFixtureFile(target);

  if (result.issues.length > 0) {
    for (const item of result.issues) {
      console.error(`${item.code} ${item.file}: ${item.message}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(
    [
      `System intake fixture validation passed: ${result.summary.markers} markers`,
      `${result.summary.xmlTags} XMLV3 tags`,
      `grouped choices: ${result.summary.choicesGrouped ? 'yes' : 'no'}`,
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
