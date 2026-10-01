import * as React from 'react';
import { graphql } from 'gatsby';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { enCA, frCA } from 'date-fns/locale';
import { Link } from 'gatsby-plugin-react-i18next';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { TwitterShareButton, LinkedinShareButton, FacebookShareButton } from 'react-share';
import { RiTwitterXFill, RiLinkedinFill, RiFacebookFill, RiTimeLine } from 'react-icons/ri';

import { getShortTitle, getReadingTime } from '@utils/index';
import Layout from '@components/layout';
import RichText from '@components/rich-text';

export default function NewsPost({ data, location }) {
  const { t, i18n } = useTranslation();

  const dateLocale = {
    en: enCA,
    fr: frCA,
  };

  const url = location && location.href;

  const post = data.contentfulPost;
  const allPosts = data.allContentfulPost.edges;

  const nextPost = allPosts.filter((element) => element.node.slug === post.slug)[0]?.next;
  const previousPost = allPosts.filter((element) => element.node.slug === post.slug)[0]?.previous;
  const relatedPosts = allPosts
    .filter((element) => element.node.year.year === post.year.year)
    .filter((element) => element.node.slug !== post.slug)
    .slice(0, 5);

  return (
    <Layout>
      <div className='container mx-auto px-5 pt-36 md:px-10 md:pt-44'>
        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          initial={{ y: '80px', opacity: 0 }}
          whileInView={{ y: '0', opacity: 1 }}
          className='mb-4 flex gap-10'
        >
          <p className='uppercase text-tertiary'>
            {format(post?.publishDate, 'LLLL d, yyyy', { locale: dateLocale[i18n.language] })}
          </p>

          <p className='flex items-center gap-2 text-tertiary'>
            <RiTimeLine />
            {getReadingTime(post?.content?.raw)} {t('postMinRead')}
          </p>
        </motion.div>

        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          initial={{ y: '80px', opacity: 0 }}
          whileInView={{ y: '0', opacity: 1 }}
        >
          <h1 className='mb-4 text-4xl text-secondary'>{post?.title}</h1>

          <p className='text-tertiary'>
            {t('postPublished')} <span className='text-primary'>{post?.year?.year}</span>
          </p>
        </motion.div>
      </div>

      <motion.div
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        initial={{ y: '80px', opacity: 0 }}
        whileInView={{ y: '0', opacity: 1 }}
        className='container mx-auto grid gap-10 px-5 pb-20 pt-10 md:px-10 md:pt-16 lg:grid-cols-8-4'
      >
        <div>
          <div className='rounded-lg bg-white p-5 md:p-16'>
            <img
              className='mb-10 max-h-[400px] w-full rounded-lg object-cover'
              src={post?.heroImage?.file?.url}
              alt={post?.title}
            />

            <RichText content={post?.content}></RichText>
          </div>

          <div>
            <div className='my-16 flex justify-between border-t-2 border-secondary/20 pt-10'>
              <p className='text-tertiary'>{t('postShare')}</p>

              <div className='flex gap-10'>
                <TwitterShareButton url={url} title={post?.title}>
                  <RiTwitterXFill className='size-5' />
                </TwitterShareButton>

                <LinkedinShareButton url={url} quote={post?.title}>
                  <RiLinkedinFill className='size-5' />
                </LinkedinShareButton>

                <FacebookShareButton url={url} quote={post?.title}>
                  <RiFacebookFill className='size-5' />
                </FacebookShareButton>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-6'>
              <Link
                to={`/news/${previousPost?.year?.year}/${previousPost?.slug}`}
                className={`cursor-pointer rounded-lg bg-white p-5 hover:shadow-md md:p-10 ${
                  previousPost ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
              >
                <p className='mb-4 text-tertiary'>{t('postPrevious')}</p>
                <p className='font-medium'>{getShortTitle(previousPost?.title, 50)}</p>
              </Link>
              <Link
                to={`/news/${nextPost?.year?.year}/${nextPost?.slug}`}
                className={`cursor-pointer rounded-lg bg-white p-5 hover:shadow-md md:p-10 ${
                  nextPost ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
              >
                <p className='mb-4 text-right text-tertiary'>{t('postNext')}</p>
                <p className='text-right font-medium'>{getShortTitle(nextPost?.title, 50)}</p>
              </Link>
            </div>
          </div>
        </div>

        <div>
          <h2 className='mb-10 text-3xl text-primary'>{t('relatedPosts')}</h2>

          {relatedPosts &&
            relatedPosts?.map((post, index) => (
              <motion.div
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                initial={{ x: '80px', opacity: 0 }}
                whileInView={{ x: '0', opacity: 1 }}
                className='rounded-lg bg-white px-8 py-10 hover:shadow-md [&:not(:last-child)]:mb-6'
                key={index}
              >
                <div className='mb-4 flex flex-wrap justify-between text-tertiary'>
                  <p className='uppercase'>
                    {format(post?.node?.publishDate, 'LLLL d, yyyy', { locale: dateLocale[i18n.language] })}
                  </p>

                  <p className='flex items-center gap-2'>
                    <RiTimeLine />
                    {getReadingTime(post?.node?.content?.raw)} {t('relatedPostsMinRead')}
                  </p>
                </div>

                <Link className='mb-6 block text-2xl' to={`/news/${post?.node.year?.year}/${post?.node?.slug}`}>
                  {getShortTitle(post?.node?.title, 55)}
                </Link>

                <Link to={`/news/${post?.node?.year?.year}/${post?.node?.slug}`} className='text-primary'>
                  {t('relatedPostsButton')}
                </Link>
              </motion.div>
            ))}
        </div>
      </motion.div>
    </Layout>
  );
}

export function Head({ data, location }) {
  return (
    <>
      <html lang='en' />
      <title>News | {data.contentfulPost.title}</title>
      <meta name='description' content={data.contentfulPost.title} />

      <meta name='twitter:card' content='summary' />
      <meta property='og:url' content={`https://granadagoldmine.com${location.pathname}`} />
      <meta property='og:title' content={data.contentfulPost.title} />
      <meta property='og:description' content={data.contentfulPost.title} />
      <meta
        property='og:image'
        content={`https:${data.contentfulPost.heroImage.file.url}?fit=thumb&w=1200&h=630&fl=progressive&q=75&fm=jpg`}
      />
    </>
  );
}

export const query = graphql`
  query ($language: String!, $slug: String!) {
    locales: allLocale(filter: { ns: { in: ["common", "news-post"] }, language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    contentfulPost(slug: { eq: $slug }) {
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
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            gatsbyImageData
          }
        }
      }
    }
    allContentfulPost(sort: { publishDate: DESC }, filter: { language: { language: { eq: $language } } }) {
      edges {
        node {
          title
          slug
          publishDate
          year {
            year
          }
          content {
            raw
          }
        }
        next {
          title
          slug
          year {
            year
          }
        }
        previous {
          title
          slug
          year {
            year
          }
        }
      }
    }
  }
`;
