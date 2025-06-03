import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 600000,
      gcTime: 900000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
    // mutations: {
    //   onSettled: () => {
    //     queryClient.invalidateQueries({ refetchType: 'none' });
    //   },
    // },
  },
});

export default queryClient;
