import * as React from 'react';
import clsx from 'clsx';
import TableCell, { TableCellProps } from '@material-ui/core/TableCell';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useAppState, useDispatch } from '../../utils/AppStateContext';
import { Mode } from '../../types';
import { SortKey } from '../../utils/AppState';

const useStyles = makeStyles((theme) =>
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
      color: theme.palette.text.primary,
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    selected: {
      color: theme.palette.secondary.main,
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
  const classes = useStyles();
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
      className={clsx(
        classes.head,
        { [classes.sortable]: mode === 'year' && !!sortableKey },
        { [classes.selected]: mode === 'year' && selected }
      )}
      align="center"
      onClick={_onClick}
      {...props}
    >
      {children}
    </TableCell>
  );
}

export default TableHeadCell;
