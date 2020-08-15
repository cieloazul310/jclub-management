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
import { DownloadQuery } from '../../../graphql-types';

interface Props {
  dictYaml: DownloadQuery['dictYaml'];
  fields: string[];
  setFields: React.Dispatch<React.SetStateAction<string[]>>;
}

function FieldFilter({ dictYaml, fields, setFields }: Props) {
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

  return (
    <>
      <Grid item xs={12} sm={4}>
        <FieldTypeList item={pl} fields={fields} setFields={setFields} title="損益計算書" />
      </Grid>
      <Grid item xs={12} sm={4}>
        <List subheader={<ListSubheader>貸借対照表</ListSubheader>}>
          <ListItem button>
            <ListItemText primary="全て選択" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="全て解除" />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} sm={4}>
        <List subheader={<ListSubheader>営業収入</ListSubheader>}>
          <ListItem button>
            <ListItemText primary="全て選択" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="全て解除" />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} sm={4}>
        <List subheader={<ListSubheader>営業費用</ListSubheader>}>
          <ListItem button>
            <ListItemText primary="全て選択" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="全て解除" />
          </ListItem>
        </List>
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
  const [open, setOpen] = React.useState(false);
  const _toggleOpen = () => {
    setOpen(!open);
  };
  return (
    <List subheader={<ListSubheader>{title}</ListSubheader>}>
      <ListItem button onClick={_toggleOpen}>
        <ListItemText primary={title} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open}>
        <ListItem button>
          <ListItemText primary="全て選択" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="全て解除" />
        </ListItem>
        {Object.entries(item).map(([key, label]) => (
          <ListItem key={key} button>
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
