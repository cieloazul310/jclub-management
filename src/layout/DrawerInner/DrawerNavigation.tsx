import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import useNeighbor from '../../utils/useNeighbor';
import { SitePageContextNext, SitePageContextPrevious } from '../../../graphql-types';

interface Props {
  next?: SitePageContextNext | null;
  previous?: SitePageContextPrevious | null;
}

function DrawerNavigation({ next, previous }: Props): JSX.Element | null {
  const nxt = useNeighbor(next);
  const prev = useNeighbor(previous);
  return next || previous ? (
    <List>
      {prev ? (
        <ListItem button dense component={GatsbyLink} to={prev.to}>
          <ListItemIcon>
            <ArrowBackIcon />
          </ListItemIcon>
          <ListItemText primary={prev.title} />
        </ListItem>
      ) : null}
      {nxt ? (
        <ListItem button dense component={GatsbyLink} to={nxt.to}>
          <ListItemIcon>
            <ArrowForwardIcon />
          </ListItemIcon>
          <ListItemText primary={nxt.title} />
        </ListItem>
      ) : null}
    </List>
  ) : null;
}

DrawerNavigation.defaultProps = {
  next: undefined,
  previous: undefined,
};

export default DrawerNavigation;
