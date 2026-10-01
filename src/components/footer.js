import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { RiCloseFill, RiTwitterXFill, RiLinkedinFill, RiFacebookFill, RiYoutubeFill } from 'react-icons/ri';

import SubscribeForm from '@components/subscribe-form';

import logo from '@media/common/logo.svg';
import logoRA from '@media/common/logo-resource-active.svg';

export default function Footer() {
  const { t } = useTranslation();

  let [isOpenDisclaimer, setIsOpenDisclaimer] = React.useState(false);
  let [isOpenDisclosure, setIsOpenDisclosure] = React.useState(false);
  let [isOpenLandAck, setIsOpenLandAck] = React.useState(false);
  let [isOpenGovernance, setIsOpenGovernance] = React.useState(false);

  return (
    <footer className='grid gap-10 bg-white py-10 lg:gap-20'>
      <div className='container mx-auto grid gap-10 px-5 py-10 lg:grid-cols-2 lg:gap-0 lg:px-10'>
        <div className='flex flex-col items-center gap-10 lg:items-start'>
          <Link className='flex' to='/'>
            <img className='min-w-40 lg:min-w-48' src={logo} alt='Granada Gold Mine logo' />
          </Link>

          <SubscribeForm></SubscribeForm>
        </div>

        <div className='grid gap-5 lg:grid-cols-3 lg:gap-0'>
          <div className='flex flex-row items-end justify-center gap-4 lg:flex-col lg:justify-start'>
            <p className='hidden text-tertiary lg:block'>{t('footer.links')}</p>

            <Link className='hover:text-primary' to='/'>
              {t('footer.home')}
            </Link>
            <Link className='hover:text-primary' to='/about'>
              {t('footer.about')}
            </Link>
            <Link className='hover:text-primary' to='/projects/graal'>
              {t('footer.projects')}
            </Link>
            <Link className='hover:text-primary' to='/investors'>
              {t('footer.investors')}
            </Link>
          </div>

          <div className='flex flex-row items-end justify-center gap-4 lg:flex-col lg:justify-start'>
            <p className='hidden text-tertiary lg:block'>{t('footer.legal')}</p>

            <Link className='hover:text-primary' to='/contact'>
              {t('footer.contact')}
            </Link>

            <button onClick={() => setIsOpenDisclaimer(true)} className='cursor-pointer hover:text-primary'>
              {t('footer.disclaimer')}
            </button>
            <button onClick={() => setIsOpenDisclosure(true)} className='cursor-pointer hover:text-primary'>
              {t('footer.disclosure')}
            </button>
            <button onClick={() => setIsOpenLandAck(true)} className='cursor-pointer hover:text-primary'>
              {t('footer.landAck')}
            </button>
            <button onClick={() => setIsOpenGovernance(true)} className='cursor-pointer hover:text-primary'>
              {t('footer.governance')}
            </button>
          </div>

          <div className='flex flex-row items-end justify-center gap-4 lg:flex-col lg:justify-start'>
            <p className='hidden text-tertiary lg:block'>{t('footer.social')}</p>

            <a
              className='flex flex-col items-center gap-2 hover:text-primary lg:flex-row'
              href='https://twitter.com/coniagasmetals'
              target='_blank'
              rel='noreferrer'
            >
              <RiTwitterXFill className='size-6' />
              {t('footer.x')}
            </a>
            <a
              className='flex flex-col items-center gap-2 hover:text-primary lg:flex-row'
              href='https://www.linkedin.com/company/coniagas-battery-metals/'
              target='_blank'
              rel='noreferrer'
            >
              <RiLinkedinFill className='size-6' />
              {t('footer.linkedIn')}
            </a>
            <a
              className='flex flex-col items-center gap-2 hover:text-primary lg:flex-row'
              href='https://www.facebook.com/coniagas/'
              target='_blank'
              rel='noreferrer'
            >
              <RiFacebookFill className='size-6' />
              {t('footer.facebook')}
            </a>
            <a
              className='flex flex-col items-center gap-2 hover:text-primary lg:flex-row'
              href='https://www.youtube.com/@coniagasbatterymetals'
              target='_blank'
              rel='noreferrer'
            >
              <RiYoutubeFill className='size-6' />
              {t('footer.youtube')}
            </a>
          </div>
        </div>
      </div>

      <div className='container mx-auto flex flex-col justify-center gap-2 lg:flex-row lg:gap-10'>
        <p className='text-center text-tertiary'>{t('footer.copyright')}</p>
        <a
          className='flex justify-center gap-2 hover:text-primary'
          href='https://www.resourceactive.com/documentation'
          target='_blank'
          rel='noreferrer'
        >
          <img className='w-4' src={logoRA} alt='Resource Active logo' />
          <p>{t('footer.resourceActive')}</p>
        </a>
      </div>

      <AnimatePresence>
        {isOpenDisclaimer && (
          <Dialog static open={isOpenDisclaimer} onClose={() => setIsOpenDisclaimer(false)} className='relative z-50'>
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
                className='relative max-w-2xl rounded-2xl bg-white p-8 md:p-16'
              >
                <RiCloseFill
                  className='absolute right-4 top-4 size-8 cursor-pointer md:right-8 md:top-8'
                  onClick={() => setIsOpenDisclaimer(false)}
                />

                <DialogTitle className='mb-8 text-4xl'>{t('footer.disclaimerHeader')}</DialogTitle>

                <div className='h-[70vh] overflow-hidden overflow-y-auto pr-4 md:pr-8'>
                  <Description as='div'>
                    <Trans i18nKey='footer.disclaimerText'></Trans>
                  </Description>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpenDisclosure && (
          <Dialog static open={isOpenDisclosure} onClose={() => setIsOpenDisclosure(false)} className='relative z-50'>
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
                className='relative max-w-2xl rounded-2xl bg-white p-8 md:p-16'
              >
                <RiCloseFill
                  className='absolute right-4 top-4 size-8 cursor-pointer md:right-8 md:top-8'
                  onClick={() => setIsOpenDisclosure(false)}
                />

                <DialogTitle className='mb-8 text-4xl'>{t('footer.disclosureHeader')}</DialogTitle>

                <div className='h-[70vh] overflow-hidden overflow-y-auto pr-4 md:pr-8'>
                  <Description as='div'>
                    <Trans i18nKey='footer.disclosureText'></Trans>
                  </Description>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpenLandAck && (
          <Dialog static open={isOpenLandAck} onClose={() => setIsOpenLandAck(false)} className='relative z-50'>
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
                className='relative max-w-2xl rounded-2xl bg-white p-8 md:p-16'
              >
                <RiCloseFill
                  className='absolute right-4 top-4 size-8 cursor-pointer md:right-8 md:top-8'
                  onClick={() => setIsOpenLandAck(false)}
                />

                <DialogTitle className='mb-8 text-4xl'>{t('footer.landAckHeader')}</DialogTitle>

                <div className='max-h-[70vh] overflow-hidden overflow-y-auto pr-4 md:pr-8'>
                  <Description as='div'>
                    <Trans i18nKey='footer.landAckText'></Trans>
                  </Description>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpenGovernance && (
          <Dialog static open={isOpenGovernance} onClose={() => setIsOpenGovernance(false)} className='relative z-50'>
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
                className='relative max-w-2xl rounded-2xl bg-white p-8 md:p-16'
              >
                <RiCloseFill
                  className='absolute right-4 top-4 size-8 cursor-pointer md:right-8 md:top-8'
                  onClick={() => setIsOpenGovernance(false)}
                />

                <DialogTitle className='mb-8 text-4xl'>{t('footer.governanceHeader')}</DialogTitle>

                <div className='max-h-[70vh] overflow-hidden overflow-y-auto pr-4 md:pr-8'>
                  <Description as='div'>
                    <Trans
                      i18nKey='footer.governanceText'
                      components={{
                        teamLink: <Link className='text-primary hover:underline' to='/about' />,
                        contactLink: <Link className='text-primary hover:underline' to='/contact' />,
                        landAckLink: (
                          <button
                            type='button'
                            className='cursor-pointer text-primary hover:underline'
                            onClick={() => {
                              setIsOpenGovernance(false);
                              setIsOpenLandAck(true);
                            }}
                          />
                        ),
                        sedarLink: (
                          <a
                            className='text-primary hover:underline'
                            href='https://www.sedarplus.ca/'
                            target='_blank'
                            rel='noreferrer'
                          />
                        ),
                      }}
                    ></Trans>
                  </Description>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </footer>
  );
}
