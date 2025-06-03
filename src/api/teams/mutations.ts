import axios from 'axios';
import { useShowSnackbar } from '../../components/layout/useShowSnackbar';
import { createMutation } from '../factories/mutationFactory';
import queryClient from '../queryClient';
import { TCreateTeamDto, TTeamDto } from './types';

export function useAddTeam() {
  const showSnackbar = useShowSnackbar();

  return createMutation<
    TTeamDto,
    TCreateTeamDto,
    { previousData?: TTeamDto[]; hasShowError?: boolean }
  >('/api/teams', 'POST', {
    //onMutate: async (newTeam) => {
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['teams'] });
      const previousData = queryClient.getQueryData<TTeamDto[]>(['teams']);

      //   const isFullNameDuplicate = previousData?.some(
      //     (team) =>
      //       team.full_name.toLowerCase() === newTeam.full_name.toLowerCase()
      //   );

      //   const isNameDuplicate = previousData?.some(
      //     (team) => team.name.toLowerCase() === newTeam.name.toLowerCase()
      //   );

      //   const isShortNameDuplicate = previousData?.some(
      //     (team) =>
      //       team.short_name.toLowerCase() === newTeam.short_name.toLowerCase()
      //   );

      //   if (isFullNameDuplicate) {
      //     throw new Error('Team with this full name already exists');
      //   }
      //   if (isNameDuplicate) {
      //     throw new Error('Team with this name already exists');
      //   }
      //   if (isShortNameDuplicate) {
      //     throw new Error('Team with this short name already exists');
      //   }

      return { previousData, hasShowError: false };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['teams'],
        (oldTeams: TTeamDto[] | undefined) => {
          const updatedTeams = oldTeams ? [...oldTeams, data] : [data];
          return updatedTeams;
        }
      );
    },
    onError: (
      err,
      _team,
      context?: { previousData?: TTeamDto[]; hasShownError?: boolean }
    ) => {
      if (context?.previousData) {
        queryClient.setQueryData(['teams'], context.previousData);
      }
      if (!context?.hasShownError) {
        if (err.message === 'Team with this name already exists') {
          showSnackbar('Team with this name already exists', 'error');
        } else if (err.message === 'Team with this short name already exists') {
          showSnackbar('Team with this short name already exists', 'error');
        } else if (axios.isAxiosError(err) && err.response?.data?.message) {
          showSnackbar(err.response.data.message, 'error');
        } else {
          showSnackbar('Failed to add team', 'error');
        }
        if (context) {
          context.hasShownError = true;
        }
      }
    },
  });
}

export function useUpdateTeam() {
  const showSnackbar = useShowSnackbar();

  return createMutation<
    TTeamDto,
    TCreateTeamDto & { id: number },
    { previousData?: TTeamDto[]; hasShownError?: boolean }
  >(({ id }) => `/api/teams/${id}`, 'PATCH', {
    transformBody: (variables: TCreateTeamDto & { id: number }) => {
      const { id, ...bodyData } = variables;
      return bodyData;
    },
    onMutate: async (updatedTeam) => {
      await queryClient.cancelQueries({ queryKey: ['teams'] });
      const previousData = queryClient.getQueryData<TTeamDto[]>(['teams']);

      // here will isNameDuplicateS

      queryClient.setQueryData(['teams'], (oldTeams: TTeamDto[] | undefined) =>
        oldTeams
          ? oldTeams.map((team) =>
              team.id === updatedTeam.id ? { ...team, ...updatedTeam } : team
            )
          : []
      );
      return { previousData, hasShownError: false };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['teams'], (oldTeams: TTeamDto[] | undefined) =>
        oldTeams
          ? oldTeams.map((team) => (team.id === data.id ? { ...data } : team))
          : [data]
      );
      queryClient.setQueryData(['team', data.id], data);

      showSnackbar('Team updated successfully', 'success');
    },
    onError: (
      err,
      _team,
      context?: { previousData?: TTeamDto[]; hasShownError?: boolean }
    ) => {
      if (context?.previousData) {
        queryClient.setQueryData(['teams'], context.previousData);
      }
      if (!context?.hasShownError) {
        if (err.message === 'Team with this name already exists') {
          showSnackbar('Team with this name already exists', 'error');
        } else if (err.message === 'Team with this short name already exists') {
          showSnackbar('Team with this short name already exists', 'error');
        } else if (axios.isAxiosError(err) && err.response?.data?.message) {
          showSnackbar(err.response.data.message, 'error');
        } else {
          showSnackbar('Failed to update team', 'error');
        }
        if (context) {
          context.hasShownError = true;
        }
      }
    },
  });
}
