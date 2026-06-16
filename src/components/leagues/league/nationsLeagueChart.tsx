import { getCountPlayersByNation } from "../../../api/players-stats/queries";
import NationsChart from "../../common/Charts/nationsChart";

interface Props {
  leagueId: number;
  seasonId: number;
  title: string;
}

const NationsLeagueChart = ({ leagueId, seasonId, title }: Props) => {
  const { data, isLoading, isError } = getCountPlayersByNation({
    leagueId,
    seasonId,
  });

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!data) return <h3>No data available</h3>;

  return (
    <>
      <NationsChart players={data} seasonId={seasonId} title={title} />
    </>
  );
};

export default NationsLeagueChart;
