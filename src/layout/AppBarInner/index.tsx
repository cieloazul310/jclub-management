import * as React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import TwitterIcon from '@material-ui/icons/Twitter';
import { useTwitterShare } from '../../utils/useSocialShare';

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      display: 'flex',
      flexGrow: 1,
      paddingLeft: theme.spacing(1),
      [theme.breakpoints.only('xs')]: {
        justifyContent: 'center',
        paddingLeft: 0,
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
  onLeftButtonClick?: () => void;
}

function AppBarInner({
  title,
  onLeftButtonClick = () => {
    // do nothing
  },
}: Props) {
  const classes = useStyles();
  const twitterShare = useTwitterShare(title);
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
      <Hidden smUp>
        <div className={classes.dummyIconOuter}>
          <div className={classes.dummyIconInner} />
        </div>
      </Hidden>
      <Hidden xsDown>
        <Tooltip title="Twitterで共有する">
          <IconButton edge="end" color="inherit" href={twitterShare} target="_blank">
            <TwitterIcon />
          </IconButton>
        </Tooltip>
      </Hidden>
    </Toolbar>
  );
}

export default AppBarInner;
