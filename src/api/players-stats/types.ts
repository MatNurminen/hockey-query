export type TPaginatedResponse<T> = {
  data: T[];
  total: number;
  limit: number;
  offset: number;
};

export type TPlayerStatTotal = {
  player_id: number;
  first_name: string;
  last_name: string;
  player_position: string;
  player_order: number;
  player_flag: string;
  nation_id: number;
  player_nation: string;
  games_t: number;
  goals_t: number;
  years: number;
};

export type PlayersStatsTotalParams = {
  leagueId?: number;
  teamId?: number;
  nationId?: number;
  playerOrd?: number[];
  limit?: number;
  offset?: number;
};

export type TPlayerStatByClub = TPlayerStatTotal & {
  team_id: number;
  full_name: string;
};

export type TPlayerStatDetail = {
  id: number;
  teams_tournament_id: number;
  player_id: number;
  games: number;
  goals: number;
  postseason: string;
  first_name: string;
  last_name: string;
  jersey_number: number;
  player_position: string;
  player_order: number;
  nation_id: number;
  birth_year: number;
  height: number;
  weight: number;
  draft_team_id: number;
  start_year: number;
  end_year: number;
  season_id: number;
  league_id: number;
  team_id: number;
  full_name: string;
  short_name: string;
  name: string;
  player_flag: string;
  player_nation: string;
  team_flag: string;
  type_id: number;
};

export type PlayersStatsDetailParams = {
  leagueId?: number[];
  excludeLeagueId?: number[];
  teamId?: number;
  nationId?: number;
  seasonId?: number;
  playerId?: number;
  typeId?: number;
  playerOrd?: number[];
  limit?: number;
  offset?: number;
};

export type TCountPlayerByNation = {
  id: number;
  name: string;
  flag: string;
  color: string;
  count: number;
};

export type CountPlayerByNationParams = {
  leagueId?: number;
  teamId?: number;
  seasonId?: number;
  typeId?: number;
};

export type TPlayerStatLeague = {
  league_id: number;
  short_name: string;
  logo: string;
  games_t: number;
  goals_t: number;
  start_year: number;
  end_year: number;
  years: number;
};

export type TPlayerStatTeam = {
  team_id: number;
  full_name: string;
  flag: string;
  games_t: number;
  goals_t: number;
  start_year: number;
  end_year: number;
  years: number;
  nation_id: number;
  player_nation: string;
};
