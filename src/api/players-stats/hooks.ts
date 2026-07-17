import { UseQueryResult } from "@tanstack/react-query";
import { getPlayersStatsDetail, getPlayersStatsTotal } from "./queries";
import type {
  PlayersStatsDetailParams,
  PlayersStatsTotalParams,
  TPaginatedResponse,
  TPlayerStatDetail,
  TPlayerStatTotal,
} from "./types";

export type MultipleStatsConfig<T> = {
  id: number;
  name: string;
  params: T;
};

export function useMultiplePlayersStatsDetail(
  configs: {
    id: number;
    name: string;
    params: PlayersStatsDetailParams;
  }[],
) {
  const results: UseQueryResult<
    TPaginatedResponse<TPlayerStatDetail>,
    Error
  >[] = configs.map((config) => getPlayersStatsDetail(config.params));

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.error);
  const data = results.map((r, i) => ({
    id: configs[i].id,
    name: configs[i].name,
    list: r.data?.data ?? [],
    total: r.data?.total ?? 0,
    limit: r.data?.limit ?? 0,
    offset: r.data?.offset ?? 0,
  }));

  return {
    isLoading,
    isError,
    data,
  };
}

export function useMultiplePlayersStatsTotal(
  configs: {
    id: number;
    name: string;
    params: PlayersStatsTotalParams;
  }[],
) {
  const results: UseQueryResult<TPaginatedResponse<TPlayerStatTotal>, Error>[] =
    configs.map((config) => getPlayersStatsTotal(config.params));

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.error);
  const data = results.map((r, i) => ({
    id: configs[i].id,
    name: configs[i].name,
    list: r.data?.data ?? [],
    total: r.data?.total ?? 0,
    limit: r.data?.limit ?? 0,
    offset: r.data?.offset ?? 0,
  }));

  return {
    isLoading,
    isError,
    data,
  };
}
