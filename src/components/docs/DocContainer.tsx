import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { renderAst } from '../../utils/renderAst';
import { MarkDownQuery } from '../../../graphql-types';

export const useDocStyles = makeStyles((theme) =>
  createStyles({
    docsTitle: {
      paddingBottom: theme.spacing(4),
    },
  })
);

interface Props {
  markdownRemark: NonNullable<MarkDownQuery['markdownRemark']>;
}

function DocContainer({ markdownRemark }: Props) {
  const { frontmatter, htmlAst } = markdownRemark;
  const classes = useDocStyles();
  return (
    <>
      <Typography variant="h3" component="h2" className={classes.docsTitle}>
        {frontmatter?.title}
      </Typography>
      {renderAst(htmlAst)}
    </>
  );
}

export default DocContainer;
