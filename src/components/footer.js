import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { RiCloseFill, RiTwitterXFill, RiLinkedinFill, RiFacebookFill } from 'react-icons/ri';

import SubscribeForm from '@components/subscribe-form';

import logo from '@media/common/logo.png';
import logoRA from '@media/common/logo-resource-active.svg';

const SOCIAL = [
  { key: 'footer.facebook', href: 'https://www.facebook.com/granadagoldmineinc/', Icon: RiFacebookFill },
  { key: 'footer.x', href: 'https://twitter.com/granadagold', Icon: RiTwitterXFill },
  { key: 'footer.linkedIn', href: 'https://www.linkedin.com/company/16205211/', Icon: RiLinkedinFill },
];

function LegalDialog({ open, onClose, title, textKey }) {
  return (
    <AnimatePresence>
      {open && (
        <Dialog static open={open} onClose={onClose} className='relative z-50'>
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
              <RiCloseFill className='absolute right-4 top-4 size-8 cursor-pointer md:right-8 md:top-8' onClick={onClose} />

              <DialogTitle className='mb-8 text-4xl'>{title}</DialogTitle>

              <div className='max-h-[70vh] overflow-hidden overflow-y-auto pr-4 md:pr-8'>
                <Description as='div'>
                  <Trans i18nKey={textKey}></Trans>
                </Description>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

export default function Footer() {
  const { t } = useTranslation();

  let [isOpenDisclaimer, setIsOpenDisclaimer] = React.useState(false);
  let [isOpenPrivacy, setIsOpenPrivacy] = React.useState(false);

  return (
    <footer className='grid gap-10 bg-white py-10 lg:gap-20'>
      <div className='container mx-auto grid gap-10 px-5 py-10 lg:grid-cols-2 lg:gap-0 lg:px-10'>
        <div id='subscribe' className='flex scroll-mt-32 flex-col items-center gap-10 lg:items-start'>
          <Link className='flex' to='/'>
            <img className='h-20 w-auto' src={logo} alt='Granada Gold Mine logo' />
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
            <Link className='hover:text-primary' to='/property'>
              {t('footer.property')}
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
            <button onClick={() => setIsOpenPrivacy(true)} className='cursor-pointer hover:text-primary'>
              {t('footer.privacy')}
            </button>
          </div>

          <div className='flex flex-row items-end justify-center gap-4 lg:flex-col lg:justify-start'>
            <p className='hidden text-tertiary lg:block'>{t('footer.social')}</p>
            {SOCIAL.map(({ key, href, Icon }) => (
              <a
                className='flex flex-col items-center gap-2 hover:text-primary lg:flex-row'
                href={href}
                target='_blank'
                rel='noreferrer'
                key={key}
              >
                <Icon className='size-6' />
                {t(key)}
              </a>
            ))}
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

      <LegalDialog
        open={isOpenDisclaimer}
        onClose={() => setIsOpenDisclaimer(false)}
        title={t('footer.disclaimerHeader')}
        textKey='footer.disclaimerText'
      />
      <LegalDialog
        open={isOpenPrivacy}
        onClose={() => setIsOpenPrivacy(false)}
        title={t('footer.privacyHeader')}
        textKey='footer.privacyText'
      />
    </footer>
  );
}
