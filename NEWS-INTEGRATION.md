# News integration (Contentful)

Website side of Codex's handoff (`Granada Contentful Migration/Claude news integration
handoff.txt`, updated 1 October 2026). Codex owns extraction, import and publishing; this repo
owns how the content is displayed. Algolia stays disabled.

**Requirement:** news releases are full readable text with their tables and inline images.
**No PDFs, PDF links, attachments or download areas.**

## What the site expects

Content types `year`, `language`, `post` (display names Year, Language, Post), storage locale
`en-US`. English and French are separate `post` entries.

| Post field | Used for |
| --- | --- |
| `title`, `slug` | Page title and URL. Slugs must be unique **within a language** (French ones are prefixed `fr-`). |
| `year` → Year (`year` Integer) | URL segment and archive page. Required, or the post is skipped with a build warning. |
| `language` → Language (`language` = `en`/`fr`) | Which site language the post belongs to. Required. |
| `publishDate` | Sort order |
| `sourceDate` (`YYYY-MM-DD`) | **Displayed** publication date (no timezone shift). Falls back to `publishDate`. |
| `translationKey` | Pairs EN/FR releases for the language switcher and hreflang |
| `sourceUrl` | Redirect from the old granadagoldmine.com address |
| `heroImage` (optional) | Card and article image. Missing → neutral Granada banner. Images under 600 px wide (the logo) are shown whole on white instead of cropped, and aren't repeated above the article. |
| `content` (Rich text) | Article body |
| `attachments`, `migrationNotes` | **Not used.** Not queried, declared or displayed. |

The schema is declared explicitly in `gatsby-node.js` (`NEWS_TYPES`), so builds don't depend on
which optional fields happen to have data.

## Implemented

1. **Routing and language switching.** Each post is created only in its own language:
   `/news/<year>/<slug>/` (EN) or `/fr/news/<year>/<slug>/` (FR), queried by node id. There are
   no cross-language duplicates. The language switcher appears only for languages the release
   exists in (its `translationKey` counterpart). The same applies to hreflang. Each post page is
   limited to its own language, so the i18n plugin's browser-language redirect can't send
   visitors to a missing translation.
2. **Legacy addresses.** `src/data/legacy-news-urls.json` is Codex's *Legacy news URL map*
   (728 old paths → entry ID, including 110 old French routes that repeated an English release
   and now point to the English entry). It's merged with each post's `sourceUrl`, the old
   `/en/news/YYYY/` and `/news/archive/YYYY/` indexes, and the old company pages and PDF URLs
   (`src/data/legacy-redirects.json`). That's 1,145 redirects in total. They are registered as
   server redirects for whichever hosting adapter is chosen. They're also written to
   `/legacy-redirects.json`, which the 404 page uses to redirect on hosts without redirect support.
3. **Inline images.** `EMBEDDED_ASSET` renders image assets as figures (Contentful Images API,
   1400 px WebP). The references query includes `contentful_id`, `title`, `description` and
   `file { url fileName contentType details }`. Image-only `ASSET_HYPERLINK`s open the image;
   any non-image asset link or embed renders as plain text or nothing. URI hyperlinks to
   `*.pdf` render as plain text. Links to the old site are made site-relative so they resolve
   through the redirects.
4. **Tables.** `TABLE` → `<table><tbody>`; `TABLE_CELL`/`TABLE_HEADER_CELL` carry
   `data.rowspan`/`data.colspan`.
5. **Archive years.** Year archives (`src/templates/news-year.js`) are generated only for years
   with releases in each language: EN 2009–2026, FR 2014–2026, so there are no empty pages. Each
   archive has a year selector. Its language switch and hreflang appear only when the other
   language has that year. The News menu lists the same years; `/news/` and `/fr/news/` and the
   homepage "View All" go to the latest year. Old French archive URLs for English-only years
   (`/fr/news/2010/`, `/fr/news/archive/2012/`) redirect to the English archive.
6. **Language metadata.** Every page has the correct `<html lang>`, a localized title and
   description, a canonical URL, hreflang and `og:locale`. Dates are formatted from
   `sourceDate` ("September 28, 2026" / "28 septembre 2026"). Posts carry
   `article:published_time`.
7. **Algolia.** Off unless `ALGOLIA_INDEXING_ENABLED=true` and
   `GATSBY_ALGOLIA_SEARCH_ENABLED=true` are set explicitly, on top of the keys. Records include
   `language` and `path`, and search filters by language. This is prepared, not enabled.

## Connected test (Content Preview API, 1 October 2026)

Local `.env` (configured by Codex, git-ignored): space `ui2quga5z7ja`, environment `master`,
`CONTENTFUL_HOST=preview.contentful.com`. All entries remain drafts; nothing was published.
`pageLimit: 250` is set because the table-heavy releases exceed Contentful's response size at
the default page size.

Production build passed: 665 pages.

| Check | Result |
| --- | --- |
| Releases built | **618** (368 EN + 250 FR); each once, in its own language only |
| Tables / `<tbody>` / cells | **404 / 404 / 20,226**, matching Codex's import receipt |
| Inline figures | **81**, all served from `images.ctfassets.net` |
| PDF links, `application/pdf`, download boxes | **0** on every news page |
| Placeholder or Coniagas template content | None. Two 2025 releases legitimately mention Coniagas Battery Metals in a director bio. |
| Year pages | EN 2009–2026 (18), FR 2014–2026 (13), each with a year selector; no empty archives |
| Language pairs | 498 of 618 pages link a counterpart; the rest show only their own language |
| JW EN ↔ FR | Correct `lang`, title and date; the switcher goes to the counterpart and back |
| January 2021 resource release | 3 tables, 92 cells, both `rowspan=4` cells, 3 footnote superscripts, 2 figures |
| January 2016 QMX release | Full text (about 1,200 words); now has a French counterpart |
| Legacy redirects | All 728 legacy news paths resolve to an entry. Checked on the production build: `/en/news/archive/2012/` → `/news/2012/` and an old French alias route → its English release, both with no console errors |
| Algolia | Indexing plugin not loaded; search UI not rendered; no requests |

## Notes for Codex

- **Goguen 2016:** the held-out English release has no page. Its French version's switcher
  shows only FR until the English entry exists with the same `translationKey`.
- **Year entries:** archive pages and menus come from the releases themselves, so a Year entry
  without releases produces no page.
- **Link types:** entry hyperlinks and embedded entries are still not rendered. URI and
  image-asset hyperlinks are.
- **Production:** publish the reviewed entries and assets, then build with a separate
  **Delivery** token and the default host (`cdn.contentful.com`). The Preview token and
  `preview.contentful.com` are for local review only.
