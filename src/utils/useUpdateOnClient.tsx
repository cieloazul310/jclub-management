import * as React from 'react';

/**
 * usage:
 * <div key={isClient}>
 */

export default function useUpdateOnClient() {
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  return `${isClient}`;
}
