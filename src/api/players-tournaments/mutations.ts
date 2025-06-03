import axios from 'axios';
import { useShowSnackbar } from '../../components/layout/useShowSnackbar';
import { createMutation } from '../factories/mutationFactory';
import { TPlayerStatDetail } from '../players-stats/types';
import queryClient from '../queryClient';
import { TCreatePlayerTournamentDto } from './types';

export function useAddPlayerTournament(leagueId: number, seasonId: number) {
  const showSnackbar = useShowSnackbar();
  const queryKey = ['playersStatsDetail', { leagueId: [leagueId], seasonId }];

  return createMutation<
    TPlayerStatDetail,
    TCreatePlayerTournamentDto,
    { previousData?: TPlayerStatDetail[]; hasShownError?: boolean }
  >(() => '/api/players-tournaments', 'POST', {
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKey });
      const previousData =
        queryClient.getQueryData<TPlayerStatDetail[]>(queryKey);

      return { previousData, hasShownError: false };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['playersStatsDetail'],
        (oldTeamsTournaments: TPlayerStatDetail[] | undefined) => {
          const updatedTeamsTournaments = oldTeamsTournaments
            ? [...oldTeamsTournaments, data]
            : [data];
          return updatedTeamsTournaments;
        }
      );
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
    onError: (
      err,
      _teamsTournaments,
      context?: {
        previousData?: TPlayerStatDetail[];
        hasShownError?: boolean;
      }
    ) => {
      if (context?.previousData) {
        queryClient.setQueryData(['playersStatsDetail'], context.previousData);
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

export function useDeletePlayerTournament(leagueId: number, seasonId: number) {
  const showSnackbar = useShowSnackbar();
  const queryKey = ['playersStatsDetail', { leagueId: [leagueId], seasonId }];

  return createMutation<
    void,
    { id: number },
    { previousData?: TPlayerStatDetail[]; hasShownError?: boolean }
  >(({ id }) => `/api/players-tournaments/${id}`, 'DELETE', {
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData =
        queryClient.getQueryData<TPlayerStatDetail[]>(queryKey);

      queryClient.setQueryData(
        queryKey,
        (oldData: TPlayerStatDetail[] | undefined) =>
          oldData?.filter((item) => item.id !== id) ?? []
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
      context?: { previousData?: TPlayerStatDetail[]; hasShownError?: boolean }
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
