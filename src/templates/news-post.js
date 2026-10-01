import * as React from 'react';
import { graphql } from 'gatsby';
import { motion } from 'framer-motion';
import { Link, useTranslation } from 'gatsby-plugin-react-i18next';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { TwitterShareButton, LinkedinShareButton, FacebookShareButton } from 'react-share';
import { RiTwitterXFill, RiLinkedinFill, RiFacebookFill, RiTimeLine, RiFilePdf2Line } from 'react-icons/ri';

import Layout from '@components/layout';
import RichText from '@components/rich-text';
import Seo, { getLocaleStrings } from '@components/seo';
import {
  getShortTitle,
  getReadingTime,
  formatPostDate,
  getPostPath,
  getAssetUrl,
  isImageAsset,
  isSmallImage,
} from '@utils/index';

export default function NewsPost({ data, location, pageContext }) {
  const { t, i18n } = useTranslation();

  const post = data.contentfulPost;
  const relatedPosts = data.related.nodes;
  const { previous, next } = pageContext;

  const formatDate = (item) => formatPostDate(item, i18n.language);

  const showHero = isImageAsset(post.heroImage) && !isSmallImage(post.heroImage);
  const attachments = (post.attachments || []).filter((asset) => getAssetUrl(asset));
  const url = location?.href;

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
          <time className='uppercase text-tertiary' dateTime={post.sourceDate || post.publishDate}>
            {formatDate(post)}
          </time>

          <p className='flex items-center gap-2 text-tertiary'>
            <RiTimeLine />
            {getReadingTime(post.content?.raw)} {t('postMinRead')}
          </p>
        </motion.div>

        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          initial={{ y: '80px', opacity: 0 }}
          whileInView={{ y: '0', opacity: 1 }}
        >
          <h1 className='mb-4 text-4xl text-secondary'>{post.title}</h1>

          <p className='text-tertiary'>
            {t('postPublished')}{' '}
            <Link className='text-primary' to={`/news/${post.year.year}/`}>
              {post.year.year}
            </Link>
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
        <div className='min-w-0'>
          <div className='rounded-lg bg-white p-5 md:p-16'>
            {showHero && (
              <img
                className='mb-10 max-h-[400px] w-full rounded-lg object-cover'
                src={getAssetUrl(post.heroImage)}
                alt={post.heroImage.description || post.title}
              />
            )}

            <RichText content={post.content}></RichText>
          </div>

          <div>
            <div className='my-16 flex justify-between border-t-2 border-secondary/20 pt-10'>
              <p className='text-tertiary'>{t('postShare')}</p>

              <div className='flex gap-10'>
                <TwitterShareButton url={url} title={post.title}>
                  <RiTwitterXFill className='size-5' />
                </TwitterShareButton>

                <LinkedinShareButton url={url} quote={post.title}>
                  <RiLinkedinFill className='size-5' />
                </LinkedinShareButton>

                <FacebookShareButton url={url} quote={post.title}>
                  <RiFacebookFill className='size-5' />
                </FacebookShareButton>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-6'>
              {previous ? (
                <Link to={previous.path} className='rounded-lg bg-white p-5 hover:shadow-md md:p-10'>
                  <p className='mb-4 text-tertiary'>{t('postPrevious')}</p>
                  <p className='font-medium'>{getShortTitle(previous.title, 50)}</p>
                </Link>
              ) : (
                <div />
              )}

              {next && (
                <Link to={next.path} className='rounded-lg bg-white p-5 hover:shadow-md md:p-10'>
                  <p className='mb-4 text-right text-tertiary'>{t('postNext')}</p>
                  <p className='text-right font-medium'>{getShortTitle(next.title, 50)}</p>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div>
          {attachments.length > 0 && (
            <div className='mb-10 rounded-lg bg-white px-8 py-10'>
              <h2 className='mb-6 text-2xl text-secondary'>{t('postDownloads')}</h2>

              <ul className='grid gap-4'>
                {attachments.map((asset) => (
                  <li key={asset.contentful_id}>
                    <a
                      className='flex items-start gap-3 hover:text-primary'
                      href={getAssetUrl(asset)}
                      target='_blank'
                      rel='noreferrer'
                      type={asset.file.contentType}
                    >
                      <RiFilePdf2Line className='mt-1 size-5 shrink-0 text-primary' />
                      <span className='break-all'>{asset.title || asset.file.fileName}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {relatedPosts.length > 0 && <h2 className='mb-10 text-3xl text-primary'>{t('relatedPosts')}</h2>}

          {relatedPosts.map((related, index) => (
            <motion.div
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              initial={{ x: '80px', opacity: 0 }}
              whileInView={{ x: '0', opacity: 1 }}
              className='rounded-lg bg-white px-8 py-10 hover:shadow-md [&:not(:last-child)]:mb-6'
              key={related.id}
            >
              <div className='mb-4 flex flex-wrap justify-between text-tertiary'>
                <p className='uppercase'>{formatDate(related)}</p>

                <p className='flex items-center gap-2'>
                  <RiTimeLine />
                  {getReadingTime(related.content?.raw)} {t('relatedPostsMinRead')}
                </p>
              </div>

              <Link className='mb-6 block text-2xl' to={getPostPath(related)}>
                {getShortTitle(related.title, 55)}
              </Link>

              <Link to={getPostPath(related)} className='text-primary'>
                {t('relatedPostsButton')}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Layout>
  );
}

export function Head({ data, pageContext }) {
  const post = data.contentfulPost;
  const strings = getLocaleStrings(data, 'news-post');

  let description = post.title;
  try {
    description = documentToPlainTextString(JSON.parse(post.content.raw)).replace(/\s+/g, ' ').trim().slice(0, 160);
  } catch {
    // keep the title
  }

  const image = isImageAsset(post.heroImage) && !isSmallImage(post.heroImage) ? getAssetUrl(post.heroImage) : undefined;
  const hreflang = pageContext.hasCounterpart
    ? pageContext.alternates
    : { [pageContext.language]: pageContext.alternates[pageContext.language] };

  return (
    <Seo
      pageContext={pageContext}
      title={`${strings.metaTitle || 'News'}: ${post.title}`}
      description={description}
      image={image && image.startsWith('http') ? image : undefined}
      type='article'
      alternates={hreflang}
    >
      {post.sourceDate && <meta property='article:published_time' content={post.sourceDate} />}
    </Seo>
  );
}

export const query = graphql`
  query ($id: String!, $language: String!, $relatedIds: [String]) {
    locales: allLocale(filter: { ns: { in: ["common", "news-post"] }, language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    contentfulPost(id: { eq: $id }) {
      title
      slug
      publishDate
      sourceDate
      year {
        year
      }
      heroImage {
        title
        description
        file {
          url
          contentType
          details
        }
      }
      attachments {
        contentful_id
        title
        file {
          url
          fileName
          contentType
        }
      }
      content {
        raw
        references {
          __typename
          contentful_id
          title
          description
          file {
            url
            fileName
            contentType
            details
          }
        }
      }
    }
    related: allContentfulPost(filter: { id: { in: $relatedIds } }, sort: { publishDate: DESC }) {
      nodes {
        id
        title
        slug
        publishDate
        sourceDate
        year {
          year
        }
        content {
          raw
        }
      }
    }
  }
`;
