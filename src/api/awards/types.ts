export type TAwardDto = {
  id: number;
  league_id: number;
  name: string;
};

export type TCreateAwardDto = {
  league_id: number;
  name: string;
};

export type TPaginatedResponse<T> = {
  data: T[];
  total: number;
  limit: number;
  offset: number;
};

export type TAwardsStatsParams = {
  leagueId: number;
  awardId: number;
  limit?: number;
  offset?: number;
};

interface AwardStats {
  id: number;
  name: string;
  player_id: number;
  first_name: string;
  last_name: string;
  birth_year: number;
  player_position: string;
  flag: string;
}

export interface AwardStatsDetails extends AwardStats {
  season_id: number;
  full_name: string;
  team_id: number;
}

export interface AwardStatsTotals extends AwardStats {
  awards: number;
}
