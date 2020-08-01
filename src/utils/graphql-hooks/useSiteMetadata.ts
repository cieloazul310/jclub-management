import { useStaticQuery, graphql } from 'gatsby';
//import { SiteSiteMetadata } from '../../../graphql-types';

export function useSiteMetadata() {
  const data = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return data.site.siteMetadata;
}
