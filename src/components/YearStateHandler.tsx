import * as React from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import { useAppState, useDispatch } from '../utils/AppStateContext';
import { FilterCategory } from '../utils/AppState';

function YearStateHandler(): JSX.Element {
  const { filterCategories } = useAppState();
  const dispatch = useDispatch();
  const toggleCategory = (category: FilterCategory) => () => {
    dispatch({ type: 'TOGGLE_FILTERCATEGORY', category });
  };
  return (
    <List subheader={<ListSubheader>年別フィルタ</ListSubheader>}>
      <ListItem button onClick={toggleCategory('J1')}>
        <ListItemText primary="J1" />
        <ListItemSecondaryAction>
          <Checkbox checked={filterCategories.includes('J1')} onClick={toggleCategory('J1')} />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem button onClick={toggleCategory('J2')}>
        <ListItemText primary="J2" />
        <ListItemSecondaryAction>
          <Checkbox checked={filterCategories.includes('J2')} onClick={toggleCategory('J2')} />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem button onClick={toggleCategory('J3')}>
        <ListItemText primary="J3" />
        <ListItemSecondaryAction>
          <Checkbox checked={filterCategories.includes('J3')} onClick={toggleCategory('J3')} />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem button onClick={toggleCategory('others')}>
        <ListItemText primary="その他" />
        <ListItemSecondaryAction>
          <Checkbox checked={filterCategories.includes('others')} onClick={toggleCategory('others')} />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

export default YearStateHandler;
