import * as React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(8, 0),
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
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle2">J1</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle2">J2</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle2">J3</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="subtitle2">年別</Typography>
          </Grid>
        </Grid>
        <div>
          <Typography variant="body2">Copyright</Typography>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
