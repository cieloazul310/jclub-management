import * as React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/Tablerow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { Edge, Mode, Tab } from '../../types';

interface Props {
  edge: Edge;
  mode: Mode;
  tab: Tab;
}

function ListItemTable({ edge, mode, tab }: Props) {
  return (
    <TableContainer>
      <Table size="small">
        {tab === 'pl' ? (
          <PLTable edge={edge} />
        ) : tab === 'bs' ? (
          <BSTable edge={edge} />
        ) : tab === 'revenue' ? (
          <RevenueTable edge={edge} />
        ) : tab === 'expense' ? (
          <ExpenseTable edge={edge} />
        ) : (
          <AttdTable edge={edge} />
        )}
      </Table>
    </TableContainer>
  );
}

export default ListItemTable;

function PLTable({ edge }: Pick<Props, 'edge'>) {
  const { node } = edge;
  const [noOpen, _toggleNoOpen] = useCollapsable(false);
  const [spOpen, _toggleSpOpen] = useCollapsable(false);
  return (
    <TableBody>
      <DataTableRow label="営業収入" value={<strong>{node.revenue}</strong>} selected />
      <DataTableRow label="営業費用" value={node.expense} />
      <DataTableRow label="営業利益" value={node.op_profit} />
      <DataTableRow label="経常利益" value={node.revenue} open={noOpen} toggleOpen={_toggleNoOpen} />
      {noOpen ? (
        <>
          <DataTableRow label="営業外収入" value={node.no_rev} inset />
          <DataTableRow label="営業外費用" value={node.no_exp} inset />
        </>
      ) : null}
      <DataTableRow label="当期純利益" value={node.profit} open={spOpen} toggleOpen={_toggleSpOpen} />
      {spOpen ? (
        <>
          <DataTableRow label="特別利益" value={node.sp_rev} inset />
          <DataTableRow label="特別損失" value={node.sp_exp} inset />
          <DataTableRow label="法人税など" value={node.tax} inset />
        </>
      ) : null}
      {(node.year ?? 0) > 2017 ? <DataTableRow label="関連する法人の営業収益" value={node.retained_earnings ?? '-'} /> : null}
    </TableBody>
  );
}

function BSTable({ edge }: Pick<Props, 'edge'>) {
  const { node } = edge;
  const [assetsOpen, toggleAssetsOpen] = useCollapsable(false);
  const [liabilitiesOpen, toggleLiabilitiesOpen] = useCollapsable(false);
  const [worthOpen, toggleWorthOpen] = useCollapsable(false);

  return (
    <TableBody>
      <DataTableRow label="総資産" value={node.assets} open={assetsOpen} toggleOpen={toggleAssetsOpen} />
      {assetsOpen ? (
        <>
          <DataTableRow label="流動資産" value={node.curr_assets} inset />
          <DataTableRow label="固定資産等" value={node.fixed_assets} inset />
        </>
      ) : null}
      <DataTableRow label="総負債" value={node.assets} open={liabilitiesOpen} toggleOpen={toggleLiabilitiesOpen} />
      {liabilitiesOpen ? (
        <>
          <DataTableRow label="流動負債" value={node.curr_liabilities} inset />
          <DataTableRow label="固定負債" value={node.fixed_liabilities} inset />
        </>
      ) : null}
      <DataTableRow label="純資産" value={<strong>{node.net_worth}</strong>} selected open={worthOpen} toggleOpen={toggleWorthOpen} />
      <DataTableRow label="資本金" value={node.capital_stock} inset />
      {worthOpen ? (
        <>
          <DataTableRow label="資本剰余金" value={node.capital_surplus} inset />
          <DataTableRow label="利益剰余金" value={node.retained_earnings} inset />
        </>
      ) : null}
    </TableBody>
  );
}

function RevenueTable({ edge }: Pick<Props, 'edge'>) {
  const { node } = edge;
  return (
    <TableBody>
      <DataTableRow label="営業収入" value={<strong>{node.revenue}</strong>} selected />
      <DataTableRow label="スポンサー収入" value={node.sponsor} />
      <DataTableRow label="入場料収入" value={node.ticket} />
      <DataTableRow label="Jリーグ配分金" value={node.broadcast} />
      {(node.year ?? 0) > 2010 ? <DataTableRow label="アカデミー関連収入" value={node.academy_rev} /> : null}
      {(node.year ?? 0) > 2015 ? <DataTableRow label="物販収入" value={node.goods_rev} /> : null}
      <DataTableRow label="その他収入" value={node.other_revs} />
    </TableBody>
  );
}

function ExpenseTable({ edge }: Pick<Props, 'edge'>) {
  const { node } = edge;
  return (
    <TableBody>
      <DataTableRow label="営業費用" value={<strong>{node.expense}</strong>} selected />
      <DataTableRow label="チーム人件費" value={<strong>{node.salary}</strong>} />
      {(node.year ?? 0) < 2011 ? <DataTableRow label="事業費(チーム人件費を除く)" value={node.manage_exp} /> : null}
      {(node.year ?? 0) > 2010 ? (
        <>
          <DataTableRow label="試合関連経費" value={node.game_exp} />
          <DataTableRow label="トップチーム運営経費" value={node.team_exp} />
          <DataTableRow label="アカデミー運営経費" value={node.academy_exp} />
          <DataTableRow label="女子チーム運営経費" value={node.women_exp} />
        </>
      ) : null}
      {(node.year ?? 0) > 2015 ? <DataTableRow label="物販関連経費" value={node.goods_rev} /> : null}
      <DataTableRow
        label={
          (node.year ?? 0) < 2011 ? '一般管理費' : (node.year ?? 0) < 2016 ? '販売費および一般管理費(物販含む)' : '販売費および一般管理費'
        }
        value={node.sga}
      />
    </TableBody>
  );
}

function AttdTable({ edge }: Pick<Props, 'edge'>) {
  const { node } = edge;
  const [gamesOpen, toggleGamesOpen] = useCollapsable(false);
  const [attdOpen, toggleAttdOpen] = useCollapsable(false);
  return (
    <TableBody>
      <DataTableRow label="入場料収入" value={<strong>{node.ticket ?? '-'}</strong>} selected />
      <DataTableRow label="リーグ戦平均入場者数" value={Math.round((node.league_attd ?? 1) / (node.league_games ?? 1))} />
      <DataTableRow label="年間ホームゲーム数" value={node.all_games} open={gamesOpen} toggleOpen={toggleGamesOpen} />
      {gamesOpen ? (
        <>
          <DataTableRow label="リーグ戦" value={node.league_games} inset />
          <DataTableRow label="リーグカップ" value={node.leaguecup_games || '-'} inset />
          <DataTableRow label="ACL" value={node.acl_games || '-'} inset />
          <DataTableRow label="プレーオフ" value={node.po_games || '-'} inset />
          <DataTableRow label="U-23" value={node.second_games || '-'} inset />
        </>
      ) : null}
      <DataTableRow label="年間総入場者数数" value={node.all_attd} open={attdOpen} toggleOpen={toggleAttdOpen} />
      {attdOpen ? (
        <>
          <DataTableRow label="リーグ戦" value={node.league_attd} inset />
          <DataTableRow label="リーグカップ" value={node.leaguecup_attd || '-'} inset />
          <DataTableRow label="ACL" value={node.acl_attd || '-'} inset />
          <DataTableRow label="プレーオフ" value={node.po_attd || '-'} inset />
          <DataTableRow label="U-23" value={node.second_attd || '-'} inset />
        </>
      ) : null}
      <DataTableRow label="客単価" value={node.ticket && node.all_attd ? Math.round((node.ticket * 1000000) / node.all_attd) : '-'} />
    </TableBody>
  );
}

interface DataTableRowStyles {
  inset: boolean;
  selected: boolean;
}

const useDataTableRowStyles = makeStyles<Theme, DataTableRowStyles>((theme) =>
  createStyles({
    root: {
      background: ({ selected }) => (selected ? theme.palette.grey[200] : undefined),
    },
    label: {
      paddingLeft: ({ inset }) => (inset ? theme.spacing(5) : undefined),
    },
  })
);

interface DataTableRowProps {
  open?: boolean;
  toggleOpen?: () => void;
  selected?: boolean;
  inset?: boolean;
  label: React.ReactNode;
  value: React.ReactNode | null;
}

function DataTableRow({ label, value, open, toggleOpen, inset = false, selected = false }: DataTableRowProps) {
  const classes = useDataTableRowStyles({ inset, selected });
  return (
    <TableRow className={classes.root}>
      <TableCell padding="checkbox">
        {typeof open === 'boolean' && typeof toggleOpen === 'function' ? (
          <IconButton aria-label="expand row" size="small" onClick={toggleOpen}>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        ) : null}
      </TableCell>
      <TableCell className={classes.label} component="th" scope="row">
        {label}
      </TableCell>
      <TableCell align="right">{value ?? '-'}</TableCell>
    </TableRow>
  );
}

function useCollapsable(initialOpen: boolean): [boolean, () => void] {
  const [open, setOpen] = React.useState(initialOpen);
  const _setOpen = () => {
    setOpen(!open);
  };
  return [open, _setOpen];
}
