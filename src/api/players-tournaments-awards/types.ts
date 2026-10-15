export type TPlayersTournamentsAwardDto = {
    id: number;
    players_tournament_id: number;
    award_id: number;
}

export type TCreatePlayersTournamentsAwardDto = {
  players_tournament_id: number;
  award_id: number;
};
