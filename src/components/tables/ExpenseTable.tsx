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

function ExpenseTable({ edges, mode }: Props) {
  const classes = useTableStyles();
  return (
    <TableCore caption="単位:百万円">
      <TableHead>
        <TableRow>
          <TableHeadLabel mode={mode} />
          <TableCell className={classes.head} align="center">
            所属
          </TableCell>
          <TableCell className={classes.head} align="center">
            営業費用
          </TableCell>
          <TableCell className={classes.head} align="center">
            チーム人件費
          </TableCell>
          <TableCell className={classes.head} align="center">
            試合関連
          </TableCell>
          <TableCell className={classes.head} align="center">
            トップチーム運営
          </TableCell>
          <TableCell className={classes.head} align="center">
            アカデミー運営
          </TableCell>
          <TableCell className={classes.head} align="center">
            女子チーム運営
          </TableCell>
          <TableCell className={classes.head} align="center">
            物販関連
          </TableCell>
          <TableCell className={classes.head} align="center">
            販売費
          </TableCell>
          <TableCell className={classes.head} align="center">
            一般管理費
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {edges.map(({ node }, index) => (
          <TableRow key={node.id ?? index} hover>
            <TableBodyLabel>{mode === 'club' ? node.year : node.name}</TableBodyLabel>
            <TableCell align="center">{node.category}</TableCell>
            <TableCell className={classes.emphasized} align="right">
              {node.expense}
            </TableCell>
            <TableCell align="right">{node.salary}</TableCell>
            {(node.year ?? 0) <= 2010 ? (
              <>
                <TableCell align="center" colspan={6}>
                  {node.manage_exp}
                </TableCell>
                <TableCell align="center">{node.sga}</TableCell>
              </>
            ) : (node.year ?? 0) <= 2015 ? (
              <>
                <TableCell align="right">{node.game_exp}</TableCell>
                <TableCell align="right">{node.team_exp}</TableCell>
                <TableCell align="right">{node.academy_exp}</TableCell>
                <TableCell align="right">{node.women_exp}</TableCell>
                <TableCell align="center" colspan={3}>
                  {node.sga}
                </TableCell>
              </>
            ) : (
              <>
                <TableCell align="right">{node.game_exp}</TableCell>
                <TableCell align="right">{node.team_exp}</TableCell>
                <TableCell align="right">{node.academy_exp}</TableCell>
                <TableCell align="right">{node.women_exp}</TableCell>
                <TableCell align="center">{node.goods_exp}</TableCell>
                <TableCell align="center" colspan={2}>
                  {node.sga}
                </TableCell>
              </>
            )}
          </TableRow>
        ))}
      </TableBody>
    </TableCore>
  );
}

export default ExpenseTable;
