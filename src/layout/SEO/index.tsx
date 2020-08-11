import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useSiteMetadata } from '../../utils/graphql-hooks';
import ogImage from '../../images/og_image.png';
import ogTwitter from '../../images/og_twitter.png';

interface Props {
  title?: string;
  description?: string;
}

function Seo({ title, description }: Props) {
  const siteMetadata = useSiteMetadata();
  return (
    <Helmet
      htmlAttributes={{ lang: 'ja' }}
      title={title || siteMetadata.title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      meta={[
        {
          name: 'description',
          content: description || siteMetadata.description,
        },
        {
          name: 'og:type',
          content: 'website',
        },
        {
          name: 'og:image',
          content: `https://cieloazul310.github.io${ogImage}`,
        },
        {
          name: 'og:title',
          content: title || siteMetadata.title,
        },
        {
          name: 'og:description',
          content: description || siteMetadata.description,
        },
        { name: 'twitter:card', content: 'summary' },
        {
          name: 'twitter:site',
          content: siteMetadata.title,
        },
        {
          name: 'twitter:title',
          content: title ? `${title} | ${siteMetadata.title}` : siteMetadata.title,
        },
        {
          name: 'twitter:description',
          content: description || siteMetadata.description,
        },
        {
          name: 'twitter:image',
          content: `https://cieloazul310.github.io${ogTwitter}`,
        },
      ]}
    />
  );
}

export default Seo;
