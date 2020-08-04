import * as React from 'react';
import rehypeReact from 'rehype-react';
import muiComponents from './muiComponents';

export const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: muiComponents,
}).Compiler;
