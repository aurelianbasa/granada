import React from 'react';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { renderRichText } from 'gatsby-source-contentful/rich-text';

import { getAssetUrl, isImageAsset } from '@utils/index';

const LEGACY_HOST = /^https?:\/\/(www\.)?granadagoldmine\.com(?=\/|$)/i;

// Contentful's Images API can resize; local fixture files are served as-is.
const imageSrc = (asset, width) => {
  const url = getAssetUrl(asset);
  return url && url.includes('ctfassets.net') ? `${url}?w=${width}&fm=webp&q=80` : url;
};

// Links to the old site become site-relative so they resolve through the legacy redirects.
const linkProps = (uri = '') => {
  if (LEGACY_HOST.test(uri)) {
    return { href: uri.replace(LEGACY_HOST, '') || '/' };
  }

  if (/^(mailto|tel):/i.test(uri) || uri.startsWith('/') || uri.startsWith('#')) {
    return { href: uri };
  }

  return { href: uri, target: '_blank', rel: 'noreferrer' };
};

// Image-only asset hyperlinks (links to an original figure) open the image. News carries no
// downloadable files: any other linked asset renders as its plain text.
function AssetLink({ asset, children }) {
  if (!isImageAsset(asset) || !getAssetUrl(asset)) return <>{children}</>;

  return (
    <a href={getAssetUrl(asset)} target='_blank' rel='noreferrer'>
      {children}
    </a>
  );
}

const cellSpans = (node) => ({
  rowSpan: node.data?.rowspan > 1 ? node.data.rowspan : undefined,
  colSpan: node.data?.colspan > 1 ? node.data.colspan : undefined,
});

const options = {
  renderNode: {
    [BLOCKS.HEADING_2]: (node, children) => <h2 className='text-5xl'>{children}</h2>,
    [BLOCKS.HEADING_3]: (node, children) => <h3 className='text-4xl'>{children}</h3>,
    [BLOCKS.HEADING_4]: (node, children) => <h4 className='text-3xl'>{children}</h4>,
    [BLOCKS.HEADING_5]: (node, children) => <h5 className='text-2xl'>{children}</h5>,
    [BLOCKS.PARAGRAPH]: (node, children) => <p className='text-base'>{children}</p>,

    [BLOCKS.TABLE]: (node, children) => (
      <div className='overflow-x-auto'>
        <table className='min-w-[600px]'>
          <tbody>{children}</tbody>
        </table>
      </div>
    ),
    [BLOCKS.TABLE_ROW]: (node, children) => <tr>{children}</tr>,
    [BLOCKS.TABLE_CELL]: (node, children) => <td {...cellSpans(node)}>{children}</td>,
    [BLOCKS.TABLE_HEADER_CELL]: (node, children) => <th {...cellSpans(node)}>{children}</th>,

    // Inline figures only; non-image assets are never rendered as downloads.
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const asset = node.data.target;
      if (!isImageAsset(asset) || !getAssetUrl(asset)) return null;

      return (
        <figure>
          <img
            className='mx-auto rounded-lg'
            src={imageSrc(asset, 1400)}
            alt={asset.description || asset.title || ''}
            loading='lazy'
          />
        </figure>
      );
    },

    [INLINES.ASSET_HYPERLINK]: (node, children) => <AssetLink asset={node.data.target}>{children}</AssetLink>,

    // Historical PDF addresses stay as plain text rather than links.
    [INLINES.HYPERLINK]: (node, children) =>
      /\.pdf($|[?#])/i.test(node.data.uri || '') ? <>{children}</> : <a {...linkProps(node.data.uri)}>{children}</a>,
  },
};

export default function RichText({ content }) {
  return <div className='rich-text grid gap-8'>{content && renderRichText(content, options)}</div>;
}
