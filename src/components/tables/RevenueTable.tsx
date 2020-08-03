import * as React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableCore from './TableCore';
import { TableHeadLabel, TableBodyLabel } from './TableLabel';
import useTableStyles from './useTableStyles';
import { ClubTemplateQuery } from '../../../graphql-types';

interface Props {
  edges: ClubTemplateQuery['allDataset']['edges'];
  mode: 'club' | 'year';
}

function RevenueTable({ edges, mode }: Props) {
  const classes = useTableStyles();
  return (
    <TableCore caption="単位: 百万円">
      <TableHead>
        <TableRow>
          <TableHeadLabel mode={mode} />
          <TableCell className={classes.head} align="center">
            所属
          </TableCell>
          <TableCell className={classes.head} align="center">
            営業収入
          </TableCell>
          <TableCell className={classes.head} align="center">
            スポンサー
          </TableCell>
          <TableCell className={classes.head} align="center">
            入場料
          </TableCell>
          <TableCell className={classes.head} align="center">
            配分金
          </TableCell>
          <TableCell className={classes.head} align="center">
            アカデミー関連
          </TableCell>
          <TableCell className={classes.head} align="center">
            物販
          </TableCell>
          <TableCell className={classes.head} align="center">
            その他
          </TableCell>
          <TableCell className={classes.head} align="center">
            関連法人
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {edges.map(({ node }, index) => (
          <TableRow key={node.id ?? index} hover>
            <TableBodyLabel>{mode === 'club' ? node.year : node.name}</TableBodyLabel>
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
          </TableRow>
        ))}
      </TableBody>
    </TableCore>
  );
}

export default RevenueTable;
