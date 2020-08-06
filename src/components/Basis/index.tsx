import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useBasisStyles = makeStyles((theme) =>
  createStyles({
    basis: {
      padding: theme.spacing(2, 0),
    },
    basisLarge: {
      padding: theme.spacing(4, 0),
    },
  })
);

interface Props {
  children: JSX.Element | string | null | (JSX.Element | JSX.Element[] | string | null)[];
}

export function ContentBasis({ children }: Props) {
  const classes = useBasisStyles();
  return <div className={classes.basis}>{children}</div>;
}

export function ContentBasisLarge({ children }: Props) {
  const classes = useBasisStyles();
  return <div className={classes.basisLarge}>{children}</div>;
}
