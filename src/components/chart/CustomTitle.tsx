import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Title, TitleProps } from '@devexpress/dx-react-chart';

const useStyles = makeStyles((theme) =>
  createStyles({
    chartTitle: {
      flexGrow: 1,
      textAlign: 'center',
    },
  })
);

function TextComponent({ text }: Title.TextProps) {
  const classes = useStyles();
  return (
    <Typography className={classes.chartTitle} variant="body1" component="h3" gutterBottom>
      {text}
    </Typography>
  );
}

function CustomTitle({ ...props }: Omit<TitleProps, 'textComponent'>) {
  return <Title textComponent={TextComponent} {...props} />;
}

export default CustomTitle;
