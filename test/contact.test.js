"use strict";
const test = require("node:test");
const assert = require("node:assert");
const http = require("node:http");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { validateContact, createLimiter } = require("../lib/contact");

const good = { name: "Ali Khan", email: "ali@example.com", message: "Hello, I'd like to talk." };

test("valid payload passes and is trimmed", () => {
  const r = validateContact({ name: "  Ali  ", email: " a@b.co ", message: "  long enough msg  " });
  assert.ok(r.ok); assert.deepStrictEqual(r.value, { name: "Ali", email: "a@b.co", message: "long enough msg" });
});
test("rejects bad email, short name, short/long message", () => {
  assert.ok(validateContact({ ...good, email: "nope" }).errors.email);
  assert.ok(validateContact({ ...good, name: "A" }).errors.name);
  assert.ok(validateContact({ ...good, message: "short" }).errors.message);
  assert.ok(validateContact({ ...good, message: "x".repeat(3001) }).errors.message);
});
test("non-object and non-string fields are rejected", () => {
  assert.ok(!validateContact(null).ok);
  assert.ok(!validateContact({ name: 1, email: [], message: {} }).ok);
});
test("honeypot is flagged as spam", () => assert.ok(validateContact({ ...good, website: "http://spam" }).spam));
test("limiter blocks after max and recovers", () => {
  let t = 0; const allow = createLimiter(2, 1000, () => t);
  assert.ok(allow("a")); assert.ok(allow("a")); assert.ok(!allow("a")); assert.ok(allow("b"));
  t = 1500; assert.ok(allow("a"));
});

function request(port, method, url, body) {
  return new Promise((resolve, reject) => {
    const req = http.request({ port, method, path: url, headers: body ? { "Content-Type": "application/json" } : {} }, (res) => {
      let d = ""; res.on("data", (c) => (d += c)); res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body: d }));
    });
    req.on("error", reject); if (body) req.write(typeof body === "string" ? body : JSON.stringify(body)); req.end();
  });
}
test("server: static files, traversal protection, API", async () => {
  const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "pf-")), "m.jsonl");
  process.env.MESSAGES_FILE = tmp;
  const server = require("../server");
  await new Promise((r) => server.listen(0, r));
  const port = server.address().port;
  try {
    assert.strictEqual((await request(port, "GET", "/")).status, 200);
    assert.strictEqual((await request(port, "GET", "/css/styles.css")).status, 200);
    assert.strictEqual((await request(port, "GET", "/server.js")).status, 404);
    assert.strictEqual((await request(port, "GET", "/data/messages.jsonl")).status, 404);
    assert.strictEqual((await request(port, "GET", "/..%2fserver.js")).status, 404);
    assert.strictEqual((await request(port, "GET", "/css/../../etc/passwd")).status, 404);
    assert.strictEqual((await request(port, "POST", "/api/contact", "{bad")).status, 400);
    assert.strictEqual((await request(port, "POST", "/api/contact", { ...good, email: "x" })).status, 422);
    const ok = await request(port, "POST", "/api/contact", good);
    assert.strictEqual(ok.status, 200);
    assert.match(fs.readFileSync(tmp, "utf8"), /ali@example.com/);
    assert.strictEqual((await request(port, "POST", "/api/contact", { ...good, website: "x" })).status, 200);
    assert.strictEqual(fs.readFileSync(tmp, "utf8").trim().split("\n").length, 1); // spam not stored
  } finally { server.close(); }
});
