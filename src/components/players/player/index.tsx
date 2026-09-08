import { useMemo } from "react";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Stats from "./stats";
import { getPlayer } from "../../../api/players/queries";
import { getPlayersStatsDetail } from "../../../api/players-stats/queries";
import StatsTotal from "./statsTotal";
import Highlights from "./highlights";
import { TPlayerStatDetail } from "../../../api/players-stats/types";
import Header from "./header";
import Box from "@mui/material/Box";

const Player = () => {
  const params = useParams();
  const playerId = Number(params.id);

  const { data: player, isError, isLoading } = getPlayer(playerId);
  const { data: stats } = getPlayersStatsDetail({ playerId });

  const lastTeam = useMemo<TPlayerStatDetail | null>(() => {
    if (!stats) return null;

    const leagueTeams = stats.data.filter((team) => team.type_id === 1);
    if (leagueTeams.length === 0) return null;

    return leagueTeams.reduce((max, season) =>
      season.season_id > max.season_id ? season : max,
    );
  }, [stats]);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!player) return <h3>No data available</h3>;

  const playerName = player.first_name + " " + player.last_name;

  return (
    <Container sx={{ py: 1, mt: 2 }}>
      <Paper sx={{ px: 2, pb: 2 }}>
        <Header player={player} playerId={playerId} lastTeam={lastTeam} />
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <Stats playerName={playerName} playerId={playerId} />
      </Paper>
      <Box sx={{ mt: 2 }}>
        <StatsTotal playerName={playerName} playerId={playerId} />
      </Box>
      <Paper sx={{ mt: 2 }}>
        <Highlights playerName={playerName} playerId={playerId} />
      </Paper>
    </Container>
  );
};

export default Player;