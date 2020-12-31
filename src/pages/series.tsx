import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Layout from '../layout';
import { ContentBasisLarge } from '../components/Basis';
import { AdInArticle } from '../components/Ads';
import allFields from '../components/download/fields';
import { useAllClubs, useAllYears, useDictionary } from '../utils/graphql-hooks';
import { SeriesQuery } from '../../graphql-types';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      flexGrow: 1,
      height: '75vh',
    },
    table: {
      minWidth: 1000,
      scrollSnapType: 'both mandatory',
    },
    tbodyLabel: {
      fontWeight: 'bold',
      zIndex: 2,
      background: theme.palette.background.default,
      minWidth: '8em',
    },
    j1: {
      backgroundColor: theme.palette.type === 'light' ? '#fee' : '#633',
    },
    j2: {
      backgroundColor: theme.palette.type === 'light' ? '#efe' : '#363',
    },
    j3: {
      backgroundColor: theme.palette.type === 'light' ? '#eef' : '#336',
    },
  })
);

function Series({ data }: PageProps<SeriesQuery>) {
  const classes = useStyles();
  const allClubs = useAllClubs();
  const allYears = useAllYears();
  const dict = useDictionary();

  const [field, setField] = React.useState('revenue');
  const [sortYear, setSortYear] = React.useState(allYears.length - 1);
  const [sortAsc, setSortAsc] = React.useState(false);

  const items = data.allDataset.group.map(({ edges, fieldValue }) => {
    const club = allClubs[allClubs.map(({ node }) => node.slug).indexOf(fieldValue)];
    return {
      fieldValue,
      short_name: club.node?.short_name,
      edges: createNullField<SeriesQuery['allDataset']['group'][number]['edges'][number]>(edges)(allYears.length),
    };
  });
  const _onLabelClicked = (index: number) => () => {
    if (index === sortYear) {
      setSortAsc(!sortAsc);
    } else {
      setSortYear(index);
    }
  };
  const _onFieldChange = (event: React.ChangeEvent<{ name?: string; value: string }>) => {
    setField(event.target.value);
  };

  return (
    <Layout title="項目別表示">
      <NativeSelect value={field} onChange={_onFieldChange}>
        {allFields.map((fieldName) => (
          <option value={fieldName} key={fieldName}>
            {dict[fieldName]}
          </option>
        ))}
      </NativeSelect>
      <TableContainer className={classes.container} component={Paper}>
        <Table className={classes.table} size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>クラブ</TableCell>
              {allYears.map(({ year }, index) => (
                <TableCell key={year} align="center" padding="none" sortDirection={sortYear !== index && sortAsc ? 'asc' : 'desc'}>
                  <TableSortLabel
                    active={sortYear === index}
                    direction={sortYear === index && sortAsc ? 'asc' : 'desc'}
                    onClick={_onLabelClicked(index)}
                  >
                    {year}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {[...items]
              .sort((a, b) => (sortAsc ? 1 : -1) * ((a.edges[sortYear]?.node?.revenue ?? 0) - (b.edges[sortYear]?.node?.revenue ?? 0)))
              .map(({ fieldValue, short_name, edges }) => (
                <TableRow key={fieldValue}>
                  <TableCell className={classes.tbodyLabel} align="right" component="th" scope="row">
                    {short_name}
                  </TableCell>
                  {edges.map((edge, index) => (
                    <TableCell
                      key={index}
                      align={edge ? 'right' : 'center'}
                      className={
                        edge?.node?.category === 'J1'
                          ? classes.j1
                          : edge?.node?.category === 'J2'
                          ? classes.j2
                          : edge?.node?.category === 'J3'
                          ? classes.j3
                          : undefined
                      }
                    >
                      {edge?.node?.revenue ?? '-'}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ContentBasisLarge>
        <AdInArticle />
      </ContentBasisLarge>
    </Layout>
  );
}

export default Series;

export const query = graphql`
  query Series {
    allDataset(sort: { fields: year }) {
      group(field: slug) {
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
        fieldValue
      }
    }
  }
`;

function createNullField<T>(arr: T[]): (len: number) => (T | null)[] {
  return (len: number) => [...Array.from({ length: len - arr.length }, () => null), ...arr];
}
