import * as React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import MobileTabPane, { MobileTabPaneProps } from './index';
import { ContentBasisLarge, ContentBasis } from '../../components/Basis';
import ClubInfo from '../../components/ClubInfo';
import YearInfo from '../../components/YearInfo';
import PageNavigation from '../../components/PageNavigation';
import { CategoryLink, YearsLink } from '../../components/links';

import { Mode } from '../../types';
import { ClubTemplateQuery, YearTemplateQuery, SitePageContextNext, SitePageContextPrevious } from '../../../graphql-types';

type Props = {
  mode: Mode;
  data: ClubTemplateQuery | YearTemplateQuery;
  previous?: SitePageContextPrevious | null;
  next?: SitePageContextNext | null;
} & Omit<MobileTabPaneProps, 'children' | 'value'>;

function SummaryTabPane({ mode, data, previous, next, ...props }: Props) {
  return (
    <MobileTabPane value="summary" {...props}>
      <ContentBasisLarge>
        <Container maxWidth="md">
          <ContentBasis>
            <Typography variant="h3" component="h2" gutterBottom>
              概要
            </Typography>
            {mode === 'club' ? (
              <ClubInfo clubsYaml={data.clubsYaml} />
            ) : (
              <YearInfo edges={data.allDataset.edges} yearYaml={data.yearsYaml} />
            )}
          </ContentBasis>
          <ContentBasis>{mode === 'club' ? <CategoryLink category={data.clubsYaml.category} /> : <YearsLink />}</ContentBasis>
          <ContentBasis>
            <PageNavigation previous={previous} next={next} />
          </ContentBasis>
        </Container>
      </ContentBasisLarge>
    </MobileTabPane>
  );
}

export default SummaryTabPane;
