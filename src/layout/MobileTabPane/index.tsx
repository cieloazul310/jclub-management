import * as React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { MobileTab } from '../../types';

export interface MobileTabPaneProps {
  mobileOnly?: boolean;
  value: MobileTab;
  mobileTab: MobileTab;
  children: React.ReactNode;
}

function MobileTabPane({ value, mobileTab, children, mobileOnly = false }: MobileTabPaneProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  return !mobileOnly || isMobile ? (
    <div role="tabpanel" hidden={isMobile && value !== mobileTab}>
      {!isMobile || value === mobileTab ? children : null}
    </div>
  ) : null;
}

export default MobileTabPane;
