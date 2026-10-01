const { documentToPlainTextString } = require('@contentful/rich-text-plain-text-renderer');

// One record per post (EN and FR are separate entries); `language` is used to filter search
// results to the visitor's language and `path` is the post's language-prefixed URL.
const ALL_POSTS_QUERY = `
{
  allContentfulPost {
    nodes {
      id
      internal {
        contentDigest
      }
      title
      slug
      publishDate
      sourceDate
      year {
        year
      }
      language {
        language
      }
      content {
        raw
      }
    }
  }
}
`;

function parseRichText(raw) {
  if (!raw) return '';

  try {
    const parsed = JSON.parse(raw);
    return documentToPlainTextString(parsed).slice(0, 5000);
  } catch {
    return '';
  }
}

const settings = {
  attributesToSnippet: ['content:20'],
  attributesForFaceting: ['filterOnly(language)'],
};

const queries = [
  {
    indexName: `Posts`,
    query: ALL_POSTS_QUERY,
    settings,
    transformer: ({ data }) =>
      data.allContentfulPost.nodes
        .filter((node) => node.slug && node.year?.year && node.language?.language)
        .map((node) => {
          const language = node.language.language;
          const originalPath = `/news/${node.year.year}/${node.slug}/`;

          return {
            objectID: node.id,
            internal: {
              contentDigest: node.internal.contentDigest,
            },
            title: node.title,
            slug: node.slug,
            year: node.year.year,
            language,
            date: node.sourceDate || node.publishDate,
            path: originalPath,
            url: language === 'en' ? originalPath : `/${language}${originalPath}`,
            content: parseRichText(node.content?.raw),
          };
        }),
  },
];

module.exports = queries;
