import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import Button from '@material-ui/core/Button';
import { useAllYears } from '../../utils/graphql-hooks';

export function YearsLink(): JSX.Element {
  const years = useAllYears();
  return (
    <>
      {years.map(({ year }, index) => (
        <Button key={year ?? index} component={GatsbyLink} to={`/year/${year}/`}>
          {year}
        </Button>
      ))}
    </>
  );
}

export default YearsLink;
