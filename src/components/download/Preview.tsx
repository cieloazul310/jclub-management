import * as React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import { csvFormat } from 'd3-dsv';
import { useAllClubs, useAllYears } from '../../utils/graphql-hooks';
import { DownloadDataset } from '../../types';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: 'calc(100vh - 112px)',
      display: 'flex',
      flexDirection: 'column',
    },
    section: {
      padding: theme.spacing(1, 0),
    },
    flexGrow: {
      flexGrow: 1,
      display: 'flex',
    },
    textArea: {
      flexGrow: 1,
      padding: theme.spacing(1),
      width: '100%',
      overflowY: 'auto',
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
  })
);

interface Props {
  dataset: DownloadDataset[];
}

function Preview({ dataset }: Props) {
  const classes = useStyles();
  const allClubs = useAllClubs();
  const allYears = useAllYears();
  const slugs = allClubs.map(({ node }) => node.slug ?? '');
  const [dataFormat, setDataFormat] = React.useState('json');
  const [grouping, setGrouping] = React.useState('none');
  const _handleChangeDataFormat = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataFormat(event.target.name);
  };
  const _handleChangeGrouping = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGrouping(event.target.name);
  };
  const output = React.useMemo(() => {
    if (dataFormat === 'csv') {
      const csv = grouping === 'club' ? [...dataset].sort((a, b) => slugs.indexOf(a.slug) - slugs.indexOf(b.slug)) : dataset;

      return csvFormat(csv);
    }
    const json =
      grouping === 'year'
        ? allYears
            .map(({ year }) => ({
              year,
              item: dataset.filter((datum) => datum['年'] === year),
            }))
            .filter(({ item }) => item.length > 0)
        : grouping === 'club'
        ? allClubs
            .map(({ node }) => ({
              ...node,
              item: dataset.filter((datum) => datum.slug === node.slug),
            }))
            .filter(({ item }) => item.length > 0)
        : dataset;

    return JSON.stringify(json, null, 2);
  }, [dataset, dataFormat, grouping, slugs, allClubs, allYears]);

  const href = React.useMemo(() => {
    const blob = new Blob([output], { type: dataFormat === 'csv' ? 'text/csv' : 'application/json' });
    return URL.createObjectURL(blob);
  }, [dataFormat, output]);

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <Typography variant="h6" component="h3" gutterBottom>
          プレビュー
        </Typography>
        <FormGroup row>
          <FormControlLabel
            control={<Radio checked={dataFormat === 'json'} name="json" onChange={_handleChangeDataFormat} />}
            label="JSON"
          />
          <FormControlLabel control={<Radio checked={dataFormat === 'csv'} name="csv" onChange={_handleChangeDataFormat} />} label="CSV" />
        </FormGroup>
        <FormGroup row>
          <FormControlLabel
            control={<Radio checked={grouping === 'none'} name="none" onChange={_handleChangeGrouping} />}
            label="グループ化しない"
          />
          <FormControlLabel
            control={<Radio checked={grouping === 'club'} name="club" onChange={_handleChangeGrouping} />}
            label="クラブ別"
          />
          <FormControlLabel control={<Radio checked={grouping === 'year'} name="year" onChange={_handleChangeGrouping} />} label="年別" />
        </FormGroup>
      </div>
      <div className={clsx(classes.section, classes.flexGrow)}>
        <textarea className={classes.textArea} spellCheck={false} readOnly value={output} />
      </div>
      <div className={classes.section}>
        <Button variant="contained" color="primary" startIcon={<GetAppIcon />} href={href} download={true} component="a">
          ダウンロード
        </Button>
      </div>
    </div>
  );
}

export default Preview;
