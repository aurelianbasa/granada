import * as React from 'react';
import { graphql } from 'gatsby';
import {
  RiPhoneLine,
  RiHotelLine,
  RiMailSendLine,
  RiErrorWarningLine,
  RiGitRepositoryLine,
  RiCheckboxCircleLine,
  RiMapPinLine,
} from 'react-icons/ri';
import { motion } from 'framer-motion';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';

import Layout from '@components/layout';
import Seo, { getLocaleStrings } from '@components/seo';

import BannerImage from '@media/common/banner.jpg';

export default function Contact() {
  const { t } = useTranslation();

  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isFormVisible, setIsFormVisible] = React.useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('form-name', 'Contact');

    try {
      const formId = process.env.GATSBY_FORMSPREE_CONTACT_ID;
      if (!formId) throw new Error('GATSBY_FORMSPREE_CONTACT_ID is not set');

      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      setIsFormVisible(false);

      if (response.status === 200) {
        setIsSuccess(true);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.log(error.message);
      setIsError(true);
    }
  };

  return (
    <Layout>
      <div className='container mx-auto grid gap-10 px-5 pb-10 pt-36 md:gap-16 md:px-10 md:pb-20 md:pt-44 lg:grid-cols-2'>
        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          initial={{ x: '-80px', opacity: 0 }}
          whileInView={{ x: '0', opacity: 1 }}
          className='flex flex-col justify-center gap-10 py-0 lg:py-10'
        >
          <div className='grid gap-4'>
            <p className='text-tertiary'>{t('contactSubtitle')}</p>
            <h1 className='mb-4 text-4xl text-secondary'>{t('contactTitle')}</h1>
            <p>{t('contactDescription')}</p>
          </div>
          <div className='grid gap-4 text-secondary'>
            <div className='flex items-center gap-6'>
              <div className='flex size-10 items-center justify-center rounded-full bg-tertiary/10 md:size-20'>
                <RiGitRepositoryLine className='size-5 md:size-10' />
              </div>

              <Trans i18nKey='contactName' className='font-semibold'></Trans>
            </div>

            <div className='flex items-center gap-6'>
              <div className='flex size-10 items-center justify-center rounded-full bg-tertiary/10 md:size-20'>
                <RiPhoneLine className='size-5 md:size-10' />
              </div>
              <a className='font-semibold' href='tel:416-710-2410'>
                {t('contactPhone')}
              </a>
            </div>

            <div className='flex items-center gap-6'>
              <div className='flex size-10 items-center justify-center rounded-full bg-tertiary/10 md:size-20'>
                <RiMailSendLine className='size-5 md:size-10' />
              </div>
              <a className='font-semibold' href='mailto:waynecheveldayoff@gmail.com'>
                {t('contactEmail')}
              </a>
            </div>
          </div>

        </motion.div>

        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          initial={{ x: '80px', opacity: 0 }}
          whileInView={{ x: '0', opacity: 1 }}
          className='flex min-h-[600px] flex-col gap-6 rounded-2xl bg-white p-5 md:p-10'
        >
          <div className='grid gap-4'>
            <p className='text-tertiary'>{t('formSubtitle')}</p>
            <Trans parent='h2' i18nKey='formTitle' className='mb-4 text-4xl text-secondary'></Trans>
            <p>{t('formDescription')}</p>
          </div>

          <div className='grid grow'>
            {isFormVisible && (
              <form className='grid gap-4' onSubmit={handleSubmit}>
                <input
                  className='w-full rounded-lg border border-black bg-transparent px-6 py-4 outline-0 placeholder:text-tertiary focus:border-primary'
                  name='name'
                  placeholder={t('formName')}
                  required
                />

                <input
                  className='w-full rounded-lg border border-black bg-transparent px-6 py-4 outline-0 placeholder:text-tertiary focus:border-primary'
                  name='_replyto'
                  placeholder={t('formEmail')}
                  type='email'
                  required
                />

                <input
                  className='w-full rounded-lg border border-black bg-transparent px-6 py-4 outline-0 placeholder:text-tertiary focus:border-primary'
                  name='location'
                  placeholder={t('formLocation')}
                  required
                />

                <input
                  className='w-full rounded-lg border border-black bg-transparent px-6 py-4 outline-0 placeholder:text-tertiary focus:border-primary'
                  name='subject'
                  placeholder={t('formSubject')}
                  required
                />

                <textarea
                  className='min-h-36 rounded-lg border border-black px-6 py-4 outline-0 placeholder:text-tertiary focus:border-primary'
                  name='message'
                  placeholder={t('formMessage')}
                  required
                ></textarea>

                <button
                  className='mt-2 rounded-lg bg-primary px-6 py-4 text-white hover:shadow-button md:w-fit'
                  type='submit'
                >
                  {t('formButton')}
                </button>
              </form>
            )}

            {isSuccess && (
              <div className='flex grow flex-col items-center justify-center gap-6 text-center'>
                <RiCheckboxCircleLine className='size-20 text-primary' />
                {t('formSuccessMessage')}
              </div>
            )}

            {isError && (
              <div className='flex grow flex-col items-center justify-center gap-6 text-center'>
                <RiErrorWarningLine className='size-20 text-primary' />
                {t('formErrorMessage')}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <div
        style={{ '--bg-image-url': `url(${BannerImage})` }}
        className={`bg-[image:var(--bg-image-url)] bg-cover bg-center py-20`}
      >
        <div className='container mx-auto grid gap-6 px-5 md:grid-cols-2 md:px-10'>
          <motion.div
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            initial={{ x: '80px', opacity: 0 }}
            whileInView={{ x: '0', opacity: 1 }}
            className='rounded-lg bg-white p-5 md:p-10'
          >
            <div className='mb-4 flex items-center justify-between gap-6 text-secondary'>
              <div>
                <p className='text-2xl'>{t('miningOffice')}</p>
                <p className='text-tertiary'>{t('miningOfficeSubtitle')}</p>
              </div>
              <div className='flex size-20 shrink-0 items-center justify-center rounded-full bg-tertiary/10'>
                <RiMapPinLine className='size-10' />
              </div>
            </div>

            <Trans i18nKey='miningOfficeAddress' className='mb-6'></Trans>

            <p>
              <a className='hover:text-primary' href='tel:+18197974144'>
                {t('miningOfficePhone1')}
              </a>
            </p>
            <p>
              <a className='hover:text-primary' href='tel:+18197622306'>
                {t('miningOfficePhone2')}
              </a>
            </p>
          </motion.div>

          <motion.div
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            initial={{ x: '80px', opacity: 0 }}
            whileInView={{ x: '0', opacity: 1 }}
            className='rounded-lg bg-secondary p-5 text-white md:p-10'
          >
            <div className='mb-4 flex items-center justify-between gap-6'>
              <p className='text-2xl'>{t('office')}</p>
              <div className='flex size-20 shrink-0 items-center justify-center rounded-full bg-tertiary/10 text-tertiary'>
                <RiHotelLine className='size-10' />
              </div>
            </div>

            <Trans i18nKey='officeAddress' className='mb-6'></Trans>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

export function Head({ data, pageContext }) {
  const strings = getLocaleStrings(data, 'contact');

  return <Seo pageContext={pageContext} title={strings.metaTitle} description={strings.metaDescription} />;
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { ns: { in: ["common", "contact"] }, language: { eq: $language } }) {
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