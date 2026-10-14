import { createQuery } from "../factories/queryFactory";
import { TAwardDto } from "./types";

export const getAwardsByLeague = (leagueId: number) => {
  return createQuery<TAwardDto[]>(
    ["awardsByLeague", leagueId],
    `/api/awards/league/${leagueId}`,
  );
};
