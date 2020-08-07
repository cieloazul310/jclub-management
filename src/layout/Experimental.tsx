import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import MuiTab from '@material-ui/core/Tab';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';
import Slide from '@material-ui/core/Slide';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useScrollTriger from '@material-ui/core/useScrollTrigger';
import { makeStyles, createStyles, useTheme, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import AppBarInner from './AppBarInner';
import DrawerInner from './DrawerInner';
import SummaryTabPane from './MobileTabPane/Summary';
import MainTabPane from './MobileTabPane/Main';
import SettingsTabPane from './MobileTabPane/Settings';
import Footer from './Footer';
import BottomNavigation from './BottomNavigation';

import { Mode, MobileTab, Tab, ContentTab, tabs } from '../types';
import { ClubTemplateQuery, YearTemplateQuery, SitePageContext } from '../../graphql-types';

interface StylesProps {
  trigger: boolean;
}

const useStyles = makeStyles<Theme, StylesProps>((theme) =>
  createStyles({
    root: {
      paddingTop: 64,
      [theme.breakpoints.only('xs')]: {
        paddingTop: 56,
        paddingBottom: 56,
      },
    },
    appBar: {
      background: theme.palette.type === 'dark' ? theme.palette.background.default : undefined,
      color: theme.palette.type === 'dark' ? theme.palette.text.primary : undefined,
    },
    tabs: {
      position: 'sticky',
      top: ({ trigger }) => (trigger ? 0 : 64),
      background: theme.palette.background.paper,
      zIndex: theme.zIndex.appBar - 1,
      boxShadow: theme.shadows[1],
      transition: theme.transitions.create('top'),
      [theme.breakpoints.only('xs')]: {
        top: ({ trigger }) => (trigger ? 0 : 56),
      },
    },
    mobileTabContainer: {
      display: 'flex',
      flexDirection: 'column-reverse',
    },
    bottomNavigation: {
      position: 'fixed',
      width: '100%',
      bottom: 0,
      zIndex: theme.zIndex.appBar,
      borderTop: `1px solid ${theme.palette.divider}`,
    },
    fab: {
      position: 'fixed',
      right: theme.spacing(2),
      bottom: theme.spacing(2),
      [theme.breakpoints.only('xs')]: {
        bottom: theme.spacing(2) + 56,
      },
    },
    drawerInner: {
      width: 280,
    },
    drawerToolbar: {
      ...theme.mixins.toolbar,
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 2),
    },
  })
);

interface Props {
  mode: Mode;
  title: string;
  headerTitle?: string;
  description?: string;
  data: ClubTemplateQuery | YearTemplateQuery;
  pageContext: SitePageContext;
}

function Experimental({ mode, title, headerTitle, description, data, pageContext }: Props) {
  console.log(data);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const trigger = useScrollTriger();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [mobileTab, setMobileTab] = React.useState<MobileTab>('summary');
  const [tab, setTab] = React.useState<Tab>('pl');
  const [contentTab, setContentTab] = React.useState<ContentTab>('figure');
  const classes = useStyles({ trigger });

  const _handleDrawer = (newValue: boolean | undefined = undefined) => {
    return () => setDrawerOpen(newValue ?? !drawerOpen);
  };
  const _handleTab = (_: React.ChangeEvent<unknown>, newValue: string) => {
    if (newValue !== 'pl' && newValue !== 'bs' && newValue !== 'revenue' && newValue !== 'expense' && newValue !== 'attd') return;
    setTab(newValue);
  };
  const _handleMobileTab = (_: React.ChangeEvent<unknown>, newValue: string) => {
    if (newValue === 'article' || newValue === 'figure') {
      setMobileTab('main');
      setContentTab(newValue);
    } else if (newValue === 'summary' || newValue === 'settings') {
      setMobileTab(newValue);
    }
  };
  const _onChangeTabIndex = (index: number) => {
    setTab(tabs[index]);
  };

  return (
    <div className={classes.root}>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar className={classes.appBar}>
          <AppBarInner title={headerTitle ?? title} onLeftButtonClick={_handleDrawer()} />
        </AppBar>
      </Slide>
      <Slide appear={false} direction="down" in={!isMobile || mobileTab === 'main'}>
        <nav className={classes.tabs}>
          <Tabs value={tab} variant="scrollable" indicatorColor="secondary" textColor="secondary" onChange={_handleTab}>
            <MuiTab label="損益計算書" value="pl" wrapped />
            <MuiTab label="貸借対照表" value="bs" wrapped />
            <MuiTab label="営業収入" value="revenue" wrapped />
            <MuiTab label="営業費用" value="expense" wrapped />
            <MuiTab label="入場者数" value="attd" wrapped />
          </Tabs>
        </nav>
      </Slide>
      <div className={classes.mobileTabContainer}>
        <SummaryTabPane mobileTab={mobileTab} mode={mode} data={data} />
        <MainTabPane
          data={data}
          mobileTab={mobileTab}
          tab={tab}
          mode={mode}
          contentTab={contentTab}
          setContentTab={setContentTab}
          onChangeTabIndex={_onChangeTabIndex}
        />
        <SettingsTabPane mobileTab={mobileTab} />
      </div>
      <Hidden only="xs">
        <Footer />
      </Hidden>
      <Hidden smUp>
        <nav className={classes.bottomNavigation}>
          <BottomNavigation value={mobileTab === 'main' ? contentTab : mobileTab} onChange={_handleMobileTab} />
        </nav>
      </Hidden>
      <div className={classes.fab}>
        <Fab color="secondary" onClick={_handleDrawer()}>
          <MenuIcon />
        </Fab>
      </div>
      <SwipeableDrawer open={drawerOpen} onClose={_handleDrawer(false)} onOpen={_handleDrawer(true)}>
        <DrawerInner onCloseIconClick={_handleDrawer(false)} />
      </SwipeableDrawer>
    </div>
  );
}

export default Experimental;
