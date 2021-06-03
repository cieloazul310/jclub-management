import * as React from 'react';
import { useAppState } from './AppStateContext';
import { SortKey, FilterCategory } from './AppState';
import { Mode, Edge } from '../types';

function getCategory(edge: Edge): FilterCategory {
  const { category } = edge.node;
  return category !== 'J1' && category !== 'J2' && category !== 'J3' ? 'others' : category;
}

export function getRank(node: Edge['node']): number {
  const addition = (category: string) => {
    if (category === 'J1') return 0;
    if (category === 'J2') return 100;
    if (category === 'J3') return 200;
    if (category === 'JFL') return 300;
    return 400;
  };
  return addition(node.category ?? '') + (node.rank ?? 0);
}

export function useFilteredEdges(edges: Edge[], mode: Mode): Edge[] {
  const { filterCategories } = useAppState();
  return React.useMemo(
    () => (mode === 'club' ? edges : edges.filter((edge) => filterCategories.includes(getCategory(edge)))),
    [edges, mode, filterCategories]
  );
}

export function getValue({ node }: Edge, sortKey: SortKey): number {
  if (sortKey === 'rank') return getRank(node);
  if (sortKey === 'unit_price') return (node.ticket ?? 1) / (node.all_attd ?? 1);
  if (sortKey === 'average_attd') return (node.league_attd ?? 1) / (node.league_games ?? 1);
  return node[sortKey] ?? 1;
}

export function useSortedEdges(edges: Edge[], mode: Mode): Edge[] {
  const { sortKey, sortAsc } = useAppState();
  return React.useMemo(
    () =>
      mode === 'club' ? edges : [...edges].sort((a: Edge, b: Edge) => (sortAsc ? 1 : -1) * (getValue(a, sortKey) - getValue(b, sortKey))),
    [mode, edges, sortKey, sortAsc]
  );
}

export function useSortedValue({ node }: Edge): string {
  const { sortKey } = useAppState();
  if (sortKey === 'unit_price') {
    return node.ticket && node.all_attd ? `${Math.round((node.ticket * 1000000) / node.all_attd)}円` : '-';
  }
  if (sortKey === 'average_attd') {
    return node.league_attd && node.league_games ? `${Math.round(node.league_attd / node.league_games)}人` : '-';
  }
  if (sortKey === 'rank' && node.category && node.rank) return `${node.category} ${node.rank}位`;
  if (sortKey === 'league_attd' || sortKey === 'all_attd') return `${node[sortKey]}人`;
  if (node[sortKey]) return `${((node[sortKey] ?? 1) / 100).toFixed(2)}億円`;
  return '-';
}

export default function useStateEdges(edges: Edge[], mode: Mode): Edge[] {
  const filtered = useFilteredEdges(edges, mode);
  const sorted = useSortedEdges(filtered, mode);
  return sorted;
}
