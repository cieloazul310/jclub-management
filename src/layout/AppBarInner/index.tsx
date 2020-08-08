import * as React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AppBarNavigation from './AppBarNavigation';
import { SitePageContextNext, SitePageContextPrevious } from '../../../graphql-types';

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      display: 'flex',
      flexGrow: 1,
      padding: theme.spacing(0, 1),
      [theme.breakpoints.only('xs')]: {
        justifyContent: 'center',
      },
    },
    dummyIconOuter: {
      padding: theme.spacing(1.5),
      marginRight: theme.spacing(-1.5),
    },
    dummyIconInner: {
      width: '1em',
      height: '1em',
      fontSize: '1.5rem',
    },
  })
);

interface Props {
  title?: string;
  previous?: SitePageContextPrevious | null;
  next?: SitePageContextNext | null;
  onLeftButtonClick?: () => void;
}

function AppBarInner({
  title,
  previous,
  next,
  onLeftButtonClick = () => {
    // do nothing
  },
}: Props) {
  const classes = useStyles();
  return (
    <Toolbar>
      <Tooltip title="メニュー">
        <IconButton edge="start" color="inherit" onClick={onLeftButtonClick}>
          <MenuIcon />
        </IconButton>
      </Tooltip>
      <Typography className={classes.title} variant="h6" component="h1">
        {title ?? 'Title'}
      </Typography>
      <Hidden smUp implementation="css">
        <div className={classes.dummyIconOuter}>
          <div className={classes.dummyIconInner} />
        </div>
      </Hidden>
      <Hidden xsDown implementation="css">
        <AppBarNavigation previous={previous} next={next} />
      </Hidden>
    </Toolbar>
  );
}

export default AppBarInner;
