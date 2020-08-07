import * as React from 'react';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import { ContentBasisLarge } from '../../components/Basis';
import Figure from '../../components/Figure';
import { PLDoc, BSDoc, RevenueDoc, ExpenseDoc, AttdDoc } from '../../components/docs';
import { Edge, Tab, Mode, ContentTab } from '../../types';

interface ContentProps {
  edges: Edge[];
  mode: Mode;
  value: Tab;
  content: Tab;
  contentTab: ContentTab;
  setContentTab: (contentTab: ContentTab) => void;
}

function TabContent({ edges, mode, value, content, contentTab, setContentTab }: ContentProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  return (
    <div role="tabpanel" hidden={value !== content}>
      {value === content ? (
        <>
          <div hidden={isMobile && contentTab !== 'figure'}>
            {!isMobile || contentTab === 'figure' ? <Figure edges={edges} mode={mode} tab={content} /> : null}
          </div>
          <div hidden={isMobile && contentTab !== 'article'}>
            {!isMobile || contentTab === 'article' ? (
              <Container maxWidth="md">
                <ContentBasisLarge>
                  {content === 'pl' ? (
                    <PLDoc />
                  ) : content === 'bs' ? (
                    <BSDoc />
                  ) : content === 'revenue' ? (
                    <RevenueDoc />
                  ) : content === 'expense' ? (
                    <ExpenseDoc />
                  ) : (
                    <AttdDoc />
                  )}
                </ContentBasisLarge>
              </Container>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default TabContent;
