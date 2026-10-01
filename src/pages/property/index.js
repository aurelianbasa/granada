import * as React from 'react';
import { graphql } from 'gatsby';
import { motion } from 'framer-motion';
import { RiFilePdf2Line } from 'react-icons/ri';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';

import Layout from '@components/layout';
import CardPhoto from '@components/card-photo';

import BannerImage from '@media/common/banner.jpg';
import ProjectImage from '@media/property/project-site.jpg';
import GoldPour1Image from '@media/property/gold-pour-1.jpg';
import GoldPour2Image from '@media/property/gold-pour-2.jpg';
import GoldPour3Image from '@media/property/gold-pour-3.jpg';
import GoldPour4Image from '@media/property/gold-pour-4.jpg';
import SampleImage from '@media/property/near-surface-sample-2016.jpg';
import VisibleGoldImage from '@media/property/visible-gold-samples.png';
import MineSiteImage from '@media/property/mine-site.jpg';
import AerialImage from '@media/property/rouyn-noranda-aerial.jpg';
import HistoryImage from '@media/property/history-rouyn-1927.jpg';
import EcoleImage from '@media/property/ecole-granada.jpg';
import PropertyMapImage from '@media/media/maps/property.jpg';

const INTERVAL_TABLE_PDF = '/documents/property/gr-20-20-gr-20-22-interval-table-2021-05.pdf';

// Community documents are published separately in English and French.
const COMMUNITY_DOCS = {
  committee: { en: 'follow-up-committee-2017-02-en.pdf', fr: 'follow-up-committee-2017-02-fr.pdf' },
  minutes: { en: 'public-information-session-2014-02-26-en.pdf', fr: 'public-information-session-2014-02-26-fr.pdf' },
  publicMeeting: { en: 'public-meeting-2014-05-21-en.pdf', fr: 'public-meeting-2014-05-21-fr.pdf' },
  project: { en: 'granada-project-2014-02-en.pdf', fr: 'granada-project-2014-02-fr.pdf' },
};

const reveal = (x) => ({
  viewport: { once: true },
  transition: { duration: 0.5, delay: 0.2 },
  initial: { x, opacity: 0 },
  whileInView: { x: '0', opacity: 1 },
});

function DocLink({ href, children }) {
  return (
    <a className='flex items-center gap-3 hover:text-primary' href={href} target='_blank' rel='noreferrer'>
      <RiFilePdf2Line className='size-6 shrink-0 text-primary' />
      {children}
    </a>
  );
}

export default function Property() {
  const { t, i18n } = useTranslation();

  const communityDoc = (key) => `/documents/community/${COMMUNITY_DOCS[key][i18n.language] || COMMUNITY_DOCS[key].en}`;

  return (
    <Layout>
      <div
        id='overview'
        style={{ '--bg-image-url': `url(${BannerImage})` }}
        className='bg-[image:var(--bg-image-url)] bg-cover bg-center pb-10 pt-32 md:pb-20 md:pt-44'
      >
        <div className='container mx-auto px-5 md:px-10'>
          <motion.div {...reveal('-80px')} className='grid gap-10 rounded-2xl bg-white p-5 md:p-10 lg:grid-cols-2'>
            <div className='flex flex-col gap-4'>
              <p className='text-tertiary'>{t('overviewSubtitle')}</p>
              <Trans parent='h1' i18nKey='overviewTitle' className='text-4xl text-secondary'></Trans>
              <p>{t('overview')}</p>
            </div>
            <CardPhoto image={PropertyMapImage} alt='Granada Property'></CardPhoto>
          </motion.div>
        </div>
      </div>

      <div id='project' className='container mx-auto grid gap-10 px-5 py-20 md:px-10'>
        <motion.div {...reveal('-80px')} className='grid gap-10 lg:grid-cols-2 lg:gap-16'>
          <div className='flex flex-col gap-4'>
            <Trans parent='h2' i18nKey='projectTitle' className='text-4xl text-secondary'></Trans>
            <Trans parent='p' i18nKey='project'></Trans>
          </div>
          <div>
            <CardPhoto image={ProjectImage} alt='Granada Gold Project' caption={t('projectCaption')}></CardPhoto>
          </div>
        </motion.div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {[GoldPour1Image, GoldPour2Image, GoldPour3Image, GoldPour4Image].map((image, index) => (
            <motion.div {...reveal('80px')} key={index}>
              <CardPhoto image={image} alt={t('goldPour')} caption={t('goldPour')}></CardPhoto>
            </motion.div>
          ))}
        </div>

        <p>{t('project2')}</p>
      </div>

      <div id='geology' className='bg-tertiary/10 py-20'>
        <div className='container mx-auto grid gap-10 px-5 md:px-10 lg:grid-cols-8-4 lg:gap-16'>
          <motion.div {...reveal('-80px')} className='flex flex-col gap-4'>
            <Trans parent='h2' i18nKey='geologyTitle' className='text-4xl text-secondary'></Trans>
            <Trans parent='p' i18nKey='geology'></Trans>
            <div className='mt-4'>
              <DocLink href={INTERVAL_TABLE_PDF}>{t('geologyButton')}</DocLink>
            </div>
          </motion.div>

          <motion.div {...reveal('80px')} className='grid content-start gap-6'>
            <CardPhoto image={SampleImage} alt={t('geologyCaption')} caption={t('geologyCaption')}></CardPhoto>
            <CardPhoto image={VisibleGoldImage} alt={t('geologyCaption2')} caption={t('geologyCaption2')}></CardPhoto>
          </motion.div>
        </div>
      </div>

      <div id='infrastructure' className='container mx-auto grid gap-10 px-5 py-20 md:px-10'>
        <motion.div {...reveal('-80px')} className='grid gap-10 lg:grid-cols-2 lg:gap-16'>
          <div className='flex flex-col gap-4'>
            <Trans parent='h2' i18nKey='infrastructureTitle' className='text-4xl text-secondary'></Trans>
            <Trans parent='p' i18nKey='infrastructure'></Trans>
          </div>
          <div className='grid content-start gap-6 md:grid-cols-2'>
            <div>
              <CardPhoto image={MineSiteImage} alt={t('infrastructureCaption')} caption={t('infrastructureCaption')}></CardPhoto>
            </div>
            <div>
              <CardPhoto image={AerialImage} alt={t('infrastructureCaption2')} caption={t('infrastructureCaption2')}></CardPhoto>
            </div>
          </div>
        </motion.div>

        <Trans parent='p' i18nKey='infrastructure2'></Trans>
      </div>

      <div id='history' className='bg-secondary py-20 text-white'>
        <div className='container mx-auto grid gap-10 px-5 md:px-10 lg:grid-cols-8-4 lg:gap-16'>
          <motion.div {...reveal('-80px')} className='flex flex-col gap-4'>
            <Trans parent='h2' i18nKey='historyTitle' className='text-4xl'></Trans>
            <Trans parent='p' i18nKey='history'></Trans>
          </motion.div>

          <motion.div {...reveal('80px')} className='[&_p]:text-white'>
            <CardPhoto image={HistoryImage} alt='Rouyn, 1927' caption={t('historyCaption')}></CardPhoto>
          </motion.div>
        </div>
      </div>

      <div id='community' className='container mx-auto grid gap-10 px-5 py-20 md:px-10 lg:grid-cols-2 lg:gap-16'>
        <motion.div {...reveal('-80px')} className='flex flex-col gap-6'>
          <Trans parent='h2' i18nKey='communityTitle' className='text-4xl text-secondary'></Trans>

          <div className='grid gap-3'>
            <h3 className='text-2xl text-secondary'>{t('communityUpdates')}</h3>
            <p>{t('community')}</p>
            <DocLink href={communityDoc('committee')}>{t('communityCommitteeLink')}</DocLink>
          </div>

          <div className='grid gap-3'>
            <h3 className='text-2xl text-secondary'>{t('communityMinutes')}</h3>
            <DocLink href={communityDoc('minutes')}>{t('communityMinutes1')}</DocLink>
          </div>

          <div className='grid gap-3'>
            <h3 className='text-2xl text-secondary'>{t('communityPresentations')}</h3>
            <DocLink href={communityDoc('publicMeeting')}>{t('communityPresentation1')}</DocLink>
            <DocLink href={communityDoc('project')}>{t('communityPresentation2')}</DocLink>
          </div>
        </motion.div>

        <motion.div {...reveal('80px')} className='flex flex-col gap-4'>
          <h3 className='text-2xl text-secondary'>{t('engagementTitle')}</h3>
          <CardPhoto image={EcoleImage} alt={t('engagementTitle')} caption={t('engagementCaption')}></CardPhoto>
        </motion.div>
      </div>
    </Layout>
  );
}

export function Head() {
  return (
    <>
      <html lang='en' />
      <title>The Property | Granada Gold Mine</title>
      <meta
        name='description'
        content='The past-producing Granada Gold Property, 5 km south of Rouyn-Noranda, Quebec, on the prolific Cadillac Trend: project, geology, infrastructure, mine history and community.'
      />
    </>
  );
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { ns: { in: ["common", "property"] }, language: { eq: $language } }) {
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
