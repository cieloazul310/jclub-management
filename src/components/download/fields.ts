import { DictionaryQuery } from '../../../graphql-types';

type AttdFields = 'league_average' | 'unit_price';
export type Fields = keyof NonNullable<DictionaryQuery['dictYaml']> | AttdFields;

export const generalFields: Fields[] = ['fullname', 'license', 'rank', 'points', 'ppg', 'elevation'];
export const plFields: Fields[] = [
  'revenue',
  'expense',
  'op_profit',
  'no_rev',
  'no_exp',
  'ordinary_profit',
  'sp_rev',
  'sp_exp',
  'profit_before_tax',
  'tax',
  'profit',
  'related_revenue',
];
export const bsFields: Fields[] = [
  'assets',
  'curr_assets',
  'fixed_assets',
  'liabilities',
  'curr_liabilities',
  'fixed_liabilities',
  'net_worth',
  'capital_stock',
  'capital_surplus',
  'retained_earnings',
];
export const revenueFields: Fields[] = ['sponsor', 'ticket', 'broadcast', 'academy_rev', 'goods_rev', 'other_revs'];
export const expenseFields: Fields[] = ['salary', 'game_exp', 'team_exp', 'academy_exp', 'women_exp', 'goods_exp', 'manage_exp', 'sga'];
export const attdFields: Fields[] = [
  'all_attd',
  'all_games',
  'league_average',
  'unit_price',
  'league_attd',
  'league_games',
  'leaguecup_attd',
  'leaguecup_games',
  'po_attd',
  'po_games',
  'acl_attd',
  'acl_attd',
  'second_attd',
  'second_games',
];

const allFields = [...generalFields, ...plFields, ...bsFields, ...revenueFields, ...expenseFields, ...attdFields];
export default allFields;
