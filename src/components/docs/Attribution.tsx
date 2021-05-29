import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import DocContainer from './DocContainer';
import { Maybe, MarkDownQuery, MarkdownRemark, MarkdownRemarkFrontmatter } from '../../../graphql-types';

export function useAttribution():
  | Maybe<
      Pick<MarkdownRemark, 'htmlAst'> & {
        frontmatter?: Maybe<Pick<MarkdownRemarkFrontmatter, 'title'>> | undefined;
      }
    >
  | undefined {
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

export function AttributionDoc(): JSX.Element | null {
  const markdownRemark = useAttribution();
  return markdownRemark ? <DocContainer markdownRemark={markdownRemark} /> : null;
}
