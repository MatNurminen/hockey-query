import { memo } from "react";
import { getCountPlayersByNation } from "../../../api/players-stats/queries";
import NationsChart from "../../common/Charts/nationsChart";

interface Props {
  teamId: number;
  seasonId: number;
  title: string;
}

const NationsTeamChart = ({ teamId, seasonId, title }: Props) => {
  const { data, isLoading, isError } = getCountPlayersByNation({
    teamId,
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

export default memo(NationsTeamChart);
