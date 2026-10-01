import * as React from 'react';
import { graphql } from 'gatsby';
import { motion } from 'framer-motion';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { RiFileChartLine, RiMailLine, RiMapPinLine } from 'react-icons/ri';

import Layout from '@components/layout';
import Seo, { getLocaleStrings } from '@components/seo';
import Button from '@components/button';
import CardNews from '@components/card-news';

import HeroImage from '@media/home/hero.jpg';
import ProjectImage from '@media/property/project-site.jpg';
import LocationImage from '@media/media/maps/mine-location.jpg';

const PRESENTATION_PDF = '/documents/presentations/granada-corporate-presentation-2026-09.pdf';

export default function Home({ data }) {
  const { t } = useTranslation();

  const posts = data.allPosts.nodes;
  const latestYear = data.latestYear.nodes[0]?.year;

  return (
    <Layout>
      <div
        style={{ '--bg-image-url': `url(${HeroImage})` }}
        className='flex bg-[image:var(--bg-image-url)] bg-cover bg-center'
      >
        <div className='flex w-full bg-black/40'>
          <div className='container mx-auto grid items-start gap-5 px-5 pb-20 pt-36 md:gap-10 md:px-10 md:pt-48 lg:pb-32 lg:pt-56'>
            <motion.div
              transition={{ duration: 0.5, delay: 0.3 }}
              initial={{ x: '-80px', opacity: 0 }}
              animate={{ x: '0', opacity: 1 }}
              className='flex max-w-4xl flex-col items-start justify-center gap-4 text-left'
            >
              <Trans parent='h1' i18nKey='heroTitle' className='text-5xl text-white md:text-6xl'></Trans>

              <p className='text-2xl text-white/80'>{t('heroDescription')}</p>

              <Button className='mt-6' type='tertiary' href='/property'>
                {t('heroButton')}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className='container mx-auto items-center px-5 py-20 md:px-10'>
        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          initial={{ y: '80px', opacity: 0 }}
          whileInView={{ y: '0', opacity: 1 }}
          className='grid gap-16 rounded-2xl bg-white p-5 md:p-10 lg:grid-cols-2'
        >
          <img className='w-full rounded-lg object-cover' src={ProjectImage} alt='Granada Gold Project' />

          <div className='flex flex-col gap-4'>
            <p className='text-tertiary'>{t('welcomeSubTitle')}</p>
            <Trans parent='h2' i18nKey='welcomeTitle' className='text-4xl text-secondary'></Trans>
            <Trans parent='p' i18nKey='welcomeDescription' className='mt-2'></Trans>

            <Button className='mt-auto w-full self-end md:w-fit' type='primary-outlined' href='/about'>
              {t('welcomeButton')}
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        initial={{ y: '80px', opacity: 0 }}
        whileInView={{ y: '0', opacity: 1 }}
        className='container mx-auto grid gap-4 px-5 pb-20 md:px-10'
      >
        <p className='text-tertiary'>{t('locationSubTitle')}</p>
        <Trans parent='h2' i18nKey='locationTitle' className='text-4xl text-secondary'></Trans>

        <img className='my-6 w-full rounded-2xl bg-white' src={LocationImage} alt='Granada Mine Location' />

        <p>{t('locationDescription')}</p>

        <Button className='mt-4 w-full md:w-fit' type='primary-outlined' href='/property'>
          {t('locationButton')}
        </Button>
      </motion.div>

      <div className='bg-tertiary/10 py-20'>
        <div className='container mx-auto grid gap-6 px-5 md:grid-cols-2 md:px-10 xl:grid-cols-3'>
          <motion.div
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            initial={{ x: '80px', opacity: 0 }}
            whileInView={{ x: '0', opacity: 1 }}
            className='flex flex-col gap-10 rounded-lg bg-white p-5 md:p-10'
          >
            <div className='flex justify-between'>
              <div className='grid gap-2'>
                <p className='text-tertiary'>{t('card1SubTitle')}</p>
                <p className='text-2xl'>{t('card1Title')}</p>
              </div>

              <div className='flex size-20 shrink-0 items-center justify-center rounded-full bg-tertiary/10'>
                <RiFileChartLine className='size-10' />
              </div>
            </div>

            <Button className='mt-auto w-full' external type='primary' href={PRESENTATION_PDF}>
              {t('card1Button1')}
            </Button>
          </motion.div>

          <motion.div
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            initial={{ x: '80px', opacity: 0 }}
            whileInView={{ x: '0', opacity: 1 }}
            className='flex flex-col gap-10 rounded-lg bg-white p-5 md:p-10'
          >
            <div className='flex justify-between'>
              <div className='grid gap-2'>
                <p className='text-tertiary'>{t('card2SubTitle')}</p>
                <p className='text-2xl'>{t('card2Title')}</p>
              </div>

              <div className='flex size-20 shrink-0 items-center justify-center rounded-full bg-tertiary/10'>
                <RiMailLine className='size-10' />
              </div>
            </div>

            <a
              className='mt-auto block w-full rounded-lg border-2 border-primary px-6 py-4 text-center text-primary hover:shadow-button'
              href='#subscribe'
            >
              {t('card2Button')}
            </a>
          </motion.div>

          <motion.div
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            initial={{ x: '80px', opacity: 0 }}
            whileInView={{ x: '0', opacity: 1 }}
            className='flex flex-col gap-10 rounded-lg bg-white p-5 md:p-10'
          >
            <div className='flex justify-between'>
              <div className='grid gap-2'>
                <p className='text-tertiary'>{t('card3SubTitle')}</p>
                <p className='text-2xl'>{t('card3Title')}</p>
              </div>

              <div className='flex size-20 shrink-0 items-center justify-center rounded-full bg-tertiary/10'>
                <RiMapPinLine className='size-10' />
              </div>
            </div>

            <Button className='mt-auto w-full' type='primary-outlined' href='/contact'>
              {t('card3Button')}
            </Button>
          </motion.div>
        </div>
      </div>

      <div className='container mx-auto grid gap-10 px-5 py-20 md:px-10'>
        <Trans parent='h2' i18nKey='newsTitle' className='text-4xl text-secondary'></Trans>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {posts?.map((post, index) => (
            <motion.div
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              initial={{ x: '80px', opacity: 0 }}
              whileInView={{ x: '0', opacity: 1 }}
              key={index}
            >
              <CardNews post={post}></CardNews>
            </motion.div>
          ))}
        </div>

        <Button className='mx-auto w-full md:w-fit' type='secondary' href={`/news/${latestYear}/`}>
          {t('newsButton')}
        </Button>
      </div>
    </Layout>
  );
}

export function Head({ data, pageContext }) {
  const strings = getLocaleStrings(data, 'home');

  return <Seo pageContext={pageContext} title={strings.metaTitle} description={strings.metaDescription} />;
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { ns: { in: ["common", "home"] }, language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    latestYear: allContentfulYear(sort: { year: DESC }, limit: 1) {
      nodes {
        year
      }
    }
    allPosts: allContentfulPost(
      limit: 3
      sort: { publishDate: DESC }
      filter: { language: { language: { eq: $language } } }
    ) {
      nodes {
        ...NewsCard
      }
    }
  }
`;
