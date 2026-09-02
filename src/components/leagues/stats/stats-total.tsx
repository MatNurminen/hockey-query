import { memo } from "react";
import StatsTable, { StatsColumn } from "./statsTable";
import { TPlayerStatTotal } from "../../../api/players-stats/types";

interface Props {
  totals: TPlayerStatTotal[];
  offset: number;
}

const columns: StatsColumn<TPlayerStatTotal>[] = [
  { align: "center", text: "gp", render: (player) => player.games_t },
  { align: "center", text: "g", render: (player) => player.goals_t },
  { align: "center", text: "years", render: (player) => player.years },
];

const StatsTotal = memo(({ totals, offset }: Props) => {
  return (
    <StatsTable
      title="All-time totals Player Stats"
      rows={totals}
      columns={columns}
      rowKey={(player, index) => `${player.player_id}-${index}`}
      offset={offset}
    />
  );
});

export default StatsTotal;