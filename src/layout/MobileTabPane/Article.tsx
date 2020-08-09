import * as React from 'react';
import Container from '@material-ui/core/Container';
import SwipeableViews from 'react-swipeable-views';
import MobileTabPane, { MobileTabPaneProps } from './index';
import { ContentBasisLarge, ContentBasis } from '../../components/Basis';
import { PLDoc, BSDoc, RevenueDoc, ExpenseDoc, AttdDoc, AttributionDoc } from '../../components/docs';
import { AdInArticle } from '../../components/Ads';
import { Mode, Tab, tabs } from '../../types';
import { ClubTemplateQuery, YearTemplateQuery } from '../../../graphql-types';

type Props = {
  tab: Tab;
  data: ClubTemplateQuery | YearTemplateQuery;
  mode: Mode;
  onChangeTabIndex: (index: number) => void;
} & Omit<MobileTabPaneProps, 'children' | 'value'>;

function MainTab({ tab, data, mode, onChangeTabIndex, ...props }: Props) {
  return (
    <MobileTabPane value="article" {...props}>
      <ContentBasisLarge>
        <SwipeableViews resistance index={tabs.indexOf(tab)} onChangeIndex={onChangeTabIndex}>
          {tabs.map((t) => (
            <div key={t} role="tabpanel" hidden={t !== tab}>
              {t === tab ? (
                <ContentBasis>
                  <Container maxWidth="md">
                    <article>
                      <section>
                        <ContentBasisLarge>
                          <article>
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
                          </article>
                        </ContentBasisLarge>
                      </section>
                      <section>
                        <ContentBasisLarge>
                          <AttributionDoc />
                        </ContentBasisLarge>
                      </section>
                    </article>
                  </Container>
                </ContentBasis>
              ) : null}
            </div>
          ))}
        </SwipeableViews>
        <ContentBasisLarge>
          <AdInArticle />
        </ContentBasisLarge>
      </ContentBasisLarge>
    </MobileTabPane>
  );
}

export default MainTab;
