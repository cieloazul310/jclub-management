import { useStaticQuery, graphql } from 'gatsby';
import { AllClubsQuery } from '../../../graphql-types';

export function useAllClubs() {
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

export type Clubs = AllClubsQuery['allClubsYaml']['edges'];
