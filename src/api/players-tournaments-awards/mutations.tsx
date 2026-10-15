import { createMutation } from "../factories/mutationFactory";
import {
  TCreatePlayersTournamentsAwardDto,
  TPlayersTournamentsAwardDto,
} from "./types";

export function useAddPlayerAward() {
  return createMutation<
    TPlayersTournamentsAwardDto,
    TCreatePlayersTournamentsAwardDto,
    { hasShownError?: boolean }
  >("/api/players-tournaments-awards", "POST");
}

export function useDeletePlayerAward() {
  return createMutation<void, { id: number }, { hasShownError?: boolean }>(
    ({ id }) => `/api/players-tournaments-awards/${id}`,
    "DELETE",
  );
}
