import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import { BarSeries, ArgumentAxis, ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import Chart from './chart/CustomChart';
import Title from './chart/CustomTitle';
import YearAxisLabel from './chart/YearAxisLabel';
import { ContentBasis } from './Basis';
import { ClubTemplateQuery } from '../../graphql-types';

interface Props {
  data: ClubTemplateQuery;
}

function ClubInfo({ data }: Props): JSX.Element {
  const { clubsYaml, allDataset } = data;
  return (
    <ContentBasis>
      <Typography variant="h6" component="h2" gutterBottom>
        {clubsYaml?.name}
      </Typography>
      {allDataset.edges.length > 2 ? (
        <Chart height={360} data={allDataset.edges.map(({ node }) => ({ ...node, year: node.year?.toString() }))}>
          <ArgumentAxis labelComponent={YearAxisLabel} />
          <ValueAxis />
          <BarSeries valueField="revenue" argumentField="year" />
          <Title text="営業収入推移" />
        </Chart>
      ) : null}
      <Typography variant="body2" component="ul">
        <li>正式名称: {clubsYaml?.fullname}</li>
        <li>法人名: {clubsYaml?.company}</li>
        <li>所属カテゴリ: {clubsYaml?.category}</li>
        <li>ホームタウン: {clubsYaml?.hometown}</li>
        <li>活動区域: {clubsYaml?.area}</li>
        {clubsYaml?.settlement ? (
          <li>
            経営情報:{' '}
            <MuiLink href={clubsYaml.settlement} color="secondary" target="_blank" rel="noopener noreferrer">
              {decodeURIComponent(clubsYaml.settlement)}
            </MuiLink>
          </li>
        ) : null}
        {clubsYaml?.relatedCompanies ? <li>関連する法人: {clubsYaml.relatedCompanies.join(', ')}</li> : null}
      </Typography>
    </ContentBasis>
  );
}

export default ClubInfo;
