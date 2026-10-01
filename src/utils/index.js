import { format } from 'date-fns';
import { enCA, frCA } from 'date-fns/locale';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

// Accepts plain text or a Contentful rich-text `raw` JSON string.
export const getReadingTime = (text = '') => {
  let plainText = text || '';
  try {
    plainText = documentToPlainTextString(JSON.parse(plainText));
  } catch {
    // Not rich-text JSON; count the text as given.
  }

  const wordsPerMinute = 300;
  const words = plainText.split(/\s+/).filter(Boolean).length;
  const minutes = words / wordsPerMinute;
  const readTimeInMinutes = Math.ceil(minutes);

  return readTimeInMinutes;
};

export const getShortTitle = (text, length = 60) => {
  if (text?.length < length) {
    return text;
  }

  return `${text?.slice(0, length)}...`.replace(' ...', '...');
};

// Path of a news post without the language prefix (gatsby-plugin-react-i18next's Link adds it).
export const getPostPath = (post) => `/news/${post?.year?.year}/${post?.slug}/`;

// Original publication date as a local calendar date. sourceDate (YYYY-MM-DD) is preferred so the
// displayed day never shifts with the visitor's or build machine's timezone.
export const getPostDate = (post) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(post?.sourceDate || '');
  if (match) return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));

  return post?.publishDate ? new Date(post.publishDate) : null;
};

// Contentful serves protocol-relative asset URLs (//assets.ctfassets.net/...).
export const getAssetUrl = (asset) => {
  const url = asset?.file?.url;
  if (!url) return null;

  return url.startsWith('//') ? `https:${url}` : url;
};

export const isImageAsset = (asset) => Boolean(asset?.file?.contentType?.startsWith('image/'));

// Logos and other small images make poor cropped card photos; show them contained instead.
export const isSmallImage = (asset) => {
  const width = asset?.file?.details?.image?.width;
  const size = asset?.file?.details?.size;

  return width ? width < 600 : Boolean(size && size < 50000);
};

const DATE_FORMATS = {
  en: { pattern: 'LLLL d, yyyy', locale: enCA },
  fr: { pattern: 'd LLLL yyyy', locale: frCA },
};

// "September 28, 2026" / "28 septembre 2026" from the post's original publication date.
export const formatPostDate = (post, language = 'en') => {
  const date = getPostDate(post);
  if (!date) return '';

  const { pattern, locale } = DATE_FORMATS[language] || DATE_FORMATS.en;
  return format(date, pattern, { locale });
};
