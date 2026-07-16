import axios from "axios";
import { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { useShowSnackbar } from "../../components/layout/useShowSnackbar";
import queryClient from "../queryClient";

export function createPrefetchQuery<T, R = T>(
  key: QueryKey,
  url: string,
  transformFn?: (data: T) => R,
  options?: Omit<
    UseQueryOptions<R, Error, R, QueryKey>,
    "queryKey" | "queryFn"
  >,
) {
  const showError = useShowSnackbar();

  return queryClient.prefetchQuery({
    queryKey: key,
    queryFn: async () => {
      try {
        const { data } = await axios.get<T>(url);
        return transformFn ? transformFn(data) : (data as unknown as R);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data || error.message);
          showError("Network error: " + error.message, "error");
        } else {
          console.error("Unexpected error:", error);
          showError("Unexpected error: " + error, "error");
        }
        throw error;
      }
    },
    ...options,
  });
}
