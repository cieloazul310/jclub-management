import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import useIsMobile from '../../utils/useIsMobile';
import { MobileTab } from '../../types';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      [theme.breakpoints.only('xs')]: {
        paddingBottom: 86,
      },
    },
  })
);

export interface MobileTabPaneProps {
  mobileOnly?: boolean;
  value: MobileTab;
  mobileTab: MobileTab;
  children: React.ReactNode;
}

function MobileTabPane({ value, mobileTab, children, mobileOnly = false }: MobileTabPaneProps) {
  const classes = useStyles();
  const isMobile = useIsMobile();
  return !mobileOnly || isMobile ? (
    <div className={classes.root} role="tabpanel" hidden={isMobile && value !== mobileTab}>
      <section>{!isMobile || value === mobileTab ? children : null}</section>
    </div>
  ) : null;
}

export default MobileTabPane;
