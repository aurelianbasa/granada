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
| **Contentful** | News posts only (`/news/<year>/<slug>/`, `/fr/news/<year>/<slug>/`, homepage "latest news") | `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN` (**Delivery API** token only) | Temporary placeholder posts, or a local Contentful export via `NEWS_FIXTURE` (see below) |
| **Algolia** | News search (header search icon). The build **writes** the `Posts` index | `GATSBY_ALGOLIA_APP_ID`, `GATSBY_ALGOLIA_SEARCH_KEY`, `ALGOLIA_ADMIN_KEY`, plus `ALGOLIA_INDEXING_ENABLED=true` and `GATSBY_ALGOLIA_SEARCH_ENABLED=true` | Off. Keys alone don't enable it; both switches must be `true` (and Contentful connected) |
| **Formspree** | Contact form and newsletter subscribe form | `GATSBY_FORMSPREE_CONTACT_ID`, `GATSBY_FORMSPREE_SUBSCRIBE_ID` (the ID after `formspree.io/f/`) | Forms show their normal error state on submit |
| **Hosting / deployment** | None configured in the repo (no Netlify/Vercel/GitHub Actions files were inherited) | Set the same env vars in the host's dashboard | — |
| **Domain** | `granadagoldmine.com` is set in `gatsby-config.js` (siteUrl, robots.txt, sitemap) | — | — |

Never reuse Coniagas's Algolia admin key. A build with it would overwrite Coniagas's live
search index.

Coniagas had no analytics or tracking scripts, so there was nothing to remove.

## News

News comes from Contentful only; see [NEWS-INTEGRATION.md](NEWS-INTEGRATION.md) for the content
model, routing, rendering and the connected-test checklist. Modes, in order of precedence:

1. **Connected**: `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` set. Published entries only.
2. **Local fixture**: `NEWS_FIXTURE=/path/to/pilot-import.json` (a Contentful import/export file
   with its `assets/` folder next to it). Assets are copied to the git-ignored
   `static/__news-fixture/`. Used to verify Codex's draft entries before they're published.
3. **Placeholders**: neither set. Two temporary posts per language for 2026.

## Content

Non-news content (company and property copy, logo, photographs, maps, presentation, financial
reports, technical report, AGM and community documents) has been migrated from the Granada
website archive. See [MIGRATION.md](MIGRATION.md) for what moved where and the content
decisions still open. News is integrated separately (see above).
