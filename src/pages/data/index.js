import * as React from 'react';
import { graphql } from 'gatsby';
import { motion } from 'framer-motion';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import Layout from '@components/layout';
import Button from '@components/button';
import CardPhoto from '@components/card-photo';
import DataWrapper from '@components/data-wrapper';

// Swap any figure by pointing its import at the replacement file.
import PlanViewImage from '@media/data/plan-view.webp';
import MHYSectionImage from '@media/data/mhy-section.webp';
import GraviSectionImage from '@media/data/gravi-section.webp';
import DiscoverySectionImage from '@media/data/discovery-section.webp';

import CoreMHY60Image from '@media/data/core-mhy-grl-22-60.jpg';
import CoreMHY61Image from '@media/data/core-mhy-grl-22-61.jpg';
import CoreGravi24Image from '@media/data/core-gravi-nrc-22-24.jpg';
import CoreDiscovery03aImage from '@media/data/core-discovery-nrc-21-03-a.jpg';
import CoreDiscovery03bImage from '@media/data/core-discovery-nrc-21-03-b.jpg';

import TechnicalReportPDF from '@media/investors/technical-report.pdf';

const zones = [
  {
    key: 'mhy',
    titleKey: 'tab1Title',
    itemKeys: ['tab1Item1', 'tab1Item2'],
    embedTitle: 'MHY Zone',
    embedSrc: 'https://datawrapper.dwcdn.net/4Vg5N/2/?transparent=true',
    section: { image: MHYSectionImage, alt: 'MHY Zone cross section B-B′' },
  },
  {
    key: 'gravi',
    titleKey: 'tab2Title',
    itemKeys: ['tab2Item1', 'tab2Item2'],
    embedTitle: 'Gravi Zone',
    embedSrc: 'https://datawrapper.dwcdn.net/YI50E/3/?transparent=true',
    section: { image: GraviSectionImage, alt: 'Gravi Zone cross section C-C′' },
  },
  {
    key: 'discovery',
    titleKey: 'tab3Title',
    itemKeys: ['tab3Item1', 'tab3Item2'],
    embedTitle: 'Discovery Zone',
    embedSrc: 'https://datawrapper.dwcdn.net/DieoU/2/?transparent=true',
    section: { image: DiscoverySectionImage, alt: 'Discovery Zone cross section A-A′' },
  },
];

const corePhotos = [
  {
    key: 'core-mhy-grl-22-60',
    image: CoreMHY60Image,
    alt: 'GRL-22-60 drill core, massive sulphide mineralization, Graal MHY Zone.',
    captionKey: 'coreCaption1',
  },
  {
    key: 'core-mhy-grl-22-61',
    image: CoreMHY61Image,
    alt: 'GRL-22-61 drill core, massive sulphide mineralization, Graal MHY Zone.',
    captionKey: 'coreCaption2',
  },
  {
    key: 'core-gravi-nrc-22-24',
    image: CoreGravi24Image,
    alt: 'NRC-22-24 drill core, massive sulphide mineralization, Graal Gravi Zone.',
    captionKey: 'coreCaption3',
  },
  {
    key: 'core-discovery-nrc-21-03-a',
    image: CoreDiscovery03aImage,
    alt: 'NRC-21-03 drill core, massive sulphide mineralization, Graal Discovery Zone.',
    captionKey: 'coreCaption4',
  },
  {
    key: 'core-discovery-nrc-21-03-b',
    image: CoreDiscovery03bImage,
    alt: 'NRC-21-03 drill core, massive sulphide mineralization, Graal Discovery Zone.',
    captionKey: 'coreCaption5',
  },
];

const historyItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export default function Data() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className='container mx-auto grid gap-20 px-5 pb-10 pt-36 md:px-10 md:pb-20 md:pt-44'>
        <div className='grid gap-10'>
          <h2 className='text-center text-4xl text-secondary'>{t('planTitle')}</h2>

          <motion.div
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            initial={{ y: '80px', opacity: 0 }}
            whileInView={{ y: '0', opacity: 1 }}
            className='mx-auto grid w-full max-w-[960px] gap-10'
          >
            <p>{t('planText')}</p>

            <img
              src={PlanViewImage}
              alt='Plan view of the Graal property showing the late-time EM response, zone locations, open areas, regional drill results and section traces.'
            />
          </motion.div>
        </div>

        {zones.map((zone) => (
          <div key={zone.key} className='grid gap-10'>
            <h2 className='text-center text-4xl text-secondary'>{t(zone.titleKey)}</h2>

            <TabGroup className='grid gap-10 pb-20'>
              <TabList className='mx-auto flex w-fit rounded-lg bg-white'>
                {zone.itemKeys.map((itemKey) => (
                  <Tab
                    key={itemKey}
                    className='px-6 py-4 text-sm outline-none data-[selected]:rounded-lg data-[selected]:bg-secondary data-[selected]:text-white md:text-base'
                  >
                    {t(itemKey)}
                  </Tab>
                ))}
              </TabList>

              <TabPanels className='min-h-48 md:min-h-96'>
                <TabPanel className='mx-auto max-w-[960px]'>
                  <motion.div
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    initial={{ y: '80px', opacity: 0 }}
                    whileInView={{ y: '0', opacity: 1 }}
                  >
                    <DataWrapper title={zone.embedTitle} src={zone.embedSrc} />
                  </motion.div>
                </TabPanel>
                <TabPanel className='mx-auto max-w-[960px]'>
                  <motion.div
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    initial={{ y: '80px', opacity: 0 }}
                    whileInView={{ y: '0', opacity: 1 }}
                  >
                    <img src={zone.section.image} alt={zone.section.alt} loading='lazy' />
                  </motion.div>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
        ))}

        <div id='history' className='grid scroll-mt-36 gap-10 md:scroll-mt-44'>
          <h2 className='text-center text-4xl text-secondary'>{t('historyTitle')}</h2>

          <motion.div
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            initial={{ y: '80px', opacity: 0 }}
            whileInView={{ y: '0', opacity: 1 }}
            className='mx-auto grid w-full max-w-[960px] gap-10'
          >
            <p>{t('historyIntro')}</p>

            <div className='grid gap-6'>
              {historyItems.map((item) => (
                <div key={item} className='grid gap-1 md:grid-cols-[160px_1fr] md:gap-8'>
                  <p className='text-lg text-tertiary'>{t(`history${item}Year`)}</p>
                  <p>{t(`history${item}Text`)}</p>
                </div>
              ))}
            </div>

            <p className='text-sm italic text-secondary/60'>{t('historyNote')}</p>
          </motion.div>
        </div>

        <div className='grid gap-10'>
          <div className='grid gap-4'>
            <p className='text-center text-tertiary'>{t('coreSubtitle')}</p>
            <h2 className='text-center text-4xl text-secondary'>{t('coreTitle')}</h2>
          </div>

          <motion.div
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            initial={{ y: '80px', opacity: 0 }}
            whileInView={{ y: '0', opacity: 1 }}
            className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'
          >
            {corePhotos.map((photo) => (
              <div key={photo.key}>
                <CardPhoto image={photo.image} alt={photo.alt} caption={t(photo.captionKey)} />
              </div>
            ))}
          </motion.div>

          <motion.div
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            initial={{ y: '80px', opacity: 0 }}
            whileInView={{ y: '0', opacity: 1 }}
            className='mx-auto mt-6 w-full max-w-[960px]'
          >
            <div className='flex flex-col gap-6 rounded-2xl bg-primary p-5 md:flex-row md:items-center md:justify-between md:p-10'>
              <div className='flex flex-col gap-2'>
                <p className='text-3xl text-whiteLight'>{t('calloutTitle')}</p>
                <p className='text-tertiary'>{t('calloutText')}</p>
              </div>

              <Button type='tertiary' external href={TechnicalReportPDF}>
                {t('calloutButton')}
              </Button>
            </div>
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
      <title>Data | Granada Gold Mine</title>
      <meta name='description' content='Granada Gold Mine. MHY Zone, Gravi Zone and Discovery Zone.' />
    </>
  );
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { ns: { in: ["common", "data"] }, language: { eq: $language } }) {
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
