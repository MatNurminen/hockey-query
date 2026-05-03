import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Header from "./header";
import Selects from "./selects";
import { useSearchParams } from "react-router-dom";
import StatsTabs from "./stats-tabs";
import {
  getPlayersStatsDetail,
  getPlayersStatsTotal,
  getPlayersStatsTotalByTeam,
} from "../../../api/players-stats/queries";

const PlayersStats = () => {
  const [searchParams] = useSearchParams();
  const leagueId = Number(searchParams.get("league"));
  const seasonId = Number(searchParams.get("season"));
  const playerOrd = searchParams.get("playerOrd")
    ? [Number(searchParams.get("playerOrd"))]
    : undefined;
  const teamId = Number(searchParams.get("teamId")) || undefined;
  const nationId = Number(searchParams.get("nationId")) || undefined;

  const detailParams = {
    leagueId: [leagueId],
    seasonId,
    playerOrd,
    teamId,
    nationId,
  };
  const totalParams = { leagueId, playerOrd, teamId, nationId };
  const seasonParams = { leagueId: [leagueId], playerOrd, teamId, nationId };

  const {
    data: players,
    isLoading: isLoadingDetail,
    isError: isErrorDetail,
  } = getPlayersStatsDetail(detailParams);
  const {
    data: totals,
    isLoading: isLoadingTotal,
    isError: isErrorTotal,
  } = getPlayersStatsTotal(totalParams);
  const {
    data: seasons,
    isLoading: isLoadingSeasons,
    isError: isErrorSeasons,
  } = getPlayersStatsDetail(seasonParams);
  const {
    data: totalteams,
    isLoading: isLoadingTotalTeam,
    isError: isErrorTotalTeam,
  } = getPlayersStatsTotalByTeam(totalParams);

  if (
    isLoadingDetail ||
    isLoadingTotal ||
    isLoadingSeasons ||
    isLoadingTotalTeam
  )
    return <p>Loading...</p>;
  if (isErrorDetail || isErrorTotal || isErrorSeasons || isErrorTotalTeam)
    return <h3>Error!</h3>;
  if (!players || !totals || !seasons || !totalteams)
    return <h3>No data available</h3>;

  const league = players[0].short_name;
  const season = players[0].name;

  return (
    <Container sx={{ py: 1, mt: 2, mb: 10 }}>
      <Paper sx={{ px: 2, pb: 1 }}>
        <Header league={league} leagueId={leagueId} season={season} />
      </Paper>
      <Paper sx={{ mt: 2, p: 2 }}>
        <Selects players={players} />
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <StatsTabs
          season={season}
          players={players}
          totals={totals}
          seasons={seasons}
          totalteams={totalteams}
        />
      </Paper>
    </Container>
  );
};

export default PlayersStats;
