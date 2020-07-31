/* eslint-disable import/prefer-default-export, react/prop-types */

import React from 'react';
import TopLayout from './components/TopLayout';

export const wrapRootElement = ({ element }, pluginOptions) => {
  return (
    <TopLayout siteId={pluginOptions.siteId || 'palette'} storedItem={null}>
      {element}
    </TopLayout>
  );
};
