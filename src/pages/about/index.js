import * as React from 'react';
import { graphql } from 'gatsby';
import { motion } from 'framer-motion';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';

import Layout from '@components/layout';

import BannerImage from '@media/common/banner.jpg';
import ProjectImage from '@media/property/project-site.jpg';
import MineSiteImage from '@media/property/mine-site.jpg';
import FrankBasaImage from '@media/about/frank-basa.jpg';
import JWDumontImage from '@media/about/jw-dumont.jpg';
import MatthewHallidayImage from '@media/about/matthew-halliday.jpg';
import DanielBarretteImage from '@media/about/daniel-barrette.jpg';
import MayaBasaImage from '@media/about/maya-basa.jpg';
import HeidiGutteImage from '@media/about/heidi-gutte.jpg';
import TinaWhyteImage from '@media/about/tina-whyte.jpg';

// Order and roles as listed on granadagoldmine.com/en/about-us/directors-officers/
const MEMBERS = [
  { key: 'frank', image: FrankBasaImage },
  { key: 'jw', image: JWDumontImage },
  { key: 'matthew', image: MatthewHallidayImage },
  { key: 'daniel', image: DanielBarretteImage },
  { key: 'maya', image: MayaBasaImage },
  { key: 'heidi', image: HeidiGutteImage },
  { key: 'tina', image: TinaWhyteImage },
];

export default function About() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div
        id='overview'
        style={{ '--bg-image-url': `url(${BannerImage})` }}
        className={`flex items-center bg-[image:var(--bg-image-url)] bg-cover bg-center pb-10 pt-32 md:pb-20 md:pt-44`}
      >
        <div className='container mx-auto items-center px-5 md:px-10'>
          <motion.div
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            initial={{ y: '80px', opacity: 0 }}
            whileInView={{ y: '0', opacity: 1 }}
            className='grid gap-16 rounded-2xl bg-white p-5 md:p-10 lg:grid-cols-2'
          >
            <div className='flex flex-col gap-4'>
              <p className='text-tertiary'>{t('overviewSubtitle')}</p>
              <Trans parent='h1' i18nKey='overviewTitle' className='text-4xl text-secondary'></Trans>
              <Trans i18nKey='overview'></Trans>
            </div>

            <div className='grid gap-6'>
              <img className='w-full rounded-lg object-cover' src={ProjectImage} alt='Granada Gold Project' />
              <img className='w-full rounded-lg object-cover' src={MineSiteImage} alt='Granada Mine Site' />
            </div>
          </motion.div>
        </div>
      </div>

      <div id='directors' className='bg-tertiary/10 py-20'>
        <div className='container mx-auto grid gap-10 px-5 md:px-10'>
          <Trans parent='h2' i18nKey='membersTitle' className='text-4xl text-secondary'></Trans>

          <div className='grid gap-20'>
            {MEMBERS.map(({ key, image }) => (
              <motion.div
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                initial={{ x: '80px', opacity: 0 }}
                whileInView={{ x: '0', opacity: 1 }}
                className='grid gap-10 md:grid-cols-3-9 lg:gap-16'
                key={key}
              >
                <div className='max-w-[200px]'>
                  <img className='w-full rounded-lg' src={image} alt={t(`${key}Name`)}></img>
                </div>

                <div className='flex flex-col gap-3 self-center'>
                  <h3 className='text-3xl'>{t(`${key}Name`)}</h3>
                  <p className='mb-3 text-primary'>{t(`${key}Role`)}</p>
                  <Trans parent='p' i18nKey={`${key}Bio`}></Trans>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export function Head() {
  return (
    <>
      <html lang='en' />
      <title>About | Granada Gold Mine</title>
      <meta
        name='description'
        content='Granada Gold Mine Inc. is a Canadian junior mining and exploration company focused on the past-producing Granada Gold Property in the Abitibi Greenstone Belt. Meet our directors and officers.'
      />
    </>
  );
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { ns: { in: ["common", "about"] }, language: { eq: $language } }) {
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
