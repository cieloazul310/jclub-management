import * as React from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import { useTheme } from '@material-ui/core/styles';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import {
  useThemeContextState,
  useToggleDark,
  useToggleUseSystem,
} from '../../../plugins/gatsby-plugin-top-layout/components/ThemeStateContext';

function ThemeHandler(): JSX.Element {
  const { type } = useTheme().palette;
  const { darkMode, useSystemTheme } = useThemeContextState();
  const toggleDark = useToggleDark();
  const toggleUseSystem = useToggleUseSystem();

  return (
    <List subheader={<ListSubheader>画面</ListSubheader>}>
      <ListItem disabled={useSystemTheme}>
        <ListItemIcon>{darkMode ? <Brightness2Icon /> : <Brightness5Icon />}</ListItemIcon>
        <ListItemText primary="ダークモード" />
        <ListItemSecondaryAction>
          <Switch disabled={useSystemTheme} edge="end" checked={darkMode} onChange={toggleDark} />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          {type === 'dark' ? (
            <Brightness2Icon color={useSystemTheme ? 'inherit' : 'disabled'} />
          ) : (
            <Brightness5Icon color={useSystemTheme ? 'inherit' : 'disabled'} />
          )}
        </ListItemIcon>
        <ListItemText primary="OSの設定を使用" />
        <ListItemSecondaryAction>
          <Switch checked={useSystemTheme} edge="end" onChange={toggleUseSystem} />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

export default ThemeHandler;
