import React from 'react';
import TopLayout from './components/TopLayout';

export const wrapRootElement = ({ element }, pluginOptions) => {
  const { siteId = 'palette' } = pluginOptions;
  const storedItem = JSON.parse(localStorage.getItem(siteId));
  return (
    <TopLayout siteId={siteId} storedItem={storedItem}>
      {element}
    </TopLayout>
  );
};
