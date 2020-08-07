import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { HomeIcon } from '../../icons';

function DrawerMenu() {
  return (
    <List>
      <ListItem button component={GatsbyLink} to="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="トップページ" />
      </ListItem>
    </List>
  );
}

export default DrawerMenu;
