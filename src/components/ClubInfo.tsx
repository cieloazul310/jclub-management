import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ClubTemplateQuery } from '../../graphql-types';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 0),
    },
  })
);

interface Props {
  clubsYaml: ClubTemplateQuery['clubsYaml'];
}

function ClubInfo({ clubsYaml }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" component="h3" gutterBottom>
        {clubsYaml?.name}
      </Typography>
      <Typography variant="body2" component="ul">
        <li>正式名称: {clubsYaml?.name}</li>
        <li>法人名: {clubsYaml?.company}</li>
        <li>所属カテゴリ: {clubsYaml?.category}</li>
        <li>ホームタウン: {clubsYaml?.hometown}</li>
        <li>活動区域: {clubsYaml?.area}</li>
        {clubsYaml?.relatedCompanies ? <li>関連する法人: {clubsYaml.relatedCompanies.join(', ')}</li> : null}
      </Typography>
    </div>
  );
}

export default ClubInfo;
