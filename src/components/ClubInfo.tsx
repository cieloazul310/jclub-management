import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import { ContentBasis } from './Basis';
import { ClubTemplateQuery } from '../../graphql-types';

interface Props {
  clubsYaml: ClubTemplateQuery['clubsYaml'];
}

function ClubInfo({ clubsYaml }: Props) {
  return (
    <ContentBasis>
      <Typography variant="h6" component="h2" gutterBottom>
        {clubsYaml?.name}
      </Typography>
      <Typography variant="body1" component="ul">
        <li>正式名称: {clubsYaml?.fullname}</li>
        <li>法人名: {clubsYaml?.company}</li>
        <li>所属カテゴリ: {clubsYaml?.category}</li>
        <li>ホームタウン: {clubsYaml?.hometown}</li>
        <li>活動区域: {clubsYaml?.area}</li>
        {clubsYaml?.settlement ? (
          <li>
            経営情報:{' '}
            <MuiLink href={clubsYaml.settlement} color="secondary" target="_blank" rel="noopener noreferrer">
              {clubsYaml.settlement}
            </MuiLink>
          </li>
        ) : null}
        {clubsYaml?.relatedCompanies ? <li>関連する法人: {clubsYaml.relatedCompanies.join(', ')}</li> : null}
      </Typography>
    </ContentBasis>
  );
}

export default ClubInfo;
