#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_FIXTURE_PATH = 'examples/complete-synthetic-card-fixture.md';

const REQUIRED_SECTIONS = [
  'Fixture Goal',
  'Packet Stack Summary',
  'Final Role Fields',
  'roleDetailDesc',
  'roleWelcome',
  'talkExample',
  'compact fallback',
  'Field finalization packet',
  'Playtest Probes',
  'End-to-end acceptance packet',
  'Benchmark Use',
];

const REQUIRED_FIELD_MARKERS = [
  'roleName:',
  'roleDesc:',
  'tags:',
];

const REQUIRED_DETAIL_SECTIONS = [
  'Core premise',
  'Player position',
  'Agency and interaction',
  'Relationship engine',
  'World engine',
  'Voice fingerprint',
  'Progression and consequence',
  'Longplay engine',
  'Do / Avoid',
];

const REQUIRED_FINALIZATION_MARKERS = [
  '10,000-character `roleDetailDesc` hard cap stance',
  'compact fallback',
  'final status',
  'MCP patch mapping',
];

const REQUIRED_ACCEPTANCE_MARKERS = [
  'validate_role',
  'render_preview',
  'conversation_send_message',
  'conversation_inspect',
  'per-message preview',
  'remaining non-complete gates',
];

const REQUIRED_PROBES = [
  'normal interaction',
  'short reply',
  'off-path reply',
  'background question',
  'relationship push',
  'secret exploration',
  'boundary test',
];

const REQUIRED_XML_TAGS = ['scene', 'state', 'n', 'speaker', 'd', 'choice'];
const ALLOWED_XML_TAGS = new Set(REQUIRED_XML_TAGS);

const PLACEHOLDER_PATTERNS = [
  /\bTODO\b/i,
  /\[[^\]\n]*(?:fill|replace|later|todo|tbd|placeholder)[^\]\n]*\]/i,
  /<\s*(?:replace|todo|placeholder|fill)[^>]*>/i,
];

const FORBIDDEN_PUBLIC_CLAIM_PATTERNS = [
  /\b(?:production|prod)\s+data\b/i,
  /\bproduction\s+analysis\b/i,
  /\btraining\s+data\b/i,
  /(?:\u751f\u7522|\u751f\u4ea7)(?:\u8cc7\u6599|\u8d44\u6599|\u6578\u64da|\u6570\u636e)/,
  /\b(?:internal|private)\s+(?:database|data|source|metric|example)s?\b/i,
  /\breal[-\s]?user\s+(?:behavior|data|logs?|analytics)\b/i,
  /\braw\s+card\s+(?:content|text|data)\b/i,
  /\bhttps?:\/\/(?:api|admin)\.lunatalk\.(?:ai|pro)\b/i,
  /Bearer\s+[A-Za-z0-9._-]{20,}/,
  /\bsk-[A-Za-z0-9][A-Za-z0-9._-]{15,}\b/,
];

function issue(code, file, message) {
  return { code, file, message };
}

function escapeRegExp(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function hasHeading(markdown, heading) {
  const pattern = new RegExp(`^#{2,3}\\s+${escapeRegExp(heading)}\\s*$`, 'im');
  return pattern.test(markdown);
}

function extractXmlBlock(markdown) {
  const match = markdown.match(/```xml\s*([\s\S]*?)```/i);
  return match?.[1]?.trim() || '';
}

function collectXmlTags(xml) {
  const tags = new Set();
  const unknown = new Set();

  for (const match of xml.matchAll(/<\/?\s*([A-Za-z][A-Za-z0-9-]*)\b[^>]*>/g)) {
    const tag = match[1];
    if (ALLOWED_XML_TAGS.has(tag)) {
      tags.add(tag);
    } else {
      unknown.add(tag);
    }
  }

  return { tags, unknown };
}

function extractStateObject(xml) {
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

function countPresent(markdown, markers) {
  return markers.filter((marker) => markdown.toLowerCase().includes(marker.toLowerCase())).length;
}

function validateMarkers(markdown, markers, issues, file, code, label) {
  for (const marker of markers) {
    if (!markdown.toLowerCase().includes(marker.toLowerCase())) {
      issues.push(issue(code, file, `Missing ${label}: ${marker}`));
    }
  }
}

function validatePlaceholders(markdown, issues, file) {
  if (PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(markdown))) {
    issues.push(issue('fixture.placeholder.present', file, 'Fixture contains placeholder-shaped text.'));
  }
}

function validatePublicSafety(markdown, issues, file) {
  if (FORBIDDEN_PUBLIC_CLAIM_PATTERNS.some((pattern) => pattern.test(markdown))) {
    issues.push(issue('fixture.public_claim.forbidden', file, 'Fixture contains protected public-claim-shaped text.'));
  }
}

export function validateCompleteFixture(markdown, options = {}) {
  const file = options.filePath || DEFAULT_FIXTURE_PATH;
  const issues = [];

  if (!markdown || typeof markdown !== 'string') {
    issues.push(issue('fixture.empty', file, 'Fixture markdown is empty.'));
    return {
      issues,
      summary: {
        requiredSections: 0,
        xmlTags: 0,
        playtestProbes: 0,
        stateKeys: 0,
      },
    };
  }

  for (const section of REQUIRED_SECTIONS) {
    if (!hasHeading(markdown, section)) {
      issues.push(issue('fixture.section.missing', file, `Missing section: ${section}`));
    }
  }

  validateMarkers(markdown, REQUIRED_FIELD_MARKERS, issues, file, 'fixture.field.missing', 'role field');
  validateMarkers(
    markdown,
    REQUIRED_DETAIL_SECTIONS,
    issues,
    file,
    'fixture.detail_section.missing',
    'roleDetailDesc section',
  );
  validateMarkers(
    markdown,
    REQUIRED_FINALIZATION_MARKERS,
    issues,
    file,
    'fixture.finalization_marker.missing',
    'field finalization marker',
  );
  validateMarkers(
    markdown,
    REQUIRED_ACCEPTANCE_MARKERS,
    issues,
    file,
    'fixture.acceptance_marker.missing',
    'acceptance marker',
  );
  validateMarkers(markdown, REQUIRED_PROBES, issues, file, 'fixture.probe.missing', 'playtest probe');
  validatePlaceholders(markdown, issues, file);
  validatePublicSafety(markdown, issues, file);

  const xml = extractXmlBlock(markdown);
  const { tags, unknown } = collectXmlTags(xml);
  if (!xml) {
    issues.push(issue('fixture.xmlv3.missing', file, 'Missing XMLV3 code block.'));
  }
  for (const tag of REQUIRED_XML_TAGS) {
    if (!tags.has(tag)) {
      issues.push(issue('fixture.xmlv3.tag_missing', file, `Missing XMLV3 tag: ${tag}`));
    }
  }
  for (const tag of unknown) {
    issues.push(issue('fixture.xmlv3.tag_unknown', file, `Unknown XMLV3 tag: ${tag}`));
  }

  const { state, error } = extractStateObject(xml);
  if (error === 'missing') {
    issues.push(issue('fixture.xmlv3.state_missing', file, 'Missing XMLV3 state JSON.'));
  } else if (error) {
    issues.push(issue('fixture.xmlv3.state_invalid', file, `Invalid XMLV3 state JSON: ${error}`));
  }

  return {
    issues,
    summary: {
      requiredSections: countPresentHeadings(markdown, REQUIRED_SECTIONS),
      xmlTags: tags.size,
      playtestProbes: countPresent(markdown, REQUIRED_PROBES),
      stateKeys: state && typeof state === 'object' && !Array.isArray(state) ? Object.keys(state).length : 0,
    },
  };
}

function countPresentHeadings(markdown, headings) {
  return headings.filter((heading) => hasHeading(markdown, heading)).length;
}

export async function validateCompleteFixtureFile(filePath = DEFAULT_FIXTURE_PATH) {
  const markdown = await readFile(filePath, 'utf8');
  return validateCompleteFixture(markdown, { filePath });
}

async function main() {
  const target = process.argv[2] || DEFAULT_FIXTURE_PATH;
  const result = await validateCompleteFixtureFile(target);

  if (result.issues.length > 0) {
    for (const item of result.issues) {
      console.error(`${item.code} ${item.file}: ${item.message}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(
    [
      `Complete fixture validation passed: ${result.summary.requiredSections} sections`,
      `${result.summary.xmlTags} XMLV3 tags`,
      `${result.summary.playtestProbes} probes`,
      `${result.summary.stateKeys} state keys.`,
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
