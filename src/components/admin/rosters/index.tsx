import { useMemo } from "react";
import Container from "@mui/material/Container";
import Players from "./players";
import Selects from "./selects";
import { useSearchParams } from "react-router-dom";
import { getPlayersStatsDetail } from "../../../api/players-stats/queries";
import Header from "./header";
import { getStandings } from "../../../api/teams-stats/queries";

const AdmRosters = () => {
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
        <Header players={players} />
        <Selects />
        <p>Loading...</p>
      </Container>
    );
  if (isError)
    return (
      <Container sx={{ py: 1, mb: 10 }}>
        <Header players={players} />
        <Selects />
        <p>Error Player!</p>
      </Container>
    );

  return (
    <Container sx={{ py: 1, mb: 10 }}>
      <Header players={players} />
      <Selects />
      {teamsLoading ? (
        <p>Loading...</p>
      ) : teamsError ? (
        <p>Error Teams!</p>
      ) : !teams ? (
        <p>No data available</p>
      ) : (
        <Players
          players={players}
          teams={teams}
          leagueId={leagueId[0]}
          seasonId={seasonId}
        />
      )}
    </Container>
  );
};

export default AdmRosters;
