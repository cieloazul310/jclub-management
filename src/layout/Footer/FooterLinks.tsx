import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import AppLink from '../../components/AppLink';
import { useJ1Clubs, useJ2Clubs, useJ3Clubs, useAllYears, Clubs } from '../../utils/graphql-hooks';

const useStyles = makeStyles((theme) =>
  createStyles({
    ul: {
      padding: 0,
      margin: 0,
    },
    li: {
      display: 'inline-block',
      padding: 0,
      margin: theme.spacing(0, 1, 0, 0),
    },
  })
);

interface CategoryLinksProps {
  title: string;
  clubs: Clubs;
}

function CategoryLinks({ title, clubs }: CategoryLinksProps) {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
      <Typography className={classes.ul} component="ul">
        {clubs.map(({ node }, index) => (
          <Typography className={classes.li} key={node.short_name ?? index} variant="body2" component="li">
            <AppLink to="#" color="inherit">
              {node.short_name}
            </AppLink>
          </Typography>
        ))}
      </Typography>
    </div>
  );
}

function YearsLinks() {
  const classes = useStyles();
  const years = useAllYears();

  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        年別
      </Typography>
      <Typography className={classes.ul} component="ul">
        {years.map(({ year, id }, index) => (
          <Typography className={classes.li} key={id ?? index} variant="body2" component="li">
            <AppLink to="#" color="inherit">
              {year}
            </AppLink>
          </Typography>
        ))}
      </Typography>
    </div>
  );
}

function FooterLinks() {
  const j1clubs = useJ1Clubs();
  const j2clubs = useJ2Clubs();
  const j3clubs = useJ3Clubs();
  return (
    <Grid container spacing={2} component="nav">
      <Grid item xs={12} sm={3}>
        <CategoryLinks title="J1" clubs={j1clubs} />
      </Grid>
      <Grid item xs={12} sm={3}>
        <CategoryLinks title="J2" clubs={j2clubs} />
      </Grid>
      <Grid item xs={12} sm={3}>
        <CategoryLinks title="J3" clubs={j3clubs} />
      </Grid>
      <Grid item xs={12} sm={3}>
        <YearsLinks />
      </Grid>
    </Grid>
  );
}

export default FooterLinks;
