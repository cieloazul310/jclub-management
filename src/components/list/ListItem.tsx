import * as React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { AppLink } from '../AppLink';
import CategoryAvatar from '../CategoryAvatar';
import ListItemTable from './ListItemTable';
import { useAppState, useDispatch } from '../../utils/AppStateContext';
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
    avatarWrapperYear: {
      cursor: 'pointer',
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

function ListItem({ edge, mode, tab, index }: Props): JSX.Element {
  const classes = useStyles();
  const value = useSortedValue(edge);
  const { sortKey } = useAppState();
  const dispatch = useDispatch();
  const { node } = edge;

  const rankSort = () => {
    if (mode !== 'year') return;
    dispatch(sortKey !== 'rank' ? { type: 'CHANGE_SORTKEY', sortKey: 'rank' } : { type: 'TOGGLE_SORTASC' });
  };
  return (
    <div className={classes.root}>
      <div>
        <div className={clsx(classes.avatarWrapper, { [classes.avatarWrapperYear]: mode === 'year' })} onClick={rankSort}>
          <CategoryAvatar category={node.category ?? ''} />
          <Typography variant="body2" color={mode === 'year' && sortKey === 'rank' ? 'secondary' : 'inherit'}>
            {node.rank}位
          </Typography>
          {node.elevation ? <Typography variant="caption">{node.elevation}</Typography> : null}
        </div>
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
