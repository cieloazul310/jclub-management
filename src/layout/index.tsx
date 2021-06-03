import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Fab from '@material-ui/core/Fab';
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import MenuIcon from '@material-ui/icons/Menu';
import SEO from './SEO';
import AppBarInner from './AppBarInner';
import DrawerInner from './DrawerInner';
import Footer from './Footer';

const iOS = typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

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
  children: React.ReactNode;
  drawerContents?: React.ReactNode;
  title?: string;
  description?: string;
  headerTitle?: string;
}

function Layout({ children, drawerContents, title, description, headerTitle }: Props): JSX.Element {
  const classes = useStyles();
  const trigger = useScrollTrigger();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const setDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <SEO title={title} description={description} />
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar className={classes.appbar}>
          <AppBarInner title={headerTitle || title} onLeftButtonClick={toggleDrawer} />
        </AppBar>
      </Slide>
      <div className={classes.content}>
        <main>{children}</main>
      </div>
      <Footer />
      <SwipeableDrawer
        open={drawerOpen}
        onClose={setDrawer(false)}
        onOpen={setDrawer(true)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <DrawerInner onCloseIconClick={setDrawer(false)} drawerContents={drawerContents} />
      </SwipeableDrawer>
      <div className={classes.fab}>
        <Tooltip title="メニュー">
          <Fab color="secondary" onClick={toggleDrawer}>
            <MenuIcon />
          </Fab>
        </Tooltip>
      </div>
    </div>
  );
}

Layout.defaultProps = {
  drawerContents: undefined,
  title: undefined,
  description: undefined,
  headerTitle: undefined,
};

export default Layout;
