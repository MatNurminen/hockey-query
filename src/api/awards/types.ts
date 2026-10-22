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
  fist_name: string;
  last_name: string;
  birth_year: number;
  player_position: string;
}

export interface AwardStatsDetails extends AwardStats {
  total_awards: number;
  first_award_year: number;
  last_award_year: number;
}

export interface AwardStatsTotals extends AwardStats {
  awards: number;
}
