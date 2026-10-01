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

When Granada's Contentful space is ready, its content model must match what the queries
expect: `post` (title, slug, publishDate, year → `year`, language → `language`, heroImage,
content as rich text) and `year` (year: Int, name).

## Content still to migrate

Page copy lives in `locales/en/*.json` and `locales/fr/*.json`. Images live in
`src/media/` and data files in `static/`. Coniagas-specific pages (for example
`/projects/graal/` and `/critical-materials/`) should be renamed or removed as part of
the content migration.
