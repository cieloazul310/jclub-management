import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import Button from '@material-ui/core/Button';

import { useJ1Clubs, useJ2Clubs, useJ3Clubs, Clubs } from '../../utils/graphql-hooks';

interface Props {
  category: string;
}

export function CategoryLink({ category }: Props) {
  return category === 'J1' ? <J1Link /> : category === 'J2' ? <J2Link /> : category === 'J3' ? <J3Link /> : null;
}

interface CategoryLinkCoreProps {
  clubs: Clubs;
}

export function CategoryLinkCore({ clubs }: CategoryLinkCoreProps) {
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

export function J1Link() {
  const clubs = useJ1Clubs();
  return <CategoryLinkCore clubs={clubs} />;
}

export function J2Link() {
  const clubs = useJ2Clubs();
  return <CategoryLinkCore clubs={clubs} />;
}

export function J3Link() {
  const clubs = useJ3Clubs();
  return <CategoryLinkCore clubs={clubs} />;
}
