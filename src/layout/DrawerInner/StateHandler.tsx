import * as React from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import { useAppState, useDispatch } from '../../utils/AppStateContext';

function StateHandler() {
  const { displayFullAttd, listMode } = useAppState();
  const dispatch = useDispatch();
  const _toggleListMode = () => {
    dispatch({ type: 'TOGGLE_LISTMODE' });
  };
  const _toggleFullAttd = () => {
    dispatch({ type: 'TOGGLE_FULL_ATTD' });
  };
  const _reset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <List subheader={<ListSubheader>設定</ListSubheader>}>
      <ListItem>
        <ListItemText primary="リストモード" />
        <ListItemSecondaryAction>
          <Switch edge="end" checked={listMode} onChange={_toggleListMode} />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemText primary="詳細な観客数を表示" />
        <ListItemSecondaryAction>
          <Switch edge="end" checked={displayFullAttd} onChange={_toggleFullAttd} />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem button onClick={_reset}>
        <ListItemText primary="設定をリセット" />
      </ListItem>
    </List>
  );
}

export default StateHandler;
