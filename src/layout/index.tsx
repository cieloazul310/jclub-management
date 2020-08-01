import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Fab from '@material-ui/core/Fab';
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import MenuIcon from '@material-ui/icons/Menu';
import AppBarInner from './AppBarInner';
import DrawerInner from './DrawerInner';
import Footer from './Footer';

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

const useStyles = makeStyles((theme) =>
  createStyles({
    appbar: {
      background: theme.palette.type === 'dark' ? theme.palette.common.black : undefined,
      color: theme.palette.type === 'dark' ? theme.palette.common.white : undefined,
    },
    content: {
      paddingTop: 64,
      [theme.breakpoints.only('xs')]: {
        paddingTop: 56,
      },
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

interface Props {
  children: JSX.Element | JSX.Element[] | (JSX.Element | JSX.Element[])[];
  drawerContents?: JSX.Element | JSX.Element[] | (JSX.Element | JSX.Element[])[];
  title?: string;
}

function Layout({ children, drawerContents, title }: Props) {
  const classes = useStyles();
  const trigger = useScrollTrigger();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const _setDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };
  const _toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar className={classes.appbar}>
          <AppBarInner title={title} onLeftButtonClick={_toggleDrawer} />
        </AppBar>
      </Slide>
      <div className={classes.content}>
        <main>{children}</main>
      </div>
      <Footer />
      <SwipeableDrawer
        open={drawerOpen}
        onClose={_setDrawer(false)}
        onOpen={_setDrawer(true)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <DrawerInner onCloseIconClick={_setDrawer(false)} drawerContents={drawerContents} />
      </SwipeableDrawer>
      <div className={classes.fab}>
        <Tooltip title="メニュー">
          <Fab color="secondary" onClick={_toggleDrawer}>
            <MenuIcon />
          </Fab>
        </Tooltip>
      </div>
    </div>
  );
}

export default Layout;
