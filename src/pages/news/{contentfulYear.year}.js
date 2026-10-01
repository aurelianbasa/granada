import * as React from 'react';
import { graphql } from 'gatsby';
import { motion } from 'framer-motion';
import { useTranslation } from 'gatsby-plugin-react-i18next';

import Layout from '@components/layout';
import CardNews from '@components/card-news';

export default function News({ data }) {
  const { t } = useTranslation();

  const year = data.contentfulYear;
  const posts = data.allContentfulPost.edges;

  return (
    <Layout>
      <div className='container mx-auto px-5 pb-10 pt-36 md:px-10 md:pb-20 md:pt-44'>
        <h1 className='mb-4 text-center text-4xl text-secondary'>{t('title')}</h1>

        <p className='mb-10 text-center text-tertiary md:mb-16'>
          {t('subtitle')} <span className='text-primary'>{year.year}</span>
        </p>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {posts &&
            posts.map((post, index) => (
              <motion.div
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                initial={{ y: '80px', opacity: 0 }}
                whileInView={{ y: '0', opacity: 1 }}
                key={index}
              >
                <CardNews
                  title={post.node.title}
                  content={post.node.content}
                  publishDate={post.node.publishDate}
                  image={post.node.heroImage.file.url}
                  href={`/news/${post.node.year.year}/${post.node.slug}`}
                ></CardNews>
              </motion.div>
            ))}
        </div>

        {!posts.length && <div className='py-20 text-center uppercase'>{t('noContent')}</div>}
      </div>
    </Layout>
  );
}

export function Head() {
  return (
    <>
      <html lang='en' />
      <title>News | Granada Gold Mine</title>
      <meta name='description' content='Granada Gold Mine. Press Releases.' />
    </>
  );
}

export const query = graphql`
  query ($language: String!, $year: Int) {
    locales: allLocale(filter: { ns: { in: ["common", "news-year"] }, language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    contentfulYear(year: { eq: $year }) {
      year
    }
    allContentfulPost(
      sort: { publishDate: DESC }
      filter: { year: { year: { eq: $year } }, language: { language: { eq: $language } } }
    ) {
      edges {
        node {
          id
          title
          slug
          publishDate
          year {
            year
          }
          heroImage {
            file {
              url
            }
          }
          content {
            raw
          }
        }
      }
    }
  }
`;
