import { memo, useMemo } from "react";
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
import { formatSeason } from "../../../utils/formatSeason";

interface Props {
  leagueId: number;
  seasonId: number;
  title: string;
}

const PlayersStatsSeason = ({ leagueId, seasonId, title }: Props) => {
  const configs = useMemo<MultipleStatsConfig<PlayersStatsDetailParams>[]>(
    () =>
      STAT_SECTIONS.map(({ id, name, playerOrd }) => ({
        id,
        name,
        params: { leagueId, seasonId, playerOrd, limit: 5 },
      })),
    [leagueId, seasonId],
  );

  const {
    data: items,
    isLoading,
    isError,
  } = useMultiplePlayersStatsDetail(configs);

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
      gridSize={{ xs: 12, md: 4 }}
    />
  );
};

export default memo(PlayersStatsSeason);
