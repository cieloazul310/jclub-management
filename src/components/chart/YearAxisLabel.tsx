import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ArgumentAxis } from '@devexpress/dx-react-chart';
import useIsMobile from '../../utils/useIsMobile';

const useStyles = makeStyles((theme) =>
  createStyles({
    yearLabel: {
      fill: theme.palette.text.secondary,
      fontFamily: theme.typography.fontFamily,
      fontSize: 12,
      fontWeight: 400,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

function YearAxisLabel({ text, ...props }: ArgumentAxis.LabelProps) {
  const classes = useStyles();
  const isMobile = useIsMobile();
  return (
    <text className={classes.yearLabel} {...props}>
      {typeof text === 'number' || !isMobile ? text : text.slice(-2)}
    </text>
  );
}

export default YearAxisLabel;
