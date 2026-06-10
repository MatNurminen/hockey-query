import { getSeasons } from "../api/seasons/queries";

export const useLatestSeason = () => {
  const { data: seasons, isLoading } = getSeasons();
  const startYear = seasons?.reduce((max, s) => Math.max(max, s.id), 0) ?? 0;
  return { startYear, isLoading };
};
