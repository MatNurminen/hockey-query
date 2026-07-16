import Container from "@mui/material/Container";
import Header from "./header";
import TournamentsByLeague from "./tournaments";
import { useSearchParams } from "react-router-dom";
import { useFirstLeague } from "../../hooks/useFirstLeague";

const Tournaments = () => {
  const [searchParams] = useSearchParams();
  const { firstLeagueId } = useFirstLeague();
  const leagueId = Number(searchParams.get("league")) || firstLeagueId;

  return (
    <Container sx={{ py: 1, mb: 10 }}>
      <Header leagueId={leagueId} />
      <TournamentsByLeague leagueId={leagueId} />
    </Container>
  );
};

export default Tournaments;
