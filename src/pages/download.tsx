import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GetAppIcon from '@material-ui/icons/GetApp';
import { csvFormat } from 'd3-dsv';
import Layout from '../layout';
import FieldFilter from '../components/download/FieldFilter';
import { DownloadQuery } from '../../graphql-types';

const useStyles = makeStyles((theme) =>
  createStyles({
    buttonContainer: {
      padding: theme.spacing(8, 0),
      textAlign: 'center',
    },
  })
);

function DownloadPage({ data }: PageProps<DownloadQuery>) {
  const classes = useStyles();
  const { allDataset, dictYaml, allYearsYaml, allClubsYaml } = data;
  const allYears = allYearsYaml.edges.map(({ node }) => node.year ?? 0);
  const allClubs = allClubsYaml.group.reduce<string[]>(
    (accum, { edges }) => (edges ? [...accum, ...edges.map(({ node }) => node.slug ?? '')] : accum),
    []
  );
  const allCategories = ['J1', 'J2', 'J3', 'その他'];
  const allFields = Object.keys(dictYaml ?? {});

  const [dataFormat, setDataFormat] = React.useState<string>('json');
  const [clubsFilter, setClubsFilter] = React.useState(allClubs);
  const [yearsFilter, setYearsFilter] = React.useState(allYears);
  const [categoriesFilter, setCategoriesFilter] = React.useState(allCategories);
  const [fields, setFields] = React.useState(allFields);

  const _setAllClubs = () => {
    setClubsFilter(allClubs);
  };
  const _clearAllClubs = () => {
    setClubsFilter([]);
  };
  const _toggleYear = (newYear: number) => () => {
    setYearsFilter(yearsFilter.includes(newYear) ? yearsFilter.filter((year) => year !== newYear) : [...yearsFilter, newYear]);
  };
  const _setAllYears = () => {
    setYearsFilter(allYears);
  };
  const _clearAllYears = () => {
    setYearsFilter([]);
  };
  const _toggleCategory = (item: string) => () => {
    setCategoriesFilter(
      categoriesFilter.includes(item) ? categoriesFilter.filter((category) => category !== item) : [...categoriesFilter, item]
    );
  };
  const _setAllCategories = () => {
    setCategoriesFilter(allCategories);
  };
  const _clearAllCategories = () => {
    setCategoriesFilter([]);
  };
  const _handleChangeDataFormat = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataFormat(event.target.name);
  };
  const _download = () => {
    const dataset = allDataset.edges
      .filter(({ node }) => clubsFilter.includes(node.slug ?? ''))
      .filter(({ node }) => yearsFilter.includes(node.year ?? 0))
      .filter(({ node }) => categoriesFilter.includes(getNodeCategory(node.category ?? '')))
      .map(({ node }) => {
        const obj = { クラブ: node.name, 年: node.year, 所属: node.category };
        for (const key in node) {
          if (fields.includes(key)) {
            obj[dictYaml[key]] = node[key];
          }
        }
        return obj;
      });
    console.log(dataset);
    console.log(csvFormat(dataset));
    const blob = new Blob([JSON.stringify(dataset)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    console.log(url);
  };

  return (
    <Layout title="データダウンロード">
      <Container maxWidth="md">
        <div>
          <div className={classes.buttonContainer}>
            <Button variant="contained" color="primary" size="large" startIcon={<GetAppIcon />} onClick={_download}>
              ダウンロード
            </Button>
          </div>
          <div>
            <FormGroup row>
              <FormControlLabel
                control={<Radio checked={dataFormat === 'json'} name="json" onChange={_handleChangeDataFormat} />}
                label="json"
              />
              <FormControlLabel
                control={<Radio checked={dataFormat === 'csv'} name="csv" onChange={_handleChangeDataFormat} />}
                label="csv"
              />
            </FormGroup>
          </div>
        </div>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <List subheader={<ListSubheader>クラブ</ListSubheader>}>
              <ListItem button onClick={_setAllClubs}>
                <ListItemText primary="全て選択" />
              </ListItem>
              <ListItem button onClick={_clearAllClubs}>
                <ListItemText primary="全て解除" />
              </ListItem>
              {allClubsYaml.group.map((group, index) => (
                <CategoryList key={group.fieldValue ?? index} group={group} clubsFilter={clubsFilter} setClubsFilter={setClubsFilter} />
              ))}
            </List>
          </Grid>
          <Grid item xs={12} sm={4}>
            <List subheader={<ListSubheader>年度</ListSubheader>}>
              <ListItem button onClick={_setAllYears}>
                <ListItemText primary="全て選択" />
              </ListItem>
              <ListItem button onClick={_clearAllYears}>
                <ListItemText primary="全て解除" />
              </ListItem>
              {allYears.map((year, index) => (
                <ListItem key={year ?? index} button onClick={_toggleYear(year)}>
                  <ListItemIcon>
                    <Checkbox checked={yearsFilter.includes(year ?? 0)} edge="start" disableRipple />
                  </ListItemIcon>
                  <ListItemText primary={year} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} sm={4}>
            <List subheader={<ListSubheader>カテゴリ</ListSubheader>}>
              <ListItem button onClick={_setAllCategories}>
                <ListItemText primary="全て選択" />
              </ListItem>
              <ListItem button onClick={_clearAllCategories}>
                <ListItemText primary="全て解除" />
              </ListItem>
              <ListItem button onClick={_toggleCategory('J1')}>
                <ListItemIcon>
                  <Checkbox checked={categoriesFilter.includes('J1')} edge="start" disableRipple />
                </ListItemIcon>
                <ListItemText primary="J1" />
              </ListItem>
              <ListItem button onClick={_toggleCategory('J2')}>
                <ListItemIcon>
                  <Checkbox checked={categoriesFilter.includes('J2')} edge="start" disableRipple />
                </ListItemIcon>
                <ListItemText primary="J2" />
              </ListItem>
              <ListItem button onClick={_toggleCategory('J3')}>
                <ListItemIcon>
                  <Checkbox checked={categoriesFilter.includes('J3')} edge="start" disableRipple />
                </ListItemIcon>
                <ListItemText primary="J3" />
              </ListItem>
              <ListItem button onClick={_toggleCategory('その他')}>
                <ListItemIcon>
                  <Checkbox checked={categoriesFilter.includes('その他')} edge="start" disableRipple />
                </ListItemIcon>
                <ListItemText primary="その他" />
              </ListItem>
            </List>
          </Grid>
          <FieldFilter fields={fields} setFields={setFields} dictYaml={dictYaml} />
        </Grid>
      </Container>
    </Layout>
  );
}

export default DownloadPage;

interface CategoryListProps {
  group: DownloadQuery['allClubsYaml']['group'][number];
  clubsFilter: string[];
  setClubsFilter: React.Dispatch<React.SetStateAction<string[]>>;
}

function CategoryList({ group, clubsFilter, setClubsFilter }: CategoryListProps) {
  const { edges, fieldValue } = group;
  const slugs = edges.map(({ node }) => node.slug ?? '');
  const [open, setOpen] = React.useState(false);
  const _toggleOpen = () => {
    setOpen(!open);
  };
  const _onClick = (item: string) => () => {
    setClubsFilter(clubsFilter.includes(item) ? clubsFilter.filter((slug) => slug !== item) : [...clubsFilter, item]);
  };
  const _setAll = () => {
    setClubsFilter(Array.from(new Set([...clubsFilter, ...slugs])));
  };
  const _clearAll = () => {
    setClubsFilter(clubsFilter.filter((slug) => !slugs.includes(slug)));
  };

  return (
    <>
      <ListItem button onClick={_toggleOpen}>
        <ListItemText primary={fieldValue} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open}>
        <ListItem button onClick={_setAll}>
          <ListItemText primary="全て選択" />
        </ListItem>
        <ListItem button onClick={_clearAll}>
          <ListItemText primary="全て解除" />
        </ListItem>
        {edges.map(({ node }, index) => (
          <ListItem key={node.slug ?? index} button onClick={_onClick(node.slug ?? '')}>
            <ListItemIcon>
              <Checkbox checked={clubsFilter.includes(node.slug ?? '')} edge="start" disableRipple />
            </ListItemIcon>
            <ListItemText primary={node.name} />
          </ListItem>
        ))}
      </Collapse>
    </>
  );
}

function getNodeCategory(category: string) {
  return ['J1', 'J2', 'J3'].includes(category) ? category : 'その他';
}

export const query = graphql`
  query Download {
    allDataset(sort: { fields: year }) {
      edges {
        node {
          academy_exp
          academy_rev
          acl_attd
          acl_games
          all_attd
          all_games
          assets
          broadcast
          capital_stock
          capital_surplus
          category
          curr_assets
          curr_liabilities
          elevation
          expense
          fixed_assets
          fixed_liabilities
          fullname
          game_exp
          general_exp
          goods_exp
          goods_rev
          id
          league_attd
          league_games
          leaguecup_attd
          leaguecup_games
          liabilities
          license
          manage_exp
          name
          net_worth
          no_exp
          no_rev
          op_profit
          ordinary_profit
          other_revs
          po_attd
          po_games
          ppg
          points
          profit
          profit_before_tax
          rank
          related_revenue
          retained_earnings
          revenue
          salary
          second_attd
          second_games
          sga
          slug
          sp_exp
          sponsor
          sp_rev
          tax
          team_exp
          ticket
          year
          women_exp
        }
      }
    }
    dictYaml {
      academy_exp
      academy_rev
      acl_attd
      acl_games
      all_attd
      all_games
      assets
      broadcast
      capital_stock
      capital_surplus
      category
      curr_assets
      curr_liabilities
      elevation
      expense
      fixed_assets
      fixed_liabilities
      fullname
      game_exp
      general_exp
      goods_exp
      goods_rev
      id
      league_attd
      league_games
      leaguecup_attd
      leaguecup_games
      liabilities
      manage_exp
      license
      name
      net_worth
      no_exp
      no_rev
      op_profit
      ordinary_profit
      other_revs
      po_attd
      po_games
      points
      profit
      ppg
      profit_before_tax
      rank
      related_revenue
      retained_earnings
      revenue
      salary
      second_attd
      second_games
      sga
      sp_exp
      sp_rev
      sponsor
      tax
      team_exp
      ticket
      women_exp
      year
    }
    allClubsYaml {
      group(field: category) {
        fieldValue
        edges {
          node {
            category
            slug
            name
          }
        }
      }
    }
    allYearsYaml {
      edges {
        node {
          categories
          id
          year
        }
      }
    }
  }
`;
