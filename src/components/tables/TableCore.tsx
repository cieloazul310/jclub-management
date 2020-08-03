import * as React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      maxHeight: 'calc(100vh - 120px)',
    },
    table: {
      minWidth: 600,
    },
  })
);

interface Props {
  caption?: string;
  children: JSX.Element | JSX.Element[] | (JSX.Element | JSX.Element[])[];
}

function TableCore({ children, caption }: Props) {
  const classes = useStyles();
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
