import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import MobileTabPane, { MobileTabPaneProps } from './index';
import TabContent from '../TabContent';
import { Mode, Tab, ContentTab, tabs } from '../../types';

type Props = {
  tab: Tab;
  data: any;
  mode: Mode;
  contentTab: ContentTab;
  setContentTab: (contentTab: ContentTab) => void;
  onChangeTabIndex: (index: number) => void;
} & Omit<MobileTabPaneProps, 'children' | 'value'>;

function MainTab({ tab, data, mode, contentTab, setContentTab, onChangeTabIndex, ...props }: Props) {
  return (
    <MobileTabPane value="main" {...props}>
      <SwipeableViews index={tabs.indexOf(tab)} onChangeIndex={onChangeTabIndex}>
        {tabs.map((tabContent) => (
          <TabContent
            key={tabContent}
            edges={data.allDataset.edges}
            mode={mode}
            value={tabContent}
            content={tab}
            contentTab={contentTab}
            setContentTab={setContentTab}
          />
        ))}
      </SwipeableViews>
    </MobileTabPane>
  );
}

export default MainTab;
