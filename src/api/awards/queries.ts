import { createQuery } from "../factories/queryFactory";
import { AwardStatsDetails, AwardStatsTotals, TAwardDto } from "./types";

export const getAwardsByLeague = (leagueId: number) => {
  return createQuery<TAwardDto[]>(
    ["awardsByLeague", leagueId],
    `/api/awards/league/${leagueId}`,
  );
};

export const getAwardsPlayersDetails = (leagueId: number, awardId: number) => {
  return createQuery<AwardStatsDetails[]>(
    ["awardsPlayersDetails", leagueId, awardId],
    `/api/awards/detail?leagueId=${leagueId}&awardId=${awardId}`,
  );
};

export const getAwardsPlayersTotals = (leagueId: number, awardId: number) => {
  return createQuery<AwardStatsTotals[]>(
    ["awardsPlayersTotals", leagueId, awardId],
    `/api/awards/total?leagueId=${leagueId}&awardId=${awardId}`,
  );
};
