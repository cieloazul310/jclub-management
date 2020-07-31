import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Layout from '../layout';

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

function TablePage() {
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
    <Layout>
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
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>クラブ</TableCell>
                  <TableCell>営業収入</TableCell>
                  <TableCell>営業費用</TableCell>
                  <TableCell>営業利益</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>浦和</TableCell>
                  <TableCell align="right">8092</TableCell>
                  <TableCell align="right">8008</TableCell>
                  <TableCell align="right">84</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>浦和</TableCell>
                  <TableCell align="right">8092</TableCell>
                  <TableCell align="right">8008</TableCell>
                  <TableCell align="right">84</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>浦和</TableCell>
                  <TableCell align="right">8092</TableCell>
                  <TableCell align="right">8008</TableCell>
                  <TableCell align="right">84</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>浦和</TableCell>
                  <TableCell align="right">8092</TableCell>
                  <TableCell align="right">8008</TableCell>
                  <TableCell align="right">84</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
          <Typography>hoge</Typography>
        </Container>
        <Container>
          <p>aaa</p>
        </Container>
        <Container>
          <p>bbb</p>
        </Container>
        <Container>
          <p>ccc</p>
        </Container>
        <Container>
          <p>ddd</p>
        </Container>
      </SwipeableViews>
    </Layout>
  );
}

export default TablePage;
