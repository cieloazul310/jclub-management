import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Layout from '../layout';
import { ContentBasisLarge } from '../components/Basis';
import { AdInArticle } from '../components/Ads';
import TabPane from '../components/TabPane';
import FinancialTable from '../components/tables';
import YearStateHandler from '../components/YearStateHandler';
import { PLDoc, BSDoc, RevenueDoc, ExpenseDoc, AttdDoc, AttributionDoc } from '../components/docs';
import { Mode } from '../types';
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
  mode: Mode;
  title: string;
  headerTitle?: string;
  description?: string;
  data: ClubTemplateQuery | YearTemplateQuery;
  pageContext: SitePageContext;
  children: JSX.Element | JSX.Element[] | (JSX.Element | JSX.Element[])[];
}

function TemplateCore({ mode, data, title, headerTitle, description, children, pageContext }: Props) {
  const trigger = useScrollTrigger();
  const classes = useStyles({ trigger });
  const storaged = typeof window === 'object' ? sessionStorage.getItem('jclubTab') : null;
  const initialTab = storaged ? (JSON.parse(storaged) as number) : 0;
  const [tab, setTab] = React.useState(initialTab);
  const _handleChange = (_: React.ChangeEvent<unknown>, newValue: number) => {
    setTab(newValue);
  };
  const _handleChangeIndex = (index: number) => {
    setTab(index);
  };
  React.useEffect(() => {
    if (window && typeof window === 'object') {
      sessionStorage.setItem('jclubTab', JSON.stringify(tab));
    }
  }, [tab]);
  const { edges } = data.allDataset;

  return (
    <Layout
      title={title ?? '経営情報'}
      headerTitle={headerTitle}
      description={description}
      drawerContents={mode === 'year' ? <YearStateHandler /> : undefined}
    >
      <div className={classes.tabs}>
        <Tabs value={tab} onChange={_handleChange} indicatorColor="secondary" textColor="secondary" variant="scrollable">
          <Tab label="損益計算書" />
          <Tab label="貸借対照表" />
          <Tab label="営業収入" />
          <Tab label="営業費用" />
          <Tab label="入場者数" />
        </Tabs>
      </div>
      <div>
        <TabPane index={0} value={tab} maxWidth="lg" disableGutters>
          <FinancialTable edges={edges} mode={mode} tab="pl" previous={pageContext.previous} next={pageContext.next} />
        </TabPane>
        <TabPane index={1} value={tab} maxWidth="lg" disableGutters>
          <FinancialTable edges={edges} mode={mode} tab="bs" previous={pageContext.previous} next={pageContext.next} />
        </TabPane>
        <TabPane index={2} value={tab} maxWidth="lg" disableGutters>
          <FinancialTable edges={edges} mode={mode} tab="revenue" previous={pageContext.previous} next={pageContext.next} />
        </TabPane>
        <TabPane index={3} value={tab} maxWidth="lg" disableGutters>
          <FinancialTable edges={edges} mode={mode} tab="expense" previous={pageContext.previous} next={pageContext.next} />
        </TabPane>
        <TabPane index={4} value={tab} maxWidth="lg" disableGutters>
          <FinancialTable edges={edges} mode={mode} tab="attd" previous={pageContext.previous} next={pageContext.next} />
        </TabPane>
      </div>
      <article>
        <section>
          <ContentBasisLarge>{children}</ContentBasisLarge>
        </section>
        <section>
          <div className={classes.section}>
            <SwipeableViews resistance index={tab} onChangeIndex={_handleChangeIndex}>
              <TabPane index={0} value={tab} maxWidth="md">
                <PLDoc />
              </TabPane>
              <TabPane index={1} value={tab} maxWidth="md">
                <BSDoc />
              </TabPane>
              <TabPane index={2} value={tab} maxWidth="md">
                <RevenueDoc />
              </TabPane>
              <TabPane index={3} value={tab} maxWidth="md">
                <ExpenseDoc />
              </TabPane>
              <TabPane index={4} value={tab} maxWidth="md">
                <AttdDoc />
              </TabPane>
            </SwipeableViews>
          </div>
        </section>
        <ContentBasisLarge>
          <AdInArticle />
        </ContentBasisLarge>
        <section>
          <ContentBasisLarge>
            <footer>
              <AttributionDoc />
            </footer>
          </ContentBasisLarge>
        </section>
      </article>
    </Layout>
  );
}

export default TemplateCore;
