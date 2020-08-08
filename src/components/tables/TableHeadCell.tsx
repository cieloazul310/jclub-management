import * as React from 'react';
import clsx from 'clsx';
import TableCell, { TableCellProps } from '@material-ui/core/TableCell';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useAppState, useDispatch } from '../../utils/AppStateContext';
import { Mode } from '../../types';
import { SortKey } from '../../utils/AppState';

interface StylesProps {
  mode: Mode;
}

const useStyles = makeStyles<Theme, StylesProps>((theme) =>
  createStyles({
    head: {
      fontWeight: 'bold',
      fontSize: theme.typography.caption.fontSize,
      padding: theme.spacing(1, 0.5),
      lineHeight: 1.2,
      minWidth: '6em',
      color: theme.palette.text.secondary,
    },
    sortable: {
      color: ({ mode }) => (mode === 'club' ? undefined : theme.palette.text.primary),
      cursor: ({ mode }) => (mode === 'club' ? undefined : 'pointer'),
      '&:hover': {
        textDecoration: ({ mode }) => (mode === 'club' ? undefined : 'underline'),
      },
    },
    selected: {
      color: ({ mode }) => (mode === 'club' ? undefined : theme.palette.primary.main),
    },
  })
);

interface Props extends TableCellProps {
  mode: Mode;
  sortableKey?: SortKey;
}

function TableHeadCell({ sortableKey, mode, children, ...props }: Props) {
  const { sortKey } = useAppState();
  const selected = sortKey === sortableKey;
  const classes = useStyles({ mode });
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
    <TableCell
      className={clsx(classes.head, { [classes.sortable]: !!sortableKey }, { [classes.selected]: selected })}
      align="center"
      onClick={_onClick}
      {...props}
    >
      {children}
    </TableCell>
  );
}

export default TableHeadCell;
