import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { useMultiplePlayersStatsDetail } from "../../../api/players-stats/hooks";
import type { TPlayerStatDetail } from "../../../api/players-stats/types";
import PlayersStatsTable from "./playersStatsTable";

interface Props {
  leagueId: number;
  seasonId: number;
}

const PlayersStatsPerSeason = ({ leagueId, seasonId }: Props) => {
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
  ];

  const { data: items, isLoading, isError } = useMultiplePlayersStatsDetail(configs);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;

  return (
    <PlayersStatsTable<TPlayerStatDetail>
      items={items}
      getHeaderText={(item) => `League all-time ${item.name} stats per season`}
      columns={[
        {
          label: "Season",
          align: "center",
          renderCell: (p) => p.name,
        },
        {
          label: "Team",
          renderCell: (p) => (
            <Link
              underline="hover"
              component={RouterLink}
              to={`/teams/${p.team_id}`}
              ml={1}
            >
              {p.full_name}
            </Link>
          ),
        },
        { label: "gp", align: "center", renderCell: (p) => p.games },
        { label: "g", align: "center", renderCell: (p) => p.goals },
      ]}
      getShowMorePath={(item) =>
        `/league-stats?league=${leagueId}&season=${seasonId}&playerOrd=${item.id}&tab=three`
      }
      gridSize={{ sm: 12, md: 6 }}
      gridDirection="row"
      gridJustifyContent="center"
      gridAlignItems="stretch"
    />
  );
};

export default PlayersStatsPerSeason;
