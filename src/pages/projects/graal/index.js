import * as React from 'react';
import { graphql } from 'gatsby';
import {
  RiStackLine,
  RiRulerLine,
  RiShadowLine,
  RiGlobalLine,
  RiQrScan2Line,
  RiCopperDiamondLine,
} from 'react-icons/ri';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';

import Layout from '@components/layout';
import Button from '@components/button';

import Metals1Image from '@media/projects/graal/metals-1.webp';
import Metals2Image from '@media/projects/graal/metals-2.webp';
import GraalMapImage from '@media/projects/graal/graal-map.webp';
import Graal2021Image from '@media/projects/graal/graal-2021.jpg';
import Graal2022Image from '@media/projects/graal/graal-2022.jpg';
import GraalMap2Image from '@media/projects/graal/graal-map-2.webp';

import Jan2024PDF from '@media/projects/graal/jan-2024.pdf';

export default function Graal() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className='container mx-auto grid gap-10 px-5 pb-10 pt-36 md:gap-16 md:px-10 md:pb-20 md:pt-44 lg:grid-cols-2'>
        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          initial={{ x: '-80px', opacity: 0 }}
          whileInView={{ x: '0', opacity: 1 }}
          className='flex flex-col gap-4'
        >
          <p className='text-tertiary'>{t('graalSubtitle')}</p>
          <Trans parent='h1' i18nKey='graalTitle' className='text-4xl text-secondary'></Trans>
          <Trans i18nKey='graalDescription' className='my-6'></Trans>

          <div className='mt-auto flex items-center justify-between rounded-2xl bg-primary p-5 md:p-10'>
            <div className='flex flex-col gap-2'>
              <p className='text-tertiary/60'>{t('reportSubtitle')}</p>
              <p className='text-3xl text-whiteLight'>{t('reportTitle')}</p>
            </div>

            <Button type='tertiary' external href={Jan2024PDF}>
              {t('reportButton')}
            </Button>
          </div>
        </motion.div>

        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          initial={{ x: '80px', opacity: 0 }}
          whileInView={{ x: '0', opacity: 1 }}
          className='rounded-lg bg-white p-4'
        >
          <img src={GraalMapImage} alt='Graal map' />
        </motion.div>
      </div>

      <div className='bg-secondary py-20'>
        <div className='container mx-auto px-5 md:px-10'>
          <Trans parent='h2' i18nKey='milestoneTitle' className='text-center text-4xl'></Trans>

          <div className='grid gap-x-12 gap-y-10 py-16 md:grid-cols-2 lg:grid-cols-3'>
            <motion.div
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              initial={{ x: '80px', opacity: 0 }}
              whileInView={{ x: '0', opacity: 1 }}
              className='flex flex-col items-center gap-2 px-5 text-center md:px-10'
            >
              <div className='mb-4 flex size-20 items-center justify-center rounded-full bg-tertiary/10 text-tertiary'>
                <RiStackLine className='size-10' />
              </div>
              <p className='text-2xl text-tertiary'>{t('milestoneItem1Title')}</p>
              <p className='text-whiteLight'>{t('milestoneItem1Description')}</p>
            </motion.div>

            <motion.div
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              initial={{ x: '80px', opacity: 0 }}
              whileInView={{ x: '0', opacity: 1 }}
              className='flex flex-col items-center gap-2 px-5 text-center md:px-10'
            >
              <div className='mb-4 flex size-20 items-center justify-center rounded-full bg-tertiary/10 text-tertiary'>
                <RiRulerLine className='size-10' />
              </div>
              <p className='text-2xl text-tertiary'>{t('milestoneItem2Title')}</p>
              <p className='text-whiteLight'>{t('milestoneItem2Description')}</p>
            </motion.div>

            <motion.div
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              initial={{ x: '80px', opacity: 0 }}
              whileInView={{ x: '0', opacity: 1 }}
              className='flex flex-col items-center gap-2 px-5 text-center md:px-10'
            >
              <div className='mb-4 flex size-20 items-center justify-center rounded-full bg-tertiary/10 text-tertiary'>
                <RiQrScan2Line className='size-10' />
              </div>
              <p className='text-2xl text-tertiary'>{t('milestoneItem3Title')}</p>
              <p className='text-whiteLight'>{t('milestoneItem3Description')}</p>
            </motion.div>

            <motion.div
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              initial={{ x: '80px', opacity: 0 }}
              whileInView={{ x: '0', opacity: 1 }}
              className='flex flex-col items-center gap-2 px-5 text-center md:px-10'
            >
              <div className='mb-4 flex size-20 items-center justify-center rounded-full bg-tertiary/10 text-tertiary'>
                <RiCopperDiamondLine className='size-10' />
              </div>
              <p className='text-2xl text-tertiary'>{t('milestoneItem4Title')}</p>
              <p className='text-whiteLight'>{t('milestoneItem4Description')}</p>
            </motion.div>

            <motion.div
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              initial={{ x: '80px', opacity: 0 }}
              whileInView={{ x: '0', opacity: 1 }}
              className='flex flex-col items-center gap-2 px-5 text-center md:px-10'
            >
              <div className='mb-4 flex size-20 items-center justify-center rounded-full bg-tertiary/10 text-tertiary'>
                <RiShadowLine className='size-10' />
              </div>
              <p className='text-2xl text-tertiary'>{t('milestoneItem5Title')}</p>
              <p className='text-whiteLight'>{t('milestoneItem5Description')}</p>
            </motion.div>

            <motion.div
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              initial={{ x: '80px', opacity: 0 }}
              whileInView={{ x: '0', opacity: 1 }}
              className='flex flex-col items-center gap-2 px-5 text-center md:px-10'
            >
              <div className='mb-4 flex size-20 items-center justify-center rounded-full bg-tertiary/10 text-tertiary'>
                <RiGlobalLine className='size-10' />
              </div>
              <p className='text-2xl text-tertiary'>{t('milestoneItem6Title')}</p>
              <p className='text-whiteLight'>{t('milestoneItem6Description')}</p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className='bg-tertiary/10 py-20'>
        <div className='container mx-auto grid gap-16 px-5 md:px-10 lg:grid-cols-2'>
          <motion.div
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            initial={{ x: '-80px', opacity: 0 }}
            whileInView={{ x: '0', opacity: 1 }}
          >
            <iframe
              className='h-[550px] w-full'
              title='Graal drilling map'
              src='https://graal-drilling-map.netlify.app/'
            ></iframe>
          </motion.div>

          <motion.div
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            initial={{ x: '80px', opacity: 0 }}
            whileInView={{ x: '0', opacity: 1 }}
            className='flex flex-col gap-4'
          >
            <p className='text-tertiary'>{t('drillSubtitle')}</p>
            <Trans parent='h2' i18nKey='drillTitle' className='text-4xl text-secondary'></Trans>
            <p className='mt-6'>{t('drillDescription')}</p>
          </motion.div>
        </div>
      </div>

      <div className='container mx-auto grid gap-16 px-5 py-20 md:px-10 lg:grid-cols-2'>
        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          initial={{ x: '-80px', opacity: 0 }}
          whileInView={{ x: '0', opacity: 1 }}
          className='flex flex-col gap-20 lg:py-10'
        >
          <div className='flex flex-col gap-6'>
            <p className='text-tertiary'>{t('info1Subtitle')}</p>
            <Trans parent='h2' i18nKey='info1Title' className='text-4xl text-secondary'></Trans>
            <p className='mt-4'>{t('info1Description')}</p>
          </div>

          <div className='flex flex-col gap-10'>
            <Trans parent='h2' i18nKey='info2Title' className='text-4xl text-secondary'></Trans>
            <p>{t('info2Description')}</p>

            <Button className='mt-6' type='primary-outlined' href='/data'>
              {t('infoButton')}
            </Button>
          </div>
        </motion.div>

        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          initial={{ x: '80px', opacity: 0 }}
          whileInView={{ x: '0', opacity: 1 }}
          className='rounded-lg bg-white p-4'
        >
          <img src={GraalMap2Image} alt='Graal map' />
        </motion.div>
      </div>

      <div className='mb-20 bg-secondary py-20'>
        <div className='container mx-auto flex flex-col gap-16 px-5 md:px-10 lg:flex-row'>
          <motion.div
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            initial={{ x: '-80px', opacity: 0 }}
            whileInView={{ x: '0', opacity: 1 }}
          >
            <p className='mb-2 text-lg text-tertiary'>{t('statsYear2021')}</p>
            <div className='rounded-lg bg-white p-4'>
              <img className='object-cover' src={Graal2021Image} alt='Graal 2021' />
            </div>
          </motion.div>

          <div className='flex min-w-52 flex-col items-center justify-center gap-10 text-center md:flex-row lg:flex-col'>
            <div>
              <p className='mb-2 text-6xl'>
                <mark>
                  <CountUp end={267} duration={3} enableScrollSpy scrollSpyOnce />
                </mark>
              </p>

              <p className='text-lg text-whiteLight'>{t('stats1')}</p>
            </div>

            <div>
              <p className='mb-2 text-6xl'>
                <mark>
                  <CountUp end={148} duration={3} enableScrollSpy scrollSpyOnce />
                </mark>
              </p>

              <p className='text-lg text-whiteLight'>{t('stats2')}</p>
            </div>

            <div>
              <p className='mb-2 text-6xl'>
                <mark>
                  <CountUp end={16788} duration={3} enableScrollSpy scrollSpyOnce />
                </mark>
              </p>

              <p className='text-lg text-whiteLight'>{t('stats3')}</p>
            </div>
          </div>

          <motion.div
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            initial={{ x: '80px', opacity: 0 }}
            whileInView={{ x: '0', opacity: 1 }}
          >
            <p className='mb-2 text-lg text-tertiary'>{t('statsYear2022')}</p>
            <div className='rounded-lg bg-white p-4'>
              <img className='object-cover' src={Graal2022Image} alt='Graal 2022' />
            </div>
          </motion.div>
        </div>
      </div>

      <div className='container mx-auto items-center px-5 pb-20 md:px-10'>
        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          initial={{ y: '80px', opacity: 0 }}
          whileInView={{ y: '0', opacity: 1 }}
          className='grid gap-16 rounded-2xl bg-white p-5 md:p-10 lg:grid-cols-2'
        >
          <img className='h-[450px] w-full rounded-lg object-cover' src={Metals1Image} alt='Metals' />

          <div className='flex flex-col gap-4'>
            <p className='text-tertiary'>{t('historySubtitle')}</p>
            <h2 className='text-3xl text-secondary'>{t('historyTitle')}</h2>
            <p className='mt-2'>{t('historyDescription')}</p>
          </div>
        </motion.div>
      </div>

      <div className='container mx-auto items-center px-5 pb-20 md:px-10'>
        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          initial={{ y: '80px', opacity: 0 }}
          whileInView={{ y: '0', opacity: 1 }}
          className='grid gap-16 rounded-2xl bg-white p-5 md:p-10 lg:grid-cols-2'
        >
          <div className='flex flex-col gap-4'>
            <p className='text-tertiary'>{t('geologySubtitle')}</p>
            <h2 className='text-3xl text-secondary'>{t('geologyTitle')}</h2>
            <p className='mt-2'>{t('geologyDescription')}</p>
          </div>

          <img className='h-[450px] w-full rounded-lg object-cover' src={Metals2Image} alt='Metals' />
        </motion.div>
      </div>
    </Layout>
  );
}

export function Head() {
  return (
    <>
      <html lang='en' />
      <title>The Graal Project | Granada Gold Mine</title>
      <meta
        name='description'
        content='We are advancing the Graal project towards production to meet the rising demand for Critical Minerals from Safe Jurisdictions.'
      />
    </>
  );
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { ns: { in: ["common", "graal"] }, language: { eq: $language } }) {
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
