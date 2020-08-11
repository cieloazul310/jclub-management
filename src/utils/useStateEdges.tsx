import * as React from 'react';
import { useAppState } from './AppStateContext';
import { SortKey, FilterCategory } from '../utils/AppState';
import { Mode, Edge } from '../types';

export default function useStateEdges(edges: Edge[], mode: Mode) {
  const filtered = useFilteredEdges(edges, mode);
  const sorted = useSortedEdges(filtered, mode);
  return sorted;
}

export function useFilteredEdges(edges: Edge[], mode: Mode) {
  const { filterCategories } = useAppState();
  return React.useMemo(() => (mode === 'club' ? edges : edges.filter((edge) => filterCategories.includes(getCategory(edge)))), [
    edges,
    mode,
    filterCategories,
  ]);
}

function getCategory(edge: Edge): FilterCategory {
  const { category } = edge.node;
  return category !== 'J1' && category !== 'J2' && category !== 'J3' ? 'others' : category;
}

export function useSortedEdges(edges: Edge[], mode: Mode) {
  const { sortKey, sortAsc } = useAppState();
  return React.useMemo(
    () =>
      mode === 'club' ? edges : [...edges].sort((a: Edge, b: Edge) => (sortAsc ? 1 : -1) * (getValue(a, sortKey) - getValue(b, sortKey))),
    [mode, edges, sortKey, sortAsc]
  );
}

export function getValue({ node }: Edge, sortKey: SortKey) {
  return sortKey === 'rank'
    ? getRank(node)
    : sortKey === 'unit_price'
    ? (node.ticket ?? 1) / (node.all_attd ?? 1)
    : sortKey === 'average_attd'
    ? (node.league_attd ?? 1) / (node.league_games ?? 1)
    : node[sortKey] ?? 1;
}

export function getRank(node: Edge['node']) {
  const addition =
    node.category === 'J1' ? 0 : node.category === 'J2' ? 100 : node.category === 'J3' ? 200 : node.category === 'JFL' ? 300 : 400;
  return addition + (node.rank ?? 0);
}

export function useSortedValue({ node }: Edge): string {
  const { sortKey } = useAppState();
  if (sortKey === 'unit_price') {
    return node.ticket && node.all_attd ? `${Math.round((node.ticket * 1000000) / node.all_attd)}円` : '-';
  } else if (sortKey === 'average_attd') {
    return node.league_attd && node.league_games ? `${Math.round(node.league_attd / node.league_games)}人` : '-';
  }
  return sortKey === 'rank' && node.category && node.rank
    ? `${node.category} ${node.rank}位`
    : sortKey === 'league_attd' || sortKey === 'all_attd'
    ? `${node[sortKey]}人`
    : node[sortKey]
    ? `${((node[sortKey] ?? 1) / 100).toFixed(2)}億円`
    : '-';
}
