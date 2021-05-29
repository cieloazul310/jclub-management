import * as React from 'react';
import clsx from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AppLink } from '../AppLink';
import { Mode, Edge } from '../../types';

interface StylesProps {
  mode: Mode;
}

const useStyles = makeStyles<Theme, StylesProps>((theme) =>
  createStyles({
    theadLabel: {
      fontWeight: 'bold',
      fontSize: theme.typography.caption.fontSize,
      padding: theme.spacing(1, 0.5),
      zIndex: 3,
    },
    tbodyLabel: {
      fontWeight: 'bold',
      zIndex: 2,
      background: theme.palette.background.default,
    },
    index: {
      position: 'sticky',
      left: 0,
      width: 24,
      padding: theme.spacing(0.5),
    },
    label: {
      position: 'sticky',
      left: ({ mode }) => (mode === 'club' ? 0 : 24),
      minWidth: '8em',
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  })
);

interface Props {
  mode: Mode;
}

function TableHeadLabel({ mode }: Props) {
  const classes = useStyles({ mode });
  return mode === 'club' ? (
    <TableCell className={clsx(classes.label, classes.theadLabel)} align="center">
      年
    </TableCell>
  ) : (
    <>
      <TableCell className={clsx(classes.index, classes.theadLabel)} />
      <TableCell className={clsx(classes.label, classes.theadLabel)} align="center">
        クラブ
      </TableCell>
    </>
  );
}

interface TableBodyLabelProps {
  mode: Mode;
  index: number;
  edge: Edge;
}

function TableBodyLabel({ mode, index, edge }: TableBodyLabelProps) {
  const classes = useStyles({ mode });
  const { node } = edge;
  return mode === 'club' ? (
    <TableCell className={clsx(classes.label, classes.tbodyLabel)} component="th" scope="row" align="center">
      <AppLink to={`/year/${node.year}/`} color="inherit">
        {node.year}
      </AppLink>
    </TableCell>
  ) : (
    <>
      <TableCell className={clsx(classes.index, classes.tbodyLabel)} component="th" scope="row" align="right">
        {index + 1}
      </TableCell>
      <TableCell className={clsx(classes.label, classes.tbodyLabel)} component="th" scope="row" align="right">
        <AppLink to={`/club/${node.slug}/`} color="inherit">
          {node.name}
        </AppLink>
      </TableCell>
    </>
  );
}

export { TableHeadLabel, TableBodyLabel };
