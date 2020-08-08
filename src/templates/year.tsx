import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import { YearTemplateQuery, SitePageContext } from '../../graphql-types';
import ExperimentalLayout from '../layout/Experimental';

function YearTemplate(props: PageProps<YearTemplateQuery, SitePageContext>) {
  const { yearsYaml } = props.data;

  return (
    <ExperimentalLayout
      mode="year"
      title={`${yearsYaml?.year}年Jクラブ経営情報`}
      description={`${yearsYaml?.year}年のJクラブ経営情報一覧。各Jクラブの損益計算書・貸借対照表・営業収入・営業費用・入場者数を項目ごとに表示。`}
      {...props}
    />
  );
}

/*
function YearTemplate(props: PageProps<YearTemplateQuery, SitePageContext>) {
  const { yearsYaml, allDataset } = props.data;
  const { previous, next } = props.pageContext;

  return (
    <TemplateLayout
      mode="year"
      title={`${yearsYaml?.year}年Jクラブ経営情報`}
      description={`${yearsYaml?.year}年のJクラブ経営情報一覧。各Jクラブの損益計算書・貸借対照表・営業収入・営業費用・入場者数を項目ごとに表示。`}
      {...props}
    >
      <ContentBasis>
        <Container maxWidth="md">
          <YearInfo yearYaml={yearsYaml} edges={allDataset.edges} />
          <Divider />
          <ContentBasis>
            <YearsLink />
            <PageNavigation mode="year" previous={previous} next={next} />
          </ContentBasis>
        </Container>
      </ContentBasis>
    </TemplateLayout>
  );
}
*/

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
