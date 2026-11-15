"use strict";
/* Zero-dependency static server + contact API.  Run: node server.js */
const http = require("http");
const fs = require("fs");
const path = require("path");
const { validateContact, createLimiter } = require("./lib/contact");

const ROOT = __dirname;
const PUBLIC = ["index.html", "css", "js", "assets"];
const PORT = Number(process.env.PORT) || 3000;
const DATA_FILE = process.env.MESSAGES_FILE || path.join(ROOT, "data", "messages.jsonl");
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".pdf": "application/pdf", ".png": "image/png", ".ico": "image/x-icon", ".json": "application/json; charset=utf-8", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml; charset=utf-8" };
const SECURITY = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY",
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://api.github.com https://formspree.io; base-uri 'none'; form-action 'self'; frame-ancestors 'none'"
};
const allow = createLimiter(5, 10 * 60 * 1000);

function send(res, code, body, headers) {
  res.writeHead(code, Object.assign({}, SECURITY, headers));
  res.end(body);
}
function json(res, code, obj) { send(res, code, JSON.stringify(obj), { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }); }

function handleContact(req, res) {
  let size = 0; const chunks = [];
  req.on("data", (c) => { size += c.length; if (size > 20000) { req.destroy(); } else chunks.push(c); });
  req.on("end", () => {
    if (size > 20000) return;
    const ip = req.socket.remoteAddress || "unknown";
    if (!allow(ip)) return json(res, 429, { error: "Too many messages. Please try again later." });
    let body;
    try { body = JSON.parse(Buffer.concat(chunks).toString("utf8")); } catch { return json(res, 400, { error: "Invalid JSON." }); }
    const r = validateContact(body);
    if (r.spam) return json(res, 200, { ok: true });          // silently drop bots
    if (!r.ok) return json(res, 422, { error: Object.values(r.errors)[0], errors: r.errors });
    const rec = JSON.stringify(Object.assign({ at: new Date().toISOString() }, r.value)) + "\n";
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.appendFile(DATA_FILE, rec, (err) => err ? json(res, 500, { error: "Could not save message." }) : json(res, 200, { ok: true }));
  });
}

function serveStatic(req, res) {
  let p;
  try { p = decodeURIComponent(new URL(req.url, "http://x").pathname); } catch { return send(res, 400, "Bad request"); }
  if (p === "/") p = "/index.html";
  const rel = path.normalize(p).replace(/^[/\\]+/, "");
  const top = rel.split(path.sep)[0];
  const file = path.join(ROOT, rel);
  if (!PUBLIC.includes(top) || (file !== ROOT && !file.startsWith(ROOT + path.sep))) return send(res, 404, "Not found", { "Content-Type": "text/plain" });
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) return send(res, 404, "Not found", { "Content-Type": "text/plain" });
    const ext = path.extname(file).toLowerCase();
    const h = { "Content-Type": TYPES[ext] || "application/octet-stream", "Content-Length": st.size, "Cache-Control": "no-cache" };
    if (ext === ".pdf") h["Content-Disposition"] = 'inline; filename="' + path.basename(file) + '"';
    res.writeHead(200, Object.assign({}, SECURITY, h));
    if (req.method === "HEAD") return res.end();
    fs.createReadStream(file).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  const url = req.url.split("?")[0];
  if (url === "/api/contact") {
    if (req.method === "POST") return handleContact(req, res);
    return json(res, 405, { error: "Method not allowed." });
  }
  if (req.method !== "GET" && req.method !== "HEAD") return send(res, 405, "Method not allowed");
  serveStatic(req, res);
});
if (require.main === module) server.listen(PORT, () => console.log("Portfolio running at http://localhost:" + PORT));
module.exports = server;
