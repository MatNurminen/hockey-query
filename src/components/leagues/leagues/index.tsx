import Container from "@mui/material/Container";
import Header from "./header";
import LeaguesTable from "./leaguesTable";
import { getLeaguesCurLogo } from "../../../api/leagues/queries";
import { useLatestSeason } from "../../../hooks/useLatestSeason";

const Leagues = () => {
  const { data } = getLeaguesCurLogo();
  const { startYear: latestSeason } = useLatestSeason();
  const leagues = data || [];

  return (
    <Container sx={{ py: 1 }}>
      <Header />
      <LeaguesTable leagues={leagues} seasonId={latestSeason} />
    </Container>
  );
};

export default Leagues;
