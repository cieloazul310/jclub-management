import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Container, { ContainerProps } from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Fab from '@material-ui/core/Fab';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Slide from '@material-ui/core/Slide';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useScrollTriger from '@material-ui/core/useScrollTrigger';
import { makeStyles, createStyles, useTheme, Theme } from '@material-ui/core/styles';
import DescriptionIcon from '@material-ui/icons/Description';
import TableChartIcon from '@material-ui/icons/TableChart';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import SwipeableViews from 'react-swipeable-views';

import ClubInfo from '../components/ClubInfo';
import DrawerMenu from '../layout/DrawerInner/DrawerMenu';
import DrawerLinks from '../layout/DrawerInner/DrawerLinks';
import StateHandler from '../layout/DrawerInner/StateHandler';
import ThemeHandler from '../layout/DrawerInner/ThemeHandler';
import Footer from '../layout/Footer';
import FinancialTable from '../components/tables/FinancialTable';
import FinancialList from '../components/list';
import { PLDoc, BSDoc, RevenueDoc, ExpenseDoc, AttdDoc, AttributionDoc } from '../components/docs';
import { Edge } from '../types';
import { ClubTemplateQuery } from '../../graphql-types';

type MobileTab = 'summary' | 'main' | 'settings';
type Content = 'pl' | 'bs' | 'revenue' | 'expense' | 'attd';
type ContentTab = 'figure' | 'article';
type FigureType = 'table' | 'list';

const contents: Content[] = ['pl', 'bs', 'revenue', 'expense', 'attd'];
/**
 * <Layout>
 *   <Tabs /> => Tab
 *   <Tab summary>
 *   <Tab main>
 *     <Tab pl>
 *       <Tab figure>
 *         <Tab table />
 *         <Tab list />
 *       </Tab>
 *       <Tab article />
 *       <Tab attribution />
 *     </Tab>
 *     <Tab bs />
 *     <Tab revenue />
 *     <Tab expense />
 *     <Tab attd />
 *   </Tab>
 *   <Tab link />
 *   <Tab settings />
 * </Layout>
 */

interface MobileTabPaneStylesProps {
  value: MobileTab;
}

const useMobileTabPaneStyles = makeStyles<Theme, MobileTabPaneStylesProps>((theme) =>
  createStyles({
    container: {
      //paddingTop: ({ value }) => (value === 'main' ? 48 : undefined),
    },
  })
);

interface MobileTabPaneProps extends ContainerProps {
  title?: string;
  isMobile: boolean;
  value: MobileTab;
  mobileTab: MobileTab;
}

function MobileTabPane({ title, isMobile, value, mobileTab, children, ...props }: MobileTabPaneProps) {
  const classes = useMobileTabPaneStyles({ value });
  return (
    <div role="tabpanel" hidden={isMobile && value !== mobileTab}>
      {!isMobile || value === mobileTab ? (
        <Container className={classes.container} {...props}>
          {title ? (
            <Typography variant="h4" component="h2" gutterBottom>
              {title}
            </Typography>
          ) : null}
          {children}
        </Container>
      ) : null}
    </div>
  );
}

interface ContentProps {
  edges: Edge[];
  value: Content;
  content: Content;
  contentTab: ContentTab;
  setContentTab: (contentTab: ContentTab) => void;
}

function Content({ edges, value, content, contentTab, setContentTab }: ContentProps) {
  return (
    <div role="tabpanel" hidden={value !== content}>
      {value === content ? (
        <div>
          <ContentTabPane value="figure" contentTab={contentTab}>
            <FinancialList edges={edges} mode="club" tab={content} />
            {/*<FinancialTable edges={edges} mode="club" tab={content} />*/}
          </ContentTabPane>
          <ContentTabPane value="article" contentTab={contentTab}>
            <Container maxWidth="md">
              {content === 'pl' ? (
                <PLDoc />
              ) : content === 'bs' ? (
                <BSDoc />
              ) : content === 'revenue' ? (
                <RevenueDoc />
              ) : content === 'expense' ? (
                <ExpenseDoc />
              ) : (
                <AttdDoc />
              )}
            </Container>
          </ContentTabPane>
        </div>
      ) : null}
    </div>
  );
}

interface ContentTabPaneProps {
  value: ContentTab;
  contentTab: ContentTab;
  children: React.ReactNode;
}

function ContentTabPane({ value, contentTab, children }: ContentTabPaneProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  return <div hidden={isMobile && value !== contentTab}>{!isMobile || value === contentTab ? <div>{children}</div> : null}</div>;
}

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

function Experimental({ data }: PageProps<ClubTemplateQuery>) {
  console.log(data);
  const theme = useTheme();
  const trigger = useScrollTriger();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [mobileTab, setMobileTab] = React.useState<MobileTab>('summary');
  const [content, setContent] = React.useState<Content>('pl');
  const [contentTab, setContentTab] = React.useState<ContentTab>('figure');
  const classes = useStyles({ trigger });

  const _handleDrawer = (newValue: boolean | undefined = undefined) => {
    return () => setDrawerOpen(newValue ?? !drawerOpen);
  };
  const _handleContent = (_: React.ChangeEvent<unknown>, newValue: string) => {
    if (newValue !== 'pl' && newValue !== 'bs' && newValue !== 'revenue' && newValue !== 'expense' && newValue !== 'attd') return;
    setContent(newValue);
  };
  const _handleMobileTab = (_: React.ChangeEvent<unknown>, newValue: string) => {
    if (newValue === 'article' || newValue === 'figure') {
      setMobileTab('main');
      setContentTab(newValue);
    } else if (newValue === 'summary' || newValue === 'settings') {
      setMobileTab(newValue);
    }
  };
  const _onChangeContentIndex = (index: number) => {
    setContent(contents[index]);
  };

  return (
    <div className={classes.root}>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={_handleDrawer()}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="h1">
              {data.clubsYaml?.fullname}
            </Typography>
          </Toolbar>
        </AppBar>
      </Slide>
      <Slide appear={false} direction="down" in={!isMobile || mobileTab === 'main'}>
        <nav className={classes.tabs}>
          <Tabs value={content} variant="scrollable" indicatorColor="secondary" textColor="secondary" onChange={_handleContent}>
            <Tab label="損益計算書" value="pl" wrapped />
            <Tab label="貸借対照表" value="bs" wrapped />
            <Tab label="営業収入" value="revenue" wrapped />
            <Tab label="営業費用" value="expense" wrapped />
            <Tab label="入場者数" value="attd" wrapped />
          </Tabs>
        </nav>
      </Slide>
      <div className={classes.mobileTabContainer}>
        <MobileTabPane title="概要" isMobile={isMobile} value="summary" mobileTab={mobileTab} maxWidth="md">
          <ClubInfo clubsYaml={data.clubsYaml} />
          <AttributionDoc />
        </MobileTabPane>
        <MobileTabPane isMobile={isMobile} value="main" mobileTab={mobileTab} maxWidth="lg" disableGutters>
          <SwipeableViews index={contents.indexOf(content)} onChangeIndex={_onChangeContentIndex}>
            <Content edges={data.allDataset.edges} value="pl" content={content} contentTab={contentTab} setContentTab={setContentTab} />
            <Content edges={data.allDataset.edges} value="bs" content={content} contentTab={contentTab} setContentTab={setContentTab} />
            <Content
              edges={data.allDataset.edges}
              value="revenue"
              content={content}
              contentTab={contentTab}
              setContentTab={setContentTab}
            />
            <Content
              edges={data.allDataset.edges}
              value="expense"
              content={content}
              contentTab={contentTab}
              setContentTab={setContentTab}
            />
            <Content edges={data.allDataset.edges} value="attd" content={content} contentTab={contentTab} setContentTab={setContentTab} />
          </SwipeableViews>
        </MobileTabPane>
        {isMobile ? (
          <MobileTabPane title="設定" isMobile={isMobile} maxWidth="md" value="settings" mobileTab={mobileTab}>
            <StateHandler />
            <ThemeHandler />
          </MobileTabPane>
        ) : null}
      </div>
      <Footer />
      <Hidden smUp>
        <nav className={classes.bottomNavigation}>
          <BottomNavigation value={mobileTab === 'main' ? contentTab : mobileTab} onChange={_handleMobileTab} showLabels>
            <BottomNavigationAction label="概要" value="summary" icon={<DescriptionIcon />} />
            <BottomNavigationAction label="表" value="figure" icon={<TableChartIcon />} />
            <BottomNavigationAction label="解説" value="article" icon={<MenuIcon />} />
            <BottomNavigationAction label="設定" value="settings" icon={<SettingsIcon />} />
          </BottomNavigation>
        </nav>
      </Hidden>
      <Hidden only="xs">
        <div className={classes.fab}>
          <Fab color="secondary" onClick={_handleDrawer()}>
            <MenuIcon />
          </Fab>
        </div>
      </Hidden>
      <SwipeableDrawer open={drawerOpen} onClose={_handleDrawer(false)} onOpen={_handleDrawer(true)}>
        <div className={classes.drawerInner}>
          <div className={classes.drawerToolbar}>
            <IconButton edge="start" onClick={_handleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <Divider />
          <DrawerMenu />
          <DrawerLinks />
          <Hidden only="xs">
            <Divider />
            <StateHandler />
            <ThemeHandler />
          </Hidden>
        </div>
      </SwipeableDrawer>
    </div>
  );
}

export default Experimental;

export const query = graphql`
  query {
    clubsYaml(slug: { eq: "mitohollyhock" }) {
      id
      short_name
      name
      fullname
      category
      slug
      company
      hometown
      area
      settlement
      relatedCompanies
    }
    allDataset(filter: { slug: { eq: "mitohollyhock" } }, sort: { fields: year }) {
      edges {
        node {
          academy_exp
          academy_rev
          acl_attd
          acl_games
          all_attd
          all_games
          broadcast
          assets
          capital_stock
          capital_surplus
          category
          curr_assets
          curr_liabilities
          expense
          fixed_assets
          fixed_liabilities
          fullname
          game_exp
          general_exp
          goods_exp
          goods_rev
          id
          league_attd
          league_games
          leaguecup_attd
          leaguecup_games
          liabilities
          license
          manage_exp
          name
          net_worth
          no_exp
          no_rev
          op_profit
          ordinary_profit
          other_revs
          po_attd
          po_games
          points
          ppg
          profit
          profit_before_tax
          related_revenue
          rank
          retained_earnings
          revenue
          salary
          second_attd
          second_games
          sga
          slug
          sp_exp
          sp_rev
          sponsor
          tax
          team_exp
          ticket
          women_exp
          year
        }
      }
    }
  }
`;
