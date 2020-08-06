import * as React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
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
      minWidth: 1000,
      scrollSnapType: 'both mandatory',
    },
  })
);

interface Props {
  id: string;
  mode: Mode;
  children: JSX.Element | JSX.Element[] | (JSX.Element | JSX.Element[])[];
}

function TableCore({ id, children, mode }: Props) {
  const classes = useStyles({ mode });

  return (
    <TableContainer className={classes.container}>
      <Table id={id} className={classes.table} size="small" stickyHeader>
        {children}
      </Table>
    </TableContainer>
  );
}

export default TableCore;
