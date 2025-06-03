import axios from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

type TMutationMethod = 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export function createMutation<TData, TVariables, TContext = unknown>(
  url: string | ((variables: TVariables) => string),
  method: TMutationMethod,
  options?: Omit<
    UseMutationOptions<TData, Error, TVariables, TContext>,
    'mutationFn'
  > & {
    transformBody?: (variables: TVariables) => any;
  }
) {
  return useMutation<TData, Error, TVariables, TContext>({
    mutationFn: async (variables: TVariables) => {
      try {
        const resolvedUrl = typeof url === 'function' ? url(variables) : url;
        const bodyData = options?.transformBody
          ? options.transformBody(variables)
          : ['GET', 'DELETE'].includes(method)
          ? undefined
          : variables;

        const { data } = await axios.request<TData>({
          url: resolvedUrl,
          method,
          data: bodyData,
          //timeout: 15000,
        });
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.response?.data || error.message);
        } else {
          console.error('Unexpected error:', error);
        }
        throw error;
      }
    },
    ...options,
  });
}
