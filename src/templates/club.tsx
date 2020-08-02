import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Layout from '../layout';
import PLTable from '../components/tables/PLTable';
import BSTable from '../components/tables/BSTable';
import AttdTable from '../components/tables/AttdTable';
import RevenueTable from '../components/tables/RevenueTable';
import ExpenseTable from '../components/tables/ExpenseTable';
import { ClubTemplateQuery, SitePageContext } from '../../graphql-types';

interface StylesProps {
  trigger: boolean;
}

const useStyles = makeStyles<Theme, StylesProps>((theme) =>
  createStyles({
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
  })
);

function ClubTemplate({ data, pageContext }: PageProps<ClubTemplateQuery, SitePageContext>) {
  console.log(data);
  console.log(pageContext);
  const trigger = useScrollTrigger();
  const classes = useStyles({ trigger });
  const storaged = typeof window === 'object' ? sessionStorage.getItem('jclubTab') : null;
  const initialTab = storaged ? (JSON.parse(storaged) as number) : 0;
  const [tab, setTab] = React.useState(initialTab);
  const _handleChange = (_: React.ChangeEvent<unknown>, newValue: number) => {
    setTab(newValue);
  };
  const _handleChangeIndex = (newValue: number) => {
    setTab(newValue);
  };
  React.useEffect(() => {
    if (window && typeof window === 'object') {
      sessionStorage.setItem('jclubTab', JSON.stringify(tab));
    }
  }, [tab]);

  return (
    <Layout title={data.clubsYaml?.name ?? 'club'}>
      <div className={classes.tabs}>
        <Tabs value={tab} onChange={_handleChange} indicatorColor="secondary" textColor="secondary" variant="fullWidth">
          <Tab label="損益計算書" />
          <Tab label="貸借対照表" />
          <Tab label="営業収入" />
          <Tab label="営業費用" />
          <Tab label="入場者数" />
        </Tabs>
      </div>
      <SwipeableViews index={tab} onChangeIndex={_handleChangeIndex}>
        <Container maxWidth="lg">
          <PLTable edges={data.allDataset.edges} mode="club" />
        </Container>
        <Container maxWidth="lg">
          <BSTable edges={data.allDataset.edges} mode="club" />
        </Container>
        <Container maxWidth="lg">
          <RevenueTable edges={data.allDataset.edges} mode="club" />
        </Container>
        <Container maxWidth="lg">
          <ExpenseTable edges={data.allDataset.edges} mode="club" />
        </Container>
        <Container maxWidth="lg">
          <AttdTable edges={data.allDataset.edges} mode="club" />
        </Container>
      </SwipeableViews>
    </Layout>
  );
}

export default ClubTemplate;

export const query = graphql`
  query ClubTemplate($slug: String!) {
    clubsYaml(slug: { eq: $slug }) {
      id
      short_name
      name
      fullname
      category
      slug
      company
      hometown
      area
      relatedCompanies
    }
    allDataset(filter: { slug: { eq: $slug } }, sort: { fields: year }) {
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
