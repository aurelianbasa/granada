import * as React from 'react';
import { graphql } from 'gatsby';
import { motion } from 'framer-motion';
import { useTranslation } from 'gatsby-plugin-react-i18next';

import Layout from '@components/layout';
import Seo, { getLocaleStrings } from '@components/seo';
import Button from '@components/button';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <Layout>
      <motion.div
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        initial={{ y: '80px', opacity: 0 }}
        whileInView={{ y: '0', opacity: 1 }}
        className='container mx-auto flex min-h-screen flex-col items-center justify-center gap-8 px-5 text-center md:px-10'
      >
        <p className='text-5xl text-secondary'>{t('title')}</p>
        <p>{t('description')}</p>

        <Button type='primary' href='/'>
          {t('button')}
        </Button>
      </motion.div>
    </Layout>
  );
}

export function Head({ data, pageContext }) {
  const strings = getLocaleStrings(data, '404');

  return <Seo pageContext={pageContext} title={strings.metaTitle} description={strings.metaDescription} />;
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { ns: { in: ["common", "404"] }, language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
