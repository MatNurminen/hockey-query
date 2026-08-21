import { useMemo } from "react";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import {
  useMultiplePlayersStatsDetail,
  type MultipleStatsConfig,
} from "../../../../api/players-stats/hooks";
import type {
  PlayersStatsDetailParams,
  TPlayerStatDetail,
} from "../../../../api/players-stats/types";
import PlayersStatsTable from "./playersStatsTable";
import { STAT_SECTIONS } from "./sections";

interface Props {
  leagueId: number;
  seasonId: number;
}

const PlayersStatsPerSeason = ({ leagueId, seasonId }: Props) => {
  const configs = useMemo<MultipleStatsConfig<PlayersStatsDetailParams>[]>(
    () =>
      STAT_SECTIONS.filter(({ id }) => id !== 1).map(({ id, name, playerOrd }) => ({
        id,
        name,
        params: { leagueId, playerOrd, limit: 5 },
      })),
    [leagueId],
  );

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
      gridSize={{ xs: 12, md: 6 }}
      gridDirection="row"
      gridJustifyContent="center"
      gridAlignItems="stretch"
    />
  );
};

export default PlayersStatsPerSeason;
