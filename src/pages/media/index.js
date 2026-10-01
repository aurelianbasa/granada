import * as React from 'react';
import { graphql } from 'gatsby';
import { motion } from 'framer-motion';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import Layout from '@components/layout';
import CardPhoto from '@components/card-photo';
import CardVideo from '@components/card-video';
import CardArticle from '@components/card-article';

import Photo1Image from '@media/media/photo-1.webp';
import Photo2Image from '@media/media/photo-2.webp';
import Photo3Image from '@media/media/photo-3.webp';
import Photo4Image from '@media/media/photo-4.webp';
import Photo5Image from '@media/media/photo-5.webp';
import Photo6Image from '@media/media/photo-6.webp';
import QuebecReviewImage from '@media/media/quebec-review.webp';
import BNNImage from '@media/media/bnn.webp';

import QMRarticlePDF from '@media/media/QMRarticle.pdf';
import BNNarticlePDF from '@media/media/BNNarticle.pdf';

export default function Media({ location }) {
  const { t } = useTranslation();

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const params = new URLSearchParams(location.search);
  const activeTab = params.get('tab');

  React.useEffect(() => {
    setSelectedIndex(activeTab);
  }, [activeTab]);

  const container = {
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.1,
        when: 'beforeChildren',
        staggerChildren: 0.3,
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
            <Tab className='px-6 py-4 text-sm outline-none data-[selected]:rounded-lg data-[selected]:bg-secondary data-[selected]:text-white md:text-base'>
              {t('tabItem3')}
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel className='flex flex-col gap-16'>
              <div className='grid max-w-[960px] gap-4 self-center'>
                <p className='text-center text-tertiary'>{t('tab1Subitle')}</p>
                <h2 className='text-center text-4xl text-secondary'>{t('tab1Title')}</h2>
              </div>

              <motion.div
                className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'
                initial='hidden'
                animate='visible'
                variants={container}
              >
                <motion.div variants={items}>
                  <CardPhoto image={Photo1Image}></CardPhoto>
                </motion.div>
                <motion.div variants={items}>
                  <CardPhoto image={Photo2Image}></CardPhoto>
                </motion.div>
                <motion.div variants={items}>
                  <CardPhoto image={Photo3Image}></CardPhoto>
                </motion.div>
                <motion.div variants={items}>
                  <CardPhoto image={Photo4Image}></CardPhoto>
                </motion.div>
                <motion.div variants={items}>
                  <CardPhoto image={Photo5Image}></CardPhoto>
                </motion.div>
                <motion.div variants={items}>
                  <CardPhoto image={Photo6Image}></CardPhoto>
                </motion.div>
              </motion.div>
            </TabPanel>

            <TabPanel className='flex flex-col gap-16'>
              <div className='grid max-w-[960px] gap-4 self-center'>
                <p className='text-center text-tertiary'>{t('tab2Subitle')}</p>
                <h2 className='text-center text-4xl text-secondary'>{t('tab2Title')}</h2>
              </div>

              <motion.div initial='hidden' animate='visible' variants={container} className='grid gap-6 md:grid-cols-2'>
              <motion.div variants={items}>
                  <CardVideo
                    date={t('video21Date')}
                    subtitle={t('video21Subtitle')}
                    title={t('video21Title')}
                    src='https://www.youtube.com/embed/yipWcydZIqA?si=Td5cg1bKiG3wP_jC'
                  ></CardVideo>
                </motion.div>
             
              <motion.div variants={items}>
                  <CardVideo
                    date={t('video19Date')}
                    subtitle={t('video19Subtitle')}
                    title={t('video19Title')}
                    src='https://cdn.jwplayer.com/previews/y1yNFg4c'
                  ></CardVideo>
                </motion.div>
              <motion.div variants={items}>
                  <CardVideo
                    date={t('video18Date')}
                    subtitle={t('video18Subtitle')}
                    title={t('video18Title')}
                    src='https://www.youtube.com/embed/1nZtWvwvJmo?si=YfwUmV_l4FfM-Ig4'
                  ></CardVideo>
                </motion.div>
              <motion.div variants={items}>
                  <CardVideo
                    date={t('video17Date')}
                    subtitle={t('video17Subtitle')}
                    title={t('video17Title')}
                    src='https://www.youtube.com/embed/nofB_Vf32hY?si=SMr3Fg_lYkhBbIaS'
                  ></CardVideo>
                </motion.div>
              
              <motion.div variants={items}>
                  <CardVideo
                    date={t('video15Date')}
                    subtitle={t('video15Subtitle')}
                    title={t('video15Title')}
                    src='https://www.youtube.com/embed/K5bLOxnLqqM?si=LqGnPOqiJuIhmTKc'
                  ></CardVideo>
                </motion.div>
              <motion.div variants={items}>
                  <CardVideo
                    date={t('video14Date')}
                    subtitle={t('video14Subtitle')}
                    title={t('video14Title')}
                    src='https://www.youtube.com/embed/zt4K7OTl6AI?si=-WaJVOAWgUesaQFG'
                  ></CardVideo>
                </motion.div>
              <motion.div variants={items}>
                  <CardVideo
                    date={t('video13Date')}
                    subtitle={t('video13Subtitle')}
                    title={t('video13Title')}
                    src='https://www.youtube.com/embed/bCYtux4rIrE?si=_TCJZe_jWuuJyhQ6'
                  ></CardVideo>
                </motion.div>
             
                <motion.div variants={items}>
                  <CardVideo
                    date={t('video11Date')}
                    subtitle={t('video11Subtitle')}
                    title={t('video11Title')}
                    src='https://www.youtube.com/embed/1xnIcm8kPpg?si=HaErIiFSq_rFZ1pH'
                  ></CardVideo>
                </motion.div>
                <motion.div variants={items}>
                  <CardVideo
                    date={t('video10Date')}
                    subtitle={t('video10Subtitle')}
                    title={t('video10Title')}
                    src='https://www.youtube.com/embed/qzno-53pT54?si=vhxRRK6Spcj-Sbjx'
                  ></CardVideo>
                </motion.div>
                <motion.div variants={items}>
                  <CardVideo
                    date={t('video9Date')}
                    subtitle={t('video9Subtitle')}
                    title={t('video9Title')}
                    src='https://www.youtube.com/embed/bJ5wDh9Bi8I?si=fWATpVtNJoFoRfe-'
                  ></CardVideo>
                </motion.div>
                <motion.div variants={items}>
                  <CardVideo
                    date={t('video8Date')}
                    subtitle={t('video8Subtitle')}
                    title={t('video8Title')}
                    src='https://www.youtube.com/embed/mR-y7Zg5CGs?si=AsBEFAzqDeqJBNq2'
                  ></CardVideo>
                </motion.div>
                <motion.div variants={items}>
                  <CardVideo
                    date={t('video7Date')}
                    subtitle={t('video7Subtitle')}
                    title={t('video7Title')}
                    src='https://www.youtube.com/embed/i18rbTJlD9E?si=-0R5hqh1wcjR-zIK'
                  ></CardVideo>
                </motion.div>
                <motion.div variants={items}>
                  <CardVideo
                    date={t('video6Date')}
                    subtitle={t('video6Subtitle')}
                    title={t('video6Title')}
                    src='https://www.youtube.com/embed/nN_dA9dW7G8?si=Zenp1Gr93--acYaA'
                  ></CardVideo>
                </motion.div>
                <motion.div variants={items}>
                  <CardVideo
                    date={t('video5Date')}
                    subtitle={t('video5Subtitle')}
                    title={t('video5Title')}
                    src='https://www.youtube.com/embed/_pM8Qn0tQq4?si=hbMypgXPwjn_TCr6'
                  ></CardVideo>
                </motion.div>
                <motion.div variants={items}>
                  <CardVideo
                    date={t('video4Date')}
                    subtitle={t('video4Subtitle')}
                    title={t('video4Title')}
                    src='https://www.youtube.com/embed/ZSdhSW0Zvl8?si=BqKOvayYNnlhmx6i'
                  ></CardVideo>
                </motion.div>
                <motion.div variants={items}>
                  <CardVideo
                    date={t('video3Date')}
                    subtitle={t('video3Subtitle')}
                    title={t('video3Title')}
                    src='https://www.youtube.com/embed/ean-8z-8lC0?si=0E-oFR3jTdJsBERu'
                  ></CardVideo>
                </motion.div>
                <motion.div variants={items}>
                  <CardVideo
                    date={t('video2Date')}
                    subtitle={t('video2Subtitle')}
                    title={t('video2Title')}
                    src='https://www.youtube.com/embed/yGk7lC5qwoY?si=K6F3Mg_1o2pL9s48'
                  ></CardVideo>
                </motion.div>
                <motion.div variants={items}>
                  <CardVideo
                    date={t('video1Date')}
                    subtitle={t('video1Subtitle')}
                    title={t('video1Title')}
                    src='https://www.youtube.com/embed/5nO4SoN7ZX0?si=3iHBFFG4YR5zfqnB'
                  ></CardVideo>
                </motion.div>
              </motion.div>
            </TabPanel>

            <TabPanel className='flex flex-col gap-16'>
              <div className='grid max-w-[960px] gap-4 self-center'>
                <p className='text-center text-tertiary'>{t('tab3Subitle')}</p>
                <h2 className='text-center text-4xl text-secondary'>{t('tab3Title')}</h2>
              </div>

              <motion.div
                initial='hidden'
                animate='visible'
                variants={container}
                className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'
              >
             
                <motion.div variants={items}>
                  <CardArticle
                    image={BNNImage}
                    date={t('article2Date')}
                    subtitle={t('article2Subtitle')}
                    title={t('article2Title')}
                    button={t('article2Button')}
                    href={BNNarticlePDF}
                  ></CardArticle>
                </motion.div>
              </motion.div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </Layout>
  );
}

export function Head() {
  return (
    <>
      <html lang='en' />
      <title>Media | Granada Gold Mine</title>
      <meta name='description' content='Media of drill core at Graal and from the Graal property.' />
    </>
  );
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
