import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import TemplateLayout from '../layout/TemplateLayout';
import { YearTemplateQuery, SitePageContext } from '../../graphql-types';

function YearTemplate(props: PageProps<YearTemplateQuery, SitePageContext>) {
  const { yearsYaml } = props.data;

  return (
    <TemplateLayout mode="year" title={`${yearsYaml?.year}年Jリーグ経営情報`} {...props}>
      <Typography>{yearsYaml?.year}</Typography>
    </TemplateLayout>
  );
}

export default YearTemplate;

export const query = graphql`
  query YearTemplate($year: Int!) {
    yearsYaml(year: { eq: $year }) {
      year
      categories
    }
    allDataset(filter: { year: { eq: $year } }) {
      edges {
        node {
          academy_exp
          academy_rev
          acl_attd
          acl_games
          all_attd
          all_games
          broadcast
          assets
          capital_stock
          capital_surplus
          category
          curr_assets
          curr_liabilities
          expense
          fixed_assets
          fixed_liabilities
          fullname
          game_exp
          general_exp
          goods_exp
          goods_rev
          id
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
          related_revenue
          rank
          retained_earnings
          revenue
          salary
          second_attd
          second_games
          sga
          slug
          sp_exp
          sp_rev
          sponsor
          tax
          team_exp
          ticket
          women_exp
          year
        }
      }
    }
  }
`;
