require('dotenv').config({ path: `.env` });

const hasContentful = Boolean(process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN);

// Until Granada's Contentful space is connected, declare empty stand-ins for the news
// types so page queries resolve and the site builds with no posts.
exports.createSchemaCustomization = ({ actions }) => {
  if (hasContentful) return;

  actions.createTypes(`
    type ContentfulYear implements Node {
      year: Int
      name: String
    }

    type ContentfulAssetFile {
      url: String
    }

    type ContentfulAsset implements Node {
      contentful_id: String
      file: ContentfulAssetFile
      gatsbyImageData: JSON
    }

    type ContentfulPostContent {
      raw: String
      references: [ContentfulAsset]
    }

    type ContentfulPostLanguage {
      language: String
    }

    type ContentfulPost implements Node {
      title: String
      slug: String
      publishDate: Date @dateformat
      year: ContentfulYear @link
      language: ContentfulPostLanguage
      heroImage: ContentfulAsset @link
      content: ContentfulPostContent
    }
  `);
};

// Temporary local news so the news templates, year pages and homepage feed can be exercised
// before Contentful is connected. Disappears automatically once Contentful keys are set.
const PLACEHOLDER_YEARS = [2023, 2024, 2025, 2026];

const PLACEHOLDER_POSTS = [1, 2].flatMap((n) => [
  {
    language: 'en',
    slug: `placeholder-news-release-${n}`,
    title: `Placeholder news release ${n}`,
    publishDate: `2026-0${n}-15T12:00:00Z`,
    body: 'This is temporary local content. Real news releases will come from Granada’s Contentful space.',
  },
  {
    language: 'fr',
    slug: `communique-temporaire-${n}`,
    title: `Communiqué temporaire ${n}`,
    publishDate: `2026-0${n}-15T12:00:00Z`,
    body: 'Ceci est un contenu local temporaire. Les vrais communiqués proviendront de l’espace Contentful de Granada.',
  },
]);

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  if (hasContentful) return;

  const { createNode } = actions;
  const yearIds = {};

  PLACEHOLDER_YEARS.forEach((year) => {
    const data = { year, name: String(year) };
    yearIds[year] = createNodeId(`placeholder-year-${year}`);
    createNode({
      ...data,
      id: yearIds[year],
      internal: { type: 'ContentfulYear', contentDigest: createContentDigest(data) },
    });
  });

  const heroImage = { contentful_id: 'placeholder-hero', file: { url: '/news-placeholder.svg' } };
  const heroImageId = createNodeId('placeholder-hero');
  createNode({
    ...heroImage,
    id: heroImageId,
    internal: { type: 'ContentfulAsset', contentDigest: createContentDigest(heroImage) },
  });

  PLACEHOLDER_POSTS.forEach(({ language, slug, title, publishDate, body }) => {
    const raw = JSON.stringify({
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [{ nodeType: 'text', value: body, marks: [], data: {} }],
        },
      ],
    });
    const data = {
      title,
      slug,
      publishDate,
      year: yearIds[2026],
      language: { language },
      heroImage: heroImageId,
      content: { raw, references: [] },
    };
    createNode({
      ...data,
      id: createNodeId(`placeholder-post-${language}-${slug}`),
      internal: { type: 'ContentfulPost', contentDigest: createContentDigest(data) },
    });
  });
};
