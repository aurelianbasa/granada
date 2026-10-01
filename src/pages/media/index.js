import * as React from 'react';
import { graphql } from 'gatsby';
import { motion } from 'framer-motion';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import Layout from '@components/layout';
import Seo, { getLocaleStrings } from '@components/seo';
import CardPhoto from '@components/card-photo';

import StrippingMap from '@media/media/maps/stripping-map.jpg';
import DrillHolesLocation201908 from '@media/media/maps/drill-holes-location-2019-08.jpg';
import HighGradeIntersections from '@media/media/maps/high-grade-intersections.jpg';
import GR19AFirstResults from '@media/media/maps/gr-19-a-first-analytical-results.jpg';
import DepositCrossSection from '@media/media/maps/deposit-cross-section.jpg';
import DrillProgramLocation201810 from '@media/media/maps/drill-program-location-2018-10.jpg';
import OverviewMapMain from '@media/media/maps/overview-map-main.jpg';
import BlkAu2UndergroundZone from '@media/media/maps/blk-au-2-underground-zone.jpg';
import OverviewMap from '@media/media/maps/overview-map.jpg';
import MineLocation from '@media/media/maps/mine-location.jpg';
import PropertyMap from '@media/media/maps/property.jpg';
import DrillHoleLocations20170227 from '@media/media/maps/drill-hole-locations-2017-02-27.jpg';
import AukekoAustinRouynShafts from '@media/media/maps/aukeko-austin-rouyn-shafts.jpg';
import RollingStartSiteLayout from '@media/media/maps/rolling-start-site-layout.jpg';
import GR1704Location20170228 from '@media/media/maps/gr-17-04-location-2017-02-28.jpg';
import DeepDrillHoles201701 from '@media/media/maps/deep-drill-holes-2017-01.jpg';
import DrillMap201702 from '@media/media/maps/drill-map-2017-02.jpg';
import DrillMapHistoricHoles from '@media/media/maps/drill-map-historic-holes.jpg';

import Gold20200811A from '@media/media/images/gold-2020-08-11-1.jpg';
import Gold20200811B from '@media/media/images/gold-2020-08-11-2.jpg';
import BulkSampling202006A from '@media/media/images/bulk-sampling-2020-06-1.jpg';
import BulkSampling202006B from '@media/media/images/bulk-sampling-2020-06-2.jpg';
import BulkSamplingSpringA from '@media/media/images/bulk-sampling-2020-spring-1.jpg';
import BulkSamplingSpringB from '@media/media/images/bulk-sampling-2020-spring-2.jpg';
import BulkSamplingSpringC from '@media/media/images/bulk-sampling-2020-spring-3.jpg';
import BulkSamplingSpringD from '@media/media/images/bulk-sampling-2020-spring-4.jpg';

// Order as published on granadagoldmine.com/en/the-property/maps/ and /images/; captions are map1…map18, image1…image8.
const MAPS = [
  StrippingMap,
  DrillHolesLocation201908,
  HighGradeIntersections,
  GR19AFirstResults,
  DepositCrossSection,
  DrillProgramLocation201810,
  OverviewMapMain,
  BlkAu2UndergroundZone,
  OverviewMap,
  MineLocation,
  PropertyMap,
  DrillHoleLocations20170227,
  AukekoAustinRouynShafts,
  RollingStartSiteLayout,
  GR1704Location20170228,
  DeepDrillHoles201701,
  DrillMap201702,
  DrillMapHistoricHoles,
];

const IMAGES = [
  Gold20200811A,
  Gold20200811B,
  BulkSampling202006A,
  BulkSampling202006B,
  BulkSamplingSpringA,
  BulkSamplingSpringB,
  BulkSamplingSpringC,
  BulkSamplingSpringD,
];

export default function Media({ location }) {
  const { t } = useTranslation();

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const params = new URLSearchParams(location.search);
  const activeTab = params.get('tab');

  React.useEffect(() => {
    setSelectedIndex(Number(activeTab) || 0);
  }, [activeTab]);

  const container = {
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.1,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    hidden: { opacity: 0 },
  };

  const items = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        ease: 'linear',
      },
    },
    hidden: { opacity: 0, x: 80 },
  };

  const gallery = (images, captionKey) => (
    <motion.div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3' initial='hidden' animate='visible' variants={container}>
      {images.map((image, index) => (
        <motion.div variants={items} key={index}>
          <CardPhoto
            image={image}
            alt={t(`${captionKey}${index + 1}`)}
            caption={t(`${captionKey}${index + 1}`)}
          ></CardPhoto>
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <Layout>
      <div className='container mx-auto px-5 pb-10 pt-36 md:px-10 md:pb-20 md:pt-44'>
        <TabGroup className='grid gap-10' selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <TabList className='mx-auto flex w-fit rounded-lg bg-white'>
            <Tab className='px-6 py-4 text-sm outline-none data-[selected]:rounded-lg data-[selected]:bg-secondary data-[selected]:text-white md:text-base'>
              {t('tabItem1')}
            </Tab>
            <Tab className='px-6 py-4 text-sm outline-none data-[selected]:rounded-lg data-[selected]:bg-secondary data-[selected]:text-white md:text-base'>
              {t('tabItem2')}
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel className='flex flex-col gap-16'>
              <div className='grid max-w-[960px] gap-4 self-center'>
                <p className='text-center text-tertiary'>{t('tab1Subtitle')}</p>
                <h1 className='text-center text-4xl text-secondary'>{t('tab1Title')}</h1>
              </div>

              {gallery(MAPS, 'map')}
            </TabPanel>

            <TabPanel className='flex flex-col gap-16'>
              <div className='grid max-w-[960px] gap-4 self-center'>
                <p className='text-center text-tertiary'>{t('tab2Subtitle')}</p>
                <h1 className='text-center text-4xl text-secondary'>{t('tab2Title')}</h1>
              </div>

              {gallery(IMAGES, 'image')}
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </Layout>
  );
}

export function Head({ data, pageContext }) {
  const strings = getLocaleStrings(data, 'media');

  return <Seo pageContext={pageContext} title={strings.metaTitle} description={strings.metaDescription} />;
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { ns: { in: ["common", "media"] }, language: { eq: $language } }) {
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
