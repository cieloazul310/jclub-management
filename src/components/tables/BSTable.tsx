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

function BSTable({ edges, mode }: Props) {
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
            総資産
          </TableCell>
          <TableCell className={classes.head} align="center">
            流動資産
          </TableCell>
          <TableCell className={classes.head} align="center">
            固定資産等
          </TableCell>
          <TableCell className={classes.head} align="center">
            総負債
          </TableCell>
          <TableCell className={classes.head} align="center">
            流動負債
          </TableCell>
          <TableCell className={classes.head} align="center">
            固定負債
          </TableCell>
          <TableCell className={classes.head} align="center">
            純資産
          </TableCell>
          <TableCell className={classes.head} align="center">
            資本金
          </TableCell>
          <TableCell className={classes.head} align="center">
            資本剰余金等
          </TableCell>
          <TableCell className={classes.head} align="center">
            利益剰余金
          </TableCell>
          <TableCell className={classes.head} align="center">
            当期純利益
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {edges.map(({ node }, index) => (
          <TableRow key={node.id ?? index} hover>
            <TableBodyLabel>{mode === 'club' ? node.year : node.name}</TableBodyLabel>
            <TableCell>{node.category}</TableCell>
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
          </TableRow>
        ))}
      </TableBody>
    </TableCore>
  );
}

export default BSTable;
