import * as React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import MobileTabPane, { MobileTabPaneProps } from './index';
import { ContentBasisLarge } from '../../components/Basis';
import ClubInfo from '../../components/ClubInfo';
import YearInfo from '../../components/YearInfo';
import { Mode } from '../../types';
import { ClubTemplateQuery, YearTemplateQuery } from '../../../graphql-types';

type Props = {
  mode: Mode;
  data: ClubTemplateQuery | YearTemplateQuery;
} & Omit<MobileTabPaneProps, 'children' | 'value'>;

function SummaryTabPane({ mode, data, ...props }: Props) {
  return (
    <MobileTabPane value="summary" {...props}>
      <ContentBasisLarge>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom>
            概要
          </Typography>
          {mode === 'club' ? <ClubInfo clubsYaml={data.clubsYaml} /> : <YearInfo edges={data.allDataset.edges} yearYaml={data.yearsYaml} />}
        </Container>
      </ContentBasisLarge>
    </MobileTabPane>
  );
}

export default SummaryTabPane;
