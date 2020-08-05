import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import AppLink from '../../components/AppLink';
import { useSiteMetadata } from '../../utils/graphql-hooks';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      textAlign: 'center',
    },
  })
);

function Copyrights() {
  const classes = useStyles();
  const { title } = useSiteMetadata();
  return (
    <div className={classes.root}>
      <Typography variant="body1" gutterBottom>
        <AppLink to="/" color="inherit">
          {title}
        </AppLink>
      </Typography>
      <Typography variant="body2">
        © {new Date().getFullYear()} cieloazul310 All rights reserved. Built with
        {` `}
        <MuiLink color="inherit" href="https://www.gatsbyjs.org" target="_blank" rel="noopener noreferrer">
          Gatsby
        </MuiLink>
      </Typography>
    </div>
  );
}

export default Copyrights;
