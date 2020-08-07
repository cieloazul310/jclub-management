import { ClubTemplateQuery } from '../../graphql-types';
export { SortKey, FilterCategory } from '../utils/AppState';

export type Tab = 'pl' | 'bs' | 'revenue' | 'expense' | 'attd';
export type Mode = 'club' | 'year';
export type MobileTab = 'summary' | 'main' | 'settings';
export type ContentTab = 'figure' | 'article';
export const tabs: Tab[] = ['pl', 'bs', 'revenue', 'expense', 'attd'];

export type Edges = ClubTemplateQuery['allDataset']['edges'];
export type Edge = Edges[number];
