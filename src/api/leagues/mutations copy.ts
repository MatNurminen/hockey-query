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
      await queryClient.cancelQueries({ queryKey: ['leagues'] });
      const previousData = queryClient.getQueryData<TLeagueDto[]>(['leagues']);

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
        ['leagues'],
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
        queryClient.setQueryData(['leagues'], context.previousData);
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
    { id: number } & Partial<TCreateLeagueDto>,
    { previousData?: TLeagueDto[] }
  >(({ id }) => `/api/leagues/${id}`, 'PUT', {
    onMutate: async ({ id, ...updatedLeague }) => {
      await queryClient.cancelQueries({ queryKey: ['leagues'] });

      const previousData = queryClient.getQueryData<TLeagueDto[]>(['leagues']);

      queryClient.setQueryData(
        ['leagues'],
        (oldLeagues: TLeagueDto[] | undefined) =>
          oldLeagues
            ? oldLeagues.map((league) =>
                league.id === id ? { ...league, ...updatedLeague } : league
              )
            : []
      );

      return { previousData };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['leagues'],
        (oldLeagues: TLeagueDto[] | undefined) =>
          oldLeagues
            ? oldLeagues.map((league) =>
                league.id === data.id ? { ...data } : league
              )
            : [data]
      );
      showSnackbar('League updated successfully', 'success');
    },
    onError: (_err, _league, context?: { previousData?: TLeagueDto[] }) => {
      if (context?.previousData) {
        queryClient.setQueryData(['leagues'], context.previousData);
      }
      showSnackbar('Failed to update league', 'error');
    },
  });
}

export function useDeleteLeague() {
  const showSnackbar = useShowSnackbar();

  return createMutation<void, { id: number }, { previousData?: TLeagueDto[] }>(
    ({ id }) => `/api/leagues/${id}`,
    'DELETE',
    {
      onMutate: async ({ id }) => {
        await queryClient.cancelQueries({ queryKey: ['leagues'] });

        const previousData = queryClient.getQueryData<TLeagueDto[]>([
          'leagues',
        ]);

        queryClient.setQueryData(
          ['leagues'],
          (oldLeagues: TLeagueDto[] | undefined) =>
            oldLeagues ? oldLeagues.filter((league) => league.id !== id) : []
        );
        return { previousData };
      },
      onError: (_err, _id, context?: { previousData?: TLeagueDto[] }) => {
        if (context?.previousData) {
          queryClient.setQueryData(['leagues'], context.previousData);
        }
        showSnackbar('Failed to delete league', 'error');
      },
    }
  );
}
