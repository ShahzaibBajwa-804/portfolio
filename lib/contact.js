"use strict";
/** Pure validation/sanitisation for the contact form (unit-tested). */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateContact(body) {
  const errors = {};
  if (!body || typeof body !== "object") return { ok: false, errors: { body: "Invalid request." } };
  // Honeypot: bots fill the hidden field. Report as success-shaped "spam".
  if (typeof body.website === "string" && body.website.trim() !== "") return { ok: false, spam: true, errors: {} };
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (name.length < 2 || name.length > 100) errors.name = "Name must be 2–100 characters.";
  if (!EMAIL_RE.test(email) || email.length > 200) errors.email = "A valid email is required.";
  if (message.length < 10 || message.length > 3000) errors.message = "Message must be 10–3000 characters.";
  if (/[\r\n]/.test(name) || /[\r\n]/.test(email)) errors.header = "Invalid characters.";
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value: { name, email, message } };
}

/** Simple in-memory sliding-window limiter. */
function createLimiter(max, windowMs, now = Date.now) {
  const hits = new Map();
  return function allow(key) {
    const t = now();
    const arr = (hits.get(key) || []).filter((x) => t - x < windowMs);
    if (arr.length >= max) { hits.set(key, arr); return false; }
    arr.push(t); hits.set(key, arr); return true;
  };
}
module.exports = { validateContact, createLimiter };
