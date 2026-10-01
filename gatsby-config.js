require('dotenv').config({ path: `.env` });

// Each integration only switches on once Granada's own keys are in .env (see SETUP.md).
const hasContentful = Boolean(process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN);
const hasAlgolia = Boolean(hasContentful && process.env.GATSBY_ALGOLIA_APP_ID && process.env.ALGOLIA_ADMIN_KEY);

module.exports = {
  siteMetadata: {
    title: 'Granada Gold Mine',
    siteUrl: 'https://granadagoldmine.com',
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    'gatsby-plugin-postcss',
    ...(hasAlgolia
      ? [
          {
            resolve: 'gatsby-plugin-algolia',
            options: {
              appId: process.env.GATSBY_ALGOLIA_APP_ID,
              apiKey: process.env.ALGOLIA_ADMIN_KEY,
              chunkSize: 10000,
              queries: require('./src/services/algolia.js'),
            },
          },
        ]
      : []),
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://granadagoldmine.com',
        sitemap: 'https://granadagoldmine.com/sitemap-0.xml',
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Granada Gold Mine',
        short_name: 'Granada',
        icon: 'src/media/common/favicon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        serialize: (page) => {
          const date = new Date();

          return {
            url: page.path,
            lastmod: date.toISOString().slice(0, 10),
          };
        },
      },
    },
    {
      resolve: 'gatsby-omni-font-loader',
      options: {
        enableListener: true,
        preconnect: ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
        web: [
          {
            name: 'Poppins',
            file: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@utils': 'src/utils',
          '@media': 'src/media',
          '@components': 'src/components',
        },
        extensions: ['js'],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/locales`,
        name: 'locale',
      },
    },
    {
      resolve: 'gatsby-plugin-react-i18next',
      options: {
        localeJsonSourceName: 'locale',
        languages: ['en', 'fr'],
        defaultLanguage: 'en',
        siteUrl: 'http://localhost:8000',
        i18nextOptions: {
          react: {
            transKeepBasicHtmlNodesFor: ['br', 'b', 'span', 'mark', 'i'],
            defaultTransParent: 'p',
          },
        },
      },
    },
    ...(hasContentful
      ? [
          {
            resolve: `gatsby-source-contentful`,
            options: {
              spaceId: process.env.CONTENTFUL_SPACE_ID,
              accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
            },
          },
        ]
      : []),
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 590,
              linkImagesToOriginal: false,
              withWebp: true,
              loading: 'lazy',
            },
          },
        ],
      },
    },
  ],
};
