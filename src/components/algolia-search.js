import * as React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { RiSearch2Line } from 'react-icons/ri';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useTranslation } from 'gatsby-plugin-react-i18next';
import { Description, Dialog, DialogPanel } from '@headlessui/react';

const DEBOUNCE_TIMEOUT = 500;

export default function AlgoliaSearch() {
  const { t } = useTranslation();

  const hitsPerPage = 10;
  const indexName = 'Posts';

  const [hits, setHits] = React.useState([]);
  const debounceTimeout = React.useRef(null);
  const [searchQuery, setSearchQuery] = React.useState();
  const [isOpenPopup, setIsOpenPopup] = React.useState(false);

  const handleChange = async (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    debounceSearch(value);
  };

  const debounceSearch = (searchQuery) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      search(searchQuery);
    }, DEBOUNCE_TIMEOUT);
  };

  const search = async (query) => {
    try {
      const algoliaClient = algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_KEY);
      const { results } = await algoliaClient.search([
        {
          query,
          indexName,
          params: {
            hitsPerPage,
          },
        },
      ]);

      setHits(results[0].hits);
    } catch (error) {
      setHits([]);
      console.log(error);
    }
  };

  const resetSearch = () => {
    setIsOpenPopup(false);
    setSearchQuery(null);
    setHits([]);
  };

  // Search stays hidden until Granada's Algolia keys are configured.
  if (!process.env.GATSBY_ALGOLIA_APP_ID || !process.env.GATSBY_ALGOLIA_SEARCH_KEY) return null;

  return (
    <div className='flex items-center'>
      <div
        onClick={() => setIsOpenPopup(true)}
        className='cursor-pointer p-1 transition-all hover:text-primary'
        role='presentation'
      >
        <RiSearch2Line className='size-5' />
      </div>

      <AnimatePresence>
        {isOpenPopup && (
          <Dialog static className='relative z-50' open={isOpenPopup} onClose={() => resetSearch()}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black/60'
            />
            <div className='fixed inset-0 flex w-screen items-start justify-center pt-28'>
              <DialogPanel
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className='relative w-full max-w-screen-sm rounded-2xl px-5 md:px-10'
              >
                <div className='mb-2 flex items-center gap-5 rounded-lg bg-white px-6 py-4'>
                  <input
                    onChange={handleChange}
                    className='w-full text-black outline-none placeholder:text-black'
                    placeholder={t('header.searchPlaceholder')}
                  ></input>
                  <RiSearch2Line className='size-5' />
                </div>

                <div className='max-h-[70vh] overflow-hidden overflow-y-auto rounded-lg bg-white md:max-h-[50vh]'>
                  {!searchQuery && <Description className='px-6 py-4'>{t('header.searchDescription')}</Description>}

                  {searchQuery && !hits?.length && (
                    <Description className='px-6 py-4'>
                      {t('header.searchNoResults')} '{searchQuery}'
                    </Description>
                  )}

                  {searchQuery &&
                    hits?.map((hit, index) => {
                      if (!hit) {
                        return null;
                      }

                      return (
                        <Link
                          key={index}
                          to={`/news/${hit.year}/${hit.slug}`}
                          className='block cursor-pointer px-6 py-8 hover:bg-tertiary/10'
                        >
                          <p className='mb-2'>{hit.title}</p>
                          {hit._snippetResult?.content?.value && (
                            <p
                              className='text-sm'
                              dangerouslySetInnerHTML={{ __html: hit._snippetResult.content.value }}
                            ></p>
                          )}
                        </Link>
                      );
                    })}
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
