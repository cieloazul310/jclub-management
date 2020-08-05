import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Layout from '../layout';
import AppLink from '../components/AppLink';
import { useJ1Clubs, useJ2Clubs, useJ3Clubs, useAllYears, Clubs } from '../utils/graphql-hooks';

interface CategoryLinksProps {
  title: string;
  clubs: Clubs;
}

export function CategoryLinks({ title, clubs }: CategoryLinksProps) {
  return (
    <div>
      <Typography variant="subtitle2" gutterBottom>
        {title}
      </Typography>
      {clubs.map(({ node }, index) => (
        <Button key={node.id ?? index} component={GatsbyLink} to={`/club/${node.slug}/`}>
          {node.short_name}
        </Button>
      ))}
    </div>
  );
}

export function YearsLinks() {
  const years = useAllYears();
  return (
    <div>
      <Typography variant="subtitle2" gutterBottom>
        年度別
      </Typography>
      {years.map(({ year }, index) => (
        <Button key={year ?? index} component={GatsbyLink} to={`/year/${year}/`}>
          {year}
        </Button>
      ))}
    </div>
  );
}

function IndexPage() {
  const j1clubs = useJ1Clubs();
  const j2clubs = useJ2Clubs();
  const j3clubs = useJ3Clubs();
  return (
    <Layout title="Jクラブ経営情報2005-2019">
      <Container maxWidth="md">
        <Typography variant="h4" component="h2" gutterBottom>
          Jクラブ経営情報2005-2019
        </Typography>
        <Grid container component="nav">
          <Grid item xs={12} sm={3}>
            <CategoryLinks clubs={j1clubs} title="J1" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CategoryLinks clubs={j2clubs} title="J2" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CategoryLinks clubs={j3clubs} title="J3" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <YearsLinks />
          </Grid>
        </Grid>
        <AppLink to="/page-2/">Go to page 2</AppLink>
        <AppLink to="/using-typescript/">Go to "Using TypeScript"</AppLink>
      </Container>
    </Layout>
  );
}
export default IndexPage;
