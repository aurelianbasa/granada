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
| **Contentful** | News posts only (`/news/<year>/<slug>/`, `/fr/news/<year>/<slug>/`, homepage "latest news") | `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN` (Delivery token for live content; Preview token for draft review) | Temporary placeholder posts, or a local Contentful export via `NEWS_FIXTURE` (see below) |
| **Algolia** | News search (header search icon). The build **writes** the `Posts` index | `GATSBY_ALGOLIA_APP_ID`, `GATSBY_ALGOLIA_SEARCH_KEY`, `ALGOLIA_ADMIN_KEY`, plus `ALGOLIA_INDEXING_ENABLED=true` and `GATSBY_ALGOLIA_SEARCH_ENABLED=true` | Off. Keys alone don't enable it; both switches must be `true` (and Contentful connected) |
| **Formspree** | Contact form and newsletter subscribe form | `GATSBY_FORMSPREE_CONTACT_ID`, `GATSBY_FORMSPREE_SUBSCRIBE_ID` (the ID after `formspree.io/f/`) | Forms show their normal error state on submit |
| **Hosting / deployment** | Cloudflare Pages static build; see below | Set the same env vars in the host's dashboard | — |
| **Domain** | Canonical URLs, language links, robots.txt and sitemap | `SITE_URL`, falling back to `CF_PAGES_URL`, then `https://granadagoldmine.com` | — |

Never reuse Coniagas's Algolia admin key. A build with it would overwrite Coniagas's live
search index.

Coniagas had no analytics or tracking scripts, so there was nothing to remove.

## News

News comes from Contentful only; see [NEWS-INTEGRATION.md](NEWS-INTEGRATION.md) for the content
model, routing, rendering and the connected-test checklist. Modes, in order of precedence:

1. **Connected**: `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` set. With the default host and a
   Delivery token, published entries only. With `CONTENTFUL_HOST=preview.contentful.com` and a Preview
   token, drafts too (review deployments). The local `.env` is currently in this Preview mode.
2. **Local fixture**: `NEWS_FIXTURE=/path/to/pilot-import.json` (a Contentful import/export file
   with its `assets/` folder next to it). Assets are copied to the git-ignored
   `static/__news-fixture/`. Used to verify Codex's draft entries before they're published.
3. **Placeholders**: neither set. Two temporary posts per language for 2026.

## Cloudflare Pages review deployment

Connect the Granada GitHub repository using the Gatsby preset, build command `npm run build`,
output directory `public`, and repository root as the root directory. `.node-version` selects
Node 22, which is supported by the locked Gatsby and Contentful packages. No server or Pages
Functions are required.

Set these build variables in Cloudflare (both production and preview environments while the
whole project is a review site):

- `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ENVIRONMENT=master`, and the read-only **Preview** token as
  `CONTENTFUL_ACCESS_TOKEN`. Save the token as a secret; never prefix it with `GATSBY_` or commit it.
- `CONTENTFUL_HOST=preview.contentful.com` and `SITE_REVIEW_MODE=true`.
- `ALGOLIA_INDEXING_ENABLED=false` and `GATSBY_ALGOLIA_SEARCH_ENABLED=false`.
- Optionally `SITE_URL=https://<project>.pages.dev` for a stable review URL. Otherwise each
  deployment uses Cloudflare's `CF_PAGES_URL` automatically.

The static build includes draft news; it does not publish Contentful entries. Review mode adds
an `X-Robots-Tag` header, robots meta tags and `robots.txt` disallowing crawlers. These are search
indexing instructions, **not access control**; configure Cloudflare Access separately if the
review must be restricted. Keep Granada's current domain and DNS unchanged during review.

The build generates `public/_redirects` from the same map as `legacy-redirects.json`, so old
addresses redirect before a 404 page loads. It checks Cloudflare's 2,000 static-rule limit and
1,000-character line limit. The client-side 404 fallback remains available. Test an old English
release URL, a French alias URL and a missing French archive year on the deployed site.

Git pushes trigger new builds. Contentful edits require another build; configure a Contentful
webhook/Cloudflare deploy hook later if automatic content updates are wanted. To launch the
approved live site, publish the approved entries/assets, switch to a Delivery token with
`CONTENTFUL_HOST=cdn.contentful.com`, set `SITE_REVIEW_MODE=false` and
`SITE_URL=https://granadagoldmine.com`, then rebuild and verify before changing the domain.

## Content

Non-news content (company and property copy, logo, photographs, maps, presentation, financial
reports, technical report, AGM and community documents) has been migrated from the Granada
website archive. See [MIGRATION.md](MIGRATION.md) for what moved where and the content
decisions still open. News is integrated separately (see above).
