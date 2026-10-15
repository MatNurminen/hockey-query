import { useQueryClient } from "@tanstack/react-query";
import { createMutation } from "../factories/mutationFactory";
import {
  TCreatePlayersTournamentsAwardDto,
  TPlayersTournamentsAwardDto,
} from "./types";
import { TPaginatedResponse, TPlayerStatDetail } from "../players-stats/types";

export function useAddPlayerAward(leagueId: number, seasonId: number) {
  const queryClient = useQueryClient();
  const queryKey = ["playersStatsDetail", { leagueId: [leagueId], seasonId }];

  return createMutation<
    TPlayersTournamentsAwardDto,
    TCreatePlayersTournamentsAwardDto,
    unknown
  >("/api/players-tournaments-awards", "POST", {
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}

export function useDeletePlayerAward(leagueId: number, seasonId: number) {
  const queryClient = useQueryClient();
  const queryKey = ["playersStatsDetail", { leagueId: [leagueId], seasonId }];

  return createMutation<
    void,
    { id: number; playerTournamentId: number },
    { previousData?: TPaginatedResponse<TPlayerStatDetail> }
  >(({ id }) => `/api/players-tournaments-awards/${id}`, "DELETE", {
    onMutate: async ({ id, playerTournamentId }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData =
        queryClient.getQueryData<TPaginatedResponse<TPlayerStatDetail>>(
          queryKey,
        );

      queryClient.setQueryData(
        queryKey,
        (oldData: TPaginatedResponse<TPlayerStatDetail> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: oldData.data.map((player) => {
              if (player.id !== playerTournamentId) return player;

              return {
                ...player,
                awards: player.awards.filter((a) => a.id !== id),
              };
            }),
          };
        },
      );

      return { previousData };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
  });
}
