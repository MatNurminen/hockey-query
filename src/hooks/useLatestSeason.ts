import { getSeasons } from "../api/seasons/queries";

export const useLatestSeason = () => {
  const { data: seasons } = getSeasons();
  return seasons?.reduce((max, s) => Math.max(max, s.id), 0) ?? 0;
};
