import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Container, { ContainerProps } from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Hidden from '@material-ui/core/Hidden';
import Slide from '@material-ui/core/Slide';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useScrollTriger from '@material-ui/core/useScrollTrigger';
import { makeStyles, createStyles, useTheme, Theme } from '@material-ui/core/styles';
import DescriptionIcon from '@material-ui/icons/Description';
import TableChartIcon from '@material-ui/icons/TableChart';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import SwipeableViews from 'react-swipeable-views';

import ClubInfo from '../components/ClubInfo';
import DrawerMenu from '../layout/DrawerInner/DrawerMenu';
import DrawerLinks from '../layout/DrawerInner/DrawerLinks';
import StateHandler from '../layout/DrawerInner/StateHandler';
import ThemeHandler from '../layout/DrawerInner/ThemeHandler';
import { ClubTemplateQuery } from '../../graphql-types';

type MobileTab = 'summary' | 'main' | 'link' | 'settings';
type Content = 'pl' | 'bs' | 'revenue' | 'expense' | 'attd';
type ContentTab = 'figure' | 'article';
type FigureType = 'table' | 'list';

const contents: Content[] = ['pl', 'bs', 'revenue', 'expense', 'attd'];
const contentTabs: ContentTab[] = ['figure', 'article'];
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

interface MobileTabPaneProps extends ContainerProps {
  title: string;
  isMobile: boolean;
  value: MobileTab;
  mobileTab: MobileTab;
}

function MobileTabPane({ title, isMobile, value, mobileTab, children, ...props }: MobileTabPaneProps) {
  return (
    <div role="tabpanel" hidden={isMobile && value !== mobileTab}>
      {!isMobile || value === mobileTab ? (
        <Container {...props}>
          <Typography variant="h4" component="h2" gutterBottom>
            {title}
          </Typography>
          {children}
        </Container>
      ) : null}
    </div>
  );
}

interface ContentProps {
  title: string;
  value: Content;
  content: Content;
  contentTab: ContentTab;
  setContentTab: (contentTab: ContentTab) => void;
}

function Content({ title, value, content, contentTab, setContentTab }: ContentProps) {
  const _onChangeContentTabIndex = (index: number) => {
    setContentTab(contentTabs[index]);
  };
  return (
    <div role="tabpanel" hidden={value !== content}>
      {value === content ? (
        <div>
          <Typography variant="h5" component="h3" gutterBottom>
            {title}
          </Typography>
          <SwipeableViews index={contentTabs.indexOf(contentTab)} onChangeIndex={_onChangeContentTabIndex}>
            <ContentTabPane title="表" value="figure" contentTab={contentTab} />
            <ContentTabPane title="解説" value="article" contentTab={contentTab} />
          </SwipeableViews>
        </div>
      ) : null}
    </div>
  );
}

interface ContentTabPaneProps {
  title: string;
  value: ContentTab;
  contentTab: ContentTab;
}

function ContentTabPane({ title, value, contentTab }: ContentTabPaneProps) {
  return (
    <div hidden={value !== contentTab}>
      {value === contentTab ? (
        <div>
          <Typography variant="h6" component="h4">
            {title}
          </Typography>
        </div>
      ) : null}
    </div>
  );
}

interface StylesProps {
  trigger: boolean;
}

const useStyles = makeStyles<Theme, StylesProps>((theme) =>
  createStyles({
    root: {},
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
      /*
      paddingTop: 64,
      [theme.breakpoints.only('xs')]: {
        paddingTop: 56,
      },*/
    },
    bottomNavigation: {
      position: 'fixed',
      width: '100%',
      bottom: 0,
      zIndex: theme.zIndex.appBar,
      borderTop: `1px solid ${theme.palette.divider}`,
    },
  })
);

function Experimental({ data }: PageProps<ClubTemplateQuery>) {
  console.log(data);
  const theme = useTheme();
  const trigger = useScrollTriger();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const [mobileTab, setMobileTab] = React.useState<MobileTab>('summary');
  const [content, setContent] = React.useState<Content>('pl');
  const [contentTab, setContentTab] = React.useState<ContentTab>('figure');
  const [figureType, setFigureType] = React.useState<FigureType>(isMobile ? 'list' : 'table');
  const classes = useStyles({ trigger });

  const _handleContent = (_: React.ChangeEvent<unknown>, newValue: string) => {
    if (newValue !== 'pl' && newValue !== 'bs' && newValue !== 'revenue' && newValue !== 'expense' && newValue !== 'attd') return;
    setContent(newValue);
  };
  const _handleMobileTab = (_: React.ChangeEvent<unknown>, newValue: string) => {
    if (newValue !== 'summary' && newValue !== 'main' && newValue !== 'link' && newValue !== 'settings') return;
    setMobileTab(newValue);
  };
  const _onChangeContentIndex = (index: number) => {
    setContent(contents[index]);
  };

  return (
    <div className={classes.root}>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar>
          <Toolbar>
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
        </MobileTabPane>
        <MobileTabPane title="経営情報" isMobile={isMobile} value="main" mobileTab={mobileTab} maxWidth="lg" disableGutters>
          <SwipeableViews index={contents.indexOf(content)} onChangeIndex={_onChangeContentIndex}>
            <Content title="損益計算書" value="pl" content={content} contentTab={contentTab} setContentTab={setContentTab} />
            <Content title="貸借対照表" value="bs" content={content} contentTab={contentTab} setContentTab={setContentTab} />
            <Content title="営業収入" value="revenue" content={content} contentTab={contentTab} setContentTab={setContentTab} />
            <Content title="営業費用" value="expense" content={content} contentTab={contentTab} setContentTab={setContentTab} />
            <Content title="入場者数" value="attd" content={content} contentTab={contentTab} setContentTab={setContentTab} />
          </SwipeableViews>
        </MobileTabPane>
        {isMobile ? (
          <MobileTabPane title="メニュー" isMobile={isMobile} value="link" mobileTab={mobileTab} maxWidth="md">
            <DrawerMenu />
            <DrawerLinks />
          </MobileTabPane>
        ) : null}
        {isMobile ? (
          <MobileTabPane title="設定" isMobile={isMobile} maxWidth="md" value="settings" mobileTab={mobileTab}>
            <StateHandler />
            <ThemeHandler />
          </MobileTabPane>
        ) : null}
      </div>
      <Hidden smUp>
        <nav className={classes.bottomNavigation}>
          <BottomNavigation value={mobileTab} onChange={_handleMobileTab} showLabels>
            <BottomNavigationAction label="概要" value="summary" icon={<DescriptionIcon />} />
            <BottomNavigationAction label="経営情報" value="main" icon={<TableChartIcon />} />
            <BottomNavigationAction label="メニュー" value="link" icon={<MenuIcon />} />
            <BottomNavigationAction label="設定" value="settings" icon={<SettingsIcon />} />
          </BottomNavigation>
        </nav>
      </Hidden>
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
