// Public build settings shared by Gatsby's page metadata and hosting files.
const configuredUrl = process.env.SITE_URL || process.env.CF_PAGES_URL || 'https://granadagoldmine.com';
const url = new URL(configuredUrl);
if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
  throw new Error('SITE_URL must be an http(s) origin, without a path, credentials, query or fragment.');
}

module.exports = {
  siteUrl: url.origin,
  // Draft builds should remain out of search even if the explicit review flag is omitted.
  reviewMode: process.env.SITE_REVIEW_MODE === 'true' || process.env.CONTENTFUL_HOST === 'preview.contentful.com',
};
