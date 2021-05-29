import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { generalFields, plFields, bsFields, revenueFields, expenseFields, attdFields, Fields } from './fields';
import { useDictionary } from '../../utils/graphql-hooks';
import { DictionaryQuery } from '../../../graphql-types';

interface Props {
  fields: string[];
  setFields: React.Dispatch<React.SetStateAction<string[]>>;
}

function FieldFilter({ fields, setFields }: Props) {
  const dict = useDictionary();
  const general = pick(...generalFields)(dict);
  const pl = pick(...plFields)(dict);
  const bs = pick(...bsFields)(dict);
  const revenue = pick(...revenueFields)(dict);
  const expense = pick(...expenseFields)(dict);

  return (
    <>
      <FieldTypeList item={general} fields={fields} setFields={setFields} title="一般" />
      <FieldTypeList item={pl} fields={fields} setFields={setFields} title="損益計算書" />
      <FieldTypeList item={bs} fields={fields} setFields={setFields} title="貸借対照表" />
      <FieldTypeList item={revenue} fields={fields} setFields={setFields} title="営業収入" />
      <FieldTypeList item={expense} fields={fields} setFields={setFields} title="営業費用" />
      <AttdList fields={fields} setFields={setFields} />
    </>
  );
}

export default FieldFilter;

type Dict = NonNullable<DictionaryQuery['dictYaml']> & {
  league_average: string;
  unit_price: string;
};

type FieldTypeListProps = Props & {
  title: string;
  item: Partial<Dict>;
};

function FieldTypeList({ title, fields, setFields, item }: FieldTypeListProps) {
  const keys = Object.keys(item);
  const [open, setOpen] = React.useState(false);
  const allSelected = keys.every((key) => fields.includes(key));
  const allEmpty = keys.every((key) => !fields.includes(key));

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
        <ListItemIcon>
          <Checkbox disableRipple checked={!allEmpty} indeterminate={!allSelected && !allEmpty} edge="start" />
        </ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open}>
        <ListItem button dense onClick={_setAllFields}>
          <ListItemText primary="全て選択" />
        </ListItem>
        <ListItem button dense onClick={_clearAllFields}>
          <ListItemText primary="全て解除" />
        </ListItem>
        {Object.entries(item).map(([key, label]) => (
          <ListItem key={key} button dense onClick={_toggleField(key)}>
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

function AttdList({ fields, setFields }: Props) {
  const [open, setOpen] = React.useState(false);
  const allSelected = attdFields.every((key) => fields.includes(key));
  const allEmpty = attdFields.every((key) => !fields.includes(key));

  const _toggleOpen = () => {
    setOpen(!open);
  };
  const _toggleField = (newField: string) => () => {
    setFields(fields.includes(newField) ? fields.filter((field) => field !== newField) : [...fields, newField]);
  };
  const _toggleFieldSet =
    ([attd, games]: string[]) =>
    () => {
      setFields(fields.includes(attd) ? fields.filter((field) => field !== attd && field !== games) : [...fields, attd, games]);
    };
  const _setAllFields = () => {
    setFields(Array.from(new Set([...fields, ...attdFields])));
  };
  const _clearAllFields = () => {
    setFields(fields.filter((field) => !attdFields.includes(field)));
  };

  return (
    <List>
      <ListItem button onClick={_toggleOpen}>
        <ListItemIcon>
          <Checkbox disableRipple checked={!allEmpty} indeterminate={!allSelected && !allEmpty} edge="start" />
        </ListItemIcon>
        <ListItemText primary="入場者数" />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open}>
        <ListItem button dense onClick={_setAllFields}>
          <ListItemText primary="全て選択" />
        </ListItem>
        <ListItem button dense onClick={_clearAllFields}>
          <ListItemText primary="全て解除" />
        </ListItem>
        <ListItem button dense onClick={_toggleField('all_attd')}>
          <ListItemIcon>
            <Checkbox checked={fields.includes('all_attd')} edge="start" />
          </ListItemIcon>
          <ListItemText primary="年間総入場者数" />
        </ListItem>
        <ListItem button dense onClick={_toggleField('all_games')}>
          <ListItemIcon>
            <Checkbox checked={fields.includes('all_games')} edge="start" />
          </ListItemIcon>
          <ListItemText primary="ホーム試合数" />
        </ListItem>
        <ListItem button dense onClick={_toggleField('league_average')}>
          <ListItemIcon>
            <Checkbox checked={fields.includes('league_average')} edge="start" />
          </ListItemIcon>
          <ListItemText primary="リーグ戦平均入場者数" />
        </ListItem>
        <ListItem button dense onClick={_toggleField('unit_price')}>
          <ListItemIcon>
            <Checkbox checked={fields.includes('unit_price')} edge="start" />
          </ListItemIcon>
          <ListItemText primary="客単価" />
        </ListItem>
        <ListItem button dense onClick={_toggleFieldSet(['league_attd', 'league_games'])}>
          <ListItemIcon>
            <Checkbox checked={fields.includes('league_attd')} edge="start" />
          </ListItemIcon>
          <ListItemText primary="リーグ戦" />
        </ListItem>
        <ListItem button dense onClick={_toggleFieldSet(['leaguecup_attd', 'leaguecup_games'])}>
          <ListItemIcon>
            <Checkbox checked={fields.includes('leaguecup_attd')} edge="start" />
          </ListItemIcon>
          <ListItemText primary="リーグカップ" />
        </ListItem>
        <ListItem button dense onClick={_toggleFieldSet(['po_attd', 'po_games'])}>
          <ListItemIcon>
            <Checkbox checked={fields.includes('po_attd')} edge="start" />
          </ListItemIcon>
          <ListItemText primary="プレーオフ等" />
        </ListItem>
        <ListItem button dense onClick={_toggleFieldSet(['acl_attd', 'acl_games'])}>
          <ListItemIcon>
            <Checkbox checked={fields.includes('acl_attd')} edge="start" />
          </ListItemIcon>
          <ListItemText primary="ACL" />
        </ListItem>
        <ListItem button dense onClick={_toggleFieldSet(['second_attd', 'second_games'])}>
          <ListItemIcon>
            <Checkbox checked={fields.includes('second_attd')} edge="start" />
          </ListItemIcon>
          <ListItemText primary="セカンドチーム" />
        </ListItem>
      </Collapse>
    </List>
  );
}

function pick(...args: Fields[]) {
  return (dict: DictionaryQuery['dictYaml']) => {
    const obj: Partial<Dict> = {};
    for (let i = 0; i < args.length; i++) {
      const field = args[i];
      if (field === 'league_average') {
        obj[field] = 'リーグ戦平均入場者数';
      } else if (field === 'unit_price') {
        obj[field] = '客単価';
      } else {
        obj[field] = dict ? dict[field] : null;
      }
    }
    return obj;
  };
}
