import * as React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCore from './TableCore';
import TableHeadRow from './TableHeadRow';
import TableBodyRow from './TableBodyRow';
import useStateEdges from '../../utils/useStateEdges';
import useTableId from '../../utils/useTableId';
import { Tab, Mode, Edge } from '../../types';

interface Props {
  edges: Edge[];
  mode: Mode;
  tab: Tab;
}

function FinancialTable({ edges, mode, tab }: Props): JSX.Element {
  const stateEdges = useStateEdges(edges, mode);
  const id = useTableId(tab);
  return (
    <TableCore id={id}>
      <TableHead>
        <TableHeadRow mode={mode} tab={tab} />
      </TableHead>
      <TableBody>
        {stateEdges.map((edge, index) => (
          <TableBodyRow key={edge.node.id ?? index} edge={edge} mode={mode} tab={tab} index={index} />
        ))}
      </TableBody>
    </TableCore>
  );
}

export default FinancialTable;
