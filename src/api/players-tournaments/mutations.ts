import axios from 'axios';
import { useShowSnackbar } from '../../components/layout/useShowSnackbar';
import { createMutation } from '../factories/mutationFactory';
import { TPaginatedResponse, TPlayerStatDetail } from '../players-stats/types';
import queryClient from '../queryClient';
import { TCreatePlayerTournamentDto, TPlayerTournamentDto } from './types';

export function useAddPlayerTournament(leagueId: number, seasonId: number) {
  const showSnackbar = useShowSnackbar();
  const queryKey = ['playersStatsDetail', { leagueId: [leagueId], seasonId }];

  return createMutation<
    TPlayerStatDetail,
    TCreatePlayerTournamentDto,
    {
      previousData?: TPaginatedResponse<TPlayerStatDetail>;
      hasShownError?: boolean;
    }
  >(() => '/api/players-tournaments', 'POST', {
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKey });
      const previousData =
        queryClient.getQueryData<
          TPaginatedResponse<TPlayerStatDetail>
        >(queryKey);

      return { previousData, hasShownError: false };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        queryKey,
        (
          oldData: TPaginatedResponse<TPlayerStatDetail> | undefined,
        ) => {
          if (!oldData) {
            return { data: [data], total: 1, limit: 0, offset: 0 };
          }
          return {
            ...oldData,
            data: [...oldData.data, data],
            total: oldData.total + 1,
          };
        },
      );
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (
      err,
      _teamsTournaments,
      context?: {
        previousData?: TPaginatedResponse<TPlayerStatDetail>;
        hasShownError?: boolean;
      }
    ) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      if (!context?.hasShownError) {
        if (axios.isAxiosError(err) && err.response?.data?.message) {
          showSnackbar(err.response.data.message, 'error');
        } else {
          showSnackbar('Failed to add player into tournament', 'error');
        }
        if (context) {
          context.hasShownError = true;
        }
      }
    },
  });
}

export function useUpdatePlayerTournament(
  leagueId?: number,
  seasonId?: number,
) {
  const showSnackbar = useShowSnackbar();
  const queryKey =
    leagueId && seasonId
      ? ['playersStatsDetail', { leagueId: [leagueId], seasonId }]
      : undefined;

  return createMutation<
    TPlayerTournamentDto,
    TCreatePlayerTournamentDto & { id: number },
    { previousData?: TPlayerTournamentDto[]; hasShownError?: boolean }
  >(({ id }) => `/api/players-tournaments/${id}`, 'PATCH', {
    transformBody: (variables: TCreatePlayerTournamentDto & { id: number }) => {
      const { id, ...bodyData } = variables;
      return bodyData;
    },
    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey });
      }
      showSnackbar('Player Tournament updated successfully', 'success');
    },
    onError: (
      err,
      _playerTournament,
      context?: {
        previousData?: TPlayerTournamentDto[];
        hasShownError?: boolean;
      }
    ) => {
      if (!context?.hasShownError) {
        if (axios.isAxiosError(err) && err.response?.data?.message) {
          showSnackbar(err.response.data.message, 'error');
        } else {
          showSnackbar('Failed to update player tournament', 'error');
        }
        if (context) {
          context.hasShownError = true;
        }
      }
    },
  });
}

export function useDeletePlayerTournament(leagueId: number, seasonId: number) {
  const showSnackbar = useShowSnackbar();
  const queryKey = ['playersStatsDetail', { leagueId: [leagueId], seasonId }];

  return createMutation<
    void,
    { id: number },
    {
      previousData?: TPaginatedResponse<TPlayerStatDetail>;
      hasShownError?: boolean;
    }
  >(({ id }) => `/api/players-tournaments/${id}`, 'DELETE', {
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData =
        queryClient.getQueryData<
          TPaginatedResponse<TPlayerStatDetail>
        >(queryKey);

      queryClient.setQueryData(
        queryKey,
        (oldData: TPaginatedResponse<TPlayerStatDetail> | undefined) => {
          if (!oldData) {
            return { data: [], total: 0, limit: 0, offset: 0 };
          }
          return {
            ...oldData,
            data: oldData.data.filter((item) => item.id !== id),
            total: oldData.total - 1,
          };
        },
      );

      return { previousData, hasShownError: false };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      showSnackbar('Player of Tournament deleted successfully', 'success');
    },

    onError: (
      err,
      _variables,
      context?: {
        previousData?: TPaginatedResponse<TPlayerStatDetail>;
        hasShownError?: boolean;
      }
    ) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }

      if (!context?.hasShownError) {
        const message =
          axios.isAxiosError(err) && err.response?.data?.message
            ? err.response.data.message
            : 'Failed to delete player of tournament';

        showSnackbar(message, 'error');
        if (context) {
          context.hasShownError = true;
        }
      }
    },
  });
}
