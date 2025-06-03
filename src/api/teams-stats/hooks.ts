import { getStandings } from './queries';

export function useMultipleStandings(
  configs: {
    id: number;
    name: string;
    params: any;
  }[]
) {
  const results = configs.map((config) => getStandings(config.params));

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.error);
  const data = results.map((r, i) => ({
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
