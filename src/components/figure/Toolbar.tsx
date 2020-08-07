import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useAppState, useDispatch } from '../../utils/AppStateContext';
import { TableIcon, ListIcon } from '../../icons';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: 48,
      padding: theme.spacing(0, 3),
      display: 'flex',
      flexDirection: 'row',
      [theme.breakpoints.only('xs')]: {
        padding: theme.spacing(0, 2),
      },
    },
  })
);

function FigureToolbar() {
  const classes = useStyles();
  const { listMode } = useAppState();
  const dispatch = useDispatch();
  const _toggleListMode = () => {
    dispatch({ type: 'TOGGLE_LISTMODE' });
  };
  return (
    <div className={classes.root}>
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
      <Tooltip title="テーブルをクリップボードにコピー">
        <span>
          <IconButton onClick={_toggleListMode} disabled={listMode}>
            <ListIcon />
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );
}

export default FigureToolbar;
