import * as React from 'react';
import clsx from 'clsx';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { TableBodyLabel } from './TableLabel';
import { CategoryLabel } from '../CategoryAvatar';
import { useAppState } from '../../utils/AppStateContext';
import { Tab, Mode, Edge } from '../../types';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    emphasized: {
      fontWeight: theme.typography.fontWeightBold,
      background: theme.palette.background.default,
    },
    rowInfo: {
      fontSize: theme.typography.body2.fontSize,
      color: theme.palette.text.secondary,
    },
    promoted: {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.type === 'light' ? theme.palette.success.main : theme.palette.success.light,
    },
    relegated: {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.type === 'light' ? theme.palette.error.main : theme.palette.error.light,
    },
  })
);

interface Props {
  tab: Tab;
  edge: Edge;
  mode: Mode;
  index: number;
  selected?: boolean;
}

function TableBodyRow({ tab, index, mode, edge, selected = false }: Props) {
  const classes = useStyles();
  return (
    <TableRow selected={selected}>
      <TableBodyLabel mode={mode} edge={edge} index={index} />
      <TableCell className={classes.rowInfo} align="center" padding="none">
        <CategoryLabel category={edge.node.category ?? ''} />
      </TableCell>
      <TableCell
        className={clsx(
          classes.rowInfo,
          { [classes.promoted]: edge.node.elevation === '昇格' },
          { [classes.relegated]: edge.node.elevation === '降格' }
        )}
        align="center"
        padding="none"
      >
        {edge.node.rank}
      </TableCell>
      {tab === 'pl' ? (
        <PLTableRow edge={edge} />
      ) : tab === 'bs' ? (
        <BSTableRow edge={edge} />
      ) : tab === 'revenue' ? (
        <RevenueTableRow edge={edge} />
      ) : tab === 'expense' ? (
        <ExpenseTableRow edge={edge} />
      ) : (
        <AttdTableRow edge={edge} />
      )}
    </TableRow>
  );
}

export default TableBodyRow;

type TableRowProps = Pick<Props, 'edge'>;

export function PLTableRow({ edge }: TableRowProps) {
  const classes = useStyles();
  const { node } = edge;
  return (
    <>
      <TableCell classes={{ root: classes.root }} align="right">
        <strong>{node.revenue}</strong>
      </TableCell>
      <TableCell classes={{ root: classes.root }} align="right">
        {node.expense}
      </TableCell>
      <TableCell classes={{ root: classes.root }} className={classes.emphasized} align="right">
        {node.op_profit}
      </TableCell>
      <TableCell classes={{ root: classes.root }} align="right">
        {node.no_rev ?? '-'}
      </TableCell>
      <TableCell classes={{ root: classes.root }} align="right">
        {node.no_exp ?? '-'}
      </TableCell>
      <TableCell classes={{ root: classes.root }} className={classes.emphasized} align="right">
        {node.ordinary_profit ?? '-'}
      </TableCell>
      <TableCell classes={{ root: classes.root }} align="right">
        {node.sp_rev ?? '-'}
      </TableCell>
      <TableCell classes={{ root: classes.root }} align="right">
        {node.sp_exp ?? '-'}
      </TableCell>
      <TableCell classes={{ root: classes.root }} className={classes.emphasized} align="right">
        {node.profit_before_tax ?? '-'}
      </TableCell>
      <TableCell classes={{ root: classes.root }} align="right">
        {node.tax ?? '-'}
      </TableCell>
      <TableCell classes={{ root: classes.root }} className={classes.emphasized} align="right">
        {node.profit}
      </TableCell>
      <TableCell align="right">{node.related_revenue || '-'}</TableCell>
    </>
  );
}

export function BSTableRow({ edge }: TableRowProps) {
  const classes = useStyles();
  const { node } = edge;
  return (
    <>
      <TableCell classes={{ root: classes.root }} className={classes.emphasized} align="right">
        {node.assets}
      </TableCell>
      <TableCell classes={{ root: classes.root }} align="right">
        {node.curr_assets ?? '-'}
      </TableCell>
      <TableCell classes={{ root: classes.root }} align="right">
        {node.fixed_assets ?? '-'}
      </TableCell>
      <TableCell classes={{ root: classes.root }} className={classes.emphasized} align="right">
        {node.liabilities}
      </TableCell>
      <TableCell classes={{ root: classes.root }} align="right">
        {node.curr_liabilities ?? '-'}
      </TableCell>
      <TableCell classes={{ root: classes.root }} align="right">
        {node.fixed_liabilities ?? '-'}
      </TableCell>
      <TableCell classes={{ root: classes.root }} className={classes.emphasized} align="right">
        {node.net_worth}
      </TableCell>
      <TableCell classes={{ root: classes.root }} align="right">
        {node.capital_stock}
      </TableCell>
      <TableCell classes={{ root: classes.root }} align="right">
        {node.capital_surplus ?? '-'}
      </TableCell>
      <TableCell classes={{ root: classes.root }} align="right">
        {node.retained_earnings ?? '-'}
      </TableCell>
      <TableCell align="right">{node.profit}</TableCell>
    </>
  );
}

export function RevenueTableRow({ edge }: TableRowProps) {
  const classes = useStyles();
  const { node } = edge;
  return (
    <>
      <TableCell classes={{ root: classes.root }} className={classes.emphasized} align="right">
        {node.revenue}
      </TableCell>
      <TableCell classes={{ root: classes.root }} align="right">
        {node.sponsor ?? '-'}
      </TableCell>
      <TableCell classes={{ root: classes.root }} align="right">
        {node.ticket ?? '-'}
      </TableCell>
      <TableCell classes={{ root: classes.root }} align="right">
        {node.broadcast}
      </TableCell>
      {(node.year ?? 0) <= 2010 ? (
        <TableCell classes={{ root: classes.root }} align="center" colSpan={3}>
          {node.other_revs}
        </TableCell>
      ) : (node.year ?? 0) <= 2015 ? (
        <>
          <TableCell classes={{ root: classes.root }} align="center">
            {node.academy_rev}
          </TableCell>
          <TableCell classes={{ root: classes.root }} align="center" colSpan={2}>
            {node.other_revs}
          </TableCell>
        </>
      ) : (
        <>
          <TableCell classes={{ root: classes.root }} align="center">
            {node.academy_rev}
          </TableCell>
          <TableCell classes={{ root: classes.root }} align="center">
            {node.goods_rev}
          </TableCell>
          <TableCell classes={{ root: classes.root }} align="center">
            {node.other_revs}
          </TableCell>
        </>
      )}
      <TableCell align="right">{node.related_revenue || '-'}</TableCell>
    </>
  );
}

export function ExpenseTableRow({ edge }: TableRowProps) {
  const classes = useStyles();
  const { node } = edge;
  return (
    <>
      <TableCell classes={{ root: classes.root }} className={classes.emphasized} align="right">
        {node.expense}
      </TableCell>
      {(node.year ?? 0) <= 2005 && !node.salary ? (
        <>
          <TableCell classes={{ root: classes.root }} align="center" colSpan={7}>
            {node.general_exp ?? '-'}
          </TableCell>
          <TableCell align="center">{node.sga ?? '-'}</TableCell>
        </>
      ) : (node.year ?? 0) <= 2010 ? (
        <>
          <TableCell classes={{ root: classes.root }} align="right">
            {node.salary ?? '-'}
          </TableCell>
          <TableCell classes={{ root: classes.root }} align="center" colSpan={6}>
            {node.manage_exp ?? '-'}
          </TableCell>
          <TableCell align="center">{node.sga ?? '-'}</TableCell>
        </>
      ) : (node.year ?? 0) <= 2015 ? (
        <>
          <TableCell classes={{ root: classes.root }} align="right">
            {node.salary}
          </TableCell>
          <TableCell classes={{ root: classes.root }} align="right">
            {node.game_exp}
          </TableCell>
          <TableCell classes={{ root: classes.root }} align="right">
            {node.team_exp}
          </TableCell>
          <TableCell classes={{ root: classes.root }} align="right">
            {node.academy_exp}
          </TableCell>
          <TableCell classes={{ root: classes.root }} align="right">
            {node.women_exp}
          </TableCell>
          <TableCell align="center" colSpan={3}>
            {node.sga}
          </TableCell>
        </>
      ) : (
        <>
          <TableCell classes={{ root: classes.root }} align="right">
            {node.salary}
          </TableCell>
          <TableCell classes={{ root: classes.root }} align="right">
            {node.game_exp}
          </TableCell>
          <TableCell classes={{ root: classes.root }} align="right">
            {node.team_exp}
          </TableCell>
          <TableCell classes={{ root: classes.root }} align="right">
            {node.academy_exp}
          </TableCell>
          <TableCell classes={{ root: classes.root }} align="right">
            {node.women_exp}
          </TableCell>
          <TableCell classes={{ root: classes.root }} align="center">
            {node.goods_exp}
          </TableCell>
          <TableCell align="center" colSpan={2}>
            {node.sga}
          </TableCell>
        </>
      )}
    </>
  );
}

export function AttdTableRow({ edge }: TableRowProps) {
  const classes = useStyles();
  const { node } = edge;
  const { displayFullAttd } = useAppState();
  return (
    <>
      <TableCell classes={{ root: classes.root }} className={classes.emphasized} align="right">
        {node.ticket ?? '-'}
      </TableCell>
      <TableCell classes={{ root: classes.root }} align="right">
        {node.league_games}
      </TableCell>
      <TableCell classes={{ root: classes.root }} align="right">
        {Math.round((node.league_attd ?? 1) / (node.league_games ?? 0))}
      </TableCell>
      <TableCell classes={{ root: classes.root }} align="right">
        {node.league_attd}
      </TableCell>
      {displayFullAttd ? (
        <>
          <TableCell classes={{ root: classes.root }} align="right">
            {node.leaguecup_attd || '-'}
          </TableCell>
          <TableCell classes={{ root: classes.root }} align="right">
            {node.acl_attd || '-'}
          </TableCell>
          <TableCell classes={{ root: classes.root }} align="right">
            {node.po_attd || '-'}
          </TableCell>
          <TableCell classes={{ root: classes.root }} align="right">
            {node.second_attd || '-'}
          </TableCell>
        </>
      ) : null}
      <TableCell classes={{ root: classes.root }} align="right">
        {node.all_games}
      </TableCell>
      <TableCell classes={{ root: classes.root }} className={classes.emphasized} align="right">
        {node.all_attd}
      </TableCell>
      <TableCell align="right">
        {node.ticket && node.all_attd ? (((node.ticket ?? 1) * 1000000) / (node.all_attd ?? 1)).toFixed(2) : '-'}
      </TableCell>
    </>
  );
}
