import { useStaticQuery, graphql } from 'gatsby';

interface SiteMetadataQuery {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      siteUrl: string;
    };
  };
}

export default function useSiteMetadata(): SiteMetadataQuery['site']['siteMetadata'] {
  const data = useStaticQuery<SiteMetadataQuery>(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `);
  return data.site.siteMetadata;
}
