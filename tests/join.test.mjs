import assert from 'node:assert/strict';
import test from 'node:test';
import { onRequestPost } from '../functions/api/join.ts';

function request(body) {
  return new Request('https://example.com/api/join', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
}

test('persists a waitlist submission through the Pages KV binding', async () => {
  const writes = [];
  const response = await onRequestPost({
    request: request({ email: 'sample@example.com', age: '30', sex: 'other', comment: 'Hello' }),
    env: { WAITLIST: { put: async (...args) => { writes.push(args); } } },
  });
  assert.equal(response.status, 200);
  assert.equal(writes.length, 1);
  assert.equal(writes[0][0], 'sample@example.com');
  const entry = JSON.parse(writes[0][1]);
  assert.deepEqual({ ...entry, timestamp: undefined }, {
    email: 'sample@example.com', age: '30', sex: 'other', comment: 'Hello', timestamp: undefined,
  });
  assert.ok(Number.isFinite(Date.parse(entry.timestamp)));
});

test('rejects a submission without an email before writing KV', async () => {
  let written = false;
  const response = await onRequestPost({
    request: request({}), env: { WAITLIST: { put: async () => { written = true; } } },
  });
  assert.equal(response.status, 400);
  assert.equal(written, false);
});
