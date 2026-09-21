# Centor Website

Static marketing site for CENTOR — https://centorglobal.com

No build step, no framework, no bundler. The files you edit are the files that ship.

## Running locally

```bash
node scripts/serve.mjs      # http://localhost:3000
```

Plain Node, no dependencies needed. (`npm install` only pulls Puppeteer, which is
used by the optional screenshot script — not needed to run or deploy the site.)

You can also open the HTML files directly, but absolute paths like `/assets/...`
won't resolve, so use the dev server.

## Structure

```
index.html, about.html, services.html,     English pages (site root)
contact.html, references.html
products/index.html                        English products landing page
products/*.html                            English product detail pages
references/*.html                          English project case studies
products.html                              redirect stub -> /products/

zh/  de/  es/  ar/                         Translated mirrors of the above
                                           (same file names, same structure)

components/*.js                            Shared UI, injected at runtime
assets/css/centor.css                      All styling (one file)
assets/js/centor.js                        Small shared page behaviours
assets/js/cobe.esm.js                      Vendored globe library (contact page)
assets/images/, assets/brand/              Photography and logo assets
docs/                                      Brand guidelines, bilingual QA review
scripts/                                   Dev server, screenshot tool, QA doc generator
```

### Shared components

`components/navbar.js`, `footer.js` and `lang-bubble.js` render the header, footer
and language switcher into every page at runtime. Each page includes them with a
`<script>` tag near the bottom of `<body>`.

**This means: edit the header or footer once, in the component file — not in 60 HTML
files.** `components/contact-globe.js` powers the animated globe on the contact pages.

### Translations

Each language is a full copy of the page tree under its own directory (`zh/`, `de/`,
`es/`, `ar/`). There is no i18n framework or string catalogue — translations live
directly in the HTML.

When you add or change a page, mirror it into all five locales and update:
- the `hreflang` / `canonical` `<link>` tags in each copy's `<head>`
- `sitemap.xml`

`ar/` is right-to-left; check `dir="rtl"` handling when editing it.

## Third-party dependencies (loaded from CDN at runtime)

| What | Where | Used for |
|---|---|---|
| Google Fonts | `fonts.googleapis.com` | Jost, Outfit, Barlow, Montserrat, Rajdhani, Inter |
| Swiper 8 | `cdn.jsdelivr.net` | Homepage hero carousel |
| Formspree | `unpkg.com/@formspree/ajax` | Contact form submission |

No API keys are stored in this repo.

## Contact form

The contact form posts to Formspree form ID `mvzjaprj`
(`action="https://formspree.io/f/mvzjaprj"` in each locale's `contact.html`).
Submissions land in the Formspree account that owns that form — see Handover below.

## Deployment

Deployed on Vercel as project `centor-website`. Vercel serves the repo as static
files; pushes to `main` deploy automatically. There is no build command.

`.vercel/project.json` holds the project and org IDs and is gitignored — the new
owner gets their own after linking with `vercel link`.

## Optional scripts

```bash
npm install                                   # Puppeteer, for screenshots only
node scripts/screenshot.mjs <url> [label]     # capture a localhost page
python scripts/generate_qa_doc.py             # regenerate docs/CENTOR_Bilingual_QA_Review.docx
                                              # (needs: pip install python-docx)
```

## Handover checklist

Code is in this repo; these live outside it and must be transferred separately:

- [ ] **GitHub** — repo `FloatingSink/Centor-website` (transfer ownership, or add collaborators)
- [ ] **Vercel** — project `centor-website` (transfer to the new team)
- [ ] **Formspree** — form `mvzjaprj`, or repoint the form to a new account's ID in all five `contact.html` files
- [ ] **Domain / DNS** — `centorglobal.com` registrar access, and the DNS records pointing at Vercel
- [ ] **Source assets** — original photography and logo files, if higher-resolution originals exist outside this repo

### Note on repo size

Git history is ~200 MB because full-resolution project photography was committed
over time. Clones are slow but work fine. If that's a problem, `git clone --depth 1`
gets the current state without the history.
