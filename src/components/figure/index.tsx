import * as React from 'react';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FigureToolbar from './Toolbar';
import FinancialTable from '../tables';
import FinancialList from '../list';
import { useAppState } from '../../utils/AppStateContext';
import { Mode, Edge, Tab } from '../../types';

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
    },
    rootYearTable: {
      height: 'calc(100vh - 106px)',
      [theme.breakpoints.only('xs')]: {
        height: 'calc(100vh - 158px)',
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
  const classes = useStyles();

  return (
    <Container maxWidth="lg" disableGutters className={clsx(classes.root, { [classes.rootYearTable]: mode === 'year' && !listMode })}>
      <FigureToolbar tab={tab} mode={mode} />
      <div className={classes.main}>
        {listMode ? <FinancialList edges={edges} mode={mode} tab={tab} /> : <FinancialTable edges={edges} mode={mode} tab={tab} />}
      </div>
    </Container>
  );
}

export default Figure;
