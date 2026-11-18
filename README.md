# Portfolio

Personal portfolio of Shahzaib Bajwa, a BS Software Engineering student at UMT Lahore.

Live site: https://shahzaibbajwa-804.github.io/portfolio/

## About this site

A single-page site written in plain HTML, CSS and JavaScript with no framework, build step or runtime dependencies, so it deploys as-is to GitHub Pages. It has a dark theme with subtle motion that respects reduced-motion settings, and it adapts to phone, tablet and desktop widths.

The contact form opens the visitor's email app with the message filled in. Nothing is stored or sent by the page itself.

## Structure

```
index.html        page content, metadata and structured data
css/styles.css    layout, typography and theme
js/config.js      links, contact email and project URLs
js/projects.js    project and skill content
js/main.js        navigation, project dialogs, GitHub feed, contact form
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

Set `PORT` to use a different port. To use the local contact endpoint, set `contactEndpoint` to `"/api/contact"` in `js/config.js`. It validates a message and appends it to `data/messages.jsonl` (git-ignored). The published site does not use it.

## Configuration

Everything personal lives in `js/config.js`. Any value left as `""` is hidden automatically. Project `live` and `repo` links are empty until those repositories are public.

## Deployment

GitHub Pages serves the `main` branch from the repository root.

## Status

Complete and maintained. Project descriptions are updated as my repositories become public.
