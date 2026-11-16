# Portfolio

Personal portfolio of Shahzaib Bajwa, a BS Software Engineering student at UMT Lahore.

Live site: https://shahzaibbajwa-804.github.io/portfolio/

## About this site

A single-page, framework-free site written in plain HTML, CSS and JavaScript. It has no build step and no runtime dependencies, so it deploys as-is to GitHub Pages. It follows the visitor's light or dark colour preference, adapts to phone, tablet and desktop widths, and respects reduced-motion settings.

The contact form composes an email in the visitor's mail app. Nothing is stored or sent by the page itself.

## Structure

```
index.html        page content, metadata and structured data
css/styles.css    layout, typography, light and dark themes
js/main.js        mobile menu, scroll reveal, email form
assets/           portrait, favicon, social preview image
server.js, lib/   optional local server with a small contact endpoint
test/             tests for the contact validation and endpoint
```

## Run locally

Requires Node.js 18 or newer. There is nothing to install.

```bash
npm start      # serves the site at http://localhost:3000
npm test       # runs the test suite
```

Set `PORT` to use a different port. The local server also exposes `POST /api/contact`, which validates a message and appends it to `data/messages.jsonl` (git-ignored). The published site does not use it.

## Deployment

GitHub Pages serves the `main` branch from the repository root.

## Status

Complete and maintained. Project descriptions are updated as my own repositories become public.
