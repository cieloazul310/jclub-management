import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import DrawerMenu from './DrawerMenu';
import DrawerLinks from './DrawerLinks';
import StateHandler from './StateHandler';
import ThemeHandler from './ThemeHandler';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: 280,
    },
    toolbar: {
      ...theme.mixins.toolbar,
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 2),
    },
  })
);

interface Props {
  drawerContents?: JSX.Element | JSX.Element[] | (JSX.Element | JSX.Element[])[];
  onCloseIconClick: () => void;
}

function DrawerInner({ drawerContents, onCloseIconClick }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.toolbar}>
        <Tooltip title="閉じる">
          <IconButton edge="start" onClick={onCloseIconClick}>
            <ClearIcon />
          </IconButton>
        </Tooltip>
      </div>
      <Divider />
      {drawerContents}
      {drawerContents ? <Divider /> : null}
      <DrawerMenu />
      <Divider />
      <DrawerLinks />
      <Hidden only="xs">
        <Divider />
        <StateHandler />
        <ThemeHandler />
      </Hidden>
    </div>
  );
}

export default DrawerInner;
