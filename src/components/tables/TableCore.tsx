import * as React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import { Mode } from '../../types';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface StylesProps {
  mode: Mode;
}

const useStyles = makeStyles<Theme, StylesProps>((theme) =>
  createStyles({
    container: {
      maxHeight: ({ mode }) => (mode === 'year' ? 'calc(100vh - 200px)' : undefined),
    },
    table: {
      minWidth: 600,
    },
  })
);

interface Props {
  caption?: string;
  mode: 'club' | 'year';
  children: JSX.Element | JSX.Element[] | (JSX.Element | JSX.Element[])[];
}

function TableCore({ children, mode, caption }: Props) {
  const classes = useStyles({ mode });
  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} size="small" stickyHeader>
        {caption ? <caption>{caption}</caption> : null}
        {children}
      </Table>
    </TableContainer>
  );
}

export default TableCore;
