import axios from 'axios';
import { useShowSnackbar } from '../../components/layout/useShowSnackbar';
import { createMutation } from '../factories/mutationFactory';
import queryClient from '../queryClient';
import { TCreateLeagueDto, TLeagueDto } from './types';

export function useAddLeague() {
  const showSnackbar = useShowSnackbar();

  return createMutation<
    TLeagueDto,
    TCreateLeagueDto,
    { previousData?: TLeagueDto[]; hasShownError?: boolean }
  >('/api/leagues', 'POST', {
    onMutate: async (newLeague) => {
      await queryClient.cancelQueries({ queryKey: ['leaguesLogo'] });
      const previousData = queryClient.getQueryData<TLeagueDto[]>([
        'leaguesLogo',
      ]);

      const isNameDuplicate = previousData?.some(
        (league) => league.name.toLowerCase() === newLeague.name.toLowerCase()
      );
      const isShortNameDuplicate = previousData?.some(
        (league) =>
          league.short_name.toLowerCase() === newLeague.short_name.toLowerCase()
      );

      if (isNameDuplicate) {
        throw new Error('League with this name already exists');
      }
      if (isShortNameDuplicate) {
        throw new Error('League with this short name already exists');
      }

      return { previousData };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['leaguesLogo'],
        (oldLeagues: TLeagueDto[] | undefined) => {
          const updatedLeagues = oldLeagues ? [...oldLeagues, data] : [data];
          return updatedLeagues
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((league) => ({
              ...league,
              logos: league.logos.filter((logo: any) => logo.end_year === null),
            }));
        }
      );
    },
    onError: (
      err,
      _league,
      context?: { previousData?: TLeagueDto[]; hasShownError?: boolean }
    ) => {
      if (context?.previousData) {
        queryClient.setQueryData(['leaguesLogo'], context.previousData);
      }
      if (!context?.hasShownError) {
        if (err.message === 'League with this name already exists') {
          showSnackbar('League with this name already exists', 'error');
        } else if (
          err.message === 'League with this short name already exists'
        ) {
          showSnackbar('League with this short name already exists', 'error');
        } else if (axios.isAxiosError(err) && err.response?.data?.message) {
          showSnackbar(err.response.data.message, 'error');
        } else {
          showSnackbar('Failed to add league', 'error');
        }
        if (context) {
          context.hasShownError = true;
        }
      }
    },
  });
}

export function useUpdateLeague() {
  const showSnackbar = useShowSnackbar();

  return createMutation<
    TLeagueDto,
    TCreateLeagueDto & { id: number },
    { previousData?: TLeagueDto[]; hasShownError?: boolean }
  >(({ id }) => `/api/leagues/${id}`, 'PATCH', {
    transformBody: (variables: TCreateLeagueDto & { id: number }) => {
      const { id, ...bodyData } = variables;
      return bodyData;
    },
    onMutate: async (updatedLeague) => {
      await queryClient.cancelQueries({ queryKey: ['leaguesLogo'] });
      const previousData = queryClient.getQueryData<TLeagueDto[]>([
        'leaguesLogo',
      ]);

      const isNameDuplicate = previousData?.some(
        (league) =>
          league.id !== updatedLeague.id &&
          league.name.toLowerCase() === updatedLeague.name.toLowerCase()
      );

      const isShortNameDuplicate = previousData?.some(
        (league) =>
          league.id !== updatedLeague.id &&
          league.short_name.toLowerCase() ===
            updatedLeague.short_name.toLowerCase()
      );

      if (isNameDuplicate) {
        throw new Error('League with this name already exists');
      }
      if (isShortNameDuplicate) {
        throw new Error('League with this short name already exists');
      }

      queryClient.setQueryData(
        ['leaguesLogo'],
        (oldLeagues: TLeagueDto[] | undefined) =>
          oldLeagues
            ? oldLeagues.map((league) =>
                league.id === updatedLeague.id
                  ? { ...league, ...updatedLeague }
                  : league
              )
            : []
      );
      return { previousData, hasShownError: false };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['leaguesLogo'],
        (oldLeagues: TLeagueDto[] | undefined) =>
          oldLeagues
            ? oldLeagues.map((league) =>
                league.id === data.id ? { ...data } : league
              )
            : [data]
      );
      queryClient.setQueryData(['league', data.id], data);

      showSnackbar('League updated successfully', 'success');
    },
    onError: (
      err,
      _league,
      context?: { previousData?: TLeagueDto[]; hasShownError?: boolean }
    ) => {
      if (context?.previousData) {
        queryClient.setQueryData(['leaguesLogo'], context.previousData);
      }
      if (!context?.hasShownError) {
        if (err.message === 'League with this name already exists') {
          showSnackbar('League with this name already exists', 'error');
        } else if (
          err.message === 'League with this short name already exists'
        ) {
          showSnackbar('League with this short name already exists', 'error');
        } else if (axios.isAxiosError(err) && err.response?.data?.message) {
          showSnackbar(err.response.data.message, 'error');
        } else {
          showSnackbar('Failed to update league', 'error');
        }
        if (context) {
          context.hasShownError = true;
        }
      }
    },
  });
}

export function useDeleteLeague() {
  const showSnackbar = useShowSnackbar();

  return createMutation<
    void,
    { id: number },
    { previousData?: TLeagueDto[]; hasShownError?: boolean }
  >(({ id }) => `/api/leagues/${id}`, 'DELETE', {
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: ['leaguesLogo'] });

      const previousData = queryClient.getQueryData<TLeagueDto[]>([
        'leaguesLogo',
      ]);

      queryClient.setQueryData(
        ['leaguesLogo'],
        (oldLeagues: TLeagueDto[] | undefined) =>
          oldLeagues ? oldLeagues.filter((league) => league.id !== id) : []
      );
      return { previousData, hasShownError: false };
    },
    onSuccess: () => {
      showSnackbar('League deleted successfully', 'success');
    },
    onError: (
      err,
      _id,
      context?: { previousData?: TLeagueDto[]; hasShownError?: boolean }
    ) => {
      if (context?.previousData) {
        queryClient.setQueryData(['leaguesLogo'], context.previousData);
      }
      if (!context?.hasShownError) {
        if (axios.isAxiosError(err) && err.response?.data?.message) {
          showSnackbar(err.response.data.message, 'error');
        } else {
          showSnackbar('Failed to delete league', 'error');
        }
        if (context) {
          context.hasShownError = true;
        }
      }
    },
  });
}
