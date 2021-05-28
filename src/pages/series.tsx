import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CheckIcon from '@material-ui/icons/Check';
import RemoveIcon from '@material-ui/icons/Remove';
import Layout from '../layout';
import AppLink from '../components/AppLink';
import { ContentBasisLarge, ContentBasis } from '../components/Basis';
import { AdInArticle } from '../components/Ads';
import { plFields, bsFields, revenueFields, expenseFields, attdFields, Fields } from '../components/download/fields';
import { useAllClubs, useAllYears, useDictionary } from '../utils/graphql-hooks';
import { SeriesQuery } from '../../graphql-types';

const allFields = [...plFields, ...bsFields, ...revenueFields, ...expenseFields, ...attdFields];

const useStyles = makeStyles((theme) =>
  createStyles({
    selector: {
      textAlign: 'center',
    },
    container: {
      flexGrow: 1,
      maxHeight: '75vh',
    },
    table: {
      minWidth: 1000,
      scrollSnapType: 'both mandatory',
    },
    theadLabel: {
      zIndex: 3,
      background: theme.palette.background.default,
    },
    tbodyLabel: {
      fontWeight: 'bold',
      zIndex: 2,
      position: 'sticky',
      left: 0,
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
  const slugs = allClubs.map(({ node }) => node.slug ?? '');

  const [field, setField] = React.useState<Fields>('revenue');
  const [clubFilter, setClubFilter] = React.useState(slugs);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [sortYear, setSortYear] = React.useState(allYears.length - 1);
  const [sortAsc, setSortAsc] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const _handleClose = () => {
    setOpen(false);
  };
  const _onLabelClicked = (index: number) => () => {
    if (index === sortYear) {
      setSortAsc(!sortAsc);
    } else {
      setSortYear(index);
      setSortAsc(false);
    }
  };
  const _handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const _handleMenuClose = () => {
    setAnchorEl(null);
  };
  const _onMenuItemClick = (slug: string) => () => {
    if (clubFilter.includes(slug)) {
      setClubFilter(clubFilter.filter((club) => club !== slug));
    } else {
      setClubFilter([...clubFilter, slug]);
    }
  };
  const _setAllFilter = (bool: boolean) => () => {
    if (bool) {
      setClubFilter(slugs);
    } else {
      setClubFilter([]);
    }
  };
  const _onFieldChange = (event: React.ChangeEvent<{ name?: string; value: string }>) => {
    if (isFields(event.target.value)) {
      setField(event.target.value);
    }
  };
  const _onCopy = () => {
    const table = document.querySelector('#series-table');
    if (table) {
      const range = document.createRange();
      const selection = document.getSelection();

      selection?.removeAllRanges();

      try {
        range.selectNodeContents(table);
        selection?.addRange(range);
      } catch (e) {
        range.selectNode(table);
        selection?.addRange(range);
      }

      document.execCommand('copy');
      selection?.removeAllRanges();
      setOpen(true);
    }
  };
  const getFieldValue = React.useCallback(
    (edge: SeriesQuery['allDataset']['group'][number]['edges'][number] | null) => {
      if (!edge) return null;

      const { node } = edge;
      if (field === 'league_average') {
        return Math.round((node.league_attd ?? 0) / (node.league_games ?? 1));
      } else if (field === 'unit_price') {
        return Math.round(((node.ticket ?? 0) * 1000000) / (node.all_attd ?? 1));
      }
      return node[field] as number;
    },
    [field]
  );

  const items = React.useMemo(() => {
    const clubs = data.allDataset.group.map(({ edges, fieldValue }) => {
      const club = allClubs[allClubs.map(({ node }) => node.slug).indexOf(fieldValue)];
      return {
        fieldValue,
        short_name: club.node?.short_name,
        edges: createNullField(edges)(allYears),
      };
    });
    return [...clubs]
      .filter((item) => clubFilter.includes(item.fieldValue ?? ''))
      .sort(
        (a, b) =>
          (sortAsc ? 1 : -1) *
          (sortYear !== -1
            ? (getFieldValue(a.edges[sortYear]) ?? -Infinity) - (getFieldValue(b.edges[sortYear]) ?? -Infinity)
            : slugs.indexOf(b.fieldValue ?? '') - slugs.indexOf(a.fieldValue ?? ''))
      );
  }, [data, allClubs, sortAsc, sortYear, getFieldValue, allYears, clubFilter, slugs]);

  return (
    <Layout title="項目別表示">
      <div className={classes.selector}>
        <ContentBasis>
          <NativeSelect value={field} onChange={_onFieldChange}>
            {allFields.map((fieldName) => (
              <option value={fieldName} key={fieldName}>
                {fieldName === 'league_average'
                  ? 'リーグ戦平均入場者数'
                  : fieldName === 'unit_price'
                  ? '客単価'
                  : dict && dict[fieldName]
                  ? dict[fieldName]
                  : ''}
              </option>
            ))}
          </NativeSelect>
          <Tooltip title="フィルタ">
            <IconButton aria-controls="filter-menu" aria-haspopup="true" onClick={_handleMenuClick}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Menu id="filter-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={_handleMenuClose}>
            <MenuItem onClick={_setAllFilter(true)}>全て選択</MenuItem>
            <MenuItem onClick={_setAllFilter(false)}>全て解除</MenuItem>
            {allClubs.map(({ node }) => (
              <MenuItem key={node.slug} onClick={_onMenuItemClick(node.slug ?? '')}>
                <ListItemIcon>{clubFilter.includes(node.slug ?? '') ? <CheckIcon /> : <RemoveIcon />}</ListItemIcon>
                {node.short_name}
              </MenuItem>
            ))}
          </Menu>
          <Tooltip title="表をクリップボードにコピー">
            <IconButton onClick={_onCopy}>
              <FileCopyIcon />
            </IconButton>
          </Tooltip>
        </ContentBasis>
      </div>
      <Typography component="div" variant="body2" align="right">
        単位:{' '}
        {field === 'unit_price'
          ? '円'
          : ['all_attd', 'league_average', 'league_attd', 'leaguecup_attd', 'po_attd', 'acl_attd', 'second_attd'].includes(field)
          ? '人'
          : ['all_games', 'league_games', 'leaguecup_games', 'po_games', 'acl_games', 'second_games'].includes(field)
          ? '試合'
          : '百万円'}
      </Typography>
      <TableContainer className={classes.container} component={Paper}>
        <Table className={classes.table} size="small" stickyHeader id="series-table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.theadLabel}>
                <TableSortLabel
                  active={sortYear === -1}
                  direction={sortYear === -1 && sortAsc ? 'asc' : 'desc'}
                  onClick={_onLabelClicked(-1)}
                >
                  クラブ
                </TableSortLabel>
              </TableCell>
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
            {items.map(({ fieldValue, short_name, edges }) => (
              <TableRow key={fieldValue}>
                <TableCell className={classes.tbodyLabel} align="right" component="th" scope="row">
                  <AppLink color="inherit" to={`/club/${fieldValue}/`}>
                    {short_name}
                  </AppLink>
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
                    {getFieldValue(edge) ?? '-'}
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
      <Snackbar
        open={open}
        onClose={_handleClose}
        message="クリップボードにコピーしました"
        autoHideDuration={2500}
        action={
          <Button color="secondary" size="small" onClick={_handleClose}>
            OK
          </Button>
        }
      />
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

function createNullField(
  edges: SeriesQuery['allDataset']['group'][number]['edges'][number][]
): (allYears: ReturnType<typeof useAllYears>) => (SeriesQuery['allDataset']['group'][number]['edges'][number] | null)[] {
  return (allYears: ReturnType<typeof useAllYears>) => {
    if (allYears.length === edges.length) return edges;
    const first = allYears.map(({ year }) => year).indexOf(edges[0].node.year ?? 0);
    return [
      ...Array.from({ length: first }, () => null),
      ...edges,
      ...Array.from({ length: allYears.length - edges.length - first }, () => null),
    ];
    // return [...Array.from({ length: len - arr.length }, () => null), ...arr];
  };
}

function isFields(input: string): input is Fields {
  return allFields.includes(input as Fields);
}
