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
