#!/usr/bin/env node

import { access, readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REQUIRED_JSON_FILES = [
  '.codex-plugin/plugin.json',
  '.claude-plugin/plugin.json',
  '.cursor-plugin/plugin.json',
  '.mcp.json',
];

const SCAN_PATHS = [
  'README.md',
  'references',
  'skills',
  'examples',
  '.codex-plugin/plugin.json',
  '.claude-plugin/plugin.json',
  '.cursor-plugin/plugin.json',
  '.mcp.json',
];

const SECRET_PATTERNS = [
  { label: 'Bearer token', pattern: /Bearer\s+[A-Za-z0-9._-]{20,}/g },
  { label: 'API key', pattern: /\bsk-[A-Za-z0-9][A-Za-z0-9._-]{15,}\b/g },
];

function issue(code, file, message) {
  return { code, file, message };
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readJson(root, relativePath, issues) {
  const filePath = path.join(root, relativePath);

  try {
    return JSON.parse(await readFile(filePath, 'utf8'));
  } catch (error) {
    issues.push(issue('json.invalid', relativePath, error.message));
    return undefined;
  }
}

function parseFrontmatter(content) {
  if (!content.startsWith('---\n')) {
    return { fields: {}, hasFrontmatter: false };
  }

  const end = content.indexOf('\n---', 4);
  if (end === -1) {
    return { fields: {}, hasFrontmatter: false };
  }

  const fields = {};
  for (const rawLine of content.slice(4, end).split(/\r?\n/)) {
    const match = rawLine.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (match) {
      fields[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, '');
    }
  }

  return { fields, hasFrontmatter: true };
}

function lineCount(content) {
  return content.replace(/\n$/, '').split(/\r?\n/).length;
}

async function collectFiles(root, relativePath) {
  const target = path.join(root, relativePath);
  if (!(await exists(target))) {
    return [];
  }

  const info = await stat(target);
  if (info.isFile()) {
    return [relativePath];
  }

  const files = [];
  for (const entry of await readdir(target, { withFileTypes: true })) {
    const child = path.join(relativePath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(root, child)));
    } else if (entry.isFile() && /\.(json|md)$/.test(entry.name)) {
      files.push(child);
    }
  }
  return files;
}

async function validateJsonFiles(root, issues) {
  for (const relativePath of REQUIRED_JSON_FILES) {
    if (!(await exists(path.join(root, relativePath)))) {
      issues.push(issue('json.missing', relativePath, 'Required JSON file is missing.'));
      continue;
    }
    await readJson(root, relativePath, issues);
  }
}

async function validateSkill(root, skillName, issues, summary) {
  const skillRoot = path.join(root, 'skills', skillName);
  const relativeSkillPath = path.join('skills', skillName, 'SKILL.md');
  const skillPath = path.join(skillRoot, 'SKILL.md');

  if (!(await exists(skillPath))) {
    issues.push(issue('skill.file.missing', relativeSkillPath, 'SKILL.md is missing.'));
    return;
  }

  const content = await readFile(skillPath, 'utf8');
  const { fields, hasFrontmatter } = parseFrontmatter(content);
  const lines = lineCount(content);

  if (!hasFrontmatter) {
    issues.push(issue('skill.frontmatter.missing', relativeSkillPath, 'YAML frontmatter is missing.'));
  }
  if (!fields.name) {
    issues.push(issue('skill.frontmatter.name', relativeSkillPath, 'Frontmatter name is missing.'));
  } else if (fields.name !== skillName) {
    issues.push(
      issue('skill.frontmatter.name_mismatch', relativeSkillPath, `Expected name "${skillName}".`),
    );
  }
  if (!fields.description) {
    issues.push(
      issue('skill.frontmatter.description', relativeSkillPath, 'Frontmatter description is missing.'),
    );
  }
  if (lines > 500) {
    issues.push(issue('skill.size.too_large', relativeSkillPath, `SKILL.md has ${lines} lines.`));
  }

  const repoLinkPatterns = [
    { directory: 'references', pattern: /\.\.\/\.\.\/references\/([A-Za-z0-9._/-]+\.md)/g },
    { directory: 'examples', pattern: /\.\.\/\.\.\/examples\/([A-Za-z0-9._/-]+\.md)/g },
  ];

  for (const { directory, pattern } of repoLinkPatterns) {
    for (const match of content.matchAll(pattern)) {
      const referencePath = path.join(directory, match[1]);
      if (!(await exists(path.join(root, referencePath)))) {
        issues.push(
          issue('skill.reference.missing', relativeSkillPath, `Missing referenced file: ${referencePath}`),
        );
      }
    }
  }

  const evalPath = path.join('skills', skillName, 'evals', 'evals.json');
  if (!(await exists(path.join(root, evalPath)))) {
    issues.push(issue('skill.evals.missing', evalPath, 'Skill evals file is missing.'));
    return;
  }

  const evalFile = await readJson(root, evalPath, issues);
  if (!evalFile) {
    return;
  }

  summary.evalFiles += 1;
  if (!Array.isArray(evalFile.evals) || evalFile.evals.length === 0) {
    issues.push(issue('skill.evals.empty', evalPath, 'Skill evals must contain at least one case.'));
    return;
  }

  summary.evalCases += evalFile.evals.length;
  evalFile.evals.forEach((testCase, index) => {
    const base = `${evalPath}#${index + 1}`;
    if (!testCase.prompt) {
      issues.push(issue('skill.evals.prompt', base, 'Eval prompt is missing.'));
    }
    if (!testCase.expected_output) {
      issues.push(issue('skill.evals.expected_output', base, 'Eval expected_output is missing.'));
    }
    const expectations = testCase.expectations ?? testCase.rubric;
    if (!Array.isArray(expectations) || expectations.length === 0) {
      issues.push(
        issue('skill.evals.expectations', base, 'Eval expectations must be a non-empty array.'),
      );
    }
  });
}

async function validateSkills(root, issues, summary) {
  const skillsRoot = path.join(root, 'skills');
  if (!(await exists(skillsRoot))) {
    issues.push(issue('skills.missing', 'skills', 'Skills directory is missing.'));
    return;
  }

  const entries = await readdir(skillsRoot, { withFileTypes: true });
  const skillNames = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  summary.skills = skillNames.length;

  for (const skillName of skillNames) {
    await validateSkill(root, skillName, issues, summary);
  }
}

async function scanReleaseSafety(root, issues) {
  const relativeFiles = new Set();
  for (const relativePath of SCAN_PATHS) {
    for (const filePath of await collectFiles(root, relativePath)) {
      relativeFiles.add(filePath);
    }
  }

  for (const relativePath of [...relativeFiles].sort()) {
    const content = await readFile(path.join(root, relativePath), 'utf8');
    for (const { label, pattern } of SECRET_PATTERNS) {
      pattern.lastIndex = 0;
      if (pattern.test(content)) {
        issues.push(issue('release.secret_pattern', relativePath, `Found ${label}-shaped text.`));
      }
    }
  }
}

export async function validateRepository(root = process.cwd()) {
  const issues = [];
  const summary = {
    skills: 0,
    evalFiles: 0,
    evalCases: 0,
  };

  await validateJsonFiles(root, issues);
  await validateSkills(root, issues, summary);
  await scanReleaseSafety(root, issues);

  return { issues, summary };
}

async function main() {
  const result = await validateRepository(process.cwd());

  if (result.issues.length > 0) {
    for (const item of result.issues) {
      console.error(`${item.code} ${item.file}: ${item.message}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(
    `Moonloom validation passed: ${result.summary.skills} skills, ${result.summary.evalFiles} eval files, ${result.summary.evalCases} eval cases.`,
  );
}

const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === currentFile) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
