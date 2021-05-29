import { useStaticQuery, graphql } from 'gatsby';
import { DictYaml, Node } from '../../../graphql-types';

type Dict = Omit<DictYaml, Exclude<keyof Node, 'id'>>;

export default function useDictionary(): Dict {
  const { dictYaml } = useStaticQuery<{ dictYaml: Dict }>(graphql`
    query Dictionary {
      dictYaml {
        academy_exp
        academy_rev
        acl_attd
        acl_games
        all_attd
        all_games
        assets
        broadcast
        capital_stock
        capital_surplus
        category
        curr_assets
        curr_liabilities
        elevation
        expense
        fixed_assets
        fixed_liabilities
        fullname
        game_exp
        general_exp
        goods_rev
        goods_exp
        league_attd
        league_games
        leaguecup_attd
        leaguecup_games
        liabilities
        license
        manage_exp
        name
        net_worth
        no_exp
        no_rev
        op_profit
        ordinary_profit
        other_revs
        po_attd
        po_games
        points
        ppg
        profit
        profit_before_tax
        rank
        related_revenue
        retained_earnings
        revenue
        salary
        second_attd
        sga
        second_games
        sp_exp
        sponsor
        sp_rev
        tax
        team_exp
        ticket
        women_exp
        year
        id
      }
    }
  `);
  return dictYaml;
}
