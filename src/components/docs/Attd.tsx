import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { MarkDownQuery } from '../../../graphql-types';
import DocContainer from './DocContainer';

export function useAttd() {
  const { markdownRemark } = useStaticQuery<MarkDownQuery>(graphql`
    query {
      markdownRemark(frontmatter: { id: { eq: "attd" } }) {
        htmlAst
        frontmatter {
          title
        }
      }
    }
  `);
  return markdownRemark;
}

export function AttdDoc() {
  const markdownRemark = useAttd();
  return markdownRemark ? <DocContainer markdownRemark={markdownRemark} /> : null;
}

export default AttdDoc;
