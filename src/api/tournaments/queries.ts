import { createQuery } from '../factories/queryFactory';
import { TTournamentDto, TTournamentByLeagueDto } from './types';

export const getTournaments = () => {
  return createQuery<TTournamentDto[]>(['tournaments'], '/api/tournaments');
};

export const getTournament = (id: number) => {
  return createQuery<TTournamentDto>(
    ['tournament', id],
    `/api/tournaments/${id}`
  );
};

export const getTournamentsByLeague = (leagueId: number) => {
  return createQuery<TTournamentByLeagueDto[]>(
    ['tournamentsByLeague', leagueId],
    `/api/tournaments/league?leagueId=${leagueId}`
  );
};
