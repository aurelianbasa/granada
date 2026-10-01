import * as React from 'react';
import { graphql } from 'gatsby';
import { motion } from 'framer-motion';
import { Link, useTranslation } from 'gatsby-plugin-react-i18next';

import Layout from '@components/layout';
import CardNews from '@components/card-news';
import Seo, { getLocaleStrings } from '@components/seo';

// Archive of one year's releases in one language. Created in gatsby-node.js only for years that
// have releases in that language; `years` lists them all for the year selector.
export default function NewsYear({ data, pageContext }) {
  const { t } = useTranslation();

  const { year, years } = pageContext;
  const posts = data.allContentfulPost.nodes;

  return (
    <Layout>
      <div className='container mx-auto px-5 pb-10 pt-36 md:px-10 md:pb-20 md:pt-44'>
        <h1 className='mb-4 text-center text-4xl text-secondary'>{t('title')}</h1>

        <p className='mb-8 text-center text-tertiary'>
          {t('subtitle')} <span className='text-primary'>{year}</span>
        </p>

        <nav aria-label={t('yearsLabel')} className='mb-10 md:mb-16'>
          <ul className='flex flex-wrap justify-center gap-2'>
            {years.map((item) => (
              <li key={item}>
                <Link
                  to={`/news/${item}/`}
                  aria-current={item === year ? 'page' : undefined}
                  className={`block rounded-lg px-4 py-2 ${
                    item === year ? 'bg-secondary text-white' : 'bg-white hover:text-primary'
                  }`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {posts.map((post) => (
            <motion.div
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              initial={{ y: '80px', opacity: 0 }}
              whileInView={{ y: '0', opacity: 1 }}
              key={post.id}
            >
              <CardNews post={post}></CardNews>
            </motion.div>
          ))}
        </div>

        {!posts.length && <div className='py-20 text-center uppercase'>{t('noContent')}</div>}
      </div>
    </Layout>
  );
}

export function Head({ data, pageContext }) {
  const strings = getLocaleStrings(data, 'news-year');

  return (
    <Seo
      pageContext={pageContext}
      title={`${strings.metaTitle || 'News'} ${pageContext.year}`}
      description={`${strings.metaDescription || ''} ${pageContext.year}.`}
      alternates={pageContext.alternates}
    />
  );
}

export const query = graphql`
  query ($language: String!, $year: Int!) {
    locales: allLocale(filter: { ns: { in: ["common", "news-year"] }, language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    allContentfulPost(
      sort: { publishDate: DESC }
      filter: { year: { year: { eq: $year } }, language: { language: { eq: $language } } }
    ) {
      nodes {
        ...NewsCard
      }
    }
  }
`;
