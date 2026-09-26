import axios from "axios";
import { useShowSnackbar } from "../../components/layout/useShowSnackbar";
import { createMutation } from "../factories/mutationFactory";
import { TLeagueDto } from "../leagues/types";
import queryClient from "../queryClient";
import { TAwardDto, TCreateAwardDto } from "./types";

export function useAddAward(leagueId: number) {
  const queryKey = ["league", leagueId];
  const showSnackbar = useShowSnackbar();

  return createMutation<
    TAwardDto,
    TCreateAwardDto,
    { previousData?: TLeagueDto; hasShownError?: boolean }
  >("api/awards", "POST", {
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: queryKey,
      });
      const previousData = queryClient.getQueryData<TLeagueDto>(queryKey);
      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
    onError: (
      err,
      _getLeague,
      context?: {
        previousData?: TLeagueDto;
        hasShownError?: boolean;
      },
    ) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      if (!context?.hasShownError) {
        if (axios.isAxiosError(err) && err.response?.data?.message) {
          showSnackbar(err.response.data.message, "error");
        } else {
          showSnackbar("Failed to add award", "error");
        }
        if (context) {
          context.hasShownError = true;
        }
      }
    },
  });
}

export function useUpdateAward(leagueId: number) {
  const queryKey = ["league", leagueId];
  const showSnackbar = useShowSnackbar();

  return createMutation<
    TAwardDto,
    TCreateAwardDto & { id: number },
    { previousData?: TLeagueDto; hasShownError?: boolean }
  >(({ id }) => `/api/awards/${id}`, "PATCH", {
    transformBody: (variables: TCreateAwardDto & { id: number }) => {
      const bodyData: Partial<typeof variables> = { ...variables };
      delete bodyData.id;
      return bodyData;
    },
    onMutate: async (updatedAward) => {
      await queryClient.cancelQueries({ queryKey: queryKey });
      const previousData = queryClient.getQueryData<TLeagueDto>(queryKey);

      const isNameDuplicate = previousData?.awards?.some(
        (award) =>
          award.id !== updatedAward.id &&
          award.name.toLowerCase() === updatedAward.name.toLowerCase(),
      );

      if (isNameDuplicate) {
        throw new Error("Award with this name in it league already exists");
      }

      queryClient.setQueryData(
        queryKey,
        (oldLeague: TLeagueDto | undefined) =>
          oldLeague
            ? {
                ...oldLeague,
                awards: oldLeague.awards?.map((award) =>
                  award.id === updatedAward.id
                    ? { ...award, ...updatedAward }
                    : award,
                ),
              }
            : oldLeague,
      );

      return { previousData, hasShownError: false };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
      showSnackbar("Award updated successfully", "success");
    },
    onError: (
      err,
      _award,
      context?: { previousData?: TLeagueDto; hasShownError?: boolean },
    ) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      if (!context?.hasShownError) {
        if (err.message === "Award with this name already exists") {
          showSnackbar("Award with this name already exists", "error");
        } else if (
          err.message === "Award with this short name already exists"
        ) {
          showSnackbar("Award with this short name already exists", "error");
        } else if (axios.isAxiosError(err) && err.response?.data?.message) {
          showSnackbar(err.response.data.message, "error");
        } else {
          showSnackbar("Failed to update award", "error");
        }
        if (context) {
          context.hasShownError = true;
        }
      }
    },
  });
}

export function useDeleteAward(leagueId: number) {
  const showSnackbar = useShowSnackbar();
  const queryKey = ["league", leagueId];

  return createMutation<
    void,
    { id: number },
    { previousData?: TLeagueDto; hasShownError?: boolean }
  >(({ id }) => `/api/awards/${id}`, "DELETE", {
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({
        queryKey: queryKey,
      });

      const previousData = queryClient.getQueryData<TLeagueDto>(queryKey);

      queryClient.setQueryData(
        queryKey,
        (oldLeague: TLeagueDto | undefined) =>
          oldLeague
            ? {
                ...oldLeague,
                awards: oldLeague.awards?.filter((award) => award.id !== id),
              }
            : oldLeague,
      );
      return { previousData, hasShownError: false };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
      showSnackbar("Award deleted successfully", "success");
    },
    onError: (
      err,
      _id,
      context?: {
        previousData?: TLeagueDto;
        hasShownError?: boolean;
      },
    ) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      if (!context?.hasShownError) {
        if (axios.isAxiosError(err) && err.response?.data?.message) {
          showSnackbar(err.response.data.message, "error");
        } else {
          showSnackbar("Failed to delete award", "error");
        }
        if (context) {
          context.hasShownError = true;
        }
      }
    },
  });
}
