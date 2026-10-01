import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import BannerImage from '@media/common/banner.jpg';

const OG_LOCALES = { en: 'en_CA', fr: 'fr_CA' };

const withLanguage = (language, originalPath) => (language === 'en' ? originalPath : `/${language}${originalPath}`);

// Page-namespace strings for use in Gatsby's Head API, which renders outside the i18next provider.
export const getLocaleStrings = (data, ns) => {
  const node = data?.locales?.edges?.find((edge) => edge.node.ns === ns)?.node;
  try {
    return node ? JSON.parse(node.data) : {};
  } catch {
    return {};
  }
};

/**
 * Document head for every page: language, localized title/description, canonical URL,
 * hreflang alternates and Open Graph tags.
 *
 * `alternates` maps language -> path without language prefix. Defaults to the same page in
 * every site language; pass only the languages a page really exists in (e.g. news posts).
 */
export default function Seo({ pageContext, title, description, image, type = 'website', alternates, children }) {
  const { site } = useStaticQuery(graphql`
    query SeoSiteSettings {
      site {
        siteMetadata {
          siteUrl
          reviewMode
        }
      }
    }
  `);
  const SITE_URL = site.siteMetadata.siteUrl;
  const language = pageContext?.language || 'en';
  const originalPath = pageContext?.i18n?.originalPath || '/';
  const pagePath = withLanguage(language, originalPath);
  const languageAlternates = alternates || { en: originalPath, fr: originalPath };
  const fullTitle = title ? `${title} | Granada Gold Mine` : 'Granada Gold Mine';
  const imageUrl = image || `${SITE_URL}${BannerImage}`;

  return (
    <>
      <html lang={language} />
      <title>{fullTitle}</title>
      {site.siteMetadata.reviewMode && <meta name='robots' content='noindex, nofollow, noarchive' />}
      {description && <meta name='description' content={description} />}

      <link rel='canonical' href={`${SITE_URL}${pagePath}`} />
      {Object.entries(languageAlternates).map(([lng, path]) => (
        <link rel='alternate' hrefLang={lng} href={`${SITE_URL}${withLanguage(lng, path)}`} key={lng} />
      ))}
      {languageAlternates.en && <link rel='alternate' hrefLang='x-default' href={`${SITE_URL}${languageAlternates.en}`} />}

      <meta property='og:site_name' content='Granada Gold Mine Inc.' />
      <meta property='og:type' content={type} />
      <meta property='og:title' content={title || fullTitle} />
      {description && <meta property='og:description' content={description} />}
      <meta property='og:url' content={`${SITE_URL}${pagePath}`} />
      <meta property='og:locale' content={OG_LOCALES[language]} />
      <meta property='og:image' content={imageUrl} />
      <meta name='twitter:card' content='summary_large_image' />

      {children}
    </>
  );
}
