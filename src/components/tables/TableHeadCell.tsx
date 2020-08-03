import * as React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useAppState, useDispatch } from '../../utils/AppStateContext';
import { Mode } from '../../types';
import { SortKey } from '../../utils/AppState';

interface StylesProps {
  mode: Mode;
  sortable: boolean;
  selected: boolean;
}

const useStyles = makeStyles<Theme, StylesProps>((theme) =>
  createStyles({
    head: {
      fontWeight: 'bold',
      fontSize: theme.typography.caption.fontSize,
      padding: theme.spacing(1, 0.5),
      minWidth: '6em',
      color: ({ mode, sortable, selected }) =>
        mode === 'club' || !sortable ? theme.palette.text.secondary : !selected ? theme.palette.text.primary : theme.palette.primary.main,
      cursor: ({ mode, sortable }) => (mode === 'year' && sortable ? 'pointer' : undefined),
    },
  })
);

interface Props {
  mode: Mode;
  sortableKey?: SortKey;
  children: string;
}

function TableHeadCell({ sortableKey, mode, children }: Props) {
  const { sortKey } = useAppState();
  const selected = sortKey === sortableKey;
  const classes = useStyles({ mode, selected, sortable: !sortableKey ? false : true });
  const dispatch = useDispatch();
  const _onClick = () => {
    if (mode === 'club' || !sortableKey) return;
    if (selected) {
      dispatch({ type: 'TOGGLE_SORTASC' });
    } else {
      dispatch({ type: 'CHANGE_SORTKEY', sortKey: sortableKey });
    }
  };

  return (
    <TableCell className={classes.head} align="center" onClick={_onClick}>
      {children}
    </TableCell>
  );
}

export default TableHeadCell;
