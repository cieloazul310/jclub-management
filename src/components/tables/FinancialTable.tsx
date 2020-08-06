import * as React from 'react';
import { useLocation } from '@reach/router';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCore from './TableCore';
import TableHeadRow from './TableHeadRow';
import TableBodyRow from './TableBodyRow';
import TableToolbar from './TableToolbar';
import TableFooter from './TableFooter';
import useStateEdges from '../../utils/useStateEdges';
import { Tab, Mode, Edge } from '../../types';
import { SitePageContextNext, SitePageContextPrevious } from '../../../graphql-types';

interface Props {
  edges: Edge[];
  mode: Mode;
  tab: Tab;
  next?: SitePageContextNext | null;
  previous?: SitePageContextPrevious | null;
}

function FinancialTable({ edges, mode, tab, next, previous }: Props) {
  const stateEdges = useStateEdges(edges, mode);
  const { pathname } = useLocation();
  const id = `${pathname.split('/').join('')}${tab}`;
  return (
    <div>
      <TableToolbar mode={mode} tab={tab} />
      <Paper>
        <TableCore mode={mode} id={id}>
          <TableHead>
            <TableHeadRow mode={mode} tab={tab} />
          </TableHead>
          <TableBody>
            {stateEdges.map((edge, index) => (
              <TableBodyRow key={edge.node.id ?? index} edge={edge} mode={mode} tab={tab} index={index} />
            ))}
          </TableBody>
        </TableCore>
        <TableFooter tableId={id} mode={mode} next={next} previous={previous} />
      </Paper>
    </div>
  );
}

export default FinancialTable;
