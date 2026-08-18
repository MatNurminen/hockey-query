import { TCreateLeagueLogoDto, TLeagueLogoDto } from "../league-logos/types";

type Links = {
  home: string;
  stats: string;
  elite: string;
};

export type TLeagueDto = {
  id: number;
  name: string;
  short_name: string;
  color?: string;
  start_year: number;
  end_year?: number;
  type_id: number;
  links?: Links | null;
  logos: TLeagueLogoDto[];
};

export type TCreateLeagueDto = {
  name: string;
  short_name: string;
  color?: string | null;
  start_year: number;
  end_year?: number | null;
  type_id: number;
  links?: Links | null;
  logos?: TCreateLeagueLogoDto[];
};

export type TLeagueByNationDto = {
  id: number;
  short_name: string;
  flag: string;
};
