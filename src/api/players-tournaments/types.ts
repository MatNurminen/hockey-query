export type TPlayerTournamentDto = {
  id: number;
  teams_tournament_id: number;
  player_id: number;
  games?: number;
  goals?: number;
  postseason?: string;
};

export type TCreatePlayerTournamentDto = {
  teams_tournament_id: number;
  player_id: number;
  games?: number;
  goals?: number;
  postseason?: string;
};
