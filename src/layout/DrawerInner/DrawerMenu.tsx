import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function DrawerMenu() {
  return (
    <List>
      <ListItem button component={GatsbyLink} to="/">
        <ListItemText primary="トップページ" />
      </ListItem>
    </List>
  );
}

export default DrawerMenu;
