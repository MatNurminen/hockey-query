import Container from "@mui/material/Container";
import Header from "./header";
import LeaguesTable from "./leaguesTable";
import { getLeaguesCurLogo } from "../../../api/leagues/queries";
import { useLatestSeason } from "../../../hooks/useLatestSeason";

const Leagues = () => {
  const { data, isLoading, isError } = getLeaguesCurLogo();

  const latestSeason = useLatestSeason();

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!data) return <h3>No data available</h3>;

  return (
    <Container sx={{ py: 1, mb: 10 }}>
      <Header />
      <LeaguesTable leagues={data} seasonId={latestSeason} />
    </Container>
  );
};

export default Leagues;
