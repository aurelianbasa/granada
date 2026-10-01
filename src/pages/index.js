import * as React from 'react';
import { graphql } from 'gatsby';
import { Dialog, DialogPanel } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { RiPlayFill, RiFileChartLine, RiMailLine, RiCalendarEventLine } from 'react-icons/ri';

import Layout from '@components/layout';
import Button from '@components/button';
import CardNews from '@components/card-news';
import DataWrapper from '@components/data-wrapper';
import DataCenterMap from '@components/data-center-map';

import HeroImage from '@media/home/hero.webp';
import MetalsImage from '@media/home/metals.webp';
import MetalsProjectImage from '@media/home/metals-project.webp';
import PresentationPDF from '@media/investors/presentation.pdf';

export default function Home({ data }) {
  const { t } = useTranslation();

  const posts = data.allPosts.nodes;
  let [isOpenHeroPopup, setIsOpenHeroPopup] = React.useState(false);

  return (
    <Layout>
      <div
        style={{ '--bg-image-url': `url(${HeroImage})` }}
        className='flex bg-[image:var(--bg-image-url)] bg-cover bg-center'
      >
        <div className='container mx-auto grid items-start gap-5 px-5 pb-10 pt-28 md:gap-10 md:px-10 md:pt-40 lg:grid-cols-2 lg:pt-52'>
          <motion.div
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            initial={{ x: '-80px', opacity: 0 }}
            whileInView={{ x: '0', opacity: 1 }}
            className='order-2 flex flex-col items-start justify-center gap-4 text-left lg:order-1 lg:text-left'
          >
            <Trans parent='h1' i18nKey='heroTitle' className='text-6xl text-white'></Trans>

            <p className='text-2xl text-tertiary'>{t('heroDescription')}</p>

            <button
              className='mt-6 flex items-center gap-2 rounded-lg bg-white px-6 py-4 text-left hover:shadow-button'
              onClick={() => setIsOpenHeroPopup(true)}
            >
              {t('heroButton')}
              <RiPlayFill className='size-4' />
            </button>
          </motion.div>

          <motion.div
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            initial={{ x: '80px', opacity: 0 }}
            whileInView={{ x: '0', opacity: 1 }}
            className='order-1 mx-auto flex max-w-[600px] items-center lg:order-2 lg:max-w-full'
          >
            <img src={MetalsProjectImage} alt='Metals project' />
          </motion.div>
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
          <img className='rounded-lg' src={MetalsImage} alt='Metals' />

          <div className='flex flex-col gap-4'>
            <p className='text-tertiary'>{t('metalsSubTitle')}</p>
            <Trans parent='h2' i18nKey='metalsTitle' className='text-4xl text-secondary'></Trans>
            <Trans parent='p' i18nKey='metalsDescription' className='mt-2'></Trans>

            <Button className='mt-auto w-full self-end md:w-fit' type='primary-outlined' href='/projects/graal'>
              {t('metalsButton')}
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

        <div className='my-6'>
          <DataCenterMap />
        </div>

        <Trans i18nKey='locationDescription'></Trans>
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

              <div className='flex size-20 items-center justify-center rounded-full bg-tertiary/10'>
                <RiFileChartLine className='size-10' />
              </div>
            </div>

            <div className='flex flex-wrap gap-4'>
              <Button className='grow' type='primary' href={PresentationPDF}>
                {t('card1Button1')}
              </Button>
            </div>
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

              <div className='flex size-20 items-center justify-center rounded-full bg-tertiary/10'>
                <RiMailLine className='size-10' />
              </div>
            </div>

            <Button
              className='mt-auto w-full'
              external
              type='primary-outlined'
              href='https://us21.list-manage.com/subscribe?u=e9b6857e0010b1af9e9be9433&id=a13478dbf4'
            >
              {t('card2Button')}
            </Button>
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

              <div className='flex size-20 items-center justify-center rounded-full bg-tertiary/10'>
                <RiCalendarEventLine className='size-10' />
              </div>
            </div>

            <Button
              className='mt-auto w-full'
              external
              type='primary-outlined'
              href='https://calendly.com/aurelianbasa/30-minute-meeting?hide_event_type_details=1&hide_gdpr_banner=1'
            >
              {t('card3Button')}
            </Button>
          </motion.div>
        </div>
      </div>

      <div className='bg-secondary'>
        <div className='container mx-auto grid gap-5 px-5 py-20 md:px-10'>
          <h2 className='text-center text-5xl text-white'>{t('worldTitle')}</h2>

          <div className='relative flex h-24 justify-center overflow-hidden text-6xl text-white'>
            <motion.p
              className='absolute bg-copper'
              animate={{ y: [100, 0, 0, -100] }}
              transition={{ duration: 4, repeatDelay: 16, repeat: Infinity, repeatType: 'loop' }}
            >
              {t('metal1')}
            </motion.p>

            <motion.p
              className='absolute bg-cobalt'
              animate={{ y: [100, 0, 0, -100] }}
              transition={{ duration: 4, delay: 4, repeatDelay: 16, repeat: Infinity, repeatType: 'loop' }}
            >
              {t('metal2')}
            </motion.p>

            <motion.p
              className='absolute bg-nickel'
              animate={{ y: [100, 0, 0, -100] }}
              transition={{ duration: 4, delay: 8, repeatDelay: 16, repeat: Infinity, repeatType: 'loop' }}
            >
              {t('metal3')}
            </motion.p>

            <motion.p
              className='absolute bg-platinum'
              animate={{ y: [100, 0, 0, -100] }}
              transition={{ duration: 4, delay: 12, repeatDelay: 16, repeat: Infinity, repeatType: 'loop' }}
            >
              {t('metal4')}
            </motion.p>

            <motion.p
              className='absolute bg-palladium'
              animate={{ y: [100, 0, 0, -100] }}
              transition={{ duration: 4, delay: 16, repeatDelay: 16, repeat: Infinity, repeatType: 'loop' }}
            >
              {t('metal5')}
            </motion.p>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-5 py-20 md:px-10'>
        <div className='grid gap-16 rounded-2xl bg-secondary p-4 md:p-8'>
          <DataWrapper
            title='Rising Demand for Metals in the Energy Transition'
            src='https://datawrapper.dwcdn.net/y9pkI/6/?transparent=true'
          ></DataWrapper>
          <DataWrapper
            title='Trillions of Potential Energy Transition Revenues'
            src='https://datawrapper.dwcdn.net/EDlXO/2/?transparent=true'
          ></DataWrapper>
        </div>
      </div>

      <div className='container mx-auto grid gap-10 px-5 py-20 md:px-10'>
        <Trans parent='h2' i18nKey='newsTitle' className='text-4xl text-secondary'></Trans>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {posts?.map((post, index) => (
            <motion.div
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              initial={{ y: '80px', opacity: 0 }}
              whileInView={{ y: '0', opacity: 1 }}
              key={index}
            >
              <CardNews
                title={post?.title}
                content={post?.content}
                publishDate={post?.publishDate}
                image={post?.heroImage?.file?.url}
                href={`/news/${post?.year?.year}/${post?.slug}`}
              ></CardNews>
            </motion.div>
          ))}
        </div>

        <Button className='mx-auto w-full md:w-fit' type='secondary' href='/news/2026'>
          {t('newsButton')}
        </Button>
      </div>

      <AnimatePresence>
        {isOpenHeroPopup && (
          <Dialog static open={isOpenHeroPopup} onClose={() => setIsOpenHeroPopup(false)} className='relative z-50'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black/60'
            />
            <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
              <DialogPanel
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className='size-11/12 overflow-hidden rounded-lg'
              >
                <iframe
                  width='100%'
                  height='100%'
                  src='https://www.youtube.com/embed/uREYrLnWZ8E?si=Ysnge27lC_d8CWtG'
                  title='YouTube video player'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  referrerPolicy='strict-origin-when-cross-origin'
                  allowFullScreen
                ></iframe>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </Layout>
  );
}

export function Head() {
  return (
    <>
      <html lang='en' />
      <title>Home | Granada Gold Mine</title>
      <meta
        name='description'
        content='Granada Gold Mine. Building the Next World Class Critical Metals Project along the North American Battery Corridor.'
      />
    </>
  );
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
    allPosts: allContentfulPost(
      limit: 3
      sort: { publishDate: DESC }
      filter: { language: { language: { eq: $language } } }
    ) {
      nodes {
        id
        title
        slug
        publishDate
        year {
          year
        }
        heroImage {
          file {
            url
          }
        }
        content {
          raw
        }
      }
    }
  }
`;
