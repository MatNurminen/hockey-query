import axios from 'axios';
import { QueryKey, UseQueryOptions } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import queryClient from '../queryClient';
//const useClient = useQueryClient();

export function createPrefetchQuery<T, R = T>(
  key: QueryKey,
  url: string,
  transformFn?: (data: T) => R,
  options?: Omit<UseQueryOptions<R, Error, R, QueryKey>, 'queryKey' | 'queryFn'>
) {
  const { enqueueSnackbar } = useSnackbar();
  const showErrorSnackbar = (message: string) => {
    enqueueSnackbar(message, { variant: 'error' });
  };

  return queryClient.prefetchQuery({
    //return useClient.prefetchQuery({
    queryKey: key,
    queryFn: async () => {
      try {
        const { data } = await axios.get<T>(url);
        return transformFn ? transformFn(data) : (data as unknown as R);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.response?.data || error.message);
          showErrorSnackbar('Network error: ' + error.message);
        } else {
          console.error('Unexpected error:', error);
          showErrorSnackbar('Unexpected error: ' + error);
        }
        throw error;
      }
    },
    ...options,
  });
}
