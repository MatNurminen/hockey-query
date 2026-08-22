import { memo, useMemo } from "react";
import {
  useMultiplePlayersStatsTotal,
  type MultipleStatsConfig,
} from "../../../../api/players-stats/hooks";
import type {
  PlayersStatsTotalParams,
  TPlayerStatTotal,
} from "../../../../api/players-stats/types";
import PlayersStatsTable from "./playersStatsTable";
import { STAT_SECTIONS } from "./sections";

interface Props {
  leagueId: number;
  seasonId: number;
}

const PlayersStatsTotal = ({ leagueId, seasonId }: Props) => {
  const configs = useMemo<MultipleStatsConfig<PlayersStatsTotalParams>[]>(
    () =>
      STAT_SECTIONS.map(({ id, name, playerOrd }) => ({
        id,
        name,
        params: { leagueId, playerOrd, limit: 5 },
      })),
    [leagueId],
  );

  const {
    data: items,
    isLoading,
    isError,
  } = useMultiplePlayersStatsTotal(configs);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;

  return (
    <PlayersStatsTable<TPlayerStatTotal>
      items={items}
      getHeaderText={(item) => `League all-time ${item.name} Stats`}
      columns={[
        { label: "gp", align: "center", renderCell: (p) => p.games_t },
        { label: "g", align: "center", renderCell: (p) => p.goals_t },
      ]}
      getShowMorePath={(item) =>
        `/league-stats?league=${leagueId}&season=${seasonId}&playerOrd=${item.id}&tab=two`
      }
      gridSize={{ xs: 12, md: 4 }}
      gridDirection="row"
      gridJustifyContent="center"
    />
  );
};

export default memo(PlayersStatsTotal);
