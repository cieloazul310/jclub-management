import * as React from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import { useTwitterShare, useFacebookShare } from '../../utils/useSocialShare';

interface Props {
  title?: string;
}

function DrawerShare({ title }: Props) {
  const twitterUrl = useTwitterShare(title);
  const fbUrl = useFacebookShare();
  return (
    <List subheader={<ListSubheader>共有</ListSubheader>}>
      <ListItem component="a" button href={twitterUrl} target="_blank" rel="noopener noreferrer">
        <ListItemIcon>
          <TwitterIcon />
        </ListItemIcon>
        <ListItemText primary="Twitterで共有" />
      </ListItem>
      <ListItem component="a" button href={fbUrl} target="_blank" rel="noopener noreferrer">
        <ListItemIcon>
          <FacebookIcon />
        </ListItemIcon>
        <ListItemText primary="Facebookでシェア" />
      </ListItem>
    </List>
  );
}

export default DrawerShare;
