import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { AnimatePresence, motion } from 'framer-motion';
import { RiArrowDownSLine, RiMenuFill, RiCloseFill } from 'react-icons/ri';
import { Link, useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import { Popover, PopoverButton, PopoverPanel, Dialog, DialogPanel } from '@headlessui/react';

import Button from '@components/button';
import AlgoliaSearch from '@components/algolia-search';
import { usePageContext } from '@components/page-context';

import logo from '@media/common/logo.png';

const SITE_LANGUAGES = ['en', 'fr'];

const NAV = [
  {
    label: 'header.about',
    items: [
      ['header.aboutOverview', '/about#overview'],
      ['header.directors', '/about#directors'],
    ],
  },
  {
    label: 'header.property',
    items: [
      ['header.propertyOverview', '/property#overview'],
      ['header.project', '/property#project'],
      ['header.geology', '/property#geology'],
      ['header.infrastructure', '/property#infrastructure'],
      ['header.history', '/property#history'],
      ['header.community', '/property#community'],
    ],
  },
  {
    label: 'header.media',
    items: [
      ['header.maps', '/media?tab=0'],
      ['header.images', '/media?tab=1'],
    ],
  },
  {
    label: 'header.investors',
    items: [
      ['header.stockInformation', '/investors#stockInformation'],
      ['header.shareStructure', '/investors#shareStructure'],
      ['header.financials', '/investors#financials'],
      ['header.presentations', '/investors#presentations'],
      ['header.technicalReports', '/investors#technicalReports'],
      ['header.AGM', '/investors#AGM'],
      ['header.analystCoverage', '/investors#analystCoverage'],
    ],
  },
];

function NavDropdown({ label, items }) {
  const { t } = useTranslation();

  return (
    <Popover>
      <PopoverButton className='relative' as='div'>
        {({ hover }) => (
          <>
            <div className='flex cursor-pointer items-center gap-1 py-4 hover:text-primary'>
              {t(label)}
              <RiArrowDownSLine />
            </div>
            {hover && (
              <AnimatePresence>
                <PopoverPanel
                  static
                  as={motion.div}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className='absolute left-1/2 z-50 flex w-max -translate-x-1/2 !transform flex-col gap-3 rounded-lg bg-white p-6 shadow-md'
                >
                  {items.map(([itemLabel, href]) => (
                    <Link className='py-1 hover:text-primary' to={href} key={href}>
                      {t(itemLabel)}
                    </Link>
                  ))}
                </PopoverPanel>
              </AnimatePresence>
            )}
          </>
        )}
      </PopoverButton>
    </Popover>
  );
}

export default function Header() {
  const { t, i18n } = useTranslation();
  const { originalPath } = useI18next();
  const { alternates } = usePageContext();

  // Archive years come from Contentful's Year entries, newest first.
  const newsYears = useStaticQuery(graphql`
    query HeaderNewsYears {
      allContentfulYear(sort: { year: DESC }) {
        nodes {
          year
        }
      }
    }
  `).allContentfulYear.nodes.map(({ year }) => year);

  const [isOpen, setIsOpen] = React.useState(false);
  const [scrollYPosition, setScrollYPosition] = React.useState(0);

  function handleScroll() {
    const newScrollYPosition = window.scrollY;
    setScrollYPosition(newScrollYPosition);
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <>
      <motion.header
        className={`fixed top-0 z-40 flex h-24 w-full items-center bg-white transition-shadow duration-300 ${
          scrollYPosition > 0 ? 'shadow-md' : ''
        }`}
        transition={{ ease: 'linear', duration: 0.3, delay: 0.2 }}
        initial={{ y: '-100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className='container mx-auto flex justify-between px-5 md:px-10'>
          <div className='flex items-center'>
            <Link className='flex' to='/'>
              <img className='h-16 w-auto' src={logo} alt='Granada Gold Mine logo' />
            </Link>
            <div className='ml-4 text-[10px] text-secondary'>
              TSX-V:
              <br />
              GGM
            </div>
          </div>

          <nav className='hidden gap-5 xl:flex'>
            {NAV.map((group) => (
              <NavDropdown key={group.label} {...group} />
            ))}

            <Popover>
              <PopoverButton className='relative' as='div'>
                {({ hover }) => (
                  <>
                    <div className='flex cursor-pointer items-center gap-1 py-4 hover:text-primary'>
                      {t('header.news')}
                      <RiArrowDownSLine />
                    </div>
                    {hover && (
                      <AnimatePresence>
                        <PopoverPanel
                          static
                          as={motion.div}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className={`absolute left-1/2 z-50 w-max -translate-x-1/2 !transform rounded-lg bg-white p-6 shadow-md ${
                            newsYears.length > 8 ? 'grid grid-cols-3 gap-x-8 gap-y-3' : 'flex flex-col gap-3'
                          }`}
                        >
                          {newsYears.map((year) => (
                            <Link className='py-1 hover:text-primary' to={`/news/${year}/`} key={year}>
                              {year}
                            </Link>
                          ))}
                        </PopoverPanel>
                      </AnimatePresence>
                    )}
                  </>
                )}
              </PopoverButton>
            </Popover>
          </nav>

          <div className='flex gap-5'>
            <AlgoliaSearch></AlgoliaSearch>

            <Popover>
              {({ open }) => (
                <>
                  <PopoverButton className='flex items-center gap-1 py-4 outline-none hover:text-primary'>
                    {i18n.language.toUpperCase()}
                    <RiArrowDownSLine />
                  </PopoverButton>

                  <AnimatePresence>
                    {open && (
                      <PopoverPanel
                        static
                        as={motion.div}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        anchor='bottom'
                        className='z-50 flex flex-col gap-3 rounded-lg bg-white p-6 shadow-md'
                      >
                        {SITE_LANGUAGES.map((lang) => (
                          <Link
                            className='cursor-pointer py-1 hover:text-primary'
                            key={lang}
                            language={lang}
                            to={alternates?.[lang] || originalPath}
                          >
                            {lang.toUpperCase()}
                          </Link>
                        ))}
                      </PopoverPanel>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>

            <Button className='hidden self-center md:block' type='primary' href='/contact'>
              {t('header.contactUs')}
            </Button>

            <button className='xl:hidden' onClick={() => setIsOpen(true)} aria-label='Open menu'>
              <RiMenuFill className='size-7' />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <Dialog static open={isOpen} onClose={() => setIsOpen(false)} className='relative z-50'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black/60'
            />
            <div className='fixed inset-0 flex w-screen items-center justify-end'>
              <DialogPanel
                as={motion.div}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{
                  ease: 'linear',
                }}
                className='relative flex size-full max-w-lg flex-col items-start overflow-y-auto bg-white p-10'
              >
                {NAV.map(({ label, items }) => (
                  <React.Fragment key={label}>
                    <div className='py-2'>{t(label)}</div>

                    {items.map(([itemLabel, href]) => (
                      <Link className='py-2 pl-6 hover:text-primary' to={href} key={href} onClick={() => setIsOpen(false)}>
                        {t(itemLabel)}
                      </Link>
                    ))}
                  </React.Fragment>
                ))}

                <div className='cursor-pointer py-2 hover:text-primary'>{t('header.news')}</div>

                <div className='grid grid-cols-3 gap-x-6 pl-6'>
                  {newsYears.map((year) => (
                    <Link className='py-2 hover:text-primary' to={`/news/${year}/`} key={year} onClick={() => setIsOpen(false)}>
                      {year}
                    </Link>
                  ))}
                </div>

                <Button className='mt-8 w-full' type='primary' href='/contact'>
                  {t('header.contactUs')}
                </Button>

                <button className='absolute right-8 top-8' onClick={() => setIsOpen(false)} aria-label='Close menu'>
                  <RiCloseFill className='size-7' />
                </button>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}