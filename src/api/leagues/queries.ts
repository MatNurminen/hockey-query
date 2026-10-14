import { createQuery } from "../factories/queryFactory";
import { TLeagueByNationDto, TLeagueDto } from "./types";

export const getLeaguesCurLogo = () => {
  return createQuery<TLeagueDto[]>(["leaguesLogo"], "/api/leagues/logo");
};

export const getLeague = (id: number, enabled = true) => {
  return createQuery<TLeagueDto>(["league", id], `/api/leagues/${id}`, undefined, {
    enabled,
  });
};

export const getLeaguesByNation = (nationId: number) => {
  return createQuery<TLeagueByNationDto[]>(
    ["leaguesByNation", nationId],
    `/api/leagues/nation?nationId=${nationId}`,
  );
};
