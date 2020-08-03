import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Layout from '../layout';
import TabPane from '../components/TabPane';
import PLTable from '../components/tables/PLTable';
import BSTable from '../components/tables/BSTable';
import AttdTable from '../components/tables/AttdTable';
import RevenueTable from '../components/tables/RevenueTable';
import ExpenseTable from '../components/tables/ExpenseTable';
import { ClubTemplateQuery, YearTemplateQuery, SitePageContext } from '../../graphql-types';

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

interface Props {
  mode: 'club' | 'year';
  title: string;
  data: ClubTemplateQuery | YearTemplateQuery;
  pageContext: SitePageContext;
  children: JSX.Element | JSX.Element[] | (JSX.Element | JSX.Element[])[];
}

function TemplateCore({ mode, data, title, children, pageContext }: Props) {
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
    <Layout title={title ?? '経営情報'}>
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
        <TabPane table={<PLTable edges={data.allDataset.edges} mode={mode} />} article={<Typography>hoge</Typography>} />
        <TabPane table={<BSTable edges={data.allDataset.edges} mode={mode} />} article={<Typography>hoge</Typography>} />
        <TabPane table={<RevenueTable edges={data.allDataset.edges} mode={mode} />} article={<Typography>hoge</Typography>} />
        <TabPane table={<ExpenseTable edges={data.allDataset.edges} mode={mode} />} article={<Typography>hoge</Typography>} />
        <TabPane table={<AttdTable edges={data.allDataset.edges} mode={mode} />} article={<Typography>hoge</Typography>} />
      </SwipeableViews>
      <footer>{children}</footer>
    </Layout>
  );
}

export default TemplateCore;
