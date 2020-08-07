import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FigureToolbar from './Toolbar';
import FinancialTable from '../tables';
import FinancialList from '../list';
import { useAppState } from '../../utils/AppStateContext';
import { Mode, Edge, Tab } from '../../types';

interface StylesProps {
  mode: Mode;
}

const useStyles = makeStyles<Theme, StylesProps>((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      height: ({ mode }) => (mode === 'year' ? 'calc(100vh - 102px)' : undefined),
      [theme.breakpoints.only('xs')]: {
        height: ({ mode }) => (mode === 'year' ? 'calc(100vh - 154px)' : undefined),
      },
    },
    main: {
      flexGrow: 1,
      overflow: 'auto',
      display: 'flex',
    },
  })
);

interface Props {
  edges: Edge[];
  mode: Mode;
  tab: Tab;
}

function Figure({ edges, mode, tab }: Props) {
  const { listMode } = useAppState();
  const classes = useStyles({ mode });

  return (
    <div className={classes.root}>
      <FigureToolbar />
      <div className={classes.main}>
        {listMode ? <FinancialList edges={edges} mode={mode} tab={tab} /> : <FinancialTable edges={edges} mode={mode} tab={tab} />}
      </div>
    </div>
  );
}

export default Figure;
