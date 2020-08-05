import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Container from '@material-ui/core/Container';
import { MarkDownQuery } from '../../../graphql-types';
import DocContainer from './DocContainer';

export function useAttribution() {
  const { markdownRemark } = useStaticQuery<MarkDownQuery>(graphql`
    query MarkDown {
      markdownRemark(frontmatter: { id: { eq: "data" } }) {
        htmlAst
        frontmatter {
          title
        }
      }
    }
  `);
  return markdownRemark;
}

export function AttributionDoc() {
  const markdownRemark = useAttribution();
  return markdownRemark ? (
    <Container maxWidth="md">
      <DocContainer markdownRemark={markdownRemark} />
    </Container>
  ) : null;
}

export default AttributionDoc;
