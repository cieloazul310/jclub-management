import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Mode } from '../../types';

interface StylesProps {
  mode: Mode;
}

const useStyles = makeStyles<Theme, StylesProps>((theme) =>
  createStyles({
    container: {
      flexGrow: 1,
      [theme.breakpoints.only('xs')]: {
        paddingBottom: 56,
      },
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
    <TableContainer className={classes.container} component={Paper}>
      <Table id={id} className={classes.table} size="small" stickyHeader>
        {children}
      </Table>
    </TableContainer>
  );
}

export default TableCore;
