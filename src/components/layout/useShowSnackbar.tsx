import { useSnackbar } from 'notistack';

export function useShowSnackbar() {
  const { enqueueSnackbar } = useSnackbar();

  return (
    message: string,
    variant: 'success' | 'error' | 'warning' | 'info'
  ) => {
    enqueueSnackbar(message, { variant });
  };
}
