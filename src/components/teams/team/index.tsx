import Container from "@mui/material/Container";
import { useSearchParams, useParams } from "react-router-dom";
import Header from "./header";
import SelectSeason from "../../common/Selects/selectSeason";
import Roster from "./roster";
import History from "./history";
import Paper from "@mui/material/Paper";
import { getTeam } from "../../../api/teams/queries";
import PlayersStatsTotal from "./playersStatsTotal";
import PlayersStatsPerSeason from "./playersStatsPerSeason";
import NatsTotal from "./natsTotal";
import NationsTeamChart from "./nationsTeamChart";
import { useLatestSeason } from "../../../hooks/useLatestSeason";
import { getPlayersStatsDetail } from "../../../api/players-stats/queries";

const Team = () => {
  const params = useParams();
  const teamId = Number(params.id);
  const { startYear } = useLatestSeason();
  const [searchParams] = useSearchParams();
  const seasonId = Number(searchParams.get("season") || startYear);

  const { data: team, isError, isLoading } = getTeam(teamId);
  const { data } = getPlayersStatsDetail({
    teamId,
    seasonId,
    typeId: 1,
  });

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!team) return <h3>No data available</h3>;
  if (!data) return <h3>No data available</h3>;

  const players = data.data;
  const title: string = team.full_name;

  return (
    <Container sx={{ py: 1, mt: 2, mb: 10 }}>
      <Paper sx={{ px: 2, pb: 1 }}>
        <Header team={team} />
      </Paper>
      <Paper sx={{ mt: 2, p: 2 }}>
        <SelectSeason />
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <Roster seasonId={seasonId} title={title} players={players} />
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <NationsTeamChart
          teamId={teamId}
          seasonId={Number(seasonId)}
          title={title}
        />
      </Paper>
      <Paper sx={{ mt: 2, backgroundColor: "transparent", boxShadow: "none" }}>
        <History title={title} teamId={teamId} />
      </Paper>
      <Paper sx={{ mt: 4, backgroundColor: "transparent", boxShadow: "none" }}>
        <PlayersStatsTotal teamId={teamId} />
      </Paper>
      <Paper sx={{ mt: 2, backgroundColor: "transparent", boxShadow: "none" }}>
        <PlayersStatsPerSeason teamId={teamId} />
      </Paper>
      <Paper>
        <NatsTotal teamId={teamId} />
      </Paper>
    </Container>
  );
};

export default Team;
