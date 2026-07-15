import Container from "@mui/material/Container";
import SectionHeader from "../common/Sections/sectionHeader";
import Selects from "./selects";
import Players from "./players";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { getStandings } from "../../api/teams-stats/queries";
import { getPlayersStatsDetail } from "../../api/players-stats/queries";

const Rosters = () => {
  const [searchParams] = useSearchParams();
  const leagueId = useMemo(
    () => [Number(searchParams.get("league"))],
    [searchParams],
  );
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

  if (isLoading)
    return (
      <Container sx={{ py: 1, mb: 10 }}>
        <SectionHeader txtAlign="left" content="Rosters" />
        <Selects />
        <p>Loading...</p>
      </Container>
    );
  if (isError)
    return (
      <Container sx={{ py: 1, mb: 10 }}>
        <SectionHeader txtAlign="left" content="Rosters" />
        <Selects />
        <p>Error Player!</p>
      </Container>
    );

  return (
    <Container sx={{ py: 1, mb: 10 }}>
      <SectionHeader txtAlign="left" content="Rosters" />
      <Selects />
      {teamsLoading ? (
        <p>Loading...</p>
      ) : teamsError ? (
        <p>Error Teams!</p>
      ) : !teams ? (
        <p>No data available</p>
      ) : (
        <Players players={players} teams={teams} />
      )}
    </Container>
  );
};

export default Rosters;
