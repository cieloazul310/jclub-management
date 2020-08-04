import * as React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCore from './TableCore';
import TableHeadRow from './TableHeadRow';
import TableBodyRow from './TableBodyRow';
import TableToolbar from './TableToolbar';
import useStateEdges from '../../utils/useStateEdges';
import { Tab, Mode, Edge } from '../../types';

interface Props {
  edges: Edge[];
  mode: Mode;
  tab: Tab;
}

function FinancialTable({ edges, mode, tab }: Props) {
  const stateEdges = useStateEdges(edges, mode);
  return (
    <div>
      <TableToolbar mode={mode} tab={tab} />
      <TableCore mode={mode}>
        <TableHead>
          <TableHeadRow mode={mode} tab={tab} />
        </TableHead>
        <TableBody>
          {stateEdges.map((edge, index) => (
            <TableBodyRow key={edge.node.id ?? index} edge={edge} mode={mode} tab={tab} index={index} />
          ))}
        </TableBody>
      </TableCore>
    </div>
  );
}

export default FinancialTable;
