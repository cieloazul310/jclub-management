import { ClubTemplateQuery } from '../../graphql-types';

export * from './download';

export type Tab = 'pl' | 'bs' | 'revenue' | 'expense' | 'attd';
export type Mode = 'club' | 'year';
export type MobileTab = 'summary' | 'figure' | 'article' | 'settings';
export const tabs: Tab[] = ['pl', 'bs', 'revenue', 'expense', 'attd'];

export type Edges = ClubTemplateQuery['allDataset']['edges'];
export type Edge = Edges[number];
