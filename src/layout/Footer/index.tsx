import * as React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import FooterLinks from './FooterLinks';
import Copyrights from './Copyrights';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4, 0),
      background: theme.palette.grey[900],
      color: theme.palette.grey[200],
    },
    item: {
      padding: theme.spacing(2, 0),
    },
  })
);

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <div className={classes.item}>
          <FooterLinks />
        </div>
        <div className={classes.item}>
          <Copyrights />
        </div>
      </Container>
    </div>
  );
}

export default Footer;
