import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import TopThemeProvider from './TopThemeProvider';
import AppStateProvider from './AppStateProvider';
import ThemeDispatchContext from './ThemeStateContext';
import themeReducer, { PaletteType } from './ThemeState';
import initialTheme from '../../../src/utils/theme';

interface Props {
  children: JSX.Element | JSX.Element[] | (JSX.Element | JSX.Element[])[];
  siteId: string;
  storedItem: {
    paletteType: PaletteType;
    useSystemTheme: boolean;
  } | null;
  isMobile?: boolean | null;
}

export default function TopLayout({ children, storedItem, siteId, isMobile }: Props) {
  const defaultPaletteType = initialTheme.palette.type;
  const storedPaletteType = storedItem?.paletteType ?? defaultPaletteType;
  const storedUseSystemTheme = storedItem?.useSystemTheme ?? false;

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [themeState, themeDispatch] = React.useReducer(themeReducer, {
    darkMode: storedPaletteType === 'dark',
    useSystemTheme: storedUseSystemTheme,
  });
  const { darkMode, useSystemTheme } = themeState;
  const paletteType = useSystemTheme ? (prefersDarkMode ? 'dark' : 'light') : darkMode ? 'dark' : 'light';

  // persist paletteType
  React.useEffect(() => {
    localStorage.setItem(
      siteId,
      JSON.stringify({
        paletteType: darkMode ? 'dark' : 'light',
        useSystemTheme,
      })
    );
  }, [siteId, darkMode, useSystemTheme]);
  /**
   * once and deprecated old storage
   */
  React.useEffect(() => {
    localStorage.removeItem('paletteType');
    localStorage.removeItem('useSystemTheme');
  });

  return (
    <TopThemeProvider paletteType={paletteType}>
      <ThemeDispatchContext.Provider value={{ state: themeState, dispatch: themeDispatch }}>
        <AppStateProvider isMobile={isMobile ?? false}>{children}</AppStateProvider>
      </ThemeDispatchContext.Provider>
    </TopThemeProvider>
  );
}
