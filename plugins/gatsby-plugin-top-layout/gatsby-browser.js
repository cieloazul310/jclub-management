import React from 'react';
import TopLayout from './components/TopLayout';

export const wrapRootElement = ({ element }, pluginOptions) => {
  const { siteId = 'palette' } = pluginOptions;
  const storedItem = JSON.parse(localStorage.getItem(siteId));
  const isMobile = window.matchMedia('(max-width: 600px)').matches;
  return (
    <TopLayout siteId={siteId} storedItem={storedItem} isMobile={isMobile}>
      {element}
    </TopLayout>
  );
};
