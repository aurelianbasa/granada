# News integration (Contentful)

Status of the website side of Codex's handoff
(`Granada Contentful Migration/Claude news integration handoff.txt`, 1 October 2026).
Codex owns extraction, import and publishing. This repo owns how the content is displayed.
Algolia stays disabled.

## What the site expects

Content types `year`, `language`, `post` (display names Year, Language, Post), storage locale
`en-US`. English and French are separate `post` entries.

| Post field | Used for |
| --- | --- |
| `title`, `slug` | Page title and URL. Slugs must be unique **within a language**. |
| `year` → Year (`year` Integer) | URL segment and archive page. Required, or the post is skipped with a build warning. |
| `language` → Language (`language` = `en`/`fr`) | Which site language the post belongs to. Required. |
| `publishDate` | Sort order |
| `sourceDate` (`YYYY-MM-DD`) | **Displayed** publication date (no timezone shift). Falls back to `publishDate`. |
| `translationKey` | Pairs EN/FR releases for the language switcher and hreflang |
| `sourceUrl` | Redirect from the old granadagoldmine.com address |
| `heroImage` (optional) | Card and article image. Missing → neutral Granada banner. Images under 600 px wide (e.g. the logo) are shown whole on white instead of cropped, and aren't repeated above the article. |
| `content` (Rich text) | Article body (see rendering below) |
| `attachments` (optional) | "Original release files" download box beside the article |
| `migrationNotes` | Not displayed |

The schema is declared explicitly in `gatsby-node.js` (`NEWS_TYPES`), so builds don't depend on
which optional fields happen to have data.

## Implemented (handoff items 1–7)

1. **Routing and language switching.** `gatsby-node.js` creates each post only in its own
   language: `/news/<year>/<slug>/` (EN) or `/fr/news/<year>/<slug>/` (FR), queried by node id.
   There is no slug-only lookup and no cross-language duplicates. The header language switcher
   goes to the `translationKey` counterpart; when there is none, it goes to that language's
   archive for the same year. Each post page is limited to its own language, so the i18n
   plugin's browser-language redirect can't send visitors to a missing translation.
   `sourceUrl` paths and old `/en/news/YYYY/`, `/en/news/archive/YYYY/`,
   `/fr/news/archive/YYYY/` and `/en/news/` index URLs get permanent redirects.
2. **PDF links.** `ASSET_HYPERLINK` resolves the linked asset and renders a link to its
   `file.url`, keeping the original link text. The references query includes `contentful_id`,
   `title`, `description`, `file { url fileName contentType details }`. A PDF used as an
   embedded asset block renders as a download link, not an image.
3. **Tables.** `TABLE` → `<table><tbody>`. `TABLE_CELL`/`TABLE_HEADER_CELL` carry
   `data.rowspan`/`data.colspan`. Embedded image assets render as figures.
4. **Images.** Null-safe everywhere, with a Granada banner fallback for cards and social sharing.
5. **Archive years.** The header News menu and the homepage "View All" link come from Year entries.
6. **Language metadata.** Every page has the correct `<html lang>`, a localized title and
   description, a canonical URL, hreflang alternates (posts list only the languages they exist
   in) and `og:locale`. Dates are formatted from `sourceDate` ("September 28, 2026" /
   "28 septembre 2026"). Posts also carry `article:published_time`.
7. **Algolia.** Off unless `ALGOLIA_INDEXING_ENABLED=true` (indexing) and
   `GATSBY_ALGOLIA_SEARCH_ENABLED=true` (search UI) are set explicitly, on top of the keys.
   Records now include `language`, `path`/`url` and `date`. Search filters by the visitor's
   language and links to `path`.

Links in release bodies that point to the old site (`https://granadagoldmine.com/...`) are made
site-relative, so they resolve through the redirects (`src/data/legacy-redirects.json` covers the
old company pages and the 126 migrated PDF URLs).

## Verified locally with the pilot (`NEWS_FIXTURE`)

`NEWS_FIXTURE` loads `pilot-import.json` into nodes shaped exactly like
gatsby-source-contentful 8 output (`*___NODE` links, `content.raw` + `references___NODE`). The
pilot's assets are served from the git-ignored `static/__news-fixture/`. The production build
passes, and in the browser:

- **JW EN ↔ FR:** `lang`, title and date are correct in each language. The switcher goes to
  `/fr/news/2026/fr-granada-gold-mine-appoints-j.w-dumont-as-president/` and back. Each page
  links its own original PDF (EN / FR) and the shared 2026 technical report.
- **January 2021 resource release:** all 3 tables, 92 cells, both `rowspan=4` cells ("In Pit",
  "Underground"), the superscript footnote markers, both figures and the PDF link work.
- **January 2016 QMX release:** English only. Its hreflang lists EN only, and the switcher goes
  to `/fr/news/2016/` (the empty-state page).
- **Archive pages:** 2016, 2021 and 2026 are reachable in both languages. Old-URL redirects
  (e.g. `/en/news/2021/<slug>/`, `/en/the-property/maps/`) land on the new pages.
- **No placeholders or Coniagas content** appear when the fixture is used, and the Algolia
  plugin is not loaded.

## Needed from Codex for the connected test

1. **Read-only token.** Either:
   - publish the reviewed pilot (4 posts, 3 Year, 2 Language entries, all 8 assets) and supply
     a **Content Delivery API** token; or
   - for review before publishing, supply a **Content Preview API** token. Set
     `CONTENTFUL_HOST=preview.contentful.com`; drafts are then visible (local only).

   Space `ui2quga5z7ja`, environment `master`. Never the management token.
2. **Year entries only for years that have posts.** The News menu lists every Year entry.
3. **`sourceDate` and `translationKey` on every post**, identical on EN/FR pairs; keep the `fr-`
   slug prefix or any scheme that's unique per language.
4. **Hero images:** leave `heroImage` empty when there's no real photo. The site's fallback
   handles it; the logo also works and is shown whole.
5. **Link types:** use asset hyperlinks and URI hyperlinks. **Entry hyperlinks and embedded
   entries are not rendered yet** (none in the pilot). Tell me before using them.
6. Confirm images are processed so `file.details.image.width` is present. It decides
   cropped vs contained card images.

Once a token is available, I'll run the connected build and repeat the checks above against
Contentful, including that no Algolia requests occur.
