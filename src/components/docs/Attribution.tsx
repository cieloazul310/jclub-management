import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Container from '@material-ui/core/Container';
import { renderAst } from '../../utils/renderAst';
import { MarkDownQuery } from '../../../graphql-types';

function Attribution() {
  const { markdownRemark } = useStaticQuery<MarkDownQuery>(graphql`
    query MarkDown {
      markdownRemark(frontmatter: { id: { eq: "data" } }) {
        htmlAst
      }
    }
  `);
  return markdownRemark?.htmlAst ? <Container maxWidth="md">{renderAst(markdownRemark.htmlAst)}</Container> : null;
}

export default Attribution;
