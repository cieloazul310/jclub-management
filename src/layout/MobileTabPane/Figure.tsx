import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import MobileTabPane, { MobileTabPaneProps } from './index';
import Figure from '../../components/figure';
import { useAppState } from '../../utils/AppStateContext';
import { tabs, Mode, Tab } from '../../types';
import { ClubTemplateQuery, YearTemplateQuery } from '../../../graphql-types';

type Props = {
  tab: Tab;
  data: ClubTemplateQuery | YearTemplateQuery;
  mode: Mode;
  onChangeTabIndex: (index: number) => void;
} & Omit<MobileTabPaneProps, 'children' | 'value'>;

function MainTab({ tab, data, mode, onChangeTabIndex, ...props }: Props) {
  const { listMode } = useAppState();
  return (
    <MobileTabPane value="figure" {...props}>
      <SwipeableViews resistance disabled={!listMode} index={tabs.indexOf(tab)} onChangeIndex={onChangeTabIndex}>
        {tabs.map((t) => (
          <div key={t} role="tabpanel" hidden={t !== tab}>
            {t === tab ? <Figure edges={data.allDataset.edges} mode={mode} tab={t} /> : null}
          </div>
        ))}
      </SwipeableViews>
    </MobileTabPane>
  );
}

export default MainTab;
