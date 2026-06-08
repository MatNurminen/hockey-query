import { useMultiplePlayersStatsTotal } from "../../../api/players-stats/hooks";
import type { TPlayerStatTotal } from "../../../api/players-stats/types";
import PlayersStatsTable from "./playersStatsTable";

interface Props {
  leagueId: number;
  seasonId: number;
}

const PlayersStatsTotal = ({ leagueId, seasonId }: Props) => {
  const configs = [
    {
      id: 3,
      name: "forwards",
      params: { leagueId, playerOrd: [3], limit: 5 },
    },
    {
      id: 2,
      name: "defenders",
      params: { leagueId, playerOrd: [2], limit: 5 },
    },
    {
      id: 1,
      name: "goaltending",
      params: { leagueId, playerOrd: [1], limit: 5 },
    },
  ];

  const { data: items, isLoading, isError } = useMultiplePlayersStatsTotal(configs);

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
      gridSize={{ sm: 12, md: 4 }}
      gridDirection="row"
      gridJustifyContent="center"
    />
  );
};

export default PlayersStatsTotal;
