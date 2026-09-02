import { memo } from "react";
import LinkRoute from "../../common/LinkRoute";
import StatsTable, { StatsColumn } from "./statsTable";
import { TPlayerStatByClub } from "../../../api/players-stats/types";

interface Props {
  totalteams: TPlayerStatByClub[];
  offset: number;
}

const columns: StatsColumn<TPlayerStatByClub>[] = [
  {
    text: "team",
    sx: { minWidth: 160 },
    render: (player) => (
      <LinkRoute to={`/teams/${player.team_id}`} ml={1}>
        {player.full_name}
      </LinkRoute>
    ),
  },
  { align: "center", text: "gp", render: (player) => player.games_t },
  { align: "center", text: "g", render: (player) => player.goals_t },
  { align: "center", text: "years", render: (player) => player.years },
];

const StatsTeam = memo(({ totalteams, offset }: Props) => {
  return (
    <StatsTable
      title="All-time team Player Stats"
      rows={totalteams}
      columns={columns}
      rowKey={(player) => `${player.player_id}-${player.team_id}`}
      offset={offset}
    />
  );
});

export default StatsTeam;