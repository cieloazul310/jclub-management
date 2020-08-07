import { useLocation } from '@reach/router';
import { Tab } from '../types';

export default function useTableId(tab: Tab) {
  const { pathname } = useLocation();
  return `${pathname.split('/').join('')}${tab}`;
}
