import { UseQueryResult } from '@tanstack/react-query';
import { createQuery } from '../factories/queryFactory';
import { TTeamDto, TTeamsByLeague } from './types';

export const getTeams = (filter?: string, enabled = true) => {
  const trimmedFilter = filter?.trim();
  const url = trimmedFilter
    ? `/api/teams?filter=${encodeURIComponent(trimmedFilter)}`
    : '/api/teams';

  return createQuery<TTeamDto[]>(['teams', filter], url, undefined, {
    enabled,
    staleTime: 60000,
  });
};

export const getTeam = (id: number) => {
  return createQuery<TTeamDto>(['team', id], `/api/teams/${id}`);
};

export const getTeamsByLeague = (leagueId: number) => {
  return createQuery<TTeamsByLeague[]>(
    ['teamsByLeague', leagueId],
    `/api/teams/league?leagueId=${leagueId}`
  );
};

export const getTeamsCountByNation = (
  nation_id: number
): UseQueryResult<number> => {
  return createQuery(
    ['teamsByNation', nation_id],
    `/api/teams/nation/${nation_id}`
  );
};
