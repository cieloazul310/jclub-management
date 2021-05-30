import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    tabPane: {
      padding: theme.spacing(2, 0),
    },
  })
);

interface Props {
  index: number;
  value: number;
  children: React.ReactNode;
}

function TabPane({ index, value, children }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.tabPane} hidden={index !== value}>
      {index === value ? children : null}
    </div>
  );
}

export default TabPane;
