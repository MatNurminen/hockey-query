import { memo } from "react";
import LinkRoute from "../../common/LinkRoute";
import StatsTable, { StatsColumn } from "./statsTable";
import { TPlayerStatDetail } from "../../../api/players-stats/types";

interface Props {
  seasonId: number;
  players: TPlayerStatDetail[];
  offset: number;
}

const columns: StatsColumn<TPlayerStatDetail>[] = [
  {
    align: "center",
    text: "age",
    render: (player) => player.season_id - player.birth_year,
  },
  {
    text: "team",
    sx: { minWidth: 160 },
    render: (player) => (
      <LinkRoute to={`/teams/${player.team_id}`} ml={1}>
        {player.full_name}
      </LinkRoute>
    ),
  },
  { align: "center", text: "gp", render: (player) => player.games },
  { align: "center", text: "g", render: (player) => player.goals },
  {
    text: "Postseason",
    sx: { minWidth: 160 },
    render: (player) => player.postseason,
  },
];

const StatsDetails = memo(({ seasonId, players, offset }: Props) => {
  return (
    <StatsTable
      title={`${seasonId}-${seasonId + 1} Player Stats`}
      rows={players}
      columns={columns}
      rowKey={(player) =>
        `${player.player_id}-${player.season_id}-${player.team_id}`
      }
      offset={offset}
    />
  );
});

export default StatsDetails;