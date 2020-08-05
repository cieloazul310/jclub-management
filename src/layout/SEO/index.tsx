import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useSiteMetadata } from '../../utils/graphql-hooks';

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
          content: `${siteMetadata.siteUrl}icons/icon-512x512.png`,
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
      ]}
    />
  );
}

export default Seo;
