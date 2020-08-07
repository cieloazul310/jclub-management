import * as React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import MobileTabPane, { MobileTabPaneProps } from './index';
import { ContentBasisLarge } from '../../components/Basis';
import ClubInfo from '../../components/ClubInfo';
import YearInfo from '../../components/YearInfo';
import AttributionDoc from '../../components/docs/Attribution';
import { Mode } from '../../types';

type Props = {
  mode: Mode;
  data: any;
} & Omit<MobileTabPaneProps, 'children' | 'value'>;

function SummaryTabPane({ mode, data, ...props }: Props) {
  return (
    <MobileTabPane value="summary" {...props}>
      <ContentBasisLarge>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom>
            概要
          </Typography>
          {mode === 'club' ? <ClubInfo clubsYaml={data.clubsYaml} /> : <YearInfo edges={data.edges} yearYaml={data.yearYaml} />}
        </Container>
      </ContentBasisLarge>
      <ContentBasisLarge>
        <Container maxWidth="md">
          <AttributionDoc />
        </Container>
      </ContentBasisLarge>
    </MobileTabPane>
  );
}

export default SummaryTabPane;
