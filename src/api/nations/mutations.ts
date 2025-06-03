import { useShowSnackbar } from '../../components/layout/useShowSnackbar';
import { createMutation } from '../factories/mutationFactory';
import queryClient from '../queryClient';
import { TCreateNationDto, TNationDto } from './types';
import axios from 'axios';

export function useAddNation() {
  const showSnackbar = useShowSnackbar();

  return createMutation<
    TNationDto,
    TCreateNationDto,
    { previousData?: TNationDto[]; hasShownError?: boolean }
  >(() => '/api/nations', 'POST', {
    onMutate: async (newNation) => {
      await queryClient.cancelQueries({ queryKey: ['nations'] });
      const previousData = queryClient.getQueryData<TNationDto[]>(['nations']);

      const isNameDuplicate = previousData?.some(
        (nation) => nation.name.toLowerCase() === newNation.name.toLowerCase()
      );
      const isShortNameDuplicate = previousData?.some(
        (nation) =>
          nation.short_name.toLowerCase() === newNation.short_name.toLowerCase()
      );

      if (isNameDuplicate) {
        throw new Error('Nation with this name already exists');
      }
      if (isShortNameDuplicate) {
        throw new Error('Nation with this short name already exists');
      }

      return { previousData, hasShownError: false };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['nations'],
        (oldNations: TNationDto[] | undefined) => {
          const updatedNations = oldNations ? [...oldNations, data] : [data];
          return updatedNations.sort((a, b) => a.name.localeCompare(b.name));
        }
      );
    },
    onError: (
      err,
      _nation,
      context?: { previousData?: TNationDto[]; hasShownError?: boolean }
    ) => {
      if (context?.previousData) {
        queryClient.setQueryData(['nations'], context.previousData);
      }
      if (!context?.hasShownError) {
        if (err.message === 'Nation with this name already exists') {
          showSnackbar('Nation with this name already exists', 'error');
        } else if (
          err.message === 'Nation with this short name already exists'
        ) {
          showSnackbar('Nation with this short name already exists', 'error');
        } else if (axios.isAxiosError(err) && err.response?.data?.message) {
          showSnackbar(err.response.data.message, 'error');
        } else {
          showSnackbar('Failed to add nation', 'error');
        }
        if (context) {
          context.hasShownError = true;
        }
      }
    },
  });
}

export function useUpdateNation() {
  const showSnackbar = useShowSnackbar();

  return createMutation<
    TNationDto,
    TCreateNationDto & { id: number },
    { previousData?: TNationDto[]; hasShownError?: boolean }
  >(({ id }) => `/api/nations/${id}`, 'PATCH', {
    transformBody: (variables: TCreateNationDto & { id: number }) => {
      const { id, ...bodyData } = variables;
      return bodyData;
    },
    onMutate: async (updatedNation) => {
      await queryClient.cancelQueries({ queryKey: ['nations'] });
      const previousData = queryClient.getQueryData<TNationDto[]>(['nations']);

      const isNameDuplicate = previousData?.some(
        (nation) =>
          nation.id !== updatedNation.id &&
          nation.name.toLowerCase() === updatedNation.name.toLowerCase()
      );

      const isShortNameDuplicate = previousData?.some(
        (nation) =>
          nation.id !== updatedNation.id &&
          nation.short_name.toLowerCase() ===
            updatedNation.short_name.toLowerCase()
      );

      if (isNameDuplicate) {
        throw new Error('Nation with this name already exists');
      }
      if (isShortNameDuplicate) {
        throw new Error('Nation with this short name already exists');
      }

      queryClient.setQueryData(
        ['nations'],
        (oldNations: TNationDto[] | undefined) =>
          oldNations
            ? oldNations.map((nation) =>
                nation.id === updatedNation.id
                  ? { ...nation, ...updatedNation }
                  : nation
              )
            : []
      );

      return { previousData, hasShownError: false };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['nations'],
        (oldNations: TNationDto[] | undefined) => {
          const updatedNations = oldNations
            ? oldNations.map((nation) =>
                nation.id === data.id ? data : nation
              )
            : [data];
          return updatedNations.sort((a, b) => a.name.localeCompare(b.name));
        }
      );

      queryClient.setQueryData(['nation', data.id], data);

      showSnackbar('Nation updated successfully', 'success');
    },
    onError: (
      err,
      _nation,
      context?: { previousData?: TNationDto[]; hasShownError?: boolean }
    ) => {
      if (context?.previousData) {
        queryClient.setQueryData(['nations'], context.previousData);
      }
      if (!context?.hasShownError) {
        if (err.message === 'Nation with this name already exists') {
          showSnackbar('Nation with this name already exists', 'error');
        } else if (
          err.message === 'Nation with this short name already exists'
        ) {
          showSnackbar('Nation with this short name already exists', 'error');
        } else if (axios.isAxiosError(err) && err.response?.data?.message) {
          showSnackbar(err.response.data.message, 'error');
        } else {
          showSnackbar('Failed to update nation', 'error');
        }
        if (context) {
          context.hasShownError = true;
        }
      }
    },
  });
}

export function useDeleteNation() {
  const showSnackbar = useShowSnackbar();

  return createMutation<
    void,
    { id: number },
    { previousData?: TNationDto[]; hasShownError?: boolean }
  >(({ id }) => `/api/nations/${id}`, 'DELETE', {
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: ['nations'] });

      const previousData = queryClient.getQueryData<TNationDto[]>(['nations']);

      queryClient.setQueryData(
        ['nations'],
        (oldNations: TNationDto[] | undefined) =>
          oldNations ? oldNations.filter((nation) => nation.id !== id) : []
      );
      return { previousData, hasShownError: false };
    },
    onSuccess: () => {
      showSnackbar('Nation deleted successfully', 'success');
    },
    onError: (
      err,
      _id,
      context?: { previousData?: TNationDto[]; hasShownError?: boolean }
    ) => {
      if (context?.previousData) {
        queryClient.setQueryData(['nations'], context.previousData);
      }
      if (!context?.hasShownError) {
        if (axios.isAxiosError(err) && err.response?.data?.message) {
          showSnackbar(err.response.data.message, 'error');
        } else {
          showSnackbar('Failed to delete nation', 'error');
        }
        if (context) {
          context.hasShownError = true;
        }
      }
    },
  });
}
