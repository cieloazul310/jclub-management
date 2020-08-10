import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import AppLink from '../AppLink';
import CategoryAvatar from '../CategoryAvatar';
import ListItemTable from './ListItemTable';
import { useSortedValue } from '../../utils/useStateEdges';
import { Edge, Mode, Tab } from '../../types';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      padding: theme.spacing(2),
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    avatarWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(1),
    },
    content: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      padding: theme.spacing(1, 2),
    },
    value: {
      fontSize: theme.typography.h5.fontSize,
      fontWeight: theme.typography.fontWeightBold,
    },
  })
);

interface Props {
  edge: Edge;
  mode: Mode;
  tab: Tab;
  index: number;
}

function ListItem({ edge, mode, tab, index }: Props) {
  const classes = useStyles();
  const value = useSortedValue(edge);
  const { node } = edge;
  return (
    <div className={classes.root}>
      <div className={classes.avatarWrapper}>
        <CategoryAvatar category={node.category ?? ''} />
        <Typography variant="caption">{node.rank}位</Typography>
      </div>
      <div className={classes.content}>
        <div className={classes.label}>
          <Typography component="h3">
            <AppLink to={mode === 'year' ? `/club/${node.slug}` : `/year/${node.year}`} color="inherit">
              <strong>{mode === 'club' ? `${node.year}年` : `${index + 1}. ${node.name}`}</strong>
            </AppLink>
          </Typography>
          {mode === 'year' ? <Typography className={classes.value}>{value}</Typography> : null}
        </div>
        <div>
          <ListItemTable edge={edge} mode={mode} tab={tab} />
        </div>
      </div>
    </div>
  );
}

export default ListItem;
