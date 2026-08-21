import { keepPreviousData } from "@tanstack/react-query";
import { createQuery } from "../factories/queryFactory";
import { buildQueryString } from "../factories/queryUtils";
import {
  StandingsParams,
  TeamsForNationParams,
  TStandings,
  TTeamChampions,
  TTeamFact,
  TTeamsForNation,
} from "./types";

export const getStandings = (params: StandingsParams) => {
  const queryString = buildQueryString(params);
  const url = `/api/teams-stats/standings${
    queryString ? `?${queryString}` : ""
  }`;

  return createQuery<TStandings[]>(["standings", params], url);
};

export const getTeamsForNation = (params: TeamsForNationParams) => {
  const queryString = buildQueryString(params);
  const url = `/api/teams-stats/teams${queryString ? `?${queryString}` : ""}`;

  return createQuery<TTeamsForNation[]>(["teamsForNation", params], url);
};

export const getTeamFacts = (leagueId: number, seasonId: number) => {
  return createQuery<TTeamFact[]>(
    ["teamfacts", leagueId, seasonId],
    `/api/teams-stats/facts?leagueId=${leagueId}&seasonId=${seasonId}`,
    undefined,
    { placeholderData: keepPreviousData },
  );
};

export const getTeamChampions = (leagueId: number) => {
  return createQuery<TTeamChampions[]>(
    ["champions", leagueId],
    `/api/teams-stats/champions?leagueId=${leagueId}`,
    undefined,
    { placeholderData: keepPreviousData },
  );
};
