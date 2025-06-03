export type TLeagueLogoDto = {
  id: number;
  start_year: number;
  end_year: number | null;
  logo: string;
  league_id: number;
};

export type TCreateLeagueLogoDto = {
  id?: number;
  start_year: number;
  end_year?: number | null;
  logo: string;
};
