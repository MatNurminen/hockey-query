import axios from 'axios';
import { useShowSnackbar } from '../../components/layout/useShowSnackbar';
import { createMutation } from '../factories/mutationFactory';
import queryClient from '../queryClient';
import { TCreatePlayerDto, TPlayerDto } from './types';

export function useAddPlayer() {
  const showSnackbar = useShowSnackbar();

  return createMutation<
    TPlayerDto,
    TCreatePlayerDto,
    { previousData?: TPlayerDto[]; hasShownError?: boolean }
  >(() => '/api/players', 'POST', {
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['players'] });
      const previousData = queryClient.getQueryData<TPlayerDto[]>(['players']);

      return { previousData, hasShownError: false };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['players'],
        (oldPlayers: TPlayerDto[] | undefined) => {
          const updatedPlayers = oldPlayers ? [...oldPlayers, data] : [data];
          return updatedPlayers;
        }
      );
    },
    onError: (
      err,
      _player,
      context?: { previousData?: TPlayerDto[]; hasShownError?: boolean }
    ) => {
      if (context?.previousData) {
        queryClient.setQueryData(['players'], context.previousData);
      }
      if (!context?.hasShownError) {
        if (axios.isAxiosError(err) && err.response?.data?.message) {
          showSnackbar(err.response.data.message, 'error');
        } else {
          showSnackbar('Failed to add player', 'error');
        }
        if (context) {
          context.hasShownError = true;
        }
      }
    },
  });
}

export function useUpdatePlayer() {
  const showSnackbar = useShowSnackbar();

  return createMutation<
    TPlayerDto,
    TCreatePlayerDto & { id: number },
    { previousData?: TPlayerDto[]; hasShownError?: boolean }
  >(({ id }) => `/api/players/${id}`, 'PATCH', {
    transformBody: (variables: TCreatePlayerDto & { id: number }) => {
      const { id, ...bodyData } = variables;
      return bodyData;
    },
    onMutate: async (updatedPlayer) => {
      await queryClient.cancelQueries({ queryKey: ['players'] });
      const previousData = queryClient.getQueryData<TPlayerDto[]>(['players']);

      queryClient.setQueryData(
        ['players'],
        (oldPlayers: TPlayerDto[] | undefined) =>
          oldPlayers
            ? oldPlayers.map((player) =>
                player.id === updatedPlayer.id
                  ? { ...player, ...updatedPlayer }
                  : player
              )
            : []
      );

      return { previousData, hasShownError: false };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['players'],
        (oldPlayers: TPlayerDto[] | undefined) => {
          const updatedPlayers = oldPlayers
            ? oldPlayers.map((player) =>
                player.id === data.id ? data : player
              )
            : [data];
          return updatedPlayers;
        }
      );

      queryClient.setQueryData(['player', data.id], data);

      showSnackbar('Player updated successfully', 'success');
    },
    onError: (
      err,
      _player,
      context?: { previousData?: TPlayerDto[]; hasShownError?: boolean }
    ) => {
      if (context?.previousData) {
        queryClient.setQueryData(['players'], context.previousData);
      }
      if (!context?.hasShownError) {
        if (axios.isAxiosError(err) && err.response?.data?.message) {
          showSnackbar(err.response.data.message, 'error');
        } else {
          showSnackbar('Failed to update player', 'error');
        }
        if (context) {
          context.hasShownError = true;
        }
      }
    },
  });
}
