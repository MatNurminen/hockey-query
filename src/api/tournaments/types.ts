import { TLeagueDto } from '../leagues/types';

export type TTournamentDto = {
  id: number;
  season_id: number;
  league_id: number;
  description: string;
  league: TLeagueDto;
};

export type TTournamentByLeagueDto = {
  id: number;
  season_id: number;
  league_id: number;
  description: string;
  season: string;
  league: string;
  logo: string | null;
};

export type TCreateTournamentDto = {
  season_id: number;
  league_id: number;
  description: string;
};
