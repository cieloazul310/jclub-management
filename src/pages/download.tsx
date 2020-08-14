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
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GetAppIcon from '@material-ui/icons/GetApp';
import Layout from '../layout';
import { DownloadQuery } from '../../graphql-types';

function DownloadPage({ data }: PageProps<DownloadQuery>) {
  const { allDataset, allDictYaml, allYearsYaml, allClubsYaml } = data;
  const allYears = allYearsYaml.edges.map(({ node }) => node.year ?? 0);
  const allClubs = allClubsYaml.group.reduce<string[]>(
    (accum, { edges }) => (edges ? [...accum, ...edges.map(({ node }) => node.slug ?? '')] : accum),
    []
  );

  const [dataFormat, setDataFormat] = React.useState<string>('json');
  const [clubsFilter, setClubsFilter] = React.useState(allClubs);
  const [yearsFilter, setYearsFilter] = React.useState<number[]>(allYears);
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
  const _handleChangeDataFormat = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataFormat(event.target.name);
  };
  const _download = () => {
    const blob = new Blob([JSON.stringify(allDataset)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    console.log(url);
  };

  return (
    <Layout title="データダウンロード">
      <Container maxWidth="md">
        <div>
          <div>
            <Button variant="contained" color="primary" size="large" startIcon={<GetAppIcon />} onClick={_download}>
              ダウンロード
            </Button>
          </div>
          <div>
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox checked={dataFormat === 'json'} name="json" onChange={_handleChangeDataFormat} />}
                label="json"
              />
              <FormControlLabel
                control={<Checkbox checked={dataFormat === 'csv'} name="csv" onChange={_handleChangeDataFormat} />}
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
                    <Checkbox checked={yearsFilter.includes(year ?? 0)} />
                  </ListItemIcon>
                  <ListItemText primary={year} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} sm={4}>
            <List subheader={<ListSubheader>カテゴリ</ListSubheader>}>
              <ListItem button onClick={_setAllYears}>
                <ListItemText primary="全て選択" />
              </ListItem>
              <ListItem button onClick={_clearAllYears}>
                <ListItemText primary="全て解除" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Checkbox checked={true} />
                </ListItemIcon>
                <ListItemText primary="J1" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Checkbox checked={true} />
                </ListItemIcon>
                <ListItemText primary="J2" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Checkbox checked={true} />
                </ListItemIcon>
                <ListItemText primary="J3" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Checkbox checked={true} />
                </ListItemIcon>
                <ListItemText primary="その他" />
              </ListItem>
            </List>
          </Grid>
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
              <Checkbox checked={clubsFilter.includes(node.slug ?? '')} />
            </ListItemIcon>
            <ListItemText primary={node.name} />
          </ListItem>
        ))}
      </Collapse>
    </>
  );
}

export const query = graphql`
  query Download {
    allDataset(sort: { fields: year }, filter: { year: { eq: 2019 } }) {
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
    allDictYaml(filter: { year: { eq: "2019" } }) {
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
          no_exp
          net_worth
          no_rev
          op_profit
          other_revs
          ordinary_profit
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
          sp_exp
          sga
          second_games
          sp_rev
          sponsor
          tax
          team_exp
          ticket
          women_exp
          year
        }
      }
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
