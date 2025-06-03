import axios from 'axios';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

export function createQuery<T, R = T>(
  key: QueryKey,
  url: string,
  transformFn?: (data: T) => R,
  options?: Omit<UseQueryOptions<R, Error, R, QueryKey>, 'queryKey' | 'queryFn'>
) {
  const { enqueueSnackbar } = useSnackbar();
  const showCancelSnackbar = (message: any) => {
    enqueueSnackbar(message, { variant: 'error' });
  };

  return useQuery<R>({
    queryKey: key,
    queryFn: async () => {
      try {
        const { data } = await axios.get<T>(url);
        return transformFn ? transformFn(data) : (data as unknown as R);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.response?.data || error.message);
          showCancelSnackbar('Network error ' + error.message);
        } else {
          console.error('Unexpected error:', error);
          showCancelSnackbar('Unexpected error ' + error);
        }
        throw error;
      }
    },
    ...options,
  });
}
