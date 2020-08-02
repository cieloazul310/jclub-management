import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    td: {},
  })
);

interface Props {
  children: string | number;
  emphasize: boolean;
}

function TableCell({ children }: Props) {
  const classes = useStyles();
  return <td className={classes.td}>{children}</td>;
}

export default TableCell;
