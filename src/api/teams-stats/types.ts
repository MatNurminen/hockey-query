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
  gd: number;
  pts: number;
  full_name: string;
  season_id: number;
  name: string;
  season: string;
  logo: string;
  postseason: { title: string } | null;
};

export type StandingsParams = {
  seasonId?: number;
  leagueId?: number[];
  teamId?: number;
  typeId?: number;
};

export type TTeamsForNation = {
  season_id: number;
  short_name: string;
  postseason: { title: string } | null;
  league_id: number;
  team_id: number;
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

export type TTeamChampions = {
  season_id: number;
  team_id: number;
  full_name: string;
  postseason: { title: string } | null;
};
