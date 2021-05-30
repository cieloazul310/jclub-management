import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import Button from '@material-ui/core/Button';

import { useJ1Clubs, useJ2Clubs, useJ3Clubs, Clubs } from '../../utils/graphql-hooks';

interface CategoryLinkCoreProps {
  clubs: Clubs;
}

export function CategoryLinkCore({ clubs }: CategoryLinkCoreProps): JSX.Element {
  return (
    <>
      {clubs.map(({ node }, index) => (
        <Button key={node.id ?? index} component={GatsbyLink} to={`/club/${node.slug}/`}>
          {node.short_name}
        </Button>
      ))}
    </>
  );
}

export function J1Link(): JSX.Element {
  const clubs = useJ1Clubs();
  return <CategoryLinkCore clubs={clubs} />;
}

export function J2Link(): JSX.Element {
  const clubs = useJ2Clubs();
  return <CategoryLinkCore clubs={clubs} />;
}

export function J3Link(): JSX.Element {
  const clubs = useJ3Clubs();
  return <CategoryLinkCore clubs={clubs} />;
}

interface Props {
  category: string;
}

export function CategoryLink({ category }: Props): JSX.Element | null {
  if (category === 'J1') return <J1Link />;
  if (category === 'J2') return <J2Link />;
  if (category === 'J3') return <J3Link />;
  return null;
}
