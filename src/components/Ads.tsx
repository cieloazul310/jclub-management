/* eslint @typescript-eslint/no-explicit-any: "off" */
import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useLocation } from '@reach/router';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 1),
      overflow: 'hidden',
    },
  })
);

export function AdInDrawer() {
  const classes = useStyles();
  const { pathname } = useLocation();
  React.useEffect(() => {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, [pathname]);
  return (
    <div className={classes.root} key={pathname}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7323207940463794"
        data-ad-slot="2525174843"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

export function AdInArticle() {
  const classes = useStyles();
  const { pathname } = useLocation();
  React.useEffect(() => {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, [pathname]);
  return (
    <div className={classes.root} key={pathname}>
      {typeof window === 'object' ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', textAlign: 'center' }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-7323207940463794"
          data-ad-slot="9174058264"
        />
      ) : null}
    </div>
  );
}

export function AdInFooter() {
  const classes = useStyles();
  const { pathname } = useLocation();
  React.useEffect(() => {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, [pathname]);
  return (
    <div className={classes.root} key={pathname}>
      {typeof window === 'object' ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-7323207940463794"
          data-ad-slot="3332658358"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : null}
    </div>
  );
}

export function AdInListFooter() {
  const classes = useStyles();
  const { pathname } = useLocation();
  React.useEffect(() => {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, [pathname]);

  return (
    <div className={classes.root} key={pathname}>
      {typeof window === 'object' ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-7323207940463794"
          data-ad-slot="6963353890"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : null}
    </div>
  );
}
