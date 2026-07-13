import { getNations } from "../api/nations/queries";

export const useFirstNation = () => {
  const { data: nations, isLoading } = getNations();
  const firstNationId = nations?.[0]?.id ?? 0;
  return { firstNationId, isLoading };
};
