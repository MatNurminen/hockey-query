export type TNationDto = {
  id: number;
  name: string;
  short_name: string;
  flag: string;
  logo?: string;
  color?: string;
};

export type TCreateNationDto = {
  name: string;
  short_name: string;
  flag: string;
  logo?: string;
  color?: string | null;
};
