export const formatSeason = (seasonId: number): string => {
  const shortNextYear = String((seasonId + 1) % 100).padStart(2, "0");
  return `${seasonId}-${shortNextYear}`;
};
