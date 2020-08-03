import * as React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { TableBodyLabel } from './TableLabel';
import { useAppState } from '../../utils/AppStateContext';
import { Tab, Mode, Edge } from '../../types';

interface Props {
  tab: Tab;
  edge: Edge;
  mode: Mode;
  index: number;
}

function TableBodyRow({ tab, index, mode, edge }: Props) {
  return (
    <TableRow>
      <TableBodyLabel mode={mode} edge={edge} index={index} />
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

const useStyles = makeStyles((theme) =>
  createStyles({
    emphasized: {
      fontWeight: 'bold',
      background: theme.palette.background.default,
    },
  })
);

type TableRowProps = Pick<Props, 'edge'>;

export function PLTableRow({ edge }: TableRowProps) {
  const classes = useStyles();
  const { node } = edge;
  return (
    <>
      <TableCell align="center">{node.category}</TableCell>
      <TableCell align="right">{node.revenue}</TableCell>
      <TableCell align="right">{node.expense}</TableCell>
      <TableCell className={classes.emphasized} align="right">
        {node.op_profit}
      </TableCell>
      <TableCell align="right">{node.no_rev ?? '-'}</TableCell>
      <TableCell align="right">{node.no_exp ?? '-'}</TableCell>
      <TableCell className={classes.emphasized} align="right">
        {node.ordinary_profit ?? '-'}
      </TableCell>
      <TableCell align="right">{node.sp_rev ?? '-'}</TableCell>
      <TableCell align="right">{node.sp_exp ?? '-'}</TableCell>
      <TableCell className={classes.emphasized} align="right">
        {node.profit_before_tax ?? '-'}
      </TableCell>
      <TableCell align="right">{node.tax ?? '-'}</TableCell>
      <TableCell className={classes.emphasized} align="right">
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
      <TableCell align="center">{node.category}</TableCell>
      <TableCell className={classes.emphasized} align="right">
        {node.assets}
      </TableCell>
      <TableCell align="right">{node.curr_assets ?? '-'}</TableCell>
      <TableCell align="right">{node.fixed_assets ?? '-'}</TableCell>
      <TableCell className={classes.emphasized} align="right">
        {node.liabilities}
      </TableCell>
      <TableCell align="right">{node.curr_liabilities ?? '-'}</TableCell>
      <TableCell align="right">{node.fixed_liabilities ?? '-'}</TableCell>
      <TableCell className={classes.emphasized} align="right">
        {node.net_worth}
      </TableCell>
      <TableCell align="right">{node.capital_stock}</TableCell>
      <TableCell align="right">{node.capital_surplus ?? '-'}</TableCell>
      <TableCell align="right">{node.retained_earnings ?? '-'}</TableCell>
      <TableCell align="right">{node.profit}</TableCell>
    </>
  );
}

export function RevenueTableRow({ edge }: TableRowProps) {
  const classes = useStyles();
  const { node } = edge;
  return (
    <>
      <TableCell align="center">{node.category}</TableCell>
      <TableCell className={classes.emphasized} align="right">
        {node.revenue}
      </TableCell>
      <TableCell align="right">{node.sponsor ?? '-'}</TableCell>
      <TableCell align="right">{node.ticket ?? '-'}</TableCell>
      <TableCell align="right">{node.broadcast}</TableCell>
      {(node.year ?? 0) <= 2010 ? (
        <TableCell align="center" colSpan={3}>
          {node.other_revs}
        </TableCell>
      ) : (node.year ?? 0) <= 2015 ? (
        <>
          <TableCell align="center">{node.academy_rev}</TableCell>
          <TableCell align="center" colSpan={2}>
            {node.other_revs}
          </TableCell>
        </>
      ) : (
        <>
          <TableCell align="center">{node.academy_rev}</TableCell>
          <TableCell align="center">{node.goods_rev}</TableCell>
          <TableCell align="center">{node.other_revs}</TableCell>
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
      <TableCell align="center">{node.category}</TableCell>
      <TableCell className={classes.emphasized} align="right">
        {node.expense}
      </TableCell>
      {(node.year ?? 0) <= 2005 && !node.salary ? (
        <>
          <TableCell align="center" colSpan={7}>
            {node.general_exp}
          </TableCell>
          <TableCell align="center">{node.sga}</TableCell>
        </>
      ) : (node.year ?? 0) <= 2010 ? (
        <>
          <TableCell align="right">{node.salary}</TableCell>
          <TableCell align="center" colSpan={6}>
            {node.manage_exp}
          </TableCell>
          <TableCell align="center">{node.sga}</TableCell>
        </>
      ) : (node.year ?? 0) <= 2015 ? (
        <>
          <TableCell align="right">{node.salary}</TableCell>
          <TableCell align="right">{node.game_exp}</TableCell>
          <TableCell align="right">{node.team_exp}</TableCell>
          <TableCell align="right">{node.academy_exp}</TableCell>
          <TableCell align="right">{node.women_exp}</TableCell>
          <TableCell align="center" colSpan={3}>
            {node.sga}
          </TableCell>
        </>
      ) : (
        <>
          <TableCell align="right">{node.salary}</TableCell>
          <TableCell align="right">{node.game_exp}</TableCell>
          <TableCell align="right">{node.team_exp}</TableCell>
          <TableCell align="right">{node.academy_exp}</TableCell>
          <TableCell align="right">{node.women_exp}</TableCell>
          <TableCell align="center">{node.goods_exp}</TableCell>
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
      <TableCell align="center">{node.category}</TableCell>
      <TableCell className={classes.emphasized} align="right">
        {node.ticket}
      </TableCell>
      <TableCell align="right">{Math.round((node.league_attd ?? 1) / (node.league_games ?? 0))}</TableCell>
      <TableCell align="right">{node.league_attd}</TableCell>
      {displayFullAttd ? (
        <>
          <TableCell align="right">{node.leaguecup_attd || '-'}</TableCell>
          <TableCell align="right">{node.acl_attd || '-'}</TableCell>
          <TableCell align="right">{node.po_attd || '-'}</TableCell>
          <TableCell align="right">{node.second_attd || '-'}</TableCell>
        </>
      ) : null}
      <TableCell className={classes.emphasized} align="right">
        {node.all_attd}
      </TableCell>
      <TableCell align="right">{node.all_games}</TableCell>
      <TableCell align="right">{(((node.ticket ?? 1) * 1000000) / (node.all_attd ?? 1)).toFixed(2)}</TableCell>
    </>
  );
}
