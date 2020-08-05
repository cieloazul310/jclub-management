import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { MarkDownQuery } from '../../../graphql-types';
import DocContainer from './DocContainer';

export function useRevenue() {
  const { markdownRemark } = useStaticQuery<MarkDownQuery>(graphql`
    query {
      markdownRemark(frontmatter: { id: { eq: "revenue" } }) {
        htmlAst
        frontmatter {
          title
        }
      }
    }
  `);
  return markdownRemark;
}

export function RevenueDoc() {
  const markdownRemark = useRevenue();
  return markdownRemark ? <DocContainer markdownRemark={markdownRemark} /> : null;
}

export default RevenueDoc;
