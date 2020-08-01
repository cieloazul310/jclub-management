import { useStaticQuery, graphql } from 'gatsby';
import { AllYearsQuery } from '../../../graphql-types';

export function useAllYears() {
  const data = useStaticQuery<AllYearsQuery>(graphql`
    query AllYears {
      allYearsYaml {
        nodes {
          year
          id
          categories
        }
      }
    }
  `);
  return data.allYearsYaml.nodes;
}

export type AllYears = AllYearsQuery['allYearsYaml']['nodes'];
