import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  validateCompleteFixture,
} from '../scripts/validate-complete-fixture.mjs';

const fixturePath = 'examples/complete-synthetic-card-fixture.md';

async function readFixture() {
  return readFile(fixturePath, 'utf8');
}

function issueCodes(result) {
  return result.issues.map((item) => item.code);
}

test('complete fixture validator accepts the committed synthetic card fixture', async () => {
  const fixture = await readFixture();
  const result = validateCompleteFixture(fixture, { filePath: fixturePath });

  assert.deepEqual(result.issues, []);
  assert.equal(result.summary.requiredSections, 11);
  assert.equal(result.summary.xmlTags, 6);
  assert.equal(result.summary.playtestProbes, 7);
  assert.equal(result.summary.stateKeys, 4);
});

test('complete fixture validator rejects missing playtest coverage', async () => {
  const fixture = (await readFixture()).replace(
    /7\. boundary test:[^\n]+\n/,
    '',
  );
  const result = validateCompleteFixture(fixture, { filePath: fixturePath });

  assert.ok(issueCodes(result).includes('fixture.probe.missing'));
});

test('complete fixture validator rejects broken XMLV3 state JSON', async () => {
  const fixture = (await readFixture()).replace(
    /<state>\{[^<]+<\/state>/,
    '<state>{"rain":"steady"</state>',
  );
  const result = validateCompleteFixture(fixture, { filePath: fixturePath });

  assert.ok(issueCodes(result).includes('fixture.xmlv3.state_invalid'));
});

test('complete fixture validator rejects placeholders and protected public claims', async () => {
  const protectedClaim = [['production', 'data'].join(' '), ' evidence'].join('');
  const fixture = `${await readFixture()}\nTODO: [fill later]\n${protectedClaim}\n`;
  const result = validateCompleteFixture(fixture, { filePath: fixturePath });
  const codes = issueCodes(result);

  assert.ok(codes.includes('fixture.placeholder.present'));
  assert.ok(codes.includes('fixture.public_claim.forbidden'));
});
