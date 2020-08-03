import * as React from 'react';
import clsx from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import useTableStyles from './useTableStyles';

interface Props {
  mode: 'club' | 'year';
}

function TableHeadLabel({ mode }: Props) {
  const classes = useTableStyles();
  return (
    <TableCell className={clsx(classes.label, classes.head)} align="center">
      {mode === 'club' ? '年' : 'クラブ'}
    </TableCell>
  );
}

function TableBodyLabel({ children }: { children: number | string | null | undefined }) {
  const classes = useTableStyles();
  return (
    <TableCell className={clsx(classes.label, classes.tbodyLabel)} component="th" scope="row" align="center">
      {children}
    </TableCell>
  );
}

export { TableHeadLabel, TableBodyLabel };
