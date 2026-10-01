import * as React from 'react';
import { graphql } from 'gatsby';
import { RiTimeLine } from 'react-icons/ri';
import { Link } from 'gatsby-plugin-react-i18next';
import { useTranslation } from 'gatsby-plugin-react-i18next';

import FallbackImage from '@media/common/banner.jpg';
import {
  getReadingTime,
  getShortTitle,
  formatPostDate,
  getPostPath,
  getAssetUrl,
  isImageAsset,
  isSmallImage,
} from '@utils/index';

export default function CardNews({ post }) {
  const { t, i18n } = useTranslation();

  const href = getPostPath(post);
  const date = formatPostDate(post, i18n.language);
  const hasImage = isImageAsset(post?.heroImage);
  // Small images (e.g. the logo used as a stand-in) are shown whole on white rather than cropped.
  const contained = hasImage && isSmallImage(post.heroImage);

  return (
    <div className='group flex flex-col overflow-hidden rounded-lg bg-white transition-all duration-300 ease-in-out hover:shadow-md'>
      <Link className={`overflow-hidden ${contained ? 'border-b border-tertiary/30' : ''}`} to={href}>
        <img
          className={`h-[240px] w-full transition-all duration-300 ease-in-out group-hover:scale-105 md:h-[324px] ${
            contained ? 'object-contain p-16' : 'object-cover object-top'
          }`}
          src={hasImage ? getAssetUrl(post.heroImage) : FallbackImage}
          alt={post?.heroImage?.description || post?.title || ''}
          loading='lazy'
        />
      </Link>

      <div className='flex flex-col gap-4 px-8 py-10'>
        <div className='flex justify-between text-tertiary'>
          {date && (
            <time className='uppercase' dateTime={post.sourceDate || post.publishDate}>
              {date}
            </time>
          )}

          <div className='flex items-center gap-2'>
            <RiTimeLine />
            {getReadingTime(post?.content?.raw)} {t('cardNewsMinRead')}
          </div>
        </div>

        <Link className='mb-6 text-2xl' to={href}>
          {getShortTitle(post?.title, 60)}
        </Link>

        <Link to={href} className='self-start text-primary'>
          {t('cardNewsButton')}
        </Link>
      </div>
    </div>
  );
}

export const query = graphql`
  fragment NewsCard on ContentfulPost {
    id
    title
    slug
    publishDate
    sourceDate
    year {
      year
    }
    heroImage {
      description
      file {
        url
        contentType
        details
      }
    }
    content {
      raw
    }
  }
`;
