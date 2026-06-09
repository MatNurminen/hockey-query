import { useMultiplePlayersStatsDetail } from "../../../api/players-stats/hooks";
import type { TPlayerStatDetail } from "../../../api/players-stats/types";
import PlayersStatsTable from "./playersStatsTable";
import { formatSeason } from "../../utils/formatSeason";

interface Props {
  leagueId: number;
  seasonId: number;
  title: string;
}

const PlayersStatsSeason = ({ leagueId, seasonId, title }: Props) => {
  const configs = [
    {
      id: 3,
      name: "forwards",
      params: { leagueId, seasonId, playerOrd: [3], limit: 5 },
    },
    {
      id: 2,
      name: "defenders",
      params: { leagueId, seasonId, playerOrd: [2], limit: 5 },
    },
    {
      id: 1,
      name: "goaltending",
      params: { leagueId, seasonId, playerOrd: [1], limit: 5 },
    },
  ];

  const { data: items, isLoading, isError } = useMultiplePlayersStatsDetail(configs);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;

  return (
    <PlayersStatsTable<TPlayerStatDetail>
      items={items}
      getHeaderText={(item) =>
        `${formatSeason(seasonId)} ${title} ${item.name} Stats`
      }
      columns={[
        { label: "gp", align: "center", renderCell: (p) => p.games },
        { label: "g", align: "center", renderCell: (p) => p.goals },
      ]}
      getShowMorePath={(item) =>
        `/league-stats?league=${leagueId}&season=${seasonId}&playerOrd=${item.id}`
      }
      gridSize={{ sm: 12, md: 4 }}
    />
  );
};

export default PlayersStatsSeason;
