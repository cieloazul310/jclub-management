import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    content: {
      paddingTop: 64,
    },
  })
);

interface Props {
  children: JSX.Element | JSX.Element[] | (JSX.Element | JSX.Element[])[];
  title?: string;
}

function Layout({ children, title }: Props) {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="h1">
            {title ?? 'Title'}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>{children}</div>
    </div>
  );
}

export default Layout;
