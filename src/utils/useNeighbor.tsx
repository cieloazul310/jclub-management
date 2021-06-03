import { SitePageContextNext, SitePageContextPrevious } from '../../graphql-types';

function useNeighbor(neighbor: SitePageContextNext | SitePageContextPrevious | undefined | null): {
  to: string;
  title: string;
} | null {
  if (!neighbor) return null;
  const mode = neighbor.slug ? 'club' : 'year';
  return {
    to: mode === 'club' ? `/club/${neighbor.slug}` : `/year/${neighbor.year}`,
    title: mode === 'club' ? neighbor.name ?? 'クラブ' : `${neighbor.year}年`,
  };
}

export default useNeighbor;
