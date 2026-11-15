# Shahzaib — Portfolio

Personal portfolio of Shahzaib Bajwa, a BS Software Engineering student at UMT Lahore. The projects shown on the site are my own AI-assisted development (Claude Code): I direct the work, review the code and test it.

Premium dark-theme developer portfolio. Plain HTML/CSS/JS (no frameworks, no runtime dependencies) plus a tiny Node server for the contact form.

## Run locally
```bash
npm start            # http://localhost:3000  (PORT=4000 npm start to change)
npm test             # unit + server tests (Node >= 18)
```

## Configure (one file: `js/config.js`)
Set `email`, `github`, `linkedin` and per-project `live`/`repo` URLs. Anything left as `""` is hidden automatically. Do not commit private phone numbers.

## Contact form
- **Bundled server:** `POST /api/contact` validates input (honeypot, length/format checks, 5 msgs / 10 min per IP) and appends to `data/messages.jsonl` (git-ignored). Read it with `cat data/messages.jsonl`.
- **Static hosting (Netlify, GitHub Pages, Vercel):** set `contactEndpoint` in `js/config.js` to a Formspree-style URL. If sending fails, the form offers a `mailto:` fallback when `email` is set.

## CV
The CV PDF is not included in this repository. `scripts/cv.html` is the source; generate a PDF from it (`npm i -D playwright && npm run build:cv`) and add it as `assets/Shahzaib-CV.pdf` only after checking it for private data.

## Structure
```
index.html        semantic page + SEO/OpenGraph/JSON-LD
css/styles.css    design tokens, layout, responsive, reduced-motion
js/config.js      your links (edit this)
js/projects.js    project + skill content
js/main.js        nav, reveals, modal, skills, GitHub, form
server.js, lib/   static server + contact API (tested in test/)
```
