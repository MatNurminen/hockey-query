import { getStandings } from './queries';
import { StandingsParams, TStandings } from './types';

export interface StandingsConfig {
  id: number;
  name: string;
  params: StandingsParams;
}

export interface StandingsResult {
  id: number;
  name: string;
  list: TStandings[];
}

export function useMultipleStandings(configs: StandingsConfig[]) {
  const results = configs.map((config) => getStandings(config.params));

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.error);
  const data: StandingsResult[] = results.map((r, i) => ({
    id: configs[i].id,
    name: configs[i].name,
    list: r.data ?? [],
  }));

  return {
    isLoading,
    isError,
    data,
  };
}
