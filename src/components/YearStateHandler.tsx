import * as React from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import { useAppState, useDispatch } from '../utils/AppStateContext';
import { FilterCategory } from '../utils/AppState';

function YearStateHandler() {
  const { filterCategories } = useAppState();
  const dispatch = useDispatch();
  const _toggleCategory = (category: FilterCategory) => () => {
    dispatch({ type: 'TOGGLE_FILTERCATEGORY', category });
  };
  return (
    <List subheader={<ListSubheader>年別フィルタ</ListSubheader>}>
      <ListItem button>
        <ListItemText primary="J1" />
        <ListItemSecondaryAction>
          <Checkbox checked={filterCategories.includes('J1')} onClick={_toggleCategory('J1')} />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem button>
        <ListItemText primary="J2" />
        <ListItemSecondaryAction>
          <Checkbox checked={filterCategories.includes('J2')} onClick={_toggleCategory('J2')} />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem button>
        <ListItemText primary="J3" />
        <ListItemSecondaryAction>
          <Checkbox checked={filterCategories.includes('J3')} onClick={_toggleCategory('J3')} />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem button>
        <ListItemText primary="その他" />
        <ListItemSecondaryAction>
          <Checkbox checked={filterCategories.includes('others')} onClick={_toggleCategory('others')} />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

export default YearStateHandler;
