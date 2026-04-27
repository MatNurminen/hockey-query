import { useMemo } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Header from "./header";
import Selects from "./selects";
import { useSearchParams } from "react-router-dom";
import { useMultiplePlayersStatsDetail } from "../../../api/players-stats/hooks";
import Players from "./players";

const PlayersStats = () => {
  const [searchParams] = useSearchParams();
  const leagueId = [Number(searchParams.get("league"))];
  const seasonId = Number(searchParams.get("season"));
  const playerOrd = Number(searchParams.get("playerOrd")) || [];
  const teamId = Number(searchParams.get("teamId")) || [0];
  const nationId = Number(searchParams.get("nationId")) || [0];

  const configs = useMemo(
    () => [
      {
        id: 1,
        name: "",
        params: {
          leagueId,
          seasonId,
          playerOrd,
          teamId,
          nationId,
        },
      },
    ],
    [leagueId, seasonId, playerOrd, teamId, nationId],
  );

  const {
    data: players,
    isLoading,
    isError,
  } = useMultiplePlayersStatsDetail(configs);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <h3>Error!</h3>;

  const league = players[0].list[0].short_name;
  const season = players[0].list[0].name;

  return (
    <Container sx={{ py: 1, mt: 2, mb: 10 }}>
      <Paper sx={{ px: 2, pb: 1 }}>
        <Header league={league} leagueId={leagueId} season={season} />
      </Paper>
      <Paper sx={{ mt: 2, p: 2 }}>
        <Selects players={players} />
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <Players season={season} players={players[0].list} />
      </Paper>
    </Container>
  );
};

export default PlayersStats;
