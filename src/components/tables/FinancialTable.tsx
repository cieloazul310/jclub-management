import * as React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCore from './TableCore';
import TableHeadRow from './TableHeadRow';
import TableBodyRow from './TableBodyRow';
import useSortedEdges from '../../utils/useSortedEdges';
import { Tab, Mode } from '../../types';
import { ClubTemplateQuery } from '../../../graphql-types';

interface Props {
  edges: ClubTemplateQuery['allDataset']['edges'];
  mode: Mode;
  tab: Tab;
}

function FinancialTable({ edges, mode, tab }: Props) {
  const sorted = useSortedEdges(edges, mode);
  return (
    <TableCore mode={mode}>
      <TableHead>
        <TableHeadRow mode={mode} tab={tab} />
      </TableHead>
      <TableBody>
        {sorted.map((edge, index) => (
          <TableBodyRow key={edge.node.id ?? index} edge={edge} mode={mode} tab={tab} />
        ))}
      </TableBody>
    </TableCore>
  );
}

export default FinancialTable;
