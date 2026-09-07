import { createQuery } from "../factories/queryFactory";
import type { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { TNationDto } from "./types";

type NationQueryOptions = Omit<
  UseQueryOptions<TNationDto, Error, TNationDto, QueryKey>,
  "queryKey" | "queryFn"
>;

export const getNations = () => {
  return createQuery<TNationDto[]>(["nations"], "/api/nations");
};

export const getNation = (id: number, options?: NationQueryOptions) => {
  return createQuery<TNationDto>(
    ["nation", id],
    `/api/nations/${id}`,
    undefined,
    options,
  );
};