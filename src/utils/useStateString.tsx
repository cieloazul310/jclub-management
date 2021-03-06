import { useAppState } from './AppStateContext';
import { useDictionary } from './graphql-hooks';

export function useSortStateString() {
  const { sortAsc, sortKey } = useAppState();
  const dictionary = useDictionary();
  const field = sortKey === 'average_attd' ? '平均入場者数' : sortKey === 'unit_price' ? '客単価' : dictionary ? dictionary[sortKey] : '';
  const sortType = sortKey === 'rank' ? (sortAsc ? '高い順' : '低い順') : sortAsc ? '少ない順' : '多い順';

  return {
    field,
    sortKey,
    sortType,
  };
}

export function useFilterStateString() {
  const { filterCategories } = useAppState();

  return `フィルタ: ${
    filterCategories.length === 4 ? 'なし' : filterCategories.map((category) => (category === 'others' ? 'その他' : category)).join(',')
  }`;
}

export default function useStateString() {
  const sortString = useSortStateString();
  const filterString = useFilterStateString();
  return { sortString, filterString };
}
