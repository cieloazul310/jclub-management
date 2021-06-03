/* eslint-disable */

import * as React from 'react';
import rehypeReact from 'rehype-react';
import muiComponents from './muiComponents';

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: muiComponents,
}).Compiler;

export default renderAst;
