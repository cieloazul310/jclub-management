import { ClubTemplateQuery } from '../../graphql-types';

export type Tab = 'pl' | 'bs' | 'revenue' | 'expense' | 'attd';
export type Mode = 'club' | 'year';
export type Edges = ClubTemplateQuery['allDataset']['edges'];
export type Edge = Edges[number];
