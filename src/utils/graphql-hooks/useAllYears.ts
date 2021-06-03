import { useStaticQuery, graphql } from 'gatsby';
import { AllYearsQuery } from '../../../graphql-types';

export default function useAllYears(): AllYearsQuery['allYearsYaml']['nodes'] {
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
