import { keepPreviousData, useQueries } from "@tanstack/react-query";
import { buildQueryOptions } from "../factories/queryFactory";
import { buildQueryString } from "../factories/queryUtils";
import { useShowSnackbar } from "../../components/layout/useShowSnackbar";
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
  configs: MultipleStatsConfig<PlayersStatsDetailParams>[],
) {
  const showError = useShowSnackbar();

  const results = useQueries({
    queries: configs.map((config) => {
      const queryString = buildQueryString(config.params);
      const url = `/api/players-stats/detail${
        queryString ? `?${queryString}` : ""
      }`;
      return buildQueryOptions<TPaginatedResponse<TPlayerStatDetail>>(
        ["playersStatsDetail", config.params],
        url,
        undefined,
        { placeholderData: keepPreviousData },
        showError,
      );
    }),
  });

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
  configs: MultipleStatsConfig<PlayersStatsTotalParams>[],
) {
  const showError = useShowSnackbar();

  const results = useQueries({
    queries: configs.map((config) => {
      const queryString = buildQueryString(config.params);
      const url = `/api/players-stats/total${
        queryString ? `?${queryString}` : ""
      }`;
      return buildQueryOptions<TPaginatedResponse<TPlayerStatTotal>>(
        ["playersStatsTotal", config.params],
        url,
        undefined,
        { placeholderData: keepPreviousData },
        showError,
      );
    }),
  });

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
