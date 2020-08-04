import * as React from 'react';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import MuiLink, { LinkProps } from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import MuiTable, { TableProps } from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Divider from '@material-ui/core/Divider';
import AppLink from '../components/AppLink';

const H2 = (props: Omit<TypographyProps, 'ref'>) => <Typography variant="h2" gutterBottom {...props} />;
const H3 = (props: Omit<TypographyProps, 'ref'>) => (
  <Box pt={4} pb={2}>
    <Typography variant="h4" component="h3" gutterBottom {...props} />
  </Box>
);
const H4 = (props: Omit<TypographyProps, 'ref'>) => (
  <Box pt={2} pb={1}>
    <Typography variant="h5" component="h4" gutterBottom {...props} />
  </Box>
);
const H5 = (props: Omit<TypographyProps, 'ref'>) => (
  <Box pt={2} pb={1}>
    <Typography variant="h6" component="h5" gutterBottom {...props} />
  </Box>
);
const H6 = (props: Omit<TypographyProps, 'ref'>) => <Typography variant="h6" component="h6" gutterBottom {...props} />;
const Paragraph = (props: TypographyProps) => <Typography variant="body1" paragraph {...props} />;
const Link = (props: LinkProps) => <MuiLink color="secondary" target="_blank" rel="noopener noreferrer" {...props} />;
const Ul = (props: Omit<TypographyProps, 'ref'>) => (
  <Box py={2} m={0}>
    <Typography component="ul" {...props} />
  </Box>
);
const Ol = (props: Omit<TypographyProps, 'ref'>) => (
  <Box py={2} m={0}>
    <Typography component="ol" {...props} />
  </Box>
);
const Li = (props: Omit<TypographyProps, 'ref'>) => <Typography variant="body2" component="li" {...props} />;
const Table = (props: TableProps) => (
  <Box py={2}>
    <MuiTable {...props} />
  </Box>
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
