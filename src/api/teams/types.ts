import { TNationDto } from '../nations/types';
import { TCreateTeamLogoDto, TTeamLogoDto } from '../team-logos/types';

export type TTeamDto = {
  id: number;
  nation_id: number;
  full_name: string;
  name: string;
  short_name: string;
  start_year: number;
  end_year: number;
  season: string;
  logos: TTeamLogoDto[];
  nation: TNationDto;
};

export type TTeamsByLeague = {
  id: number;
  nation_id: number;
  full_name: string;
  flag: string;
  logo: string;
};

export type TCreateTeamDto = {
  nation_id: number;
  full_name: string;
  name: string;
  short_name: string;
  start_year: number;
  end_year?: number | null;
  logos?: TCreateTeamLogoDto[];
};
