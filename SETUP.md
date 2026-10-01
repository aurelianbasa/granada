# Granada Gold Mine — setup status

This repository was forked from the Coniagas site (Gatsby 5 + React, English/French via
`gatsby-plugin-react-i18next`). It is a separate repository with its own Git remote. All
Coniagas service credentials have been removed.

## Running locally

```bash
npm install
npm run develop   # http://localhost:8000
npm run build
```

The site builds and runs with an empty `.env`. Each integration switches on only when its
keys are filled in. Copy `.env.EXAMPLE` to `.env` to start.

## Services that still need Granada accounts

| Service | Used for | Env vars | Behaviour while unset |
| --- | --- | --- | --- |
| **Contentful** | News posts only (`/news/<year>/<slug>`, homepage "latest news") | `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN` | `gatsby-node.js` defines empty placeholder news types; no news pages are generated |
| **Algolia** | News search (header search icon). The build **writes** the `Posts` index | `GATSBY_ALGOLIA_APP_ID`, `GATSBY_ALGOLIA_SEARCH_KEY`, `ALGOLIA_ADMIN_KEY` | Indexing plugin disabled (it also requires Contentful); search icon hidden |
| **Formspree** | Contact form and newsletter subscribe form | `GATSBY_FORMSPREE_CONTACT_ID`, `GATSBY_FORMSPREE_SUBSCRIBE_ID` (the ID after `formspree.io/f/`) | Forms show their normal error state on submit |
| **Hosting / deployment** | None configured in the repo (no Netlify/Vercel/GitHub Actions files were inherited) | Set the same env vars in the host's dashboard | — |
| **Domain** | `granadagoldmine.com` is set in `gatsby-config.js` (siteUrl, robots.txt, sitemap) | — | — |

Never reuse Coniagas's Algolia admin key. A build with it would overwrite Coniagas's live
search index.

Coniagas had no analytics or tracking scripts, so there was nothing to remove.

## News structure (for the content migration)

News comes from Contentful only. Until Granada's space is connected, `gatsby-node.js`
generates **temporary local placeholder posts**: two per language, dated 2026, plus year
pages for 2023–2026 so the header's year links work. They disappear automatically once
`CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` are set.

Granada's Contentful space needs these content types (field IDs must match):

**`year`**
| Field | Type | Notes |
| --- | --- | --- |
| `year` | Integer | e.g. `2026`; drives `/news/<year>/` |
| `name` | Short text | e.g. `"2026"`; used by the search index |

**`post`**
| Field | Type | Notes |
| --- | --- | --- |
| `title` | Short text | |
| `slug` | Short text | unique; URL is `/news/<year>/<slug>/` |
| `publishDate` | Date & time | newest first everywhere |
| `year` | Reference → `year` | |
| `language` | Reference → an entry with a `language` text field | value `en` or `fr`; filters posts per site language |
| `heroImage` | Media (image) | card thumbnail and social share image |
| `content` | Rich text | embedded images supported |

The year links in the header (`src/components/header.js`) and the homepage "View All" button
(`/news/2026`) are hard-coded and should be updated as years are added.

## Content still to migrate

Page copy lives in `locales/en/*.json` and `locales/fr/*.json`. Images live in
`src/media/` and data files in `static/`. Coniagas-specific pages (for example
`/projects/graal/` and `/critical-materials/`) should be renamed or removed as part of
the content migration.

Page titles, meta-description prefixes, logo alt text, the manifest and the news share URL
already say Granada Gold Mine. Coniagas references that are company content and still need
replacing:

- `src/components/footer.js`: social links (Twitter, LinkedIn, Facebook, YouTube) point to Coniagas accounts
- `src/pages/investors/index.js`: TradingView widget is for `TSXV:COS`; `#coniagasFMV` anchor (also linked from the header)
- `src/pages/about/index.js` and `src/pages/critical-materials/index.js`: Coniagas-specific copy and meta descriptions
- Logos, favicon and imagery in `src/media/`
