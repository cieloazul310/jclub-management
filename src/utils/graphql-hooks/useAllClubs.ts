import { useStaticQuery, graphql } from 'gatsby';
import { AllClubsQuery } from '../../../graphql-types';

export default function useAllClubs(): AllClubsQuery['allClubsYaml']['edges'] {
  const data = useStaticQuery<AllClubsQuery>(graphql`
    query AllClubs {
      allClubsYaml {
        edges {
          node {
            id
            slug
            name
            short_name
            fullname
            category
            company
            hometown
            area
            relatedCompanies
            settlement
          }
        }
      }
    }
  `);
  return data.allClubsYaml.edges;
}
