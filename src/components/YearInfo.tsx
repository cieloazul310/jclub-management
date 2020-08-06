import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { ContentBasis } from './Basis';
import useStat from '../utils/useStat';
import { Edge } from '../types';
import { YearTemplateQuery } from '../../graphql-types';

interface Props {
  edges: Edge[];
  yearYaml: YearTemplateQuery['yearsYaml'];
}

function YearInfo({ edges, yearYaml }: Props) {
  return (
    <ContentBasis>
      <Typography variant="h5" component="h2" gutterBottom>
        {yearYaml?.year}年
      </Typography>
      <Grid container>
        {yearYaml?.categories
          ? yearYaml.categories.map((category, index) => <CategoryInfo key={category ?? index} edges={edges} category={category} />)
          : null}
      </Grid>
    </ContentBasis>
  );
}

export default YearInfo;

interface CategoryInfoProps {
  edges: Edge[];
  category: string | null;
}

function CategoryInfo({ edges, category }: CategoryInfoProps) {
  const stat = useStat(
    edges.filter(({ node }) => node.category === category),
    'revenue',
    'name'
  );
  return category && stat ? (
    <Grid item xs={12} sm={4}>
      <ContentBasis>
        <Typography variant="h6" component="h3" gutterBottom>
          {category} {stat.n}クラブ
        </Typography>
        <Typography variant="body1" component="ul" gutterBottom>
          <Typography component="li">総営業収入: {(stat.sum / 100).toFixed(2)}億円</Typography>
          <Typography component="li">営業収入平均: {(stat.average / 100).toFixed(2)}億円</Typography>
          <Typography component="li">
            営業収入最大: {(stat.max.value / 100).toFixed(2)}億円【{stat.max.id}】
          </Typography>
          <Typography component="li">
            営業収入最小: {(stat.min.value / 100).toFixed(2)}億円【{stat.min.id}】
          </Typography>
        </Typography>
      </ContentBasis>
    </Grid>
  ) : null;
}
