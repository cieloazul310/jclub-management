/* eslint react/jsx-props-no-spreading: off */
import * as React from 'react';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import MuiLink, { LinkProps } from '@material-ui/core/Link';
import TableContainer from '@material-ui/core/TableContainer';
import MuiTable, { TableProps } from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Divider from '@material-ui/core/Divider';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AppLink } from '../components/AppLink';

interface StylesProps {
  variant: TypographyProps['variant'];
}

const useStyles = makeStyles<Theme, StylesProps>((theme) =>
  createStyles({
    heading: {
      marginTop: '2em',
      marginBottom: '1em',
      borderLeft: ({ variant }) => (variant === 'h5' ? `4px solid ${theme.palette.secondary.main}` : undefined),
      paddingLeft: ({ variant }) => (variant === 'h5' ? theme.spacing(1) : undefined),
    },
  })
);

function Heading({ variant, ...props }: Omit<TypographyProps, 'ref'>) {
  const classes = useStyles({ variant });
  return <Typography className={classes.heading} variant={variant} gutterBottom {...props} />;
}

const H2 = (props: Omit<TypographyProps, 'ref'>): JSX.Element => <Heading variant="h4" component="h2" gutterBottom {...props} />;
const H3 = (props: Omit<TypographyProps, 'ref'>): JSX.Element => <Heading variant="h5" component="h3" gutterBottom {...props} />;
const H4 = (props: Omit<TypographyProps, 'ref'>): JSX.Element => <Heading variant="h6" component="h4" gutterBottom {...props} />;
const H5 = (props: Omit<TypographyProps, 'ref'>): JSX.Element => <Heading variant="h6" component="h5" gutterBottom {...props} />;
const H6 = (props: Omit<TypographyProps, 'ref'>): JSX.Element => <Heading variant="subtitle2" component="h6" gutterBottom {...props} />;
const Paragraph = (props: TypographyProps): JSX.Element => <Typography variant="body1" paragraph {...props} />;
const Link = (props: LinkProps): JSX.Element => <MuiLink color="secondary" target="_blank" rel="noopener noreferrer" {...props} />;
const Ul = (props: Omit<TypographyProps, 'ref'>): JSX.Element => <Typography component="ul" gutterBottom {...props} />;
const Ol = (props: Omit<TypographyProps, 'ref'>): JSX.Element => <Typography component="ol" gutterBottom {...props} />;
const Li = (props: Omit<TypographyProps, 'ref'>): JSX.Element => <Typography variant="body2" gutterBottom component="li" {...props} />;
const Table = (props: TableProps): JSX.Element => (
  <TableContainer>
    <MuiTable {...props} />
  </TableContainer>
);

const components = {
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: Paragraph,
  a: Link,
  ul: Ul,
  ol: Ol,
  li: Li,
  table: Table,
  tr: TableRow,
  th: TableCell,
  td: TableCell,
  hr: Divider,
  AppLink,
};

export default components;

export { H2, H3, H4, H5, H6, Paragraph, Link, Ul, Ol, Li, Table, TableRow, TableCell, Divider, AppLink };
