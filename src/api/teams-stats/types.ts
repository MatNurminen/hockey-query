export type TStandings = {
  id: number;
  tournament_id: number;
  team_id: number;
  games: number;
  wins: number;
  ties: number;
  losts: number;
  goals_for: number;
  goals_against: number;
  postseason: string;
  gd: number;
  pts: number;
  full_name: string;
  season_id: number;
  name: string;
  season: string;
  logo: string;
};

export type StandingsParams = {
  seasonId?: number;
  leagueId?: number[];
  teamId?: number;
  typeId?: boolean;
};

export type TTeamsForNation = {
  season_id: number;
  short_name: string;
  postseason: string;
};

export type TeamsForNationParams = {
  nationId?: number;
  shortName?: string;
  typeId?: number;
  limit?: number;
};

export type TTeamFact = {
  team_id: number;
  full_name: string;
  plrs: number;
  avheight: number;
  avweight: number;
  avage: number;
  logo: string;
};
