"use strict";
/* Regenerates assets/Shahzaib-CV.pdf from scripts/cv.html.
 * Requires Playwright (dev-only; not a runtime dependency): npm i -D playwright */
const path = require("path");
const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto("file://" + path.join(__dirname, "cv.html"));
  await p.pdf({ path: path.join(__dirname, "..", "assets", "Shahzaib-CV.pdf"), format: "A4", printBackground: true, preferCSSPageSize: true });
  await b.close();
  console.log("CV written to assets/Shahzaib-CV.pdf");
})();
