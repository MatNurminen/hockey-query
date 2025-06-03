import { createQuery } from '../factories/queryFactory';
import { TTeamByTournamentDto } from './types';

export const getTeamsByTournament = (tournamentId: number) => {
  return createQuery<TTeamByTournamentDto[]>(
    ['teamsByTournament', tournamentId],
    `/api/teams-tournaments/teams?tournamentId=${tournamentId}`
  );
};
