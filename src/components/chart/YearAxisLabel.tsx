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

function YearAxisLabel({ text, x, y, dy, textAnchor }: ArgumentAxis.LabelProps): JSX.Element {
  const classes = useStyles();
  const isMobile = useIsMobile();
  return (
    <text className={classes.yearLabel} x={x} y={y} dy={dy} textAnchor={textAnchor}>
      {typeof text === 'number' || !isMobile ? text : text.slice(-2)}
    </text>
  );
}

export default YearAxisLabel;
