import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { HomeIcon, DownloadIcon } from '../../icons';

function DrawerMenu() {
  return (
    <List subheader={<ListSubheader>コンテンツ</ListSubheader>}>
      <ListItem button component={GatsbyLink} to="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="トップページ" />
      </ListItem>
      <ListItem button component={GatsbyLink} to="/download">
        <ListItemIcon>
          <DownloadIcon />
        </ListItemIcon>
        <ListItemText primary="データダウンロード" />
      </ListItem>
    </List>
  );
}

export default DrawerMenu;
