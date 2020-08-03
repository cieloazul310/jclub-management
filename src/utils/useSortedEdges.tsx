//import * as React from 'react';
import { useAppState } from './AppStateContext';
import { SortKey } from '../utils/AppState';
import { ClubTemplateQuery } from '../../graphql-types';

type Edges = ClubTemplateQuery['allDataset']['edges'];
type Edge = Edges[number];

export default function useSortedEdges(edges: Edges, mode: 'club' | 'year') {
  const { sortKey, sortAsc } = useAppState();
  return mode === 'club'
    ? edges
    : [...edges].sort((a: Edge, b: Edge) => (sortAsc ? 1 : -1) * (getValue(a, sortKey) - getValue(b, sortKey)));
}

function getValue({ node }: Edge, sortKey: SortKey) {
  return sortKey === 'unit_price'
    ? (node.ticket ?? 1) / (node.all_attd ?? 1)
    : sortKey === 'average_attd'
    ? (node.league_attd ?? 1) / (node.league_games ?? 1)
    : node[sortKey] ?? 1;
}
