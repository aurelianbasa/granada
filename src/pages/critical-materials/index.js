import * as React from 'react';
import { graphql } from 'gatsby';
import { motion } from 'framer-motion';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';

import Layout from '@components/layout';
import Button from '@components/button';
import DataWrapper from '@components/data-wrapper';

import CMImage from '@media/critical-materials/cmi.webp';
import USAImage from '@media/critical-materials/usa.webp';
import CopperImage from '@media/critical-materials/copper.webp';
import NickelImage from '@media/critical-materials/nickel.webp';
import CobaltImage from '@media/critical-materials/cobalt.webp';
import QuebecImage from '@media/critical-materials/quebec.webp';
import CanadaImage from '@media/critical-materials/canada.webp';
import OverviewImage from '@media/critical-materials/overview.webp';

import DoePDF from '@media/critical-materials/doe-critical-material-assessment.pdf';

export default function CriticalMaterials() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div
        style={{ '--bg-image-url': `url(${OverviewImage})` }}
        className={`flex items-center bg-[image:var(--bg-image-url)] bg-cover bg-center pb-10 pt-36 md:pb-20 md:pt-44`}
      >
        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          initial={{ y: '80px', opacity: 0 }}
          whileInView={{ y: '0', opacity: 1 }}
          className='container mx-auto px-5 py-28 md:gap-10 md:px-10'
        >
          <p className='text-tertiary'>{t('heroSubtitle')}</p>
          <Trans parent='h1' i18nKey='heroTitle' className='mb-10 mt-4 text-6xl text-white'></Trans>
        </motion.div>
      </div>

      <div className='container mx-auto px-5 py-20 md:px-10'>
        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          initial={{ y: '80px', opacity: 0 }}
          whileInView={{ y: '0', opacity: 1 }}
          className='mx-auto grid max-w-4xl gap-6'
        >
          <Trans parent='h2' i18nKey='introTitle' className='text-4xl text-secondary'></Trans>
          <Trans parent='p' i18nKey='introBody'></Trans>
        </motion.div>
      </div>

      <div className='mb-20 bg-tertiary py-20'>
        <div className='container mx-auto grid gap-6 px-5 md:px-10'>
          <Trans parent='h2' i18nKey='metalsTitle' className='text-4xl text-secondary'></Trans>
          <p>{t('metalsSubtitle')}</p>

          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            <motion.div
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              initial={{ x: '80px', opacity: 0 }}
              whileInView={{ x: '0', opacity: 1 }}
              className='relative mt-40 grid gap-10 rounded-2xl bg-white px-6 pb-10 pt-24'
            >
              <img className='absolute -top-40 left-1/2 h-64 -translate-x-1/2' src={CopperImage} alt='Copper' />
              <h3 className='text-center text-3xl text-secondary'>{t('metalsItem1Title')}</h3>

              <div className='grid gap-4'>
                <div>
                  <p className='text-sm text-tertiary'>{t('metalsItem1Metric')}</p>
                  <p className='mt-2 text-3xl text-secondary'>{t('metalsItem1Value')}</p>
                </div>
                <p>{t('metalsItem1Producer')}</p>
                <p>{t('metalsItem1Structure')}</p>
                <p className='text-sm text-tertiary'>{t('metalsItem1Source')}</p>
              </div>
            </motion.div>

            <motion.div
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              initial={{ x: '80px', opacity: 0 }}
              whileInView={{ x: '0', opacity: 1 }}
              className='relative mt-40 grid gap-10 rounded-2xl bg-white px-6 pb-10 pt-24'
            >
              <img className='absolute -top-40 left-1/2 h-64 -translate-x-1/2' src={NickelImage} alt='Nickel' />
              <h3 className='text-center text-3xl text-secondary'>{t('metalsItem2Title')}</h3>

              <div className='grid gap-4'>
                <div>
                  <p className='text-sm text-tertiary'>{t('metalsItem2Metric')}</p>
                  <p className='mt-2 text-3xl text-secondary'>{t('metalsItem2Value')}</p>
                </div>
                <p>{t('metalsItem2Producer')}</p>
                <p>{t('metalsItem2Structure')}</p>
                <p className='text-sm text-tertiary'>{t('metalsItem2Source')}</p>
              </div>
            </motion.div>

            <motion.div
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              initial={{ x: '80px', opacity: 0 }}
              whileInView={{ x: '0', opacity: 1 }}
              className='relative mt-40 grid gap-10 rounded-2xl bg-white px-6 pb-10 pt-24'
            >
              <img className='absolute -top-40 left-1/2 h-64 -translate-x-1/2' src={CobaltImage} alt='Cobalt' />
              <h3 className='text-center text-3xl text-secondary'>{t('metalsItem3Title')}</h3>

              <div className='grid gap-4'>
                <div>
                  <p className='text-sm text-tertiary'>{t('metalsItem3Metric')}</p>
                  <p className='mt-2 text-3xl text-secondary'>{t('metalsItem3Value')}</p>
                </div>
                <p>{t('metalsItem3Producer')}</p>
                <p>{t('metalsItem3Structure')}</p>
                <p className='text-sm text-tertiary'>{t('metalsItem3Source')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-5 pb-20 md:px-10'>
        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          initial={{ y: '80px', opacity: 0 }}
          whileInView={{ y: '0', opacity: 1 }}
          className='mx-auto grid max-w-4xl gap-6'
        >
          <Trans parent='h2' i18nKey='buildoutTitle' className='text-4xl text-secondary'></Trans>
          <Trans parent='p' i18nKey='buildoutBody'></Trans>
          <p className='text-sm text-tertiary'>{t('buildoutSources')}</p>
        </motion.div>
      </div>

      <div className='container mx-auto px-5 pb-10 md:px-10'>
        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          initial={{ y: '80px', opacity: 0 }}
          whileInView={{ y: '0', opacity: 1 }}
          className='grid gap-4 rounded-2xl bg-white p-5 md:p-10'
        >
          <div className='flex gap-10'>
            <p className='text-primary'>{t('usaSubtitle')}</p>
            <p className='text-tertiary'>{t('usaDate')}</p>
          </div>

          <Trans parent='h2' i18nKey='usaTitle' className='text-4xl text-secondary'></Trans>

          <div className='mt-6 grid gap-16 xl:grid-cols-2'>
            <div className='flex items-center justify-center overflow-hidden rounded-lg'>
              <img className='w-full' src={USAImage} alt='Report' />
            </div>

            <div className='flex flex-col gap-4'>
              <Trans i18nKey='usaDescription'></Trans>

              <p className='mt-2 text-sm text-tertiary'>{t('usaNote')}</p>

              <div className='mt-6 flex flex-wrap gap-4 self-end'>
                <Button
                  className='w-full md:w-fit'
                  external
                  type='primary-outlined'
                  href='https://www.federalregister.gov/documents/2025/11/07/2025-19813/final-2025-list-of-critical-minerals'
                >
                  {t('usaButton')}
                </Button>
                <Button className='w-full md:w-fit' external type='primary-outlined' href={DoePDF}>
                  {t('usaButtonSecondary')}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className='container mx-auto px-5 pb-10 md:px-10'>
        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          initial={{ y: '80px', opacity: 0 }}
          whileInView={{ y: '0', opacity: 1 }}
          className='grid gap-4 rounded-2xl bg-white p-5 md:p-10'
        >
          <div className='flex gap-10'>
            <p className='text-primary'>{t('canadaSubtitle')}</p>
            <p className='text-tertiary'>{t('canadaDate')}</p>
          </div>

          <Trans parent='h2' i18nKey='canadaTitle' className='text-4xl text-secondary'></Trans>

          <div className='mt-6 grid gap-16 xl:grid-cols-2'>
            <div className='flex items-center justify-center overflow-hidden rounded-lg'>
              <img className='w-full' src={CanadaImage} alt='Canada' />
            </div>

            <div className='flex flex-col gap-4'>
              <Trans i18nKey='canadaDescription'></Trans>

              <p className='mt-2 text-sm text-tertiary'>{t('canadaNote')}</p>

              <Button
                className='mt-6 w-full self-end md:w-fit'
                external
                type='primary-outlined'
                href='https://www.canada.ca/en/natural-resources-canada/news/2024/06/government-of-canada-releases-updated-critical-minerals-list.html'
              >
                {t('canadaButton')}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className='container mx-auto px-5 pb-20 md:px-10'>
        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          initial={{ y: '80px', opacity: 0 }}
          whileInView={{ y: '0', opacity: 1 }}
          className='grid gap-4 rounded-2xl bg-white p-5 md:p-10'
        >
          <div className='flex gap-10'>
            <p className='text-primary'>{t('quebecSubtitle')}</p>
            <p className='text-tertiary'>{t('quebecDate')}</p>
          </div>

          <Trans parent='h2' i18nKey='quebecTitle' className='text-4xl text-secondary'></Trans>

          <div className='mt-6 grid gap-16 xl:grid-cols-2'>
            <div className='flex items-center justify-center overflow-hidden rounded-lg'>
              <img className='w-full' src={QuebecImage} alt='Report' />
            </div>

            <div className='flex flex-col gap-4'>
              <Trans i18nKey='quebecDescription'></Trans>

              <p className='mt-2 text-sm text-tertiary'>{t('quebecNote')}</p>

              <Button
                className='mt-6 w-full self-end md:w-fit'
                external
                type='primary-outlined'
                href='https://www.quebec.ca/en/gouvernement/ministeres-organismes/ressources-naturelles-forets/publications/quebec-strategy-development-critical-strategic-minerals'
              >
                {t('quebecButton')}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className='container mx-auto px-5 pb-20 md:px-10'>
        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          initial={{ y: '80px', opacity: 0 }}
          whileInView={{ y: '0', opacity: 1 }}
          className='flex flex-wrap justify-center gap-x-10 gap-y-6 rounded-2xl bg-secondary p-5 text-2xl text-white md:p-10'
        >
          <p>{t('element1')}</p>
          <p>{t('element2')}</p>
          <p>{t('element3')}</p>
          <p>{t('element4')}</p>
          <p>{t('element5')}</p>
          <p>{t('element6')}</p>
          <p>{t('element7')}</p>
          <p>{t('element8')}</p>
          <p>{t('element9')}</p>
          <p>{t('element10')}</p>
          <p>{t('element11')}</p>
          <p>{t('element12')}</p>
          <p>{t('element13')}</p>
          <p>{t('element14')}</p>
          <p>{t('element15')}</p>
          <p>{t('element16')}</p>
          <p>{t('element17')}</p>
          <p>{t('element18')}</p>
        </motion.div>
      </div>

      <div className='container mx-auto px-5 pb-20 md:px-10'>
        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          initial={{ y: '80px', opacity: 0 }}
          whileInView={{ y: '0', opacity: 1 }}
          className='grid gap-4 rounded-2xl bg-white p-5 md:p-10'
        >
          <div className='flex gap-10'>
            <p className='text-primary'>{t('cmiSubtitle')}</p>
            <p className='text-tertiary'>{t('cmiDate')}</p>
          </div>

          <Trans parent='h2' i18nKey='cmiTitle' className='text-4xl text-secondary'></Trans>

          <div className='mt-6 grid gap-16 xl:grid-cols-2'>
            <div className='flex justify-center overflow-hidden rounded-lg'>
              <div className='sticky max-w-md'>
                <img src={CMImage} alt='Critical Minerals Institute logo' />
              </div>
            </div>

            <div className='flex flex-col gap-4'>
              <Trans i18nKey='cmiDescription'></Trans>

              <p className='text-sm text-tertiary'>{t('cmiNote')}</p>

              <Button
                className='mt-6 w-full self-end md:w-fit'
                external
                type='primary-outlined'
                href='https://criticalmineralsinstitute.com/'
              >
                {t('cmiButton')}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className='container mx-auto px-5 pb-20 md:px-10'>
        <div className='grid gap-16 rounded-2xl bg-secondary p-4 md:p-8'>
          <DataWrapper
            title="What's Driving Mineral Demand"
            src='https://datawrapper.dwcdn.net/ZBe2I/2/?transparent=true'
          ></DataWrapper>

          <DataWrapper
            title='Required scale-up in Demand and Mines'
            src='https://datawrapper.dwcdn.net/qOC7L/2/?transparent=true'
          ></DataWrapper>

          <DataWrapper
            title='Mineral Requirements for the Clean Energy Transition'
            src='https://datawrapper.dwcdn.net/FPeA0/3/?transparent=true'
          ></DataWrapper>
        </div>
      </div>
    </Layout>
  );
}

export function Head() {
  return (
    <>
      <html lang='en' />
      <title>Critical Materials | Granada Gold Mine</title>
      <meta
        name='description'
        content='Not every critical mineral market is still winnable. Copper and nickel are. Coniagas Battery Metals, TSXV: COS.'
      />
    </>
  );
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { ns: { in: ["common", "critical-materials"] }, language: { eq: $language } }) {
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
