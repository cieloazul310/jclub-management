import * as React from 'react';
import { Helmet } from 'react-helmet';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme, lighten } from '@material-ui/core/styles';
import initialMuiTheme from '../../../src/utils/theme';

interface Props {
  children: JSX.Element | JSX.Element[] | (JSX.Element | JSX.Element[])[] | string;
  paletteType: 'light' | 'dark';
}

export default function TopThemeProvider({ children, paletteType }: Props) {
  const theme = React.useMemo(() => {
    return createMuiTheme({
      ...initialMuiTheme,
      palette: {
        ...initialMuiTheme.palette.primary,
        primary: {
          main: paletteType === 'dark' ? lighten(initialMuiTheme.palette.primary.main, 0.4) : initialMuiTheme.palette.primary.main,
        },
        secondary: {
          ...initialMuiTheme.palette.secondary,
          main: paletteType === 'dark' ? lighten(initialMuiTheme.palette.secondary.main, 0.4) : initialMuiTheme.palette.secondary.main,
        },
        type: paletteType,
      },
    });
  }, [paletteType]);

  // take away SSR rendered mode;
  React.useEffect(() => {
    document.body.className = '';
  }, []);

  return (
    <>
      <Helmet>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
        {/*<link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap" rel="stylesheet" />*/}
      </Helmet>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  );
}
