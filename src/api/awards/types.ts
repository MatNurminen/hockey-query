export type TAwardDto = {
  id: number;
  league_id: number;
  name: string;
};

export type TCreateAwardDto = {
  league_id: number;
  name: string;
};

interface AwardStats {
  id: number;
  name: string;
  player_id: number;
  fist_name: string;
  last_name: string;
  birth_year: number;
  player_position: string;
  flag: string;
}

export interface AwardStatsDetails extends AwardStats {
  full_name: string;
  team_id: number;
}

export interface AwardStatsTotals extends AwardStats {
  awards: number;
}
