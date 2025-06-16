import axios from 'axios';
import { useShowSnackbar } from '../../components/layout/useShowSnackbar';
import { createMutation } from '../factories/mutationFactory';
import queryClient from '../queryClient';
import {
  TCreateTeamTournamentDto,
  TTeamByTournamentDto,
  TTeamTournamentDto,
} from './types';

export function useAddTeamTournament(tournamentId: number) {
  const showSnackbar = useShowSnackbar();
  const queryKey = ['teamsByTournament', tournamentId];

  return createMutation<
    TTeamByTournamentDto,
    TCreateTeamTournamentDto,
    { previousData?: TTeamByTournamentDto[]; hasShownError?: boolean }
  >(() => '/api/teams-tournaments', 'POST', {
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKey });
      const previousData =
        queryClient.getQueryData<TTeamByTournamentDto[]>(queryKey);

      return { previousData, hasShownError: false };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['teamsByTournament'],
        (oldTournaments: TTeamByTournamentDto[] | undefined) => {
          const updatedTournaments = oldTournaments
            ? [...oldTournaments, data]
            : [data];
          return updatedTournaments;
        }
      );
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
    onError: (
      err,
      _player,
      context?: {
        previousData?: TTeamByTournamentDto[];
        hasShownError?: boolean;
      }
    ) => {
      if (context?.previousData) {
        queryClient.setQueryData(['teamsByTournament'], context.previousData);
      }
      if (!context?.hasShownError) {
        if (axios.isAxiosError(err) && err.response?.data?.message) {
          showSnackbar(err.response.data.message, 'error');
        } else {
          showSnackbar('Failed to add team into tournament', 'error');
        }
        if (context) {
          context.hasShownError = true;
        }
      }
    },
  });
}

export function useUpdateTeamTournament() {
  const showSnackbar = useShowSnackbar();

  return createMutation<
    TTeamTournamentDto,
    TCreateTeamTournamentDto & { id: number },
    { previousData?: TTeamTournamentDto[]; hasShownError?: boolean }
  >(({ id }) => `/api/teams-tournaments/${id}`, 'PATCH', {
    transformBody: (variables: TCreateTeamTournamentDto & { id: number }) => {
      const { id, ...bodyData } = variables;
      return bodyData;
    },
    onSuccess: () => {
      showSnackbar('Team Tournament updated successfully', 'success');
    },
    onError: (
      err,
      _playerTournament,
      context?: {
        previousData?: TTeamTournamentDto[];
        hasShownError?: boolean;
      }
    ) => {
      if (!context?.hasShownError) {
        if (axios.isAxiosError(err) && err.response?.data?.message) {
          showSnackbar(err.response.data.message, 'error');
        } else {
          showSnackbar('Failed to update team tournament', 'error');
        }
        if (context) {
          context.hasShownError = true;
        }
      }
    },
  });
}

export function useDeleteTeamTournament(tournamentId: number) {
  const showSnackbar = useShowSnackbar();
  const queryKey = ['teamsByTournament', tournamentId];

  return createMutation<
    void,
    { id: number },
    { previousData?: TTeamByTournamentDto[]; hasShownError?: boolean }
  >(({ id }) => `/api/teams-tournaments/${id}`, 'DELETE', {
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: queryKey });
      const previousData =
        queryClient.getQueryData<TTeamByTournamentDto[]>(queryKey);

      queryClient.setQueryData(
        queryKey,
        (oldTeams: TTeamByTournamentDto[] | undefined) =>
          oldTeams ? oldTeams.filter((team) => team.id !== id) : []
      );
      return { previousData, hasShownError: false };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
    onError: (
      err,
      _id,
      context?: {
        previousData?: TTeamByTournamentDto[];
        hasShownError?: boolean;
      }
    ) => {
      if (context?.previousData) {
        queryClient.setQueryData(['teamsByTournament'], context.previousData);
      }
      if (!context?.hasShownError) {
        if (axios.isAxiosError(err) && err.response?.data?.message) {
          showSnackbar(err.response.data.message, 'error');
        } else {
          showSnackbar('Failed to delete team', 'error');
        }
        if (context) {
          context.hasShownError = true;
        }
      }
    },
  });
}
