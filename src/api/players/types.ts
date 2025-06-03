import { TNationDto } from '../nations/types';
import { TTeamDto } from '../teams/types';

export type TPlayerDto = {
  id: number;
  first_name: string;
  last_name: string;
  jersey_number: number;
  player_position: string;
  player_order: number;
  birth_year: number;
  height?: number;
  weight?: number;
  start_year: number;
  end_year?: number;
  nation_id: number;
  draft_team_id?: number;
  nation: TNationDto;
  team?: TTeamDto;
};

export type TCreatePlayerDto = {
  first_name: string;
  last_name: string;
  jersey_number: number;
  player_position: string;
  player_order: number;
  birth_year: number;
  height?: number;
  weight?: number;
  start_year: number;
  end_year?: number;
  nation_id: number;
  draft_team_id?: number;
};

export type TFreeAgentDto = {
  id: number;
  first_name: string;
  last_name: string;
  jersey_number: number;
  player_position: string;
  player_order: number;
  birth_year: number;
  height: number;
  weight: number;
  start_year: number;
  end_year: number;
  nation_id: number;
  draft_team_id: number;
  flag: string;
};

export type TDraftNation = {
  id: number;
  name: string;
  flag: string;
  plrs: number;
};

export type TDraftTeam = {
  id: number;
  full_name: string;
  logo: string;
  plrs: number;
};

export type TDraftDetail = {
  league_id?: number;
  short_name?: string;
  id: number;
  player_position: string;
  first_name: string;
  last_name: string;
  draft_team_id: number;
  full_name: string;
  name: string;
  flag: string;
  games_t?: number;
  goals_t?: number;
  years_t?: number;
};

export type DraftDetailParams = {
  nationId?: number;
  teamId?: number;
};

export type PlayersQueryOptions = {
  filter?: string;
  enabled?: boolean;
};
