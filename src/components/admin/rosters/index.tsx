import Container from '@mui/material/Container';
import Players from './players';
import Selects from './selects';
import { useSearchParams } from 'react-router-dom';
import { getPlayersStatsDetail } from '../../../api/players-stats/queries';
import Header from './header';
import { getStandings } from '../../../api/teams-stats/queries';

const AdmRosters = () => {
  const [searchParams] = useSearchParams();
  const leagueId = [Number(searchParams.get('league'))];
  const seasonId = Number(searchParams.get('season'));

  const {
    data: teams,
    isError: teamsLoading,
    isLoading: teamsError,
  } = getStandings({ leagueId, seasonId });

  const {
    data: players,
    isLoading,
    isError,
  } = getPlayersStatsDetail({ leagueId, seasonId });

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error Player!</h3>;
  if (!players) return <h3>No data available</h3>;

  if (teamsLoading) return <h3>Loading...</h3>;
  if (teamsError) return <h3>Error Teams!</h3>;
  if (!teams) return <h3>No data available</h3>;

  return (
    <Container sx={{ py: 1, mb: 10 }}>
      <Header players={players} />
      <Selects />
      <Players players={players} teams={teams} />
    </Container>
  );
};

export default AdmRosters;
