import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CopyButton from './CopyButton';
import { useAppState, useDispatch } from '../../utils/AppStateContext';
import useUnitString from '../../utils/useUnitString';
import useStateString from '../../utils/useStateString';
import { TableIcon, ListIcon } from '../../icons';
import { Tab, Mode } from '../../types';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: 48,
      padding: theme.spacing(0, 3),
      display: 'flex',
      flexDirection: 'row',
      flexShrink: 0,
      [theme.breakpoints.only('xs')]: {
        padding: theme.spacing(0, 2),
      },
    },
    left: {
      display: 'flex',
      flexGrow: 1,
      alignItems: 'center',
    },
  })
);

interface Props {
  tab: Tab;
  mode: Mode;
}

function FigureToolbar({ tab, mode }: Props) {
  const classes = useStyles();
  const { listMode } = useAppState();
  const dispatch = useDispatch();
  const unitString = useUnitString(tab);
  const { sortString } = useStateString();
  const _toggleListMode = () => {
    dispatch({ type: 'TOGGLE_LISTMODE' });
  };
  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <Tooltip title={`テーブル表示${!listMode ? '中' : ''}`}>
          <span>
            <IconButton edge="start" onClick={_toggleListMode} disabled={!listMode}>
              <TableIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={`リスト表示${listMode ? '中' : ''}`}>
          <span>
            <IconButton onClick={_toggleListMode} disabled={listMode}>
              <ListIcon />
            </IconButton>
          </span>
        </Tooltip>
        {!listMode ? <CopyButton tab={tab} /> : null}
      </div>
      <div>
        {mode === 'year' ? (
          <div className={classes.left}>
            <Typography variant="caption">{sortString}</Typography>
          </div>
        ) : null}
        <Typography variant="caption">{unitString}</Typography>
      </div>
    </div>
  );
}

export default FigureToolbar;
