import * as React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableFooter from './TableFooter';
import { Mode } from '../../types';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface StylesProps {
  mode: Mode;
}

const useStyles = makeStyles<Theme, StylesProps>((theme) =>
  createStyles({
    container: {
      maxHeight: ({ mode }) => (mode === 'year' ? 'calc(100vh - 240px)' : undefined),
    },
    table: {
      minWidth: 600,
    },
  })
);

interface Props {
  id: string;
  caption?: string;
  mode: 'club' | 'year';
  children: JSX.Element | JSX.Element[] | (JSX.Element | JSX.Element[])[];
}

function TableCore({ id, children, mode, caption }: Props) {
  const classes = useStyles({ mode });

  return (
    <Paper>
      <TableContainer className={classes.container}>
        <Table id={id} className={classes.table} size="small" stickyHeader>
          {caption ? <caption>{caption}</caption> : null}
          {children}
        </Table>
      </TableContainer>
      <TableFooter tableId={id} />
    </Paper>
  );
}

export default TableCore;
