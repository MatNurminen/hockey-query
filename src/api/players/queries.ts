import { UseQueryResult } from '@tanstack/react-query';
import { createQuery } from '../factories/queryFactory';
import {
  DraftDetailParams,
  TDraftDetail,
  TDraftNation,
  TDraftTeam,
  TFreeAgentDto,
  TPlayerDto,
} from './types';
import { buildQueryString } from '../factories/queryUtils';

export const getPlayers = (filter?: string, enabled = true) => {
  const trimmedFilter = filter?.trim();
  const url = trimmedFilter
    ? `/api/players?filter=${encodeURIComponent(trimmedFilter)}`
    : '/api/players';

  return createQuery<TPlayerDto[]>(['players', filter], url, undefined, {
    enabled,
    staleTime: 60000,
  });
};

export const getPlayer = (id: number) => {
  return createQuery<TPlayerDto>(['player', id], `/api/players/${id}`);
};

export const getPlayersCountByNation = (
  nation_id: number
): UseQueryResult<number> => {
  return createQuery(
    ['playersByNation', nation_id],
    `/api/players/nation/${nation_id}`
  );
};

export const getFreeAgents = (seasonId: number, nationId: number) => {
  return createQuery<TFreeAgentDto[]>(
    ['freeAgents', seasonId, nationId],
    `/api/players/free-agents?seasonId=${seasonId}&nationId=${nationId}`
  );
};

export const getDraftNations = () => {
  return createQuery<TDraftNation[]>(
    ['draftNations'],
    '/api/players/draft/nations'
  );
};

export const getDraftTeams = () => {
  return createQuery<TDraftTeam[]>(['draftTeams'], '/api/players/draft/teams');
};

export const getDraftDetails = (params: DraftDetailParams) => {
  const queryString = buildQueryString(params);
  const url = `/api/players/draft/details${
    queryString ? `?${queryString}` : ''
  }`;

  return createQuery<TDraftDetail[], TDraftDetail[]>(
    ['draftDetails', params],
    url
  );
};
