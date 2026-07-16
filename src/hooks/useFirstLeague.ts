import { getLeaguesCurLogo } from "../api/leagues/queries";

export const useFirstLeague = () => {
  const { data: leagues, isLoading } = getLeaguesCurLogo();
  const firstLeagueId = leagues?.[0]?.id ?? 0;
  return { firstLeagueId, isLoading };
};
