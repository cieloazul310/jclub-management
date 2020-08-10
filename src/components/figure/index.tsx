import * as React from 'react';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import FigureToolbar from './Toolbar';
import FinancialTable from '../tables';
import FinancialList from '../list';
import { useAppState } from '../../utils/AppStateContext';
import { tabs, Mode, Edge, Tab } from '../../types';

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    root: {
      //display: 'flex',
      //flexDirection: 'column',
      overflowY: 'auto',
    },
    rootYearTable: {
      //height: 'calc(100vh - 106px)',
      [theme.breakpoints.up('sm')]: {
        height: 'calc(100vh - 106px)',
      },
      [theme.breakpoints.only('xs')]: {
        //height: 'calc(100vh - 158px)',
      },
    },
    main: {
      //position: 'sticky',
      //top: 0,
    },
  })
);

interface Props {
  edges: Edge[];
  mode: Mode;
  tab: Tab;
  onChangeTabIndex: (index: number) => void;
}

function Figure({ edges, mode, tab, onChangeTabIndex }: Props) {
  const { listMode } = useAppState();
  const classes = useStyles();

  return (
    <Container maxWidth="lg" disableGutters className={clsx(classes.root, { [classes.rootYearTable]: mode === 'year' && !listMode })}>
      <FigureToolbar tab={tab} mode={mode} />
      <div className={classes.main}>
        <SwipeableViews resistance disabled={!listMode} index={tabs.indexOf(tab)} onChangeIndex={onChangeTabIndex}>
          {tabs.map((t) => (
            <div key={t} role="tabpanel" hidden={t !== tab}>
              {t === tab ? (
                listMode ? (
                  <FinancialList edges={edges} mode={mode} tab={tab} />
                ) : (
                  <FinancialTable edges={edges} mode={mode} tab={tab} />
                )
              ) : null}
            </div>
          ))}
        </SwipeableViews>
      </div>
    </Container>
  );
}

export default Figure;
