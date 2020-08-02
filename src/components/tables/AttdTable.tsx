import * as React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableCore from './TableCore';
import { TableHeadLabel, TableBodyLabel } from './TableLabel';
import useTableStyles from './useTableStyles';
import { useAppState } from '../../utils/AppStateContext';
import { ClubTemplateQuery } from '../../../graphql-types';

interface Props {
  edges: ClubTemplateQuery['allDataset']['edges'];
  mode: 'club' | 'year';
}

function AttdTable({ edges, mode }: Props) {
  const classes = useTableStyles();
  const { displayFullAttd } = useAppState();

  return (
    <TableCore caption="単位:入場料収入のみ百万円">
      <TableHead>
        <TableRow>
          <TableHeadLabel mode={mode} />
          <TableCell className={classes.head} align="center">
            所属
          </TableCell>
          <TableCell className={classes.head} align="center">
            入場料収入
          </TableCell>
          <TableCell className={classes.head} align="center">
            リーグ戦平均
          </TableCell>
          <TableCell className={classes.head} align="center">
            リーグ戦入場者数
          </TableCell>
          {displayFullAttd ? (
            <>
              <TableCell className={classes.head} align="center">
                リーグカップ入場者数
              </TableCell>
              <TableCell className={classes.head} align="center">
                ACL入場者数
              </TableCell>
              <TableCell className={classes.head} align="center">
                PO入場者数
              </TableCell>
              <TableCell className={classes.head} align="center">
                セカンド入場者数
              </TableCell>
            </>
          ) : null}
          <TableCell className={classes.head} align="center">
            年間入場者数
          </TableCell>
          <TableCell className={classes.head} align="center">
            ホーム試合数
          </TableCell>
          <TableCell className={classes.head} align="center">
            客単価
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {edges.map(({ node }, index) => (
          <TableRow key={node.id ?? index} hover>
            <TableBodyLabel>{mode === 'club' ? node.year : node.name}</TableBodyLabel>
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
          </TableRow>
        ))}
      </TableBody>
    </TableCore>
  );
}

export default AttdTable;
