import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ListItemTable from './ListItemTable';
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
      padding: theme.spacing(1, 2),
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
  const { node } = edge;
  return (
    <div className={classes.root}>
      <div className={classes.avatarWrapper}>
        <Avatar>{node.category}</Avatar>
        <Typography variant="caption">{node.rank}位</Typography>
      </div>
      <div className={classes.content}>
        <div className={classes.label}>
          <Typography component="h3">
            <strong>{mode === 'club' ? `${node.year}年` : `${index + 1}. ${node.name}`}</strong>
          </Typography>
        </div>
        <div>
          <ListItemTable edge={edge} mode={mode} tab={tab} />
        </div>
      </div>
    </div>
  );
}

export default ListItem;
