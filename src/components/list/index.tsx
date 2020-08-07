import * as React from 'react';
import ListItem from './ListItem';
import { Edge, Mode, Tab } from '../../types';
import { SitePageContextNext, SitePageContextPrevious } from '../../../graphql-types';

interface Props {
  edges: Edge[];
  mode: Mode;
  tab: Tab;
  next?: SitePageContextNext | null;
  previous?: SitePageContextPrevious | null;
}

function FinancialList({ edges, mode, tab, next, previous }: Props) {
  return (
    <div>
      {edges.map((edge, index) => (
        <ListItem key={edge.node.id ?? index} edge={edge} mode={mode} tab={tab} index={index} />
      ))}
    </div>
  );
}

export default FinancialList;
