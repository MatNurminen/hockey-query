import { keepPreviousData } from "@tanstack/react-query";
import { createQuery } from "../factories/queryFactory";
import { buildQueryString } from "../factories/queryUtils";
import {
  CountPlayerByNationParams,
  PlayersStatsDetailParams,
  PlayersStatsTotalParams,
  TCountPlayerByNation,
  TPlayerStatByClub,
  TPlayerStatDetail,
  TPlayerStatLeague,
  TPlayerStatTeam,
  TPlayerStatTotal,
  TPaginatedResponse,
} from "./types";

export const getPlayersStatsTotal = (params: PlayersStatsTotalParams) => {
  const queryString = buildQueryString(params);
  const url = `/api/players-stats/total${queryString ? `?${queryString}` : ""}`;

  return createQuery<
    TPaginatedResponse<TPlayerStatTotal>,
    TPaginatedResponse<TPlayerStatTotal>
  >(["playersStatsTotal", params], url);
};

export const getPlayersStatsTotalByTeam = (params: PlayersStatsTotalParams) => {
  const queryString = buildQueryString(params);
  const url = `/api/players-stats/total-by-team${queryString ? `?${queryString}` : ""}`;

  return createQuery<
    TPaginatedResponse<TPlayerStatByClub>,
    TPaginatedResponse<TPlayerStatByClub>
  >(["playersStatsTotalByTeam", params], url);
};

export const getPlayersStatsDetail = (params: PlayersStatsDetailParams) => {
  const queryString = buildQueryString(params);
  const url = `/api/players-stats/detail${
    queryString ? `?${queryString}` : ""
  }`;

  return createQuery<
    TPaginatedResponse<TPlayerStatDetail>,
    TPaginatedResponse<TPlayerStatDetail>
  >(["playersStatsDetail", params], url, undefined, {
    placeholderData: keepPreviousData,
  });
};

export const getCountPlayersByNation = (params: CountPlayerByNationParams) => {
  const queryString = buildQueryString(params);
  const url = `/api/players-stats/count-by-nation${
    queryString ? `?${queryString}` : ""
  }`;

  return createQuery<TCountPlayerByNation[], TCountPlayerByNation[]>(
    ["countPlayersByNation", params],
    url,
  );
};

export const getPlayersStatsLeagues = (playerId: number) => {
  return createQuery<TPlayerStatLeague[]>(
    ["playersStatsLeagues", playerId],
    `/api/players-stats/league?playerId=${playerId}`,
  );
};

export const getPlayersStatsTeams = (playerId: number) => {
  return createQuery<TPlayerStatTeam[]>(
    ["playersStatsTeams", playerId],
    `/api/players-stats/team?playerId=${playerId}`,
  );
};
