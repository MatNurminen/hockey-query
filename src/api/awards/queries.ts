import { keepPreviousData } from "@tanstack/react-query";
import { createQuery } from "../factories/queryFactory";
import { buildQueryString } from "../factories/queryUtils";
import {
  AwardStatsDetails,
  AwardStatsTotals,
  TAwardDto,
  TAwardsStatsParams,
  TPaginatedResponse,
} from "./types";

export const getAwardsByLeague = (leagueId: number) => {
  return createQuery<TAwardDto[]>(
    ["awardsByLeague", leagueId],
    `/api/awards/league/${leagueId}`,
  );
};

export const getAwardsPlayersDetails = (
  params: TAwardsStatsParams,
  options?: { enabled?: boolean },
) => {
  const queryString = buildQueryString(params);

  return createQuery<
    TPaginatedResponse<AwardStatsDetails>,
    TPaginatedResponse<AwardStatsDetails>
  >(
    ["awardsPlayersDetails", params],
    `/api/awards/detail?${queryString}`,
    undefined,
    { placeholderData: keepPreviousData, ...options },
  );
};

export const getAwardsPlayersTotals = (
  params: TAwardsStatsParams,
  options?: { enabled?: boolean },
) => {
  const queryString = buildQueryString(params);

  return createQuery<
    TPaginatedResponse<AwardStatsTotals>,
    TPaginatedResponse<AwardStatsTotals>
  >(
    ["awardsPlayersTotals", params],
    `/api/awards/total?${queryString}`,
    undefined,
    { placeholderData: keepPreviousData, ...options },
  );
};
