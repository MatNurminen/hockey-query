import { useCallback } from "react";
import { useSnackbar } from "notistack";

export function useShowSnackbar() {
  const { enqueueSnackbar } = useSnackbar();

  return useCallback(
    (message: string, variant: "success" | "error" | "warning" | "info") => {
      enqueueSnackbar(message, { variant });
    },
    [enqueueSnackbar],
  );
}
