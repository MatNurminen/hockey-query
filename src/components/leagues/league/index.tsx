import Container from "@mui/material/Container";
import { useParams, useSearchParams } from "react-router";
import SectionExternalLinks from "../../common/Sections/sectionExternalLinks";
import Teams from "./teams";
import Standings from "./standings";
import PlayersStatsSeason from "./playersStatsSeason";
import NationsLeagueChart from "./nationsLeagueChart";
import Header from "./header";
import CompareTeams from "./compareTeams";
import PlayersFacts from "./playersFacts";
import PlayersStatsTotal from "./playersStatsTotal";
import PlayersStatsPerSeason from "./playersStatsPerSeason";
import Champions from "./champions";
import Awards from "./awards";
import Paper from "@mui/material/Paper";
import SelectSeason from "../../common/Selects/selectSeason";
import { getLeague } from "../../../api/leagues/queries";
import TotalNations from "./totalNations";
import { useLatestSeason } from "../../../hooks/useLatestSeason";

const League = () => {
  const params = useParams();
  const leagueId = Number(params.id);

  const [searchParams] = useSearchParams();
  const { startYear: latestSeason } = useLatestSeason();
  const seasonId = Number(searchParams.get("season") || latestSeason);

  const { data: league, isError, isLoading } = getLeague(leagueId);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!league) return <h3>No data available</h3>;

  const title: string = league.short_name;

  return (
    <Container sx={{ py: 1, mt: 2, mb: 10 }}>
      <Paper sx={{ px: 2, pb: 1 }}>
        <Header league={league} />
      </Paper>
      <Paper sx={{ mt: 2, py: 1 }}>
        <SectionExternalLinks title={title} />
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <Teams leagueId={leagueId} title={title} />
      </Paper>
      <Paper sx={{ mt: 2, p: 2 }}>
        <SelectSeason />
      </Paper>
      <Paper sx={{ mt: 2, backgroundColor: "transparent", boxShadow: "none" }}>
        <Standings leagueId={leagueId} seasonId={seasonId} title={title} />
      </Paper>
      <Paper sx={{ mt: 2, backgroundColor: "transparent", boxShadow: "none" }}>
        <PlayersStatsSeason
          leagueId={leagueId}
          seasonId={seasonId}
          title={title}
        />
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <NationsLeagueChart leagueId={leagueId} seasonId={seasonId} title={title} />
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <TotalNations leagueId={leagueId} seasonId={seasonId} />
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <CompareTeams leagueId={leagueId} seasonId={seasonId} title={title} />
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <PlayersFacts leagueId={leagueId} seasonId={seasonId} />
      </Paper>
      <Paper sx={{ mt: 4, backgroundColor: "transparent", boxShadow: "none" }}>
        <PlayersStatsTotal leagueId={leagueId} seasonId={seasonId} />
      </Paper>
      <Paper sx={{ mt: 2, backgroundColor: "transparent", boxShadow: "none" }}>
        <PlayersStatsPerSeason leagueId={leagueId} seasonId={seasonId} />
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <Champions title={title} />
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <Awards title={title} />
      </Paper>
    </Container>
  );
};

export default League;
