import * as React from 'react';
import clsx from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Mode } from '../../types';

const useStyles = makeStyles((theme) =>
  createStyles({
    head: {
      fontWeight: 'bold',
      fontSize: theme.typography.caption.fontSize,
      padding: theme.spacing(1, 0.5),
      minWidth: '6em',
    },
    label: {
      position: 'sticky',
      left: 0,
      zIndex: 3,
      minWidth: '8em',
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    tbodyLabel: {
      fontWeight: 'bold',
      zIndex: 2,
      background: theme.palette.background.default,
    },
  })
);

interface Props {
  mode: Mode;
}

function TableHeadLabel({ mode }: Props) {
  const classes = useStyles();
  return (
    <TableCell className={clsx(classes.label, classes.head)} align="center">
      {mode === 'club' ? '年' : 'クラブ'}
    </TableCell>
  );
}

function TableBodyLabel({ children }: { children: number | string | null | undefined }) {
  const classes = useStyles();
  return (
    <TableCell className={clsx(classes.label, classes.tbodyLabel)} component="th" scope="row" align="center">
      {children}
    </TableCell>
  );
}

export { TableHeadLabel, TableBodyLabel };
