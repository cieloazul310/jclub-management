import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
//import { generalFields, plFields, bsFields, revenueFields, expenseFields } from './fields';
import { DownloadQuery } from '../../../graphql-types';

interface Props {
  dictYaml: DownloadQuery['dictYaml'];
  fields: string[];
  setFields: React.Dispatch<React.SetStateAction<string[]>>;
}

function FieldFilter({ dictYaml, fields, setFields }: Props) {
  const general = pick('fullname', 'license', 'rank', 'ppg', 'elevation')(dictYaml);
  const pl = pick(
    'revenue',
    'expense',
    'op_profit',
    'no_rev',
    'no_exp',
    'ordinary_profit',
    'sp_rev',
    'sp_exp',
    'profit_before_tax',
    'tax',
    'profit',
    'related_revenue'
  )(dictYaml);
  const bs = pick(
    'assets',
    'curr_assets',
    'fixed_assets',
    'liabilities',
    'curr_liabilities',
    'fixed_liabilities',
    'net_worth',
    'capital_stock',
    'capital_surplus',
    'retained_earnings'
  )(dictYaml);
  const revenue = pick('sponsor', 'ticket', 'broadcast', 'academy_rev', 'goods_rev', 'other_revs')(dictYaml);
  const expense = pick('salary', 'game_exp', 'team_exp', 'academy_exp', 'women_exp', 'goods_exp', 'manage_exp', 'sga')(dictYaml);

  return (
    <>
      <Grid item xs={12} sm={4}>
        <FieldTypeList item={general} fields={fields} setFields={setFields} title="一般" />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FieldTypeList item={pl} fields={fields} setFields={setFields} title="損益計算書" />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FieldTypeList item={bs} fields={fields} setFields={setFields} title="貸借対照表" />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FieldTypeList item={revenue} fields={fields} setFields={setFields} title="営業収入" />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FieldTypeList item={expense} fields={fields} setFields={setFields} title="営業費用" />
      </Grid>
      <Grid item xs={12} sm={4}>
        <List subheader={<ListSubheader>入場者数</ListSubheader>}>
          <ListItem button>
            <ListItemText primary="全て選択" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="全て解除" />
          </ListItem>
        </List>
      </Grid>
    </>
  );
}

export default FieldFilter;

interface FieldTypeListProps {
  title: string;
  fields: string[];
  setFields: React.Dispatch<React.SetStateAction<string[]>>;
  item: Partial<NonNullable<DownloadQuery['dictYaml']>>;
}

function FieldTypeList({ title, fields, setFields, item }: FieldTypeListProps) {
  const keys = Object.keys(item);
  const [open, setOpen] = React.useState(false);
  const _toggleOpen = () => {
    setOpen(!open);
  };
  const _toggleField = (newField: string) => () => {
    setFields(fields.includes(newField) ? fields.filter((field) => field !== newField) : [...fields, newField]);
  };
  const _setAllFields = () => {
    setFields(Array.from(new Set([...fields, ...keys])));
  };
  const _clearAllFields = () => {
    setFields(fields.filter((field) => !keys.includes(field)));
  };
  return (
    <List>
      <ListItem button onClick={_toggleOpen}>
        <ListItemText primary={title} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open}>
        <ListItem button onClick={_setAllFields}>
          <ListItemText primary="全て選択" />
        </ListItem>
        <ListItem button onClick={_clearAllFields}>
          <ListItemText primary="全て解除" />
        </ListItem>
        {Object.entries(item).map(([key, label]) => (
          <ListItem key={key} button onClick={_toggleField(key)}>
            <ListItemIcon>
              <Checkbox checked={fields.includes(key)} edge="start" />
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </Collapse>
    </List>
  );
}

function pick(...args: (keyof NonNullable<DownloadQuery['dictYaml']>)[]) {
  return (dictYaml: DownloadQuery['dictYaml']) => {
    const obj: Partial<NonNullable<DownloadQuery['dictYaml']>> = {};
    for (let i = 0; i < args.length; i++) {
      obj[args[i]] = dictYaml ? dictYaml[args[i]] : null;
    }
    return obj;
  };
}
