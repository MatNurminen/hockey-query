import Container from '@mui/material/Container';
import { useParams, useSearchParams } from 'react-router';
import SectionExternalLinks from '../../common/Sections/sectionExternalLinks';
import Teams from './teams';
import Standings from './standings';
import PlayersStatsSeason from './playersStatsSeason';
// import Nations from './nations';
import Header from './header';
import CompareTeams from './compareTeams';
import PlayersFacts from './playersFacts';
import PlayersStatsTotal from './playersStatsTotal';
import PlayersStatsPerSeason from './playersStatsPerSeason';
import Champions from './chamions';
import Awards from './awards';
import Paper from '@mui/material/Paper';
import SelectSeason from '../../common/Selects/selectSeason';
import { getLeague } from '../../../api/leagues/queries';
import Nats from './nats';

const League = () => {
  const params = useParams();
  const leagueId = Number(params.id);

  const [searchParams] = useSearchParams();
  const seasonId: string = searchParams.get('season') || '2012';

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
        <Teams leagueId={params.id} title={title} />
      </Paper>
      <Paper sx={{ mt: 2, p: 2 }}>
        <SelectSeason />
      </Paper>
      <Paper sx={{ mt: 2, backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Standings leagueId={params.id} seasonId={seasonId} title={title} />
      </Paper>
      <Paper sx={{ mt: 2, backgroundColor: 'transparent', boxShadow: 'none' }}>
        <PlayersStatsSeason
          leagueId={params.id}
          seasonId={seasonId}
          title={title}
        />
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <Nats leagueId={params.id} seasonId={seasonId} />
      </Paper>
      {/* <Paper sx={{ mt: 2 }}>
        <Nations leagueId={params.id} seasonId={seasonId} />
      </Paper> */}
      <Paper sx={{ mt: 2 }}>
        <CompareTeams leagueId={params.id} seasonId={seasonId} title={title} />
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <PlayersFacts leagueId={params.id} seasonId={seasonId} />
      </Paper>
      <Paper sx={{ mt: 4, backgroundColor: 'transparent', boxShadow: 'none' }}>
        <PlayersStatsTotal leagueId={params.id} />
      </Paper>
      <Paper sx={{ mt: 2, backgroundColor: 'transparent', boxShadow: 'none' }}>
        <PlayersStatsPerSeason leagueId={params.id} />
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <Champions leagueId={params.id} title={title} />
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <Awards leagueId={params.id} title={title} />
      </Paper>
    </Container>
  );
};

export default League;
