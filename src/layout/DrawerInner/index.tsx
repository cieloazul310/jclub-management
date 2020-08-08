import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import DrawerNavigation from './DrawerNavigation';
import DrawerLinks from './DrawerLinks';
import StateHandler from './StateHandler';
import ThemeHandler from './ThemeHandler';
import AppLink from '../../components/AppLink';
import { useSiteMetadata } from '../../utils/graphql-hooks';
import { SitePageContextNext, SitePageContextPrevious } from '../../../graphql-types';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: 280,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
    },
    titleContainer: {
      padding: theme.spacing(2),
    },
    toolbar: {
      ...theme.mixins.toolbar,
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 2),
    },
    items: {
      flexGrow: 1,
      overflowY: 'auto',
    },
  })
);

interface Props {
  title?: string;
  next?: SitePageContextNext | null;
  previous?: SitePageContextPrevious | null;
  drawerContents?: JSX.Element | JSX.Element[] | (JSX.Element | JSX.Element[])[];
  onCloseIconClick: () => void;
}

function DrawerInner({ title, next, previous, drawerContents, onCloseIconClick }: Props) {
  const classes = useStyles();
  const siteTitle = useSiteMetadata().title;
  return (
    <div className={classes.root}>
      <div>
        <div className={classes.toolbar}>
          <Tooltip title="閉じる">
            <IconButton edge="start" onClick={onCloseIconClick}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </div>
        <Divider />
        <div className={classes.titleContainer}>
          <Typography variant="body1" gutterBottom>
            <AppLink to="/" color="inherit">
              <strong>{title ?? siteTitle}</strong>
            </AppLink>
          </Typography>
        </div>
        <DrawerNavigation next={next} previous={previous} />
        <Divider />
      </div>
      <div className={classes.items}>
        {drawerContents}
        {drawerContents ? <Divider /> : null}
        <Divider />
        <DrawerLinks />
        <Hidden only="xs">
          <Divider />
          <StateHandler />
          <ThemeHandler />
        </Hidden>
      </div>
    </div>
  );
}

export default DrawerInner;
