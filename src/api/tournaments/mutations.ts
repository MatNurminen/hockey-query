import axios from 'axios';
import { useShowSnackbar } from '../../components/layout/useShowSnackbar';
import { createMutation } from '../factories/mutationFactory';
import queryClient from '../queryClient';
import { TCreateTournamentDto, TTournamentByLeagueDto } from './types';

export function useAddTournament(leagueId: string | number) {
  const leagueIdStr = String(leagueId);
  const queryKey = ['tournamentsByLeague', leagueIdStr];
  const showSnackbar = useShowSnackbar();

  return createMutation<
    TTournamentByLeagueDto,
    TCreateTournamentDto,
    { previousData?: TTournamentByLeagueDto[]; hasShowError?: boolean }
  >(() => '/api/tournaments', 'POST', {
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: queryKey,
      });
      const previousData =
        queryClient.getQueryData<TTournamentByLeagueDto[]>(queryKey);

      return { previousData, hasShownError: false };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        queryKey,
        (oldTournaments: TTournamentByLeagueDto[] | undefined) => {
          const newTournament: TTournamentByLeagueDto = {
            id: data.id,
            season_id: data.season_id,
            league_id: data.league_id,
            season: `Season ${data.season_id}`,
            league: `League ${data.league_id}`,
            logo: null,
          };
          return oldTournaments
            ? [...oldTournaments, newTournament]
            : [newTournament];
        }
      );

      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
    onError: (
      err,
      _tournamentsByLeague,
      context?: {
        previousData?: TTournamentByLeagueDto[];
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
          showSnackbar('Failed to add tournament', 'error');
        }
        if (context) {
          context.hasShownError = true;
        }
      }
    },
  });
}

export function useDeleteTournament(leagueId: string) {
  const showSnackbar = useShowSnackbar();
  const queryKey = ['tournamentsByLeague', leagueId];

  return createMutation<
    void,
    { id: number },
    { previousData?: TTournamentByLeagueDto[]; hasShownError?: boolean }
  >(({ id }) => `/api/tournaments/${id}`, 'DELETE', {
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({
        queryKey: queryKey,
      });

      const previousData =
        queryClient.getQueryData<TTournamentByLeagueDto[]>(queryKey);

      queryClient.setQueryData(
        queryKey,
        (oldTournaments: TTournamentByLeagueDto[] | undefined) =>
          oldTournaments
            ? oldTournaments.filter((tournament) => tournament.id !== id)
            : []
      );
      return { previousData, hasShownError: false };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
      showSnackbar('Tournament deleted successfully', 'success');
    },
    onError: (
      err,
      _id,
      context?: {
        previousData?: TTournamentByLeagueDto[];
        hasShownError?: boolean;
      }
    ) => {
      if (context?.previousData) {
        queryClient.setQueryData(['tournamentsByLeague'], context.previousData);
      }
      if (!context?.hasShownError) {
        if (axios.isAxiosError(err) && err.response?.data?.message) {
          showSnackbar(err.response.data.message, 'error');
        } else {
          showSnackbar('Failed to delete tournament', 'error');
        }
        if (context) {
          context.hasShownError = true;
        }
      }
    },
  });
}
