import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import { makeStyles, createStyles } from '@material-ui/core/styles';
// import { Mode } from '../../types';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      flexGrow: 1,
    },
    table: {
      minWidth: 1000,
      scrollSnapType: 'both mandatory',
    },
  })
);

interface Props {
  id: string;
  // mode: Mode;
  children: React.ReactNode;
}

function TableCore({ id, children }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table id={id} className={classes.table} size="small" stickyHeader>
        {children}
      </Table>
    </TableContainer>
  );
}

export default TableCore;
