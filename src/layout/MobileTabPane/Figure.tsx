import * as React from 'react';
import MobileTabPane, { MobileTabPaneProps } from './index';
import Figure from '../../components/figure';
import { Mode, Tab } from '../../types';
import { ClubTemplateQuery, YearTemplateQuery } from '../../../graphql-types';

type Props = {
  tab: Tab;
  data: ClubTemplateQuery | YearTemplateQuery;
  mode: Mode;
} & Omit<MobileTabPaneProps, 'children' | 'value'>;

function MainTab({ tab, data, mode, ...props }: Props) {
  return (
    <MobileTabPane value="figure" {...props}>
      <Figure edges={data.allDataset.edges} mode={mode} tab={tab} />
    </MobileTabPane>
  );
}

export default MainTab;
