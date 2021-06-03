import * as React from 'react';
import Layout from '../layout';
import { H2, Paragraph } from '../utils/muiComponents';

function NotFoundPage(): JSX.Element {
  return (
    <Layout title="404 Not Found">
      <H2>NOT FOUND</H2>
      <Paragraph>You just hit a route that doesn&#39;t exist... the sadness.</Paragraph>
    </Layout>
  );
}

export default NotFoundPage;
