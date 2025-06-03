export type TTeamLogoDto = {
  id: number;
  team_id: number;
  start_year: number;
  end_year: number;
  logo: string;
};

export type TCreateTeamLogoDto = {
  id?: number;
  start_year: number;
  end_year?: number | null;
  logo: string;
};
