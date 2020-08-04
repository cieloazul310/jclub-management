import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useUnitString from '../../utils/useUnitString';
import useStateString from '../../utils/useStateString';
import { Mode, Tab } from '../../types';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: 48,
      padding: theme.spacing(0, 0.5),
      display: 'flex',
      flexDirection: 'row-reverse',
    },
    right: {
      display: 'flex',
      flexDirection: 'column-reverse',
    },
    left: {
      display: 'flex',
      flexDirection: 'column-reverse',
      flexGrow: 1,
    },
  })
);

interface Props {
  mode: Mode;
  tab: Tab;
}

function TableToolbar({ mode, tab }: Props) {
  const classes = useStyles();
  const unitString = useUnitString(tab);
  const { sortString, filterString } = useStateString();
  return (
    <div className={classes.root}>
      <div className={classes.right}>
        <Typography variant="caption">{unitString}</Typography>
      </div>
      {mode === 'year' ? (
        <div className={classes.left}>
          <Typography variant="caption">{sortString}</Typography>
          <Typography variant="caption">{filterString}</Typography>
        </div>
      ) : null}
    </div>
  );
}

export default TableToolbar;
