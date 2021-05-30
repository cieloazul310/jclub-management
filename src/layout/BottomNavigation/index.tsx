import * as React from 'react';
import MuiBottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { SummaryIcon, SettingsIcon, FigureIcon, ArticleIcon } from '../../icons';
import { MobileTab } from '../../types';

interface Props {
  value: MobileTab;
  onChange: (event: React.ChangeEvent<unknown>, newValue: string) => void;
}

function BottomNavigation({ value, onChange }: Props): JSX.Element {
  return (
    <MuiBottomNavigation value={value} onChange={onChange} showLabels>
      <BottomNavigationAction label="概要" value="summary" icon={<SummaryIcon />} />
      <BottomNavigationAction label="表" value="figure" icon={<FigureIcon />} />
      <BottomNavigationAction label="解説" value="article" icon={<ArticleIcon />} />
      <BottomNavigationAction label="設定" value="settings" icon={<SettingsIcon />} />
    </MuiBottomNavigation>
  );
}

export default BottomNavigation;
