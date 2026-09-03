import Container from "@mui/material/Container";
import SectionHeader from "../common/Sections/sectionHeader";
import Selects from "./selects";
import Players from "./players";
import { useSearchParams } from "react-router-dom";
import { getStandings } from "../../api/teams-stats/queries";
import { getPlayersStatsDetail } from "../../api/players-stats/queries";

const Rosters = () => {
  const [searchParams] = useSearchParams();
  const leagueId = [Number(searchParams.get("league"))];
  const seasonId = Number(searchParams.get("season"));

  const {
    data: teams,
    isLoading: teamsLoading,
    isError: teamsError,
  } = getStandings({ leagueId, seasonId });

  const {
    data: playersResponse,
    isLoading,
    isError,
  } = getPlayersStatsDetail({ leagueId, seasonId });
  const players = playersResponse?.data ?? [];

  return (
    <Container sx={{ py: 1, mb: 10 }}>
      <SectionHeader txtAlign="left" content="Rosters" />
      <Selects />
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error Player!</p>
      ) : teamsLoading ? (
        <p>Loading...</p>
      ) : teamsError ? (
        <p>Error Teams!</p>
      ) : !teams?.length ? (
        <p>No data available</p>
      ) : (
        <Players players={players} teams={teams} />
      )}
    </Container>
  );
};

export default Rosters;
