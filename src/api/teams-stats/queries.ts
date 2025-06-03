import { createPrefetchQuery } from '../factories/prefetchFactory';
import { createQuery } from '../factories/queryFactory';
import { buildQueryString } from '../factories/queryUtils';
import {
  StandingsParams,
  TeamsForNationParams,
  TStandings,
  TTeamFact,
  TTeamsForNation,
} from './types';

export const getStandings = (params: StandingsParams) => {
  const queryString = buildQueryString(params);
  const url = `/api/teams-stats/standings${
    queryString ? `?${queryString}` : ''
  }`;

  return createQuery<TStandings[], TStandings[]>(['standings', params], url);
};

// export const getPrefetchStandings = (params: StandingsParams) => {
//   const queryString = buildQueryString(params);
//   const url = `/api/teams-stats/standings${
//     queryString ? `?${queryString}` : ''
//   }`;

//   return createQuery<TStandings[], TStandings[]>(['standings', params], url);
// };
export const getPrefetchStandings = (leagueId: number, seasonId: number) => {
  createPrefetchQuery<TStandings[]>(
    ['standings', leagueId, seasonId],
    `/api/teams-stats/standings?leagueId=${leagueId}&seasonId=${seasonId}`
  );
};

export const getTeamsForNation = (params: TeamsForNationParams) => {
  const queryString = buildQueryString(params);
  const url = `/api/teams-stats/teams${queryString ? `?${queryString}` : ''}`;

  return createQuery<TTeamsForNation[], TTeamsForNation[]>(
    ['teamsForNation', params],
    url
  );
};

export const getTeamFacts = (leagueId: number, seasonId: number) => {
  return createQuery<TTeamFact[]>(
    ['teamfacts', leagueId, seasonId],
    `/api/teams-stats/facts?leagueId=${leagueId}&seasonId=${seasonId}`
  );
};
