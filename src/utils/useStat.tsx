import * as React from 'react';
import { Edge } from '../types';

export interface StatItem {
  id: string | number;
  value: number;
}

export interface Stat {
  key: string;
  n: number;
  sum: number;
  average: number;
  max: StatItem;
  min: StatItem;
}

type EdgeProps = keyof Edge['node'];

function isNumbers(array: (number | string | undefined | null)[]): array is number[] {
  return typeof array[0] === 'number';
}

function useStat(edges: Edge[], key: EdgeProps, idField: EdgeProps): Stat | null {
  return React.useMemo(() => {
    const values = edges.map(({ node }) => node[key]);
    if (!isNumbers(values)) return null;

    const n = values.length;
    const sum = values.reduce((accum, curr) => accum + curr, 0);
    const max = values.reduce((accum, curr, index) => (accum[0] < curr ? [curr, index] : accum), [-Infinity, 0]);
    const min = values.reduce((accum, curr, index) => (accum[0] > curr ? [curr, index] : accum), [Infinity, 0]);
    return {
      n,
      key,
      sum,
      average: sum / n,
      max: {
        id: edges[max[1]].node[idField] ?? `${max[1]}`,
        value: max[0],
      },
      min: {
        id: edges[min[1]].node[idField] ?? `${min[1]}`,
        value: min[0],
      },
    };
  }, [edges, key, idField]);
}

export default useStat;
