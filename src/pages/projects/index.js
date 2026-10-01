import * as React from 'react';
import { graphql } from 'gatsby';
import { motion } from 'framer-motion';
import { useTranslation } from 'gatsby-plugin-react-i18next';

import Layout from '@components/layout';
import CardProject from '@components/card-project';

import GraalImage from '@media/projects/graal.webp';

export default function Projects() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className='container mx-auto grid gap-10 px-5 pb-10 pt-36 md:gap-16 md:px-10 md:pb-20 md:pt-44'>
        <div className='flex flex-col gap-4 text-center'>
          <p className='text-tertiary'>{t('projectsSubtitle')}</p>
          <h1 className='text-4xl text-secondary'>{t('projectsTitle')}</h1>
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <motion.div
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            initial={{ y: '80px', opacity: 0 }}
            whileInView={{ y: '0', opacity: 1 }}
          >
            <CardProject
              image={GraalImage}
              href='/projects/graal'
              title={t('graalTitle')}
              description={t('graalDescription')}
              button={t('graalButton')}
            ></CardProject>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

export function Head() {
  return (
    <>
      <html lang='en' />
      <title>Projects | Granada Gold Mine</title>
      <meta
        name='description'
        content='Granada Gold Mine. Building the Next World Class Critical Metals Project along the North American Battery Corridor.'
      />
    </>
  );
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { ns: { in: ["common", "projects"] }, language: { eq: $language } }) {
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
