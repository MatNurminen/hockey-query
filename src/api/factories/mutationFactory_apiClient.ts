// mutationFactory.ts
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import axios from 'axios';

// Создаем экземпляр axios с базовым URL
const apiClient = axios.create({
  baseURL: 'http://localhost:3002', // Укажите URL вашего NestJS-сервера
});

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
        console.log('Full URL:', apiClient.defaults.baseURL + resolvedUrl); // Логируем полный URL

        const bodyData = options?.transformBody
          ? options.transformBody(variables)
          : ['GET', 'DELETE'].includes(method)
          ? undefined
          : variables;

        const { data } = await apiClient.request<TData>({
          // Используем apiClient вместо axios
          url: resolvedUrl,
          method,
          data: bodyData,
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
