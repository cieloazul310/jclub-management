import * as React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import FooterLinks from './FooterLinks';
import Copyrights from './Copyrights';
import { ContentBasis } from '../../components/Basis';
import { AdInFooter } from '../../components/Ads';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4, 0),
      background: theme.palette.grey[900],
      color: theme.palette.grey[200],
    },
  })
);

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <ContentBasis>
          <FooterLinks />
        </ContentBasis>
        <ContentBasis>
          <AdInFooter />
        </ContentBasis>
        <ContentBasis>
          <Copyrights />
        </ContentBasis>
      </Container>
    </div>
  );
}

export default Footer;
