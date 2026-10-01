require('dotenv').config({ path: `.env` });

const fs = require('fs');
const path = require('path');

const legacyRedirects = require('./src/data/legacy-redirects.json');

const LANGUAGES = ['en', 'fr'];
const DEFAULT_LANGUAGE = 'en';

const hasContentful = Boolean(process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN);

// Local preview of a Contentful export (e.g. Codex's pilot-import.json) without the Delivery API.
// Ignored once Contentful credentials are set.
const newsFixture = !hasContentful && process.env.NEWS_FIXTURE ? path.resolve(process.env.NEWS_FIXTURE) : null;
const FIXTURE_STATIC_DIR = '__news-fixture';

// News schema, declared explicitly so the build doesn't depend on which optional fields
// (hero images, rich-text references, attachments) happen to be present in the data.
// Field storage mirrors gatsby-source-contentful 8: links live in `<field>___NODE`.
const NEWS_TYPES = `
  type ContentfulYear implements Node {
    contentful_id: String
    node_locale: String
    name: String
    year: Int
  }

  type ContentfulLanguage implements Node {
    contentful_id: String
    node_locale: String
    language: String
  }

  type ContentfulAssetFile {
    url: String
    fileName: String
    contentType: String
    details: JSON
  }

  type ContentfulAsset implements Node {
    contentful_id: String
    node_locale: String
    title: String
    description: String
    file: ContentfulAssetFile
  }

  type ContentfulPostContent {
    raw: String
    references: [ContentfulAsset] @link(by: "id", from: "references___NODE")
  }

  type ContentfulPost implements Node {
    contentful_id: String
    node_locale: String
    title: String
    slug: String
    publishDate: Date @dateformat
    sourceDate: String
    sourceUrl: String
    translationKey: String
    migrationNotes: String
    year: ContentfulYear @link(by: "id", from: "year___NODE")
    language: ContentfulLanguage @link(by: "id", from: "language___NODE")
    heroImage: ContentfulAsset @link(by: "id", from: "heroImage___NODE")
    attachments: [ContentfulAsset] @link(by: "id", from: "attachments___NODE")
    content: ContentfulPostContent
  }
`;

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(NEWS_TYPES);
};

exports.onPreBootstrap = ({ reporter }) => {
  if (!newsFixture) return;

  if (!fs.existsSync(newsFixture)) {
    reporter.panic(`NEWS_FIXTURE not found: ${newsFixture}`);
  }

  // The importer layout keeps each asset under assets/<host>/<path>; serve copies from static/.
  const { assets = [] } = JSON.parse(fs.readFileSync(newsFixture, 'utf8'));
  const assetsDir = path.join(path.dirname(newsFixture), 'assets');

  assets.forEach((asset) => {
    const { url } = asset.fields.file['en-US'];
    const relative = url.replace(/^https?:\/\//, '');
    const destination = path.join(__dirname, 'static', FIXTURE_STATIC_DIR, relative);

    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(path.join(assetsDir, relative), destination);
  });

  reporter.info(`News fixture: ${newsFixture} (${assets.length} assets)`);
};

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  if (hasContentful) return;

  const { createNode } = actions;
  const nodeId = (contentfulId, type) => createNodeId(`${contentfulId}___${type}`);

  const create = (type, contentfulId, fields) => {
    const data = { contentful_id: contentfulId, node_locale: 'en-US', ...fields };
    createNode({
      ...data,
      id: nodeId(contentfulId, type === 'ContentfulAsset' ? 'Asset' : 'Entry'),
      internal: { type, contentDigest: createContentDigest(data) },
    });
  };

  if (newsFixture) {
    sourceFixture(JSON.parse(fs.readFileSync(newsFixture, 'utf8')), create, nodeId);
  } else {
    sourcePlaceholders(create, nodeId);
  }
};

function sourceFixture({ entries = [], assets = [] }, create, nodeId) {
  const value = (fields, key) => fields[key] && fields[key]['en-US'];
  const link = (ref) => ref && nodeId(ref.sys.id, ref.sys.linkType);
  const typeNames = { year: 'ContentfulYear', language: 'ContentfulLanguage', post: 'ContentfulPost' };

  assets.forEach(({ sys, fields }) => {
    const file = value(fields, 'file');
    create('ContentfulAsset', sys.id, {
      title: value(fields, 'title'),
      description: value(fields, 'description'),
      file: { ...file, url: `/${FIXTURE_STATIC_DIR}/${file.url.replace(/^https?:\/\//, '')}` },
    });
  });

  entries.forEach(({ sys, fields }) => {
    const type = typeNames[sys.contentType.sys.id];
    if (!type) return;

    if (type !== 'ContentfulPost') {
      create(type, sys.id, Object.fromEntries(Object.keys(fields).map((key) => [key, value(fields, key)])));
      return;
    }

    const document = value(fields, 'content');
    const referenceIds = new Set();
    const collect = (node) => {
      if (node?.data?.target?.sys) referenceIds.add(link(node.data.target));
      (node?.content || []).forEach(collect);
    };
    collect(document);

    create(type, sys.id, {
      title: value(fields, 'title'),
      slug: value(fields, 'slug'),
      publishDate: value(fields, 'publishDate'),
      sourceDate: value(fields, 'sourceDate'),
      sourceUrl: value(fields, 'sourceUrl'),
      translationKey: value(fields, 'translationKey'),
      migrationNotes: value(fields, 'migrationNotes'),
      year___NODE: link(value(fields, 'year')),
      language___NODE: link(value(fields, 'language')),
      heroImage___NODE: link(value(fields, 'heroImage')),
      attachments___NODE: (value(fields, 'attachments') || []).map(link),
      content: { raw: JSON.stringify(document), references___NODE: [...referenceIds] },
    });
  });
}

// Temporary news so the templates can be exercised before Contentful is connected.
// Disappears automatically once Contentful keys (or a NEWS_FIXTURE) are set.
function sourcePlaceholders(create, nodeId) {
  [2023, 2024, 2025, 2026].forEach((year) => create('ContentfulYear', `placeholder-year-${year}`, { year, name: `${year}` }));
  LANGUAGES.forEach((language) => create('ContentfulLanguage', `placeholder-language-${language}`, { language }));

  const posts = [1, 2].flatMap((n) => [
    {
      language: 'en',
      slug: `placeholder-news-release-${n}`,
      title: `Placeholder news release ${n}`,
      body: 'This is temporary local content. Real news releases will come from Granada’s Contentful space.',
    },
    {
      language: 'fr',
      slug: `fr-communique-temporaire-${n}`,
      title: `Communiqué temporaire ${n}`,
      body: 'Ceci est un contenu local temporaire. Les vrais communiqués proviendront de l’espace Contentful de Granada.',
    },
  ]);

  posts.forEach(({ language, slug, title, body }, index) => {
    const n = Math.floor(index / 2) + 1;
    const raw = JSON.stringify({
      nodeType: 'document',
      data: {},
      content: [{ nodeType: 'paragraph', data: {}, content: [{ nodeType: 'text', value: body, marks: [], data: {} }] }],
    });

    create('ContentfulPost', `placeholder-post-${language}-${n}`, {
      title,
      slug,
      publishDate: `2026-0${n}-15T12:00:00Z`,
      sourceDate: `2026-0${n}-15`,
      translationKey: `placeholder-${n}`,
      year___NODE: nodeId('placeholder-year-2026', 'Entry'),
      language___NODE: nodeId(`placeholder-language-${language}`, 'Entry'),
      content: { raw, references___NODE: [] },
    });
  });
}

// `/news/<year>/<slug>/` without the language prefix, as expected by gatsby-plugin-react-i18next links.
const postOriginalPath = (post) => `/news/${post.year.year}/${post.slug}/`;
const withLanguage = (language, originalPath) =>
  language === DEFAULT_LANGUAGE ? originalPath : `/${language}${originalPath}`;

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  // Server redirects for the hosting adapter, plus client-side fallbacks for static hosting.
  const createRedirect = (redirect) => actions.createRedirect({ isPermanent: true, redirectInBrowser: true, ...redirect });

  const result = await graphql(`
    {
      allContentfulPost(sort: { publishDate: DESC }) {
        nodes {
          id
          title
          slug
          sourceUrl
          translationKey
          year {
            year
          }
          language {
            language
          }
        }
      }
      allContentfulYear(sort: { year: DESC }) {
        nodes {
          year
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic('Failed to query news posts', result.errors);
  }

  const posts = result.data.allContentfulPost.nodes.filter((post) => {
    const valid = post.slug && post.year?.year && LANGUAGES.includes(post.language?.language);
    if (!valid) reporter.warn(`Skipping news post without slug/year/language: ${post.id} ${post.title}`);
    return valid;
  });

  const byTranslationKey = {};
  posts.forEach((post) => {
    if (!post.translationKey) return;
    byTranslationKey[post.translationKey] = byTranslationKey[post.translationKey] || {};
    byTranslationKey[post.translationKey][post.language.language] = post;
  });

  LANGUAGES.forEach((language) => {
    const languagePosts = posts.filter((post) => post.language.language === language);

    languagePosts.forEach((post, index) => {
      const originalPath = postOriginalPath(post);
      const pagePath = withLanguage(language, originalPath);
      const counterparts = (post.translationKey && byTranslationKey[post.translationKey]) || {};

      // Corresponding release in each language, or that language's archive for the year.
      const alternates = Object.fromEntries(
        LANGUAGES.map((lng) => [lng, counterparts[lng] ? postOriginalPath(counterparts[lng]) : `/news/${post.year.year}/`])
      );
      alternates[language] = originalPath;

      const neighbour = (other) => other && { title: other.title, path: postOriginalPath(other) };
      const relatedIds = languagePosts
        .filter((other) => other.id !== post.id && other.year.year === post.year.year)
        .slice(0, 5)
        .map((other) => other.id);

      createPage({
        path: pagePath,
        component: path.resolve('./src/templates/news-post.js'),
        context: {
          id: post.id,
          language,
          relatedIds,
          previous: neighbour(languagePosts[index + 1]),
          next: neighbour(languagePosts[index - 1]),
          alternates,
          hasCounterpart: Object.keys(counterparts).length > 1,
          // Pre-set i18n context so gatsby-plugin-react-i18next neither duplicates this page into
          // other languages nor redirects visitors to a non-existent translated path.
          i18n: {
            language,
            languages: [language],
            defaultLanguage: DEFAULT_LANGUAGE,
            generateDefaultLanguagePage: false,
            routed: language !== DEFAULT_LANGUAGE,
            originalPath,
            path: pagePath,
          },
        },
      });

      if (post.sourceUrl) {
        const fromPath = new URL(post.sourceUrl).pathname;
        if (fromPath !== pagePath) {
          createRedirect({ fromPath, toPath: pagePath });
        }
      }
    });
  });

  // Old granadagoldmine.com news indexes, including /news/archive/YYYY/.
  const latestYear = result.data.allContentfulYear.nodes[0]?.year;
  result.data.allContentfulYear.nodes.forEach(({ year }) => {
    createRedirect({ fromPath: `/en/news/${year}/`, toPath: `/news/${year}/` });
    createRedirect({ fromPath: `/en/news/archive/${year}/`, toPath: `/news/${year}/` });
    createRedirect({ fromPath: `/fr/news/archive/${year}/`, toPath: `/fr/news/${year}/` });
  });
  if (latestYear) {
    createRedirect({ fromPath: '/en/news/', toPath: `/news/${latestYear}/` });
    createRedirect({ fromPath: '/fr/news/', toPath: `/fr/news/${latestYear}/` });
  }

  // Old granadagoldmine.com pages and documents (see src/data/legacy-redirects.json).
  legacyRedirects.forEach(({ from, to }) => createRedirect({ fromPath: from, toPath: to }));
};
