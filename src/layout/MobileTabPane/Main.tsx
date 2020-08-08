import * as React from 'react';
import Container from '@material-ui/core/Container';
import SwipeableViews from 'react-swipeable-views';
import MobileTabPane, { MobileTabPaneProps } from './index';
import { ContentBasisLarge, ContentBasis } from '../../components/Basis';
import Figure from '../../components/figure';
import { PLDoc, BSDoc, RevenueDoc, ExpenseDoc, AttdDoc } from '../../components/docs';
import useIsMobile from '../../utils/useIsMobile';
import { Mode, Tab, ContentTab, tabs } from '../../types';
import { ClubTemplateQuery, YearTemplateQuery } from '../../../graphql-types';

type Props = {
  tab: Tab;
  data: ClubTemplateQuery | YearTemplateQuery;
  mode: Mode;
  contentTab: ContentTab;
  setContentTab: (contentTab: ContentTab) => void;
  onChangeTabIndex: (index: number) => void;
} & Omit<MobileTabPaneProps, 'children' | 'value'>;

function MainTab({ tab, data, mode, contentTab, setContentTab, onChangeTabIndex, ...props }: Props) {
  const isMobile = useIsMobile();
  return (
    <MobileTabPane value="main" {...props}>
      <div hidden={isMobile && contentTab !== 'figure'} role="tabpanel">
        {!isMobile || contentTab === 'figure' ? <Figure edges={data.allDataset.edges} mode={mode} tab={tab} /> : null}
      </div>
      <div hidden={isMobile && contentTab !== 'article'} role="tabpanel">
        {!isMobile || contentTab === 'article' ? (
          <ContentBasisLarge>
            <SwipeableViews index={tabs.indexOf(tab)} onChangeIndex={onChangeTabIndex}>
              {tabs.map((t) => (
                <div key={t} role="tabpanel" hidden={t !== tab}>
                  {t === tab ? (
                    <ContentBasis>
                      <Container maxWidth="md">
                        {t === 'pl' ? (
                          <PLDoc />
                        ) : t === 'bs' ? (
                          <BSDoc />
                        ) : t === 'revenue' ? (
                          <RevenueDoc />
                        ) : t === 'expense' ? (
                          <ExpenseDoc />
                        ) : (
                          <AttdDoc />
                        )}
                      </Container>
                    </ContentBasis>
                  ) : null}
                </div>
              ))}
            </SwipeableViews>
          </ContentBasisLarge>
        ) : null}
      </div>
    </MobileTabPane>
  );
}

export default MainTab;
