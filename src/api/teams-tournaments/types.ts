export type TTeamTournamentDto = {
  id: number;
  tournament_id: number;
  team_id: number;
  games?: number;
  wins?: number;
  ties?: number;
  losts?: number;
  goals_for?: number;
  goals_against?: number;
  postseason?: string;
};

export type TCreateTeamTournamentDto = {
  tournament_id: number;
  team_id: number;
  games?: number;
  wins?: number;
  ties?: number;
  losts?: number;
  goals_for?: number;
  goals_against?: number;
  postseason?: string;
};

export type TTeamByTournamentDto = {
  id: number;
  team_id: number;
  full_name: string;
  flag: string;
  league_id: number;
  league_name: string;
  season_id: number;
  season_name: string;
};
