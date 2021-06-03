import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Chart, ChartProps } from '@devexpress/dx-react-chart-material-ui';

interface StylesProps {
  height?: number;
}

const useStyles = makeStyles<Theme, StylesProps>((theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      padding: theme.spacing(2, 1),
      height: ({ height }) => height ?? 300,
    },
    chart: {
      flexGrow: 1,
      maxWidth: theme.breakpoints.width('sm'),
      display: 'flex',
      flexDirection: 'column',
      padding: '10px',
      boxSizing: 'border-box',
    },
  })
);

function CustomChart(props: Omit<ChartProps, 'rootComponent'> & Chart.RootProps): JSX.Element {
  const { data, width, height, rotated } = props;
  const classes = useStyles({ height });
  const ChartComponent = ({ children }: Chart.RootProps) => <div className={classes.chart}>{children}</div>;

  const { children } = props;
  return (
    <div className={classes.container}>
      <Chart rootComponent={ChartComponent} data={data} width={width} height={height} rotated={rotated}>
        {children}
      </Chart>
    </div>
  );
}

export default CustomChart;
