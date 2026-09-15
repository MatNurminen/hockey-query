import { getCountPlayersByNation } from "../../../api/players-stats/queries";
import NationsChart from "../../common/Charts/nationsChart";

interface Props {
  leagueId: number;
  seasonId: number;
  title: string;
}

const NationsLeagueChart = ({ leagueId, seasonId, title }: Props) => {
  const { data } = getCountPlayersByNation({ leagueId, seasonId });
  const players = data || [];

  return <NationsChart players={players} seasonId={seasonId} title={title} />;
};

export default NationsLeagueChart;
