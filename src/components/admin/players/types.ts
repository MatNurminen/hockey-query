export interface FormValues {
  first_name: string;
  last_name: string;
  jersey_number: number;
  player_position: string;
  player_order: number;
  birth_year: number;
  height: number | undefined;
  weight: number | undefined;
  start_year: number;
  end_year: number | null;
  nation_id: number;
  draft_team_id: number | null | undefined;
}
