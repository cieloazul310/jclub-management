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

function PLTable({ edges, mode }: Props) {
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
            営業費用
          </TableCell>
          <TableCell className={classes.head} align="center">
            営業利益
          </TableCell>
          <TableCell className={classes.head} align="center">
            営業外収益
          </TableCell>
          <TableCell className={classes.head} align="center">
            営業外費用
          </TableCell>
          <TableCell className={classes.head} align="center">
            経常利益
          </TableCell>
          <TableCell className={classes.head} align="center">
            特別利益
          </TableCell>
          <TableCell className={classes.head} align="center">
            特別損失
          </TableCell>
          <TableCell className={classes.head} align="center">
            税引前
          </TableCell>
          <TableCell className={classes.head} align="center">
            法人税等
          </TableCell>
          <TableCell className={classes.head} align="center">
            当期純利益
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
          </TableRow>
        ))}
      </TableBody>
    </TableCore>
  );
}

export default PLTable;
