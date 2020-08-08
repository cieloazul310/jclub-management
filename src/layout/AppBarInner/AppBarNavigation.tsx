import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import useNeighbor from '../../utils/useNeighbor';
import { SitePageContextNext, SitePageContextPrevious } from '../../../graphql-types';

interface Props {
  previous?: SitePageContextPrevious | null;
  next?: SitePageContextNext | null;
}

function AppBarNavigation({ previous, next }: Props) {
  const prev = useNeighbor(previous);
  const nxt = useNeighbor(next);
  return (
    <div>
      <Tooltip title={prev?.title ?? ''}>
        <span>
          <IconButton disabled={!prev} color="inherit" component={GatsbyLink} to={prev?.to ?? '#'}>
            <ArrowBackIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title={nxt?.title ?? ''}>
        <span>
          <IconButton disabled={!nxt} color="inherit" component={GatsbyLink} to={nxt?.to ?? '#'}>
            <ArrowForwardIcon />
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );
}

export default AppBarNavigation;
