# Granada content migration (non-news)

Source: `Granada Website Archive` (Codex download of granadagoldmine.com, collected 2026-10-01).
The archive was only read; nothing in it was modified. Every copied file is listed with its
archive path in [`docs/migration/asset-map.tsv`](docs/migration/asset-map.tsv).

News releases, news imports, Contentful, Algolia and the temporary news placeholders were not
touched.

## Page mapping

| New page | Granada source pages | Notes |
| --- | --- | --- |
| `/` Home | `/` (hero tagline, welcome text), Property overview | Coniagas metals ticker, Datawrapper charts and video popup removed. News feed unchanged |
| `/about` | About Us › Overview, Directors & Officers | 7 people, in the published order |
| `/property` (new) | The Property › Overview, Granada Gold Project, Geological Setting, Infrastructure, Granada Mine History, Community, Community Engagement | One page with anchors; header dropdown links to each section |
| `/media` | The Property › Maps, Images | Tabs: Maps (18) and Images (8); lightbox via the existing `CardPhoto` |
| `/investors` | Investors › Stock Price, Share Structure, Financial Reports and Filings, Presentations, AGM Documents, Analyst Coverage; The Property › NI 43-101 Technical Reports | TradingView widget now `TSXV:GGM` |
| `/contact` | Contact Us | Mining office, head office, key contact; Formspree form kept (needs Granada form ID) |
| Footer dialogs | Disclaimer, Privacy Policy | Replace Coniagas Disclaimer/Disclosure/Land Acknowledgment/Governance |

Removed Coniagas-only pages: `/projects`, `/projects/graal`, `/critical-materials`, `/data`, plus
their components (`data-center-map`), data (`static/data`) and media.

## Assets migrated

| What | Where | Count |
| --- | --- | --- |
| Financial statements and MD&As, FY2013 Q1 – FY2026 Q2 | `static/documents/financials/{fy}-{q1,q2,q3,annual}-{fs,mda}.pdf` | 108 |
| AGM documents 2012–2015 (from the financial reports list) | `static/documents/agm/{year}-agm.pdf` | 4 |
| 2026 AGM: notice, information circular, form of proxy | `static/documents/agm/2026-*.pdf` | 3 |
| Corporate presentation, September 2026 | `static/documents/presentations/` | 1 |
| NI 43-101 technical report (Resource Amended/Update June 2026) | `static/documents/technical-reports/` | 1 |
| Community documents (EN and FR versions) | `static/documents/community/` | 8 |
| GR-20-20 & GR-20-22 interval table (May 2021) | `static/documents/property/` | 1 |
| Logo, favicon, banner, home hero | `src/media/common/`, `src/media/home/` | 4 |
| Director and officer headshots | `src/media/about/` | 7 |
| Property photos | `src/media/property/` | 11 |
| Maps (web-sized to max 2400 px, JPEG) | `src/media/media/maps/` | 18 |
| Field photos (web-sized to max 1800 px, JPEG) | `src/media/media/images/` | 8 |

The financial reports table is generated from `src/data/financial-reports.js`. Fiscal years end
June 30, matching the source site's labels (for example "2026 Second Quarter Report" = period
ended Dec 31, 2025).

## Content decisions still needed

### French copy that differs from the English

These French texts were carried over word for word, but they make different or outdated claims
compared with the current English pages:

1. **Home hero.** The EN version reads "Expanding the already substantial 43-101 gold resources of a
   past-producing mine". The FR version reads "Producteur d'or en devenir en route vers 100 000 oz/an
   avec plusieurs cibles d'exploration à haute teneur", a production claim that the English
   doesn't make (`locales/fr/home.json` → `heroTitle`).
2. **Property overview.** The FR adds "vers le démarrage de la production à haute teneur"
   (`locales/fr/property.json` → `overview`, also `locales/fr/home.json` → `locationDescription`).
3. **NI 43-101 intro.** The FR says all permits have been obtained for a rolling start and
   gives **90,000 m** drilled. The EN gives **150,000 m** (`locales/fr/investors.json` →
   `technicalReportDescription`).
4. **Company overview.** The FR mentions gold and silver properties in Quebec **and Ontario**;
   the EN does not (`locales/fr/home.json`, `locales/fr/about.json`).

### Missing French translations (English shown on French pages, as on the current site)

- Bios for Matthew Halliday, Daniel Barrette, Maya Basa and Heidi Gutte
- Privacy policy and the subscribe-consent sentence
- Map and image captions; the technical report title; "View PDF: Interval Table…"
- All financial, AGM, presentation and technical-report PDFs are English-only (a note says so)

Short interface labels that were in English on the French site were translated: role titles
(Président, Administrateur/Administratrice, Chef de la direction financière), AGM document
titles, table headers (T1/T2/T3, ÉF, RG), tab and button labels. Please review them.

### Documents in the archive but not linked on the current site (not migrated)

- Presentations: May 2025 corporate presentation, August 12, 2020 presentation, and an unnamed
  `presentation.pdf`. Only the September 2026 presentation is linked today.
- The June 23, 2023 NI 43-101 technical report, superseded by the 2026 report.
- About 115 other PDFs in `03-Reports-and-Financials/Other-Documents`. These are mostly news
  attachments and fall under the news migration.

Decide whether to add a "Previous presentations / reports" archive.

### Coniagas items removed that Granada may need

- **Technical disclosure / Qualified Person statement.** Coniagas had one in the footer; Granada's
  site has none. Recommended alongside NI 43-101 content.
- Corporate governance, land acknowledgment, auditors and transfer agent: Granada's site doesn't
  publish these.
- The Calendly "Book an appointment" link and the Mailchimp subscribe link both belonged to
  Coniagas. The home "Subscribe" card now scrolls to the footer form, which needs Granada's
  Formspree ID (or a Granada mailing-list provider).
- YouTube link, Videos and Articles tabs: Granada had none.

### Other

- **Image quality.** Headshots exist only at 200×200. The mine history, aerial and 2016 sample
  photos are only 275 px wide. Higher-resolution originals would help.
- **Share structure** is "as of June 9, 2026", as published. Confirm it is current.
- **Analyst coverage** has a disclaimer only; there are no reports.
- **Old URLs** (`/en/the-property/...`, `/fr/investors/...`, PDF paths under `/site/assets/files/`)
  will need redirects when the site is published.
- **Repository size.** About 110 MB of PDFs are now in `static/documents/`. Consider moving them
  to a CDN or Contentful assets before publishing.
- **Analytics.** The current Granada site uses Google Analytics (`G-8WN4SX9EYK`) and Piwik. None
  is configured here.
- Typos fixed in two captions: "rreuslts" → "results", "Example or recovered" → "Example of
  recovered".
- The "Designed By Resource Active" footer credit was kept.
